import * as THREE from 'three';

export function createChair(scene, options = {}) {
  const {
    position = { x: 0, y: 0, z: 0 },
    color = 0x333333,
    accentColor = 0xffffff, // Color for accent/trim parts
    type = 'gaming', // office, wooden, modern, gaming
    rotation = 0
  } = options;
  
  const chairGroup = new THREE.Group();
  
  // Determinar materiales según el tipo
  let seatMaterial, legMaterial, backrestMaterial, accentMaterial;
  
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
    // Material principal
    seatMaterial = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.5,
      metalness: 0.2
    });
    
    // Material para la base y detalles metálicos
    legMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.2,
      metalness: 0.8
    });
    
    backrestMaterial = seatMaterial;
    
    // Material para los acentos/costuras
    accentMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.5
    });
    
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
    
  } else if (type === 'gaming') {
    // Material principal (cuero sintético)
    seatMaterial = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.4,
      metalness: 0.1
    });
    
    // Material para acentos/costuras
    accentMaterial = new THREE.MeshStandardMaterial({
      color: accentColor,
      roughness: 0.3,
      metalness: 0.2
    });
    
    // Material para la base y partes metálicas
    legMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.2,
      metalness: 0.8
    });
    
    backrestMaterial = seatMaterial;
  }
  
  if (type === 'gaming') {
    // --- BASE ---
    // Base central (pistón hidráulico)
    const baseCylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.4, 8),
      legMaterial
    );
    baseCylinder.position.y = 0.2;
    chairGroup.add(baseCylinder);
    
    // Cubierta decorativa del pistón
    const pistonCover = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 0.05, 8),
      legMaterial
    );
    pistonCover.position.y = 0.38;
    chairGroup.add(pistonCover);
    
    // Base en estrella
    const starBase = new THREE.Group();
    
    // Centro de la base
    const baseHub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.03, 16),
      legMaterial
    );
    baseHub.position.y = 0.015;
    starBase.add(baseHub);
    
    // Brazos de la base (5 puntas)
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      
      // Brazo principal
      const arm = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.03, 0.28),
        legMaterial
      );
      arm.position.x = Math.sin(angle) * 0.14;
      arm.position.z = Math.cos(angle) * 0.14;
      arm.position.y = 0.015;
      arm.rotation.y = angle;
      starBase.add(arm);
      
      // Soporte de la rueda
      const wheelSupport = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.06, 8),
        legMaterial
      );
      wheelSupport.rotation.x = Math.PI / 2;
      wheelSupport.position.x = Math.sin(angle) * 0.28;
      wheelSupport.position.z = Math.cos(angle) * 0.28;
      wheelSupport.position.y = 0.02;
      starBase.add(wheelSupport);
      
      // Rueda
      const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, 0.02, 16),
        new THREE.MeshStandardMaterial({
          color: 0x333333,
          roughness: 0.7,
          metalness: 0.3
        })
      );
      wheel.rotation.x = Math.PI / 2;
      wheel.position.x = Math.sin(angle) * 0.28;
      wheel.position.z = Math.cos(angle) * 0.28;
      wheel.position.y = -0.005;
      starBase.add(wheel);
    }
    chairGroup.add(starBase);
    
    // --- ASIENTO ---
    // Base del asiento
    const seatBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.08, 0.48),
      seatMaterial
    );
    seatBase.position.y = 0.45;
    chairGroup.add(seatBase);
    
    // Cojín principal del asiento
    const seatCushion = new THREE.Mesh(
      new THREE.BoxGeometry(0.44, 0.06, 0.44),
      seatMaterial
    );
    seatCushion.position.y = 0.52;
    chairGroup.add(seatCushion);
    
    // Elevación frontal del asiento
    const seatFront = new THREE.Mesh(
      new THREE.BoxGeometry(0.44, 0.03, 0.06),
      seatMaterial
    );
    seatFront.position.y = 0.51;
    seatFront.position.z = 0.22;
    chairGroup.add(seatFront);
    
    // Costuras decorativas del asiento (horizontales)
    for (let i = -1; i <= 1; i += 2) {
      const seatStitch = new THREE.Mesh(
        new THREE.BoxGeometry(0.44, 0.01, 0.05),
        accentMaterial
      );
      seatStitch.position.y = 0.55;
      seatStitch.position.z = i * 0.1;
      chairGroup.add(seatStitch);
    }
    
    // Bolstering lateral (soporte lateral del asiento)
    const leftBolster = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.1, 0.44),
      seatMaterial
    );
    leftBolster.position.x = -0.22;
    leftBolster.position.y = 0.52;
    chairGroup.add(leftBolster);
    
    const rightBolster = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.1, 0.44),
      seatMaterial
    );
    rightBolster.position.x = 0.22;
    rightBolster.position.y = 0.52;
    chairGroup.add(rightBolster);
    
    // --- RESPALDO ---
    // Parte baja del respaldo (unión con asiento)
    const backJoint = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.08, 0.06),
      seatMaterial
    );
    backJoint.position.y = 0.47;
    backJoint.position.z = -0.22;
    chairGroup.add(backJoint);
    
    // Respaldo principal
    const backMain = new THREE.Mesh(
      new THREE.BoxGeometry(0.44, 0.7, 0.08),
      backrestMaterial
    );
    backMain.position.y = 0.85;
    backMain.position.z = -0.22;
    chairGroup.add(backMain);
    
    // Soporte lumbar
    const lumbarSupport = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.15, 0.03),
      seatMaterial
    );
    lumbarSupport.position.y = 0.65;
    lumbarSupport.position.z = -0.18;
    chairGroup.add(lumbarSupport);
    
    // Acentos laterales del respaldo (estilo racing)
    const leftSideBolster = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.6, 0.12),
      seatMaterial
    );
    leftSideBolster.position.x = -0.2;
    leftSideBolster.position.y = 0.85;
    leftSideBolster.position.z = -0.22;
    chairGroup.add(leftSideBolster);
    
    const rightSideBolster = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.6, 0.12),
      seatMaterial
    );
    rightSideBolster.position.x = 0.2;
    rightSideBolster.position.y = 0.85;
    rightSideBolster.position.z = -0.22;
    chairGroup.add(rightSideBolster);
    
    // Reposacabezas
    const headrest = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.18, 0.12),
      seatMaterial
    );
    headrest.position.y = 1.24;
    headrest.position.z = -0.22;
    chairGroup.add(headrest);
    
    // Orificios del respaldo (típicos de sillas gaming)
    const upperHole = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.18, 0.02),
      new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.8,
        metalness: 0.1
      })
    );
    upperHole.position.y = 0.98;
    upperHole.position.z = -0.17;
    chairGroup.add(upperHole);
    
    const lowerHole = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.18, 0.02),
      new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.8,
        metalness: 0.1
      })
    );
    lowerHole.position.y = 0.7;
    lowerHole.position.z = -0.17;
    chairGroup.add(lowerHole);
    
    // Costuras verticales del respaldo
    for (let i = -1; i <= 1; i += 2) {
      const backStitch = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.7, 0.01),
        accentMaterial
      );
      backStitch.position.x = i * 0.15;
      backStitch.position.y = 0.85;
      backStitch.position.z = -0.17;
      chairGroup.add(backStitch);
    }
    
    // Acentos de color (bordes)
    // Costura horizontal superior del respaldo
    const upperSeam = new THREE.Mesh(
      new THREE.BoxGeometry(0.44, 0.02, 0.01),
      accentMaterial
    );
    upperSeam.position.y = 1.15;
    upperSeam.position.z = -0.17;
    chairGroup.add(upperSeam);
    
    // Costura en forma de V del asiento
    const vSeamLeft = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 0.25, 0.01),
      accentMaterial
    );
    vSeamLeft.position.x = -0.1;
    vSeamLeft.position.y = 0.85;
    vSeamLeft.position.z = -0.17;
    vSeamLeft.rotation.z = 0.2;
    chairGroup.add(vSeamLeft);
    
    const vSeamRight = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 0.25, 0.01),
      accentMaterial
    );
    vSeamRight.position.x = 0.1;
    vSeamRight.position.y = 0.85;
    vSeamRight.position.z = -0.17;
    vSeamRight.rotation.z = -0.2;
    chairGroup.add(vSeamRight);
    
    // --- REPOSABRAZOS ---
    // Soporte vertical izquierdo
    const leftArmSupport = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.15, 0.06),
      legMaterial
    );
    leftArmSupport.position.x = -0.25;
    leftArmSupport.position.y = 0.52;
    leftArmSupport.position.z = 0;
    chairGroup.add(leftArmSupport);
    
    // Reposabrazos izquierdo
    const leftArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.04, 0.3),
      legMaterial
    );
    leftArm.position.x = -0.25;
    leftArm.position.y = 0.61;
    leftArm.position.z = -0.05;
    chairGroup.add(leftArm);
    
    // Parte acolchada del reposabrazos izquierdo
    const leftArmPad = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.02, 0.2),
      seatMaterial
    );
    leftArmPad.position.x = -0.25;
    leftArmPad.position.y = 0.64;
    leftArmPad.position.z = -0.05;
    chairGroup.add(leftArmPad);
    
    // Soporte vertical derecho
    const rightArmSupport = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.15, 0.06),
      legMaterial
    );
    rightArmSupport.position.x = 0.25;
    rightArmSupport.position.y = 0.52;
    rightArmSupport.position.z = 0;
    chairGroup.add(rightArmSupport);
    
    // Reposabrazos derecho
    const rightArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.04, 0.3),
      legMaterial
    );
    rightArm.position.x = 0.25;
    rightArm.position.y = 0.61;
    rightArm.position.z = -0.05;
    chairGroup.add(rightArm);
    
    // Parte acolchada del reposabrazos derecho
    const rightArmPad = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.02, 0.2),
      seatMaterial
    );
    rightArmPad.position.x = 0.25;
    rightArmPad.position.y = 0.64;
    rightArmPad.position.z = -0.05;
    chairGroup.add(rightArmPad);
    
    // Botón ajuste de altura (decorativo)
    const heightButton = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.01, 0.04),
      accentMaterial
    );
    heightButton.position.x = 0.25;
    heightButton.position.y = 0.52;
    heightButton.position.z = 0.08;
    chairGroup.add(heightButton);
    
  } else if (type === 'office') {
    // ... código existente para sillas de oficina
  } else if (type === 'wooden' || type === 'modern') {
    // ... código existente para sillas de madera o modernas
  }
  
  // Posicionamiento final y rotación
  chairGroup.position.set(position.x, position.y, position.z);
  chairGroup.rotation.y = rotation;
  
  // Añadir a la escena
  scene.add(chairGroup);
  
  return chairGroup;
}