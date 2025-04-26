import * as THREE from 'three';

export function createSofa(scene, options = {}) {
  const {
    position = { x: 0, y: 0, z: 0 },
    rotation = 0,
    color = 0x7f9cb7, // Soft blue-gray color
    accentColor = 0x6a89cc, // Slightly darker accent
    type = 'modern', // modern, sectional, corner
    cornerSide = 'right' // Para sofás en esquina: 'right' o 'left'
  } = options;
  
  const sofaGroup = new THREE.Group();
  
  // Materials
  const fabricMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.85,
    metalness: 0.05
  });
  
  const accentMaterial = new THREE.MeshStandardMaterial({
    color: accentColor,
    roughness: 0.8,
    metalness: 0.1
  });
  
  const legMaterial = new THREE.MeshStandardMaterial({
    color: 0x34302d, // Dark wood
    roughness: 0.6,
    metalness: 0.2
  });
  
  // Dimensions
  const baseWidth = type === 'sectional' || type === 'corner' ? 2.2 : 2.0;
  const baseHeight = 0.2;
  const baseDepth = 0.9;
  const legHeight = 0.15;
  const seatHeight = 0.2;
  const backHeight = 0.5;
  const armWidth = 0.25;
  
  // --- SOFA BASE ---
  // Create a single base instead of many primitives
  const baseGeometry = new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth);
  const base = new THREE.Mesh(baseGeometry, fabricMaterial);
  base.position.y = legHeight + baseHeight/2;
  sofaGroup.add(base);
  
  // --- LEGS ---
  const legPositions = [
    {x: baseWidth/2 - 0.15, z: baseDepth/2 - 0.15},
    {x: baseWidth/2 - 0.15, z: -baseDepth/2 + 0.15},
    {x: -baseWidth/2 + 0.15, z: baseDepth/2 - 0.15},
    {x: -baseWidth/2 + 0.15, z: -baseDepth/2 + 0.15}
  ];
  
  legPositions.forEach(pos => {
    // Simple tapered legs
    const legGeometry = new THREE.CylinderGeometry(0.035, 0.02, legHeight, 8);
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos.x, legHeight/2, pos.z);
    sofaGroup.add(leg);
  });
  
  // --- SEAT CUSHIONS ---
  const cushionCount = 2;
  const cushionWidth = (baseWidth - 0.1) / cushionCount;
  
  for (let i = 0; i < cushionCount; i++) {
    const cushionX = ((i * 2) - (cushionCount - 1)) * (cushionWidth / 2);
    
    // Simple cushion with slightly rounded top
    const cushionGeometry = new THREE.BoxGeometry(cushionWidth - 0.05, seatHeight, baseDepth - 0.15);
    const cushion = new THREE.Mesh(cushionGeometry, fabricMaterial);
    cushion.position.set(
      cushionX, 
      legHeight + baseHeight + seatHeight/2, 
      0
    );
    sofaGroup.add(cushion);
    
    // Add subtle seam
    const seamGeometry = new THREE.BoxGeometry(0.01, seatHeight - 0.05, baseDepth - 0.2);
    const seam = new THREE.Mesh(seamGeometry, accentMaterial);
    seam.position.set(cushionX, legHeight + baseHeight + seatHeight/2, 0);
    sofaGroup.add(seam);
  }
  
  // --- BACKREST ---
  const backWidth = baseWidth - 0.1;
  const backGeometry = new THREE.BoxGeometry(backWidth, backHeight, 0.15);
  const back = new THREE.Mesh(backGeometry, fabricMaterial);
  back.position.set(0, legHeight + baseHeight + backHeight/2, -baseDepth/2 + 0.075);
  sofaGroup.add(back);
  
  // --- BACK CUSHIONS ---
  const backCushionCount = 2;
  const backCushionWidth = backWidth / backCushionCount;
  
  for (let i = 0; i < backCushionCount; i++) {
    const cushionX = ((i * 2) - (backCushionCount - 1)) * (backCushionWidth / 2);
    
    // Back cushion - slightly protruding
    const backCushionGeometry = new THREE.BoxGeometry(backCushionWidth - 0.1, backHeight - 0.15, 0.18);
    const backCushion = new THREE.Mesh(backCushionGeometry, fabricMaterial);
    backCushion.position.set(
      cushionX,
      legHeight + baseHeight + backHeight/2,
      -baseDepth/2 + 0.15
    );
    sofaGroup.add(backCushion);
    
    // Horizontal decorative seam on back cushion
    const seamGeometry = new THREE.BoxGeometry(backCushionWidth - 0.15, 0.02, 0.01);
    const seam = new THREE.Mesh(seamGeometry, accentMaterial);
    seam.position.set(
      cushionX,
      legHeight + baseHeight + backHeight/2,
      -baseDepth/2 + 0.25
    );
    sofaGroup.add(seam);
  }
  
  // --- ARMS ---
  // Left arm
  const leftArmGeometry = new THREE.BoxGeometry(armWidth, backHeight - 0.1, baseDepth - 0.05);
  const leftArm = new THREE.Mesh(leftArmGeometry, fabricMaterial);
  leftArm.position.set(
    -baseWidth/2 + armWidth/2,
    legHeight + baseHeight + (backHeight - 0.1)/2,
    0
  );
  sofaGroup.add(leftArm);
  
  // Right arm
  const rightArmGeometry = new THREE.BoxGeometry(armWidth, backHeight - 0.1, baseDepth - 0.05);
  const rightArm = new THREE.Mesh(rightArmGeometry, fabricMaterial);
  rightArm.position.set(
    baseWidth/2 - armWidth/2,
    legHeight + baseHeight + (backHeight - 0.1)/2,
    0
  );
  sofaGroup.add(rightArm);
  
  // --- SECTIONAL EXTENSION (if selected) ---
  if (type === 'sectional' || type === 'corner') {
    const extensionWidth = 0.9;
    const extensionX = cornerSide === 'right' ? 
                      baseWidth/2 + extensionWidth/2 - armWidth/2 :
                      -baseWidth/2 - extensionWidth/2 + armWidth/2;
    
    // Extension base
    const extensionBaseGeometry = new THREE.BoxGeometry(extensionWidth, baseHeight, baseDepth);
    const extensionBase = new THREE.Mesh(extensionBaseGeometry, fabricMaterial);
    extensionBase.position.set(extensionX, legHeight + baseHeight/2, 0);
    sofaGroup.add(extensionBase);
    
    // Extension legs
    const extLegX = cornerSide === 'right' ? 
                   baseWidth/2 + extensionWidth - 0.15 :
                   -baseWidth/2 - extensionWidth + 0.15;
                   
    const frontLegGeometry = new THREE.CylinderGeometry(0.035, 0.02, legHeight, 8);
    const frontLeg = new THREE.Mesh(frontLegGeometry, legMaterial);
    frontLeg.position.set(extLegX, legHeight/2, baseDepth/2 - 0.15);
    sofaGroup.add(frontLeg);
    
    const backLegGeometry = new THREE.CylinderGeometry(0.035, 0.02, legHeight, 8);
    const backLeg = new THREE.Mesh(backLegGeometry, legMaterial);
    backLeg.position.set(extLegX, legHeight/2, -baseDepth/2 + 0.15);
    sofaGroup.add(backLeg);
    
    // Extension cushion
    const extensionCushionGeometry = new THREE.BoxGeometry(extensionWidth - 0.1, seatHeight, baseDepth - 0.15);
    const extensionCushion = new THREE.Mesh(extensionCushionGeometry, fabricMaterial);
    extensionCushion.position.set(extensionX, legHeight + baseHeight + seatHeight/2, 0);
    sofaGroup.add(extensionCushion);
    
    // Extension backrest (for corner type)
    if (type === 'corner') {
      const sideBackrestGeometry = new THREE.BoxGeometry(0.15, backHeight, baseDepth - armWidth);
      const sideBackrest = new THREE.Mesh(sideBackrestGeometry, fabricMaterial);
      
      if (cornerSide === 'right') {
        sideBackrest.position.set(
          baseWidth/2 + extensionWidth - 0.075,
          legHeight + baseHeight + backHeight/2,
          -baseDepth/2 + (baseDepth - armWidth)/2
        );
      } else {
        sideBackrest.position.set(
          -baseWidth/2 - extensionWidth + 0.075,
          legHeight + baseHeight + backHeight/2,
          -baseDepth/2 + (baseDepth - armWidth)/2
        );
      }
      
      sofaGroup.add(sideBackrest);
      
      // Side cushion
      const sideBackCushionGeometry = new THREE.BoxGeometry(0.18, backHeight - 0.15, baseDepth - armWidth - 0.1);
      const sideBackCushion = new THREE.Mesh(sideBackCushionGeometry, fabricMaterial);
      
      if (cornerSide === 'right') {
        sideBackCushion.position.set(
          baseWidth/2 + extensionWidth - 0.1,
          legHeight + baseHeight + backHeight/2,
          -baseDepth/2 + (baseDepth - armWidth)/2
        );
      } else {
        sideBackCushion.position.set(
          -baseWidth/2 - extensionWidth + 0.1,
          legHeight + baseHeight + backHeight/2,
          -baseDepth/2 + (baseDepth - armWidth)/2
        );
      }
      
      sofaGroup.add(sideBackCushion);
    }
  }
  
  // Final position and rotation
  sofaGroup.position.set(position.x, position.y, position.z);
  sofaGroup.rotation.y = rotation;
  
  // Add to scene
  scene.add(sofaGroup);
  
  return sofaGroup;
}