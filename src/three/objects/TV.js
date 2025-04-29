import * as THREE from 'three';

export function createTV(scene, options = {}) {
  // Opciones por defecto
  let {
    position = { x: 0, y: 0, z: 0 },
    size = { width: 1.2, height: 0.7, depth: 0.025 }, // Pantalla fina
    screenColor = 0x000000,
    frameColor = 0x111111, // Marco más oscuro/negro
    isOn = true,
    standType = 'modern' // Por defecto usamos el soporte moderno
  } = options;
  
  // Grupo para contener todas las partes de la TV
  const tvGroup = new THREE.Group();
  
  // Materiales mejorados
  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: frameColor,
    roughness: 0.3,
    metalness: 0.7,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2
  });
  
  const screenMaterial = new THREE.MeshPhysicalMaterial({
    color: screenColor,
    roughness: 0.05,
    metalness: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    reflectivity: 1.0,
    emissive: isOn ? 0x444466 : 0x000000,
    emissiveIntensity: isOn ? 0.3 : 0
  });
  
  const standMaterial = new THREE.MeshPhysicalMaterial({
    color: frameColor,
    roughness: 0.2,
    metalness: 0.8,
    clearcoat: 0.3
  });
  
  // Marco exterior de la TV - más fino
  const frameWidth = size.width;
  const frameHeight = size.height;
  const frameDepth = size.depth*1.2; // Marco ligeramente más grueso que la pantalla
  
  // Creamos el marco con bordes redondeados
  const frameBorderRadius = 0.015;
  const frameShape = new THREE.Shape();
  
  frameShape.moveTo(frameBorderRadius, 0);
  frameShape.lineTo(frameWidth - frameBorderRadius, 0);
  frameShape.quadraticCurveTo(frameWidth, 0, frameWidth, frameBorderRadius);
  frameShape.lineTo(frameWidth, frameHeight - frameBorderRadius);
  frameShape.quadraticCurveTo(frameWidth, frameHeight, frameWidth - frameBorderRadius, frameHeight);
  frameShape.lineTo(frameBorderRadius, frameHeight);
  frameShape.quadraticCurveTo(0, frameHeight, 0, frameHeight - frameBorderRadius);
  frameShape.lineTo(0, frameBorderRadius);
  frameShape.quadraticCurveTo(0, 0, frameBorderRadius, 0);
  
  const extrudeSettings = {
    depth: frameDepth,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.006,
    bevelSegments: 3
  };
  
  const frameGeometry = new THREE.ExtrudeGeometry(frameShape, extrudeSettings);
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  
  // Centramos el marco
  frame.position.x = -frameWidth / 2;
  frame.position.y = -frameHeight / 2;
  frame.position.z = -frameDepth / 2;
  
  tvGroup.add(frame);
  
  // Pantalla (con marco más pronunciado)
  const screenBorder = 0.018; // Borde más ancho para destacar el marco
  const screenWidth = frameWidth - screenBorder * 2;
  const screenHeight = frameHeight - screenBorder * 2;
  
  // Borde interior destacando el límite entre pantalla y marco
  const innerBorderGeometry = new THREE.RingGeometry(
    Math.min(screenWidth, screenHeight) * 0.995 * 0.5,
    Math.min(screenWidth, screenHeight) * 0.5,
    64
  );
  const innerBorderMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x000000,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
  });
  const innerBorder = new THREE.Mesh(innerBorderGeometry, innerBorderMaterial);
  innerBorder.rotation.x = -Math.PI / 2;
  innerBorder.position.z = frameDepth / 2 + 0.001;
  
  // Geometría con ligera curvatura para la pantalla
  const screenSegments = 32;
  const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight, screenSegments, screenSegments);
  
  // Aplicar ligera curvatura a la pantalla
  const curveAmount = 0.003; // Curvatura sutil
  const screenVertices = screenGeometry.attributes.position.array;
  
  for (let i = 0; i < screenVertices.length; i += 3) {
    const x = screenVertices[i];
    screenVertices[i + 2] = curveAmount * (x * x);
  }
  
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  
  // Hundimos ligeramente la pantalla respecto al marco
  screen.position.z = frameDepth / 2 - 0.002; // Pantalla ligeramente hundida
  tvGroup.add(screen);
  
  // Añadir un sutil bisel interior para destacar el marco
  const innerFrameWidth = screenWidth + 0.004;
  const innerFrameHeight = screenHeight + 0.004;
  const innerFrameGeometry = new THREE.PlaneGeometry(innerFrameWidth, innerFrameHeight);
  const innerFrameMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x050505,
    roughness: 0.1,
    metalness: 0.9,
    clearcoat: 0.8
  });
  
  const innerFrame = new THREE.Mesh(innerFrameGeometry, innerFrameMaterial);
  innerFrame.position.z = frameDepth / 2 - 0.001; // Entre el marco y la pantalla
  tvGroup.add(innerFrame);
  
  // Soporte moderno estilizado
  const baseWidth = frameWidth * 0.4;
  const baseHeight = 0.01; // Base delgada
  const baseDepth = 0.3;
  
  const baseGeometry = new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth);
  const base = new THREE.Mesh(baseGeometry, standMaterial);
  
  // Posición de la base
  base.position.y = -frameHeight / 2 - 0.08;
  base.position.z = frameDepth;
  
  // Soporte vertical estilizado
  const standHeight = 0.08;
  const standWidth = 0.02;
  const standDepth = 0.02;
  
  const standGeometry = new THREE.BoxGeometry(standWidth, standHeight, standDepth);
  const stand = new THREE.Mesh(standGeometry, standMaterial);
  
  stand.position.y = -frameHeight / 2 - standHeight / 2;
  stand.position.z = -frameDepth / 2;
  
  tvGroup.add(base);
  tvGroup.add(stand);
  
  // Añadir detalle luminoso sutil en la parte frontal (como indicador de encendido)
  const indicatorSize = 0.005;
  const indicatorGeometry = new THREE.CircleGeometry(indicatorSize, 16);
  const indicatorMaterial = new THREE.MeshBasicMaterial({
    color: isOn ? 0x44ff44 : 0x333333,
    transparent: true,
    opacity: isOn ? 0.8 : 0.3
  });
  
  const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
  indicator.position.set(0, -frameHeight / 2+0.004, frameDepth / 2+0.015);  tvGroup.add(indicator);
  
  // Añadir logo (sutil, en la parte inferior)
  const logoSize = 0.03;
  const logoGeometry = new THREE.PlaneGeometry(logoSize, logoSize / 3);
  const logoMaterial = new THREE.MeshBasicMaterial({
    color: 0xcccccc,
    transparent: true,
    opacity: 0.2
  });
  
  const logo = new THREE.Mesh(logoGeometry, logoMaterial);
  logo.position.set(0, -frameHeight / 2 + 0.03, frameDepth / 2+0.015);
  tvGroup.add(logo);
  
  // Posicionar el grupo completo
  tvGroup.position.set(position.x, position.y, position.z);
  
  // Añadir a la escena
  scene.add(tvGroup);
  
  // Método para encender/apagar la TV con efecto mejorado
  const togglePower = () => {
    isOn = !isOn;
    
    if (isOn) {
      // Animación sutil de encendido
      const initialEmissive = new THREE.Color(0x000011);
      screenMaterial.emissive = initialEmissive;
      
      // Comenzar con una intensidad baja
      let intensity = 0;
      const targetIntensity = 0.4;
      const duration = 800;
      const startTime = Date.now();
      
      // Cambiar también el color del indicador
      indicatorMaterial.color.set(0x44ff44);
      indicatorMaterial.opacity = 0.8;
      
      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        intensity = progress * targetIntensity;
        screenMaterial.emissiveIntensity = intensity;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          screenMaterial.emissive.set(0x444466);
        }
      };
      
      animate();
    } else {
      // Apagado más rápido
      screenMaterial.emissive.set(0x000000);
      screenMaterial.emissiveIntensity = 0;
      
      // Cambiar el indicador a apagado
      indicatorMaterial.color.set(0x333333);
      indicatorMaterial.opacity = 0.3;
    }
  };
  
  return {
    tvGroup,
    togglePower
  };
}