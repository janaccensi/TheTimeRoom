import * as THREE from 'three';

export function setupLighting(scene) {
  /* // Llum ambiental
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Llum direccional principal amb més intensitat
  const mainLight = new THREE.DirectionalLight(0xffffff, 1.2); // Augmentem la intensitat
  mainLight.position.set(2, 2, 1);
  mainLight.castShadow = true;
  scene.add(mainLight);
  
  // Afegim una segona llum direccional suau per omplir les ombres
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
  fillLight.position.set(-2, 1, -1);
  scene.add(fillLight);
  
  return { ambientLight, directionalLight, backLight };*/

  // Luz ambiente suave
    const ambientLight = new THREE.AmbientLight(0xfff0e0, 0.3);
    scene.add(ambientLight);
    
    // Luz principal (simulando ventana)
    const mainLight = new THREE.DirectionalLight(0xffeedd, 0.6);
    mainLight.position.set(2, 4, -2);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 20;
    mainLight.shadow.normalBias = 0.05;
    scene.add(mainLight);
    
    // Luz de escritorio (punto)
    const deskLight = new THREE.PointLight(0xffeecc, 0.8, 5, 2);
    deskLight.position.set(2, 1.5, 2);
    deskLight.castShadow = true;
    deskLight.shadow.mapSize.width = 1024;
    deskLight.shadow.mapSize.height = 1024;
    scene.add(deskLight);
    
    // Luz de acento (azulada) simulando luz exterior nocturna
    const accentLight = new THREE.PointLight(0xaaccff, 0.3, 7, 2);
    accentLight.position.set(-2, 2, -2);
    scene.add(accentLight);
    
    return { ambientLight, mainLight, deskLight, accentLight };
}