import * as THREE from 'three';

export function createDumbbell(scene, options = {}) {
  // Opciones por defecto
  const {
    position = { x: 0, y: 0, z: 0 },
    weight = 5, // kg - afecta el tamaño visual
    color = 0x333333, // color de las pesas
    barColor = 0xa8a8a8, // color de la barra (plateado)
    isDetailed = true, // si queremos añadir detalles como texturas o geometría adicional
    type = 'dumbbell' // Tipo específico para diferenciar las mancuernas
  } = options;
  
  // Grupo para contener todas las partes de la mancuerna
  const dumbbellGroup = new THREE.Group();
  
  // Dimensiones basadas en el peso - Aumento significativo del tamaño
  const globalScale = 1.3; // Factor de escala general aumentado (antes 1.0)
  const weightScale = Math.min(0.8, weight / 15); // Factor de escala para visualizar diferentes pesos
  const discRadius = 0.08 * (1 + weightScale * 0.4) * globalScale;
  const discThickness = 0.025 * (1 + weightScale * 0.2) * globalScale;
  const barLength = 0.4 * globalScale; // Barra proporcionalmente más larga
  const barRadius = 0.015 * globalScale;
  const gripRadius = 0.02 * globalScale;
  
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
  
  // NUEVO: Función para hacer que todas las partes sean interactivas
  function setInteractiveProperties(object) {
    if (object.isMesh) {
      // Hacer que cada mesh SÍ sea interactivo, con el mismo tipo
      object.userData = {
        type: type,          // Todos los meshes tienen el mismo tipo (dumbbell1 o dumbbell2)
        isInteractive: true, // Todos son interactivos
        activityType: 'sport',
        title: `Deporte`,
        description: `Una mancuerna de ${weight} kilogramos`,
        action: 'examine'    // Acción por defecto
      };
    }
  }
  
  // Crear la barra central
  const barGeometry = new THREE.CylinderGeometry(barRadius, barRadius, barLength, 16);
  barGeometry.rotateX(Math.PI / 2); // Rotar para que esté horizontal (a lo largo del eje Z)
  const bar = new THREE.Mesh(barGeometry, barMaterial);
  setInteractiveProperties(bar); // NUEVO: Hacer interactiva
  dumbbellGroup.add(bar);
  
  // Crear el agarre central
  if (isDetailed) {
    const gripGeometry = new THREE.CylinderGeometry(gripRadius, gripRadius, barLength * 0.4, 16);
    gripGeometry.rotateX(Math.PI / 2);
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    setInteractiveProperties(grip); // NUEVO: Hacer interactiva
    dumbbellGroup.add(grip);
  }
  
  // Crear los discos (pesas)
  // Disco izquierdo
  const leftDiscGeometry = new THREE.CylinderGeometry(discRadius, discRadius, discThickness, 32);
  leftDiscGeometry.rotateX(Math.PI / 2);
  const leftDisc = new THREE.Mesh(leftDiscGeometry, discMaterial);
  leftDisc.position.z = -barLength / 2 + discThickness / 2;
  setInteractiveProperties(leftDisc); // NUEVO: Hacer interactiva
  dumbbellGroup.add(leftDisc);
  
  // Disco derecho
  const rightDiscGeometry = new THREE.CylinderGeometry(discRadius, discRadius, discThickness, 32);
  rightDiscGeometry.rotateX(Math.PI / 2);
  const rightDisc = new THREE.Mesh(rightDiscGeometry, discMaterial);
  rightDisc.position.z = barLength / 2 - discThickness / 2;
  setInteractiveProperties(rightDisc); // NUEVO: Hacer interactiva
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
    setInteractiveProperties(leftSmallDisc); // NUEVO: Hacer interactiva
    dumbbellGroup.add(leftSmallDisc);
    
    // Disco secundario derecho
    const rightSmallDiscGeometry = new THREE.CylinderGeometry(
      smallerDiscRadius, smallerDiscRadius, smallerDiscThickness, 32
    );
    rightSmallDiscGeometry.rotateX(Math.PI / 2);
    const rightSmallDisc = new THREE.Mesh(rightSmallDiscGeometry, discMaterial);
    rightSmallDisc.position.z = barLength / 2 - discThickness - smallerDiscThickness / 2;
    setInteractiveProperties(rightSmallDisc); // NUEVO: Hacer interactiva
    dumbbellGroup.add(rightSmallDisc);
  }
  
  // NUEVO: Marcar el grupo como un grupo interactivo especial
  dumbbellGroup.userData = {
    isInteractiveGroup: true,
    type: type
  };
  
  // Posicionar la mancuerna completa
  dumbbellGroup.position.set(position.x, position.y, position.z);
  
  // Añadir a la escena
  scene.add(dumbbellGroup);
  
  return dumbbellGroup;
}