import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createRoom } from '../three/objects/Room.js';
import {createTable} from '../three/objects/Table.js';
import { createBookshelf } from '../three/objects/Bookshelf.js';
import { setupLighting } from '../three/systems/Lighting.js';
import { createCalendar } from '@/three/objects/Calendar.js';
import { createDumbbell } from '@/three/objects/Dumbbell.js'; 
import { createTV } from '../three/objects/TV.js'; 
import { createMicrophone } from '../three/objects/Microphone.js'; // Importar la función de micrófono

export default function useRoom(canvas) {
  // Configuració bàsica
  const scene = new THREE.Scene();  
  scene.background = new THREE.Color(0xffffff);
  
  // Mides de l'habitació
  const roomConfig = {
    width: 5,
    height: 3,
    depth: 5,
    wallThickness: 0.15
  };
  
  // Crear els elements de l'escena
  createRoom(scene, roomConfig);
  createTable(scene, roomConfig);
  createBookshelf(scene, roomConfig); // Afegim l'estanteria
  createCalendar(scene, roomConfig); // Afegim el calendari
  setupLighting(scene);

  // En una función de configuración Three.js
  const dumbbell = createDumbbell(scene, {
    position: { x: 1.5, y: 0.2, z: 0.8 }, 
    weight: 8,
    color: 0x222222
  });
  // Afegim la TV
  const tv = createTV(scene, {
    position: { x: 0, y: 1.5, z: -2.3 },
    size: { width: 1.2, height: 0.7, depth: 0.1 },
    screenColor: 0x000000,
    frameColor: 0x333333,
    isOn: true,
    standType: 'simple'
  });

  // Añadimos el micrófono encima de la mesa
  const microphone = createMicrophone(scene, {
    position: { x: -1.8, y: 0.77, z: -0.2 }, // Coordenadas encima de la mesa
    baseColor: 0x111111,
    accentColor: 0xff0000,
    isOn: true
  });

  // También puedes crear varias con diferentes pesos
  const lightDumbbell = createDumbbell(scene, {
    position: { x: 1.7, y: 0.2, z: 0.8 },
    weight: 3,
    color: 0x444444
  });
  
  // Mides
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  
  // Càmera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
  camera.position.set(roomConfig.width/2 + 1, 2, roomConfig.depth/2 + 1);
  camera.lookAt(0, 1, 0);
  scene.add(camera);
  
  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.target.set(0, 1, 0);
  
  // Renderitzador
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Gestió de la redimensió
  const handleResize = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  
  window.addEventListener('resize', handleResize);
  
  // Loop d'animació
  let animationFrameId = null;
  
  const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    animationFrameId = window.requestAnimationFrame(animate);
  };
  
  animate();
  
  // Neteja de recursos
  return () => {
    window.removeEventListener('resize', handleResize);
    window.cancelAnimationFrame(animationFrameId);
    
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material.map) {
          object.material.map.dispose();
        }
        object.material.dispose();
      }
    });
    
    renderer.dispose();
  };
}