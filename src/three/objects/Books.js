import * as THREE from 'three';

export function createBooks(scene, shelfInfo) {
  const { shelfX, shelfY, shelfZ, shelfWidth, shelfDepth, isParallelToWall = false } = shelfInfo;
  const numBooks = 5;
  const books = [];
  
  // Materials per a llibres amb colors variats
  const bookColors = [
    0x1a5276, // Blau fosc
    0x7d3c98, // Porpra
    0x117a65, // Verd fosc
    0x7b241c, // Vermell fosc
    0x784212, // Marró
    0x7e5109, // Marró clar
    0x1b4f72, // Blau marí
    0x186a3b, // Verd forest
    0x922b21  // Vermell fosc
  ];
  
  if (isParallelToWall) {
    // Llibres orientats al llarg de l'eix Z (paral·lels a la paret)
    const bookWidth = shelfWidth * 0.85;
    const bookSeparation = 0.02;
    const totalDepth = shelfDepth * 0.9;
    let currentZ = shelfZ - totalDepth/2;
    
    for (let i = 0; i < numBooks; i++) {
      const bookMaterial = new THREE.MeshStandardMaterial({
        color: bookColors[Math.floor(Math.random() * bookColors.length)],
        roughness: 0.7,
        metalness: 0.2
      });
      
      const bookDepth = (totalDepth / numBooks) - bookSeparation;
      const bookHeight = 0.18 + Math.random() * 0.1; // Altura variable
      
      const bookGeom = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);
      const book = new THREE.Mesh(bookGeom, bookMaterial);
      
      book.position.set(
        shelfX + shelfWidth/4,  // Alineat més cap a la part frontal
        shelfY + bookHeight/2,
        currentZ + bookDepth/2
      );
      
      currentZ += bookDepth + bookSeparation;
      
      // Rotació lleugera per donar realisme
      if (Math.random() > 0.7) {
        book.rotation.y = (Math.random() - 0.5) * 0.1;
      }
      
      scene.add(book);
      books.push(book);
    }
  } else {
    // Llibres orientats al llarg de l'eix X (perpendiculars a la paret)
    const totalWidth = shelfWidth * 0.9;
    const bookSeparation = 0.01;
    let currentX = shelfX - totalWidth/2;
    
    for (let i = 0; i < numBooks; i++) {
      const bookMaterial = new THREE.MeshStandardMaterial({
        color: bookColors[Math.floor(Math.random() * bookColors.length)],
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
