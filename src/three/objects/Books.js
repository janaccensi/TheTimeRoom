import * as THREE from 'three';
import { ActivityModal } from '../../components/ActivityModal.js';

/**
 * Crea llibres basats en les activitats de tipus "reading"
 * @param {THREE.Scene} scene - L'escena de three.js
 * @param {Object} shelfInfo - Informació sobre el prestatge
 * @param {Array} readingActivities - Activitats de tipus lectura filtrades prèviament
 * @returns {Array} - Array amb els llibres creats
 */
export function createBooks(scene, shelfInfo, readingActivities, numLlibres) {
  const { shelfX, shelfY, shelfZ, shelfWidth, shelfDepth, isParallelToWall = false, shelfIndex = 0 } = shelfInfo;
  const books = [];
  
  // Si no és un prestatge paral·lel a la paret o l'index correspon a carpetes, sortim
  if (!isParallelToWall || shelfIndex >= 2) {
    return books;
  }
  
  // Netegem els llibres existents d'aquest prestatge si n'hi ha
  scene.traverse((object) => {
    if (object.userData && object.userData.type === 'book' && 
        object.userData.shelfIndex === shelfIndex) {
      scene.remove(object);
      if (object.geometry) object.geometry.dispose();
      if (object.material && object.material.dispose) object.material.dispose();
    }
  });
   
  // Colors per als llibres
  const bookColors = [
    "#314823", "#a68d53", "#a63b15", "#2F4F6E", 
    "#7B2D26", "#3A6F68", "#444444", "#F4F1E6"
  ];
  
  // Materials per als llibres (colors llisos)
  const bookMaterials = bookColors.map(color => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.8,
      metalness: 0.1
    });
  });
  
  // La resta del codi roman igual
  const totalDepth = shelfDepth * 0.99;
  const bookDepth = 0.05;
  const spacing = 0.005;
  
  const maxBooks = Math.floor(totalDepth / (bookDepth + spacing));
  const numBooks = Math.min(maxBooks, numLlibres);
  
  if (numBooks <= 0) {
    return books;
  }
  
  const startPos = -totalDepth/2 + bookDepth/2; // Left align the books
  
  const bookshelfGroup = new THREE.Group();
  bookshelfGroup.userData = {
    id: `bookshelf_${shelfIndex}`,
    type: 'bookCollection',
    title: 'Col·lecció de llibres de lectura'
  };
  
  bookshelfGroup.position.set(shelfX, shelfY, shelfZ);
  
  for (let i = 0; i < numBooks; i++) {
    const activity = readingActivities[i];
            
    
    const bookDepthVaried = bookDepth * (0.8 + Math.random() * 0.4);
    const bookHeight = 0.30 + Math.random() * 0.05;
    const bookWidth = shelfWidth * 0.75 * (0.7 + Math.random() * 0.3);
    
    // MODIFICACIÓ: Assignació determinista del color del llibre basada en l'ID de l'activitat
    // Aquesta lògica assegura que el mateix llibre sempre tindrà el mateix color
    
    // Generem un número a partir de l'ID o el títol de l'activitat
    let hashCode = 0;
    const idString = activity.objectId || activity.objectTitle || `book_${i}`;
    
    // Calculem un valor hash simple
    for (let j = 0; j < idString.length; j++) {
      hashCode = ((hashCode << 5) - hashCode) + idString.charCodeAt(j);
      hashCode = hashCode & hashCode; // Convertim a un enter de 32 bits
    }
    
    // Utilitzem el valor hash per seleccionar un color (ens assegurem que sigui positiu)
    const colorIndex = Math.abs(hashCode) % bookMaterials.length;
    const bookMaterial = bookMaterials[colorIndex];
    
    const bookGeom = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepthVaried);
    const book = new THREE.Mesh(bookGeom, bookMaterial);
    
    book.userData = {
      id: activity.objectId,
      title: activity.objectTitle || `Llibre: ${activity.category || 'General'}`,
      type: 'book',
      category: activity.category || 'Lectura General',
      activityType: 'reading',
      shelfIndex: shelfIndex,
      colorIndex: colorIndex // Emmagatzemem l'índex de color per si necessitem recuperar-lo
    };
    
    book.isInteractive = true;
    
    const bookPosZ = startPos + i * (bookDepth + spacing) + bookDepthVaried/2;

    
    
    book.position.set(
      (shelfWidth - bookWidth) * (0.1 + Math.random() * 0.3),
      bookHeight/2,
      bookPosZ
    );
    
    // MODIFICACIÓ: Fem també determinista les rotacions
    // Utilitzem el mateix valor hash però una mica diferent per les rotacions
    const rotationSeed = (hashCode % 100) / 1000; // Valor petit per a rotacions lleugeres
    book.rotation.y = rotationSeed * 0.08;
    book.rotation.x = (rotationSeed * 0.5) * 0.03;
    
    bookshelfGroup.add(book);
    books.push(book);
  }
  
  scene.add(bookshelfGroup);
  
  return books;
}

// Funció per generar categories de llibres aleatòries (per retrocompatibilitat)
function getRandomBookCategory() {
  const categories = ['Novel·la', 'Ciència', 'Història', 'Poesia', 'Assaig', 'Fantasia'];
  return categories[Math.floor(Math.random() * categories.length)];
}
