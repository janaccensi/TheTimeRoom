import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createRoom } from '../three/objects/Room.js';
import {createTable} from '../three/objects/Table.js';
import { createBookshelf } from '../three/objects/Bookshelf.js';
import { setupLighting } from '../three/systems/Lighting.js';
import { createCalendar } from '@/three/objects/Calendar.js';
import { createDumbbell } from '@/three/objects/Dumbbell.js'; 
import { createTV } from '../three/objects/TV.js'; 
import { setupPostProcessing } from '@/three/systems/PostProcessing.js';
import { createLamp } from '@/three/objects/Lamp.js';
import { createPlant } from '@/three/objects/Plant.js';
import { createComputer } from '@/three/objects/Computer.js';
import { createChair } from '@/three/objects/Chair.js';
import { createCarpet } from '@/three/objects/Carpet.js';
import { createSofa } from '@/three/objects/Sofa.js';
import { createBroom } from '@/three/objects/Broom.js';
import { createMicrophone } from '../three/objects/Microphone.js'; // Importar la función de micrófono
import { createBroom } from '../three/objects/Broom.js'; // Importar la función de escoba

export default function useRoom(canvas) {
  // Configuració bàsica
  const scene = new THREE.Scene();  
  scene.background = new THREE.Color(0xf5f5f5); // Color gris clar
  
  // Mides de l'habitació
  const roomConfig = {
    width: 5,
    height: 3,
    depth: 5,
    wallThickness: 0.15,
    wallColor: 0xe8e0d5, // Beix clar
    floorColor: 0xd7c9aa, // Color de parquet fusta clara
    ceilingColor: 0xffffff 
  };
  
  // Crear els elements de l'escena
  createRoom(scene, roomConfig);
  createTable(scene, roomConfig);
  createBookshelf(scene, roomConfig); // Afegim l'estanteria
  createCalendar(scene, roomConfig); // Afegim el calendari
  setupLighting(scene);
  //setupPostProcessing(scene);

  const lamp = createLamp(scene, {
    position: { x: 2, y: 0, z: 2 },
    color: 0xffeecc,
    height: 1.5,
    intensity: 1,
    isOn: true
  });

  const plant = createPlant(scene, {
    position: { x: 2, y: 0, z: -2 },
    size: 'medium',
    type: 'indoor'
  });

  // En una función de configuración Three.js
  const dumbbell = createDumbbell(scene, {
    position: { x: 1.5, y: 0.2, z: 0.8 }, 
    weight: 8,
    color: 0x222222
  });
  // Afegim la TV
  /*
  const tv = createTV(scene, {
    position: { x: 0, y: 1.5, z: -2.3 },
    size: { width: 1.2, height: 0.7, depth: 0.1 },
    screenColor: 0x000000,
    frameColor: 0x333333,
    isOn: true,
    standType: 'simple'
  });*/

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

  const sofa = createSofa(scene, {
    position: { x: 0.2, y: 0, z: 0.2 },
    rotation: Math.PI,
    color: 0x2c3e50,
    type: 'sectional',
    cornerSide: 'right'
  });

  /*const broom = createBroom(scene, {
    position: { x: -0.5, y: 0.2, z: -2 },
    rotation: Math.PI / 4,
    leaning: true,
    leaningAngle: -0.3,
    handleColor: 0xc19a6b,
    bristlesColor: 0xdec683
  });*/

  // Añadimos la escoba en una esquina
  const broom = createBroom(scene, {
    position: { x: 2.2, y: 1.1, z: -2.1 },  // Esquina de la habitación
    handleColor: 0xc4a484,  // Marrón claro
    bristleColor: 0xd2b48c  // Color paja natural
  });

  // Mides
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  const tv = createTV(scene, {
    position: { x: 0.5, y: 1.5, z: -2.3},
    size: { width: 1.2, height: 0.7, depth: 0.1 },
    screenColor: 0x000000,
    frameColor: 0x333333,
    isOn: true,
    standType: 'wall'
  });

  /*
  // Función para dibujar código simulado
  function drawCodeScreen() {
    context.fillStyle = 'rgba(40, 44, 52, 1)'; // Fondo oscuro tipo editor
    context.fillRect(0, 0, codeCanvas.width, codeCanvas.height);
    
    // Configurar fuente para código
    context.font = '12px Courier New';
    
    // Diferentes colores para simular sintaxis highlighting
    const colors = ['#61afef', '#98c379', '#e06c75', '#d19a66', '#c678dd', '#56b6c2'];
    
    // Dibujar líneas de código
    for (let i = 0; i < 18; i++) {
      // Variar longitud de líneas y colores
      const lineLength = 5 + Math.floor(Math.random() * 20);
      context.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      
      // Diferentes indentaciones
      const indent = Math.floor(Math.random() * 4) * 8;
      
      // Generar texto de código pseudo-aleatorio
      let text = ' '.repeat(indent / 8);
      for (let j = 0; j < lineLength; j++) {
        text += String.fromCharCode(97 + Math.floor(Math.random() * 26));
      }
      
      // Dibujar la línea
      context.fillText(text, 10, 20 + i * 14);
    }
    
    // Marcar la textura como necesaria de actualizar
    codeTexture.needsUpdate = true;
  }

  // Dibujar código inicial
  drawCodeScreen();*/

  // Añadir ordenador
  const computer = createComputer(scene, {
    position: { x: -2, y: 0.78, z: -1 },
    type: 'gaming',
    isOn: true,
    rotation: Math.PI / 2,
    screenColor: 0x000000,  // Color naranja como en la imagen
    hasRGB: true
    //screenTexture: codeTexture // Añadir la textura del código
  });

  const chair = createChair(scene, {
    position: { x: -1, y: 0.0, z: -1 },
    color: 0x2c3e50,
    type: 'office',
    rotation: 5*Math.PI / 3
  });

  const carpet = createCarpet(scene, {
    position: { x: 0.2, y: 0, z: 0.2 },
    width: 2,
    depth: 3,
    color: 0x8B4513 // Color marró
  });

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