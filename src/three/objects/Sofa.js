import * as THREE from 'three';

export function createSofa(scene, options = {}) {
  const {
    position = { x: 0, y: 0, z: 0 },
    rotation = 0,
    color = 0x2c3e50, // Azul oscuro como en la imagen
    type = 'sectional', // modern, sectional, corner
    cornerSide = 'right' // Para sofás en esquina: 'right' o 'left'
  } = options;
  
  const sofaGroup = new THREE.Group();
  
  // Material principal del sofá - textura suave
  const fabricMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.8,
    metalness: 0.1
  });
  
  // Dimensiones base
  const baseWidth = type === 'sectional' ? 2.0 : 1.8;
  const baseHeight = 0.4; // Más alto para estilo Bruno Simon
  const baseDepth = 0.8;
  const seatHeight = 0.1;
  const backHeight = 0.5;
  const armWidth = 0.2;
  const cornerSize = type === 'corner' ? 0.8 : 0;
  
  // Base principal (asiento)
  const baseGeometry = new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth);
  const base = new THREE.Mesh(baseGeometry, fabricMaterial);
  base.position.y = baseHeight / 2;
  sofaGroup.add(base);
  
  // Para sofá en esquina o seccional, añadir extensión
  if (type === 'sectional' || type === 'corner') {
    const extensionWidth = type === 'sectional' ? 0.8 : cornerSize;
    const extensionDepth = baseDepth;
    
    const cornerGeometry = new THREE.BoxGeometry(extensionWidth, baseHeight, extensionDepth);
    const corner = new THREE.Mesh(cornerGeometry, fabricMaterial);
    
    // Posicionar la extensión según el lado elegido
    if (cornerSide === 'right') {
      corner.position.set(baseWidth / 2 + extensionWidth / 2 - armWidth / 2, baseHeight / 2, 0);
    } else {
      corner.position.set(-(baseWidth / 2 + extensionWidth / 2 - armWidth / 2), baseHeight / 2, 0);
    }
    
    sofaGroup.add(corner);
    
    // Respaldo adicional para la extensión
    const cornerBackGeometry = new THREE.BoxGeometry(extensionWidth, backHeight, 0.15);
    const cornerBack = new THREE.Mesh(cornerBackGeometry, fabricMaterial);
    
    if (cornerSide === 'right') {
      cornerBack.position.set(baseWidth / 2 + extensionWidth / 2 - armWidth / 2, baseHeight + backHeight / 2, -baseDepth / 2 + 0.075);
    } else {
      cornerBack.position.set(-(baseWidth / 2 + extensionWidth / 2 - armWidth / 2), baseHeight + backHeight / 2, -baseDepth / 2 + 0.075);
    }
    
    sofaGroup.add(cornerBack);
  }
  
  // Cojines del asiento - muy sutiles, casi planos como en el estilo de Bruno
  const cushionSegments = 3;
  const cushionWidth = (baseWidth - armWidth * 2) / cushionSegments;
  
  for (let i = 0; i < cushionSegments; i++) {
    const cushionGeometry = new THREE.BoxGeometry(cushionWidth - 0.03, seatHeight, baseDepth - 0.1);
    const cushion = new THREE.Mesh(cushionGeometry, fabricMaterial);
    
    cushion.position.set(
      (i - (cushionSegments - 1) / 2) * cushionWidth,
      baseHeight + seatHeight / 2,
      0
    );
    
    // Ligeramente hundido
    cushion.scale.set(0.95, 1, 0.95);
    
    sofaGroup.add(cushion);
  }
  
  // Respaldo principal
  const backGeometry = new THREE.BoxGeometry(baseWidth - armWidth * 2, backHeight, 0.15);
  const back = new THREE.Mesh(backGeometry, fabricMaterial);
  back.position.set(0, baseHeight + backHeight / 2, -baseDepth / 2 + 0.075);
  sofaGroup.add(back);
  
  // Brazos del sofá - más bajos y cuadrados como en el estilo Bruno Simon
  const armHeight = backHeight - 0.05; // Ligeramente más bajo que el respaldo
  
  // Brazo izquierdo
  const leftArmGeometry = new THREE.BoxGeometry(armWidth, armHeight, baseDepth);
  const leftArm = new THREE.Mesh(leftArmGeometry, fabricMaterial);
  leftArm.position.set(-(baseWidth / 2 - armWidth / 2), baseHeight + armHeight / 2, 0);
  sofaGroup.add(leftArm);
  
  // Brazo derecho (solo si no es seccional con esquina a la derecha)
  if (!(type === 'sectional' && cornerSide === 'right')) {
    const rightArmGeometry = new THREE.BoxGeometry(armWidth, armHeight, baseDepth);
    const rightArm = new THREE.Mesh(rightArmGeometry, fabricMaterial);
    rightArm.position.set(baseWidth / 2 - armWidth / 2, baseHeight + armHeight / 2, 0);
    sofaGroup.add(rightArm);
  }
  
  // Sin patas visibles o muy pequeñas como en la imagen
  // En el estilo Bruno Simon el sofá parece estar directamente sobre el suelo
  
  // Posicionamiento final
  sofaGroup.position.set(position.x, position.y, position.z);
  sofaGroup.rotation.y = rotation;
  
  // Añadir a la escena
  scene.add(sofaGroup);
  
  return sofaGroup;
}