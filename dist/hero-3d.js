/* Dòng hạt 3D chảy dọc theo trang.
   Cuộn 0        : khối cầu tụ lại ở vùng hero.
   Cuộn xuống    : khối tan ra, hạt đổ xuống thành một dòng dọc xoắn liên tục.
   Dòng chảy dùng fract() nên lặp vô tận; hai đầu được làm mờ dần để chỗ nối
   không bao giờ lộ ra -> mắt đọc thành một dải liền mạch, không ngắt quãng.
   Canvas fixed toàn màn hình, nằm dưới toàn bộ nội dung, không bắt chuột.
   Điện thoại chạy bản nhẹ (ít hạt hơn, độ phân giải thấp hơn). Tắt hẳn khi máy
   xin giảm chuyển động, khi tab ẩn, hoặc khi máy không có tăng tốc đồ họa. */
(() => {
  const gate = matchMedia('(prefers-reduced-motion:no-preference)');
  // Máy nhỏ hoặc điều khiển bằng ngón tay: bản nhẹ, đỡ tốn pin và không làm nóng máy.
  const small = matchMedia('(max-width:820px), (pointer:coarse)');
  const canvas = document.querySelector('#hero-cloud');
  if (!canvas) return;

  // Khởi tạo trễ: nếu lúc tải cửa sổ còn hẹp thì chờ, phóng to là chạy.
  let booted = false;
  const boot = () => { if (booted || !gate.matches) return; booted = true; start(); };
  gate.addEventListener('change', boot);
  // Chờ trang tải xong và trình duyệt rảnh mới dựng WebGL: khởi tạo 15.000 hạt
  // tốn ~0,5s luồng chính, nếu chạy ngay sẽ chặn thao tác đầu tiên (TBT).
  const later = () => (window.requestIdleCallback ? requestIdleCallback(boot, { timeout: 2500 }) : setTimeout(boot, 1200));
  if (document.readyState === 'complete') later(); else addEventListener('load', later, { once: true });

  function start(){

  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, depth: false, powerPreference: 'low-power' });
  if (!gl) return;
  // Máy không có tăng tốc đồ họa (trình vẽ phần mềm) thì bỏ hiệu ứng: 15.000 hạt vẽ bằng CPU
  // làm trang giật và chặn thao tác, lợi bất cập hại.
  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : '';
  if (/swiftshader|llvmpipe|software|basic render/i.test(renderer)) return;

  const COUNT = small.matches ? 5000 : 15000;

  const vert = `
precision mediump float;
attribute vec3 aPos;      // ngẫu nhiên đều: x trải ngang, y nhiễu dọc, z chiều sâu
attribute vec2 aSeed;     // x: vị trí dọc trải đều, y: nhiễu riêng
uniform float uScroll;
uniform float uTime;
uniform vec2  uPointer;
uniform float uAspect;
uniform float uScale;
uniform float uOffsetX;
varying float vDepth;
varying float vAlpha;
const float TAU = 6.28318;

void main(){
  // Hạt vẫn rải NGẪU NHIÊN ĐỀU, không nằm trên đường xoắn nào, nên không bao giờ
  // hiện ra vệt ribbon có cạnh. Chất xoáy đến từ việc CẢ KHỐI cùng quay quanh
  // trục dọc, và quay vi sai: càng gần tâm quay càng nhanh, giống xoáy nước thật.
  float t = aSeed.x;
  float drift = fract(t + uTime * 0.010 + uScroll * 0.40);
  float targetY = mix(1.20, -1.20, drift);

  // nở dần khi rơi xuống -> dáng phễu
  float spread = mix(0.62, 1.25, drift);
  float rx = aPos.x * 3.45 * spread;
  float rz = aPos.z * 1.90 * spread;

  // xoáy vi sai quanh trục dọc
  float r = length(vec2(rx, rz)) * 0.34;
  float swirl = uTime * 0.075 / (0.50 + r) + drift * 2.1;
  float ca = cos(swirl), sa = sin(swirl);
  float x  = rx * ca - rz * sa;
  float zz = (rx * sa + rz * ca) * 0.55;   // nén chiều sâu để hạt không văng ra sau camera

  float zf = zz + 3.90;
  float y  = targetY * zf + aPos.y * 0.10 * zf;

  x += uPointer.x * (0.34 - aPos.z * 0.12);

  float z = zf;
  if (z < 0.40) z = 0.40;
  vec2 proj = vec2(x, y) / z;
  gl_Position = vec4(proj.x / uAspect + uOffsetX, proj.y + uPointer.y * 0.04, 0.0, 1.0);
  gl_PointSize = clamp(uScale / z, 0.7, 5.2);

  vDepth = clamp((z - 1.97) / 3.86, 0.0, 1.0);

  float seam = smoothstep(0.0, 0.12, drift) * (1.0 - smoothstep(0.86, 1.0, drift));
  float edge = 1.0 - smoothstep(0.92, 1.28, length(proj));
  vAlpha = seam * edge;
}
`;

  const frag = `
precision mediump float;
varying float vDepth;
varying float vAlpha;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  if (dot(c, c) > 0.25) discard;
  vec3 col = mix(vec3(0.035, 0.180, 0.365), vec3(0.482, 0.706, 0.855), vDepth);
  float a = mix(0.30, 0.03, vDepth) * vAlpha;
  gl_FragColor = vec4(col * a, a);
}`;

  const prog = gl.createProgram();
  for (const [type, src] of [[gl.VERTEX_SHADER, vert], [gl.FRAGMENT_SHADER, frag]]) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn('hero-3d:', gl.getShaderInfoLog(s)); return; }
    gl.attachShader(prog, s);
  }
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  const pos = new Float32Array(COUNT * 3);
  const seed = new Float32Array(COUNT * 2);
  for (let i = 0; i < COUNT; i += 1) {
    pos[i * 3]     = Math.random() * 2 - 1;                 // trải ngang
    pos[i * 3 + 1] = Math.random() * 2 - 1;                 // nhiễu dọc
    pos[i * 3 + 2] = Math.random() * 2 - 1;                 // chiều sâu
    seed[i * 2]     = i / COUNT;                            // trải đều dọc -> mật độ liên tục
    seed[i * 2 + 1] = Math.random();
  }
  for (const [name, data, size] of [['aPos', pos, 3], ['aSeed', seed, 2]]) {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  }

  const U = n => gl.getUniformLocation(prog, n);
  const uScroll = U('uScroll'), uTime = U('uTime'), uPointer = U('uPointer');
  const uAspect = U('uAspect'), uScale = U('uScale'), uOffsetX = U('uOffsetX');

  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  const size = () => {
    const dpr = Math.min(devicePixelRatio || 1, small.matches ? 1 : 1.5);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(uAspect, innerWidth / innerHeight);
    gl.uniform1f(uScale, 6.2 * dpr);
    // dòng nằm lệch phải, tránh cột chữ bên trái
    gl.uniform1f(uOffsetX, 0.14);
  };
  size();

  let raf = 0, visible = true, clock = 0, last = 0;
  let px = 0, py = 0, tx = 0, ty = 0, sc = 0;

  const draw = (now) => {
    raf = 0;
    if (!last) last = now;
    clock += Math.min((now - last) / 1000, 0.05);
    last = now;
    // đọc tiến độ cuộn ngay trong vòng vẽ, không gắn listener 'scroll'
    const max = document.documentElement.scrollHeight - innerHeight;
    const target = max > 0 ? Math.min(scrollY / max, 1) : 0;
    sc += (target - sc) * 0.12;
    px += (tx - px) * 0.04;
    py += (ty - py) * 0.04;
    gl.uniform1f(uTime, clock);
    gl.uniform1f(uScroll, sc);
    gl.uniform2f(uPointer, px, py);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, COUNT);
    schedule();
  };
  const schedule = () => { if (!raf && visible && !document.hidden && gate.matches) raf = requestAnimationFrame(draw); };
  const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; last = 0; };

  // Trên điện thoại, thanh địa chỉ trượt lên xuống khi cuộn làm đổi innerHeight liên tục.
  // Chỉ dựng lại canvas khi bề ngang đổi, hoặc chiều cao đổi nhiều hơn 140px.
  let lastW = innerWidth, lastH = innerHeight;
  addEventListener('resize', () => {
    if (innerWidth === lastW && Math.abs(innerHeight - lastH) < 140) return;
    lastW = innerWidth; lastH = innerHeight;
    size();
  }, { passive: true });
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    tx = e.clientX / innerWidth - 0.5;
    ty = e.clientY / innerHeight - 0.5;
  }, { passive: true });
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : schedule());
  gate.addEventListener('change', () => { stop(); if (gate.matches) schedule(); else gl.clear(gl.COLOR_BUFFER_BIT); });
  schedule();
  }
})();
