import * as THREE from 'three';

export const createBroom = (scene, config = {}) => {
    // Configuración con valores por defecto
    const {
        position = { x: 0, y: 0, z: 0 },
        handleColor = 0xc4a484,    // Marrón claro natural
        bristleColor = 0xd2b48c,   // Color paja/beige
        ringColor = 0xff0000,      // Color del anillo decorativo
        cleanliness = 0 

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
                action: 'examine',
                activityType: 'cleaning'
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
    
    const getDirtyColor = (baseColor, cleanliness) => {
        if (cleanliness < 10) {
            // Escoba muy sucia: NEGRO intenso
            return new THREE.Color(0x333333); // Color carbón (gris oscuro)
        } else if (cleanliness < 50) {
            // Transición gradual de negro a gris oscuro/marrón
            const mixFactor = (cleanliness - 10) / 40;
            const dirtyColor = new THREE.Color(0x333333); // Color carbón
            const middleColor = new THREE.Color(0x443322); // Gris/marrón oscuro
            return dirtyColor.lerp(middleColor, mixFactor);
        } else if (cleanliness < 80) {
            // Transición gradual de gris/marrón oscuro a marrón medio
            const mixFactor = (cleanliness - 50) / 30;
            const middleColor = new THREE.Color(0x443322); // Gris/marrón oscuro
            const lightBrownColor = new THREE.Color(0x8e6b52); // Marrón medio
            return middleColor.lerp(lightBrownColor, mixFactor);
        } else {
            // Transición final a beige claro (igual que el palo)
            const mixFactor = (cleanliness - 80) / 20;
            const lightBrownColor = new THREE.Color(0x8e6b52); // Marrón medio
            const cleanColor = new THREE.Color(handleColor); // Beige claro igual al palo
            return lightBrownColor.lerp(cleanColor, mixFactor);
        }
    };
    
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
    const currentBristleColor = getDirtyColor(bristleColor, cleanliness);
    const bristleMaterial = new THREE.MeshStandardMaterial({
        color: currentBristleColor,
        roughness: 0.9 - (cleanliness / 200),  // Menos rugoso al estar más limpio
        metalness: 0.0,
    });
    
    // Geometría del cepillo cónico (cerrado)
    const bristleGeometry = new THREE.CylinderGeometry(0.05, 0.2, 0.4, 32, 1, false);
    const bristle = new THREE.Mesh(bristleGeometry, bristleMaterial);
    bristle.position.set(0, -handleLength / 2 - 0.2, 0);
    setInteractiveProperties(bristle); // MODIFICADO: Ahora es interactivo
    broomGroup.add(bristle);
    
    // Añadir líneas verticales para simular fibras de paja
    const lineMaterial = new THREE.LineBasicMaterial({ color: currentBristleColor.getHex() });
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
        
        // Líneas rectas simples sin manipulación
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

    // Modificar la sección de partículas para hacerlas más visibles
    if (cleanliness < 10) {
        // MOSQUITAS para estado muy sucio (nivel 0-10)
        const mosquitoCount = 20 + Math.floor(Math.random() * 15); // Entre 20-35 mosquitas
        const mosquitoGeometry = new THREE.SphereGeometry(0.01, 4, 4);
        const mosquitoMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000, // Negras
            transparent: true,
            opacity: 0.95, // Mayor opacidad para mejor visibilidad
            emissive: 0x222222, // Un ligero brillo para hacerlas más visibles
            emissiveIntensity: 0.5
        });
        
        // Crear grupo para las mosquitas
        const mosquitoGroup = new THREE.Group();
        
        for (let i = 0; i < mosquitoCount; i++) {
            const mosquito = new THREE.Mesh(mosquitoGeometry, mosquitoMaterial);
            
            // Mayor dispersión para que se vean "volando" alrededor
            const angle = Math.random() * Math.PI * 2;
            const radius = 0.1 + Math.random() * 0.3; // Más lejos del centro
            const verticalPos = -0.1 + Math.random() * 0.7; // Distribuidas verticalmente
            
            // Posicionar alrededor
            mosquito.position.set(
                Math.cos(angle) * radius,
                verticalPos,
                Math.sin(angle) * radius
            );
            
            // Tamaño variable para las mosquitas
            mosquito.scale.multiplyScalar(0.6 + Math.random() * 0.5);
            mosquitoGroup.add(mosquito);
        }
        
        // Añadir el grupo de mosquitas a la posición de las cerdas
        mosquitoGroup.position.set(0, -handleLength / 2 - 0.2, 0);
        broomGroup.add(mosquitoGroup);
        
    } else if (cleanliness < 80) {
        // Código existente para partículas normales cuando está parcialmente sucia
        const particleCount = Math.floor(60 * (1 - cleanliness / 100));
        if (particleCount > 0) {
            // El resto del código de partículas se mantiene igual...
            const particleGeometry = new THREE.SphereGeometry(0.015, 4, 4);
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: 0x3a2116, // Color un poco más claro para mejor visibilidad
                transparent: true,
                opacity: 0.9
            });
            
            for (let i = 0; i < particleCount; i++) {
                // Código existente...
                const particle = new THREE.Mesh(particleGeometry, particleMaterial);
                
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 0.2 + 0.05;
                const height = Math.random() * 0.5 - 0.25;
                
                particle.position.set(
                    Math.cos(angle) * radius,
                    height,
                    Math.sin(angle) * radius
                );
                
                particle.scale.multiplyScalar(0.4 + Math.random() * 0.8);
                lineGroup.add(particle);
            }
        }
    }
    
    
    // === ANILLO DECORATIVO ===
    const ringMaterial = new THREE.MeshStandardMaterial({
        color: ringColor,
        roughness: 0.3, 
        metalness: 0.6, // Más metálico
        emissive: new THREE.Color(0xff0000).multiplyScalar(0.3) // Brillo rojo constante
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
        updateCleanliness: (newCleanliness) => 
            {console.log("Actualizando limpieza de la escoba a:", newCleanliness);
        // Eliminar el grupo antiguo de la escena
        scene.remove(broomGroup);
        
        // Crear una nueva escoba con el nivel de limpieza actualizado
        const newConfig = {
            ...config,
            position: broomGroup.position,
            cleanliness: newCleanliness
        };
        
        return createBroom(scene, newConfig);},
        cleanliness
    };
};