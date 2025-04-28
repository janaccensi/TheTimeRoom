import * as THREE from 'three';

export function createRemoteController(scene, options = {}) {
  const {
    position = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 },
    scale = 1
  } = options;

  // Grupo principal
  const remoteGroup = new THREE.Group();
  
  // Grupo específico para todos los botones
  const buttonsGroup = new THREE.Group();
  
  // Materiales
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x121212,
    roughness: 0.3,
    metalness: 0.2,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2
  });

  const accentMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x303030, 
    roughness: 0.2,
    metalness: 0.5
  });

  const buttonMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x505050,
    roughness: 0.4,
    metalness: 0.1
  });
  
  const highlightButtonMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x2196F3,
    emissive: 0x1976D2,
    emissiveIntensity: 0.2,
    roughness: 0.4,
    metalness: 0.3
  });

  const displayMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    roughness: 0.05,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 1.0
  });

  // Dimensiones
  const remoteWidth = 0.06;
  const remoteHeight = 0.01;
  const remoteLength = 0.18;
  const cornerRadius = 0.015; // Aumentado para esquinas más redondeadas (antes 0.01)
  
  // Factor de hundimiento de los botones (negativo para hundir)
  const buttonSinkFactor = -0.001;
  
  // Desplazamiento de todos los botones en el eje Z
  const buttonZOffset = 0.03;
  
  // Crear una forma redondeada para el mando
  const remoteShape = new THREE.Shape();
  
  // Dibujar la forma con esquinas redondeadas (más pronunciadas)
  remoteShape.moveTo(cornerRadius, 0);
  remoteShape.lineTo(remoteWidth - cornerRadius, 0);
  remoteShape.quadraticCurveTo(remoteWidth, 0, remoteWidth, cornerRadius);
  remoteShape.lineTo(remoteWidth, remoteLength - cornerRadius);
  remoteShape.quadraticCurveTo(remoteWidth, remoteLength, remoteWidth - cornerRadius, remoteLength);
  remoteShape.lineTo(cornerRadius, remoteLength);
  remoteShape.quadraticCurveTo(0, remoteLength, 0, remoteLength - cornerRadius);
  remoteShape.lineTo(0, cornerRadius);
  remoteShape.quadraticCurveTo(0, 0, cornerRadius, 0);
  
  // Configuración de extrusión con biselado más pronunciado
  const extrudeSettings = {
    steps: 2, // Aumentado para mejor calidad de curvas
    depth: remoteHeight,
    bevelEnabled: true,
    bevelThickness: 0.005, // Aumentado (antes 0.003)
    bevelSize: 0.004, // Aumentado (antes 0.002)
    bevelOffset: 0,
    bevelSegments: 5 // Aumentado para curvas más suaves (antes 3)
  };
  
  // Crear geometría extruida con esquinas redondeadas
  const remoteGeometry = new THREE.ExtrudeGeometry(remoteShape, extrudeSettings);
  const remoteMesh = new THREE.Mesh(remoteGeometry, bodyMaterial);
  
  // Posicionamos la base del mando en el origen
  remoteMesh.position.set(-remoteWidth/2, 0, -remoteLength/2); // Ajustamos posición para centrar
  remoteMesh.rotation.set(Math.PI / 2, 0, 0); // Rotamos para que quede plano
  remoteGroup.add(remoteMesh);
  
  // Posicionamos el grupo de botones justo sobre el mando pero hundido 
  // y desplazado en Z
  buttonsGroup.position.set(0, remoteHeight + buttonSinkFactor, buttonZOffset);
  remoteGroup.add(buttonsGroup);
  
  // Pantalla/Display pequeño - Ahora al grupo de botones
  const displayGeometry = new THREE.BoxGeometry(remoteWidth * 0.6, 0.001, remoteLength * 0.1);
  const display = new THREE.Mesh(displayGeometry, displayMaterial);
  display.position.set(0, 0.0005, -remoteLength * 0.2);
  buttonsGroup.add(display);

  // Creamos un grupo específico para el D-pad
  const dpadGroup = new THREE.Group();
  buttonsGroup.add(dpadGroup);
  
  // Botón circular principal (D-pad) - Ahora al grupo del D-pad
  const dpadRadius = remoteWidth * 0.35;
  const dpadGeometry = new THREE.CylinderGeometry(dpadRadius, dpadRadius, 0.001, 32);
  const dpad = new THREE.Mesh(dpadGeometry, accentMaterial);
  
  // Rotamos el cilindro para que quede plano
  dpad.rotation.x = Math.PI;
  dpad.position.set(0, 0.0005, 0);
  dpadGroup.add(dpad);

  // Botón central del D-pad - Ahora al grupo del D-pad
  const centerButtonGeometry = new THREE.CylinderGeometry(dpadRadius * 0.4, dpadRadius * 0.4, 0.002, 32);
  const centerButton = new THREE.Mesh(centerButtonGeometry, highlightButtonMaterial);
  centerButton.rotation.x = Math.PI;
  centerButton.position.set(0, 0.001, 0);
  dpadGroup.add(centerButton);

  // Añadir botones de dirección en el D-pad - Ahora al grupo del D-pad
  const dirButtons = [
    { x: 0, z: -dpadRadius * 0.7, symbol: '↑' }, // arriba
    { x: 0, z: dpadRadius * 0.7, symbol: '↓' },  // abajo
    { x: -dpadRadius * 0.7, z: 0, symbol: '←' }, // izquierda
    { x: dpadRadius * 0.7, z: 0, symbol: '→' }   // derecha
  ];

  dirButtons.forEach(dir => {
    const dirButtonGeometry = new THREE.CylinderGeometry(dpadRadius * 0.15, dpadRadius * 0.15, 0.002, 16);
    const dirButton = new THREE.Mesh(dirButtonGeometry, buttonMaterial);
    dirButton.rotation.x = Math.PI;
    dirButton.position.set(dir.x, 0.001, dir.z);
    dpadGroup.add(dirButton);
  });

  // Botones de control multimedia (arriba del D-pad)
  const mediaButtonsZ = -remoteLength * 0.2;
  const mediaButtonRadius = 0.006;
  const mediaButtonSpacing = 0.018;

  // Botones multimedia - Play/Pause, Stop, Rec
  for (let i = 0; i < 3; i++) {
    const mediaButtonGeometry = new THREE.CylinderGeometry(mediaButtonRadius, mediaButtonRadius, 0.002, 16);
    const mediaButton = new THREE.Mesh(
      mediaButtonGeometry, 
      i === 1 ? highlightButtonMaterial : buttonMaterial
    );
    mediaButton.rotation.x = Math.PI;
    mediaButton.position.set(
      (i-1) * mediaButtonSpacing, 
      0.001,
      mediaButtonsZ
    );
    buttonsGroup.add(mediaButton);
  }

  // Volumen y Canal (+ y -) - Ahora al grupo de botones
  const controlButtonsZ = remoteLength * 0.35;
  
  // Volumen
  for (let i = 0; i < 2; i++) {
    const volButtonGeometry = new THREE.BoxGeometry(0.012, 0.002, 0.012);
    const volButton = new THREE.Mesh(volButtonGeometry, buttonMaterial);
    volButton.position.set(
      -remoteWidth * 0.25, 
      0.001, 
      controlButtonsZ + (i === 0 ? -0.035 : -0.015)
    );
    buttonsGroup.add(volButton);
  }
  
  // Canal
  for (let i = 0; i < 2; i++) {
    const chButtonGeometry = new THREE.BoxGeometry(0.012, 0.002, 0.012);
    const chButton = new THREE.Mesh(chButtonGeometry, buttonMaterial);
    chButton.position.set(
      remoteWidth * 0.25, 
      0.001, 
      controlButtonsZ + (i === 0 ? -0.035 : -0.015)
    );
    buttonsGroup.add(chButton);
  }

  // Botones numéricos (3 filas de 3 botones + un 0) - Ahora al grupo de botones
  const numButtonRadius = 0.005;
  const numButtonStartZ = remoteLength * 0.45;
  const numButtonSpacingX = 0.018;
  const numButtonSpacingZ = 0.016;
  
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const numButtonGeometry = new THREE.CylinderGeometry(numButtonRadius, numButtonRadius, 0.002, 12);
      const numButton = new THREE.Mesh(numButtonGeometry, buttonMaterial);
      numButton.rotation.x = Math.PI;
      numButton.position.set(
        (col-1) * numButtonSpacingX,
        0.001,
        numButtonStartZ + row * numButtonSpacingZ
      );
      buttonsGroup.add(numButton);
    }
  }
  
  // Botón 0 central en la última fila - Ahora al grupo de botones
  const zeroButtonGeometry = new THREE.CylinderGeometry(numButtonRadius, numButtonRadius, 0.002, 12);
  const zeroButton = new THREE.Mesh(zeroButtonGeometry, buttonMaterial);
  zeroButton.rotation.x = Math.PI;
  zeroButton.position.set(
    0,
    0.001,
    numButtonStartZ -numButtonSpacingZ
  );
  buttonsGroup.add(zeroButton);
  buttonsGroup.position.z -= 0.07; // Ajustar la posición Z del grupo de botones
  buttonsGroup.position.y -= 0.004; // Ajustar la posición Y del grupo de botones
  // Aplicar escala global y posicionamiento
  remoteGroup.scale.set(scale, scale, scale);
  remoteGroup.position.set(position.x, position.y, position.z);
  remoteGroup.rotation.set(rotation.x, rotation.y, rotation.z);
  // Añadir metadatos para interacción
  remoteGroup.userData = {
    type: 'accessory',
    name: 'Control remoto de TV',
    interactive: true
  };
  
  // Añadir a la escena
  scene.add(remoteGroup);
  
  return remoteGroup;
}