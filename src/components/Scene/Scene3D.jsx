// Scene.js
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import shapes from './shapes';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { OBB } from 'three/examples/jsm/math/OBB.js';

/* ========= Налаштування для дебагу ========= */
const debugConfig = {
  showDebugCursorCollision: false,   // Увімкнути дебаг колізій з курсором
  debugCursorColor: 0xff00ff,         // Колір дебаг-сфери для курсора
};

/* ========= Глобальні налаштування ========= */
const boundaryConfig = {
  collisionType: 'OBB',   // 'OBB' або 'sphere'
  sphereScale: 1,
  showDebugOBB: false,
  showDebugSphere: false,
};

const speedConfig = {
  objectSpeedMultiplier: 1,    // Множник для початкових швидкостей (rotationSpeed та velocity)
  stateLerpSpeed: 0.3,         // Множник для швидкості переходу (applyCurrentState)
};

const CURSOR_IMPULSE_MULTIPLIER = 0.1;  // Регулювання сили відштовхування курсора

/* ========= Допоміжні функції ========= */
// Обчислення OBB для mesh
function createOBB(mesh) {
  mesh.updateWorldMatrix(true, false);
  mesh.geometry.computeBoundingBox();
  const bbox = mesh.geometry.boundingBox;
  const size = new THREE.Vector3();
  bbox.getSize(size);
  const halfSize = size.multiplyScalar(0.5);
  const center = new THREE.Vector3();
  bbox.getCenter(center);
  center.applyMatrix4(mesh.matrixWorld);
  const obb = new OBB();
  obb.center.copy(center);
  obb.halfSize.copy(halfSize);
  const m3 = new THREE.Matrix3().setFromMatrix4(mesh.matrixWorld);
  obb.rotation.copy(m3);
  return obb;
}

// Створення OBB-хелпера (для дебагу)
function createOBBHelper(obb) {
  const vertices = [];
  for (let i = 0; i < 8; i++) {
    const sx = (i & 1) ? 1 : -1;
    const sy = (i & 2) ? 1 : -1;
    const sz = (i & 4) ? 1 : -1;
    const localCorner = new THREE.Vector3(
      sx * obb.halfSize.x,
      sy * obb.halfSize.y,
      sz * obb.halfSize.z
    );
    localCorner.applyMatrix3(obb.rotation);
    localCorner.add(obb.center);
    vertices.push(localCorner);
  }
  const indices = [
    0, 1, 0, 2, 0, 4,
    1, 3, 1, 5,
    2, 3, 2, 6,
    3, 7,
    4, 5, 4, 6,
    5, 7,
    6, 7,
  ];
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(indices.length * 3);
  for (let i = 0; i < indices.length; i++) {
    const v = vertices[indices[i]];
    positions[i * 3] = v.x;
    positions[i * 3 + 1] = v.y;
    positions[i * 3 + 2] = v.z;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({
    color: 0x00ff00,
    depthTest: false,
    transparent: true,
    opacity: 1
  });
  return new THREE.LineSegments(geometry, material);
}

// Створення дебаг-сфери (сферичної межі)
function createSphereDebug(mesh, scale) {
  const debugGeometry = new THREE.SphereGeometry(mesh.geometry.boundingSphere.radius * scale, 16, 16);
  const debugMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
    transparent: true,
    opacity: 0.5
  });
  const debugSphere = new THREE.Mesh(debugGeometry, debugMaterial);
  debugSphere.position.copy(mesh.geometry.boundingSphere.center);
  return debugSphere;
}

/* ========= Компонент Scene ========= */
const Scene = forwardRef(({ hdrTexture }, ref) => {
  /* ---------- Рефи та змінні ---------- */
  const mountRef = useRef(null);
  const composerRef = useRef(null);
  const dynamicObjectsRef = useRef([]);
  const oldVelocitiesRef = useRef([]);
  const oldRotationSpeedsRef = useRef([]);
  const oldMassesRef = useRef([]);
  const collisionsEnabledRef = useRef(true);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const objectsGroupRef = useRef(new THREE.Group());
  const customStatesRef = useRef(shapes);
  const currentStateIndexRef = useRef(0);

  // Реф для збереження нормалізованих координат миші (в 2D)
  const mouseCoordsRef = useRef(new THREE.Vector2());
  // Прапорець, що визначає, чи рухалась миша (на старті false)
  const hasMouseMovedRef = useRef(false);

  // Для попереднього відстеження швидкості миші (опційно)
  const cursorPrevRef = useRef(new THREE.Vector3());
  // Реф для дебаг-об’єкта колізії з курсором
  const cursorCollisionDebugRef = useRef(null);

  useEffect(() => {
    /* ========= Ініціалізація Сцени ========= */
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const objectsGroup = new THREE.Group();
    objectsGroupRef.current = objectsGroup;
    scene.add(objectsGroup);

    // Якщо увімкнено дебаг колізій з курсором, створюємо дебаг-сферу
    if (debugConfig.showDebugCursorCollision) {
      const debugSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        new THREE.MeshBasicMaterial({ color: debugConfig.debugCursorColor, wireframe: true })
      );
      debugSphere.visible = false;
      scene.add(debugSphere);
      cursorCollisionDebugRef.current = debugSphere;
    }

    /* ========= Налаштування Камери ========= */
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    /* ========= Налаштування Рендера ========= */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    /* ========= Налаштування Постпроцесінгу ========= */
    const composer = new EffectComposer(renderer);
    composerRef.current = composer;
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    if (renderer.getPixelRatio() === 1) {
      const smaaPass = new SMAAPass(window.innerWidth, window.innerHeight);
      composer.addPass(smaaPass);
    }
    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    /* ========= Обробка HDR Текстури ========= */
    renderer.physicallyCorrectLights = true;
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    if (hdrTexture) {
      const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;
      scene.environment = envMap;
      pmremGenerator.dispose();
    } else {
      new RGBELoader()
        .setPath('hdr_maps/')
        .load('poly_haven_studio_1k.hdr', (texture) => {
          const envMap = pmremGenerator.fromEquirectangular(texture).texture;
          scene.environment = envMap;
          texture.dispose();
          pmremGenerator.dispose();
        });
    }

    /* ========= Налаштування Освітлення ========= */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(2, 2, 2);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 20;
    directionalLight.shadow.camera.left = -5;
    directionalLight.shadow.camera.right = 5;
    directionalLight.shadow.camera.top = 5;
    directionalLight.shadow.camera.bottom = -5;
    scene.add(directionalLight);

    /* ========= Межова Сфера (прозора) ========= */
    const boundaryRadius = 2.5;
    const boundaryGeom = new THREE.SphereGeometry(boundaryRadius, 32, 32);
    const boundaryMat = new THREE.MeshBasicMaterial({
      color: 0x000,
      wireframe: false,
      transparent: true,
      opacity: 0
    });
    const boundarySphere = new THREE.Mesh(boundaryGeom, boundaryMat);
    scene.add(boundarySphere);

    /* ========= Функція створення об’єктів ========= */
    const dynamicObjects = [];
    dynamicObjectsRef.current = dynamicObjects;
    function createObj({ geometry, color, x, y, speed = 0.05, rotation, isStatic = false }) {
      geometry.computeBoundingSphere();
      const material = new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.5,
        roughness: 0.3,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        sheen: 0.5,
        transmission: 0.2,
        opacity: 1,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      if (!isStatic) {
        mesh.rotationSpeed = new THREE.Vector3(
          (Math.random() - 0.5) * speed * speedConfig.objectSpeedMultiplier,
          (Math.random() - 0.5) * speed * speedConfig.objectSpeedMultiplier,
          (Math.random() - 0.5) * speed * speedConfig.objectSpeedMultiplier
        );
        mesh.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * speed * speedConfig.objectSpeedMultiplier,
          (Math.random() - 0.5) * speed * speedConfig.objectSpeedMultiplier,
          (Math.random() - 0.5) * speed * speedConfig.objectSpeedMultiplier
        );
      } else {
        mesh.rotationSpeed = new THREE.Vector3(0, 0, 0);
        mesh.velocity = new THREE.Vector3(0, 0, 0);
      }
      
      // Зберігаємо початкові швидкості як мінімальні значення
      mesh.initialVelocity = mesh.velocity.clone();
      mesh.initialRotationSpeed = mesh.rotationSpeed.clone();

      mesh.mass = 1;
      mesh.position.set(x, y, 0);
      mesh.boundingRadius = geometry.boundingSphere.radius * boundaryConfig.sphereScale;
      mesh.isLerpingToState = false;
      mesh.lerpAlpha = 0;
      mesh.startPos = new THREE.Vector3();
      mesh.targetPos = new THREE.Vector3();
      mesh.startRot = new THREE.Euler();
      mesh.targetRot = new THREE.Euler();

      if (rotation) {
        mesh.rotation.copy(rotation);
      }
      
      if (boundaryConfig.collisionType === 'OBB' && geometry.type === 'CapsuleGeometry') {
        if (boundaryConfig.showDebugOBB) {
          mesh.obbHelper = createOBBHelper(createOBB(mesh));
          scene.add(mesh.obbHelper);
        }
      } else {
        if (boundaryConfig.showDebugSphere) {
          const debugSphere = createSphereDebug(mesh, boundaryConfig.sphereScale);
          mesh.add(debugSphere);
        }
      }
      
      objectsGroup.add(mesh);
      dynamicObjectsRef.current.push(mesh);
    }

    /* ========= Створення об’єктів ========= */
    // Центральний об’єкт (сфера) – створюється як звичайний; колізія з курсором не обробляється,
    // допоки користувач не почне рухати мишею
    createObj({ geometry: new THREE.SphereGeometry(0.3, 50, 50), color: 0x0000, x: 0, y: 0, isStatic: false });

    // Об’єкти, розташовані по колу
    const count = 5;
    const radius = 3;
    for (let i = 0; i < count; i++) {
      const angle = i * (2 * Math.PI / count);
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      createObj({ geometry: new THREE.CapsuleGeometry(0.1, 0.5, 50, 50), color: 0x0000, x, y });
    }

    /* ========= Обробка подій ========= */
    // Глобальне обертання групи об’єктів при скролі
    const scrollFactor = 0.001;
    function updateGroupRotation() {
      const scrollY = window.scrollY;
      if (objectsGroupRef.current) {
        objectsGroupRef.current.rotation.y = scrollY * scrollFactor;
      }
    }
    function throttle(fn, delay) {
      let lastCall = 0;
      return function (...args) {
        const now = Date.now();
        if (now - lastCall < delay) return;
        lastCall = now;
        return fn(...args);
      };
    }
    const throttledUpdateGroupRotation = throttle(updateGroupRotation, 16);
    window.addEventListener('scroll', throttledUpdateGroupRotation);

    // Обробка руху миші – зберігаємо нормалізовані координати
    function onMouseMove(event) {
      const rect = mountRef.current.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      mouseCoordsRef.current.copy(mouse);
      // Позначаємо, що миша рухнулась
      hasMouseMovedRef.current = true;
    }
    window.addEventListener('mousemove', onMouseMove);

    /* ========= Анімаційний цикл ========= */
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Скидання лічильника зіткнень для кожного об’єкта
      dynamicObjectsRef.current.forEach(obj => {
        obj.collisionCount = 0;
      });

      /* --- Оновлення позицій та обертів об’єктів --- */
      dynamicObjectsRef.current.forEach(obj => {
        if (obj.isLerpingToState) {
          obj.lerpAlpha += delta * speedConfig.stateLerpSpeed;
          const t = Math.min(obj.lerpAlpha, 1);
          obj.position.lerpVectors(obj.startPos, obj.targetPos, t);
          const qa = new THREE.Quaternion().setFromEuler(obj.startRot);
          const qb = new THREE.Quaternion().setFromEuler(obj.targetRot);
          const qm = new THREE.Quaternion().slerpQuaternions(qa, qb, t);
          obj.rotation.setFromQuaternion(qm);
          if (t >= 1) obj.isLerpingToState = false;
        } else {
          obj.rotation.x += obj.rotationSpeed.x * delta;
          obj.rotation.z += obj.rotationSpeed.z * delta;
          obj.position.x += obj.velocity.x * delta;
          obj.position.y += obj.velocity.y * delta;
          obj.position.z += obj.velocity.z * delta;
        }
        // Обмеження віддалення від центру
        const distFromCenter = obj.position.length();
        const maxDist = 2 - (obj.boundingRadius || 0);
        if (distFromCenter > maxDist) {
          const normal = obj.position.clone().normalize();
          obj.position.setLength(maxDist);
          const speed = obj.velocity.length();
          obj.velocity.reflect(normal).setLength(speed);
        }
        // Оновлення дебаг-хелперів OBB, якщо увімкнено
        if (obj.obbHelper && boundaryConfig.showDebugOBB) {
          const obb = createOBB(obj);
          const newHelper = createOBBHelper(obb);
          obj.obbHelper.geometry.dispose();
          obj.obbHelper.geometry = newHelper.geometry;
        }
      });

      /* --- Обробка колізій між об’єктами (OBB) --- */
      if (collisionsEnabledRef.current && boundaryConfig.collisionType === 'OBB') {
        const objs = dynamicObjectsRef.current;
        const obbArray = objs.map(obj => createOBB(obj));
        for (let i = 0; i < obbArray.length; i++) {
          for (let j = i + 1; j < obbArray.length; j++) {
            if (obbArray[i].intersectsOBB(obbArray[j])) {
              objs[i].collisionCount = (objs[i].collisionCount || 0) + 1;
              objs[j].collisionCount = (objs[j].collisionCount || 0) + 1;
              const n = new THREE.Vector3().subVectors(obbArray[i].center, obbArray[j].center);
              if (n.lengthSq() === 0) n.set(Math.random(), Math.random(), Math.random());
              n.normalize();
              const relativeVelocity = new THREE.Vector3().subVectors(objs[i].velocity, objs[j].velocity);
              const v_rel = relativeVelocity.dot(n);
              if (v_rel < 0) {
                const e = 1;
                const jImpulse = -(1 + e) * v_rel / ((1 / objs[i].mass) + (1 / objs[j].mass));
                const impulse = n.clone().multiplyScalar(jImpulse);
                objs[i].velocity.add(impulse.clone().divideScalar(objs[i].mass));
                objs[j].velocity.sub(impulse.clone().divideScalar(objs[j].mass));
              }
              const correction = n.clone().multiplyScalar(0.01);
              objs[i].position.add(correction);
              objs[j].position.sub(correction);
            }
          }
        }
      }

      /* --- Колізія "курсора" як променя --- */
      // Виконуємо логіку колізії з мишею лише після першого руху
      if (hasMouseMovedRef.current) {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouseCoordsRef.current, cameraRef.current);
        const ray = raycaster.ray;
        let cursorCollisionFound = false;
        dynamicObjectsRef.current.forEach(obj => {
          const sphere = new THREE.Sphere(obj.position, obj.boundingRadius);
          if (ray.intersectsSphere(sphere)) {
            const closestPoint = new THREE.Vector3();
            ray.closestPointToPoint(obj.position, closestPoint);
            const dist = closestPoint.distanceTo(obj.position);
            if (dist < obj.boundingRadius) {
              const n = new THREE.Vector3().subVectors(obj.position, closestPoint).normalize();
              const impulseStrength = CURSOR_IMPULSE_MULTIPLIER;
              obj.velocity.add(n.clone().multiplyScalar(impulseStrength));
              const rotationalImpulse = new THREE.Vector3(n.y, 0, -n.x).multiplyScalar(impulseStrength * 0.5);
              obj.rotationSpeed.add(rotationalImpulse);
              obj.collisionCount = (obj.collisionCount || 0) + 1;
              // Якщо увімкнено дебаг колізій з курсором – оновлюємо дебаг-об’єкт
              if (debugConfig.showDebugCursorCollision && cursorCollisionDebugRef.current) {
                cursorCollisionDebugRef.current.position.copy(closestPoint);
                cursorCollisionDebugRef.current.visible = true;
              }
              cursorCollisionFound = true;
            }
          }
        });
        // Якщо жодна колізія не виявлена, ховаємо дебаг-об’єкт
        if (cursorCollisionDebugRef.current && !cursorCollisionFound) {
          cursorCollisionDebugRef.current.visible = false;
        }
      }

      /* --- Застосування затухання (damping) з мінімальним рівнем --- */
      dynamicObjectsRef.current.forEach(obj => {
        const baseDamping = 0.99;
        const extraDamping = 1 - Math.min(0.05 * (obj.collisionCount || 0), 0.5);
        const dampingFactor = baseDamping * extraDamping;
        // Для лінійної швидкості:
        const currentSpeed = obj.velocity.length();
        const dampedSpeed = currentSpeed * dampingFactor;
        const minSpeed = obj.initialVelocity ? obj.initialVelocity.length() : 0;
        const finalSpeed = Math.max(dampedSpeed, minSpeed);
        if (obj.velocity.length() > 0) {
          obj.velocity.setLength(finalSpeed);
        }
        // Для кутової швидкості:
        const currentRotSpeed = obj.rotationSpeed.length();
        const dampedRotSpeed = currentRotSpeed * dampingFactor;
        const minRotSpeed = obj.initialRotationSpeed ? obj.initialRotationSpeed.length() : 0;
        const finalRotSpeed = Math.max(dampedRotSpeed, minRotSpeed);
        if (obj.rotationSpeed.length() > 0) {
          obj.rotationSpeed.setLength(finalRotSpeed);
        }
      });

      composerRef.current.render(delta);
    }
    animate();

    /* ========= Обробка зміни розмірів вікна ========= */
    function onWindowResize() {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    }
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', throttledUpdateGroupRotation);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [hdrTexture]);

  /* ========= Методи для керування об’єктами ========= */
  function stopObjects() {
    const objects = dynamicObjectsRef.current;
    if (!objects || !objects.length) return;
    oldVelocitiesRef.current = objects.map(o => o.velocity.clone());
    oldRotationSpeedsRef.current = objects.map(o => o.rotationSpeed.clone());
    oldMassesRef.current = objects.map(o => o.mass);
    objects.forEach(o => {
      o.mass = 0;
      o.velocity.set(0, 0, 0);
      o.rotationSpeed.set(0, 0, 0);
    });
  }

  function continueObjects() {
    const objects = dynamicObjectsRef.current;
    if (!objects || !objects.length) return;
    collisionsEnabledRef.current = false;
    setTimeout(() => { collisionsEnabledRef.current = true; }, 500);
    objects.forEach(o => {
      o.mass = 1;
      o.velocity.set(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
      o.rotationSpeed.set(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
    });
  }

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
      obj.startPos = obj.position.clone();
      obj.startRot = new THREE.Euler().copy(obj.rotation);
      obj.targetPos = position.clone();
      obj.targetRot = new THREE.Euler(rotation.x, rotation.y, rotation.z);
      obj.lerpAlpha = 0;
      obj.isLerpingToState = true;
    });
  }

  useImperativeHandle(ref, () => ({
    stopObjects,
    continueObjects,
    showNextState,
    showPreviousState,
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
        pointerEvents: 'none',
      }}
    />
  );
});

export default Scene;
