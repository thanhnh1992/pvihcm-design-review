/* Dòng hạt 3D chảy dọc theo trang.
   Cuộn 0        : khối cầu tụ lại ở vùng hero.
   Cuộn xuống    : khối tan ra, hạt đổ xuống thành một dòng dọc xoắn liên tục.
   Dòng chảy dùng fract() nên lặp vô tận; hai đầu được làm mờ dần để chỗ nối
   không bao giờ lộ ra -> mắt đọc thành một dải liền mạch, không ngắt quãng.
   Canvas fixed toàn màn hình, nằm dưới toàn bộ nội dung, không bắt chuột.
   Tắt hẳn ở mobile, khi máy xin giảm chuyển động, khi cuộn khuất hoặc tab ẩn. */
(() => {
  const gate = matchMedia('(min-width:821px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
  const canvas = document.querySelector('#hero-cloud');
  if (!canvas) return;

  // Khởi tạo trễ: nếu lúc tải cửa sổ còn hẹp thì chờ, phóng to là chạy.
  let booted = false;
  const boot = () => { if (booted || !gate.matches) return; booted = true; start(); };
  gate.addEventListener('change', boot);
  boot();

  function start(){

  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, depth: false, powerPreference: 'low-power' });
  if (!gl) return;

  const COUNT = 22000;

  const vert = `
precision mediump float;
attribute vec3 aSphere;
attribute vec2 aSeed;
uniform float uScroll;
uniform float uTime;
uniform vec2  uPointer;
uniform float uAspect;
uniform float uScale;
uniform float uOffsetX;
varying float vDepth;
varying float vAlpha;
const float TAU = 6.28318;
const float CAM = 3.80;

void main(){
  // ── hình 1: khối cầu tụ ở hero ──
  vec3 sph = aSphere;

  // ── hình 2: xoáy mở loe, chiếm nửa phải màn hình ──
  // Bán kính lớn nhất 2.66 so với camera 3.80 nên mặt gần và mặt xa của xoáy
  // chênh nhau khoảng 8 lần chiều sâu: đủ để mắt đọc ra khối, không phải nét phẳng.
  // Toạ độ dọc đặt theo MÀN HÌNH rồi nhân ngược z, nên sau phép chia phối cảnh
  // hạt trải đều từ đỉnh xuống đáy, không dồn cục giữa và không hở hai đầu.
  float t = aSeed.x;
  float flow = fract(t + uTime * 0.05 + uScroll * 1.35);

  float openness = mix(0.20, 1.0, pow(flow, 0.85));
  float thick = 0.86 + aSeed.y * 0.28;
  float rad = 3.00 * openness * thick;

  float ang = flow * TAU * 2.2 + uTime * 0.12 + aSeed.y * 0.9;
  float sn = sin(ang);
  float zf = sn * rad + CAM;
  float targetY = mix(1.06, -1.06, flow);
  vec3 col = vec3(cos(ang) * rad, targetY * zf, sn * rad);

  // ── chuyển hình theo cuộn: cầu tan ra rồi đổ xuống xoáy ──
  float k = smoothstep(0.015, 0.19, uScroll);
  vec3 p = mix(sph, col, k);

  // xoay mạnh lúc còn là cầu, gần như đứng yên khi đã thành xoáy
  float spin = mix(1.0, 0.05, k);
  float ay = (uTime * 0.16 + uPointer.x * 0.35) * spin;
  float ax = (-0.22 + uPointer.y * 0.18) * spin;
  float cy = cos(ay), sy = sin(ay);
  vec3 r1 = vec3(p.x * cy + p.z * sy, p.y, -p.x * sy + p.z * cy);
  float cx = cos(ax), sx = sin(ax);
  vec3 r2 = vec3(r1.x, r1.y * cx - r1.z * sx, r1.y * sx + r1.z * cx);

  float z = r2.z + CAM;
  if (z < 0.30) z = 0.30;
  vec2 proj = r2.xy / z;
  gl_Position = vec4(proj.x / uAspect + uOffsetX, proj.y, 0.0, 1.0);
  gl_PointSize = clamp(uScale / z, 0.7, 7.0);

  vDepth = clamp((z - 1.14) / 5.32, 0.0, 1.0);

  float seam = smoothstep(0.0, 0.10, flow) * (1.0 - smoothstep(0.88, 1.0, flow));
  float edge = 1.0 - smoothstep(0.95, 1.30, length(proj));
  vAlpha = mix(1.0, seam, k) * edge;
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
  float a = mix(0.44, 0.04, vDepth) * vAlpha;
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

  const sphere = new Float32Array(COUNT * 3);
  const seed = new Float32Array(COUNT * 2);
  for (let i = 0; i < COUNT; i += 1) {
    const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, rr = Math.sqrt(1 - u * u);
    sphere[i * 3] = rr * Math.cos(th) * 1.95;
    sphere[i * 3 + 1] = rr * Math.sin(th) * 1.95;
    sphere[i * 3 + 2] = u * 1.95;
    seed[i * 2] = i / COUNT;          // trải đều dọc dòng -> mật độ liên tục
    seed[i * 2 + 1] = Math.random();
  }
  for (const [name, data, size] of [['aSphere', sphere, 3], ['aSeed', seed, 2]]) {
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
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(uAspect, innerWidth / innerHeight);
    gl.uniform1f(uScale, 7.4 * dpr);
    // dòng nằm lệch phải, tránh cột chữ bên trái
    gl.uniform1f(uOffsetX, innerWidth > 1180 ? 0.56 : 0.44);
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

  addEventListener('resize', size, { passive: true });
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
