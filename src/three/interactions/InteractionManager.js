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
        // Principi Open/Closed: Només comprovem la propietat isInteractive
        // o si existeix la propietat userData.type (qualsevol tipus)
        intersection.object.isInteractive || 
        (intersection.object.userData && intersection.object.userData.type)
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
        // Principi Open/Closed: Només comprovem la propietat isInteractive
        // o si existeix la propietat userData.type (qualsevol tipus)
        return intersection.object.isInteractive || 
               (intersection.object.userData && intersection.object.userData.type);
      });
    
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
    
    // NOVA FUNCIÓ: Determinació si cal ressaltar tot un grup
    const isPartOfInteractiveGroup = (obj) => {            
      // Busquem cap amunt en la jerarquia fins a trobar un grup interactiu
      let current = obj;
      let maxDepth = 10; // Limitem la profunditat per evitar bucles infinits
      
      while (current && current.parent && maxDepth > 0) {
        // Verifiquem si l'objecte actual és part d'un grup interactiu
        if (current.parent.userData && current.parent.userData.isInteractiveGroup) {
          return current.parent;
        }
        
        // Pugem un nivell en la jerarquia
        current = current.parent;
        maxDepth--;
      }
      
      return null;
    };
    
    // Determinem si hem de ressaltar un grup o només l'objecte individual
    const group = isPartOfInteractiveGroup(object);
    
    if (group) {
      // RESSALTAR GRUP: Apliquem a tots els meshes del grup
      this.highlightGroup(group, highlight, prefersReducedMotion);
    } else {
      // RESSALTAR INDIVIDUAL: Apliquem només a aquest objecte
      this.highlightSingleObject(object, highlight, prefersReducedMotion);
    }
  }
  
  // Ressaltar tot un grup de forma uniforme
  highlightGroup(group, highlight, prefersReducedMotion) {
    // Guardem posició i rotació original del grup si no existeix
    if (highlight && !group.userData._originalGroupData) {
      group.userData._originalGroupData = {
        position: group.position.clone(),
        rotation: group.rotation.clone(),
        scale: group.scale.clone()
      };
      
      // Guardem també les propietats originals de cada mesh fill
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
      // RESSALTAR: Apliquem efectes a tot el grup
      
      // 1. Canviar l'emissió de tots els meshes
      group.traverse(child => {
        if (child.isMesh && child.material) {
          if (child.material.emissive) {
            child.material.emissive.set(0x222222);
            child.material.emissiveIntensity = 0.3;
          }
        }
      });
      
      // 2. Apliquem transformacions al grup complet
      if (!prefersReducedMotion) {
        // Escalar tot el grup uniformement
        const scaleUp = 1.03;
        group.scale.set(
          group.userData._originalGroupData.scale.x * scaleUp,
          group.userData._originalGroupData.scale.y * scaleUp,
          group.userData._originalGroupData.scale.z * scaleUp
        );
        
        // Aixecar lleugerament tot el grup
        group.position.y = group.userData._originalGroupData.position.y + 0.03;
        
        // Rotar lleugerament el grup
        group.rotation.y = group.userData._originalGroupData.rotation.y + THREE.MathUtils.degToRad(3);
      }
    } else {
      // RESTAURAR: Retornem el grup al seu estat original
      
      // 1. Restaurem l'emissió de tots els meshes
      group.traverse(child => {
        if (child.isMesh && child.material && child.userData._originalData) {
          if (child.material.emissive) {
            child.material.emissive.copy(child.userData._originalData.emissive);
            child.material.emissiveIntensity = child.userData._originalData.emissiveIntensity;
          }
        }
      });
      
      // 2. Restaurem transformacions del grup
      if (!prefersReducedMotion && group.userData._originalGroupData) {
        group.position.copy(group.userData._originalGroupData.position);
        group.scale.copy(group.userData._originalGroupData.scale);
        group.rotation.copy(group.userData._originalGroupData.rotation);
      }
    }
  }
  
  // Ressaltar un únic objecte (el comportament original)
  highlightSingleObject(object, highlight, prefersReducedMotion) {
    if (highlight) {
      // Ressaltem l'objecte quan el ratolí passa per sobre
      
      // Augmentem la intensitat emissiva
      if (object.material && object.material.emissive) {
        object.material.emissive = new THREE.Color(0x222222);
        object.material.emissiveIntensity = 0.3;
      }
      
      // Desem les propietats originals a l'objecte si no existeixen
      if (!object.userData._originalPosition) {
        object.userData._originalPosition = object.position.clone();
        object.userData._originalScale = object.scale.clone();
        object.userData._originalRotation = object.rotation.clone();
      }
      
      // Si l'usuari no ha configurat moviment reduït, afegim més efectes
      if (!prefersReducedMotion) {
        // Efecte d'escala
        object.scale.set(
          object.userData._originalScale.x * 1.03,
          object.userData._originalScale.y * 1.03,
          object.userData._originalScale.z * 1.03
        );
        
        // Efecte de rotació
        object.rotation.y += THREE.MathUtils.degToRad(3);
        
        // Efecte d'elevació lleugera
        object.position.y = object.userData._originalPosition.y + 0.03;
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
    }
  }
  
  updateMousePosition(event) {
    const rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }
}