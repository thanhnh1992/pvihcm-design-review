/* Point cloud 3D sau cụm sản phẩm.
   Cùng cơ chế với các nền "particle morph" nền tối, nhưng lật cho nền sáng:
   mực xanh đậm trên giấy trắng, blend thường, không additive.
   Chỉ chạy trên desktop có chuột thật và khi máy không xin giảm chuyển động.
   Nếu WebGL không có, canvas rỗng và ba mặt phẳng CSS phía dưới vẫn là nền tĩnh. */
(() => {
  const gate = matchMedia('(min-width:821px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
  const canvas = document.querySelector('#hero-cloud');
  if (!canvas || !gate.matches) return;

  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, depth: false, powerPreference: 'low-power' });
  if (!gl) return;

  const COUNT = 26000;
  const TAU = Math.PI * 2;

  const vert = `
precision mediump float;
attribute vec3 aA; attribute vec3 aB; attribute vec3 aC; attribute float aSeed;
uniform float uMix;      // 0..3, chạy vòng giữa ba hình
uniform float uTime;
uniform vec2  uPointer;
uniform float uAspect;
uniform float uScale;
varying float vDepth;
varying float vFade;
void main(){
  // nội suy vòng A -> B -> C -> A
  vec3 p;
  float m = mod(uMix, 3.0);
  if (m < 1.0)      p = mix(aA, aB, smoothstep(0.0, 1.0, m));
  else if (m < 2.0) p = mix(aB, aC, smoothstep(0.0, 1.0, m - 1.0));
  else              p = mix(aC, aA, smoothstep(0.0, 1.0, m - 2.0));

  // thở nhẹ để khối không chết cứng
  p *= 1.0 + sin(uTime * 0.35 + aSeed * TAU_) * 0.012;

  // xoay quanh trục Y, nghiêng nhẹ trục X
  float ay = uTime * 0.16 + uPointer.x * 0.35;
  float ax = -0.22 + uPointer.y * 0.18;
  float cy = cos(ay), sy = sin(ay);
  vec3 r1 = vec3(p.x * cy + p.z * sy, p.y, -p.x * sy + p.z * cy);
  float cx = cos(ax), sx = sin(ax);
  vec3 r2 = vec3(r1.x, r1.y * cx - r1.z * sx, r1.y * sx + r1.z * cx);

  float z = r2.z + 2.62;                 // đẩy khối ra trước camera
  if (z < 0.25) z = 0.25;
  vec2 proj = r2.xy / z;
  gl_Position = vec4(proj.x / uAspect, proj.y, 0.0, 1.0);
  gl_PointSize = clamp(uScale / z, 0.6, 6.0);

  vDepth = clamp((z - 1.9) / 2.3, 0.0, 1.0);   // 0 gần, 1 xa
  vFade  = 1.0 - smoothstep(0.72, 1.05, length(proj));  // mềm dần ở rìa
}`.replace(/TAU_/g, '6.28318');

  const frag = `
precision mediump float;
varying float vDepth;
varying float vFade;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  if (dot(c, c) > 0.25) discard;
  // gần: xanh navy đậm. xa: xanh nhạt như sương.
  vec3 col = mix(vec3(0.035, 0.180, 0.365), vec3(0.482, 0.706, 0.855), vDepth);
  float a = mix(0.62, 0.06, vDepth) * vFade;
  gl_FragColor = vec4(col * a, a);
}`;

  const build = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); gl.attachShader(prog, s); return s; };
  const prog = gl.createProgram();
  build(gl.VERTEX_SHADER, vert);
  build(gl.FRAGMENT_SHADER, frag);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  // ── ba hình khối ──
  const A = new Float32Array(COUNT * 3); // mặt cầu: "vòng bảo vệ"
  const B = new Float32Array(COUNT * 3); // vòng xuyến nghiêng
  const C = new Float32Array(COUNT * 3); // dải xoắn phẳng
  const S = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i += 1) {
    const k = i * 3;
    // cầu phân bố đều
    const u = Math.random() * 2 - 1, th = Math.random() * TAU, rr = Math.sqrt(1 - u * u);
    A[k] = rr * Math.cos(th) * 1.16; A[k+1] = rr * Math.sin(th) * 1.16; A[k+2] = u * 1.16;
    // xuyến
    const t1 = Math.random() * TAU, t2 = Math.random() * TAU, R = 0.95, r = 0.30;
    B[k]   = (R + r * Math.cos(t2)) * Math.cos(t1);
    B[k+1] = (R + r * Math.cos(t2)) * Math.sin(t1) * 0.55;
    B[k+2] = r * Math.sin(t2);
    // dải xoắn
    const t = Math.pow(Math.random(), 0.62), ang = t * TAU * 2.1, rad = 0.22 + t * 1.12;
    const jitter = (Math.random() - 0.5) * 0.16 * (0.3 + t);
    C[k]   = Math.cos(ang) * rad + jitter;
    C[k+1] = Math.sin(ang) * rad * 0.42 + jitter * 0.5;
    C[k+2] = (Math.random() - 0.5) * 0.18;
    S[i] = Math.random();
  }
  for (const [name, data, size] of [['aA', A, 3], ['aB', B, 3], ['aC', C, 3], ['aSeed', S, 1]]) {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  }

  const uMix = gl.getUniformLocation(prog, 'uMix');
  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uPointer = gl.getUniformLocation(prog, 'uPointer');
  const uAspect = gl.getUniformLocation(prog, 'uAspect');
  const uScale = gl.getUniformLocation(prog, 'uScale');

  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // alpha nhân sẵn
  gl.clearColor(0, 0, 0, 0);

  let dpr = 1;
  const size = () => {
    const b = canvas.getBoundingClientRect();
    if (!b.width || !b.height) return;
    dpr = Math.min(devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(b.width * dpr);
    canvas.height = Math.round(b.height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(uAspect, b.width / b.height);
    gl.uniform1f(uScale, 5.8 * dpr);
  };
  size();

  let raf = 0, inView = true, clock = 0, last = 0;
  let px = 0, py = 0, tx = 0, ty = 0;

  const draw = (now) => {
    raf = 0;
    if (!last) last = now;
    clock += Math.min((now - last) / 1000, 0.05);
    last = now;
    px += (tx - px) * 0.04;
    py += (ty - py) * 0.04;
    gl.uniform1f(uTime, clock);
    gl.uniform1f(uMix, clock * 0.085);   // một vòng ba hình ~35 giây
    gl.uniform2f(uPointer, px, py);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, COUNT);
    schedule();
  };
  const schedule = () => { if (!raf && inView && !document.hidden && gate.matches) raf = requestAnimationFrame(draw); };
  const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; last = 0; };

  if ('ResizeObserver' in window) new ResizeObserver(size).observe(canvas);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; inView ? schedule() : stop(); }).observe(canvas);
  }
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    tx = e.clientX / innerWidth - 0.5;
    ty = e.clientY / innerHeight - 0.5;
  }, { passive: true });
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : schedule());
  gate.addEventListener('change', () => { stop(); if (gate.matches) schedule(); else gl.clear(gl.COLOR_BUFFER_BIT); });
  schedule();
})();
