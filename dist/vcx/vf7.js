/* Mô hình 3D minh họa dáng SUV coupe theo VinFast VF 7, dựng hoàn toàn bằng code (không dùng file CAD,
   ảnh hay logo của hãng), để giải thích quyền lợi bảo hiểm vật chất xe: xoay xem ngoại thất, lật xem bộ pin.
   Chuyển nguyên phần dựng cảnh từ vf7-viewer.tsx của baohiempvi-vn (16/11/2026).
   Three.js r170 (MIT) ở /vendor/three-0.170.0, chép nguyên từ baohiempvi-vn (đã đối chiếu sha256 với gói npm). */
const THREE_URL = '/vendor/three-0.170.0/three.module.min.js';
const PAINTS = [{ hex: 0xe9eef2 }];

export async function mount(figure) {
  const host = figure.querySelector('.vcx-canvas');
  const note = figure.querySelector('.vcx-canvasNote');
  const pack = figure.querySelector('.vcx-packLabel');
  let THREE;
  try { THREE = await import(THREE_URL); } catch { note.textContent = 'Thiết bị chưa hỗ trợ mô hình 3D.'; return; }
  let api;
  try { api = buildScene(THREE, host); } catch { note.textContent = 'Thiết bị chưa hỗ trợ mô hình 3D.'; return; }
  note.hidden = true;
  const views = figure.querySelectorAll('[data-view]');
  views.forEach((b) => b.addEventListener('click', () => {
    views.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    pack.hidden = b.dataset.view !== 'battery';
    api.setView(b.dataset.view);
  }));
  const paints = figure.querySelectorAll('[data-paint]');
  paints.forEach((b) => b.addEventListener('click', () => {
    paints.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    api.setPaint(Number(b.dataset.paint));
  }));
}

function buildScene(THREE, host) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  host.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  scene.add(new THREE.HemisphereLight(0xeaf4ff, 0x5d6f84, 2.6));
  const key = new THREE.DirectionalLight(0xffffff, 4);
  key.position.set(-3, 7, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xb9dcff, 2.4);
  rim.position.set(4, 3, -5);
  scene.add(rim);

  const pivot = new THREE.Group();
  scene.add(pivot);
  const car = new THREE.Group();
  pivot.add(car);

  const paint = new THREE.MeshPhysicalMaterial({ color: PAINTS[0].hex, metalness: 0.5, roughness: 0.26, clearcoat: 1, clearcoatRoughness: 0.15 });
  const black = new THREE.MeshStandardMaterial({ color: 0x121922, roughness: 0.6 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x14303f, metalness: 0.5, roughness: 0.1, clearcoat: 1 });
  const chrome = new THREE.MeshStandardMaterial({ color: 0xa9c0d3, metalness: 0.9, roughness: 0.22 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x161c24, roughness: 0.88 });
  const lamp = new THREE.MeshStandardMaterial({ color: 0xf2f9ff, emissive: 0xa9dcff, emissiveIntensity: 1.1 });
  const red = new THREE.MeshStandardMaterial({ color: 0xc8102e, emissive: 0x7a0012, emissiveIntensity: 0.9 });
  const packMat = new THREE.MeshStandardMaterial({ color: 0x0e5a9a, metalness: 0.55, roughness: 0.3 });
  const cell = new THREE.MeshStandardMaterial({ color: 0x48a6d6, metalness: 0.5, roughness: 0.3 });
  const mesh = (g, m, parent = car) => { const o = new THREE.Mesh(g, m); parent.add(o); return o; };
  const box = (x, y, z, w, h, d, m, parent = car) => {
    const o = mesh(new THREE.BoxGeometry(w, h, d), m, parent);
    o.position.set(x, y, z);
    return o;
  };
  const tube = (pts, m, r = 0.014, parent = car) =>
    mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p[0], p[1], p[2]))), 32, r, 8, false), m, parent);
  const surface = (pts, m) => {
    const g = new THREE.BufferGeometry();
    const v = [];
    for (let i = 1; i < pts.length - 1; i++) v.push(...pts[0], ...pts[i], ...pts[i + 1]);
    g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
    g.computeVertexNormals();
    const o = mesh(g, m);
    o.material.side = THREE.DoubleSide;
    return o;
  };

  // Thân xe: SUV coupe thấp, mũi dài, đuôi vát (x âm là đầu xe).
  const s = new THREE.Shape();
  s.moveTo(-2.42, 0.56);
  s.lineTo(-2.4, 0.95);
  s.quadraticCurveTo(-2.36, 1.1, -1.9, 1.14);
  s.lineTo(-1.15, 1.2);
  s.lineTo(1.7, 1.21);
  s.quadraticCurveTo(2.32, 1.18, 2.38, 0.99);
  s.lineTo(2.4, 0.58);
  s.lineTo(2.1, 0.5);
  s.lineTo(2.08, 0.56);
  s.absarc(1.52, 0.56, 0.56, 0, Math.PI, false);
  s.lineTo(-0.96, 0.56);
  s.absarc(-1.52, 0.56, 0.56, 0, Math.PI, false);
  s.lineTo(-2.42, 0.56);
  const body = mesh(new THREE.ExtrudeGeometry(s, { depth: 1.74, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.04, bevelThickness: 0.05, curveSegments: 40 }), paint);
  body.position.z = -0.87;
  box(0, 0.5, 0, 1.9, 0.12, 1.66, black);

  // Khoang lái: kính lái dốc, mui thấp, kính sau vát dài kiểu coupe.
  const A = -1.2, B = -0.5, C = 0.55, D = 1.95, y0 = 1.18, yR = 1.74, wT = 0.64, wB = 0.84;
  surface([[A, y0, -wB], [B, yR, -wT], [B, yR, wT], [A, y0, wB]], glass);
  surface([[B, yR, -wT], [C, yR + 0.02, -wT], [C, yR + 0.02, wT], [B, yR, wT]], black);
  surface([[C, yR + 0.02, -wT], [D, y0 + 0.06, -wB], [D, y0 + 0.06, wB], [C, yR + 0.02, wT]], glass);
  for (const side of [-1, 1]) {
    const z = side * wB, zt = side * wT;
    surface([[A + 0.08, y0 + 0.03, z], [B + 0.04, yR - 0.05, zt], [0.18, yR - 0.04, zt], [0.18, y0 + 0.03, z]], glass);
    surface([[0.27, y0 + 0.03, z], [0.27, yR - 0.04, zt], [C - 0.02, yR - 0.03, zt], [1.62, y0 + 0.05, z]], glass);
    tube([[A, y0, z], [B, yR + 0.01, zt], [C, yR + 0.03, zt], [D, y0 + 0.07, z]], paint, 0.034);
    tube([[0.22, 0.58, z * 1.03], [0.22, y0 + 0.02, z]], black, 0.008);
    tube([[-2.0, 0.93, z * 1.04], [-0.8, 1.05, z * 1.04], [2.0, 1.04, z * 1.04]], chrome, 0.007);
    box(-0.9, y0 + 0.02, side * 0.96, 0.22, 0.1, 0.18, paint); // gương
    box(0.02, 0.6, side * 0.9, 1.84, 0.12, 0.05, black); // ốp sườn
  }
  // Mặt trước: dải đèn chữ V liền khối; đuôi: dải đèn đỏ ngang.
  tube([[-2.42, 1.06, -0.82], [-2.47, 1.03, -0.3], [-2.5, 0.97, 0], [-2.47, 1.03, 0.3], [-2.42, 1.06, 0.82]], lamp, 0.018);
  for (const side of [-1, 1]) box(-2.43, 0.8, side * 0.66, 0.03, 0.08, 0.3, lamp);
  box(-2.44, 0.66, 0, 0.03, 0.18, 1.3, black);
  tube([[2.38, 1.07, -0.84], [2.42, 1.08, 0], [2.38, 1.07, 0.84]], red, 0.02);
  box(2.41, 0.66, 0, 0.03, 0.16, 1.48, black);

  // Bánh xe: lốp, mâm nhiều chấu, viền vòm bánh đen.
  for (const x of [-1.52, 1.52]) for (const side of [-1, 1]) {
    const wheel = new THREE.Group();
    wheel.position.set(x, 0.53, side * 0.9);
    car.add(wheel);
    const tire = mesh(new THREE.TorusGeometry(0.4, 0.12, 18, 48), rubber, wheel);
    tire.scale.z = 1.25;
    const disc = mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.04, 40), chrome, wheel);
    disc.rotation.x = Math.PI / 2;
    disc.position.z = side * 0.1;
    for (let i = 0; i < 5; i++) {
      const a = (i * Math.PI * 2) / 5;
      const spoke = box(Math.sin(a) * 0.17, Math.cos(a) * 0.17, side * 0.16, 0.07, 0.32, 0.03, black, wheel);
      spoke.rotation.z = -a;
    }
    const hub = mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.035, 24), chrome, wheel);
    hub.rotation.x = Math.PI / 2;
    hub.position.z = side * 0.19;
    const arch = [];
    for (let a = 0; a <= Math.PI; a += Math.PI / 36) arch.push([x + Math.cos(a) * 0.565, 0.56 + Math.sin(a) * 0.565, side * 0.92]);
    tube(arch, black, 0.026);
  }

  // Bộ pin dưới sàn (minh họa vị trí).
  const pack = new THREE.Group();
  car.add(pack);
  box(0, 0.34, 0, 2.6, 0.17, 1.46, packMat, pack);
  for (let x = -1.0; x <= 1.01; x += 0.4) for (let z = -0.46; z <= 0.47; z += 0.46) box(x, 0.235, z, 0.34, 0.06, 0.39, cell, pack);

  const ground = new THREE.Mesh(new THREE.CircleGeometry(3.6, 64), new THREE.MeshBasicMaterial({ color: 0xdbe8f4, transparent: true, opacity: 0.55 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  scene.add(ground);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const yawVel = reduced ? 0 : 0.0016;
  let flipTarget = 0, flip = 0, yaw = -0.62, dragging = false, lastX = 0, raf = 0, idleUntil = 0;

  const draw = () => {
    raf = 0;
    flip += (flipTarget - flip) * (reduced ? 1 : 0.12);
    if (Math.abs(flipTarget - flip) < 0.001) flip = flipTarget;
    if (!dragging && performance.now() > idleUntil) yaw += yawVel;
    pivot.rotation.y = yaw;
    car.rotation.x = -flip * Math.PI * 0.72;
    car.position.y = flip * 1.75;
    renderer.render(scene, camera);
    if (flip !== flipTarget || (!reduced && !document.hidden)) raf = requestAnimationFrame(draw);
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(draw); };

  const canvas = renderer.domElement;
  canvas.style.touchAction = "pan-y";
  const down = (e) => { dragging = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); };
  const move = (e) => { if (!dragging) return; yaw += (e.clientX - lastX) * 0.01; lastX = e.clientX; schedule(); };
  const up = () => { dragging = false; idleUntil = performance.now() + 2500; schedule(); };
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointercancel", up);

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const fit = Math.max(1, 1.55 / camera.aspect);
    camera.position.set(-5.4 * fit, 2.7 * fit, 5.2 * fit);
    camera.lookAt(0, 0.8, 0);
    camera.updateProjectionMatrix();
    schedule();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const vis = () => schedule();
  document.addEventListener("visibilitychange", vis);
  resize();

  return {
    setView: (v) => { flipTarget = v === "battery" ? 1 : 0; schedule(); },
    setPaint: (hex) => { paint.color.setHex(hex); schedule(); },
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", vis);
      renderer.dispose();
      canvas.remove();
    },
  };
}
