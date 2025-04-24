import * as THREE from 'three';
import { getMaterials } from '../../utils/materials.js';

export function createRoom(scene, roomConfig) {
  const { width, height, depth, wallThickness } = roomConfig;
  const { frontWallMaterial, sideWallMaterial, floorMaterial } = getMaterials();
  
  // Terra
  const floorGeometry = new THREE.BoxGeometry(width, wallThickness, depth);
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -wallThickness/2;
  scene.add(floor);
  
  // Paret davantera
  const frontWallGeometry = new THREE.BoxGeometry(width, height, wallThickness);
  const frontWall = new THREE.Mesh(frontWallGeometry, frontWallMaterial);
  frontWall.position.z = -(depth-wallThickness)/2;
  frontWall.position.y = height/2;
  scene.add(frontWall);
  
  // Paret lateral esquerra
  const leftWallGeometry = new THREE.BoxGeometry(wallThickness, height, depth);
  const leftWall = new THREE.Mesh(leftWallGeometry, sideWallMaterial);
  leftWall.position.x = -(width-wallThickness)/2;
  leftWall.position.y = height/2;
  scene.add(leftWall);
  
  return { floor, frontWall, leftWall };
}