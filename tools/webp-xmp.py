"""Ghi thông tin ảnh (XMP: tiêu đề, mô tả, từ khóa, tác giả, bản quyền, khu vực, đánh giá) vào file WebP.
Chỉ thêm khối XMP vào vỏ file, KHÔNG nén lại ảnh: điểm ảnh giữ nguyên 100%. Không ghi tọa độ GPS
(QUY-TAC-VIET-BAI.md: xóa EXIF/GPS), khu vực chỉ ghi tên thành phố.
Dùng: python3 tools/webp-xmp.py <file-thông-tin.json> <ảnh.webp> [ảnh khác...]"""
import json, struct, sys
from xml.sax.saxutils import escape as x
from PIL import Image

def chunks(d):
    i, out = 12, []
    while i < len(d):
        t = d[i:i + 4]; n = struct.unpack('<I', d[i + 4:i + 8])[0]
        out.append([t, bytearray(d[i + 8:i + 8 + n])]); i += 8 + n + (n & 1)
    return out

def xmp(m):
    li = lambda xs: ''.join(f'<rdf:li>{x(s)}</rdf:li>' for s in xs)
    alt = lambda s: f'<rdf:Alt><rdf:li xml:lang="x-default">{x(s)}</rdf:li></rdf:Alt>'
    return f'''<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/" xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/">
<dc:title>{alt(m["title"])}</dc:title>
<dc:description>{alt(m["description"])}</dc:description>
<dc:subject><rdf:Bag>{li(m["keywords"])}</rdf:Bag></dc:subject>
<dc:creator><rdf:Seq>{li([m["creator"]])}</rdf:Seq></dc:creator>
<dc:rights>{alt(m["credit"])}</dc:rights>
<photoshop:Headline>{x(m["title"])}</photoshop:Headline>
<photoshop:Credit>{x(m["credit"])}</photoshop:Credit>
<photoshop:City>{x(m["city"])}</photoshop:City>
<photoshop:Country>{x(m["country"])}</photoshop:Country>
<Iptc4xmpCore:CountryCode>{x(m["countryCode"])}</Iptc4xmpCore:CountryCode>
<Iptc4xmpCore:Location>{x(m["location"])}</Iptc4xmpCore:Location>
<xmpRights:Marked>True</xmpRights:Marked>
<xmp:Rating>{int(m["rating"])}</xmp:Rating>
</rdf:Description></rdf:RDF></x:xmpmeta>
<?xpacket end="w"?>'''.encode('utf-8')

meta = json.load(open(sys.argv[1], encoding='utf-8'))
for f in sys.argv[2:]:
    d = open(f, 'rb').read()
    assert d[:4] == b'RIFF' and d[8:12] == b'WEBP', f
    w, h = Image.open(f).size
    cs = [c for c in chunks(d) if c[0] not in (b'XMP ', b'EXIF')]  # bỏ XMP/EXIF cũ (gồm GPS nếu có)
    if cs[0][0] != b'VP8X':
        alpha = any(c[0] == b'VP8L' for c in cs) and Image.open(f).mode == 'RGBA'
        cs.insert(0, [b'VP8X', bytearray(struct.pack('<I', 0x10 if alpha else 0) + (w - 1).to_bytes(3, 'little') + (h - 1).to_bytes(3, 'little'))])
    cs[0][1][0] = (cs[0][1][0] | 0x04) & ~0x08  # cờ có XMP, không EXIF
    cs.append([b'XMP ', bytearray(xmp(meta))])
    body = b''.join(t + struct.pack('<I', len(p)) + bytes(p) + (b'\0' if len(p) & 1 else b'') for t, p in cs)
    open(f, 'wb').write(b'RIFF' + struct.pack('<I', 4 + len(body)) + b'WEBP' + body)
    print('đã ghi', f, len(d), '->', 12 + len(body), 'byte')
