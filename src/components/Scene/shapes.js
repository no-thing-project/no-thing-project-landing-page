import * as THREE from 'three';
import { MathUtils } from 'three';

const shapes = [
  // Shape 1: "Людинка"
  [
    { position: new THREE.Vector3(0, 0.7, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(-0.4, 0, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(-20)) },
    { position: new THREE.Vector3(0.4, 0, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(20)) },
    { position: new THREE.Vector3(-0.2, -0.7, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(-10)) },
    { position: new THREE.Vector3(0.2, -0.7, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(10)) }
  ],
  // Shape 2 "Сонце"
  [
    { position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0, 0.8, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0.8, 0.3, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(-70)) },
    { position: new THREE.Vector3(-0.8, 0.3, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(70)) },
    { position: new THREE.Vector3(0.5, -0.7, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(-330)) },
    { position: new THREE.Vector3(-0.5, -0.7, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(330)) }
  ],
];

export default shapes;