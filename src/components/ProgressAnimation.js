export class ProgressAnimationService {
    static showProgressAnimation(category, activityType, message = null) {
      // Crear el contenedor modal para la animación
      const animContainer = document.createElement('div');
      animContainer.className = 'progress-animation-container';
      
      // Color basado en la categoría
      const hue = this.getHueFromString(category);
      const color = `hsl(${hue}, 70%, 50%)`;
      
      // Mensaje predeterminado según el tipo de actividad si no se proporciona uno personalizado
      const defaultMessage = activityType === 'cleaning' ? 
        'Limpieza registrada correctamente' : 
        (activityType === 'reading' ? 'Lectura registrada correctamente' : 'Tarea registrada correctamente');
      
      // Usar el mensaje personalizado si se proporciona
      const displayMessage = message || defaultMessage;
      
      // Contenido de la animación con la misma tipografía que ActivityModal
      animContainer.innerHTML = `
        <div class="progress-animation-content">
          <div class="progress-animation-header">
            <h3>¡Actividad añadida!</h3>
            <p>${displayMessage}</p>
          </div>
          
          <div class="progress-item">
            <div class="progress-label">
              <span class="progress-category">${category}</span>
              <span class="progress-percentage">0%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 0%; background-color: ${color}"></div>
            </div>
          </div>
          
          <div class="progress-message">Actualizando progreso...</div>
        </div>
      `;
      
      document.body.appendChild(animContainer);
      
      // Mostrar con animación
      setTimeout(() => {
        animContainer.classList.add('active');
        
        // Animar la barra después de un breve retraso
        setTimeout(() => {
          const progressBar = animContainer.querySelector('.progress-bar');
          const percentageText = animContainer.querySelector('.progress-percentage');
          const messageText = animContainer.querySelector('.progress-message');
          
          // Animar el incremento hasta 100%
          let width = 0;
          const interval = setInterval(() => {
            if (width >= 100) {
              clearInterval(interval);
              messageText.textContent = '¡Completado!';
              
              // Cerrar después de mostrar por completo
              setTimeout(() => {
                animContainer.classList.remove('active');
                setTimeout(() => document.body.removeChild(animContainer), 300);
              }, 800);
            } else {
              width += 2;
              progressBar.style.width = width + '%';
              percentageText.textContent = width + '%';
            }
          }, 15);
        }, 300);
      }, 10);
    }
    
    static getHueFromString(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash % 360;
    }
  }
  
  // Añadir estilos
  if (!document.getElementById('progress-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'progress-animation-styles';
    style.textContent = `
      .progress-animation-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 0.3s, transform 0.3s;
        pointer-events: none;
        font-family: 'Nunito', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      
      .progress-animation-container.active {
        opacity: 1;
        transform: scale(1);
        pointer-events: all;
      }
      
      .progress-animation-content {
        background-color: white;
        border-radius: 12px;
        padding: 24px;
        width: 400px;
        max-width: 90%;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }
      
      .progress-animation-header {
        text-align: center;
        margin-bottom: 20px;
      }
      
      .progress-animation-header h3 {
        margin: 0 0 8px;
        font-size: 1.5rem;
        color: #2c3e50;
        font-weight: 600;
      }
      
      .progress-animation-header p {
        margin: 0;
        color: #7f8c8d;
        font-size: 1rem;
      }
      
      .progress-item {
        margin-bottom: 20px;
      }
      
      .progress-label {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-weight: 500;
      }
      
      .progress-category {
        font-weight: 600;
        color: #2c3e50;
      }
      
      .progress-percentage {
        color: #3498db;
        font-weight: 600;
      }
      
      .progress-bar-container {
        height: 16px;
        background-color: #f5f5f5;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05) inset;
      }
      
      .progress-bar {
        height: 100%;
        border-radius: 8px;
        transition: width 0.1s ease-in-out;
        width: 0%;
      }
      
      .progress-message {
        text-align: center;
        font-size: 14px;
        color: #7f8c8d;
        font-style: italic;
        height: 20px;
      }
    `;
    document.head.appendChild(style);
  }