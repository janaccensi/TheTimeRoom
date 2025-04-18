import * as THREE from 'three';

// TextureLoader per carregar les textures
const textureLoader = new THREE.TextureLoader();

export function getMaterials() {
  // Materials per a les parets
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xe8e8e8,
  });
  
  // Textures pel terra (parquet)
  const floorTexture = textureLoader.load('/textures/floor/parquet_diffuse.jpg');
  const floorNormalMap = textureLoader.load('/textures/floor/parquet_normal.jpg');
  const floorRoughnessMap = textureLoader.load('/textures/floor/parquet_roughness.jpg');
  
  // Configuració de repetició per la textura del terra
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorNormalMap.wrapS = floorNormalMap.wrapT = THREE.RepeatWrapping;
  floorRoughnessMap.wrapS = floorRoughnessMap.wrapT = THREE.RepeatWrapping;
  
  // Augmentar la repetició per tenir un patró més petit i realista
  floorTexture.repeat.set(3, 3);
  floorNormalMap.repeat.set(3, 3);
  floorRoughnessMap.repeat.set(3, 3);
  
  // Material pel terra amb textura de parquet
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    normalMap: floorNormalMap,
    roughnessMap: floorRoughnessMap,
    roughness: 0.8,
    metalness: 0.1
  });
  
  // Textures de fusta per estanteries (més clara)
  const shelfWoodTexture = textureLoader.load('/textures/wood/hardwood2_diffuse.jpg');
  const shelfWoodNormalMap = textureLoader.load('/textures/wood/hardwood2_roughness.jpg');
  const shelfWoodRoughness = textureLoader.load('/textures/wood/hardwood2_roughness.jpg');
  
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
