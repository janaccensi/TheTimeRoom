import * as THREE from 'three';
import { ActivityModal } from '../../components/ActivityModal.js';

/**
 * Crea carpetes basades en les activitats de tipus "work"
 * @param {THREE.Scene} scene - L'escena de three.js
 * @param {Object} shelfInfo - Informació sobre el prestatge
 * @param {Array} workActivities - Activitats de tipus treball filtrades prèviament
 * @param {number} numFolders - Nombre de carpetes a crear
 * @returns {Array} - Array amb les carpetes creades
 */
export function createFolders(scene, shelfInfo, workActivities = [], numCarpetes) {
  const { shelfX, shelfY, shelfZ, shelfWidth, shelfDepth, isParallelToWall = false, shelfIndex = 0 } = shelfInfo;
  const folders = [];
  
  // Si no és un prestatge paral·lel a la paret o l'index no correspon a carpetes, sortim
  if (!isParallelToWall || shelfIndex < 2) {
    return folders;
  }
  
  // Netegem les carpetes existents d'aquest prestatge si n'hi ha
  scene.traverse((object) => {
    if (object.userData && object.userData.type === 'folder' && 
        object.userData.shelfIndex === shelfIndex) {
      scene.remove(object);
      if (object.geometry) object.geometry.dispose();
      if (object.material && object.material.dispose) object.material.dispose();
    }
  });
  
  // ARA UTILITZEM LES ACTIVITATS QUE REBEM PER PARÀMETRE
  console.log(`Creant carpetes basades en ${workActivities.length} activitats de treball`);
  
  // Si no hi ha activitats de treball i és el primer prestatge de carpetes, creem una de mostra
  let filteredActivities = workActivities;
  if (filteredActivities.length === 0 && shelfIndex === 2) {
    filteredActivities = [{
      objectId: `sample_folder_${shelfIndex}_0`,
      objectTitle: "Carpeta de mostra",
      type: "work",
      category: "Documents",
      date: new Date().toISOString(),
      hours: 0
    }];
  }
  
  // Materials de carpeta
  const folderMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#111111"),    
    roughness: 0.7,
    metalness: 0.05
  });
  
  // Etiquetes de color per les carpetes
  const labelColors = [
    "#FFFFFF", "#FFDDCC", "#DDFFDD", "#CCDDFF", 
    "#FFFFCC", "#CCFFFF", "#FFCCFF", "#EEEEDD"
  ];
  
  // Materials per a les etiquetes
  const labelMaterials = labelColors.map(color => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.6,
      metalness: 0.0
    });
  });
  
  // Dimensions i espaiament
  const totalDepth = shelfDepth * 0.99;
  const folderDepth = 0.06;
  const spacing = 0.005;
  
  const maxFolders = Math.floor(totalDepth / (folderDepth + spacing));    
  const numFoldersToCreate = Math.min(maxFolders, numCarpetes);
  
  if (numFoldersToCreate <= 0) {
    return folders;
  }
  
  // CORRECCIÓ: utilitzem la mateixa lògica que en els llibres per a startPos
  const startPos = -totalDepth/2 + folderDepth/2; // Left align igual que els llibres
  
  // Creem un grup per totes les carpetes de l'estanteria
  const folderShelfGroup = new THREE.Group();
  folderShelfGroup.userData = {
    id: `foldershelf_${shelfIndex}`,
    type: 'folderCollection',
    title: 'Col·lecció de carpetes de treball'
  };
  
  folderShelfGroup.position.set(shelfX, shelfY, shelfZ);
  scene.add(folderShelfGroup);
  
  for (let i = 0; i < numFoldersToCreate; i++) {
    const activity = filteredActivities[i];
    const folderHeight = 0.40;
    const folderWidth = shelfWidth * 0.675;
    
    const folder = new THREE.Group();
    
    const folderGeom = new THREE.BoxGeometry(folderWidth, folderHeight, folderDepth);
    const folderMesh = new THREE.Mesh(folderGeom, folderMaterial);    
    folderMesh.isInteractive = true;
    folderMesh.userData = {
      id: activity.objectId,
      type: 'folder',
      title: activity.objectTitle || `Carpeta: ${activity.category || 'Documents'}`,
      category: activity.category || 'Documents',
      activityType: 'work',
      shelfIndex: shelfIndex,      
      onClick: (object) => {
        const activityModal = new ActivityModal();            
        activityModal.show(object);
      }
    };
    
    folder.add(folderMesh);
    
    // MODIFICACIÓ: Assignació determinista del color de l'etiqueta
    let hashCode = 0;
    const idString = activity.objectId || activity.objectTitle || `folder_${i}`;
    
    // Calculem un valor hash simple
    for (let j = 0; j < idString.length; j++) {
      hashCode = ((hashCode << 5) - hashCode) + idString.charCodeAt(j);
      hashCode = hashCode & hashCode; // Convertim a un enter de 32 bits
    }
    
    // Utilitzem el valor hash per seleccionar un color (ens assegurem que sigui positiu)
    const labelColorIndex = Math.abs(hashCode) % labelMaterials.length;
    const labelMaterial = labelMaterials[labelColorIndex];
    
    const labelWidth = folderWidth * 0.2;
    const labelHeight = folderHeight * 0.5;
    const labelDepth = 0.005;
    
    const labelGeom = new THREE.BoxGeometry(labelWidth, labelHeight, labelDepth);
    const label = new THREE.Mesh(labelGeom, labelMaterial);
    
    label.position.set(folderWidth/2, folderHeight/8, 0);    
    label.rotation.y = Math.PI/2;
    
    folder.add(label);
    
    // CORRECCIÓ: Calculem la posició Z de la mateixa manera que els llibres
    const folderPosZ = i * (folderDepth + spacing);
    
    
    folder.position.set(
      (shelfWidth - folderWidth) * 0.2,
      folderHeight/2,
      startPos + i * (folderDepth + spacing)
    );
    
    // MODIFICACIÓ: Fem també determinista les rotacions
    // Utilitzem el mateix valor hash però una mica diferent per les rotacions
    const rotationSeed = (hashCode % 100) / 1000; // Valor petit per a rotacions lleugeres
    folder.rotation.y = rotationSeed * 0.05;
    
    folder.userData = {
      id: `folder_group_${activity.objectId}`,
      type: 'folderWithLabel',
      isInteractiveGroup: true,
      labelColorIndex: labelColorIndex // Emmagatzemem l'índex de color per si cal recuperar-lo
    };
    
    folderShelfGroup.add(folder);
    folders.push(folder);
  }
  
  return folders;
}