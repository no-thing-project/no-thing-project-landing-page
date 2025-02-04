import * as THREE from 'three';
import { MathUtils } from 'three';

const shapes = [
  // State 1: "Квадрат із колом у центрі"
  [
    { position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(-0.7, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0.7, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0, 0.7, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(90)) },
    { position: new THREE.Vector3(0, -0.7, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(90)) },
    { position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0) }
  ],
  // State 2: "Трикутна композиція"
  [
    { position: new THREE.Vector3(0, 0.8, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(-0.8, -0.2, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0.8, -0.2, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(30)) },
    { position: new THREE.Vector3(-0.4, -0.8, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(45)) },
    { position: new THREE.Vector3(0.4, -0.8, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(-45)) }
  ],
  // State 3: "Людинка" (6 елементів: голова, тіло, ліва рука, права рука, ліва нога, права нога)
  [
    { position: new THREE.Vector3(0, 1.5, 0), rotation: new THREE.Euler(0, 0, 0) },                         // Голова
    { position: new THREE.Vector3(0, 0.3, 0), rotation: new THREE.Euler(0, 0, 0) },                         // Тіло
    { position: new THREE.Vector3(-0.4, 0.3, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(-20)) },   // Ліва рука
    { position: new THREE.Vector3(0.4, 0.3, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(20)) },  // Права рука
    { position: new THREE.Vector3(-0.2, -1.5, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(-10)) },  // Ліва нога
    { position: new THREE.Vector3(0.2, -1.5, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(10)) }   // Права нога
  ],
  // State 4: "Пасхалка"
  [
    { position: new THREE.Vector3(0, -0.2, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(-0.4, 0, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(-30)) },
    { position: new THREE.Vector3(0.4, 0, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(30)) },
    { position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0, -0.7, 0), rotation: new THREE.Euler(0, 0, MathUtils.degToRad(90)) }
  ],
  // State 5: "Хрест"
  [
    { position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0) },  
    { position: new THREE.Vector3(-0.5, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0.5, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0, 0.5, 0), rotation: new THREE.Euler(0, 0, 90) },
    { position: new THREE.Vector3(0, -0.5, 0), rotation: new THREE.Euler(0, 0, 90) }
  ],
  // State 6: "Зірка"
  [
    { position: new THREE.Vector3(0, 0.7, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(-0.7, -0.3, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0.7, -0.3, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(-0.4, 0.4, 0), rotation: new THREE.Euler(0, 0, 45) },
    { position: new THREE.Vector3(0.4, 0.4, 0), rotation: new THREE.Euler(0, 0, -45) }
  ],
  // State 7: "Стрілка вправо"
  [
    { position: new THREE.Vector3(-0.5, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0.5, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0.3, 0.3, 0), rotation: new THREE.Euler(0, 0, -45) },
    { position: new THREE.Vector3(0.3, -0.3, 0), rotation: new THREE.Euler(0, 0, 45) }
  ],
  // State 8: "Коло з точкою в центрі"
  [
    { position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0, 0.5, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(-0.5, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0.5, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0, -0.5, 0), rotation: new THREE.Euler(0, 0, 0) }
  ],
  // State 9: "Будинок"
  [
    { position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0) }, 
    { position: new THREE.Vector3(-0.5, 0.5, 0), rotation: new THREE.Euler(0, 0, 45) }, 
    { position: new THREE.Vector3(0.5, 0.5, 0), rotation: new THREE.Euler(0, 0, -45) },
    { position: new THREE.Vector3(-0.5, -0.5, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0.5, -0.5, 0), rotation: new THREE.Euler(0, 0, 0) }
  ],
  // State 10: "Ялинка"
  [
    { position: new THREE.Vector3(0, 0.7, 0), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(-0.4, 0.3, 0), rotation: new THREE.Euler(0, 0, 30) },
    { position: new THREE.Vector3(0.4, 0.3, 0), rotation: new THREE.Euler(0, 0, -30) },
    { position: new THREE.Vector3(-0.3, -0.2, 0), rotation: new THREE.Euler(0, 0, 45) },
    { position: new THREE.Vector3(0.3, -0.2, 0), rotation: new THREE.Euler(0, 0, -45) },
    { position: new THREE.Vector3(0, -0.7, 0), rotation: new THREE.Euler(0, 0, 0) }
  ]
];

export default shapes;
