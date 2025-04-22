import * as THREE from 'three';

export function createBroom(scene, options = {}) {
  const {
    position = { x: 0, y: 0, z: 0 },
    rotation = 0,
    leaning = false,
    leaningAngle = 0.3,
    handleColor = 0xc19a6b, // Color de palo de madera natural
    bristlesColor = 0xdec683 // Color paja/fibras naturales
  } = options;
  
  const broomGroup = new THREE.Group();
  
  // Materiales
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: handleColor,
    roughness: 0.8,
    metalness: 0.1
  });
  
  const bristlesMaterial = new THREE.MeshStandardMaterial({
    color: bristlesColor,
    roughness: 1.0,
    metalness: 0
  });
  
  // Palo - más largo y fino como en la imagen
  const handleHeight = 1.8;
  const handleRadius = 0.012;
  const handleGeometry = new THREE.CylinderGeometry(
    handleRadius, handleRadius * 1.1, handleHeight, 8
  );
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  
  // Centrar el palo con origen en la base
  handle.position.y = handleHeight / 2;
  broomGroup.add(handle);
  
  // Base de las cerdas - forma triangular/cónica como se ve en la imagen
  const bristlesHeight = 0.45; // Más largo para parecerse a la imagen
  const bristlesTopRadius = 0.015;
  const bristlesBottomRadius = 0.12; // Más ancho en la base
  
  // Crear forma de cono para las cerdas principales
  const bristlesConeGeometry = new THREE.CylinderGeometry(
    bristlesTopRadius, bristlesBottomRadius, bristlesHeight, 12
  );
  const bristlesCone = new THREE.Mesh(bristlesConeGeometry, bristlesMaterial);
  bristlesCone.position.y = 0;
  broomGroup.add(bristlesCone);
  
  // Atadura - donde el palo se une a las cerdas
  const bindingGeometry = new THREE.CylinderGeometry(
    handleRadius * 2, handleRadius * 2.5, 0.05, 8
  );
  const bindingMaterial = new THREE.MeshStandardMaterial({
    color: 0xa67c52,
    roughness: 0.6,
    metalness: 0.1
  });
  const binding = new THREE.Mesh(bindingGeometry, bindingMaterial);
  binding.position.y = 0.02;
  broomGroup.add(binding);
  
  // Líneas decorativas en las cerdas (como en la imagen)
  const stripePositions = [0.08, 0.16, 0.24];
  const stripeColors = [0xa86032, 0x2d7d36, 0x853e3e]; // Colores sutiles para las líneas
  
  stripePositions.forEach((pos, index) => {
    const stripeGeometry = new THREE.TorusGeometry(
      bristlesBottomRadius * (1 - pos/bristlesHeight * 0.4), 
      0.004, 
      8, 
      16
    );
    const stripeMaterial = new THREE.MeshStandardMaterial({
      color: stripeColors[index % stripeColors.length],
      roughness: 0.8
    });
    
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.y = pos;
    stripe.rotation.x = Math.PI / 2;
    bristlesCone.add(stripe);
  });
  
  // Efecto minimalista de las fibras individuales (simplificado pero visual)
  const fiberCount = 30; // Reducido para estilo minimalista
  
  for (let i = 0; i < fiberCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radiusPosition = Math.random() * bristlesBottomRadius * 0.85;
    
    const fiberHeight = bristlesHeight * (0.85 + Math.random() * 0.3);
    const fiberGeometry = new THREE.CylinderGeometry(
      0.002, 0.001, fiberHeight, 3
    );
    
    const fiberMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(bristlesColor).offsetHSL(0, 0, (Math.random() - 0.5) * 0.1),
      roughness: 1.0
    });
    
    const fiber = new THREE.Mesh(fiberGeometry, fiberMaterial);
    
    // Posicionar aleatoriamente dentro del área de cerdas
    fiber.position.x = Math.sin(angle) * radiusPosition;
    fiber.position.z = Math.cos(angle) * radiusPosition;
    fiber.position.y = -fiberHeight / 2 + 0.05;
    
    // Inclinar ligeramente las fibras hacia afuera
    const inclineAngle = Math.atan2(radiusPosition, bristlesHeight);
    fiber.rotation.x = (Math.random() - 0.5) * 0.2;
    fiber.rotation.z = angle + Math.PI;
    fiber.rotation.y = inclineAngle;
    
    bristlesCone.add(fiber);
  }
  
  // Aplicar inclinación si está apoyada
  if (leaning) {
    broomGroup.rotation.x = leaningAngle;
    // Ajustar posición para que toque el suelo
    const yOffset = Math.sin(leaningAngle) * (handleHeight / 2);
    broomGroup.position.y += yOffset;
  }
  
  // Posicionamiento y rotación final
  broomGroup.position.set(position.x, position.y, position.z);
  broomGroup.rotation.y = rotation;
  
  // Añadir a la escena
  scene.add(broomGroup);
  
  return broomGroup;
}
