import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.css'
import './assets/modal.css'; // Només importem el CSS

const app = createApp(App)
app.config.devtools = false
app.mount('#app')