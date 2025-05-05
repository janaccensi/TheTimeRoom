import { ActivityModal } from '@/components/ActivityModal';
import * as THREE from 'three';

export function createComputer(scene, options = {}) {
  let {
    position = { x: 0, y: 0, z: 0 },
    type = 'gaming', // laptop, desktop, gaming
    isOn = true,
    rotation = 0, // Rotación en el eje Y
    screenColor = 0x0066cc, // Color de la pantalla cuando está encendida
    hasRGB = true // Iluminación RGB para configuración gaming
  } = options;
  
  const computerGroup = new THREE.Group();
  
  // NUEVA FUNCIÓN: Hacer que todas las partes sean interactivas
  function setInteractiveProperties(object) {
    if (object.isMesh) {
      // Hacer que cada mesh SÍ sea interactivo, con el mismo tipo
      object.userData = {
        type: 'computer',          // Todos los meshes tienen el mismo tipo
        isInteractive: true,       // Todos son interactivos
        title: 'Estudis',
        activityType: 'study',
        description: 'Un ordinador potent',
        action: 'toggleComputer',   // Acción para encender/apagar,        
        onClick: (object) => {
            
          const activityModal = new ActivityModal();            
          activityModal.show(object);          
        }

      };
    }
  }

  if (type === 'desktop' || type === 'gaming') {
    // MONITOR
    const monitorGroup = new THREE.Group();
    
    // Marco del monitor
    const monitorWidth = 0.9;
    const monitorHeight = 0.5;
    const monitorDepth = 0.05;
    
    const monitorMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.2,
      metalness: 0.8
    });
    
    // Material de la pantalla (screenMaterial):
    const screenMaterial = new THREE.MeshStandardMaterial({
        color: isOn ? screenColor : 0x111111,
        roughness: 0.1,
        metalness: 0.5,
        emissive: isOn ? screenColor : 0x000000,
        emissiveIntensity: isOn ? 0.4 : 0
    });
    
    // Marco del monitor con bordes redondeados
    const monitorGeometry = new THREE.BoxGeometry(monitorWidth, monitorHeight, monitorDepth);
    const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
    setInteractiveProperties(monitor); // MODIFICADO: Ahora es interactivo
    
    // Pantalla (ligeramente más pequeña que el marco)
    const screenMargin = 0.03;
    const screenWidth = monitorWidth - screenMargin * 2;
    const screenHeight = monitorHeight - screenMargin * 2;
    
    const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight);
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = monitorDepth / 2 + 0.001;
    setInteractiveProperties(screen); // MODIFICADO: Ahora es interactivo
    monitor.add(screen);
    
    // Logo en la parte inferior (como un fabricante)
    const logoGeometry = new THREE.PlaneGeometry(0.1, 0.02);
    const logoMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.3,
      metalness: 0.8
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.y = -monitorHeight/2 + 0.02;
    logo.position.z = monitorDepth/2 + 0.001;
    setInteractiveProperties(logo); // MODIFICADO: Ahora es interactivo
    monitor.add(logo);
    
    // Soporte del monitor (más estilizado)
    const standBaseMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.3,
      metalness: 0.7
    });
    
    // Base del soporte
    const baseWidth = 0.4;
    const baseGeometry = new THREE.BoxGeometry(baseWidth, 0.02, 0.25);
    baseGeometry.translate(0, -0.01, 0); // Centrar en el origen
    const base = new THREE.Mesh(baseGeometry, standBaseMaterial);
    setInteractiveProperties(base); // MODIFICADO: Ahora es interactivo
    
    // Pata principal
    const neckGeometry = new THREE.BoxGeometry(0.05, 0.4, 0.05);
    neckGeometry.translate(0, 0.2, 0); // Centrar en el origen
    const neck = new THREE.Mesh(neckGeometry, standBaseMaterial);
    setInteractiveProperties(neck); // MODIFICADO: Ahora es interactivo
    base.add(neck);
    
    // Conector con el monitor
    const connectorGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.05);
    const connector = new THREE.Mesh(connectorGeometry, standBaseMaterial);
    connector.position.y = 0.4;
    setInteractiveProperties(connector); // MODIFICADO: Ahora es interactivo
    neck.add(connector);
    
    // Añadir monitor al conector
    monitor.position.y = 0.05;
    connector.add(monitor);
    
    // PC - TORRE DE ORDENADOR
    const pcGroup = new THREE.Group();
    
    // Material para la carcasa
    let caseMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.3,
      metalness: 0.8
    });
    
    if (type === 'gaming') {
      // Gabinete gaming más estilizado
      const caseWidth = 0.3;
      const caseHeight = 0.5;
      const caseDepth = 0.45;
      
      const caseGeometry = new THREE.BoxGeometry(caseWidth, caseHeight, caseDepth);
      const pcCase = new THREE.Mesh(caseGeometry, caseMaterial);
      setInteractiveProperties(pcCase); // MODIFICADO: Ahora es interactivo
      
      // Panel frontal con detalles
      const frontPanelGeometry = new THREE.PlaneGeometry(caseWidth - 0.01, caseHeight - 0.01);
      const frontPanelMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.2,
        metalness: 0.9
      });
      const frontPanel = new THREE.Mesh(frontPanelGeometry, frontPanelMaterial);
      frontPanel.position.z = caseDepth/2 + 0.001;
      setInteractiveProperties(frontPanel); // MODIFICADO: Ahora es interactivo
      pcCase.add(frontPanel);
      
      // Luces RGB (si están habilitadas)
      if (hasRGB) {
        // Franja de luz RGB
        const rgbGeometry = new THREE.PlaneGeometry(0.01, caseHeight - 0.05);
        const rgbMaterial = new THREE.MeshStandardMaterial({
          color: 0xff00ff,
          emissive: 0xff00ff,
          emissiveIntensity: 1.0,
          transparent: true,
          opacity: 0.9
        });
        
        const rgbStrip = new THREE.Mesh(rgbGeometry, rgbMaterial);
        rgbStrip.position.x = -(caseWidth/2) + 0.03;
        rgbStrip.position.z = caseDepth/2 + 0.002;
        setInteractiveProperties(rgbStrip); // MODIFICADO: Ahora es interactivo
        pcCase.add(rgbStrip);
        
        // Ventiladores con luz
        const fanSize = 0.08;
        const fanGeometry = new THREE.CircleGeometry(fanSize, 16);
        const fanMaterial = new THREE.MeshStandardMaterial({
          color: 0x333333,
          transparent: true,
          opacity: 0.7
        });
        
        // Añadir varios ventiladores
        for (let i = 0; i < 2; i++) {
          const fan = new THREE.Mesh(fanGeometry, fanMaterial);
          fan.position.z = caseDepth/2 + 0.002;
          fan.position.y = 0.1 - i * 0.25;
          fan.position.x = 0.05;
          setInteractiveProperties(fan); // MODIFICADO: Ahora es interactivo
          
          // Aspas del ventilador (simplificadas)
          const fanCenter = new THREE.Mesh(
            new THREE.CircleGeometry(fanSize * 0.2, 16),
            new THREE.MeshStandardMaterial({
              color: 0x222222,
              roughness: 0.5
            })
          );
          fanCenter.position.z = 0.001;
          setInteractiveProperties(fanCenter); // MODIFICADO: Ahora es interactivo
          fan.add(fanCenter);
          
          // Luz RGB alrededor del ventilador
          const fanRimGeometry = new THREE.RingGeometry(fanSize - 0.01, fanSize, 32);
          const fanRimMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
          });
          const fanRim = new THREE.Mesh(fanRimGeometry, fanRimMaterial);
          fanRim.position.z = 0.002;
          setInteractiveProperties(fanRim); // MODIFICADO: Ahora es interactivo
          fan.add(fanRim);
          
          pcCase.add(fan);
        }
      }
      
      // Botón de encendido
      const powerButtonGeometry = new THREE.CircleGeometry(0.015, 16);
      const powerButtonMaterial = new THREE.MeshStandardMaterial({
        color: 0x33ff33,
        emissive: isOn ? 0x33ff33 : 0x333333,
        emissiveIntensity: isOn ? 0.8 : 0.0
      });
      const powerButton = new THREE.Mesh(powerButtonGeometry, powerButtonMaterial);
      powerButton.position.z = caseDepth/2 + 0.002;
      powerButton.position.y = caseHeight/2 - 0.05;
      powerButton.position.x = caseWidth/2 - 0.05;
      setInteractiveProperties(powerButton); // MODIFICADO: Ahora es interactivo
      pcCase.add(powerButton);
      
      pcGroup.add(pcCase);
    } else {
      // PC de oficina más convencional
      const caseWidth = 0.2;
      const caseHeight = 0.4;
      const caseDepth = 0.4;
      
      const caseGeometry = new THREE.BoxGeometry(caseWidth, caseHeight, caseDepth);
      const pcCase = new THREE.Mesh(caseGeometry, caseMaterial);
      setInteractiveProperties(pcCase); // MODIFICADO: Ahora es interactivo
      
      // Detalles frontales (ranura DVD, etc.)
      const dvdDriveGeometry = new THREE.BoxGeometry(caseWidth - 0.02, 0.02, 0.01);
      const dvdDriveMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.5
      });
      const dvdDrive = new THREE.Mesh(dvdDriveGeometry, dvdDriveMaterial);
      dvdDrive.position.z = caseDepth/2 + 0.002;
      dvdDrive.position.y = caseHeight/2 - 0.05;
      setInteractiveProperties(dvdDrive); // MODIFICADO: Ahora es interactivo
      pcCase.add(dvdDrive);
      
      // Botón de encendido
      const powerButtonGeometry = new THREE.CircleGeometry(0.01, 16);
      const powerButtonMaterial = new THREE.MeshStandardMaterial({
        color: 0x33ff33,
        emissive: isOn ? 0x33ff33 : 0x333333,
        emissiveIntensity: isOn ? 0.8 : 0.0
      });
      const powerButton = new THREE.Mesh(powerButtonGeometry, powerButtonMaterial);
      powerButton.position.z = caseDepth/2 + 0.002;
      powerButton.position.y = caseHeight/2 - 0.1;
      setInteractiveProperties(powerButton); // MODIFICADO: Ahora es interactivo
      pcCase.add(powerButton);
      
      pcGroup.add(pcCase);
    }
    
    // TECLADO
    const keyboardGroup = new THREE.Group();
    
    const keyboardWidth = 0.4;
    const keyboardHeight = 0.02;
    const keyboardDepth = 0.15;
    
    const keyboardGeometry = new THREE.BoxGeometry(keyboardWidth, keyboardHeight, keyboardDepth);
    const keyboardMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.4
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    setInteractiveProperties(keyboard); // MODIFICADO: Ahora es interactivo
    
    // Teclas
    const keySize = 0.02;
    const keyGap = 0.005;
    const keysPerRow = 15;
    const keyRows = 5;
    
    const keyGeometry = new THREE.BoxGeometry(keySize, 0.004, keySize);
    const keyMaterial = new THREE.MeshStandardMaterial({
      color: type === 'gaming' && hasRGB ? 0xaaccff : 0xbbbbbb,
      roughness: 0.6,
      emissive: type === 'gaming' && hasRGB ? 0xaaccff : 0x000000,
      emissiveIntensity: type === 'gaming' && hasRGB ? 0.5 : 0
    });
    
    for (let row = 0; row < keyRows; row++) {
      for (let col = 0; col < keysPerRow; col++) {
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        key.position.x = (col - keysPerRow/2 + 0.5) * (keySize + keyGap);
        key.position.z = (row - keyRows/2 + 0.5) * (keySize + keyGap);
        key.position.y = keyboardHeight/2 + 0.002;
        setInteractiveProperties(key); // MODIFICADO: Ahora es interactivo
        keyboard.add(key);
      }
    }
    
    keyboardGroup.add(keyboard);
    
    // RATÓN
    const mouseGroup = new THREE.Group();
    
    const mouseMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.4
    });
    
    // Cuerpo del ratón con forma más ergonómica
    const mouseGeometry = new THREE.BoxGeometry(0.06, 0.03, 0.1);
    mouseGeometry.translate(0, 0.015, 0);
    const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
    setInteractiveProperties(mouse); // MODIFICADO: Ahora es interactivo
    
    // Rueda del ratón
    const wheelGeometry = new THREE.CylinderGeometry(0.006, 0.006, 0.02, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.2
    });
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.rotation.x = Math.PI/2;
    wheel.position.y = 0.03;
    wheel.position.z = -0.01;
    setInteractiveProperties(wheel); // MODIFICADO: Ahora es interactivo
    mouse.add(wheel);
    
    if (type === 'gaming' && hasRGB) {
      // Luz RGB para ratón gaming
      const mouseLight = new THREE.Mesh(
        new THREE.PlaneGeometry(0.05, 0.02),
        new THREE.MeshStandardMaterial({
          color: 0xff00ff,
          emissive: 0xff00ff,
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.8
        })
      );
      mouseLight.position.y = 0.016;
      mouseLight.position.z = -0.04;
      mouseLight.rotation.x = -Math.PI/2;
      setInteractiveProperties(mouseLight); // MODIFICADO: Ahora es interactivo
      mouse.add(mouseLight);
    }
    
    mouseGroup.add(mouse);
    
    // Posicionar todos los componentes
    monitorGroup.position.set(0, 0.25, 0);
    computerGroup.add(monitorGroup);
    computerGroup.add(base);
    
    pcGroup.position.set(0.7, 0.25, 0.1);
    computerGroup.add(pcGroup);
    
    keyboardGroup.position.set(0, 0.01, 0.3);
    computerGroup.add(keyboardGroup);
    
    mouseGroup.position.set(0.3, 0.01, 0.3);
    computerGroup.add(mouseGroup);
  }
  
  // NUEVO: Marcar el grupo como un grupo interactivo especial
  computerGroup.userData = {
    isInteractiveGroup: true,
    type: 'computer'
  };
  
  // Posicionamiento global y rotación
  computerGroup.position.set(position.x, position.y, position.z);
  computerGroup.rotation.y = rotation;
  
  // Añadir a la escena
  scene.add(computerGroup);
  
  // Toggle para encender/apagar
  const toggle = () => {
    isOn = !isOn;
    
    // Actualizar materiales según el estado
    computerGroup.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material.emissive) {
        if (child.material.color.getHex() === 0x33ff33) {  // Botón de encendido
          child.material.emissive.set(isOn ? 0x33ff33 : 0x333333);
          child.material.emissiveIntensity = isOn ? 0.8 : 0.0;
        } else if (child.material.color.getHex() === screenColor) {  // Pantalla
          child.material.emissive.set(isOn ? screenColor : 0x000000);
          child.material.emissiveIntensity = isOn ? 0.4 : 0;
        }
      }
    });
  };
  
  return {
    computerGroup,
    toggle
  };
}