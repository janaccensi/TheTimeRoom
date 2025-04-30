import * as THREE from 'three';

export function createLamp(scene, options = {}) {
  let {
    position = { x: 2, y: 0, z: 2 },
    color = 0xdddddd,
    height = 1.5,
    intensity = 1,
    isOn = true
  } = options;
  
  const lampGroup = new THREE.Group();
  
  // Base
  const baseGeometry = new THREE.CylinderGeometry(0.15, 0.18, 0.05, 32);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.5,
    metalness: 0.7
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  
  // Poste
  const poleGeometry = new THREE.CylinderGeometry(0.025, 0.025, height - 0.3, 16);
  const poleMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.5,
    metalness: 0.8
  });
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  pole.position.y = (height - 0.3) / 2;
  
  // Pantalla
  const shadeMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.5,
    emissive: isOn ? 0xffffee : 0x000000,
    emissiveIntensity: isOn ? 0.5 : 0,
    side: THREE.DoubleSide
  });
  
  const shadeTopGeometry = new THREE.CylinderGeometry(0.2, 0.3, 0.4, 32, 1, true);
  const shadeTop = new THREE.Mesh(shadeTopGeometry, shadeMaterial);
  shadeTop.position.y = height - 0.2;
  
  // Luz
  const light = new THREE.PointLight(0xffffee, isOn ? intensity : 0, 4, 2);
  light.position.y = height - 0.2;
  light.castShadow = true;
  light.shadow.mapSize.width = 512;
  light.shadow.mapSize.height = 512;
  
  // Añadir a grupo
  lampGroup.add(base);
  lampGroup.add(pole);
  lampGroup.add(shadeTop);
  lampGroup.add(light);
  
  // Posicionar
  lampGroup.position.set(position.x, position.y, position.z);
  
  // Añadir a la escena
  scene.add(lampGroup);
  
  // Toggle para encender/apagar
  const toggle = () => {
    isOn = !isOn;
    shadeMaterial.emissiveIntensity = isOn ? 0.5 : 0;
    light.intensity = isOn ? intensity : 0;
  };
  
  return {
    lampGroup,
    toggle
  };
}