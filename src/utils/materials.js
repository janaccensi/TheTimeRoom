import * as THREE from 'three';

// TextureLoader per carregar les textures
const textureLoader = new THREE.TextureLoader();

export function getMaterials() {
  // Cargamos la textura de alfombra que usaremos también en la pared frontal


  // Material compartido para alfombra y pared frontal
  const carpetMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5886b,
  });

  // Usamos el mismo material para la pared frontal
  const frontWallMaterial = carpetMaterial;

  // Material per a les parets laterals
  const sideWallMaterial = new THREE.MeshStandardMaterial({
    color: 0xe8e8e8,
  });

  // Textures pel terra (parquet)
  const floorTexture = textureLoader.load('./textures/floor/parquet_diffuse.jpg');
  const floorNormalMap = textureLoader.load('./textures/floor/parquet_normal.jpg');
  const floorRoughnessMap = textureLoader.load('./textures/floor/parquet_roughness.jpg');
  
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
  const shelfWoodTexture = textureLoader.load('./textures/wood/hardwood2_diffuse.jpg');
  const shelfWoodNormalMap = textureLoader.load('./textures/wood/hardwood2_roughness.jpg');
  const shelfWoodRoughness = textureLoader.load('./textures/wood/hardwood2_roughness.jpg');
  
  // Configuració de repetició per les textures d'estanteria
  shelfWoodTexture.wrapS = shelfWoodTexture.wrapT = THREE.RepeatWrapping;
  shelfWoodNormalMap.wrapS = shelfWoodNormalMap.wrapT = THREE.RepeatWrapping;
  shelfWoodRoughness.wrapS = shelfWoodRoughness.wrapT = THREE.RepeatWrapping;
  
  // Textures de fusta per taula (fusta més fosca)
  const tableWoodTexture = textureLoader.load('./textures/wood/Wood_027_basecolor.jpg');
  const tableWoodNormalMap = textureLoader.load('./textures/wood/Wood_027_normal.jpg');
  const tableWoodRoughness = textureLoader.load('./textures/wood/Wood_027_roughness.jpg');
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
    roughness: 0.75,
    metalness: 0.05,
    color: 0xc9b299 // Tint taronja-marró per intensificar el color de la fusta
  });
  // Material de paper per al calendari
  const paperTexture = textureLoader.load('./textures/paper/Paper001_1K-JPG_Color.jpg');
  paperTexture.wrapS = paperTexture.wrapT = THREE.RepeatWrapping;
  paperTexture.repeat.set(1, 1);
  const paperMaterial = new THREE.MeshStandardMaterial({
    map: paperTexture,
    roughness: 0.5,
    metalness: 0.1
  });

  // Material blanco para las tablas de la mesa
  const whitePlankMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0.1
  });

 

  // Material marrón para los cajones (reusa la madera de mesa)
  

 
  
  return { 
    frontWallMaterial, 
    floorMaterial, 
    woodMaterial, 
    tableWoodMaterial, 
    paperMaterial, 
    whitePlankMaterial,     
    sideWallMaterial,
    carpetMaterial    
  };
}
