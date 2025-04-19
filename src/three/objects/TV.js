import * as THREE from 'three';

export function createTV(scene, options = {}) {
  // Opciones por defecto
  const {
    position = { x: 0, y: 0, z: 0 },
    size = { width: 1.2, height: 0.7, depth: 0.1 },
    screenColor = 0x000000,
    frameColor = 0x333333,
    isOn = false,
    standType = 'simple' // 'simple', 'wall', 'modern'
  } = options;
  
  // Grupo para contener todas las partes de la TV
  const tvGroup = new THREE.Group();
  
  // Materiales
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: frameColor,
    roughness: 0.2,
    metalness: 0.8
  });
  
  const screenMaterial = new THREE.MeshStandardMaterial({
    color: screenColor,
    roughness: 0.05,
    metalness: 0.9,
    emissive: isOn ? 0x222266 : 0x000000,
    emissiveIntensity: isOn ? 0.2 : 0
  });
  
  const standMaterial = new THREE.MeshStandardMaterial({
    color: frameColor,
    roughness: 0.1,
    metalness: 0.9
  });
  
  // Marco exterior de la TV
  const frameWidth = size.width;
  const frameHeight = size.height;
  const frameDepth = size.depth;
  const frameGeometry = new THREE.BoxGeometry(frameWidth, frameHeight, frameDepth);
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  tvGroup.add(frame);
  
  // Pantalla (ligeramente más pequeña que el marco y proyectada hacia adelante)
  const screenBorder = 0.03; // Marco alrededor de la pantalla
  const screenWidth = frameWidth - screenBorder * 2;
  const screenHeight = frameHeight - screenBorder * 2;
  const screenDepth = 0.02;
  const screenGeometry = new THREE.BoxGeometry(screenWidth, screenHeight, screenDepth);
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.z = frameDepth / 2 - screenDepth / 2 + 0.001; // Colocar ligeramente delante del marco
  tvGroup.add(screen);
  
  // Borde inferior más ancho para los botones
  const bottomBorderHeight = 0.04;
  const bottomBorderGeometry = new THREE.BoxGeometry(frameWidth, bottomBorderHeight, frameDepth + 0.01);
  const bottomBorder = new THREE.Mesh(bottomBorderGeometry, frameMaterial);
  bottomBorder.position.y = -frameHeight / 2 - bottomBorderHeight / 2 + 0.01;
  tvGroup.add(bottomBorder);
  
  // Agregar soporte según el tipo seleccionado
  if (standType === 'simple') {
    // Soporte simple - una base rectangular
    const baseWidth = frameWidth * 0.6;
    const baseHeight = 0.05;
    const baseDepth = frameDepth * 2;
    
    const baseGeometry = new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth);
    const base = new THREE.Mesh(baseGeometry, standMaterial);
    base.position.y = -frameHeight / 2 - bottomBorderHeight - baseHeight / 2;
    
    // Pata vertical conectando TV y base
    const standHeight = 0.1;
    const standWidth = 0.05;
    const standGeometry = new THREE.BoxGeometry(standWidth, standHeight, standWidth);
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.y = -frameHeight / 2 - bottomBorderHeight / 2 - standHeight / 2;
    
    tvGroup.add(base);
    tvGroup.add(stand);
  } else if (standType === 'wall') {
    // Para TV montada en pared - pequeños soportes traseros
    const mountWidth = 0.1;
    const mountHeight = 0.2;
    const mountDepth = 0.05;
    
    const mount1 = new THREE.Mesh(
      new THREE.BoxGeometry(mountWidth, mountHeight, mountDepth),
      standMaterial
    );
    mount1.position.set(frameWidth * 0.3, 0, -frameDepth / 2 - mountDepth / 2);
    
    const mount2 = new THREE.Mesh(
      new THREE.BoxGeometry(mountWidth, mountHeight, mountDepth),
      standMaterial
    );
    mount2.position.set(-frameWidth * 0.3, 0, -frameDepth / 2 - mountDepth / 2);
    
    tvGroup.add(mount1);
    tvGroup.add(mount2);
  } else if (standType === 'modern') {
    // Soporte moderno - forma curva
    const curveRadius = 0.15;
    const curveSegments = 20;
    const curveGeometry = new THREE.TorusGeometry(
      curveRadius, 0.02, 16, curveSegments, Math.PI
    );
    curveGeometry.rotateX(Math.PI / 2);
    
    const curve = new THREE.Mesh(curveGeometry, standMaterial);
    curve.position.y = -frameHeight / 2 - bottomBorderHeight - curveRadius;
    curve.position.z = frameDepth / 2 - 0.02;
    
    // Base para el soporte moderno
    const modernBaseGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.03, 32);
    const modernBase = new THREE.Mesh(modernBaseGeometry, standMaterial);
    modernBase.position.y = -frameHeight / 2 - bottomBorderHeight - curveRadius * 2;
    modernBase.position.z = frameDepth / 4;
    
    tvGroup.add(curve);
    tvGroup.add(modernBase);
  }
  
  // Botones (pequeños cilindros en la parte inferior)
  const buttonRadius = 0.01;
  const buttonHeight = 0.005;
  const buttonGeometry = new THREE.CylinderGeometry(buttonRadius, buttonRadius, buttonHeight, 16);
  
  // Posiciones de los botones
  const buttonPositions = [
    { x: frameWidth / 2 - 0.1, y: -frameHeight / 2 - 0.02, z: frameDepth / 2 + 0.005 },
    { x: frameWidth / 2 - 0.14, y: -frameHeight / 2 - 0.02, z: frameDepth / 2 + 0.005 },
    { x: frameWidth / 2 - 0.18, y: -frameHeight / 2 - 0.02, z: frameDepth / 2 + 0.005 }
  ];
  
  // Crear botones
  buttonPositions.forEach((pos, index) => {
    const buttonMaterial = new THREE.MeshStandardMaterial({
      color: index === 0 ? 0xff0000 : 0x888888,
      roughness: 0.5,
      metalness: 0.6
    });
    
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.set(pos.x, pos.y, pos.z);
    button.rotation.x = Math.PI / 2; // Rotar para que esté de pie
    tvGroup.add(button);
  });
  
  // Posicionar el grupo completo
  tvGroup.position.set(position.x, position.y, position.z);
  
  // Añadir a la escena
  scene.add(tvGroup);
  
  // Método para encender/apagar la TV
  const togglePower = () => {
    isOn = !isOn;
    screenMaterial.emissive.set(isOn ? 0x222266 : 0x000000);
    screenMaterial.emissiveIntensity = isOn ? 0.2 : 0;
  };
  
  return {
    tvGroup,
    togglePower
  };
}