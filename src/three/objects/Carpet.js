import * as THREE from 'three';

export function createCarpet(scene, options = {}) {
  const {
    position = { x: 0.2, y: 0.01, z: 2 },  // Ligeramente sobre el suelo
    size = { width: 3, height: 0.02, depth: 2 },
    color = 0x8b4513,  // Marrón
    pattern = 'simple'  // 'simple', 'geometric', 'ornate'
  } = options;
  
  const carpetGroup = new THREE.Group();
  
  // Material base
  const carpetMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.9,
    metalness: 0,
    side: THREE.DoubleSide
  });
  
  // Geometría base
  const carpetGeometry = new THREE.BoxGeometry(
    size.width, size.height, size.depth
  );
  
  const carpet = new THREE.Mesh(carpetGeometry, carpetMaterial);
  carpetGroup.add(carpet);
  
  // Añadir detalles según el patrón
  if (pattern !== 'simple') {
    // Borde de la alfombra
    const borderWidth = 0.1;
    const borderColor = new THREE.Color(color).multiplyScalar(0.8);
    
    const borderMaterial = new THREE.MeshStandardMaterial({
      color: borderColor,
      roughness: 0.9,
      metalness: 0
    });
    
    if (pattern === 'geometric') {
      // Líneas geométricas
      for (let i = 0; i < 3; i++) {
        // Líneas horizontales
        const hLine = new THREE.Mesh(
          new THREE.BoxGeometry(size.width - 0.1, size.height + 0.002, 0.05),
          borderMaterial
        );
        hLine.position.y = size.height / 2 + 0.001;
        hLine.position.z = (i - 1) * (size.depth / 4);
        carpetGroup.add(hLine);
        
        // Líneas verticales
        const vLine = new THREE.Mesh(
          new THREE.BoxGeometry(0.05, size.height + 0.002, size.depth - 0.1),
          borderMaterial
        );
        vLine.position.y = size.height / 2 + 0.001;
        vLine.position.x = (i - 1) * (size.width / 4);
        carpetGroup.add(vLine);
      }
      
    } else if (pattern === 'ornate') {
      // Patrón ornamental (círculos o formas decorativas)
      const centerPattern = new THREE.Mesh(
        new THREE.CircleGeometry(size.width * 0.3, 32),
        borderMaterial
      );
      centerPattern.rotation.x = -Math.PI / 2;
      centerPattern.position.y = size.height / 2 + 0.001;
      carpetGroup.add(centerPattern);
      
      // Círculos en las esquinas
      const cornerSize = size.width * 0.15;
      for (let i = 0; i < 4; i++) {
        const x = ((i % 2) * 2 - 1) * (size.width / 2 - cornerSize);
        const z = (i < 2 ? 1 : -1) * (size.depth / 2 - cornerSize);
        
        const corner = new THREE.Mesh(
          new THREE.CircleGeometry(cornerSize, 32),
          borderMaterial
        );
        corner.rotation.x = -Math.PI / 2;
        corner.position.set(x, size.height / 2 + 0.001, z);
        carpetGroup.add(corner);
      }
    }
  }
  
  // Posicionamiento
  carpetGroup.position.set(position.x, position.y, position.z);
  
  // Añadir a la escena
  scene.add(carpetGroup);
  
  return carpetGroup;
}