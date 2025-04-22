import * as THREE from 'three';

export function createPlant(scene, options = {}) {
  const {
    position = { x: 0, y: 0, z: 0 },
    size = 'medium', // small, medium, large
    type = 'indoor' // indoor, succulent, tall
  } = options;
  
  const plantGroup = new THREE.Group();
  
  // Materiales
  const potMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xcb7e65,
    roughness: 0.8
  });
  
  const soilMaterial = new THREE.MeshStandardMaterial({
    color: 0x3b2921,
    roughness: 1
  });
  
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: type === 'succulent' ? 0x7fb07f : 0x598c4c,
    roughness: 0.8,
    metalness: 0.1
  });
  
  // Tamaños según opción
  let potRadius, potHeight, plantHeight;
  
  switch(size) {
    case 'small':
      potRadius = 0.12;
      potHeight = 0.15;
      plantHeight = 0.3;
      break;
    case 'large':
      potRadius = 0.25;
      potHeight = 0.3;
      plantHeight = 0.8;
      break;
    case 'medium':
    default:
      potRadius = 0.18;
      potHeight = 0.22;
      plantHeight = 0.5;
  }
  
  // Maceta
  const potGeometry = new THREE.CylinderGeometry(potRadius, potRadius * 0.8, potHeight, 16);
  const pot = new THREE.Mesh(potGeometry, potMaterial);
  plantGroup.add(pot);
  
  // Tierra
  const soilGeometry = new THREE.CylinderGeometry(potRadius * 0.95, potRadius * 0.95, potHeight * 0.1, 16);
  const soil = new THREE.Mesh(soilGeometry, soilMaterial);
  soil.position.y = potHeight * 0.45;
  plantGroup.add(soil);
  
  // Plantas según tipo
  if (type === 'indoor') {
    // Planta de interior con hojas grandes
    const numLeaves = size === 'small' ? 4 : (size === 'medium' ? 6 : 8);
    
    for (let i = 0; i < numLeaves; i++) {
      const stemHeight = plantHeight * (0.5 + Math.random() * 0.5);
      const stemGeometry = new THREE.CylinderGeometry(0.01, 0.01, stemHeight, 8);
      const stem = new THREE.Mesh(stemGeometry, new THREE.MeshStandardMaterial({ color: 0x598c4c }));
      
      // Posicionar tallo
      const angle = i * Math.PI * 2 / numLeaves;
      const radius = potRadius * 0.5;
      stem.position.x = Math.sin(angle) * radius;
      stem.position.z = Math.cos(angle) * radius;
      stem.position.y = potHeight * 0.5 + stemHeight * 0.5;
      
      // Inclinar tallo
      stem.rotation.x = (Math.random() - 0.5) * 0.3;
      stem.rotation.z = (Math.random() - 0.5) * 0.3;
      
      // Hoja grande al final del tallo
      const leafSize = potRadius * (0.8 + Math.random() * 0.4);
      const leafGeometry = new THREE.SphereGeometry(leafSize, 8, 8);
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.scale.set(1, 0.2, 1);
      leaf.position.y = stemHeight * 0.5;
      
      stem.add(leaf);
      plantGroup.add(stem);
    }
  } else if (type === 'succulent') {
    // Suculenta con hojas gruesas radiales
    const numLayers = size === 'small' ? 2 : (size === 'medium' ? 3 : 4);
    
    for (let layer = 0; layer < numLayers; layer++) {
      const layerSize = potRadius * (1.0 - layer * 0.2);
      const height = potHeight * 0.5 + layer * (plantHeight / numLayers);
      
      const leavesPerLayer = 6 + layer * 2;
      
      for (let i = 0; i < leavesPerLayer; i++) {
        const angle = i * Math.PI * 2 / leavesPerLayer;
        const leafGeometry = new THREE.SphereGeometry(layerSize * 0.4, 8, 8);
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        
        leaf.scale.set(0.7, 0.5, 1.5);
        leaf.position.x = Math.sin(angle) * layerSize * 0.8;
        leaf.position.z = Math.cos(angle) * layerSize * 0.8;
        leaf.position.y = height;
        
        leaf.rotation.y = angle;
        leaf.rotation.x = Math.PI / 4;
        
        plantGroup.add(leaf);
      }
    }
  } else if (type === 'tall') {
    // Planta alta con tallo central y ramas
    const trunkGeometry = new THREE.CylinderGeometry(0.03, 0.04, plantHeight, 8);
    const trunk = new THREE.Mesh(trunkGeometry, new THREE.MeshStandardMaterial({ 
      color: 0x5d4037 
    }));
    trunk.position.y = potHeight * 0.5 + plantHeight * 0.5;
    plantGroup.add(trunk);
    
    // Ramas con hojas
    const branchHeight = plantHeight * 0.7;
    for (let i = 0; i < 3; i++) {
      const height = potHeight * 0.5 + plantHeight * (0.5 + i * 0.15);
      const branchLength = plantHeight * (0.4 - i * 0.1);
      
      for (let j = 0; j < 4; j++) {
        const angle = j * Math.PI / 2 + i * Math.PI / 6;
        
        const leafGroup = new THREE.Group();
        
        // Rama
        const branchGeometry = new THREE.CylinderGeometry(0.01, 0.01, branchLength, 8);
        branchGeometry.translate(0, branchLength/2, 0);
        branchGeometry.rotateX(Math.PI/2);
        
        const branch = new THREE.Mesh(branchGeometry, new THREE.MeshStandardMaterial({ 
          color: 0x7d6347 
        }));
        
        // Hojas a lo largo de la rama
        for (let k = 0; k < 3; k++) {
          const leafGeometry = new THREE.SphereGeometry(0.08, 8, 8);
          const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
          leaf.scale.set(1, 0.2, 1);
          leaf.position.set(0, 0, branchLength * (0.2 + k * 0.3));
          branch.add(leaf);
        }
        
        leafGroup.add(branch);
        leafGroup.position.y = height;
        leafGroup.rotation.y = angle;
        
        trunk.add(leafGroup);
      }
    }
  }
  
  // Posicionamiento
  plantGroup.position.set(position.x, position.y, position.z);
  
  // Añadir a la escena
  scene.add(plantGroup);
  
  return plantGroup;
}