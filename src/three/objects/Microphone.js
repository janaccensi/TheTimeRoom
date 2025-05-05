import * as THREE from 'three';

export function createMicrophone(scene, options = {}) {
  // Opciones por defecto
  const {
    position = { x: 0, y: 0, z: 0 },
    baseColor = 0x111111,
    accentColor = 0xff0000,
    barColor = 0x222222,
    micColor = 0x000000,
    isOn = true
  } = options;
  
  // Grupo para contener todas las partes del micrófono
  const microphoneGroup = new THREE.Group();
  
  // MODIFICADO: Función para hacer que los componentes NO sean interactivos
  function setNonInteractive(object) {
    if (object.isMesh) {
      object.userData = {
        isInteractive: false
      };
    }
  }
  
  // NUEVA FUNCIÓN: Solo para hacer el cabezal interactivo
  function setMicHeadInteractive(object) {
    if (object.isMesh) {
      object.userData = {
        isInteractive: false,
        title: 'Micròfon',
        description: 'Un micròfon professional',
        action: 'toggleMicrophone'
      };
    }
  }
  
  // Materiales
  const baseMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor, 
    roughness: 0.3,
    metalness: 0.7 
  });
  
  const accentMaterial = new THREE.MeshStandardMaterial({ 
    color: accentColor, 
    emissive: isOn ? accentColor : 0x000000,
    emissiveIntensity: isOn ? 0.5 : 0
  });
  
  const barMaterial = new THREE.MeshStandardMaterial({ 
    color: barColor, 
    roughness: 0.4, 
    metalness: 0.6 
  });
  
  const micHeadMaterial = new THREE.MeshStandardMaterial({ 
    color: micColor,
    roughness: 0.1,
    metalness: 0.9
  });
  
  const jointMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x333333, 
    roughness: 0.2, 
    metalness: 0.8 
  });
  
  // Grupo de la base
  const baseGroup = new THREE.Group();
  microphoneGroup.add(baseGroup);
  
  // Base del micrófono - NO INTERACTIVA
  const baseGeometry = new THREE.CylinderGeometry(0.1, 0.12, 0.03, 32);
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = 0.015;
  setNonInteractive(base);
  baseGroup.add(base);
  
  // Detalles decorativos en la base - NO INTERACTIVOS
  const ringGeometry = new THREE.TorusGeometry(0.11, 0.01, 16, 32);
  const ring = new THREE.Mesh(ringGeometry, accentMaterial);
  ring.position.y = 0.025;
  ring.rotation.x = Math.PI / 2;
  setNonInteractive(ring);
  baseGroup.add(ring);
  
  // Grupo del primer brazo
  const arm1Group = new THREE.Group();
  baseGroup.add(arm1Group);
  
  // Primer segmento del brazo (vertical) - NO INTERACTIVO
  const arm1Geometry = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 16);
  const arm1 = new THREE.Mesh(arm1Geometry, barMaterial);
  arm1.position.y = 0.17;
  setNonInteractive(arm1);
  arm1Group.add(arm1);
  
  // Articulación 1 - NO INTERACTIVA
  const joint1Geometry = new THREE.SphereGeometry(0.025, 16, 16);
  const joint1 = new THREE.Mesh(joint1Geometry, jointMaterial);
  joint1.position.y = 0.33;
  setNonInteractive(joint1);
  arm1Group.add(joint1);
  
  // Grupo del segundo brazo
  const arm2Group = new THREE.Group();
  arm2Group.position.y = 0.33;
  arm1Group.add(arm2Group);
  
  // Segundo segmento del brazo - NO INTERACTIVO
  const arm2Length = 0.35;
  const arm2Geometry = new THREE.CylinderGeometry(0.012, 0.012, arm2Length, 16);
  const arm2 = new THREE.Mesh(arm2Geometry, barMaterial);
  arm2.position.y = arm2Length/2;
  setNonInteractive(arm2);
  arm2Group.add(arm2);
  
  // Aplicar rotaciones al brazo 2
  arm2Group.rotation.y = Math.PI/4;
  arm2Group.rotation.z = -Math.PI/2;
  
  // Articulación 2 - NO INTERACTIVA
  const joint2Geometry = new THREE.SphereGeometry(0.022, 16, 16);
  const joint2 = new THREE.Mesh(joint2Geometry, jointMaterial);
  joint2.position.y = arm2Length;
  setNonInteractive(joint2);
  arm2Group.add(joint2);
  
  // Grupo del tercer brazo
  const arm3Group = new THREE.Group();
  arm3Group.position.y = arm2Length;
  arm2Group.add(arm3Group);
  
  // Tercer segmento del brazo - NO INTERACTIVO
  const arm3Length = 0.22;
  const arm3Geometry = new THREE.CylinderGeometry(0.01, 0.01, arm3Length, 16);
  const arm3 = new THREE.Mesh(arm3Geometry, barMaterial);
  arm3.position.y = arm3Length/2;
  setNonInteractive(arm3);
  arm3Group.add(arm3);
  
  // Aplicar rotaciones al brazo 3
  arm3Group.rotation.z = Math.PI/4;
  arm3Group.rotation.x = Math.PI/6;
  
  // Articulación 3 - NO INTERACTIVA
  const joint3Geometry = new THREE.SphereGeometry(0.02, 16, 16);
  const joint3 = new THREE.Mesh(joint3Geometry, jointMaterial);
  joint3.position.y = arm3Length;
  setNonInteractive(joint3);
  arm3Group.add(joint3);
  
  // Grupo del micrófono
  const micHeadGroup = new THREE.Group();
  micHeadGroup.position.y = arm3Length;
  arm3Group.add(micHeadGroup);
  
  // Cuerpo del micrófono - NO INTERACTIVO
  const micBodyGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.12, 32);
  const micBody = new THREE.Mesh(micBodyGeometry, micHeadMaterial);
  micBody.rotation.z = Math.PI/2;
  micBody.position.x = 0.06;
  setNonInteractive(micBody);
  micHeadGroup.add(micBody);
  
  // Cabezal del micrófono - ESTE SÍ ES INTERACTIVO
  const micHeadGeometry = new THREE.SphereGeometry(0.04, 32, 32);
  const micHead = new THREE.Mesh(micHeadGeometry, micHeadMaterial);
  micHead.position.x = 0.14;
  // Hacemos SOLO el cabezal interactivo
  setMicHeadInteractive(micHead);
  micHeadGroup.add(micHead);
  
  // Rejilla del micrófono - NO INTERACTIVA
  const grillGeometry = new THREE.CylinderGeometry(0.035, 0.035, 0.01, 32);
  const grillMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x444444, 
    roughness: 0.6, 
    metalness: 0.4,
    wireframe: true 
  });
  const grill = new THREE.Mesh(grillGeometry, grillMaterial);
  grill.rotation.z = Math.PI/2;
  grill.position.x = 0.16;
  setNonInteractive(grill);
  micHeadGroup.add(grill);
  
  // Luz LED indicadora - NO INTERACTIVA
  const ledGeometry = new THREE.CircleGeometry(0.01, 16);
  const ledMaterial = new THREE.MeshBasicMaterial({ 
    color: isOn ? 0x00ff00 : 0x003300, 
    emissive: isOn ? 0x00ff00 : 0x000000,
    emissiveIntensity: isOn ? 1 : 0
  });
  const led = new THREE.Mesh(ledGeometry, ledMaterial);
  led.position.y = 0.04;
  led.position.x = 0.06;
  led.rotation.y = Math.PI / 2;
  setNonInteractive(led);
  micHeadGroup.add(led);

  // Marcar el grupo como un grupo interactivo especial
  microphoneGroup.userData = {
    isInteractiveGroup: false
  };

  // Posicionar el micrófono completo
  microphoneGroup.position.set(position.x, position.y, position.z);
  
  // Añadir a la escena
  scene.add(microphoneGroup);
  
  // Método para encender/apagar el micrófono
  const togglePower = () => {
    options.isOn = !options.isOn;
    accentMaterial.emissive.set(options.isOn ? accentColor : 0x000000);
    accentMaterial.emissiveIntensity = options.isOn ? 0.5 : 0;
    ledMaterial.color.set(options.isOn ? 0x00ff00 : 0x003300);
    ledMaterial.emissive.set(options.isOn ? 0x00ff00 : 0x000000);
    ledMaterial.emissiveIntensity = options.isOn ? 1 : 0;
  };
  
  return {
    microphoneGroup,
    togglePower
  };
}