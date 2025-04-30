import * as THREE from 'three';

export class InteractionManager {
  constructor(camera, scene, renderer, domElement) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.domElement = domElement || renderer.domElement;
    
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.selectedObject = null;
    
    // Registrem els listeners d'events
    this.domElement.addEventListener('click', this.onClick.bind(this));
    this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    
    // Callback quan es fa clic sobre un objecte
    this.onObjectClick = null;
  }
  
  setOnObjectClick(callback) {
    this.onObjectClick = callback;
  }

  // Add this new method
  setOnObjectHover(callback) {
    this.onHoverCallback = callback;
  }
  
  onClick(event) {
    // Actualitzem posició del ratolí normalitzada
    this.updateMousePosition(event);
    
    // Llançem raig des de la càmera
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Busquem interseccions amb objectes interactius
    const intersects = this.raycaster.intersectObjects(this.scene.children, true)
      .filter(intersection => 
        intersection.object.isInteractive || 
        (intersection.object.userData && (
          intersection.object.userData.type === 'book' ||
          intersection.object.userData.type === 'calendar'|| 
          intersection.object.userData.type === 'tv' ||
          intersection.object.userData.type === 'broom' ||
          intersection.object.userData.type === 'dumbbell' ||
          intersection.object.userData.type === 'microphone' ||
          intersection.object.userData.type === 'computer'
        ))      
      );
    
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      
      // Si tenim callback definit, el cridem amb l'objecte
      if (this.onObjectClick) {
        this.onObjectClick(clickedObject);
      }
    }
  }
  
  onMouseMove(event) {
    this.updateMousePosition(event);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    const intersects = this.raycaster.intersectObjects(this.scene.children, true)
      .filter(intersection => {
        // Log per veure quins objectes troba
        console.log('Objecte trobat:', intersection.object);
        return intersection.object.isInteractive || 
        (intersection.object.userData && (
          intersection.object.userData.type === 'book' ||
          intersection.object.userData.type === 'calendar' ||
          intersection.object.userData.type === 'tv' ||
          intersection.object.userData.type === 'broom' ||
          intersection.object.userData.type === 'dumbbell' ||
          intersection.object.userData.type === 'microphone' ||
          intersection.object.userData.type === 'computer'
        ));
      });
    
    console.log('Interseccions:', intersects.length);
    // Canviem el cursor segons si estem sobre un objecte interactiu o no
    if (intersects.length > 0) {
      this.domElement.style.cursor = 'pointer';
      
      // Si abans no teníem cap objecte seleccionat o era diferent
      if (!this.selectedObject || this.selectedObject !== intersects[0].object) {
        // Si teníem un objecte seleccionat abans, restaurem el seu aspecte
        if (this.selectedObject) {
          this.highlightObject(this.selectedObject, false);
        }
        
        this.selectedObject = intersects[0].object;
        this.highlightObject(this.selectedObject, true);
      }
    } else {
      this.domElement.style.cursor = 'auto';
      
      // Si teníem un objecte seleccionat, restaurem el seu aspecte
      if (this.selectedObject) {
        this.highlightObject(this.selectedObject, false);
        this.selectedObject = null;
      }
    }
  }
  
  highlightObject(object, highlight) {
    // Comprovem si l'usuari prefereix moviment reduït
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Tratar los libros de forma especial - SIEMPRE como objetos individuales
    if (object.userData && (object.userData.type === 'book' || 
        object.userData.type === 'calendar')) {
      // Para los libros, siempre aplicar resaltado individual
      this.highlightSingleObject(object, highlight, prefersReducedMotion);
      return; // Importante: salimos de la función aquí
    }
    
    // PARA EL RESTO DE OBJETOS - continuar con el código existente
    // NUEVA FUNCIÓN: Determinar si debemos resaltar todo un grupo
    const isPartOfInteractiveGroup = (obj) => {
      // Excluir libros explícitamente
      if (obj.userData && obj.userData.type === 'book') {
        return null;
      }
      
      // Buscar hacia arriba en la jerarquía hasta encontrar un grupo interactivo
      let current = obj;
      let maxDepth = 10; // Limitar la profundidad para evitar bucles infinitos
      
      while (current && current.parent && maxDepth > 0) {
        // Verificar si el objeto actual es parte de un grupo interactivo
        if (current.parent.userData && 
            (current.parent.userData.isInteractiveGroup || 
             current.parent.userData.type === 'tv' || 
             current.parent.userData.type === 'broom' ||
             current.parent.userData.type === 'microphone' ||
             current.parent.userData.type === 'dumbbell')) {
          return current.parent;
        }
        
        // También verificar si hay hermanos interactivos que indiquen un grupo
        if (current.parent.children) {
          const hasInteractiveSibling = current.parent.children.some(child => 
            child.userData && child.userData.type && child.userData.type !== 'book' && 
            (child.userData.type === 'tv' || 
            child.userData.type === 'broom' ||
            child.userData.type === 'microphone' ||
            child.userData.type === 'dumbbell'));
            
          if (hasInteractiveSibling) {
            return current.parent;
          }
        }
        
        // Subir un nivel en la jerarquía
        current = current.parent;
        maxDepth--;
      }
      
      return null;
    };
    
    // Determinar si debemos resaltar un grupo o solo el objeto individual
    const group = isPartOfInteractiveGroup(object);
    
    if (group) {
      // RESALTADO DE GRUPO: Aplicar a todos los meshes del grupo
      this.highlightGroup(group, highlight, prefersReducedMotion);
    } else {
      // RESALTADO INDIVIDUAL: Aplicar solo a este objeto
      this.highlightSingleObject(object, highlight, prefersReducedMotion);
    }
  }
  
  // NUEVO MÉTODO: Resaltar todo un grupo de forma uniforme
  highlightGroup(group, highlight, prefersReducedMotion) {
    // Guardar posición y rotación original del grupo si no existe
    if (highlight && !group.userData._originalGroupData) {
      group.userData._originalGroupData = {
        position: group.position.clone(),
        rotation: group.rotation.clone(),
        scale: group.scale.clone()
      };
      
      // Guardar también las propiedades originales de cada mesh hijo
      group.traverse(child => {
        if (child.isMesh) {
          child.userData._originalData = {
            position: child.position.clone(),
            emissive: child.material.emissive ? child.material.emissive.clone() : new THREE.Color(0x000000),
            emissiveIntensity: child.material.emissiveIntensity || 0
          };
        }
      });
    }
    
    if (highlight) {
      // RESALTAR: Aplicar efectos a todo el grupo
      
      // 1. Cambiar la emisión de todos los meshes
      group.traverse(child => {
        if (child.isMesh && child.material) {
          if (child.material.emissive) {
            child.material.emissive.set(0x222222);
            child.material.emissiveIntensity = 0.3;
          }
        }
      });
      
      // 2. Aplicar transformaciones al grupo completo
      if (!prefersReducedMotion) {
        // Escalar todo el grupo uniformemente
        const scaleUp = 1.03;
        group.scale.set(
          group.userData._originalGroupData.scale.x * scaleUp,
          group.userData._originalGroupData.scale.y * scaleUp,
          group.userData._originalGroupData.scale.z * scaleUp
        );
        
        // Levantar ligeramente todo el grupo
        group.position.y = group.userData._originalGroupData.position.y + 0.03;
        
        // Rotar ligeramente el grupo
        group.rotation.y = group.userData._originalGroupData.rotation.y + THREE.MathUtils.degToRad(3);
      }
    } else {
      // RESTAURAR: Devolver el grupo a su estado original
      
      // 1. Restaurar la emisión de todos los meshes
      group.traverse(child => {
        if (child.isMesh && child.material && child.userData._originalData) {
          if (child.material.emissive) {
            child.material.emissive.copy(child.userData._originalData.emissive);
            child.material.emissiveIntensity = child.userData._originalData.emissiveIntensity;
          }
        }
      });
      
      // 2. Restaurar transformaciones del grupo
      if (!prefersReducedMotion && group.userData._originalGroupData) {
        group.position.copy(group.userData._originalGroupData.position);
        group.scale.copy(group.userData._originalGroupData.scale);
        group.rotation.copy(group.userData._originalGroupData.rotation);
      }
    }
  }
  
  // MÉTODO RENOMBRADO: Resaltar un único objeto (el comportamiento original)
  highlightSingleObject(object, highlight, prefersReducedMotion) {
    if (highlight) {
      // Ressaltem l'objecte quan el ratolí passa per sobre
      
      // Augmentem la intensitat emissiva
      if (object.material && object.material.emissive) {
        object.material.emissive = new THREE.Color(0x000000);
        object.material.emissiveIntensity = 0.5;
      }
      
      // Desem les propietats originals a l'objecte si no existeixen
      if (!object.userData._originalPosition) {
        object.userData._originalPosition = object.position.clone();
        object.userData._originalScale = object.scale.clone();
        object.userData._originalRotation = object.rotation.clone();
      }
      
      // Si l'usuari no ha configurat moviment reduït, afegim més efectes
      if (!prefersReducedMotion) {
        // Efecte d'escala segons la guia d'estil (scale(1.03))
        object.scale.set(
          object.userData._originalScale.x * 1.03,
          object.userData._originalScale.y * 1.03,
          object.userData._originalScale.z * 1.03
        );
        
        // Efecte de rotació segons la guia d'estil (rotateY(3deg))
        object.rotation.y += THREE.MathUtils.degToRad(3);
        
        // Efecte d'elevació lleugera
        object.position.y = object.userData._originalPosition.y + 0.03;
      }
      
      // Afegim un outline més visible (opcional, si estàs utilitzant OutlinePass)
      if (this.outlinePass) {
        this.outlinePass.selectedObjects = [object];
      }
    } else {
      // Restaurem l'aspecte original quan el ratolí surt
      if (object.material && object.material.emissive) {
        object.material.emissive = new THREE.Color(0x000000);
        object.material.emissiveIntensity = 0;
      }
      
      // Restaurem posició i escala originals si les hem desat
      if (object.userData._originalPosition && object.userData._originalScale) {
        object.position.copy(object.userData._originalPosition);
        object.scale.copy(object.userData._originalScale);
        
        // Si no tenim moviment reduït, restaurem també la rotació
        if (!prefersReducedMotion && object.userData._originalRotation) {
          object.rotation.copy(object.userData._originalRotation);
        }
      }
      
      // Eliminem l'outline
      if (this.outlinePass) {
        this.outlinePass.selectedObjects = [];
      }
    }
  }
  
  updateMousePosition(event) {
    // Calcula la posició normalitzada del ratolí (-1 a 1)
    const rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }
}