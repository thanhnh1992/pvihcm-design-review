const motionQuery = matchMedia('(min-width:821px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
const heroStage = document.querySelector('.hero-stage');
const depthLayers = [...document.querySelectorAll('[data-depth]')];
let frame = 0;
let inView = true;
function drawDepth() {
  frame = 0;
  if (!heroStage || !motionQuery.matches || !inView) return;
  const bounds = heroStage.getBoundingClientRect();
  const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - bounds.top - bounds.height / 2) / innerHeight));
  for (const layer of depthLayers) layer.style.setProperty('--depth-y', `${(progress * Number(layer.dataset.depth)).toFixed(2)}px`);
}
function scheduleDepth() {
  if (!frame && inView && motionQuery.matches) frame = requestAnimationFrame(drawDepth);
}
function resetDepth() {
  cancelAnimationFrame(frame);
  frame = 0;
  for (const layer of depthLayers) layer.style.removeProperty('--depth-y');
  scheduleDepth();
}
if (heroStage && depthLayers.length) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; if (inView) scheduleDepth(); });
    observer.observe(heroStage);
  }
  addEventListener('scroll', scheduleDepth, { passive: true });
  addEventListener('resize', resetDepth, { passive: true });
  motionQuery.addEventListener('change', resetDepth);
  scheduleDepth();
}

const heroTiles = [...document.querySelectorAll('.hero-tile')];
function resetHeroTile(tile) {
  tile.classList.remove('is-tilting');
  tile.style.removeProperty('--pointer-x');
  tile.style.removeProperty('--pointer-y');
  tile.style.removeProperty('--shine-x');
}
for (const tile of heroTiles) {
  let bounds;
  let tiltFrame = 0;
  tile.addEventListener('pointerenter', () => {
    if (!motionQuery.matches) return;
    bounds = tile.getBoundingClientRect();
    tile.classList.add('is-tilting');
  });
  tile.addEventListener('pointermove', (event) => {
    if (!motionQuery.matches || !bounds) return;
    const x = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
    cancelAnimationFrame(tiltFrame);
    tiltFrame = requestAnimationFrame(() => {
      tile.style.setProperty('--pointer-x', `${(x * 14).toFixed(2)}deg`);
      tile.style.setProperty('--pointer-y', `${(-y * 11).toFixed(2)}deg`);
      tile.style.setProperty('--shine-x', `${(x * 90).toFixed(1)}%`);
    });
  });
  tile.addEventListener('pointerleave', () => {
    cancelAnimationFrame(tiltFrame);
    bounds = undefined;
    resetHeroTile(tile);
  });
  tile.addEventListener('blur', () => resetHeroTile(tile));
}
motionQuery.addEventListener('change', () => {
  if (!motionQuery.matches) heroTiles.forEach(resetHeroTile);
});
// Native links preserve keyboard, touch, new tabs and browser-back behavior.
document.querySelector('#print-button')?.addEventListener('click', () => print());

const heroField = document.querySelector('#hero-field');
const fieldGl = heroField && heroField.getContext('webgl', { alpha: true, antialias: false, depth: false, powerPreference: 'low-power' });
if (fieldGl) {
  const COUNT = 700;
  const program = fieldGl.createProgram();
  const attach = (type, source) => {
    const shader = fieldGl.createShader(type);
    fieldGl.shaderSource(shader, source);
    fieldGl.compileShader(shader);
    fieldGl.attachShader(program, shader);
  };
  attach(fieldGl.VERTEX_SHADER, `precision mediump float;
attribute vec3 aPos;attribute vec3 aSeed;
uniform float uTime;uniform vec2 uPointer;uniform float uAspect;uniform float uScale;
varying float vDepth;varying float vAlpha;
const float TAU=6.28318;
void main(){
  vec3 p=aPos;
  p.x+=sin(uTime*.130+aSeed.x*TAU)*.075;
  p.y+=cos(uTime*.100+aSeed.y*TAU)*.062;
  p.x+=cos(uTime*.045+aSeed.y*TAU)*.035;
  p.y+=sin(uTime*.061+aSeed.x*TAU)*.030;
  float z=mix(1.3,4.4,p.z);
  vec2 proj=(p.xy*1.6+uPointer*(.16*(1.-p.z)+.03))/z;
  gl_Position=vec4(proj.x/uAspect,proj.y,0.,1.);
  float sizeMix=pow(aSeed.z,2.2);
  gl_PointSize=clamp(uScale*mix(.5,2.7,sizeMix)/z,1.,150.);
  vDepth=p.z;
  vAlpha=mix(.30,.05,p.z)*mix(1.,.45,sizeMix);
}`);
  attach(fieldGl.FRAGMENT_SHADER, `precision mediump float;
varying float vDepth;varying float vAlpha;
void main(){
  vec2 c=gl_PointCoord-.5;
  float d=length(c);
  if(d>.5)discard;
  float a=pow(smoothstep(.5,0.,d),1.7)*vAlpha;
  gl_FragColor=vec4(mix(vec3(.051,.290,.545),vec3(.612,.827,.937),vDepth)*a,a);
}`);
  fieldGl.linkProgram(program);
  if (fieldGl.getProgramParameter(program, fieldGl.LINK_STATUS)) {
    fieldGl.useProgram(program);
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 3);
    const depths = Array.from({ length: COUNT }, () => Math.random() ** 0.75).sort((a, b) => b - a);
    for (let i = 0; i < COUNT; i += 1) {
      // Hai phần ba dồn quanh vị trí vầng sáng cũ (78%, 35%), phần còn lại rải thưa.
      const clustered = i % 3 !== 0;
      const spread = clustered ? 0.62 : 1.15;
      positions[i * 3] = (clustered ? 0.56 : 0) + (Math.random() + Math.random() - 1) * spread;
      positions[i * 3 + 1] = (clustered ? 0.3 : 0) + (Math.random() + Math.random() - 1) * spread * 0.85;
      positions[i * 3 + 2] = depths[i];
      seeds[i * 3] = Math.random();
      seeds[i * 3 + 1] = Math.random();
      seeds[i * 3 + 2] = Math.random();
    }
    for (const [name, data] of [['aPos', positions], ['aSeed', seeds]]) {
      fieldGl.bindBuffer(fieldGl.ARRAY_BUFFER, fieldGl.createBuffer());
      fieldGl.bufferData(fieldGl.ARRAY_BUFFER, data, fieldGl.STATIC_DRAW);
      const location = fieldGl.getAttribLocation(program, name);
      fieldGl.enableVertexAttribArray(location);
      fieldGl.vertexAttribPointer(location, 3, fieldGl.FLOAT, false, 0, 0);
    }
    const uTime = fieldGl.getUniformLocation(program, 'uTime');
    const uPointer = fieldGl.getUniformLocation(program, 'uPointer');
    const uAspect = fieldGl.getUniformLocation(program, 'uAspect');
    const uScale = fieldGl.getUniformLocation(program, 'uScale');
    fieldGl.disable(fieldGl.DEPTH_TEST);
    fieldGl.enable(fieldGl.BLEND);
    fieldGl.blendFunc(fieldGl.ONE, fieldGl.ONE_MINUS_SRC_ALPHA);
    fieldGl.clearColor(0, 0, 0, 0);
    let fieldFrame = 0;
    let fieldInView = true;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let clock = 0;
    let last = 0;
    function sizeField() {
      const bounds = heroField.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      heroField.width = Math.round(bounds.width * ratio);
      heroField.height = Math.round(bounds.height * ratio);
      fieldGl.viewport(0, 0, heroField.width, heroField.height);
      fieldGl.uniform1f(uAspect, bounds.width / bounds.height);
      fieldGl.uniform1f(uScale, 32 * ratio);
    }
    function drawField(now) {
      fieldFrame = 0;
      clock += Math.min((now - last) / 1000, 0.05);
      last = now;
      pointerX += (targetX - pointerX) * 0.045;
      pointerY += (targetY - pointerY) * 0.045;
      fieldGl.uniform1f(uTime, clock);
      fieldGl.uniform2f(uPointer, pointerX, pointerY);
      fieldGl.clear(fieldGl.COLOR_BUFFER_BIT);
      fieldGl.drawArrays(fieldGl.POINTS, 0, COUNT);
      scheduleField();
    }
    function scheduleField() {
      if (!fieldFrame && fieldInView && !document.hidden && motionQuery.matches) fieldFrame = requestAnimationFrame(drawField);
    }
    function stopField() {
      cancelAnimationFrame(fieldFrame);
      fieldFrame = 0;
      last = 0;
    }
    function startField() {
      if (fieldFrame) return;
      last = performance.now();
      scheduleField();
    }
    sizeField();
    if ('ResizeObserver' in window) new ResizeObserver(sizeField).observe(heroField);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        fieldInView = entry.isIntersecting;
        if (fieldInView) startField();
        else stopField();
      }).observe(heroField);
    }
    addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const bounds = heroField.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      targetY = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
    }, { passive: true });
    document.addEventListener('visibilitychange', () => (document.hidden ? stopField() : startField()));
    // Cùng một cổng chuyển động với hiệu ứng nghiêng thẻ: chỉ desktop có chuột thật.
    motionQuery.addEventListener('change', () => {
      stopField();
      if (motionQuery.matches) startField();
      else fieldGl.clear(fieldGl.COLOR_BUFFER_BIT);
    });
    startField();
  }
}
