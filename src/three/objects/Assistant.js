import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export const createAssistant = (scene, config = {}) => {
  // Grupo principal del asistente
  const assistantGroup = new THREE.Group();
  assistantGroup.position.set(
    config.position?.x || -1.8,
    config.position?.y || 0.0,  // Posición en el suelo 
    config.position?.z || 1.8
  );

  // ¡IMPORTANTE! Reducir el tamaño general
  assistantGroup.scale.set(0.15,0.15,0.15); // Cambio de 0.4 a 0.25

  assistantGroup.userData = { 
    type: 'assistant',
    interactive: true,
    name: 'TimeBuddy',
    onClick: () => {
      toggleSpeechRecognition();
    }
  };
  
  // MATERIALES BASE - Ajustados para look masculino
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: 0xe0b097, // Tono más oscuro para hombre
    roughness: 0.6,
    metalness: 0.1
  });
  
  const hairMaterial = new THREE.MeshStandardMaterial({
    color: 0x241c10, // Cabello más oscuro
    roughness: 0.7,
    metalness: 0.1
  });
  
  const clothesBaseMaterial = new THREE.MeshStandardMaterial({
    color: 0x2c3e50, // Traje azul oscuro
    roughness: 0.6,
    metalness: 0.1
  });
  
  const clothesAccentMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.4,
    metalness: 0.2
  });
  
  // CABEZA Y CARA - Más masculina
  const headGroup = new THREE.Group();
  
  // Cabeza base - más cuadrada
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 1.9, 1.8, 4, 4, 4),
    skinMaterial
  );
  head.geometry.translate(0, 0, 0);
  // Redondear las esquinas manualmente
  for (let i = 0; i < head.geometry.attributes.position.array.length; i += 3) {
    const x = head.geometry.attributes.position.array[i];
    const y = head.geometry.attributes.position.array[i + 1];
    const z = head.geometry.attributes.position.array[i + 2];
    const length = Math.sqrt(x * x + y * y + z * z);
    const maxLength = Math.sqrt(0.9 * 0.9 + 0.95 * 0.95 + 0.9 * 0.9);
    if (length > maxLength * 0.9) {
      head.geometry.attributes.position.array[i] = x / length * maxLength * 0.9;
      head.geometry.attributes.position.array[i + 1] = y / length * maxLength * 0.9;
      head.geometry.attributes.position.array[i + 2] = z / length * maxLength * 0.9;
    }
  }
  headGroup.add(head);
  
  // Pelo corto masculino
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3.5),
    hairMaterial
  );
  hair.position.y = 0.5;
  hair.scale.x = 0.95;
  hair.scale.z = 0.95;
  headGroup.add(hair);
  
  // Barba ligera
  const beard = new THREE.Mesh(
    new THREE.CylinderGeometry(0.9, 0.7, 0.4, 16),
    hairMaterial
  );
  beard.position.set(0, -0.7, 0.1);
  beard.scale.z = 0.8;
  beard.material = new THREE.MeshStandardMaterial({
    color: 0x241c10,
    roughness: 0.9,
    metalness: 0.0,
    transparent: true,
    opacity: 0.7
  });
  headGroup.add(beard);
  
  // Ojos mejorados - más detallados
  const eyeGeometry = new THREE.SphereGeometry(0.15, 24, 24);
  const eyeWhiteMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    roughness: 0.2,
    metalness: 0.0 
  });
  
  const leftEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
  leftEye.position.set(-0.35, 0.05, 0.85);
  headGroup.add(leftEye);
  
  const rightEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
  rightEye.position.set(0.35, 0.05, 0.85);
  headGroup.add(rightEye);
  
  // Iris y pupilas - más realistas
  const irisMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x3c5e8b,  // Azul más profundo
    shininess: 90,
    specular: 0x333333
  });
  const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  
  // Reflejo en los ojos
  const eyeHighlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  
  const leftIris = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 24, 24),
    irisMaterial
  );
  leftIris.position.set(-0.35, 0.05, 0.95);
  headGroup.add(leftIris);
  
  const leftPupil = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 16, 16),
    pupilMaterial
  );
  leftPupil.position.set(-0.35, 0.05, 0.99);
  headGroup.add(leftPupil);
  
  const leftHighlight = new THREE.Mesh(
    new THREE.SphereGeometry(0.02, 8, 8),
    eyeHighlightMaterial
  );
  leftHighlight.position.set(-0.38, 0.08, 1.01);
  headGroup.add(leftHighlight);
  
  const rightIris = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 24, 24),
    irisMaterial
  );
  rightIris.position.set(0.35, 0.05, 0.95);
  headGroup.add(rightIris);
  
  const rightPupil = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 16, 16),
    pupilMaterial
  );
  rightPupil.position.set(0.35, 0.05, 0.99);
  headGroup.add(rightPupil);
  
  const rightHighlight = new THREE.Mesh(
    new THREE.SphereGeometry(0.02, 8, 8),
    eyeHighlightMaterial
  );
  rightHighlight.position.set(0.38, 0.08, 1.01);
  headGroup.add(rightHighlight);
  
  // Nariz más angulosa y masculina
  const nose = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.3, 0.2),
    skinMaterial
  );
  nose.position.set(0, -0.2, 0.9);
  // Redondear la nariz
  for (let i = 0; i < nose.geometry.attributes.position.array.length; i += 3) {
    const z = nose.geometry.attributes.position.array[i + 2];
    if (z > 0) {
      nose.geometry.attributes.position.array[i + 2] = Math.min(0.15, z);
    }
  }
  nose.geometry.attributes.position.needsUpdate = true;
  headGroup.add(nose);
  
  // Boca - línea más recta para hombre
  const smileCurve = new THREE.EllipseCurve(
    0, -0.55,          // centro x, y
    0.3, 0.05,         // radio x, y
    0, Math.PI,        // ángulo inicial, ángulo final
    false,             // sentido horario
    0                  // rotación
  );
  
  const smilePoints = smileCurve.getPoints(20);
  const smileGeometry = new THREE.BufferGeometry().setFromPoints(smilePoints);
  const smileMaterial = new THREE.LineBasicMaterial({ 
    color: 0x333333, 
    linewidth: 2
  });
  const smile = new THREE.Line(smileGeometry, smileMaterial);
  smile.position.z = 0.9;
  smile.position.y = -1;
  smile.rotation.z = Math.PI;
  headGroup.add(smile);
  
  // Cejas más gruesas para hombre
  const eyebrowCurve1 = new THREE.EllipseCurve(
    0, 0,              // centro x, y
    0.15, 0.03,        // radio x, y
    0, Math.PI,        // ángulo inicial, ángulo final
    true,              // sentido horario
    0                  // rotación
  );
  
  const eyebrowPoints1 = eyebrowCurve1.getPoints(10);
  const eyebrowGeo1 = new THREE.BufferGeometry().setFromPoints(eyebrowPoints1);
  const eyebrowMaterial = new THREE.MeshBasicMaterial({ color: 0x241c10 });
  
  // Crear cejas como objetos 3D en vez de líneas para mayor presencia
  const leftEyebrowMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.05, 0.05),
    eyebrowMaterial
  );
  leftEyebrowMesh.position.set(-0.35, 0.35, 0.9);
  leftEyebrowMesh.rotation.z = 0.1;
  headGroup.add(leftEyebrowMesh);
  
  const rightEyebrowMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.05, 0.05),
    eyebrowMaterial
  );
  rightEyebrowMesh.position.set(0.35, 0.35, 0.9);
  rightEyebrowMesh.rotation.z = -0.1;
  headGroup.add(rightEyebrowMesh);
  
  headGroup.position.y = 2.5;  // Ajustar posición de la cabeza relativa al cuerpo
  assistantGroup.add(headGroup);
  
  // CUERPO - Más robusto y masculino
  const bodyGroup = new THREE.Group();
  
  // Torso - más ancho para aspecto masculino
  const torso = new THREE.Mesh(
    new THREE.CapsuleGeometry(1.0, 1.5, 8, 16),
    clothesBaseMaterial
  );
  torso.position.y = 0.4;
  bodyGroup.add(torso);
  
  // Camisa debajo de la chaqueta
  const shirt = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.7, 0.5, 16),
    clothesAccentMaterial
  );
  shirt.position.y = 1.15;
  shirt.position.z = 0.1;
  bodyGroup.add(shirt);
  
  // Corbata
  const tieTop = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.15, 0.3, 16),
    new THREE.MeshStandardMaterial({ color: 0x9b2422 })  // Rojo oscuro
  );
  tieTop.position.y = 1.15;
  tieTop.position.z = 0.25;
  bodyGroup.add(tieTop);
  
  const tieLong = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.2, 0.7, 16),
    new THREE.MeshStandardMaterial({ color: 0x9b2422 })
  );
  tieLong.position.y = 0.7;
  tieLong.position.z = 0.3;
  bodyGroup.add(tieLong);
  
  // Cinturón
  const belt = new THREE.Mesh(
    new THREE.CylinderGeometry(1.01, 1.01, 0.15, 16),
    new THREE.MeshStandardMaterial({ 
      color: 0x000000,
      roughness: 0.4,
      metalness: 0.5
    })
  );
  belt.position.y = -0.5;
  bodyGroup.add(belt);
  
  // Hebilla del cinturón
  const buckle = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.12, 0.1),
    new THREE.MeshStandardMaterial({ 
      color: 0xd4af37,
      metalness: 0.8,
      roughness: 0.2
    })
  );
  buckle.position.set(0, -0.5, 1.02);
  bodyGroup.add(buckle);
  
  // Hombros más anchos para aspecto masculino
  const shoulderPad = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 16, 16),
    clothesBaseMaterial
  );
  shoulderPad.scale.set(1.2, 1, 1);
  shoulderPad.position.set(-1.0, 1, 0);
  bodyGroup.add(shoulderPad);
  
  const shoulderPadRight = shoulderPad.clone();
  shoulderPadRight.position.set(1.0, 1, 0);
  bodyGroup.add(shoulderPadRight);
  
  // Brazos más musculosos
  const armGeometry = new THREE.CapsuleGeometry(0.25, 1.3, 8, 12);
  
  const leftArm = new THREE.Mesh(
    armGeometry,
    clothesBaseMaterial
  );
  leftArm.position.set(-1.2, 0.3, 0);
  leftArm.rotation.z = -0.2;
  bodyGroup.add(leftArm);
  
  const rightArm = new THREE.Mesh(
    armGeometry,
    clothesBaseMaterial
  );
  rightArm.position.set(1.2, 0.3, 0);
  rightArm.rotation.z = 0.2;
  bodyGroup.add(rightArm);
  
  // Manos
  const handGeometry = new THREE.SphereGeometry(0.25, 16, 16);
  
  const leftHand = new THREE.Mesh(
    handGeometry,
    skinMaterial
  );
  leftHand.position.set(-1.4, -0.5, 0);
  bodyGroup.add(leftHand);
  
  const rightHand = new THREE.Mesh(
    handGeometry,
    skinMaterial
  );
  rightHand.position.set(1.4, -0.5, 0);
  bodyGroup.add(rightHand);
  
  // Piernas más robustas
  const legGeometry = new THREE.CapsuleGeometry(0.35, 1.8, 8, 12);
  const pantsMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a2639,  // Pantalones más oscuros
    roughness: 0.7,
    metalness: 0.1
  });
  
  const leftLeg = new THREE.Mesh(
    legGeometry,
    pantsMaterial
  );
  leftLeg.position.set(-0.4, -1.5, 0);
  bodyGroup.add(leftLeg);
  
  const rightLeg = new THREE.Mesh(
    legGeometry,
    pantsMaterial
  );
  rightLeg.position.set(0.4, -1.5, 0);
  bodyGroup.add(rightLeg);
  
  // Zapatos
  const shoeGeometry = new THREE.BoxGeometry(0.5, 0.25, 0.8);
  const shoeMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.5,
    metalness: 0.2
  });
  
  // Redondear los zapatos
  for (let i = 0; i < shoeGeometry.attributes.position.array.length; i += 3) {
    const z = shoeGeometry.attributes.position.array[i + 2];
    if (z > 0.3) {
      const scale = 0.3 / z;
      shoeGeometry.attributes.position.array[i + 2] = z * scale;
    }
  }
  shoeGeometry.attributes.position.needsUpdate = true;
  
  const leftShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
  leftShoe.position.set(-0.4, -2.5, 0.15);
  bodyGroup.add(leftShoe);
  
  const rightShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
  rightShoe.position.set(0.4, -2.5, 0.15);
  bodyGroup.add(rightShoe);
  
  // Agregar el grupo del cuerpo al asistente
  assistantGroup.add(bodyGroup);
  
  // ANIMACIÓN - Sin flotación pero con parpadeo y movimientos sutiles
  const animateParts = () => {
    const time = Date.now() * 0.001;
    
    // Posición estable en el suelo (sin flotar)
    assistantGroup.position.y = config.position?.y || 0.0;
    
    // Movimiento natural de los ojos
    leftPupil.position.x = -0.35 + Math.sin(time * 0.6) * 0.02;
    rightPupil.position.x = 0.35 + Math.sin(time * 0.6) * 0.02;
    
    // Parpadeo ocasional
    if (Math.sin(time * 3) > 0.97) {
      leftEye.scale.y = 0.1;
      rightEye.scale.y = 0.1;
    } else {
      leftEye.scale.y = 1;
      rightEye.scale.y = 1;
    }
    
    // Movimiento respiratorio sutil
    torso.scale.x = 1 + Math.sin(time * 1.5) * 0.01;
    torso.scale.z = 1 + Math.sin(time * 1.5) * 0.01;
    
    // Movimiento sutil de brazos, como balanceo natural al estar de pie
    leftArm.rotation.x = Math.sin(time * 0.5) * 0.05;
    rightArm.rotation.x = -Math.sin(time * 0.5) * 0.05;
    
    requestAnimationFrame(animateParts);
  };
  
  animateParts();
  
  // SISTEMA DE BOCADILLOS
  let currentBubble = null;
  let bubbleTimeout = null;
  
  // Mensajes predefinidos que se mostrarán en rotación
  const messages = [
    "¡Hola! Soy tu asistente, bienvenido a tu organizador interactivo de tareas", 
    "Los objetos interactivos son: la TV, el calendario, las mancuernas, los libros, las carpetas, la escoba y el PC",
    "Desde los diferentes objetos interactivos puedes añadir tareas completadas a tu calendario.",
    "Desde el calendario puedes añadir tareas no completadas de cualquier tipo"
  ];
  
  const createSpeechBubble = (message) => {
    console.log("Creando bocadillo:", message);
    
    // Si ya existe un bocadillo, eliminarlo
    if (currentBubble) {
      scene.remove(currentBubble);
      currentBubble = null;
      clearTimeout(bubbleTimeout);
    }
    
    // Crear grupo para el bocadillo
    const bubble = new THREE.Group();
    
    // Posicionar el bocadillo a una altura apropiada
    bubble.position.set(
      assistantGroup.position.x + 0.8,
      assistantGroup.position.y + 0.9, // Ajustado para mejor posición
      assistantGroup.position.z - 0.25
    );
    
    // Calcular tamaño adecuado para el contenido
    const messageLength = message.length;
    const bubbleWidth = Math.min(1.5, Math.max(1.0, messageLength * 0.01)); 
    const bubbleHeight = Math.min(0.8, Math.max(0.5, messageLength * 0.01)); // Más alto
    
    // Crear una forma unificada (bocadillo + flecha integrada)
    const bubbleShape = new THREE.Shape();
    const radius = 0.1; // Radio de las esquinas redondeadas
    
    // Parte superior derecha con curva
    bubbleShape.moveTo(bubbleWidth/2 - radius, -bubbleHeight/2);
    bubbleShape.quadraticCurveTo(bubbleWidth/2, -bubbleHeight/2, bubbleWidth/2, -bubbleHeight/2 + radius);
    
    // Lado derecho
    bubbleShape.lineTo(bubbleWidth/2, bubbleHeight/2 - radius);
    
    // Esquina superior derecha
    bubbleShape.quadraticCurveTo(bubbleWidth/2, bubbleHeight/2, bubbleWidth/2 - radius, bubbleHeight/2);
    
    // Parte superior
    bubbleShape.lineTo(-bubbleWidth/2 + radius, bubbleHeight/2);
    
    // Esquina superior izquierda
    bubbleShape.quadraticCurveTo(-bubbleWidth/2, bubbleHeight/2, -bubbleWidth/2, bubbleHeight/2 - radius);
    
    // Lado izquierdo
    bubbleShape.lineTo(-bubbleWidth/2, -bubbleHeight/2 + radius);
    
    // Esquina inferior izquierda CON FLECHA INTEGRADA
    bubbleShape.lineTo(-bubbleWidth/2, -bubbleHeight/2 + 0.2); // Punto de inicio de la flecha
    
    // La flecha como parte integrada del camino
    bubbleShape.lineTo(-bubbleWidth/2 - 0.15, -bubbleHeight/2); // Punta de flecha
    bubbleShape.lineTo(-bubbleWidth/2, -bubbleHeight/2 + 0.1); // Volver al bocadillo
    
    // Conectar con la esquina inferior derecha
    bubbleShape.lineTo(-bubbleWidth/2 + radius, -bubbleHeight/2);
    
    // Esquina inferior derecha
    bubbleShape.quadraticCurveTo(-bubbleWidth/2 + radius*2, -bubbleHeight/2, -bubbleWidth/2 + radius*3, -bubbleHeight/2);
    
    // Cerrar la forma
    bubbleShape.lineTo(bubbleWidth/2 - radius, -bubbleHeight/2);
    
    const bubbleMaterial = new THREE.MeshBasicMaterial({
      color: 0xf8f9fa,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95 // Más opaco para mejor legibilidad
    });
    
    const bubbleGeometry = new THREE.ShapeGeometry(bubbleShape);
    const bubbleBackground = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
    bubble.add(bubbleBackground);
    
    // Crear el texto utilizando canvas con margen extra
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Tamaño de texto más pequeño y proporcional
    const fontSize = 45; // Tamaño fijo más apropiado
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    
    // Garantizar que el texto se queda dentro del bocadillo
    const margin = canvas.width * 0.1; // 10% de margen
    const maxTextWidth = canvas.width - margin*2;
    
    // Dividir el texto en líneas de forma más conservadora
    const words = message.split(' ');
    let lines = [];
    let currentLine = words[0];
    
    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + " " + words[i];
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxTextWidth * 0.8) { // 20% más conservador
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);
    
    // Más espacio entre líneas
    const lineHeight = fontSize * 2; // Mayor espacio entre líneas
    const totalHeight = lines.length * lineHeight;
    const startY = (canvas.height - totalHeight) / 2 + fontSize / 2;
    
    // Dibujar el texto centrado y con restricción de ancho
    lines.forEach((line, i) => {
      ctx.fillText(line, canvas.width / 2, startY + i * lineHeight, maxTextWidth);
    });
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;
    
    // Crear material con la textura
    const textMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    // Crear plano para el texto, ligeramente más pequeño que el fondo
    const textGeometry = new THREE.PlaneGeometry(bubbleWidth * 0.95, bubbleHeight * 0.95);
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.z = 0.01; // Ligeramente delante del fondo
    bubble.add(textMesh);
    
    // Asegurar que el bocadillo siempre mire a la cámara
    bubble.lookAt(5, 1.5, 4); // Orientación inicial hacia donde suele estar la cámara
    
    bubble.scale.set(1,1,1);

    scene.add(bubble);
    currentBubble = bubble;
    
    // Hacer que el bocadillo siempre mire hacia la cámara
    const updateBubbleOrientation = () => {
      if (currentBubble) {
        try {
          // Hacer que solo gire en el eje Y (horizontal)
          const cameraPosition = camera.position.clone();
          cameraPosition.y = currentBubble.position.y;
          currentBubble.lookAt(cameraPosition);
        } catch (e) {
          //console.error("Error al orientar el bocadillo:", e);
        }
        
        requestAnimationFrame(updateBubbleOrientation);
      }
    };
    
    updateBubbleOrientation();
    
    // Tiempo proporcional para leer mensajes largos
    const displayTime = Math.max(5000, Math.min(10000, message.length * 100)); 
    bubbleTimeout = setTimeout(() => {
      scene.remove(bubble);
      currentBubble = null;
    }, displayTime);
  };
  
  // Mostrar mensajes secuencialmente con rotación
  const showMessageSequence = () => {
    let index = 0;
    
    const showNextMessage = () => {
      createSpeechBubble(messages[index]);
      index = (index + 1) % messages.length;
      setTimeout(showNextMessage, 12000); // Tiempo entre mensajes aumentado 
    };
    
    showNextMessage();
  };
  
  // Iniciar secuencia de mensajes después de un breve retraso
  setTimeout(showMessageSequence, 2000);
  
  // Función para manejar el reconocimiento de voz
  const toggleSpeechRecognition = () => {
    // Crear un bocadillo indicando que está escuchando
    createSpeechBubble("Estoy escuchando... ¿En qué puedo ayudarte?");
    
    // Implementación de reconocimiento de voz (placeholder)
    setTimeout(() => {
      createSpeechBubble("¡Entendido! Te ayudaré con eso.");
    }, 4000);
  };
  
  // Añadir el asistente a la escena
  scene.add(assistantGroup);
  
  return assistantGroup;
};