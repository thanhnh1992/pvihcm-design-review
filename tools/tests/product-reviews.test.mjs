import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../../api/danh-gia-san-pham.mjs';
import { accidentReviews } from '../product-reviews.mjs';
import fs from 'node:fs';

const originalFetch = global.fetch;
process.env.KV_REST_API_URL = 'https://example.invalid';
process.env.KV_REST_API_TOKEN = 'test-only';
let calls = [];
function mock(result, status = 200) {
  calls = [];
  global.fetch = async (url, init) => { calls.push(JSON.parse(init.body)); return { ok: status === 200, json: async () => ({ result }) }; };
}
async function call(method, body, headers = {}) {
  const res = { code: 200, setHeader() {}, status(n) { this.code = n; return this; }, json(d) { this.data = d; return this; } };
  await handler({ method, body, headers: { host: 'pvihcm.com', 'content-type': 'application/json', ...headers } }, res);
  return res;
}
const input = { rating: 4, submissionId: '6d688e18-391c-43d2-bd8f-98049984c014', name: 'Kiểm thử', comment: 'Nội dung thử cục bộ' };

test('Không có lượt thật: API trả 0, không tự tạo điểm', async () => {
  mock(['0','0']);
  const r = await call('GET');
  assert.equal(r.code,200); assert.deepEqual(r.data,{ ok:true, count:0, average:0, reviews:[] });
  assert.equal(calls[0][0],'EVAL');
});
test('Điểm trung bình lấy từ tổng điểm và số phiếu', async () => {
  mock(['3','13',JSON.stringify({ rating:4, name:'Kiểm thử', comment:'', date:'2026-11-16' })]);
  const r = await call('GET');
  assert.equal(r.data.average,4.3); assert.equal(r.data.count,3); assert.equal(r.data.reviews.length,1);
});
test('Từ chối số sao sai trước khi ghi dữ liệu', async () => {
  for(const rating of [0,6,1.5,'5',null]) { mock([]); const r=await call('POST',{...input,rating}); assert.equal(r.code,400); assert.equal(calls.length,0); }
});
test('Chặn gửi chéo website và sai định dạng', async () => {
  mock([]); assert.equal((await call('POST',input,{origin:'https://other.invalid'})).code,403);
  assert.equal((await call('POST',input,{'content-type':'text/plain'})).code,415); assert.equal(calls.length,0);
});
test('Dữ liệu hỏng và bẫy bot không thành đánh giá', async () => {
  mock([]); for(const body of ['{broken',null,[],{...input,website:'spam'},{...input,submissionId:'bad'},{...input,comment:'x'.repeat(1001)}]) assert.equal((await call('POST',body)).code,400);
  assert.equal(calls.length,0);
});
test('Ghi nguyên tử, che số điện thoại và không lưu IP thô', async () => {
  mock([1,1,4]);
  const r = await call('POST',{...input,comment:'Liên hệ 0912345678'},{'x-forwarded-for':'192.0.2.1'});
  assert.equal(r.code,200); assert.equal(r.data.average,4);
  assert.equal(calls.length,1); assert.equal(calls[0][2],4);
  const payload=JSON.stringify(calls[0]); assert(!payload.includes('0912345678')); assert(!payload.includes('192.0.2.1'));
  assert(payload.includes('**********')); assert(payload.includes('HINCRBY'));
});
test('Gửi lại cùng mã không tăng số phiếu', async () => {
  mock([0,1,4]); const r=await call('POST',input); assert.equal(r.data.duplicate,true); assert.equal(r.data.count,1);
});
test('Giới hạn số lượt được trả rõ ràng', async () => {
  mock([-1,0,0]); const r=await call('POST',input); assert.equal(r.code,429); assert.equal(r.data.ok,false);
});
test('Kho dữ liệu lỗi không báo nhận thành công', async () => {
  mock(null,503); const r=await call('POST',input); assert.equal(r.code,503); assert.equal(r.data.ok,false);
});
test('Khung không chọn sẵn 5 sao, schema gốc chưa có AggregateRating', () => {
  const markup=accidentReviews(); assert.equal((markup.match(/type="radio"/g)||[]).length,5); assert(!markup.includes(' checked'));
  const html=fs.readFileSync(new URL('../../dist/san-pham/bao-hiem-tai-nan/index.html',import.meta.url),'utf8');
  const ld=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x=>JSON.parse(x[1]));
  const product=ld.find(x=>x['@type']==='Product'); assert(product); assert.equal(product.aggregateRating,undefined);
  assert(html.includes('Nhận báo giá chi tiết')); assert(html.includes('/product-reviews.js'));
});
test.after(() => { global.fetch=originalFetch; });
