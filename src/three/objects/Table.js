import * as THREE from 'three';
import { getMaterials } from '../../utils/materials.js';

export function createTable(scene, roomConfig) {
  const { width, wallThickness } = roomConfig;
  // Utilitzar el material específic per a taula
  const { tableWoodMaterial } = getMaterials();
  
  // Funció auxiliar per orientar textura (igual que a l'estanteria)
  function createOrientedTableMaterial(isVertical = false, rotation = 0) {
    const material = tableWoodMaterial.clone();
    
    if (material.map) {
      material.map = material.map.clone();
      material.map.rotation = rotation;
      material.map.repeat.set(isVertical ? 1 : 2, isVertical ? 2 : 1);
      material.map.needsUpdate = true;
    }
    
    if (material.normalMap) {
      material.normalMap = material.normalMap.clone();
      material.normalMap.rotation = rotation;
      material.normalMap.repeat.set(isVertical ? 1 : 2, isVertical ? 2 : 1);
      material.normalMap.needsUpdate = true;
    }
    
    if (material.roughnessMap) {
      material.roughnessMap = material.roughnessMap.clone();
      material.roughnessMap.rotation = rotation;
      material.roughnessMap.repeat.set(isVertical ? 1 : 2, isVertical ? 2 : 1);
      material.roughnessMap.needsUpdate = true;
    }
    
    return material;
  }
  
  // Dimensions de la taula
  const tableDepth = 2; 
  const tableWidth = 1;
  const tableHeight = 0.1;
  const tableTopHeight = 0.75;
  
  // Superfície amb textura orientada horitzontalment
  const tableTopGeometry = new THREE.BoxGeometry(tableWidth, tableHeight, tableDepth);
  const tableTopMaterial = createOrientedTableMaterial(false, Math.PI/2);
  const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
  
  tableTop.position.x = -(width-wallThickness)/2 + tableWidth/2 +0.1;
  tableTop.position.y = tableTopHeight-0.03;
  tableTop.position.z = -(width-wallThickness)/6;
  scene.add(tableTop);
  
  // Potes amb textura orientada verticalment
  const legWidth = 0.05;
  const legHeight = tableTopHeight - tableHeight/2;
  const legDepth = 0.05;
  
  // Posicions de les 4 potes
  const legPositions = [
    { x: tableTop.position.x - tableWidth/2 + legWidth/2, z: tableTop.position.z - tableDepth/2 + legDepth/2 },
    { x: tableTop.position.x + tableWidth/2 - legWidth/2, z: tableTop.position.z - tableDepth/2 + legDepth/2 },
    { x: tableTop.position.x - tableWidth/2 + legWidth/2, z: tableTop.position.z + tableDepth/2 - legDepth/2 },
    { x: tableTop.position.x + tableWidth/2 - legWidth/2, z: tableTop.position.z + tableDepth/2 - legDepth/2 }
  ];
  
  const legs = legPositions.map((pos) => {
    const legGeometry = new THREE.BoxGeometry(legWidth, legHeight, legDepth);
    const legMaterial = createOrientedTableMaterial(true); // Textura vertical per a les potes
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.x = pos.x;
    leg.position.y = tableTopHeight/2 - tableHeight/2;
    leg.position.z = pos.z;
    scene.add(leg);
    return leg;
  });
  
  return { tableTop, legs };
}