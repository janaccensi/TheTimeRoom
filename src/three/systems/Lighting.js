import * as THREE from 'three';

export function setupLighting(scene) {
  // Llum ambiental
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Llum direccional principal
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(2, 2, 1);
  scene.add(directionalLight);
  
  // Llum posterior per millorar visibilitat
  const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
  backLight.position.set(-1, 2, -2);
  scene.add(backLight);
  
  return { ambientLight, directionalLight, backLight };
}