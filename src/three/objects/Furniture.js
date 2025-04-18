import * as THREE from 'three';
import { getMaterials } from '../../utils/materials.js';

export function createTable(scene, roomConfig) {
  const { width, wallThickness } = roomConfig;
  const { woodMaterial } = getMaterials();
  
  // Dimensions de la taula
  const tableDepth = 2; 
  const tableWidth = 1;
  const tableHeight = 0.1;
  const tableTopHeight = 0.75;
  
  // Superfície
  const tableTopGeometry = new THREE.BoxGeometry(tableWidth, tableHeight, tableDepth);
  const tableTop = new THREE.Mesh(tableTopGeometry, woodMaterial);
  tableTop.position.x = -(width-wallThickness)/2 + tableWidth/2 +0.1;
  tableTop.position.y = tableTopHeight-0.03;
  tableTop.position.z = -(width-wallThickness)/6;
  scene.add(tableTop);
  
  // Potes
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
    const leg = new THREE.Mesh(legGeometry, woodMaterial);
    leg.position.x = pos.x;
    leg.position.y = tableTopHeight/2 - tableHeight/2;
    leg.position.z = pos.z;
    scene.add(leg);
    return leg;
  });
  
  return { tableTop, legs };
}