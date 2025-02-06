import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import shapes from './shapes';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';

const Scene = forwardRef((props, ref) => {
  const mountRef = useRef(null);
  const composerRef = useRef(null);
  const dynamicObjectsRef = useRef([]);
  const oldVelocitiesRef = useRef([]);
  const oldRotationSpeedsRef = useRef([]);
  const oldMassesRef = useRef([]);
  const collisionsEnabledRef = useRef(false);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const objectsGroupRef = useRef(new THREE.Group());
  const customStatesRef = useRef(shapes);
  const currentStateIndexRef = useRef(0);

  useEffect(() => {
    // 1. Створення сцени
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const objectsGroup = new THREE.Group();
    objectsGroupRef.current = objectsGroup;
    scene.add(objectsGroup);

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

    // 4. Ініціалізація Composer та додавання пасів
    const composer = new EffectComposer(renderer);
    composerRef.current = composer;
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Прибираємо непотрібні bloomPass та bokehPass
    // const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    // composer.addPass(bloomPass);
    // const bokehPass = new BokehPass(scene, camera, { focus: 5.0, aperture: 0.0005, maxblur: 0.005, width: window.innerWidth, height: window.innerHeight });
    // composer.addPass(bokehPass);

    if (renderer.getPixelRatio() === 1) {
      const smaaPass = new SMAAPass(window.innerWidth, window.innerHeight);
      composer.addPass(smaaPass);
    }
    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // Налаштування HDR
    renderer.physicallyCorrectLights = true;
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    new RGBELoader()
      .setPath('textures/')
      .load('small_empty_room_1_4k.hdr', (texture) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
      });

    // 5. Освітлення
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

    // 6. Межова сфера (прозора)
    const boundaryRadius = 2;
    const boundaryGeom = new THREE.SphereGeometry(boundaryRadius, 32, 32);
    const boundaryMat = new THREE.MeshBasicMaterial({
      color: 0x000,
      wireframe: false,
      transparent: true,
      opacity: 0,
    });
    const boundarySphere = new THREE.Mesh(boundaryGeom, boundaryMat);
    scene.add(boundarySphere);

    // 7. Створення динамічних об’єктів
    const dynamicObjects = [];
    dynamicObjectsRef.current = dynamicObjects;

    function createObj({ geometry, color, x, y, speed = 0.05 }) {
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
      mesh.rotationSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * speed,
        (Math.random() - 0.5) * speed,
        (Math.random() - 0.5) * speed
      );
      mesh.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * speed,
        (Math.random() - 0.5) * speed,
        (Math.random() - 0.5) * speed
      );
      mesh.mass = 1;
      mesh.position.set(x, y, 0);
      mesh.boundingRadius = geometry.boundingSphere.radius;
      mesh.isLerpingToState = false;
      mesh.lerpAlpha = 0;
      mesh.startPos = new THREE.Vector3();
      mesh.targetPos = new THREE.Vector3();
      mesh.startRot = new THREE.Euler();
      mesh.targetRot = new THREE.Euler();
      objectsGroup.add(mesh);
      dynamicObjectsRef.current.push(mesh);
    }

    createObj({ geometry: new THREE.SphereGeometry(0.3, 50, 50), color: 0x0000, x: 0, y: 0 });
    createObj({ geometry: new THREE.CapsuleGeometry(0.1, 0.5, 50, 50), color: 0x0000, x: 10, y: 0 });
    createObj({ geometry: new THREE.CapsuleGeometry(0.1, 0.5, 50, 50), color: 0x0000, x: -10, y: 0 });
    createObj({ geometry: new THREE.CapsuleGeometry(0.1, 0.5, 50, 50), color: 0x0000, x: 0, y: 10 });
    createObj({ geometry: new THREE.CapsuleGeometry(0.1, 0.5, 50, 50), color: 0x0000, x: 0, y: -10 });
    createObj({ geometry: new THREE.CapsuleGeometry(0.1, 0.5, 50, 50), color: 0x0000, x: 0, y: 0 });

    // Глобальне обертання групи об’єктів на основі scroll
    const factor = 0.001;
    function updateGroupRotation() {
      const scrollY = window.scrollY;
      if (objectsGroupRef.current) {
        objectsGroupRef.current.rotation.y = scrollY * factor;
      }
    }
    // Функція throttle для оптимізації scroll-подій
    function throttle(fn, delay) {
      let lastCall = 0;
      return function (...args) {
        const now = Date.now();
        if (now - lastCall < delay) return;
        lastCall = now;
        return fn(...args);
      };
    }
    const throttledUpdateGroupRotation = throttle(updateGroupRotation, 16); // ≈60 fps
    window.addEventListener('scroll', throttledUpdateGroupRotation);

    // Анімаційний цикл
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      dynamicObjectsRef.current.forEach(obj => {
        if (obj.isLerpingToState) {
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
          obj.rotation.x += obj.rotationSpeed.x * delta;
          obj.rotation.z += obj.rotationSpeed.z * delta;
          obj.position.x += obj.velocity.x * delta;
          obj.position.y += obj.velocity.y * delta;
          obj.position.z += obj.velocity.z * delta;
        }
        const distFromCenter = obj.position.length();
        const maxDist = 2 - (obj.boundingRadius || 0);
        if (distFromCenter > maxDist) {
          const normal = obj.position.clone().normalize();
          obj.position.setLength(maxDist);
          const speed = obj.velocity.length();
          obj.velocity.reflect(normal).setLength(speed);
        }
      });

      composerRef.current.render(delta);
    }
    animate();

    function onWindowResize() {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    }
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('scroll', throttledUpdateGroupRotation);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Функції Stop / Continue
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
    setTimeout(() => {
      collisionsEnabledRef.current = true;
    }, 500);
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

  // Перемикання станів
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
