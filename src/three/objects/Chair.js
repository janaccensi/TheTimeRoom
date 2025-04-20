import * as THREE from 'three';

export function createChair(scene, options = {}) {
  const {
    position = { x: 0, y: 0, z: 0 },
    color = 0x333333,
    type = 'office', // office, wooden, modern
    rotation = 0
  } = options;
  
  const chairGroup = new THREE.Group();
  
  // Determinar materiales según el tipo
  let seatMaterial, legMaterial, backrestMaterial;
  
  if (type === 'wooden') {
    const woodColor = 0xa0522d;
    
    seatMaterial = new THREE.MeshStandardMaterial({
      color: woodColor,
      roughness: 0.7,
      metalness: 0.1
    });
    
    legMaterial = seatMaterial;
    backrestMaterial = seatMaterial;
    
  } else if (type === 'office') {
    seatMaterial = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.5,
      metalness: 0.2
    });
    
    legMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.2,
      metalness: 0.8
    });
    
    backrestMaterial = seatMaterial;
    
  } else if (type === 'modern') {
    seatMaterial = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.3,
      metalness: 0.5
    });
    
    legMaterial = new THREE.MeshStandardMaterial({
      color: 0xdddddd,
      roughness: 0.2,
      metalness: 0.9
    });
    
    backrestMaterial = seatMaterial;
  }
  
  // Crear geometría según el tipo
  if (type === 'office') {
    // Asiento
    const seatGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.05, 16);
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.y = 0.45;
    chairGroup.add(seat);
    
    // Base con ruedas
    const baseRadius = 0.25;
    const baseGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.45, 8);
    const base = new THREE.Mesh(baseGeometry, legMaterial);
    base.position.y = 0.225;
    chairGroup.add(base);
    
    // Estrella inferior
    const starGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 5);
    const star = new THREE.Mesh(starGeometry, legMaterial);
    star.position.y = 0.01;
    chairGroup.add(star);
    
    // Ruedas
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const wheelGeometry = new THREE.SphereGeometry(0.03, 8, 8);
      const wheel = new THREE.Mesh(wheelGeometry, new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.5
      }));
      
      wheel.position.x = Math.sin(angle) * 0.2;
      wheel.position.z = Math.cos(angle) * 0.2;
      wheel.position.y = 0.03;
      
      chairGroup.add(wheel);
    }
    
    // Respaldo
    const backrestGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.05);
    const backrest = new THREE.Mesh(backrestGeometry, backrestMaterial);
    backrest.position.y = 0.65;
    backrest.position.z = -0.15;
    chairGroup.add(backrest);
    
  } else if (type === 'wooden' || type === 'modern') {
    // Asiento
    const seatWidth = 0.4;
    const seatDepth = 0.4;
    const seatHeight = 0.05;
    
    const seatGeometry = new THREE.BoxGeometry(seatWidth, seatHeight, seatDepth);
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.y = 0.45;
    chairGroup.add(seat);
    
    // Respaldo
    const backrestHeight = type === 'modern' ? 0.3 : 0.5;
    const backrestGeometry = new THREE.BoxGeometry(seatWidth, backrestHeight, 0.05);
    const backrest = new THREE.Mesh(backrestGeometry, backrestMaterial);
    backrest.position.y = 0.45 + seatHeight / 2 + backrestHeight / 2;
    backrest.position.z = -(seatDepth / 2 - 0.025);
    chairGroup.add(backrest);
    
    // Patas
    const legThickness = type === 'modern' ? 0.03 : 0.04;
    const legHeight = 0.45;
    
    for (let i = 0; i < 4; i++) {
      const xPos = ((i % 2) * 2 - 1) * (seatWidth / 2 - legThickness / 2);
      const zPos = ((i < 2) ? 1 : -1) * (seatDepth / 2 - legThickness / 2);
      
      const legGeometry = new THREE.BoxGeometry(legThickness, legHeight, legThickness);
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      
      leg.position.set(xPos, legHeight / 2, zPos);
      chairGroup.add(leg);
    }
  }
  
  // Posicionamiento y rotación
  chairGroup.position.set(position.x, position.y, position.z);
  chairGroup.rotation.y = rotation;
  
  // Añadir a la escena
  scene.add(chairGroup);
  
  return chairGroup;
}