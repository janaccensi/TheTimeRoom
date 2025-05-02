import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createRoom } from '../three/objects/Room.js';
import { createTable } from '../three/objects/Table.js';
import { createBookshelf } from '../three/objects/Bookshelf.js';
import { createBooks } from '../three/objects/Books.js'; // Afegim aquesta importació
import { setupLighting } from '../three/systems/Lighting.js';
import { createCalendar } from '@/three/objects/Calendar.js';
import { createDumbbell } from '@/three/objects/Dumbbell.js'; 
import { createTV } from '../three/objects/TV.js'; 
import { createLamp } from '@/three/objects/Lamp.js';
import { createPlant } from '@/three/objects/Plant.js';
import { createComputer } from '@/three/objects/Computer.js';
import { createChair } from '@/three/objects/Chair.js';
import { createCarpet } from '@/three/objects/Carpet.js';
import { createRemoteController } from '@/three/objects/RemoteController.js';

import { createBroom } from '@/three/objects/Broom.js'; // Importar la función de escoba
import { createCenterTable } from '@/three/objects/CenterTable.js'; // Importar la función de mesa central
import { createSofa } from '@/three/objects/Sofa.js';
import { createMicrophone } from '../three/objects/Microphone.js'; // Importar la función de micrófono

import { InteractionManager } from '../three/interactions/InteractionManager';
import { ActivityModal } from '../components/ActivityModal';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

import { createTVTable } from '@/three/objects/TVTable.js';
import { CalendarPanel } from '@/components/CalendarPanel.js';



export default function useRoom(canvas) {
  // Configuració bàsica
  const scene = new THREE.Scene();  
  scene.background = new THREE.Color(0x000000); // Color gris clar
  
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
  
  // Afegim l'estanteria
  const bookshelf = createBookshelf(scene, roomConfig); 
  
  // Afegir llibres interactius a les prestatgeries
  // Hem de fer això per cada prestatge de l'estanteria
  for (const shelf of bookshelf.shelves) {
    createBooks(scene, {
      shelfX: shelf.position.x,
      shelfY: shelf.position.y,
      shelfZ: shelf.position.z,
      shelfWidth: shelf.width,
      shelfDepth: shelf.depth,
      isParallelToWall: shelf.isParallelToWall || false
    }, (book) => {
      console.log(`Llibre clicat: ${book.userData.title} a l'estanteria ${shelf.userData.id}`);
    });
  }
  
  createCalendar(scene, roomConfig); // Afegim el calendari
  setupLighting(scene);
  //setupPostProcessing(scene);

  const lamp = createLamp(scene, {
    position: { x: 2.1, y: 0, z: -2.0 },
    color: 0xffeecc,
    height: 1.5,
    intensity: 1,
    isOn: true
  });

  // Afegim la taula central
  const plant = createPlant(scene, {
    position: { x: 1.45, y: 0.72, z: -2.03 },
    size: 'medium',
    type: 'indoor'
  });

  // En una función de configuración Three.js
  const dumbbell = createDumbbell(scene, {
    position: { x: 1.05, y: 0.177, z: 1.8 }, 
    weight: 8,
    color: 0x222222
  });
  // Afegim la TV
  
  const tv = createTV(scene, {
    position: { x: 0.35, y: 1.1, z: -2.15 },
    size: { width: 1.5, height: 0.8, depth: 0.005 },
    screenColor: 0x000000,
    frameColor: 0x333333,
    isOn: true,
    standType: 'simple'
  });
  // Añadir mando a distancia sobre la mesa central
  const remoteController = createRemoteController(scene, {
    position: { x: 0.5, y: 0.415, z: -0.7 },
    rotation: { x: 0, y: Math.PI, z: 0 },
    scale: 1
  });
  // Añadimos el micrófono encima de la mesa
  const microphone = createMicrophone(scene, {
    position: { x: -1.8, y: 0.77, z: 0 }, // Coordenadas encima de la mesa
    baseColor: 0x111111,
    accentColor: 0xff0000,
    isOn: true
  });

  // También puedes crear varias con diferentes pesos
  const lightDumbbell = createDumbbell(scene, {
    position: { x: 1.7, y: 0.15, z: 1.8 },
    weight: 3,
    color: 0x444444
  });

  const sofa = createSofa(scene, {
    position: { x: 0.8, y: 0, z: 1 },
    rotation: Math.PI,
    color: 0xccc9aa,
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
    position: { x: -2.1, y: 1.1, z: 2.25 },  // Esquina de la habitación
    handleColor: 0xc4a484,  // Marrón claro
    bristleColor: 0xd2b48c  // Color paja natural
  });

  // Añadimos la mesa de TV
  const tvTable = createTVTable(scene, {
    position: { x: 0.5, y: 0.3, z: -2.15 }, // Coordenadas de la mesa
    tableWidth: 2.5,
    tableHeight: 0.6,
    tableDepth: 1,
    woodColor: 0xd8b89e, // Color madera claro
    drawerColor: 0xffffff, // Color blanco para los cajones
    legColor: 0x333333 // Color oscuro para las patas
  });


  const centerTable = createCenterTable(scene, {
    position: { x: 0.5, y: 0, z: -0.7 }, 
    rotation: 0
  });

  // Mides
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };


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
    position: { x: -2, y: 0.78, z: -0.8 },
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
    type: 'gaming',
    rotation: 5*Math.PI / 3
  });

  const carpet = createCarpet(scene, {
    position: { x: 0.5, y: 0, z: 1.2 },
    width: 2,
    depth: 3,
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
  renderer.outputEncoding = THREE.sRGBEncoding; // Millora els colors
  renderer.toneMapping = THREE.ACESFilmicToneMapping; // Millor contrast
  renderer.toneMappingExposure = 1.2; // Més exposició (lluminositat)
  
  // Gestió de la redimensió
  const handleResize = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Actualitzem també la mida del compositor d'efectes
    if (composer) {
      composer.setSize(sizes.width, sizes.height);
    }
    
    // Actualitzem el outlinePass
    if (outlinePass) {
      outlinePass.resolution.set(sizes.width, sizes.height);
    }
  };
  
  window.addEventListener('resize', handleResize);
  
  // Inicialització del compositor d'efectes i l'outline pass
  let composer, outlinePass;
  
  function initPostprocessing() {
    // Configuració del compositor d'efectes amb renderTarget correcte
    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth, 
      window.innerHeight, 
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding
      }
    );
    composer = new EffectComposer(renderer, renderTarget);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    // Configura OutlinePass amb millors paràmetres
    outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), 
      scene, 
      camera
    );
    
    // Reduïm l'impacte de l'outline perquè no afecti tant la lluminositat general
    outlinePass.edgeStrength = 2.5;
    outlinePass.edgeGlow = 0.7;
    outlinePass.edgeThickness = 1.0;
    outlinePass.pulsePeriod = 0;
    outlinePass.visibleEdgeColor.set('#3498db');
    outlinePass.hiddenEdgeColor.set('#256ea5');
    outlinePass.overlayMaterial.blending = THREE.NormalBlending; // Ajusta la barreja
    
    composer.addPass(outlinePass);
    
    // Afegeix un ShaderPass per ajustar la lluminositat final si és necessari
    const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
    composer.addPass(gammaCorrectionPass);
  }
  
  // Funció per inicialitzar les interaccions
  function initInteractions() {
    // Assegurem-nos que canvas, camera, scene i renderer existeixen
    if (!canvas || !camera || !scene || !renderer) {
      console.error("No s'han inicialitzat els elements necessaris per a les interaccions");
      return;
    }
    
    // Creem el gestor d'interaccions
    const interactionManager = new InteractionManager(camera, scene, renderer, canvas);
    interactionManager.outlinePass = outlinePass;
    
    // Creem el modal d'activitats
    const activityModal = new ActivityModal();

    // Crear el panel del calendario
    const calendarPanel = new CalendarPanel();
    
    // Configurem el callback quan es clica un llibre
    interactionManager.setOnObjectClick(object => {
      if (object.userData && object.userData.type === 'book') {
        activityModal.show(object);
      }
      // Detectar clic en calendario
      else if (object.userData && object.userData.type === 'calendar') {
        calendarPanel.show(object);
      }
      else if (object.userData && object.userData.type === 'tv') {
        activityModal.show(object);
        // Si el televisor té una funció de togglePower, la cridem
        if (tv.togglePowerFunction) {
          tv.togglePowerFunction();
        }
      }
      else if (object.userData && object.userData.type === 'dumbbell') {
        activityModal.show(object);
      }
      else if (object.userData && object.userData.type === 'remote-controller') {
        activityModal.show(object);
      }
      else if (object.userData && object.userData.type === 'microphone') {
        activityModal.show(object);
      }
      else if (object.userData && object.userData.type === 'broom') {
        activityModal.show(object);
      }
      
    });

    // Configuramos el hover sobre objetos interactivos
    interactionManager.setOnObjectHover(object => {
      if (object) {
        // Si hay un objeto bajo el cursor, lo añadimos al outline
        if (outlinePass) {
          outlinePass.selectedObjects = [object];
        }
      } else {
        // Si no hay objeto, limpiamos el outline
        if (outlinePass) {
          outlinePass.selectedObjects = [];
        }
      }
    });
    
    // Configurem el callback quan es desa una activitat
    activityModal.setOnSave(activityData => {
      saveActivity(activityData);
    });
  }
  
  // Funció per desar activitats
  function saveActivity(activityData) {
    const existingActivities = JSON.parse(localStorage.getItem('readingActivities')) || [];
    existingActivities.push(activityData);
    localStorage.setItem('readingActivities', JSON.stringify(existingActivities));
    console.log('Activitat desada:', activityData);
  }
  
  // Inicialitzar l'escena i configurar tot
  function init() {
    // Assegura't que tot es carrega abans d'inicialitzar les interaccions
    console.log("Iniciant postprocessing...");
    initPostprocessing();
    
    console.log("Iniciant interaccions...");
    // Compte d'objects a l'escena
    console.log("Objectes a l'escena:", scene.children.length);
    initInteractions();
  }
  
  // Cridem la funció d'inicialització després de crear tots els objectes
  init();
  
  // Loop d'animació
  let animationFrameId = null;
  
  const animate = () => {
    controls.update();



    
    renderer.render(scene, camera);
    composer.render();

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