import * as THREE from 'three';
import { getMaterials } from '../../utils/materials.js';

export function createTable(scene, roomConfig) {
  const { width, wallThickness } = roomConfig;
  // Obtenemos los materiales que necesitamos
  const { tableWoodMaterial, whitePlankMaterial } = getMaterials();
  
  // Función auxiliar para orientar textura
  function createOrientedTableMaterial(isVertical = false, rotation = 0, baseMaterial) {
    const material = baseMaterial.clone();
    
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
  
  // Material para superficie en marrón más claro y tenue
  const tableSurfaceMaterial = tableWoodMaterial.clone();

  // Dimensiones de la mesa
  const tableDepth = 2; 
  const tableWidth = 1.2;
  const tableHeight = 0.05;
  const tableTopHeight = 0.75;
  
  // GRUPO PRINCIPAL DE LA MESA
  const tableGroup = new THREE.Group();
  
  // SUPERFICIE DE LA MESA
  const tableTopGeometry = new THREE.BoxGeometry(tableWidth, tableHeight, tableDepth);
  const tableTopMaterial = createOrientedTableMaterial(false, Math.PI/2, tableSurfaceMaterial);
  const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
  tableTop.position.y = tableTopHeight;
  tableTop.position.x = -0.02;
  tableGroup.add(tableTop);
  
  // Definir dimensiones comunes para ambos soportes
  const supportDepth = tableWidth ; // Profundidad un poco menor que la mesa
  const supportHeight = tableTopHeight-0.025;
  const leftSupportWidth = tableWidth * 0.45;
  const rightSupportWidth = tableWidth * 0.45;
  const margin = 0.02; // Margen entre elementos
  
  // 1. BLOQUE SOPORTE DERECHO (bloque sólido)
  const rightSupport = new THREE.Mesh(
    new THREE.BoxGeometry(rightSupportWidth, supportHeight, supportDepth),
    whitePlankMaterial
  );
  // Colocamos en el extremo derecho
  rightSupport.position.set(
    -0.02,
    supportHeight/2,
    -0.5 - (rightSupportWidth/2)+0.04
  );
  rightSupport.rotation.y = Math.PI / 2;
  tableGroup.add(rightSupport);

  // Añadir puerta al bloque derecho (reposicionada para que sea frontal como los cajones)
  const doorGroup = new THREE.Group();
  
  // Puerta principal (ligeramente más pequeña que el bloque)
  const doorWidth = rightSupportWidth * 0.95;
  const doorHeight = supportHeight * 0.9;
  const doorGeom = new THREE.BoxGeometry(doorWidth, doorHeight, 0.02);
  const doorMaterial = whitePlankMaterial.clone();
  doorMaterial.color.set(0xf8f8f8); // Un poco más blanco
  doorMaterial.roughness = 0.3;
  
  const door = new THREE.Mesh(doorGeom, doorMaterial);
  // Posicionamos la puerta en la misma orientación que los frentes de cajones
  door.position.set(
    -0.02,
    supportHeight/2,
    0.38 // Misma coordenada Z que los frentes de los cajones
  );
  // No rotamos la puerta individualmente
  
  // Reemplazar el tirador cilíndrico por uno más elegante y moderno
  
  // Crear un tirador tipo barra horizontal minimalista
  const handleBarGeom = new THREE.BoxGeometry(0.15, 0.03, 0.02);
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    roughness: 0.2,
    metalness: 0.7 // Más metálico para aspecto moderno
  });
  
  const handleBar = new THREE.Mesh(handleBarGeom, handleMaterial);
  handleBar.position.set(
    -0.02,                // Misma posición X que antes
    supportHeight * 0.55, // Más abajo que el centro para mejor estética
    0.39                 // Ligeramente por delante de la puerta
  );
  
  // Soportes del tirador (pequeñas piezas que conectan la barra a la puerta)
  const supportGeom = new THREE.BoxGeometry(0.02, 0.02, 0.025);
  const support1 = new THREE.Mesh(supportGeom, handleMaterial);
  const support2 = new THREE.Mesh(supportGeom, handleMaterial);
  
  // Posicionar los soportes a ambos extremos de la barra
  support1.position.set(-0.02 - 0.05, supportHeight * 0.55, 0.38);
  support2.position.set(-0.02 + 0.05, supportHeight * 0.55, 0.38);
  
  // Reemplazar el tirador anterior
  doorGroup.add(handleBar);
  doorGroup.add(support1);
  doorGroup.add(support2);
  
  // Agrupamos puerta y tirador
  doorGroup.add(door);
  
  // Posicionamos el grupo de la puerta
  doorGroup.position.set(
    0.21, // Mismo valor X que el grupo de cajones
    0,
    -0.75 // Diferente en Z para que esté en el otro lado
  );
  
  doorGroup.rotation.y = Math.PI / 2; // Misma rotación que los cajones
  tableGroup.add(doorGroup);

  // 2. CAJONES IZQUIERDA (3 cajones)
  const drawerGroup = new THREE.Group();
  
  // Estructura exterior de los cajones
  const drawerUnitGeometry = new THREE.BoxGeometry(leftSupportWidth, supportHeight, supportDepth);
  const drawerUnitMaterial = whitePlankMaterial;
  const drawerUnit = new THREE.Mesh(drawerUnitGeometry, drawerUnitMaterial);
  drawerUnit.position.x = -(tableWidth/2) + (leftSupportWidth/2);
  drawerUnit.position.y = supportHeight/2;
  drawerUnit.position.z = - (rightSupportWidth/2)+0.04
  drawerGroup.add(drawerUnit);
  
  // Crear cajones individuales (solo visual, no funcionales)
  const drawerHeight = supportHeight / 3.2; // Altura para 3 cajones con separación
  const drawerWidth = leftSupportWidth - 0.04; // Un poco más estrechos que la caja
  const drawerFrontDepth = 0.03; // Grosor del frente del cajón
  
  // Posiciones Y para los 3 cajones
  const drawerPositionsY = [
    drawerHeight/2 + 0.02,
    supportHeight/2,
    supportHeight - drawerHeight/2 - 0.02
  ];
  
  // Material base para los frentes (más suave y claro)
  const drawerFrontMaterial = whitePlankMaterial.clone();
  drawerFrontMaterial.color.set(0xfafafa); // Más blanco
  drawerFrontMaterial.roughness = 0.2;
  drawerFrontMaterial.metalness = 0.05;

  // Crear los 3 cajones
  for (let i = 0; i < 3; i++) {
    const y = drawerPositionsY[i];

    // Frontales planos
    const drawerFrontGeom = new THREE.BoxGeometry(
      drawerWidth,
      drawerHeight - margin,
      0.02       // muy fino para aspecto minimalista
    );
    const drawerFront = new THREE.Mesh(drawerFrontGeom, drawerFrontMaterial);
    drawerFront.position.set(
      -(tableWidth/2)+0.27, // ligeramente fuera del bloque
      y,
      0.38
    );
    drawerGroup.add(drawerFront);

    // Añadir hendidura superior como tirador (similar a la imagen)
    const cutoutGeom = new THREE.BoxGeometry(
      drawerWidth * 0.25, // Algo más estrecho
      0.012,              // Más delgado
      0.025               // Más profundo
    );
    const cutoutMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,    // Casi negro
      roughness: 0.95,    // Muy mate
      metalness: 0
    });
    const cutout = new THREE.Mesh(cutoutGeom, cutoutMaterial);
    cutout.position.set(
      -(tableWidth/2)+0.27,
      y + (drawerHeight/2) - 0.025,  // Más cerca del borde
      0.39
    );
    drawerGroup.add(cutout);
  }

  // Posicionar el grupo de cajones en el extremo izquierdo
  drawerGroup.position.set(
    0.21,
    0,
    0.4
  );
  drawerGroup.rotation.y = Math.PI / 2;
  tableGroup.add(drawerGroup);
  
  // Posicionamiento final del grupo de la mesa en la habitación
  tableGroup.position.x = -(width-wallThickness)/2 + tableWidth/2 + 0.1;
  tableGroup.position.z = -(width-wallThickness)/6;
  
  scene.add(tableGroup);
  
  return { tableGroup, tableTop };
}