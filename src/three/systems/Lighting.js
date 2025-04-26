import * as THREE from 'three';

export function setupLighting(scene) {
  // Luz ambiente más cálida e intensa
  const ambientLight = new THREE.AmbientLight(0xffe0b2, 1.0);
  scene.add(ambientLight);
  
  // Luz principal (simulando ventana) con mayor intensidad
  const mainLight = new THREE.DirectionalLight(0xffeedd, 1.2);
  mainLight.position.set(2, 4, -2);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 20;
  mainLight.shadow.normalBias = 0.05;
  scene.add(mainLight);
  
  // Luz de escritorio más brillante y radio ampliado
  const deskLight = new THREE.PointLight(0xffdd99, 2.0, 8, 2);
  deskLight.position.set(2, 1.5, 2);
  deskLight.castShadow = true;
  deskLight.shadow.mapSize.width = 1024;
  deskLight.shadow.mapSize.height = 1024;
  scene.add(deskLight);
  
  // Luz de acento más cálida
  const accentLight = new THREE.PointLight(0xffe4c4, 0.5, 10, 2);
  accentLight.position.set(-2, 2, -2);
  scene.add(accentLight);

  // Luz de relleno general (hemisférica)
  const hemiLight = new THREE.HemisphereLight(0xfff8e1, 0x080820, 0.3);
  scene.add(hemiLight);
  
  return { ambientLight, mainLight, deskLight, accentLight, hemiLight };
}