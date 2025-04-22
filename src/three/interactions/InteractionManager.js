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
          intersection.object.userData.type === 'calendar'
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
          intersection.object.userData.type === 'calendar'
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
    
    if (highlight) {
      // Ressaltem l'objecte quan el ratolí passa per sobre
      
      // Canviem el color emissiu a un blau més intens
      object.material.emissive = new THREE.Color(0x3498db);
      // Augmentem la intensitat emissiva
      object.material.emissiveIntensity = 0.5;
      
      // Desem les propietats originals a l'objecte si no existeixen
      if (!object.userData._originalPosition) {
        object.userData._originalPosition = object.position.clone();
        object.userData._originalScale = object.scale.clone();
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
      object.material.emissive = new THREE.Color(0x000000);
      object.material.emissiveIntensity = 0;
      
      // Restaurem posició i escala originals si les hem desat
      if (object.userData._originalPosition && object.userData._originalScale) {
        object.position.copy(object.userData._originalPosition);
        object.scale.copy(object.userData._originalScale);
        
        // Si no tenim moviment reduït, restaurem també la rotació
        if (!prefersReducedMotion) {
          // Restaurem la rotació (assumint que estava en posició neutral)
          // Si els llibres ja tenen una rotació inicial, hauríem de desar també la rotació original
          object.rotation.y -= THREE.MathUtils.degToRad(3);
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