import * as THREE from 'three';
import { getMaterials } from '../../utils/materials.js';

export function createCenterTable(scene, options = {}) {
  const {
    position = { x: 0, y: 0, z: 0 },
    rotation = 0,
    tableWidth = 1.4,
    tableHeight = 0.4,
    tableDepth = 1.2
  } = options;

  const { whitePlankMaterial, woodDrawerMaterial } = getMaterials();
  
  // Material para las partes de madera
  const woodMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xA67C52,
    roughness: 0.8,
    metalness: 0.1
  });
  
  // Crear nuevo material para el cajón con tono más tenue (igual que en TVTable)
  const cajonMaterial = woodDrawerMaterial.clone();
  cajonMaterial.color.set(0xc9b299); // El mismo tono que en TVTable
  cajonMaterial.roughness = 0.75;
  cajonMaterial.metalness = 0.05;

  const centerTableGroup = new THREE.Group();
  
  // Constantes de dimensión
  const topThickness = 0.05;
  const legHeight = 0.1;
  const drawerHeight = 0.2;
  const sideWidth = 0.05;
  
  // Superficie de la mesa
  const tableTop = new THREE.Mesh(
    new THREE.BoxGeometry(tableWidth, topThickness, tableDepth),
    whitePlankMaterial
  );
  tableTop.position.y = tableHeight - topThickness/2;
  centerTableGroup.add(tableTop);
  
  // Lado izquierdo
  const leftSide = new THREE.Mesh(
    new THREE.BoxGeometry(sideWidth, tableHeight - 1.5*legHeight, tableDepth),
    whitePlankMaterial
  );
  leftSide.position.set(-tableWidth/2 + sideWidth/2, 2*(tableHeight)/3, 0);
  centerTableGroup.add(leftSide);
  
  // Lado derecho
  const rightSide = new THREE.Mesh(
    new THREE.BoxGeometry(sideWidth, tableHeight - 1.5*legHeight, tableDepth),
    whitePlankMaterial
  );
  rightSide.position.set(tableWidth/2 - sideWidth/2, 2*(tableHeight)/3, 0);
  centerTableGroup.add(rightSide);
  
  
  // Base (debajo del cajón)
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(tableWidth, topThickness, tableDepth),
    whitePlankMaterial
  );
  base.position.set(0, drawerHeight-1.5*sideWidth, 0);
  centerTableGroup.add(base);
  
  // Cajón
  const drawerGroup = new THREE.Group();

  // Cuerpo del cajón - Ahora usando cajonMaterial igual que en TVTable
  const drawerBody = new THREE.Mesh(
    new THREE.BoxGeometry(tableWidth - (sideWidth *2), drawerHeight, tableDepth - (sideWidth * 2)),
    cajonMaterial // Cambiado de woodDrawerMaterial a cajonMaterial
  );
  drawerBody.position.set(0, drawerHeight/2, 0);
  drawerGroup.add(drawerBody);
  
  // Posicionar cajón
  drawerGroup.position.y = legHeight + sideWidth;
  centerTableGroup.add(drawerGroup);
  
  // Patas
  const legSize = 0.05;
  const legPositions = [
    [-tableWidth/2 + legSize, 0, -tableDepth/2 + legSize],
    [tableWidth/2 - legSize, 0, -tableDepth/2 + legSize],
    [-tableWidth/2 + legSize, 0, tableDepth/2 - legSize],
    [tableWidth/2 - legSize, 0, tableDepth/2 - legSize]
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(
      new THREE.BoxGeometry(legSize, legHeight, legSize),
      whitePlankMaterial
    );
    leg.position.set(pos[0], legHeight/2, pos[2]);
    centerTableGroup.add(leg);
  });
  
  // Aplicar posición y rotación
  centerTableGroup.position.set(position.x, position.y, position.z);
  centerTableGroup.rotation.y = rotation;
  
  // Añadir metadatos para interacción
  centerTableGroup.userData = {
    type: 'furniture',
    name: 'Mesa central'
  };
  
  // Añadir a la escena
  scene.add(centerTableGroup);
  
  return centerTableGroup;
}