import * as THREE from 'three';

export function createBooks(scene, shelfInfo, onBookClick) {
  const { shelfX, shelfY, shelfZ, shelfWidth, shelfDepth, isParallelToWall = false } = shelfInfo;
  const books = [];
  
  // Nombre aleatori de llibres per estanteria (entre 10 i 20)
  const numBooks = Math.floor(Math.random() * 10) + 5;
  
  // Textures per als lloms dels llibres
  const textureLoader = new THREE.TextureLoader();
  
  // Llista de textures només per als lloms dels llibres
  const bookSpineTextures = [
    textureLoader.load('/textures/books/spine1.png'),
    textureLoader.load('/textures/books/spine2.png'),
    textureLoader.load('/textures/books/spine3.png'),
    textureLoader.load('/textures/books/spine4.png'),
    textureLoader.load('/textures/books/spine5.png')
  ];
  
  // Configuració de textures
  bookSpineTextures.forEach(texture => {
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  });
  
  if (isParallelToWall) {
    // Llibres orientats al llarg de l'eix Z (paral·lels a la paret)
    const totalDepth = shelfDepth * 0.9;
    const bookSeparation = 0.02;
    
    // Generem posicions aleatòries per als llibres
    const positions = [];
    for (let i = 0; i < numBooks; i++) {
      // Posició aleatòria al llarg de l'estanteria, deixant marge als extrems
      const margin = 0.1; // Marge als extrems (10% de l'espai)
      const availableSpace = totalDepth * (1 - 2 * margin);
      const randomPosition = (Math.random() * availableSpace) + (totalDepth * margin);
      
      // Comprovem que no estigui massa a prop dels altres llibres
      // Reduïm la distància mínima per acomodar més llibres
      let isValid = true;
      for (let pos of positions) {
        if (Math.abs(pos - randomPosition) < bookSeparation * 3) { // Reduït de 5 a 3
          isValid = false;
          break;
        }
      }
      
      // Si la posició és vàlida, l'afegim. Si no, provem més tard
      if (isValid) {
        positions.push(randomPosition);
      } else {
        i--; // Tornem a provar
        // Limitem els intents per evitar bucles infinits
        if (i < -20) break; // Augmentat el límit d'intents
      }
    }
    
    // Ordenem les posicions per facilitar la col·locació
    positions.sort((a, b) => a - b);
    
    // Col·loquem els llibres a les posicions generades
    for (let i = 0; i < positions.length; i++) {
      // Dimensions del llibre amb gruix reduït
      const bookDepth = 0.05 + Math.random() * 0.04; // Gruix més realista
      const bookHeight = 0.17 + Math.random() * 0.12; // Altura variable
      const bookWidth = shelfWidth * 0.75 * (0.7 + Math.random() * 0.5); // Amplada variable
      
      // Seleccionar textura aleatòria pel llom
      const spineTexture = bookSpineTextures[Math.floor(Math.random() * bookSpineTextures.length)];
      
      // Material pel llibre utilitzant només la textura del llom
      const bookMaterial = new THREE.MeshStandardMaterial({ 
        map: spineTexture,
        roughness: 0.8, 
        metalness: 0.1 
      });
      
      // Crear el llibre
      const bookGeom = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);
      const book = new THREE.Mesh(bookGeom, bookMaterial);
      
      // Afegim propietats per a la interacció
      book.userData = {
        id: `book_parallel_${i}`,
        type: 'book',
        title: `Llibre ${i+1}`,
        category: getRandomBookCategory()
      };
      
      // Fem el llibre "clicable" (això serà utilitzat pel raycaster)
      book.isInteractive = true;
      
      // Posicionar el llibre (convertim la posició relativa a absoluta)
      const bookPosZ = shelfZ - totalDepth/2 + positions[i];
      
      book.position.set(
        shelfX + (shelfWidth - bookWidth) * (0.1 + Math.random() * 0.3),  // Variació en X
        shelfY + bookHeight/2,
        bookPosZ
      );
      
      // Rotació lleugera per donar realisme (més varietat)
      book.rotation.y = (Math.random() - 0.5) * 0.15;
      book.rotation.x = (Math.random() - 0.5) * 0.05;
      if (Math.random() > 0.8) {
        // Ocasionalment un llibre lleugerament inclinat
        book.rotation.z = (Math.random() - 0.5) * 0.08;
      }
      
      scene.add(book);
      books.push(book);
    }
    
    // Ocasionalment, afegir un llibre completament inclinat
    if (Math.random() > 0.65) {
      const bookHeight = 0.18 + Math.random() * 0.1;
      const bookWidth = shelfWidth * 0.75;
      const bookDepth = 0.04 + Math.random() * 0.03; // Gruix reduït pel llibre inclinat
      
      const spineTexture = bookSpineTextures[Math.floor(Math.random() * bookSpineTextures.length)];
      const bookMaterial = new THREE.MeshStandardMaterial({ 
        map: spineTexture,
        roughness: 0.8, 
        metalness: 0.1 
      });
      
      const bookGeom = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);
      const book = new THREE.Mesh(bookGeom, bookMaterial);
      
      // Posició aleatòria per al llibre inclinat
      const inclinedBookPos = shelfZ - totalDepth/2 + Math.random() * totalDepth;
      
      // Posicionar el llibre inclinat
      book.position.set(
        shelfX + (shelfWidth - bookWidth) * 0.2,
        shelfY + bookHeight/2 - 0.05,
        inclinedBookPos
      );
      
      // Rotació que simula un llibre inclinat o caigut
      book.rotation.z = Math.PI * 0.1;
      book.rotation.y = Math.PI * (0.1 + Math.random() * 0.1);
      
      scene.add(book);
      books.push(book);
    }
  } else {
    // Per llibres perpendiculars a la paret
    const totalWidth = shelfWidth * 0.9;
    
    // Generem posicions aleatòries per als llibres
    const positions = [];
    for (let i = 0; i < numBooks; i++) {
      // Posició aleatòria al llarg de l'estanteria
      const margin = 0.1; // Marge als extrems
      const availableSpace = totalWidth * (1 - 2 * margin);
      const randomPosition = (Math.random() * availableSpace) + (totalWidth * margin);
      
      // Comprovem que no estigui massa a prop dels altres llibres
      let isValid = true;
      for (let pos of positions) {
        if (Math.abs(pos - randomPosition) < 0.07) {
          isValid = false;
          break;
        }
      }
      
      // Si la posició és vàlida, l'afegim
      if (isValid) {
        positions.push(randomPosition);
      } else {
        i--; // Tornem a provar
        if (i < -10) break;
      }
    }
    
    // Ordenem les posicions
    positions.sort((a, b) => a - b);
    
    // Col·loquem els llibres
    for (let i = 0; i < positions.length; i++) {
      // Dimensions variables del llibre amb gruix reduït
      const bookWidth = 0.08 + Math.random() * 0.06;
      const bookHeight = 0.17 + Math.random() * 0.12;
      const bookDepth = shelfDepth * (0.25 + Math.random() * 0.2); // Reduït del 90% al 45% màxim
      
      // Seleccionar textura aleatòria pel llom
      const spineTexture = bookSpineTextures[Math.floor(Math.random() * bookSpineTextures.length)];
      
      const bookMaterial = new THREE.MeshStandardMaterial({
        map: spineTexture,
        roughness: 0.7,
        metalness: 0.2
      });
      
      const bookGeom = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);
      const book = new THREE.Mesh(bookGeom, bookMaterial);
      
      // Afegim propietats per a la interacció
      book.userData = {
        id: `book_perpendicular_${i}`,
        type: 'book',
        title: `Llibre ${i+1}`,
        category: getRandomBookCategory()
      };
      
      // Fem el llibre "clicable"
      book.isInteractive = true;
      
      // Convertim la posició relativa a absoluta
      const bookPosX = shelfX - totalWidth/2 + positions[i];
      
      book.position.set(
        bookPosX,
        shelfY + bookHeight/2,
        shelfZ - (shelfDepth - bookDepth)/2
      );
      
      // Rotació lleugera
      book.rotation.y = (Math.random() - 0.5) * 0.2;
      
      scene.add(book);
      books.push(book);
    }
  }
  
  return books;
}

// Funció per generar categories de llibres aleatòries
function getRandomBookCategory() {
  const categories = ['Novel·la', 'Ciència', 'Història', 'Poesia', 'Assaig', 'Fantasia'];
  return categories[Math.floor(Math.random() * categories.length)];
}
