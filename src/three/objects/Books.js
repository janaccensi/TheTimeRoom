import * as THREE from 'three';

export function createBooks(scene, shelfInfo, onBookClick) {
  const { shelfX, shelfY, shelfZ, shelfWidth, shelfDepth, isParallelToWall = false, shelfIndex = 0 } = shelfInfo;
  const books = [];
  
  // Determinem si aquest prestatge conté llibres o carpesans
  const isBookshelf = shelfIndex <= 1; // Estanteries 1 i 2 (índexs 0 i 1)
  const isFoldershelf = shelfIndex >= 2; // Estanteries 3 i 4 (índexs 2 i 3)
  
  // Nombres d'elements segons el tipus de prestatge
  const numBooks = 20;
  const numFolders = 10;
  
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
  
  // Material per als carpesans negres
  const folderMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#111111"),    
    roughness: 0.7,
    metalness: 0.05
  });
  
  if (isParallelToWall) {
    // Llibres orientats al llarg de l'eix Z (paral·lels a la paret)
    const totalDepth = shelfDepth * 0.99;
    
    // Nova estratègia: disposarem els elements de manera contigua
    // Calculem l'espai total que ocuparan
    let totalWidth = 0;
    const elementDepths = [];
    const elementHeights = [];
    
    // Només calculem mides per als elements que realment crearem
    if (isBookshelf) {
      for (let i = 0; i < numBooks; i++) {
        const bookDepth = 0.04 + Math.random() * 0.03;
        elementDepths.push(bookDepth);
        totalWidth += bookDepth;
        elementHeights.push(0.20 + Math.random() * 0.05);
      }
    }
    
    if (isFoldershelf) {
      for (let i = 0; i < numFolders; i++) {
        const folderDepth = 0.06;
        elementDepths.push(folderDepth);
        totalWidth += folderDepth;
        elementHeights.push(0.40);
      }
    }
    
    // Escalem si fa falta
    const scaleFactor = Math.min(1.0, totalDepth / totalWidth);
    
    // Posicionem els elements
    let currentPos = 0;
    
    // Si són llibres, els distribuïm d'esquerra a dreta dins d'un grup
    if (isBookshelf) {
      // Creem un grup per tots els llibres de l'estanteria però SENSE la propietat isInteractiveGroup
      const bookshelfGroup = new THREE.Group();
      bookshelfGroup.userData = {
        id: `bookshelf_${shelfIndex}`,
        type: 'bookCollection',
        title: `Col·lecció de llibres`
        // Eliminem isInteractiveGroup per permetre selecció individual
      };
      
      // Posicionem el grup a la base de l'estanteria
      bookshelfGroup.position.set(shelfX, shelfY, shelfZ);
      
      for (let i = 0; i < numBooks; i++) {
        const bookDepth = elementDepths[i] * scaleFactor;
        const bookHeight = elementHeights[i];
        const bookWidth = shelfWidth * 0.75 * (0.7 + Math.random() * 0.3);
        
        const bookMaterial = bookMaterials[Math.floor(Math.random() * bookMaterials.length)];
        const bookGeom = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);
        const book = new THREE.Mesh(bookGeom, bookMaterial);
        
        book.userData = {
          id: `book_${shelfIndex}_${i}`,
          type: 'book',
          title: `Llibre`,
          category: getRandomBookCategory()
        };
        
        // Assegurem que cada llibre és interactiu individualment
        book.isInteractive = true;
        
        // Les posicions ara són relatives al grup, no a l'escena
        const bookPosZ = -totalDepth/2 + currentPos + bookDepth/2;
        
        book.position.set(
          (shelfWidth - bookWidth) * (0.1 + Math.random() * 0.3),
          bookHeight/2,
          bookPosZ
        );
        
        book.rotation.y = (Math.random() - 0.5) * 0.08;
        book.rotation.x = (Math.random() - 0.5) * 0.03;
        
        bookshelfGroup.add(book);
        books.push(book);
        
        currentPos += bookDepth + 0.005; // Petit espai entre llibres
      }
      
      // Afegim tot el grup a l'escena
      scene.add(bookshelfGroup);
    }
    
    // Si són carpesans, mantenim el grup per l'etiqueta però són interactuables individualment
    if (isFoldershelf) {
      for (let i = 0; i < numFolders; i++) {
        const folderDepth = elementDepths[i] * scaleFactor;
        const folderHeight = elementHeights[i];
        const folderWidth = shelfWidth * 0.675;
        
        // Crear un grup per al carpesà i l'etiqueta (sense isInteractiveGroup)
        const folder = new THREE.Group();
              
        // Crear el carpesà principal
        const folderGeom = new THREE.BoxGeometry(folderWidth, folderHeight, folderDepth);
        const folderMesh = new THREE.Mesh(folderGeom, folderMaterial);
        folderMesh.isInteractive = true; // Aquest mesh és interactiu individualment
        
        // Important: afegim la informació d'usuari al mesh principal 
        // perquè el raycaster interactuï amb aquest element
        folderMesh.userData = {
          id: `folder_${shelfIndex}_${i}`,
          type: 'folder',
          title: `Carpesà de documents`,
          category: 'Documents'
        };
        
        folder.add(folderMesh);
        
        // Crear l'etiqueta blanca
        const labelMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xFFFFFF, 
          roughness: 0.6 
        });
        const labelWidth = folderWidth * 0.2;
        const labelHeight = folderHeight * 0.5;
        const labelDepth = 0.005;
        
        const labelGeom = new THREE.BoxGeometry(labelWidth, labelHeight, labelDepth);
        const label = new THREE.Mesh(labelGeom, labelMaterial);
        
        label.position.set(folderWidth/2, folderHeight/8, 0);    
        label.rotation.y = Math.PI/2;
        
        folder.add(label);
        
        // Metadades del grup (però sense ser interactiu com a grup)
        folder.userData = {
          id: `folder_group_${shelfIndex}_${i}`,
          type: 'folderWithLabel',
          isInteractiveGroup: true
        };
        
        const folderPosZ = shelfZ - totalDepth/2 + currentPos + folderDepth/2;
        
        folder.position.set(
          shelfX + (shelfWidth - folderWidth) * 0.2,
          shelfY + folderHeight/2,
          folderPosZ
        );
        
        folder.rotation.y = (Math.random() - 0.5) * 0.05;
        
        scene.add(folder);
        books.push(folder);
        
        currentPos += folderDepth + 0.01; // Espai una mica més gran entre carpesans
      }
    }
  }
  
  return books;
}

// Funció per generar categories de llibres aleatòries
function getRandomBookCategory() {
  const categories = ['Novel·la', 'Ciència', 'Història', 'Poesia', 'Assaig', 'Fantasia'];
  return categories[Math.floor(Math.random() * categories.length)];
}
