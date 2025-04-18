import * as THREE from 'three';

// Afegim el TextureLoader
const textureLoader = new THREE.TextureLoader();

export function getMaterials() {
  // Materials per a les parets i terra
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xe8e8e8,
  });
  
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xd2c4b2,
  });
  
    // Textures de fusta per estanteries (més clara)
  const shelfWoodTexture = textureLoader.load('textures/wood/hardwood2_diffuse.jpg');
  const shelfWoodNormalMap = textureLoader.load('textures/wood/hardwood2_roughness.jpg');
  const shelfWoodRoughness = textureLoader.load('textures/wood/hardwood2_roughness.jpg');
  
  // Configuració de repetició per les textures d'estanteria
  shelfWoodTexture.wrapS = shelfWoodTexture.wrapT = THREE.RepeatWrapping;
  shelfWoodNormalMap.wrapS = shelfWoodNormalMap.wrapT = THREE.RepeatWrapping;
  shelfWoodRoughness.wrapS = shelfWoodRoughness.wrapT = THREE.RepeatWrapping;
  
  // Textures de fusta per taula (fusta més fosca)
  const tableWoodTexture = textureLoader.load('/textures/wood/Wood_027_basecolor.jpg');
  const tableWoodNormalMap = textureLoader.load('/textures/wood/Wood_027_normal.jpg');
  const tableWoodRoughness = textureLoader.load('/textures/wood/Wood_027_roughness.jpg');
  // Configuració de repetició per les textures de taula
  tableWoodTexture.wrapS = tableWoodTexture.wrapT = THREE.RepeatWrapping;
  tableWoodNormalMap.wrapS = tableWoodNormalMap.wrapT = THREE.RepeatWrapping;
  tableWoodRoughness.wrapS = tableWoodRoughness.wrapT = THREE.RepeatWrapping;
  
  // Material de fusta per estanteries
  const woodMaterial = new THREE.MeshStandardMaterial({ 
    map: shelfWoodTexture,
    normalMap: shelfWoodNormalMap,
    roughnessMap: shelfWoodRoughness,
    roughness: 0.7,
    metalness: 0.2
  });
  
  // Material de fusta per taula (més fosc i amb gra més pronunciat)
  const tableWoodMaterial = new THREE.MeshStandardMaterial({
    map: tableWoodTexture,
    normalMap: tableWoodNormalMap,
    roughnessMap: tableWoodRoughness,
    roughness: 0.8,
    metalness: 0.1,
    color: 0xbb6633 // Tint taronja-marró per intensificar el color de la fusta
  });
  
  return { wallMaterial, floorMaterial, woodMaterial, tableWoodMaterial };
}
