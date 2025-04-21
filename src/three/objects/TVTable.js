import * as THREE from 'three';
import { getMaterials } from '../../utils/materials.js';

export function createTVTable(scene, options = {}) {
  const {
    position = { x: 0, y: 0, z: 0 },
    tableWidth = 2.5,
    tableHeight = 0.6,
    tableDepth = 0.8
  } = options;

  const { whitePlankMaterial, woodDrawerMaterial } = getMaterials();
  const tableGroup = new THREE.Group();

  // 1) Tablas finas (ahora más cortas en Z)
  const boardThickness = 0.03;
  const boardGeo = new THREE.BoxGeometry(tableWidth, boardThickness, tableDepth * 0.6);

  // Definimos primero las variables y geometría de los cajones
  const drawerH = 0.12,
        drawerD = tableDepth * 0.6 * 0.85,
        drawerW = tableWidth * 0.4;
  const drawerGeo = new THREE.BoxGeometry(drawerW, drawerH, drawerD);

  // Superior
  const top = new THREE.Mesh(boardGeo, whitePlankMaterial);
  top.position.y = tableHeight / 2;
  tableGroup.add(top);

  // Intermedia alta
  const mid1 = new THREE.Mesh(boardGeo, whitePlankMaterial);
  mid1.position.y = top.position.y - 0.2;
  tableGroup.add(mid1);

  // ------------------------------
  // 2a) Cajón extra en el primer hueco (derecha)
  const dr0 = new THREE.Mesh(drawerGeo, woodDrawerMaterial);
  dr0.position.set(
    -tableWidth / 4,
    mid1.position.y + boardThickness / 2 + drawerH / 2 + 0.01,
    0
  );
  tableGroup.add(dr0);
  // ------------------------------

  // 2) Cajón primero en hueco derecho
  const dr1 = new THREE.Mesh(drawerGeo, woodDrawerMaterial);
  dr1.position.set(
    tableWidth / 4,
    mid1.position.y - drawerH / 2 - 0.01,
    0
  );
  tableGroup.add(dr1);

  // 3) Tabla fina intermedia baja
  const mid2 = new THREE.Mesh(boardGeo, whitePlankMaterial);
  mid2.position.y = dr1.position.y - drawerH / 2 - boardThickness / 2 - 0.01;
  tableGroup.add(mid2);

  // 4) Cajón segundo en hueco izquierdo
  const dr2 = new THREE.Mesh(drawerGeo, woodDrawerMaterial);
  dr2.position.set(-tableWidth / 4, mid2.position.y - drawerH / 2 - 0.01, 0);
  tableGroup.add(dr2);

  // 5) Tabla fina inferior final
  const bottom = new THREE.Mesh(boardGeo, whitePlankMaterial);
  bottom.position.y = dr2.position.y - drawerH / 2 - boardThickness / 2 - 0.01;
  tableGroup.add(bottom);

  // ----- Añadimos paneles en los laterales (más cortos en Z) -----
  const sidePanelGeo = new THREE.BoxGeometry(boardThickness, tableHeight, tableDepth * 0.6);
  const leftSide = new THREE.Mesh(sidePanelGeo, whitePlankMaterial);
  leftSide.position.set(
    -tableWidth / 2 + boardThickness / 2,
    0,
    0
  );
  const rightSide = leftSide.clone();
  rightSide.position.x = tableWidth / 2 - boardThickness / 2;
  tableGroup.add(leftSide, rightSide);
  // ----------------------------------------------

  // Posición y adición a la escena
  tableGroup.position.set(position.x, position.y, position.z);
  scene.add(tableGroup);
  return tableGroup;
}