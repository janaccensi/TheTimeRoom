<template>
  <div v-if="selectedObject" 
       class="info-panel"
       :class="{ active: isActive }">
    
    <div class="panel-header">
      <h2>{{ selectedObject.name }}</h2>
      <button @click="close" class="close-btn">×</button>
    </div>
    
    <div class="panel-content">
      <!-- Contenido específico del PC Gaming -->
      <div v-if="selectedObject.type === 'computer'">
        <img src="/images/gaming-pc.jpg" alt="Gaming PC" class="info-image">
        <p class="info-desc">Ordenador gaming de alto rendimiento con iluminación RGB. 
        Diseñado para ofrecer máxima potencia en los juegos más exigentes y trabajos de desarrollo.</p>
        
        <div class="info-details">
          <div class="detail-item">
            <strong>CPU:</strong> {{ selectedObject.specs.cpu }}
          </div>
          <div class="detail-item">
            <strong>GPU:</strong> {{ selectedObject.specs.gpu }}
          </div>
          <div class="detail-item">
            <strong>RAM:</strong> {{ selectedObject.specs.ram }}
          </div>
          <div class="detail-item">
            <strong>Almacenamiento:</strong> {{ selectedObject.specs.storage }}
          </div>
          <div class="detail-item">
            <strong>Sistema de refrigeración:</strong> Líquida RGB
          </div>
        </div>
        
        <div class="info-price">
          <span class="price">{{ selectedObject.specs.price }}</span>
          <button class="buy-btn">Comprar ahora</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoPanel',
  props: {
    selectedObject: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  watch: {
    selectedObject(newVal) {
      if (newVal) {
        // Animación de apertura
        this.isActive = false;
        setTimeout(() => {
          this.isActive = true;
        }, 50);
      }
    }
  },
  methods: {
    close() {
      this.isActive = false;
      // Emitir evento para limpiar la selección
      setTimeout(() => {
        this.$emit('close');
      }, 300); // Esperar a que termine la animación
    }
  }
}
</script>

<style scoped>
.info-panel {
  position: fixed;
  top: 50%;
  right: -400px; /* Comienza fuera de la pantalla */
  transform: translateY(-50%);
  width: 350px;
  max-height: 80vh;
  background-color: #ffffff;
  border-radius: 10px 0 0 10px;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: right 0.3s ease-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.info-panel.active {
  right: 0;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #2c3e50;
  color: white;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.panel-content {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
}

.info-image {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
  object-fit: cover;
  height: 180px;
}

.info-desc {
  color: #555;
  line-height: 1.5;
  margin-bottom: 20px;
}

.info-details {
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.detail-item:last-child {
  border-bottom: none;
}

.info-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.buy-btn {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.buy-btn:hover {
  background-color: #1e2b38;
}
</style>