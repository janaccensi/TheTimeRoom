export class SportActivityModal {
  constructor() {
    this.modal = null;
    this.formModal = null;
    this.currentDumbbell = null;
    this.onSave = null;
    
    // Inicializar de forma asíncrona
    this.initialize().then(() => {
      this.addMockSportsActivities();
      this.setupEventListeners();
      this.checkForNewDumbbells(); // Verificar al iniciar la app
    });
  }
  
  async initialize() {
    try {
      // Cargar plantillas mediante fetch
      const [modalTemplate, formTemplate] = await Promise.all([
        fetch('/src/templates/sport-modal.html').then(r => r.text()),
        fetch('/src/templates/sport-form.html').then(r => r.text())
      ]);
      
      // Crear modales con el HTML cargado
      this.createModals(modalTemplate, formTemplate);
    } catch (error) {
      console.error('Error cargando plantillas:', error);
      // Plan B: Cargar sin plantillas
      this.createModalsWithoutTemplates();
    }
  }
  
  createModals(modalHTML, formHTML) {
    // Modal principal (estadísticas)
    this.modal = document.createElement('div');
    this.modal.className = 'activity-modal sport-modal hidden';
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('aria-labelledby', 'dumbbell-title');
    
    this.modal.innerHTML = modalHTML;
    document.body.appendChild(this.modal);
    
    // Modal de formulario
    this.formModal = document.createElement('div');
    this.formModal.className = 'activity-modal sport-form-modal hidden';
    this.formModal.setAttribute('role', 'dialog');
    this.formModal.setAttribute('aria-modal', 'true');
    this.formModal.setAttribute('aria-labelledby', 'form-title');
    
    this.formModal.innerHTML = formHTML;
    document.body.appendChild(this.formModal);
    
    // Inicializar fecha actual
    const dateInput = this.formModal.querySelector('#activity-date');
    const today = new Date();
    dateInput.value = today.toISOString().split('T')[0];
  }
  
  setupEventListeners() {
    // Configurar eventos del modal principal
    this.modal.querySelector('.close-button').addEventListener('click', () => this.hide());
    this.modal.querySelector('#view-history').addEventListener('click', () => this.showHistory());
    this.modal.querySelector('#add-activity').addEventListener('click', () => this.showActivityForm());
    
    // Configurar eventos del formulario
    this.formModal.querySelector('.close-button').addEventListener('click', () => {
      this.formModal.classList.add('hidden');
      this.modal.classList.remove('hidden');
    });
    
    this.formModal.querySelector('#save-activity').addEventListener('click', () => this.saveActivity());
    
    // Añadir evento para ESC según accesibilidad
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
  }
  
  show(dumbbell) {
    this.currentDumbbell = dumbbell;
    
    // Actualizar título
    const title = this.modal.querySelector('#dumbbell-title');
    title.textContent = dumbbell.userData.title || "Actividad deportiva";
    
    // Cargar estadísticas
    this.loadDumbbellStats(dumbbell.userData.id);
    this.loadCategoryStats();
    
    // Mostrar modal
    this.modal.classList.remove('hidden');
  }
  
  hide() {
    this.modal.classList.add('hidden');
    this.formModal.classList.add('hidden');
    this.currentDumbbell = null;
  }
  
  showActivityForm() {
    this.modal.classList.add('hidden');
    
    // Actualizar título en el formulario
    const formTitle = this.formModal.querySelector('#form-dumbbell-title');
    formTitle.textContent = this.currentDumbbell.userData.title || "Entrenamiento";
    
    this.formModal.classList.remove('hidden');
    
    // Focus al primer campo
    setTimeout(() => {
      this.formModal.querySelector('#activity-date').focus();
    }, 100);
  }
  
  loadDumbbellStats(dumbbellId) {
    if (!dumbbellId) return;
    
    // Obtener actividades deportivas específicas de esta mancuerna
    const activities = this.getActivitiesByDumbbellId(dumbbellId);
    
    // Obtener tareas del calendario relacionadas con deportes
    const calendarTasksRaw = JSON.parse(localStorage.getItem('calendar-tasks')) || {};
    const calendarActivities = [];
    
    // Lista de categorías deportivas
    const sportCategories = [
      "Gimnasio", "Correr", "Baloncesto", "Fútbol", "Natación", "Ciclismo", "Yoga"
    ];
    
    Object.entries(calendarTasksRaw).forEach(([dateKey, tasks]) => {
      tasks.forEach(task => {
        // Verificar que sea una tarea completada y de tipo deportivo
        if (task.completed && 
            (sportCategories.includes(task.category) || task.sourceType === 'sport')) {
          
          // Solo incluir si está explícitamente asignada a esta mancuerna
          // o si no tiene mancuerna asignada pero estamos viendo esta mancuerna ahora
          if ((task.sourceId === dumbbellId) || 
              (dumbbellId === this.currentDumbbell?.userData?.id && !task.sourceId)) {
            calendarActivities.push({
              category: task.category,
              hours: task.duration || 1,
              timestamp: task.createdAt || new Date().toISOString()
            });
          }
        }
      });
    });
    
    // Combinar fuentes de datos
    const allActivities = [...activities, ...calendarActivities];
    
    // Actualizar elementos estadísticos
    const totalHoursElement = this.modal.querySelector('#total-hours');
    const lastSessionElement = this.modal.querySelector('#last-session');
    const sessionsCountElement = this.modal.querySelector('#sessions-count');
    
    // Calcular total de horas
    const totalHoras = allActivities.reduce((sum, act) => {
      const hours = parseFloat(act.hours || act.duration || 0);
      return sum + (isNaN(hours) ? 0 : hours);
    }, 0);
    totalHoursElement.textContent = totalHoras.toFixed(1);
    
    // Número de sesiones
    sessionsCountElement.textContent = activities.length;
    
    // Última sesión
    if (activities.length > 0) {
      const sortedActivities = [...activities].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      
      const lastDate = new Date(sortedActivities[0].date);
      const formatOptions = { day: 'numeric', month: 'short' };
      lastSessionElement.textContent = lastDate.toLocaleDateString('es-ES', formatOptions);
    } else {
      lastSessionElement.textContent = '-';
    }
    
    // Verificar si hay que crear nuevas mancuernas
    this.checkForNewDumbbells();
  }
  
  getActivitiesByDumbbellId(dumbbellId) {
    const activities = JSON.parse(localStorage.getItem('sportActivities')) || [];
    return activities.filter(act => act.dumbbellId === dumbbellId);
  }
  
  getAllSportActivities() {
    return JSON.parse(localStorage.getItem('sportActivities')) || [];
  }
  
  loadCategoryStats() {
    // Para estadísticas globales, cargar TODAS las actividades deportivas
    const sportActivities = this.getAllSportActivities();
    
    // Obtener tareas del calendario relacionadas con deportes
    const calendarTasksRaw = JSON.parse(localStorage.getItem('calendar-tasks')) || {};
    const calendarActivities = [];
    
    // Lista de categorías deportivas
    const sportCategories = [
      "Gimnasio", "Correr", "Baloncesto", "Fútbol", "Natación", "Ciclismo", "Yoga"
    ];
    
    Object.entries(calendarTasksRaw).forEach(([dateKey, tasks]) => {
      tasks.forEach(task => {
        // Solo incluir tareas deportivas completadas
        if (task.completed && 
            (sportCategories.includes(task.category) || task.sourceType === 'sport') &&
            task.sourceType !== 'reading') {
          calendarActivities.push({
            category: task.category,
            hours: task.duration || 1,
            timestamp: task.createdAt || new Date().toISOString()
          });
        }
      });
    });
    
    // Combinar fuentes de datos
    const allActivities = [...sportActivities, ...calendarActivities];
    
    if (allActivities.length === 0) {
      const categoriesContainer = this.modal.querySelector('#categories-progress');
      categoriesContainer.innerHTML = `
        <p class="no-data-message">Aún no hay actividades registradas.</p>
      `;
      return;
    }
    
    // Agrupar por categoría
    const categoryHours = {};
    let totalHours = 0;
    
    allActivities.forEach(activity => {
      const category = activity.category;
      if (!categoryHours[category]) {
        categoryHours[category] = 0;
      }
      const hours = parseFloat(activity.hours || activity.duration || 0);
      categoryHours[category] += isNaN(hours) ? 0 : hours;
      totalHours += isNaN(hours) ? 0 : hours;
    });
    
    // Encontrar categoría con más horas
    const maxHours = Math.max(...Object.values(categoryHours));
    
    // Crear barras de progreso
    const categoriesContainer = this.modal.querySelector('#categories-progress');
    categoriesContainer.innerHTML = '';
    
    Object.entries(categoryHours)
      .sort((a, b) => b[1] - a[1])
      .forEach(([category, hours]) => {
        const realPercentage = totalHours > 0 ? (hours / totalHours * 100).toFixed(1) : '0.0';
        const scaledPercentage = maxHours > 0 ? Math.round((hours / maxHours) * 100) : 0;
        const formattedHours = hours.toFixed(1);
        
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category-item';
        
        // Color basado en la categoría
        const color = this.getSportCategoryColor(category);
        
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
  
  getSportCategoryColor(category) {
    const colorMap = {
      'Gimnasio': '#d35400',
      'Correr': '#16a085',
      'Baloncesto': '#8e44ad',
      'Fútbol': '#27ae60',
      'Natación': '#3498db',
      'Ciclismo': '#c0392b',
      'Yoga': '#2980b9',
      'Otro': '#95a5a6'
    };
    
    return colorMap[category] || '#95a5a6';
  }
  
  saveActivity() {
    if (!this.currentDumbbell) return;
    
    const categorySelect = this.formModal.querySelector('#activity-category');
    const dateInput = this.formModal.querySelector('#activity-date');
    const timeInput = this.formModal.querySelector('#activity-time');
    const notesInput = this.formModal.querySelector('#activity-notes');
    
    const hours = parseFloat(timeInput.value);
    if (isNaN(hours)) {
      alert('Por favor, introduce un número válido de horas');
      return;
    }
    
    const activityData = {
      dumbbellId: this.currentDumbbell.userData.id,
      dumbbellTitle: this.currentDumbbell.userData.title || "Entrenamiento",
      category: categorySelect.value,
      date: dateInput.value,
      hours: hours,
      notes: notesInput.value,
      timestamp: new Date().toISOString(),
      sourceType: 'sport',
      completed: true,
      duration: hours
    };
    
    // Guardar actividad
    const activities = JSON.parse(localStorage.getItem('sportActivities')) || [];
    activities.push(activityData);
    localStorage.setItem('sportActivities', JSON.stringify(activities));
    
    // Disparar eventos
    const eventCalendar = new CustomEvent('sport-activity-added', { 
      detail: { activity: activityData }
    });
    document.dispatchEvent(eventCalendar);
    
    // Actualizar estadísticas
    this.loadDumbbellStats(this.currentDumbbell.userData.id);
    this.loadCategoryStats();
    
    // Cerrar formulario
    this.formModal.classList.add('hidden');
    this.modal.classList.remove('hidden');
    
    // Comprobar si hay que crear nuevas mancuernas
    this.checkForNewDumbbells();
  }
  
  showHistory() {
    // Implementación básica para mostrar historial
    const activities = this.getActivitiesByDumbbellId(this.currentDumbbell.userData.id);
    
    if (activities.length > 0) {
      let message = `Historial de actividades para "${this.currentDumbbell.userData.title}":\n\n`;
      activities.forEach((act, index) => {
        message += `${index + 1}. ${act.date}: ${act.category} - ${act.hours} horas\n`;
        if (act.notes) message += `   Notas: ${act.notes}\n`;
      });
      alert(message);
    } else {
      alert(`Aún no hay actividades registradas para "${this.currentDumbbell.userData.title}".`);
    }
  }
  
  checkForNewDumbbells() {
    // Obtener todas las actividades deportivas
    const activities = this.getAllSportActivities();
    
    // Obtener tareas del calendario relacionadas con deportes
    const calendarTasksRaw = JSON.parse(localStorage.getItem('calendar-tasks')) || {};
    const calendarActivities = [];
    
    // Lista de categorías deportivas
    const sportCategories = [
      "Gimnasio", "Correr", "Baloncesto", "Fútbol", "Natación", "Ciclismo", "Yoga"
    ];
    
    Object.entries(calendarTasksRaw).forEach(([dateKey, tasks]) => {
      tasks.forEach(task => {
        if (task.completed && 
            (sportCategories.includes(task.category) || task.sourceType === 'sport') &&
            task.sourceType !== 'reading') {
          calendarActivities.push({
            category: task.category,
            hours: task.duration || 1,
            timestamp: task.createdAt || new Date().toISOString()
          });
        }
      });
    });
    
    // Combinar fuentes de datos
    const allActivities = [...activities, ...calendarActivities];
    
    // Calcular horas totales acumuladas
    const totalHours = allActivities.reduce((sum, act) => {
      const hours = parseFloat(act.hours || act.duration || 0);
      return sum + (isNaN(hours) ? 0 : hours);
    }, 0);
    
    console.log("Total de horas acumuladas en actividades deportivas:", totalHours);
    
    // Definimos que cada 15 horas se crea una nueva mancuerna (la primera ya existe)
    const HOURS_PER_DUMBBELL = 15;
    const dumbbellsNeeded = Math.floor(totalHours / HOURS_PER_DUMBBELL) + 1;
    
    // Comprobar cuántas mancuernas ya se han creado
    const dumbbellsCreated = parseInt(localStorage.getItem('dumbbellsCreated')) || 1;
    
    console.log(`Mancuernas necesarias: ${dumbbellsNeeded}, Creadas: ${dumbbellsCreated}`);
    
    if (dumbbellsNeeded > dumbbellsCreated) {
      // Disparar evento para crear nuevas mancuernas
      const event = new CustomEvent('create-new-dumbbells', {
        detail: {
          count: dumbbellsNeeded - dumbbellsCreated,
          totalCount: dumbbellsNeeded,
          totalHours: totalHours
        }
      });
      document.dispatchEvent(event);
      
      // Actualizar contador
      localStorage.setItem('dumbbellsCreated', dumbbellsNeeded.toString());
      console.log(`Evento disparado para crear ${dumbbellsNeeded - dumbbellsCreated} mancuernas nuevas`);
    }
  }
  
  addMockSportsActivities() {
    // Comprobar si ya existen actividades
    const existingActivities = JSON.parse(localStorage.getItem('sportActivities')) || [];
    
    if (existingActivities.length > 0) {
      console.log("Ya existen actividades deportivas registradas.");
      return;
    }
    
    // Datos de ejemplo
    const mockActivities = [
      {
        dumbbellId: "dumbbell_0",
        dumbbellTitle: "Mancuerna 8kg",
        category: "Gimnasio",
        date: "2025-04-20",
        hours: 1.5,
        notes: "Entrenamiento de fuerza",
        timestamp: "2025-04-20T18:00:00.000Z",
        completed: true,
        duration: 1.5
      },
      {
        dumbbellId: "dumbbell_0",
        dumbbellTitle: "Mancuerna 8kg",
        category: "Correr",
        date: "2025-04-22",
        hours: 1.0,
        notes: "5km por el parque",
        timestamp: "2025-04-22T07:30:00.000Z",
        completed: true,
        duration: 1.0
      },
      {
        dumbbellId: "dumbbell_0",
        dumbbellTitle: "Mancuerna 8kg",
        category: "Baloncesto",
        date: "2025-04-25",
        hours: 2.0,
        notes: "Partido con amigos",
        timestamp: "2025-04-25T16:00:00.000Z",
        completed: true,
        duration: 2.0
      }
    ];
    
    localStorage.setItem('sportActivities', JSON.stringify(mockActivities));
    console.log("Se han añadido actividades deportivas de prueba.");
  }
}