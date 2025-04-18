import * as THREE from 'three';
import { getMaterials } from '../../utils/materials.js';
import { createBooks } from './Books.js';

export function createBookshelf(scene, roomConfig) {
  const { width, wallThickness } = roomConfig;
  const { woodMaterial } = getMaterials();
  
  // Funció auxiliar per crear un material de fusta amb textura orientada correctament
  function createOrientedWoodMaterial(isVertical = false, rotation = 0) {
    // Clonem el material base per no afectar altres objectes
    const material = woodMaterial.clone();
    
    // Ajustem l'orientació de la textura
    if (material.map) {
      material.map = material.map.clone();
      material.map.rotation = rotation;
      material.map.repeat.set(isVertical ? 1 : 2, isVertical ? 2 : 1);
      material.map.needsUpdate = true;
    }
    
    if (material.normalMap) {
      material.normalMap = material.normalMap.clone();
      material.normalMap.rotation = rotation;
      material.normalMap.repeat.set(isVertical ? 1 : 2, isVertical ? 2 : 1);
      material.normalMap.needsUpdate = true;
    }
    
    if (material.roughnessMap) {
      material.roughnessMap = material.roughnessMap.clone();
      material.roughnessMap.rotation = rotation;
      material.roughnessMap.repeat.set(isVertical ? 1 : 2, isVertical ? 2 : 1);
      material.roughnessMap.needsUpdate = true;
    }
    
    return material;
  }
  
  // Dimensions de l'estanteria (orientació corregida paral·lela a leftWall)
  const shelfDepth = 1.6;      // Llarg en eix Z (paral·lel a leftWall)
  const shelfHeight = 2.5;
  const shelfWidth = 0.35;     // Curt en eix X (perpendicular a leftWall)
  const shelfThickness = 0.025;
  
  // Posició - a l'esquerra de la taula, paral·lel a leftWall
  const posX = -(width-wallThickness)/2 + shelfWidth/2;
  const posY = shelfHeight/2;
  const posZ = -(width-wallThickness)/3 + 3; // Més proper a la paret frontal
  
  // Marc posterior (tocat a leftWall) - textura vertical
  const backFrameGeom = new THREE.BoxGeometry(shelfThickness, shelfHeight, shelfDepth);
  const backMaterial = createOrientedWoodMaterial(true);
  const backFrame = new THREE.Mesh(backFrameGeom, backMaterial);
  backFrame.position.set(posX - shelfWidth/2 + shelfThickness/2, posY, posZ);
  scene.add(backFrame);
  
  // Lateral frontal - textura vertical
  const frontFrameGeom = new THREE.BoxGeometry(shelfThickness, shelfHeight, shelfDepth);
  const frontMaterial = createOrientedWoodMaterial(true);
  const frontFrame = new THREE.Mesh(frontFrameGeom, frontMaterial);
  frontFrame.position.set(posX - shelfThickness/2, posY, posZ);
  scene.add(frontFrame);
  
  // Laterals als extrems nord i sud - textura vertical
  const endFrameGeom = new THREE.BoxGeometry(shelfWidth, shelfHeight, shelfThickness);
  const northMaterial = createOrientedWoodMaterial(true, Math.PI/2);
  
  // Extrem nord
  const northFrame = new THREE.Mesh(endFrameGeom, northMaterial);
  northFrame.position.set(posX, posY, posZ + shelfDepth/2 - shelfThickness/2);
  scene.add(northFrame);
  
  // Extrem sud
  const southMaterial = createOrientedWoodMaterial(true, Math.PI/2);
  const southFrame = new THREE.Mesh(endFrameGeom, southMaterial);
  southFrame.position.set(posX, posY, posZ - shelfDepth/2 + shelfThickness/2);
  scene.add(southFrame);
  
  // Prestatges (4 pisos) - textura horitzontal
  const shelves = [];
  const numShelves = 4; // 4 prestatges interns
  const shelfHorizGeom = new THREE.BoxGeometry(shelfWidth, shelfThickness, shelfDepth - 2*shelfThickness);
  
  // Calculem la separació entre prestatges
  const shelfSpacing = shelfHeight / (numShelves + 1);
  
  // Primer afegim la tapa superior
  const topShelfMaterial = createOrientedWoodMaterial(false, Math.PI/2);
  const topShelf = new THREE.Mesh(shelfHorizGeom, topShelfMaterial);
  topShelf.position.set(posX, posY + shelfHeight/2 - shelfThickness/2, posZ);
  scene.add(topShelf);
  shelves.push(topShelf);
  
  // Ara afegim els prestatges interiors
  for (let i = 0; i < numShelves; i++) {
    // Per cada prestatge, orientem la textura horitzontalment
    const shelfMaterial = createOrientedWoodMaterial(false, Math.PI/2);
    const shelf = new THREE.Mesh(shelfHorizGeom, shelfMaterial);
    
    // Posició vertical distribuïda uniformement sense base
    // Comencem des d'una posició més elevada per deixar espai a la part inferior
    const shelfPosY = posY - shelfHeight/2 + shelfSpacing * (i + 1);
    
    shelf.position.set(posX, shelfPosY, posZ);
    scene.add(shelf);
    shelves.push(shelf);
    
    // Afegir 5 llibres a cada prestatge intern
    createBooks(scene, {
      shelfX: posX,
      shelfY: shelfPosY + shelfThickness,
      shelfZ: posZ,
      shelfWidth: shelfWidth - 0.05,
      shelfDepth: shelfDepth - 2*shelfThickness - 0.05,
      isParallelToWall: true
    });
  }
  
  return { 
    structure: { backFrame, frontFrame, northFrame, southFrame },
    shelves 
  };
}