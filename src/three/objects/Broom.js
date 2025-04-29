import * as THREE from 'three';

export const createBroom = (scene, config = {}) => {
    // Configuración con valores por defecto
    const {
        position = { x: 0, y: 0, z: 0 },
        handleColor = 0xc4a484,    // Marrón claro natural
        bristleColor = 0xd2b48c,   // Color paja/beige
        ringColor = 0xff0000       // Color del anillo decorativo
    } = config;
    
    // Grupo principal
    const broomGroup = new THREE.Group();
    
    // MODIFICADO: Función para hacer que todas las partes sean interactivas
    function setInteractiveProperties(object) {
        if (object.isMesh) {
            // Hacer que cada mesh SÍ sea interactivo, con el mismo tipo
            object.userData = {
                type: 'broom',          // Todos los meshes tienen el mismo tipo
                isInteractive: true,     // Todos son interactivos
                title: 'Escombra',
                description: 'Una escombra màgica',
                action: 'examine'
            };
        }
    }
    
    // === PALO DE LA ESCOBA ===
    const handleMaterial = new THREE.MeshStandardMaterial({
        color: handleColor,
        roughness: 0.7,     
        metalness: 0.1,     
    });
    
    // Geometría del palo de la escoba
    const handleLength = 1.4;
    const handleGeometry = new THREE.CylinderGeometry(0.02, 0.02, handleLength, 8);
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    
    // MODIFICADO: Aplicar propiedades interactivas
    setInteractiveProperties(handle);
    broomGroup.add(handle);
    
    // === NÚCLEO DEL CEPILLO ===
    const coreMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b4513,    // Marrón más oscuro
        roughness: 0.8,
        metalness: 0.1,
    });
    
    // Núcleo cilíndrico
    const coreGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.05, 8);
    const brushCore = new THREE.Mesh(coreGeometry, coreMaterial);
    brushCore.position.set(0, -handleLength / 2, 0);
    setInteractiveProperties(brushCore); // MODIFICADO: Ahora es interactivo
    broomGroup.add(brushCore);
    
    // === CEPILLO CÓNICO CON TEXTURA DE PAJA ===
    const bristleMaterial = new THREE.MeshStandardMaterial({
        color: bristleColor,
        roughness: 0.9,
        metalness: 0.0,
    });
    
    // Geometría del cepillo cónico (cerrado)
    const bristleGeometry = new THREE.CylinderGeometry(0.05, 0.2, 0.4, 32, 1, false);
    const bristle = new THREE.Mesh(bristleGeometry, bristleMaterial);
    bristle.position.set(0, -handleLength / 2 - 0.2, 0);
    setInteractiveProperties(bristle); // MODIFICADO: Ahora es interactivo
    broomGroup.add(bristle);
    
    // Añadir líneas verticales para simular fibras de paja
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8b5a2b });
    const lineGroup = new THREE.Group();
    const lineCount = 128;
    const radiusTop = 0.05;
    const radiusBottom = 0.2;
    const height = 0.4;

    for (let i = 0; i < lineCount; i++) {
        const angle = (i / lineCount) * Math.PI * 2;
        const xTop = Math.cos(angle) * radiusTop;
        const zTop = Math.sin(angle) * radiusTop;
        const xBottom = Math.cos(angle) * radiusBottom;
        const zBottom = Math.sin(angle) * radiusBottom;

        const points = [
            new THREE.Vector3(xTop, height / 2, zTop),
            new THREE.Vector3(xBottom, -height / 2, zBottom),
        ];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        lineGroup.add(line);
    }
    lineGroup.position.set(0, -handleLength / 2 - 0.2, 0);
    broomGroup.add(lineGroup);
    
    // Añadir ruido a las líneas para simular irregularidades
    lineGroup.children.forEach((line, index) => {
        const noiseFactor = 0.005; // Factor de ruido
        line.geometry.attributes.position.array.forEach((value, idx) => {
            if (idx % 3 !== 1) { // Solo afecta a X y Z
                line.geometry.attributes.position.array[idx] += (Math.random() - 0.5) * noiseFactor;
            }
        });
        line.geometry.attributes.position.needsUpdate = true;
    });
    
    // === ANILLO DECORATIVO ===
    const ringMaterial = new THREE.MeshStandardMaterial({
        color: ringColor,
        roughness: 0.5,
        metalness: 0.3,
    });
    const ringGeometry = new THREE.TorusGeometry(0.09, 0.01, 16, 100);
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, -handleLength / 2 - 0.1, 0);
    setInteractiveProperties(ring); // MODIFICADO: Ahora es interactivo
    broomGroup.add(ring);
    
    // NUEVO: Marcar el grupo como un grupo interactivo especial
    broomGroup.userData = {
        isInteractiveGroup: true,
        type: 'broom'
    };
    
    // Posicionamiento final
    broomGroup.position.set(position.x, position.y, position.z);
    
    // Añadir a la escena
    scene.add(broomGroup);
    
    return {
        group: broomGroup,
        update: () => {
            // Para futuras actualizaciones
        }
    };
};