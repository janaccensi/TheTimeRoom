import * as THREE from "three";

export function getMaterials() {
  // Materials per a les parets i terra
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xe8e8e8,
  });
  
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xd2c4b2,
  });
  
  // Material de fusta per al mobiliari
  const woodMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x8B4513,
    roughness: 0.8,
    metalness: 0.2
  });
  
  return { wallMaterial, floorMaterial, woodMaterial };
}
