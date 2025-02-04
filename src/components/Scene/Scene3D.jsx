// Scene.jsx
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef
} from 'react';
import * as THREE from 'three';
import shapes from './shapes';

const Scene = forwardRef((props, ref) => {
  const mountRef = useRef(null);

  // Масив об’єктів
  const dynamicObjectsRef = useRef([]);

  // Збереження старих швидкостей (для Stop / Continue)
  const oldVelocitiesRef = useRef([]);
  const oldRotationSpeedsRef = useRef([]);
  const oldMassesRef = useRef([]);

  // Сцена, камера, рендерер
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  // Можливі позиції (кастомні стани)
  const customStatesRef = useRef(shapes);
  const currentStateIndexRef = useRef(0);

  useEffect(() => {
    // 1. Створюємо сцену
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Камера
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // 3. Рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Освітлення
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const pointLight = new THREE.DirectionalLight(0xffffff, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // 5. Межова сфера (прозора), що обмежує рух
    const boundaryRadius = 2;
    const boundaryGeom = new THREE.SphereGeometry(boundaryRadius, 32, 32);
    const boundaryMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: false,
      transparent: true,
      opacity: 0
    });
    const boundarySphere = new THREE.Mesh(boundaryGeom, boundaryMat);
    scene.add(boundarySphere);

    // 6. Динамічні об’єкти
    const dynamicObjects = [];
    dynamicObjectsRef.current = dynamicObjects;

    // Функція створення об’єктів із випадковою початковою швидкістю + малою швидкістю обертання
    function createObj({ geometry, color, x, y }) {
      geometry.computeBoundingSphere();
      const mat = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.2,
        roughness: 0.5,
        wireframe: true
      });
      const mesh = new THREE.Mesh(geometry, mat);

      // Повільне обертання
      mesh.rotationSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      );
      // Початкова швидкість
      mesh.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
      );
      mesh.mass = 1;

      // Для плавного “під’їзду”
      mesh.isLerpingToState = false;
      mesh.lerpAlpha = 0;
      mesh.startPos = new THREE.Vector3();
      mesh.targetPos = new THREE.Vector3();
      mesh.startRot = new THREE.Euler();
      mesh.targetRot = new THREE.Euler();

      mesh.position.set(x, y, 0);

      // Радіус, щоб правильно врахувати при колізії з межами
      mesh.boundingRadius = geometry.boundingSphere.radius;

      scene.add(mesh);
      dynamicObjects.push(mesh);
    }

    // Створюємо 6 об'єктів:
    createObj({ geometry: new THREE.SphereGeometry(0.3, 16, 16), color: 0xff0000, x: 0,    y: 0 });
    createObj({ geometry: new THREE.BoxGeometry(0.1, 1.5, 0.1),  color: 0x00ff00, x: -0.7, y: 0 });
    createObj({ geometry: new THREE.BoxGeometry(0.1, 1.5, 0.1),  color: 0x0000ff, x: 0.7,  y: 0 });
    createObj({ geometry: new THREE.BoxGeometry(0.1, 1.5, 0.1),  color: 0xffff00, x: 0,    y: 0.7 });
    createObj({ geometry: new THREE.BoxGeometry(0.1, 1.5, 0.1),  color: 0xff00ff, x: 0,    y: -0.7 });
    createObj({ geometry: new THREE.BoxGeometry(0.1, 1.5, 0.1),  color: 0x00ffff, x: 0,    y: -0.3 });

    // Анімація
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      dynamicObjects.forEach(obj => {
        if (obj.isLerpingToState) {
          // Плавно їдемо до позицій з customStates
          obj.lerpAlpha += delta; 
          const t = Math.min(obj.lerpAlpha, 1);

          obj.position.lerpVectors(obj.startPos, obj.targetPos, t);

          const qa = new THREE.Quaternion().setFromEuler(obj.startRot);
          const qb = new THREE.Quaternion().setFromEuler(obj.targetRot);
          const qm = new THREE.Quaternion().slerpQuaternions(qa, qb, t);
          obj.rotation.setFromQuaternion(qm);

          if (t >= 1) {
            obj.isLerpingToState = false;
          }
        } else {
          // Звичайний рух
          obj.rotation.x += obj.rotationSpeed.x * delta;
          obj.rotation.y += obj.rotationSpeed.y * delta;
          obj.rotation.z += obj.rotationSpeed.z * delta;

          obj.position.x += obj.velocity.x * delta;
          obj.position.y += obj.velocity.y * delta;
          obj.position.z += obj.velocity.z * delta;
        }

        // Колізія з межами (межова сфера)
        checkBoundaryCollision(obj, 2 /* boundaryRadius */);
      });

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    function onWindowResize() {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    }
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // =========================
  // STOP / CONTINUE
  // =========================
  function stopObjects() {
    const objects = dynamicObjectsRef.current;
    if (!objects || !objects.length) return;

    // Зберігаємо поточні швидкості + обертання
    oldVelocitiesRef.current = objects.map(o => o.velocity.clone());
    oldRotationSpeedsRef.current = objects.map(o => o.rotationSpeed.clone());
    oldMassesRef.current = objects.map(o => o.mass);

    // Зупиняємо
    objects.forEach(o => {
      o.mass = 0;
      o.velocity.set(0, 0, 0);
      o.rotationSpeed.set(0, 0, 0);
    });
  }

  function continueObjects() {
    const objects = dynamicObjectsRef.current;
    if (!objects || !objects.length) return;

    // Даємо нову випадкову швидкість/обертання, починаючи з поточних позицій
    objects.forEach(o => {
      o.mass = 1;
      o.velocity.set(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      );
      o.rotationSpeed.set(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      );
    });
  }

  // =========================
  // Плавний перехід до станів
  // =========================
  function showNextState() {
    const objects = dynamicObjectsRef.current;
    if (!objects?.length) return;

    currentStateIndexRef.current++;
    if (currentStateIndexRef.current >= customStatesRef.current.length) {
      currentStateIndexRef.current = 0;
    }
    applyCurrentState();
  }

  function showPreviousState() {
    const objects = dynamicObjectsRef.current;
    if (!objects?.length) return;

    currentStateIndexRef.current--;
    if (currentStateIndexRef.current < 0) {
      currentStateIndexRef.current = customStatesRef.current.length - 1;
    }
    applyCurrentState();
  }

  function applyCurrentState() {
    const objects = dynamicObjectsRef.current;
    const stateIndex = currentStateIndexRef.current;
    const states = customStatesRef.current;

    if (!states[stateIndex]) return;

    states[stateIndex].forEach((transform, i) => {
      const { position, rotation } = transform;
      const obj = objects[i];

      // зберігаємо старт
      obj.startPos = obj.position.clone();
      obj.startRot = new THREE.Euler().copy(obj.rotation);

      // ціль
      obj.targetPos = position.clone();
      obj.targetRot = new THREE.Euler(rotation.x, rotation.y, rotation.z);

      obj.lerpAlpha = 0;
      obj.isLerpingToState = true;
    });
  }

  // =========================
  // Колізія з межовою кулею
  // =========================
  function checkBoundaryCollision(obj, boundaryRadius) {
    const distFromCenter = obj.position.length();
    const maxDist = boundaryRadius - (obj.boundingRadius || 0);

    if (distFromCenter > maxDist) {
      // знаходимо нормаль
      const normal = obj.position.clone().normalize();
      // притискаємо
      obj.position.setLength(maxDist);
      // віддзеркалюємо швидкість
      const speed = obj.velocity.length();
      obj.velocity.reflect(normal).setLength(speed);
    }
  }

  // ======================================
  // Проброс методів
  // ======================================
  useImperativeHandle(ref, () => ({
    stopObjects,
    continueObjects,
    showNextState,
    showPreviousState
  }));

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '50vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    />
  );
});

export default Scene;
