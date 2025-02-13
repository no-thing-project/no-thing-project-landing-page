// Scene.js
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import * as THREE from "three";
import shapes from "./shapes";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import { OBB } from "three/examples/jsm/math/OBB.js";

// ================== CONFIGURATION ==================
const config = {
  debug: {
    enable: true, // Головний перемикач дебаг-режиму. Якщо false – всі дебаг-ефекти вимкнені.
    showDebugCursorCollision: false,
    debugCursorColor: 0xff00ff,
    showDebugOBB: false,
    showDebugSphere: false,
  },
  boundary: {
    collisionType: "OBB", // 'OBB' або 'sphere'
    sphereScale: 1,
  },
  speed: {
    objectSpeedMultiplier: 1, // Множник для швидкостей об’єктів
    stateLerpSpeed: 0.5, // Швидкість переходу при анімації стану
  },
  performance: {
    enablePostProcessing: false, // Вмикає/вимикає постпроцесінг
    pixelRatio: 0.3, // Нижчий pixelRatio для зниження навантаження на GPU
    enableShadows: false, // Вмикає/вимикає тіні
    antialias: true, // Антіаліас може бути вимкнено для покращення продуктивності
  },
  constants: {
    CURSOR_IMPULSE_MULTIPLIER: 0.05, // Регулювання сили відштовхування курсора
  },
  controls: {
    enableScrollRotation: false, // Початкове значення для повороту сцени при скролі
    toggleKey: "r", // Клавіша для перемикання повороту сцени
    enableScrollImpulse: false, // Початкове значення для імпульсу при скролі
    toggleImpulseKey: "i", // Клавіша для перемикання імпульсу при скролі
  },
  camera: {
    fov: 20, // Налаштування FOV для камери
  },
};
// ================== END CONFIGURATION ==================

// Допоміжні функції
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

function createOBBHelper(obb) {
  const vertices = [];
  for (let i = 0; i < 8; i++) {
    const sx = i & 1 ? 1 : -1;
    const sy = i & 2 ? 1 : -1;
    const sz = i & 4 ? 1 : -1;
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
    0, 1, 0, 2, 0, 4, 1, 3, 1, 5, 2, 3, 2, 6, 3, 7, 4, 5, 4, 6, 5, 7, 6, 7,
  ];
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(indices.length * 3);
  for (let i = 0; i < indices.length; i++) {
    const v = vertices[indices[i]];
    positions[i * 3] = v.x;
    positions[i * 3 + 1] = v.y;
    positions[i * 3 + 2] = v.z;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({
    color: 0x00ff00,
    depthTest: false,
    transparent: true,
    opacity: 1,
  });
  return new THREE.LineSegments(geometry, material);
}

function computeFrustumDimensions(camera) {
  const frustumHeight =
    2 *
    Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
    Math.abs(camera.position.z);
  const frustumWidth = frustumHeight * camera.aspect;
  return { frustumWidth, frustumHeight };
}

/* ========= Компонент Scene ========= */
const Scene = forwardRef(({ hdrTexture, showDebugButtons }, ref) => {
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
  const mouseCoordsRef = useRef(new THREE.Vector2());
  const hasMouseMovedRef = useRef(false);
  const cursorCollisionDebugRef = useRef(null);
  const scrollRotationEnabledRef = useRef(config.controls.enableScrollRotation);
  const scrollImpulseEnabledRef = useRef(config.controls.enableScrollImpulse);
  const cursorCollisionDisabledRef = useRef(false);
  const lastClickPointRef = useRef(new THREE.Vector3());

  useEffect(() => {
    // Обробка клавіш для перемикання функціональностей
    function onKeyDown(event) {
      const key = event.key.toLowerCase();
      if (key === config.controls.toggleKey.toLowerCase()) {
        scrollRotationEnabledRef.current = !scrollRotationEnabledRef.current;
        console.log(
          "Scroll rotation toggled:",
          scrollRotationEnabledRef.current
        );
      }
      if (key === config.controls.toggleImpulseKey.toLowerCase()) {
        scrollImpulseEnabledRef.current = !scrollImpulseEnabledRef.current;
        console.log("Scroll impulse toggled:", scrollImpulseEnabledRef.current);
      }
    }
    window.addEventListener("keydown", onKeyDown);

    // ================== Ініціалізація сцени ==================
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const objectsGroup = new THREE.Group();
    objectsGroupRef.current = objectsGroup;
    scene.add(objectsGroup);

    // Дебаг-об’єкт для колізій з курсором (якщо ввімкнено дебаг)
    if (config.debug.enable && config.debug.showDebugCursorCollision) {
      const debugSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        new THREE.MeshBasicMaterial({
          color: config.debug.debugCursorColor,
          wireframe: true,
        })
      );
      debugSphere.visible = false;
      scene.add(debugSphere);
      cursorCollisionDebugRef.current = debugSphere;
    }

    // Налаштування камери
    const camera = new THREE.PerspectiveCamera(
      config.camera.fov,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const { frustumWidth, frustumHeight } = computeFrustumDimensions(camera);
    const collisionDepth = 1;
    const boundary = {
      halfWidth: frustumWidth / 2,
      halfHeight: frustumHeight / 2,
      halfDepth: collisionDepth / 2,
    };

    // (Опціонально) Створення куба для візуалізації boundary
    if (config.debug.enable && config.debug.showDebugSphere) {
      const boundaryCube = new THREE.Mesh(
        new THREE.BoxGeometry(
          boundary.halfWidth * 2,
          boundary.halfHeight * 2,
          boundary.halfDepth * 2
        ),
        new THREE.MeshBasicMaterial({
          color: 0xff0000,
          wireframe: false,
          transparent: true,
          opacity: 0.2,
        })
      );
      boundaryCube.position.set(0, 0, 0);
      scene.add(boundaryCube);
    }

    // Налаштування рендера
    const renderer = new THREE.WebGLRenderer({
      antialias: config.performance.antialias,
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(config.performance.pixelRatio);
    renderer.shadowMap.enabled = config.performance.enableShadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Налаштування постпроцесінгу
    let composer;
    if (config.performance.enablePostProcessing) {
      composer = new EffectComposer(renderer);
      composerRef.current = composer;
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);
      if (renderer.getPixelRatio() === 1) {
        const smaaPass = new SMAAPass(window.innerWidth, window.innerHeight);
        composer.addPass(smaaPass);
      }
      const outputPass = new OutputPass();
      composer.addPass(outputPass);
    }

    // Обробка HDR текстури
    renderer.physicallyCorrectLights = true;
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    if (hdrTexture) {
      const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;
      scene.environment = envMap;
      pmremGenerator.dispose();
    } else {
      new RGBELoader()
        .setPath("hdr_maps/")
        .load("poly_haven_studio_1k.hdr", (texture) => {
          const envMap = pmremGenerator.fromEquirectangular(texture).texture;
          scene.environment = envMap;
          texture.dispose();
          pmremGenerator.dispose();
        });
    }

    // Налаштування освітлення
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(2, 2, 2);
    directionalLight.castShadow = config.performance.enableShadows;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 20;
    directionalLight.shadow.camera.left = -5;
    directionalLight.shadow.camera.right = 5;
    directionalLight.shadow.camera.top = 5;
    directionalLight.shadow.camera.bottom = -5;
    scene.add(directionalLight);

    // Функція створення об’єктів
    const dynamicObjects = [];
    dynamicObjectsRef.current = dynamicObjects;
    function createObj({
      geometry,
      color,
      x,
      y,
      speed = 0.05,
      rotation,
      isStatic = false,
    }) {
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
      mesh.castShadow = config.performance.enableShadows;
      mesh.receiveShadow = config.performance.enableShadows;

      if (!isStatic) {
        mesh.rotationSpeed = new THREE.Vector3(
          (Math.random() - 0.5) * speed * config.speed.objectSpeedMultiplier,
          (Math.random() - 0.5) * speed * config.speed.objectSpeedMultiplier,
          (Math.random() - 0.5) * speed * config.speed.objectSpeedMultiplier
        );
        mesh.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * speed * config.speed.objectSpeedMultiplier,
          (Math.random() - 0.5) * speed * config.speed.objectSpeedMultiplier,
          (Math.random() - 0.5) * speed * config.speed.objectSpeedMultiplier
        );
      } else {
        mesh.rotationSpeed = new THREE.Vector3(0, 0, 0);
        mesh.velocity = new THREE.Vector3(0, 0, 0);
      }

      mesh.initialVelocity = mesh.velocity.clone();
      mesh.initialRotationSpeed = mesh.rotationSpeed.clone();
      mesh.mass = 1;
      mesh.position.set(x, y, 0);
      mesh.boundingRadius =
        geometry.boundingSphere.radius * config.boundary.sphereScale;
      mesh.isLerpingToState = false;
      mesh.lerpAlpha = 0;
      mesh.startPos = new THREE.Vector3();
      mesh.targetPos = new THREE.Vector3();
      mesh.startRot = new THREE.Euler();
      mesh.targetRot = new THREE.Euler();

      if (rotation) {
        mesh.rotation.copy(rotation);
      }

      // Створення OBB-хелпера для дебагу (якщо ввімкнено)
      if (
        config.boundary.collisionType === "OBB" &&
        geometry.type === "CapsuleGeometry" &&
        config.debug.enable &&
        config.debug.showDebugOBB
      ) {
        mesh.obbHelper = createOBBHelper(createOBB(mesh));
        scene.add(mesh.obbHelper);
      }

      objectsGroup.add(mesh);
      dynamicObjectsRef.current.push(mesh);
    }

    // Створення об’єктів: центральний (сфера) та інші елементи з випадковими позиціями
    const maxRange = 10; // діапазон випадкових координат
    createObj({
      geometry: new THREE.SphereGeometry(0.1, 50, 50),
      color: 0x000000,
      x: (Math.random() - 0.5) * maxRange,
      y: (Math.random() - 0.5) * maxRange,
      isStatic: false,
    });
    const count = 5;
    for (let i = 0; i < count; i++) {
      createObj({
        geometry: new THREE.CapsuleGeometry(0.03, 0.35, 50, 50),
        color: 0x000000,
        x: (Math.random() - 0.5) * maxRange,
        y: (Math.random() - 0.5) * maxRange,
      });
    }

    // Обробка подій скролу
    const scrollFactor = 0.001;
    let prevScrollY = window.scrollY;
    const scrollImpulseFactor = -0.0002;
    function throttle(fn, delay) {
      let lastCall = 0;
      return function (...args) {
        const now = Date.now();
        if (now - lastCall < delay) return;
        lastCall = now;
        return fn(...args);
      };
    }
    function handleScroll() {
      const scrollY = window.scrollY;
      const delta = scrollY - prevScrollY;
      prevScrollY = scrollY;

      if (scrollRotationEnabledRef.current && objectsGroupRef.current) {
        objectsGroupRef.current.rotation.y = scrollY * scrollFactor;
      }

      if (scrollImpulseEnabledRef.current) {
        dynamicObjectsRef.current.forEach((obj) => {
          obj.velocity.y += -delta * scrollImpulseFactor;
        });
      }
    }
    const throttledScrollHandler = throttle(handleScroll, 16);
    window.addEventListener("scroll", throttledScrollHandler);

    function onMouseMove(event) {
      const rect = mountRef.current.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      mouseCoordsRef.current.copy(mouse);
      hasMouseMovedRef.current = true;
    }
    window.addEventListener("mousemove", onMouseMove);

    // Анімаційний цикл
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      dynamicObjectsRef.current.forEach((obj) => {
        obj.collisionCount = 0;
      });

      dynamicObjectsRef.current.forEach((obj) => {
        if (obj.isLerpingToState) {
          obj.lerpAlpha += delta * config.speed.stateLerpSpeed;
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

        // Перевірка колізій із global boundary
        const r = obj.boundingRadius || 0;
        if (obj.position.x + r > boundary.halfWidth) {
          obj.position.x = boundary.halfWidth - r;
          obj.velocity.x *= -1;
        }
        if (obj.position.x - r < -boundary.halfWidth) {
          obj.position.x = -boundary.halfWidth + r;
          obj.velocity.x *= -1;
        }
        if (obj.position.y + r > boundary.halfHeight) {
          obj.position.y = boundary.halfHeight - r;
          obj.velocity.y *= -1;
        }
        if (obj.position.y - r < -boundary.halfHeight) {
          obj.position.y = -boundary.halfHeight + r;
          obj.velocity.y *= -1;
        }
        if (obj.position.z + r > boundary.halfDepth) {
          obj.position.z = boundary.halfDepth - r;
          obj.velocity.z *= -1;
        }
        if (obj.position.z - r < -boundary.halfDepth) {
          obj.position.z = -boundary.halfDepth + r;
          obj.velocity.z *= -1;
        }

        // Оновлення OBB-хелпера для дебагу, якщо ввімкнено
        if (obj.obbHelper && config.debug.enable && config.debug.showDebugOBB) {
          const obb = createOBB(obj);
          const newHelper = createOBBHelper(obb);
          obj.obbHelper.geometry.dispose();
          obj.obbHelper.geometry = newHelper.geometry;
        }
      });

      // Перевірка колізій з курсором (якщо не вимкнено)
      if (hasMouseMovedRef.current && !cursorCollisionDisabledRef.current) {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouseCoordsRef.current, cameraRef.current);
        const ray = raycaster.ray;
        let cursorCollisionFound = false;
        dynamicObjectsRef.current.forEach((obj) => {
          const sphere = new THREE.Sphere(obj.position, obj.boundingRadius);
          if (ray.intersectsSphere(sphere)) {
            const closestPoint = new THREE.Vector3();
            ray.closestPointToPoint(obj.position, closestPoint);
            const dist = closestPoint.distanceTo(obj.position);
            if (dist < obj.boundingRadius) {
              const n = new THREE.Vector3()
                .subVectors(obj.position, closestPoint)
                .normalize();
              const impulseStrength =
                config.constants.CURSOR_IMPULSE_MULTIPLIER;
              obj.velocity.add(n.clone().multiplyScalar(impulseStrength));
              const rotationalImpulse = new THREE.Vector3(
                n.y,
                0,
                -n.x
              ).multiplyScalar(impulseStrength * 0.5);
              obj.rotationSpeed.add(rotationalImpulse);
              obj.collisionCount = (obj.collisionCount || 0) + 1;
              if (
                config.debug.enable &&
                config.debug.showDebugCursorCollision &&
                cursorCollisionDebugRef.current
              ) {
                cursorCollisionDebugRef.current.position.copy(closestPoint);
                cursorCollisionDebugRef.current.visible = true;
              }
              cursorCollisionFound = true;
            }
          }
        });
        if (cursorCollisionDebugRef.current && !cursorCollisionFound) {
          cursorCollisionDebugRef.current.visible = false;
        }
      }

      dynamicObjectsRef.current.forEach((obj) => {
        const baseDamping = 0.99;
        const extraDamping =
          1 - Math.min(0.05 * (obj.collisionCount || 0), 0.5);
        const dampingFactor = baseDamping * extraDamping;
        const currentSpeed = obj.velocity.length();
        const dampedSpeed = currentSpeed * dampingFactor;
        const minSpeed = obj.initialVelocity ? obj.initialVelocity.length() : 0;
        const finalSpeed = Math.max(dampedSpeed, minSpeed);
        if (obj.velocity.length() > 0) {
          obj.velocity.setLength(finalSpeed);
        }
        const currentRotSpeed = obj.rotationSpeed.length();
        const dampedRotSpeed = currentRotSpeed * dampingFactor;
        const minRotSpeed = obj.initialRotationSpeed
          ? obj.initialRotationSpeed.length()
          : 0;
        const finalRotSpeed = Math.max(dampedRotSpeed, minRotSpeed);
        if (obj.rotationSpeed.length() > 0) {
          obj.rotationSpeed.setLength(finalRotSpeed);
        }
      });

      if (config.performance.enablePostProcessing && composerRef.current) {
        composerRef.current.render(delta);
      } else {
        renderer.render(scene, camera);
      }
    }
    animate();

    function onWindowResize() {
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
      const { frustumWidth, frustumHeight } = computeFrustumDimensions(camera);
      boundary.halfWidth = frustumWidth / 2;
      boundary.halfHeight = frustumHeight / 2;
    }
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", throttledScrollHandler);
      window.removeEventListener("keydown", onKeyDown);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [hdrTexture]);

  // Методи керування об’єктами
  function stopObjects() {
    const objects = dynamicObjectsRef.current;
    if (!objects || !objects.length) return;
    oldVelocitiesRef.current = objects.map((o) => o.velocity.clone());
    oldRotationSpeedsRef.current = objects.map((o) => o.rotationSpeed.clone());
    oldMassesRef.current = objects.map((o) => o.mass);
    objects.forEach((o) => {
      o.mass = 0;
      o.velocity.set(0, 0, 0);
      o.rotationSpeed.set(0, 0, 0);
    });
  }

  function continueObjects() {
    const objects = dynamicObjectsRef.current;
    if (!objects || !objects.length) return;
    collisionsEnabledRef.current = false;
    setTimeout(() => {
      collisionsEnabledRef.current = true;
    }, 500);

    // Використовуємо останню точку кліку як центр вибуху
    const explosionCenter =
      lastClickPointRef.current || new THREE.Vector3(0, 0, 0);
    const explosionStrength = 1; // налаштовуваний коефіцієнт сили вибуху

    objects.forEach((o) => {
      o.mass = 1;
      // Розрахунок напрямку від центру вибуху до поточної позиції об’єкта
      let direction = o.position.clone().sub(explosionCenter);
      let distance = direction.length();
      if (distance < 0.001) {
        // Якщо об’єкт практично в центрі – задаємо випадковий напрямок
        direction = new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        );
        distance = direction.length();
      }
      direction.normalize();
      // Чим ближче об’єкт до центру, тим сильніший імпульс (діапазон регулюється коефіцієнтом)
      let impulseMagnitude = explosionStrength / (distance + 0.5);
      impulseMagnitude *= 0.8 + Math.random() * 0.4;
      o.velocity.copy(direction.multiplyScalar(impulseMagnitude));

      // Рандомізуємо швидкість обертання – тепер значення можуть бути більшими
      const explosionRotSpeed = 0.1 + Math.random() * 0.3; // діапазон 0.1 - 0.4
      o.rotationSpeed.set(
        (Math.random() - 0.5) * explosionRotSpeed,
        (Math.random() - 0.5) * explosionRotSpeed,
        (Math.random() - 0.5) * explosionRotSpeed
      );

      // Задаємо абсолютно випадкове початкове обертання, щоб об'єкти не виглядали однаково
      o.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
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
    console.log(
      "Застосовується фігура, state index:",
      currentStateIndexRef.current
    );
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

  // Обробка подій "натискання-утримання / відпускання"
  useEffect(() => {
    let isMouseDown = false;
    let isGathering = false;
    let gatherTimeout = null;

    function handleMouseDown(event) {
      isMouseDown = true;
      // Обчислюємо clickPoint негайно та зберігаємо
      const rect = mountRef.current.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const clickPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeZ, clickPoint);
      lastClickPointRef.current = clickPoint.clone();
      // Вимикаємо колізії з курсором
      cursorCollisionDisabledRef.current = true;
      // Запускаємо таймер затримки 500 мс для початку формування
      gatherTimeout = setTimeout(() => {
        if (isMouseDown) {
          isGathering = true;
          // Обираємо випадкову фігуру
          const state =
            customStatesRef.current[
              Math.floor(Math.random() * customStatesRef.current.length)
            ];
          currentStateIndexRef.current = state;
          state.forEach((transform, i) => {
            const obj = dynamicObjectsRef.current[i];
            if (!obj) return;
            obj.startPos = obj.position.clone();
            obj.startRot = new THREE.Euler().copy(obj.rotation);
            obj.targetPos = transform.position
              .clone()
              .add(lastClickPointRef.current);
            obj.targetRot = new THREE.Euler(
              transform.rotation.x,
              transform.rotation.y,
              transform.rotation.z
            );
            obj.lerpAlpha = 0;
            obj.isLerpingToState = true;
          });
          // Зупиняємо рух, щоб об’єкти "зібралися" у форму
          stopObjects();
        }
      }, 500);
    }

    function handleMouseUp() {
      if (!isMouseDown) return;
      isMouseDown = false;
      if (gatherTimeout) {
        clearTimeout(gatherTimeout);
        gatherTimeout = null;
      }
      // Якщо формування розпочато (утримання більше 500 мс), запускаємо експлозивний ефект;
      // Якщо ні – нічого не робимо з елементами
      if (isGathering) {
        continueObjects();
        isGathering = false;
      }
      // Вимикаємо колізії з курсором ще на 1 секунду після відпускання
      setTimeout(() => {
        cursorCollisionDisabledRef.current = false;
      }, 1000);
    }

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

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
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    />
  );
});

export default Scene;
