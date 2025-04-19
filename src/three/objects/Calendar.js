import * as THREE from 'three';
import { getMaterials } from '../../utils/materials.js';

export function createCalendar(scene, roomConfig) {
    const { width, depth, height, wallThickness } = roomConfig;
    const { wallMaterial } = getMaterials();
    
    // Dimensions del calendari
    const calendarWidth = 0.5;
    const calendarHeight = 0.7;
    const calendarDepth = 0.03;
    
    // Crear textura del calendario
    const calendarTexture = createCalendarTexture();
    
    // Posición en la pared IZQUIERDA donde no hay ni estantería ni mesa
    const posX = -(width-wallThickness)/6 -1;  // Pared izquierda
    const posY = 1.8;  // Altura
    const posZ = -2.33;  // Centrado en Z
    
    // Geometria i material del calendari (invertimos depth y width debido a la rotación)
    const calendarGeometry = new THREE.BoxGeometry(calendarDepth, calendarHeight, calendarWidth);
    
    // Crear materiales para las diferentes caras
    // [+X, -X, +Y, -Y, +Z, -Z] es el orden de los materiales
    // Con la rotación, necesitamos poner la textura en el material -X (índice 1)
    const materials = [
        new THREE.MeshBasicMaterial({ map: calendarTexture }), // +X (cara visible tras rotar)
        new THREE.MeshBasicMaterial({ color: 0xCCCCCC }), // -X 
        new THREE.MeshBasicMaterial({ color: 0xCCCCCC }), // +Y
        new THREE.MeshBasicMaterial({ color: 0xCCCCCC }), // -Y
        new THREE.MeshBasicMaterial({ color: 0xCCCCCC }), // +Z
        new THREE.MeshBasicMaterial({ color: 0xCCCCCC })  // -Z
    ];
    
    // Crear el calendari
    const calendarMesh = new THREE.Mesh(calendarGeometry, materials);
    calendarMesh.position.set(posX, posY, posZ);
    calendarMesh.rotation.y = -Math.PI / 2;  // Rotación inversa para que apunte al interior desde la pared izquierda
    
    // Afegir el calendari a l'escena
    scene.add(calendarMesh);
    
    return calendarMesh;
}

// Función para crear la textura del calendario
function createCalendarTexture() {
    // Crear un canvas para dibujar el calendario
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 724;
    const context = canvas.getContext('2d');
    
    // Rellenar el fondo del calendario
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Obtener la fecha actual
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-11
    
    // Nombres de los meses en español
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    // Dibujar el nombre del mes y el año
    context.fillStyle = '#FF5733';
    context.fillRect(0, 0, canvas.width, 100);
    context.font = 'bold 40px Arial';
    context.fillStyle = '#FFFFFF';
    context.textAlign = 'center';
    context.fillText(`${monthNames[month]} ${year}`, canvas.width / 2, 60);
    
    // Calcular el número de días en el mes
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Obtener el primer día del mes (0 = Domingo, 1 = Lunes, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Dibujar los días de la semana
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    context.font = '24px Arial';
    context.fillStyle = '#333333';
    
    const cellWidth = canvas.width / 7;
    const dayHeaderY = 140;
    
    // Dibujar encabezados de días
    for (let i = 0; i < 7; i++) {
        context.fillText(daysOfWeek[i], i * cellWidth + cellWidth / 2, dayHeaderY);
    }
    
    // Dibujar los números de los días
    context.font = '30px Arial';
    const startY = 180;
    const cellHeight = (canvas.height - startY) / 6; // Máximo 6 filas para los días
    
    let day = 1;
    let currentDay = now.getDate(); // Día actual
    
    // Bucle por filas
    for (let row = 0; row < 6 && day <= daysInMonth; row++) {
        // Bucle por columnas (días de la semana)
        for (let col = 0; col < 7 && day <= daysInMonth; col++) {
            // Saltar días hasta llegar al primer día del mes
            if (row === 0 && col < firstDayOfMonth) {
                continue;
            }
            
            const x = col * cellWidth + cellWidth / 2;
            const y = startY + row * cellHeight + 30;
            
            // Destacar el día actual
            if (day === currentDay) {
                context.fillStyle = '#FF5733';
                context.beginPath();
                context.arc(x, y - 15, 20, 0, Math.PI * 2);
                context.fill();
                context.fillStyle = '#FFFFFF';
            } else {
                context.fillStyle = '#333333';
            }
            
            context.fillText(day.toString(), x, y);
            day++;
        }
    }
    
    // Crear textura de Three.js a partir del canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
}
