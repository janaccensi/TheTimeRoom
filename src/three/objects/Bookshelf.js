import * as THREE from 'three';
import { getMaterials } from '../../utils/materials.js';
import { createBooks } from './Books.js';
import { createFolders } from './Folders.js';

export function createBookshelf(scene, roomConfig, clearExisting = false) {
  // Si cal netejar objectes existents
  if (clearExisting) {
    // Busquem tots els llibres i carpetes existents per eliminar-los
    scene.traverse((object) => {
      if (object.userData && (object.userData.type === 'book' || object.userData.type === 'folder' || object.userData.type === 'bookCollection')) {
        scene.remove(object);
        if (object.geometry) object.geometry.dispose();
        if (object.material && object.material.dispose) object.material.dispose();
      }
    });
  }

  const { width, wallThickness } = roomConfig;
  const { tableWoodMaterial, whitePlankMaterial } = getMaterials();
  
  // Dimensions de l'estanteria (orientació corregida paral·lela a leftWall)
  const shelfDepth = 1.6;      // Llarg en eix Z (paral·lel a leftWall)
  const shelfHeight = 2.5;
  const shelfWidth = 0.35;     // Curt en eix X (perpendicular a leftWall)
  const shelfThickness = 0.025;
  
  // Posició - a l'esquerra de la taula, paral·lel a leftWall
  const posX = -(width-wallThickness)/2 + shelfWidth/2;
  const posY = shelfHeight/2;
  const posZ = -(width-wallThickness)/3 + 2.8; // Més proper a la paret frontal
  
  // Marc posterior (tocat a leftWall) - textura vertical
  const backFrameGeom = new THREE.BoxGeometry(shelfThickness, shelfHeight, shelfDepth);  
  const backFrame = new THREE.Mesh(backFrameGeom, tableWoodMaterial);
  backFrame.position.set(posX - shelfWidth/2 + shelfThickness/2, posY, posZ);
  scene.add(backFrame);
   
  // Laterals als extrems nord i sud - textura vertical
  const endFrameGeom = new THREE.BoxGeometry(shelfWidth, shelfHeight, shelfThickness);
  
  // Extrem nord
  const northFrame = new THREE.Mesh(endFrameGeom, tableWoodMaterial);
  northFrame.position.set(posX, posY, posZ + shelfDepth/2 - shelfThickness/2);
  scene.add(northFrame);
  
  // Extrem sud
  const southFrame = new THREE.Mesh(endFrameGeom, tableWoodMaterial);
  southFrame.position.set(posX, posY, posZ - shelfDepth/2 + shelfThickness/2);
  scene.add(southFrame);
  
  // Prestatges (4 pisos) - textura horitzontal
  const shelves = [];
  const numShelves = 4; // 4 prestatges interns
  const shelfHorizGeom = new THREE.BoxGeometry(shelfWidth, shelfThickness, shelfDepth - 2*shelfThickness);
  
  // Calculem la separació entre prestatges
  const shelfSpacing = shelfHeight / (numShelves + 1);
  
  // Primer afegim la tapa superior
  const topShelf = new THREE.Mesh(shelfHorizGeom, tableWoodMaterial);
  topShelf.position.set(posX, posY + shelfHeight/2 - shelfThickness/2, posZ);
  scene.add(topShelf);
  shelves.push(topShelf);
  
  // Obtenim les activitats més recents
  const readingActivities = JSON.parse(localStorage.getItem('readingActivities')) || [];
  const workActivities = JSON.parse(localStorage.getItem('workActivities')) || [];
  
  console.log(`Creant estanteria amb ${readingActivities.length} activitats de lectura i ${workActivities.length} activitats de treball`);
  
  let numLlibres = readingActivities.length;
  let numFolders = workActivities.length;

  const bookDepth = 0.05;
  const folderDepth = 0.06;
  const spacing = 0.005;
  const maxBooks = Math.floor(shelfDepth * 0.99 / (bookDepth + spacing));          
  const maxFolders = Math.floor(shelfDepth * 0.99 / (folderDepth + spacing));


  // Ara afegim els prestatges interiors
  for (let i = 0; i < numShelves; i++) {
    // Per cada prestatge, orientem la textura horitzontalment    
    const shelf = new THREE.Mesh(shelfHorizGeom, tableWoodMaterial);
    
    // Posició vertical distribuïda uniformement sense base
    // Comencem des d'una posició més elevada per deixar espai a la part inferior
    const shelfPosY = posY - shelfHeight/2 + shelfSpacing * (i + 1);
    
    shelf.position.set(posX, shelfPosY, posZ);
    scene.add(shelf);
    shelves.push(shelf);
    
    const shelfInfo = {
      shelfX: posX,
      shelfY: shelfPosY + shelfThickness,
      shelfZ: posZ,
      shelfWidth: shelfWidth - 0.05,
      shelfDepth: shelfDepth - 2*shelfThickness - 0.05,
      isParallelToWall: true,
      shelfIndex: i
    };
    
    // Creem llibres o carpetes segons l'índex del prestatge
    // PASSEM LES ACTIVITATS FILTRADES COM A PARÀMETRE    
    if (i <= 1) {
      // Per als primers dos prestatges, creem llibres amb les activitats de lectura      
      createBooks(scene, shelfInfo, readingActivities, numLlibres);
      numLlibres = Math.max(0, numLlibres - maxBooks);
    } else {
      // Per als prestatges 2 i 3, creem carpetes amb les activitats de treball
      createFolders(scene, shelfInfo, workActivities, numFolders);
      numFolders = Math.max(0, numFolders - maxFolders);
    }
  }
  
  return {                  
    shelves   
  };
}