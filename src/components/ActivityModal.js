import { ActivitiesMockData } from "../models/ActivitiesMockData";
import {ProgressAnimationService} from "../components/ProgressAnimation";


export class ActivityModal {
  constructor() {
    this.modal = null;
    this.formModal = null;
    this.currentObject = null;
    this.onSave = null;
    this.init();
    
    // Añadimos actividades simuladas si no hay datos
    this.addMockActivities();

    // Escuchamos eventos de actividades de calendario
    document.addEventListener('calendar-task-completed', () => {
      // Actualizamos estadísticas cuando se completa una tarea del calendario
      if (this.currentObject) {
        this.loadObjectStats(this.currentObject.userData.activityType || 'reading');
      }
      this.loadCategoryStats();
    });
    
    document.addEventListener('calendar-task-uncompleted', () => {
      // Actualizamos estadísticas cuando una tarea cambia a no completada
      if (this.currentObject) {
        this.loadObjectStats(this.currentObject.userData.activityType || 'reading');
      }
      this.loadCategoryStats();
    });
    
    // Escuchar eventos específicos de estudio
    document.addEventListener('study-activity-added', (event) => {
      console.log('[DEBUG] Actividad de estudio añadida:', event.detail.activity);
      if (this.currentObject && this.currentObject.userData.activityType === 'study') {
        this.loadObjectStats('study');
        this.loadCategoryStats('study');
      }
    });
    
    document.addEventListener('study-activity-updated', (event) => {
      console.log('[DEBUG] Actividad de estudio actualizada:', event.detail.activity);
      if (this.currentObject && this.currentObject.userData.activityType === 'study') {
        this.loadObjectStats('study');
        this.loadCategoryStats('study');
      }
    });
    
    document.addEventListener('study-activity-deleted', (event) => {
      console.log('[DEBUG] Actividad de estudio eliminada:', event.detail.activity);
      if (this.currentObject && this.currentObject.userData.activityType === 'study') {
        this.loadObjectStats('study');
        this.loadCategoryStats('study');
      }
    });
    
    // Escuchar eventos específicos de ocio
    document.addEventListener('leisure-activity-added', (event) => {
      console.log('[DEBUG] Actividad de ocio añadida:', event.detail.activity);
      if (this.currentObject && this.currentObject.userData.activityType === 'leisure') {
        this.loadObjectStats('leisure');
        this.loadCategoryStats('leisure');
      }
    });
    
    document.addEventListener('leisure-activity-updated', (event) => {
      console.log('[DEBUG] Actividad de ocio actualizada:', event.detail.activity);
      if (this.currentObject && this.currentObject.userData.activityType === 'leisure') {
        this.loadObjectStats('leisure');
        this.loadCategoryStats('leisure');
      }
    });
    
    document.addEventListener('leisure-activity-deleted', (event) => {
      console.log('[DEBUG] Actividad de ocio eliminada:', event.detail.activity);
      if (this.currentObject && this.currentObject.userData.activityType === 'leisure') {
        this.loadObjectStats('leisure');
        this.loadCategoryStats('leisure');
      }
    });
    
    // Escuchar eventos específicos de trabajo
    document.addEventListener('work-activity-added', (event) => {
      console.log('[DEBUG] Actividad de trabajo añadida:', event.detail.activity);
      if (this.currentObject && this.currentObject.userData.activityType === 'work') {
        this.loadObjectStats('work');
        this.loadCategoryStats('work');
      }
    });
    
    document.addEventListener('work-activity-updated', (event) => {
      console.log('[DEBUG] Actividad de trabajo actualizada:', event.detail.activity);
      if (this.currentObject && this.currentObject.userData.activityType === 'work') {
        this.loadObjectStats('work');
        this.loadCategoryStats('work');
      }
    });
    
    document.addEventListener('work-activity-deleted', (event) => {
      console.log('[DEBUG] Actividad de trabajo eliminada:', event.detail.activity);
      if (this.currentObject && this.currentObject.userData.activityType === 'work') {
        this.loadObjectStats('work');
        this.loadCategoryStats('work');
      }
    });
  }
  
  init() {
    // Primer modal (estadísticas y opciones)
    this.modal = document.createElement('div');
    this.modal.className = 'activity-modal hidden';
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('aria-labelledby', 'activity-title');
    
    this.modal.innerHTML = `
      <div class="modal-content stats-modal">
        <span class="close-button" aria-label="Cerrar">&times;</span>
        <h2 id="activity-title">Actividad</h2>
        
        <!-- Sección de actividad reciente -->
        <div class="activity-stats">
          <h3>Actividad reciente</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value" id="total-hours">0</div>
              <div class="stat-label">Horas totales</div>
            </div>
            <div class="stat-item">
              <div class="stat-value" id="last-session">-</div>
              <div class="stat-label">Última sesión</div>
            </div>
            <div class="stat-item">
              <div class="stat-value" id="sessions-count">0</div>
              <div class="stat-label">Sesiones</div>
            </div>
          </div>
        </div>
        
        <!-- Sección para mostrar las categorías y el progreso -->
        <div class="category-stats">
          <h3>Distribución por categorías</h3>
          <div id="categories-progress" class="categories-container">
            <!-- Aquí se insertarán las barras de progreso -->
            <div class="loading-categories">Cargando datos de categorías...</div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button id="view-history" class="secondary-button">Ver historial</button>
          <button id="add-activity" class="primary-button">Añadir actividad</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.modal);
    
    // Segundo modal (formulario)
    this.formModal = document.createElement('div');
    this.formModal.className = 'activity-modal hidden';
    this.formModal.setAttribute('role', 'dialog');
    this.formModal.setAttribute('aria-modal', 'true');
    this.formModal.setAttribute('aria-labelledby', 'form-title');
    this.formModal.setAttribute('aria-describedby', 'modal-description');
    
    this.formModal.innerHTML = `
        <div class="modal-content">
        <span class="close-button" aria-label="Cerrar">&times;</span>
        <h2 id="form-title">Registrar actividad</h2>
        
        <!-- Contenedor específico para los detalles del objeto para evitar superposición -->
        <div class="object-details-container">
          <p id="form-object-title" class="object-form-title"></p>
          <p id="form-activity-type" class="activity-type-indicator"></p>
        </div>
        
        <div id="modal-description" class="visually-hidden">Formulario para registrar horas de actividad</div>
        
        <div class="activity-form">
          <div class="form-group">
            <label for="activity-category">Categoría:</label>
            <select id="activity-category" aria-required="true" aria-label="Categoría de la actividad">
              <!-- Las opciones se llenarán dinámicamente según el tipo de actividad -->
            </select>
          </div>
          
          <!-- Nuevo campo de texto personalizado, inicialmente oculto -->
          <div class="form-group custom-category-group hidden" id="custom-category-container">
            <label for="custom-category">Tu categoría:</label>
            <input type="text" id="custom-category" placeholder="Introduce la categoría personalizada" 
              aria-label="Categoría personalizada">
          </div>
          
          <div class="form-group">
            <label for="activity-date">Fecha:</label>
            <input type="date" id="activity-date" aria-required="true" aria-label="Fecha de la actividad">
          </div>
          <div class="form-group">
            <label for="activity-hour">Hora:</label>
            <select id="activity-hour" aria-label="Hora de la actividad">
              <option value="0">00:00</option>
              <option value="1">01:00</option>
              <option value="2">02:00</option>
              <option value="3">03:00</option>
              <option value="4">04:00</option>
              <option value="5">05:00</option>
              <option value="6">06:00</option>
              <option value="7">07:00</option>
              <option value="8">08:00</option>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>              
              <option value="23">23:00</option>
            </select>
          </div>
          <div class="form-group">
            <label for="activity-time">Horas de actividad:</label>
            <input type="number" id="activity-time" min="0.25" max="24" step="0.25" value="1" aria-required="true" aria-label="Horas de actividad">
          </div>
          <div class="form-group">
            <label for="activity-notes">Notas:</label>
            <textarea id="activity-notes" rows="3" aria-label="Notas sobre la actividad"></textarea>
          </div>
          
          <!-- Botón para mostrar/ocultar campos adicionales -->
          <button type="button" id="show-more-activity-fields" class="secondary-button">Añadir más datos</button>
          
          <!-- Sección adicional inicialmente oculta -->
          <div id="additional-activity-fields" class="additional-fields" style="display: none;">
            <div class="form-group">
              <label for="activity-location">Ubicación:</label>
              <input type="text" id="activity-location" placeholder="Dirección o ubicación" aria-label="Ubicación de la actividad">
            </div>
            <div class="form-group">
              <label for="activity-urgency">Nivel de urgencia:</label>
              <select id="activity-urgency" aria-label="Nivel de urgencia de la actividad">
                <option value="baixa">Baja</option>
                <option value="normal" selected>Normal</option>
                <option value="alta">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
            <div class="form-group">
              <label for="activity-url">URL relacionado:</label>
              <input type="url" id="activity-url" placeholder="https://..." aria-label="URL relacionado con la actividad">
            </div>
            <div class="form-group">
              <label for="activity-guests">Invitados:</label>
              <input type="text" id="activity-guests" placeholder="Nombres separados por comas" aria-label="Personas invitadas a la actividad">
            </div>
          </div>
          
          <button id="save-activity" class="save-button">Guardar actividad</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.formModal);
    
    // Configuramos los eventos del primer modal
    const closeBtn = this.modal.querySelector('.close-button');
    closeBtn.addEventListener('click', () => this.hide());
    
    const viewHistoryBtn = this.modal.querySelector('#view-history');
    viewHistoryBtn.addEventListener('click', () => this.showHistory());
    
    const addActivityBtn = this.modal.querySelector('#add-activity');
    addActivityBtn.addEventListener('click', () => this.showActivityForm());
    
    // Configuramos los eventos del segundo modal
    const closeFormBtn = this.formModal.querySelector('.close-button');
    closeFormBtn.addEventListener('click', () => {
      this.formModal.classList.add('hidden');
      this.modal.classList.remove('hidden');
    });
    
    const saveBtn = this.formModal.querySelector('#save-activity');
    saveBtn.addEventListener('click', () => this.saveActivity());
    
    // Añadimos el evento para ESC según accesibilidad
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!this.formModal.classList.contains('hidden')) {
          this.formModal.classList.add('hidden');
          this.modal.classList.remove('hidden');
        } else if (!this.modal.classList.contains('hidden')) {
          this.hide();
        }
      }
    });

    const showMoreFieldsBtn = this.formModal.querySelector('#show-more-activity-fields');
    const additionalFields = this.formModal.querySelector('#additional-activity-fields');

    showMoreFieldsBtn.addEventListener('click', () => {
      if (additionalFields.style.display === 'none') {
        // Primero hacemos que el elemento sea visible pero con altura 0
        additionalFields.style.display = 'block';
        additionalFields.style.maxHeight = '0';
        additionalFields.style.overflow = 'hidden';
        additionalFields.style.transition = 'max-height 0.5s ease-in-out, opacity 0.4s ease-in-out';
        additionalFields.style.opacity = '0';
        
        // Forzamos un reflow antes de aplicar la nueva altura
        void additionalFields.offsetHeight;
        
        // Ahora ajustamos la altura y opacidad para hacer la animación
        additionalFields.style.maxHeight = '800px'; // Valor suficientemente grande
        additionalFields.style.opacity = '1';
        
        showMoreFieldsBtn.textContent = 'Mostrar menos datos';
        
        // Hacemos scroll suavemente hacia la sección
        setTimeout(() => {
          additionalFields.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      } else {
        // Animación para ocultar
        additionalFields.style.maxHeight = '0';
        additionalFields.style.opacity = '0';
        
        // Esperamos que termine la animación antes de ocultarlo completamente
        setTimeout(() => {
          additionalFields.style.display = 'none';
        }, 400); // Tiempo ligeramente inferior a la transición para evitar saltos
        
        showMoreFieldsBtn.textContent = 'Añadir más datos';
      }
    });
    
    // Inicializamos la fecha a hoy
    const dateInput = this.formModal.querySelector('#activity-date');
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    dateInput.value = dateStr;

    // Añadimos el event listener para detectar cuando se selecciona "Otros"
    const categorySelect = this.formModal.querySelector('#activity-category');
    categorySelect.addEventListener('change', () => {
      const customCategoryContainer = this.formModal.querySelector('#custom-category-container');
      if (categorySelect.value === 'Otros') {
        customCategoryContainer.classList.remove('hidden');
        setTimeout(() => {
          this.formModal.querySelector('#custom-category').focus();
        }, 100);
      } else {
        customCategoryContainer.classList.add('hidden');
      }
    });
  }
  
  /**
   * Muestra el modal para un objeto específico
   * @param {Object} object - El objeto 3D que se ha hecho clic
   */
  show(object) {
    this.currentObject = object;
    const objectType = object.userData.type || 'item';
    const activityType = object.userData.activityType || 'general';
    console.log(`Mostrando modal para ${objectType} (${activityType})`);
    
    // Actualizamos el título según el objeto
    const objectTitle = this.modal.querySelector('#activity-title');
    objectTitle.textContent = this.getActivityTypeTitle(activityType) || 'Actividad';
     
    // Cargamos las estadísticas del objeto
    this.loadObjectStats(activityType);
    
    // Cargamos las estadísticas de categorías
    this.loadCategoryStats(activityType);
    
    // Mostramos el modal
    this.modal.classList.remove('hidden');
  }
  

  
  /**
   * Obtiene el título descriptivo para cada tipo de actividad
   * @param {string} activityType - El tipo de actividad
   * @returns {string} - Título descriptivo
   */
  getActivityTypeTitle(activityType) {
    const titles = {
      'reading': 'Lectura',
      'work': 'Trabajo',
      'sport': 'Actividad física',
      'cleaning': 'Limpieza',
      'leisure': 'Tiempo libre',
      'study': 'Estudio'
    };
    return titles[activityType] || 'Actividad';
  }
  
  /**
   * Obtiene las categorías disponibles para un tipo de actividad, basadas en actividades existentes
   * @param {string} activityType - El tipo de actividad
   * @returns {Array} - Array con las categorías
   */
  getCategoriesForActivityType(activityType) {
    // Obtenemos las actividades del tipo especificado
    const storageKey = `${activityType}Activities`;
    const activities = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    // Obtenemos las tareas del calendario relacionadas con este tipo de actividad
    const calendarTasksRaw = JSON.parse(localStorage.getItem('calendar-tasks')) || {};
    const relatedTasks = [];
    
    // Buscamos tareas que coincidan con el tipo de actividad
    Object.values(calendarTasksRaw).forEach(tasks => {
      tasks.forEach(task => {
        if (task.activityType === activityType && task.category) {
          relatedTasks.push(task.category);
        }
      });
    });
    
    // Categorías por defecto que siempre estarán disponibles para cada tipo de actividad
    const defaultCategories = {
      'reading': ['Literatura Fantástica', 'Ciencia Ficción'],
      'work': ['Desarrollo', 'Reuniones'],
      'sport': ['Gimnasio', 'Correr'],
      'cleaning': ['Mantenimiento hogar', 'Organización'],
      'leisure': ['Series', 'Películas'],
      'study': ['Programación', 'Idiomas']
    };
    
    // Crear un Set para eliminar duplicados
    const uniqueCategories = new Set();
    
    // Añadir las categorías de las actividades registradas
    activities.forEach(activity => {
      if (activity.category) uniqueCategories.add(activity.category);
    });
    
    // Añadir categorías de tareas del calendario
    relatedTasks.forEach(category => uniqueCategories.add(category));
    
    // Añadir las categorías por defecto si no hay actividades registradas
    if (uniqueCategories.size === 0 && defaultCategories[activityType]) {
      defaultCategories[activityType].forEach(cat => uniqueCategories.add(cat));
    }
    
    // Convertir el Set a array y ordenar alfabéticamente
    const categoriesArray = Array.from(uniqueCategories).sort();
    
    // Aseguramos que "Otros" siempre está presente y al final
    if (!categoriesArray.includes('Otros')) {
      categoriesArray.push('Otros');
    } else {
      // Si ya existe, lo eliminamos y lo volvemos a añadir al final
      const index = categoriesArray.indexOf('Otros');
      categoriesArray.splice(index, 1);
      categoriesArray.push('Otros');
    }
    
    return categoriesArray.length > 0 ? categoriesArray : ['General', 'Otros'];
  }
  
  hide() {
    this.modal.classList.add('hidden');
    this.formModal.classList.add('hidden');
    this.currentObject = null;
  }
  
  showActivityForm() {
    // Ocultamos el primer modal y mostramos el formulario
    this.modal.classList.add('hidden');
    
    const objectType = this.currentObject.userData.type || 'item';
    const activityType = this.currentObject.userData.activityType || 'general';
    
    // Actualizamos la información del objeto en el formulario
    const formObjectTitle = this.formModal.querySelector('#form-object-title');
    formObjectTitle.textContent = this.currentObject.userData.title || 'Actividad';
    
    // Mostramos el tipo de actividad
    const formActivityType = this.formModal.querySelector('#form-activity-type');
    formActivityType.textContent = `Tipo: ${this.getActivityTypeTitle(activityType)}`;
    
    // Actualizamos las categorías disponibles
    this.updateCategoryOptions(activityType);
    
    // Actualizamos el título del formulario
    const formTitle = this.formModal.querySelector('#form-title');
    formTitle.textContent = `Registrar ${this.getActivityTypeTitle(activityType).toLowerCase()}`;
    
    // Mostramos el formulario
    this.formModal.classList.remove('hidden');
    
    // Focus al primer campo por accesibilidad
    setTimeout(() => {
      this.formModal.querySelector('#activity-date').focus();
    }, 100);
  }
  
  /**
   * Actualiza las opciones del selector de categorías según el tipo de actividad
   * @param {string} activityType - El tipo de actividad
   */
  updateCategoryOptions(activityType) {
    const categorySelect = this.formModal.querySelector('#activity-category');
    const customCategoryContainer = this.formModal.querySelector('#custom-category-container');
    
    categorySelect.innerHTML = '';
    
    const categories = this.getCategoriesForActivityType(activityType);
    
    // Aseguramos que "Otros" siempre es la última opción
    let otherOption = null;
    categories.forEach(category => {
      if (category !== 'Otros') {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      } else {
        // Guardamos la opción "Otros" para añadirla al final
        otherOption = category;
      }
    });
    
    // Añadimos "Otros" al final
    if (otherOption) {
      const option = document.createElement('option');
      option.value = otherOption;
      option.textContent = otherOption;
      categorySelect.appendChild(option);
    }
    
    // Si el objeto tiene una categoría predefinida, la seleccionamos
    if (this.currentObject.userData.category && categories.includes(this.currentObject.userData.category)) {
      categorySelect.value = this.currentObject.userData.category;
    }
    
    // Mostramos/ocultamos el campo personalizado según la opción seleccionada
    if (categorySelect.value === 'Otros') {
      customCategoryContainer.classList.remove('hidden');
    } else {
      customCategoryContainer.classList.add('hidden');
    }
  }
  
  showHistory() {
    const activityType = this.currentObject.userData.activityType || 'reading';
    const objectId = this.currentObject.userData.id;
    
    console.log(`Mostrando el historial de ${this.currentObject.userData.title} (${activityType})`);
    
    // Obtenemos las actividades para este objeto y tipo de actividad
    const actividades = this.getActivitiesByActivityType(activityType);
    
    // Mostramos el historial
    if (actividades.length > 0) {
      let mensaje = `Historial de actividades para "${this.currentObject.userData.title}":\n\n`;
      actividades.forEach((act, index) => {
        const date = new Date(act.date).toLocaleDateString('es-ES');
        mensaje += `${index + 1}. ${date}: ${act.hours} horas - ${act.category}\n`;
        if (act.notes) mensaje += `   Notas: ${act.notes}\n`;
      });
      alert(mensaje);
    } else {
      alert(`Aún no hay actividades registradas para "${this.currentObject.userData.title}".`);
    }
  }
  
  /**
   * Carga las estadísticas de actividades de un tipo específico
   * @param {string} objectId - El ID del objeto (ya no se utiliza)
   * @param {string} activityType - El tipo de actividad
   */
  loadObjectStats(activityType) {
    // Obtenemos la fecha de hoy para filtrar
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reseteamos la hora a 00:00:00
    
    // Obtener todas las actividades (directas y del calendario)
    const todas_actividades = this.getActivitiesByActivityType(activityType);
    
    console.log(`[DEBUG] Total actividades ${activityType} encontradas:`, todas_actividades.length);
    console.log('[DEBUG] Primeras 3 actividades:', todas_actividades.slice(0, 3));
    
    // Filtrar actividades anteriores a hoy
    const actividades = todas_actividades.filter(act => {
      const actDate = new Date(act.date || act.timestamp);
      actDate.setHours(0, 0, 0, 0); // Reseteamos la hora para comparar solo fechas
      return actDate <= today; // Solo actividades anteriores a hoy
    });
    
    // Actualizamos los elementos de estadística si existen
    const totalHoursElement = this.modal.querySelector('#total-hours');
    const lastSessionElement = this.modal.querySelector('#last-session');
    const sessionsCountElement = this.modal.querySelector('#sessions-count');
    
    // Calculamos las estadísticas solo de las actividades anteriores a hoy
    const totalHoras = actividades.reduce((sum, act) => {
      // Soportamos diferentes propiedades donde pueden estar las horas
      const hours = parseFloat(act.hours || act.duration || 0);
      console.log(`[DEBUG] Actividad ${act.category}, horas: ${hours} (original: ${act.hours || act.duration})`);
      return sum + (isNaN(hours) ? 0 : hours);
    }, 0);
    
    console.log(`[DEBUG] Total horas calculadas: ${totalHoras}`);
    
    // Actualizamos los elementos del DOM si existen
    if (totalHoursElement) totalHoursElement.textContent = totalHoras.toFixed(1);
    if (sessionsCountElement) sessionsCountElement.textContent = actividades.length;
    
    // Última sesión (ordenamos por fecha descendente y tomamos la primera)
    if (lastSessionElement && actividades.length > 0) {
      const sortedActivities = [...actividades].sort((a, b) => {
        // Ordenamos por fecha más reciente
        return new Date(b.date || b.timestamp) - new Date(a.date || a.timestamp);
      });
      
      const lastAct = sortedActivities[0];
      const lastDate = new Date(lastAct.date || lastAct.timestamp).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short'
      });
      
      lastSessionElement.textContent = lastDate;
    } else if (lastSessionElement) {
      lastSessionElement.textContent = '-';
    }
    
    // Guardamos los datos por si los necesitamos más adelante
    this._objectActivities = actividades;
    this._totalActivitiesHours = totalHoras;
    this._activitiesSessions = actividades.length;
  }
  
  loadCategoryStats(activityType) {
    // Si no se proporciona un tipo, utilizamos el tipo del objeto actual
    const currentType = activityType || (this.currentObject && this.currentObject.userData.activityType) || 'reading';
    
    // Obtenemos las actividades del tipo especificado
    const storageKey = `${currentType}Activities`;
    const activities = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Obtenemos tareas del calendario relacionadas con este tipo de actividad
    const calendarTasksRaw = JSON.parse(localStorage.getItem('calendar-tasks')) || {};
    const calendarActivities = [];

    // Convertimos las tareas del calendario a un formato similar
    Object.entries(calendarTasksRaw).forEach(([dateKey, tasks]) => {
      tasks.forEach(task => {
        // Solo contamos tareas completadas que coincidan con el tipo de actividad
        // O tareas con sourceType específico que coincida con el tipo actual
        if ((task.completed && task.activityType === currentType) || 
            (task.sourceType === currentType)) {
          calendarActivities.push({
            category: task.category || 'Otros',
            hours: task.duration || 1,
            timestamp: task.createdAt || new Date().toISOString()
          });
        }
      });
    });
    
    // Combinar todas las fuentes de actividades
    const allActivities = [...activities, ...calendarActivities];
    
    if (allActivities.length === 0) {
      const categoriesContainer = this.modal.querySelector('#categories-progress');
      categoriesContainer.innerHTML = `
        <p class="no-data-message">Aún no hay actividades registradas.</p>
      `;
      return;
    }
    
    // Agrupamos las actividades por categoría y sumamos las horas
    const categoryHours = {};
    let totalHours = 0;
    
    allActivities.forEach(activity => {
      const category = activity.category || 'Otros';
      if (!categoryHours[category]) {
        categoryHours[category] = 0;
      } 
      const hours = parseFloat(activity.hours || activity.duration || 0);
      categoryHours[category] += isNaN(hours) ? 0 : hours;
      totalHours += isNaN(hours) ? 0 : hours;
    });
    
    // Encontramos la categoría con más horas para escalar los porcentajes
    const maxHours = Math.max(...Object.values(categoryHours));
    
    // Calculamos los porcentajes y creamos las barras de progreso
    const categoriesContainer = this.modal.querySelector('#categories-progress');
    categoriesContainer.innerHTML = '';
    
    Object.entries(categoryHours)
      .sort((a, b) => b[1] - a[1]) // Ordenamos por horas (descendente)
      .forEach(([category, hours]) => {
        // Usamos toFixed para mostrar siempre un decimal en el porcentaje
        const realPercentage = totalHours > 0 ? (hours / totalHours * 100).toFixed(1) : '0.0';
        
        const scaledPercentage = maxHours > 0 ? Math.round((hours / maxHours) * 100) : 0;
        
        // También para las horas
        const formattedHours = hours.toFixed(1);
        
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category-item';
        
        // Creamos un color dinámico basado en el nombre de la categoría
        const hue = this.getHueFromString(category);
        const color = `hsl(${hue}, 70%, 50%)`;
        
        categoryElement.innerHTML = `
          <div class="category-label">
            <span class="category-name">${category}</span>
            <span class="category-percentage">${realPercentage}%</span>
          </div>
          <div class="progress-container">
            <div class="progress-bar" style="width: ${scaledPercentage}%; background-color: ${color}"></div>
          </div>
          <div class="category-hours">${formattedHours} horas</div>
        `;

        categoriesContainer.appendChild(categoryElement);
      });
  }
  
  getHueFromString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash % 360;
  }
  
  getActivitiesByActivityType(activityType) {
    // Recuperamos las actividades del tipo específico
    const storageKey = `${activityType}Activities`;
    const directActivities = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    // Debug: Verificar las actividades directas recuperadas
    console.log(`[DEBUG] Actividades directas de tipo ${activityType}:`, directActivities.length);
    
    // Obtenemos también las actividades del calendario del mismo tipo
    const calendarTasks = JSON.parse(localStorage.getItem('calendar-tasks')) || {};
    const calendarActivities = [];
    
    // Convertir tareas del calendario al mismo formato
    Object.entries(calendarTasks).forEach(([dateKey, tasks]) => {
      tasks.forEach(task => {
        if (task.sourceType === activityType) {
          // Convertir la tarea del calendario al formato de actividad
          const [year, month, day] = dateKey.split('-').map(Number);
          
          // Asegurar que siempre tengamos un valor para hours y duration
          const taskHours = parseFloat(task.duration || task.hours || 1);
          
          calendarActivities.push({
            category: task.category || 'Otros',
            date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
            hours: taskHours,
            duration: taskHours,
            timestamp: task.createdAt,
            completed: task.completed || false
          });
        }
      });
    });
    
    console.log(`[DEBUG] Actividades de calendario de tipo ${activityType}:`, calendarActivities.length);
    
    // Verificar que todas las actividades tienen el campo hours correctamente
    const allActivities = [...directActivities, ...calendarActivities];
    
    // Debug: Verificar la estructura de las actividades
    if (allActivities.length > 0) {
      const sample = allActivities[0];
      console.log(`[DEBUG] Ejemplo de actividad ${activityType}:`, {
        category: sample.category,
        hours: sample.hours,
        duration: sample.duration
      });
    }
    
    return allActivities;
  }
  
  setOnSave(callback) {
    this.onSave = callback;
  }
  
  /**
   * Guarda una nueva actividad en localStorage y dispara los eventos correspondientes
   */
  saveActivity() {
    if (!this.currentObject) return;

    const activityType = this.currentObject.userData.activityType || 'reading';    
    const categorySelect = this.formModal.querySelector('#activity-category');
    const customCategoryInput = this.formModal.querySelector('#custom-category');
    const dateInput = this.formModal.querySelector('#activity-date');
    const hourSelect = this.formModal.querySelector('#activity-hour');
    const timeInput = this.formModal.querySelector('#activity-time');
    const notesInput = this.formModal.querySelector('#activity-notes');

    // Comprobamos que exista el selector de hora
    if (!hourSelect) {
      console.error("El selector de hora no se ha encontrado");
      return;
    }
    
    const locationInput = this.formModal.querySelector('#activity-location');
    const urgencySelect = this.formModal.querySelector('#activity-urgency');
    const urlInput = this.formModal.querySelector('#activity-url');
    const guestsInput = this.formModal.querySelector('#activity-guests');

    const hours = parseFloat(timeInput.value);
    if (isNaN(hours)) {
      alert('Por favor, introduce un número válido de horas');
      return;
    }

    if(this.currentObject.userData.type === 'broom') {
      // ... existing code for broom ...
    }
    
    // Determinamos la categoría final, usando el valor personalizado si se ha seleccionado "Otros"
    let finalCategory = categorySelect.value;
    if (finalCategory === 'Otros' && customCategoryInput.value.trim()) {
      finalCategory = customCategoryInput.value.trim();
    }

    // Crear fecha con hora correcta para el timestamp
    const selectedDate = new Date(dateInput.value);
    selectedDate.setHours(parseInt(hourSelect.value, 10), 0, 0);
    const timestamp = selectedDate.toISOString();
    
    // Preparamos los datos de la actividad con los campos comunes
    const activityData = {
      objectId: this.currentObject.userData.id,
      objectTitle: this.currentObject.userData.title,
      type: activityType,
      category: finalCategory,
      date: dateInput.value,
      hour: parseInt(hourSelect.value, 10),
      hours: hours,
      duration: hours,  // Asegurarse que duration también está establecido
      notes: notesInput.value,
      timestamp: timestamp,
      completed: true,
      sourceType: activityType  // Importante: añadir sourceType para identificar en el calendario
    };
    
    // Debug log
    console.log(`[DEBUG] Guardando actividad ${activityType}:`, activityData);
    
    // Añadimos los campos de los campos adicionales si están visibles
    const additionalFields = this.formModal.querySelector('#additional-activity-fields');
    if (additionalFields && additionalFields.style.display !== 'none') {
      if (locationInput) activityData.location = locationInput.value;
      if (urgencySelect) activityData.urgency = urgencySelect.value;
      if (urlInput) activityData.url = urlInput.value;
      if (guestsInput) activityData.guests = guestsInput.value;
    }
    
    // Obtenemos las actividades existentes del tipo correspondiente y añadimos la nueva
    const storageKey = `${activityType}Activities`;
    const activities = JSON.parse(localStorage.getItem(storageKey)) || [];
    activities.push(activityData);
    localStorage.setItem(storageKey, JSON.stringify(activities));
    
    // Actualizamos también el almacenamiento general de actividades por compatibilidad
    const allActivities = JSON.parse(localStorage.getItem('userActivities')) || [];
    allActivities.push(activityData);
    localStorage.setItem('userActivities', JSON.stringify(allActivities));
    
    // Disparar dos eventos: uno para el calendario y otro para actualizar el objeto visual
    const calendarEvent = new CustomEvent(`${activityType}-activity-added`, { 
      detail: { activity: activityData }
    });
    document.dispatchEvent(calendarEvent);
    
    // Disparar evento específico para actualizar el objeto visual correspondiente
    const updateEvent = new CustomEvent(`${activityType}-object-update-needed`, {
      detail: { 
        type: activityType, 
        activity: activityData 
      }
    });
    document.dispatchEvent(updateEvent);
    
    // También mantenemos el evento genérico por compatibilidad
    const genericEvent = new CustomEvent('activity-added', {
      detail: { 
        type: activityType, 
        activity: activityData 
      }
    });
    document.dispatchEvent(genericEvent);
    
    // Actualizamos estadísticas y cerramos el formulario
    this.loadObjectStats(activityType);
    this.loadCategoryStats(activityType);
    this.formModal.classList.add('hidden');
    
    // Mostrar animación de progreso
    ProgressAnimationService.showProgressAnimation(activityData.category, activityType);
    
    // Volver a mostrar modal principal después de la animación
    setTimeout(() => {
      this.loadObjectStats(activityType);
      this.loadCategoryStats(activityType);
      this.modal.classList.remove('hidden');
    }, 2800);
  }

  // Añadimos método para generar actividades de prueba
  addMockActivities() {
    // Comprobamos si ya existen actividades
    ActivitiesMockData.ensureMockActivitiesExist();
  }
}