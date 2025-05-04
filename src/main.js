import { createApp } from 'vue'
import App from './App.vue'
import './assets/unified.css' // CSS unificado con todos los estilos de la aplicación

const app = createApp(App)
app.config.devtools = false
app.mount('#app')