<template>
  <div class="scene-container">
    <canvas ref="canvas" class="webgl"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import useRoom from '../composables/useRoom';

export default {
  name: 'Room3D',
  setup() {
    const canvas = ref(null);
    let cleanupFunction = null;
    
    onMounted(() => {
      if (canvas.value) {
        cleanupFunction = useRoom(canvas.value);
      }
    });
    
    onBeforeUnmount(() => {
      if (cleanupFunction) {
        cleanupFunction();
      }
    });
    
    return { canvas };
  }
}
</script>

<!-- No hi ha estils locals, ara tots estan al fitxer global -->