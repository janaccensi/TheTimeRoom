import * as THREE from 'three';

export function createBooks(scene, shelfInfo) {
  const { shelfX, shelfY, shelfZ, shelfWidth, shelfDepth, isParallelToWall = false } = shelfInfo;
  const numBooks = 13;
  const books = [];
  
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
    let currentZ = shelfZ - totalDepth/2;
    
    for (let i = 0; i < numBooks; i++) {
      // Dimensions del llibre
      const bookDepth = (totalDepth / numBooks) - bookSeparation;
      const bookHeight = 0.18 + Math.random() * 0.1; // Altura variable
      const bookWidth = shelfWidth * 0.8 * (0.8 + Math.random() * 0.4); // Amplada variable
      
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
      
      // Posicionar el llibre
      book.position.set(
        shelfX + (shelfWidth - bookWidth) * 0.2,  // Més a prop de la part frontal
        shelfY + bookHeight/2,
        currentZ + bookDepth/2
      );
      
      // Rotació lleugera per donar realisme
      book.rotation.y = (Math.random() - 0.5) * 0.12;
      book.rotation.x = (Math.random() - 0.5) * 0.03;
      
      // Afegir llibre a l'escena
      scene.add(book);
      books.push(book);
      
      currentZ += bookDepth + bookSeparation;
    }
  } else {
    // Llibres orientats al llarg de l'eix X (perpendiculars a la paret)
    const totalWidth = shelfWidth * 0.9;
    const bookSeparation = 0.01;
    let currentX = shelfX - totalWidth/2;
    
    for (let i = 0; i < numBooks; i++) {
      const bookMaterial = new THREE.MeshStandardMaterial({
        color: 0x7d3c98, // Porpra
        roughness: 0.7,
        metalness: 0.2
      });
      
      const bookWidth = (totalWidth / numBooks) - bookSeparation;
      const bookHeight = 0.18 + Math.random() * 0.1; // Altura variable
      const bookDepth = shelfDepth * (0.6 + Math.random() * 0.3); // Profunditat variable
      
      const bookGeom = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);
      const book = new THREE.Mesh(bookGeom, bookMaterial);
      
      book.position.set(
        currentX + bookWidth/2,
        shelfY + bookHeight/2,
        shelfZ - (shelfDepth - bookDepth)/2 // Alineat cap enrere
      );
      
      currentX += bookWidth + bookSeparation;
      
      // Rotació lleugera per donar varietat
      if (Math.random() > 0.7) {
        book.rotation.y = (Math.random() - 0.5) * 0.1;
      }
      
      scene.add(book);
      books.push(book);
    }
  }
  
  return books;
}
