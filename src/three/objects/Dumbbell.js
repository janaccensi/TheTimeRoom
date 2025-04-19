import * as THREE from 'three';

export function createDumbbell(scene, options = {}) {
  // Opciones por defecto
  const {
    position = { x: 0, y: 0, z: 0 },
    weight = 5, // kg - afecta el tamaño visual
    color = 0x333333, // color de las pesas
    barColor = 0xa8a8a8, // color de la barra (plateado)
    isDetailed = true // si queremos añadir detalles como texturas o geometría adicional
  } = options;
  
  // Grupo para contener todas las partes de la mancuerna
  const dumbbellGroup = new THREE.Group();
  
  // Dimensiones basadas en el peso
  const weightScale = Math.min(1, weight / 10); // Factor de escala para visualizar diferentes pesos
  const discRadius = 0.12 * (1 + weightScale * 0.5);
  const discThickness = 0.03 * (1 + weightScale * 0.3);
  const barLength = 0.5;
  const barRadius = 0.02;
  const gripRadius = 0.025;
  
  // Material para las pesas (discos)
  const discMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.6,
    metalness: 0.3
  });
  
  // Material para la barra metálica
  const barMaterial = new THREE.MeshStandardMaterial({
    color: barColor,
    roughness: 0.2,
    metalness: 0.8
  });
  
  // Material para el agarre (grip) - ligeramente texturizado
  const gripMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.9,
    metalness: 0.1
  });
  
  // Crear la barra central
  const barGeometry = new THREE.CylinderGeometry(barRadius, barRadius, barLength, 16);
  barGeometry.rotateX(Math.PI / 2); // Rotar para que esté horizontal (a lo largo del eje Z)
  const bar = new THREE.Mesh(barGeometry, barMaterial);
  dumbbellGroup.add(bar);
  
  // Crear el agarre central
  if (isDetailed) {
    const gripGeometry = new THREE.CylinderGeometry(gripRadius, gripRadius, barLength * 0.4, 16);
    gripGeometry.rotateX(Math.PI / 2);
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    dumbbellGroup.add(grip);
  }
  
  // Crear los discos (pesas)
  // Disco izquierdo
  const leftDiscGeometry = new THREE.CylinderGeometry(discRadius, discRadius, discThickness, 32);
  leftDiscGeometry.rotateX(Math.PI / 2);
  const leftDisc = new THREE.Mesh(leftDiscGeometry, discMaterial);
  leftDisc.position.z = -barLength / 2 + discThickness / 2;
  dumbbellGroup.add(leftDisc);
  
  // Disco derecho
  const rightDiscGeometry = new THREE.CylinderGeometry(discRadius, discRadius, discThickness, 32);
  rightDiscGeometry.rotateX(Math.PI / 2);
  const rightDisc = new THREE.Mesh(rightDiscGeometry, discMaterial);
  rightDisc.position.z = barLength / 2 - discThickness / 2;
  dumbbellGroup.add(rightDisc);
  
  // Añadir discos secundarios si es detallado
  if (isDetailed) {
    // Discos secundarios (más pequeños) a ambos lados
    const smallerDiscRadius = discRadius * 0.8;
    const smallerDiscThickness = discThickness * 0.5;
    
    // Disco secundario izquierdo
    const leftSmallDiscGeometry = new THREE.CylinderGeometry(
      smallerDiscRadius, smallerDiscRadius, smallerDiscThickness, 32
    );
    leftSmallDiscGeometry.rotateX(Math.PI / 2);
    const leftSmallDisc = new THREE.Mesh(leftSmallDiscGeometry, discMaterial);
    leftSmallDisc.position.z = -barLength / 2 + discThickness + smallerDiscThickness / 2;
    dumbbellGroup.add(leftSmallDisc);
    
    // Disco secundario derecho
    const rightSmallDiscGeometry = new THREE.CylinderGeometry(
      smallerDiscRadius, smallerDiscRadius, smallerDiscThickness, 32
    );
    rightSmallDiscGeometry.rotateX(Math.PI / 2);
    const rightSmallDisc = new THREE.Mesh(rightSmallDiscGeometry, discMaterial);
    rightSmallDisc.position.z = barLength / 2 - discThickness - smallerDiscThickness / 2;
    dumbbellGroup.add(rightSmallDisc);
  }
  
  // Posicionar la mancuerna completa
  dumbbellGroup.position.set(position.x, position.y, position.z);
  
  // Añadir a la escena
  scene.add(dumbbellGroup);
  
  return dumbbellGroup;
}