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
  
  // Base del micrófono
  const baseGeometry = new THREE.CylinderGeometry(0.1, 0.12, 0.03, 32);
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = 0.015;
  baseGroup.add(base);
  
  // Detalles decorativos en la base
  const ringGeometry = new THREE.TorusGeometry(0.11, 0.01, 16, 32);
  const ring = new THREE.Mesh(ringGeometry, accentMaterial);
  ring.position.y = 0.025;
  ring.rotation.x = Math.PI / 2;
  baseGroup.add(ring);
  
  // Grupo del primer brazo
  const arm1Group = new THREE.Group();
  baseGroup.add(arm1Group);
  
  // Primer segmento del brazo (vertical)
  const arm1Geometry = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 16);
  const arm1 = new THREE.Mesh(arm1Geometry, barMaterial);
  arm1.position.y = 0.17;
  arm1Group.add(arm1);
  
  // Articulación 1 - punto de conexión entre brazo 1 y brazo 2
  const joint1Geometry = new THREE.SphereGeometry(0.025, 16, 16);
  const joint1 = new THREE.Mesh(joint1Geometry, jointMaterial);
  joint1.position.y = 0.33; // Extremo del brazo 1
  arm1Group.add(joint1);
  
  // Grupo del segundo brazo - conectado directamente al final del brazo 1
  const arm2Group = new THREE.Group();
  arm2Group.position.y = 0.33; // Misma posición que joint1
  arm1Group.add(arm2Group);
  
  // Segundo segmento del brazo
  const arm2Length = 0.35;
  const arm2Geometry = new THREE.CylinderGeometry(0.012, 0.012, arm2Length, 16);
  const arm2 = new THREE.Mesh(arm2Geometry, barMaterial);
  arm2.position.y = arm2Length/2; // Centrado en su propio eje
  arm2Group.add(arm2);
  
  // Aplicamos rotaciones al grupo del brazo 2
  arm2Group.rotation.y = Math.PI/4;   // Rotación en Y
  arm2Group.rotation.z = -Math.PI/2;  // Rotación en Z para posicionar horizontalmente
  
  // Articulación 2 - punto de conexión entre brazo 2 y brazo 3
  // Debe estar posicionada al final del brazo 2
  const joint2Geometry = new THREE.SphereGeometry(0.022, 16, 16);
  const joint2 = new THREE.Mesh(joint2Geometry, jointMaterial);
  joint2.position.y = arm2Length; // Al final del brazo 2
  arm2Group.add(joint2);
  
  // Grupo del tercer brazo - conectado directamente al final del brazo 2
  const arm3Group = new THREE.Group();
  arm3Group.position.y = arm2Length; // Misma posición que joint2, al final del brazo 2
  arm2Group.add(arm3Group);
  
  // Tercer segmento del brazo
  const arm3Length = 0.22; // Longitud del tercer brazo
  const arm3Geometry = new THREE.CylinderGeometry(0.01, 0.01, arm3Length, 16);
  const arm3 = new THREE.Mesh(arm3Geometry, barMaterial);
  arm3.position.y = arm3Length/2; // Centrado en su propio eje
  arm3Group.add(arm3);
  
  // Aplicamos rotaciones al grupo del brazo 3
  // Usando ángulos específicos para apuntar hacia arriba y a la derecha
  arm3Group.rotation.z = Math.PI/4; // Rotación para apuntar hacia arriba (45 grados)
  arm3Group.rotation.x = -Math.PI/6; // Ligera rotación en X para efecto 3D
  
  // Articulación 3 - punto de conexión entre brazo 3 y micrófono
  const joint3Geometry = new THREE.SphereGeometry(0.02, 16, 16);
  const joint3 = new THREE.Mesh(joint3Geometry, jointMaterial);
  joint3.position.y = arm3Length; // Al final del brazo 3
  arm3Group.add(joint3);
  
  // Grupo del micrófono - conectado directamente al final del brazo 3
  const micHeadGroup = new THREE.Group();
  micHeadGroup.position.y = arm3Length; // Misma posición que joint3, al final del brazo 3
  arm3Group.add(micHeadGroup);
  
  // Cuerpo del micrófono
  const micBodyGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.12, 32);
  const micBody = new THREE.Mesh(micBodyGeometry, micHeadMaterial);
  micBody.rotation.z = Math.PI/2; // Orientación horizontal
  micBody.position.x = 0.06; // Desplazamiento desde la articulación
  micHeadGroup.add(micBody);
  
  // Cabezal del micrófono
  const micHeadGeometry = new THREE.SphereGeometry(0.04, 32, 32);
  const micHead = new THREE.Mesh(micHeadGeometry, micHeadMaterial);
  micHead.position.x = 0.14; // Posición relativa al grupo
  micHeadGroup.add(micHead);
  
  // Rejilla del micrófono
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
  micHeadGroup.add(grill);
  
  // Luz LED indicadora
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
  micHeadGroup.add(led);

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