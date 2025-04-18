import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function useRoom(canvas) {
  // Configuració bàsica
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  
  // Mides de l'habitació
  const roomWidth = 5;
  const roomHeight = 3;
  const roomDepth = 5;
  const wallThickness = 0.15; // Gruix de les parets
  
  // Materials
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xe8e8e8,
  });
  
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xd2c4b2,
  });
  
  // Terra (ara amb gruix)
  const floorGeometry = new THREE.BoxGeometry(roomWidth, wallThickness, roomDepth);
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -wallThickness/2;
  scene.add(floor);
  
  // Paret davantera (amb gruix)
  const frontWallGeometry = new THREE.BoxGeometry(roomWidth, roomHeight, wallThickness);
  const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
  frontWall.position.z = -roomDepth/2;
  frontWall.position.y = roomHeight/2;
  scene.add(frontWall);
  
  // Paret lateral esquerra (amb gruix)
  const leftWallGeometry = new THREE.BoxGeometry(wallThickness, roomHeight, roomDepth);
  const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
  leftWall.position.x = -roomWidth/2;
  leftWall.position.y = roomHeight/2;
  scene.add(leftWall);
  
  // Les parets dreta i posterior s'han eliminat per permetre veure millor l'interior
  
  // Llum ambiental
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Llum direccional
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(2, 2, 1);
  scene.add(directionalLight);
  
  // Afegim una llum addicional des de la part posterior per millorar la visibilitat
  const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
  backLight.position.set(-1, 2, -2);
  scene.add(backLight);
  
  // Mides
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  
  // Càmera situada a una cantonada de l'habitació però amb angle més favorable
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
  camera.position.set(roomWidth/2 + 1, 2, roomDepth/2 + 1);
  camera.lookAt(0, 1, 0); // Mira cap al centre de l'habitació
  scene.add(camera);
  
  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.target.set(0, 1, 0); // Centre de rotació més elevat
  
  // Renderitzador
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Event de redimensió
  const handleResize = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  
  window.addEventListener('resize', handleResize);
  
  // Funció d'animació
  let animationFrameId = null;
  
  const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    animationFrameId = window.requestAnimationFrame(animate);
  };
  
  // Iniciar animació
  animate();
  
  // Funció de neteja per quan es desmunta el component
  return () => {
    window.removeEventListener('resize', handleResize);
    window.cancelAnimationFrame(animationFrameId);
    
    // Netejar geometria i materials
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