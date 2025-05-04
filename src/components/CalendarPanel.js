import { ProgressAnimationService } from './ProgressAnimation.js';

export class CalendarPanel {
  constructor() {
    this.panel = null;
    this.isVisible = false;
    this.currentDate = new Date();
    this.selectedDate = new Date();
    this.currentView = 'month'; // 'month' o 'day'
    this.tasks = {};
    
    // Cargar datos sincronizados
    this.loadSavedData();
    
    this.init();
  }
  
  init() {
    // Crear panel principal
    this.panel = document.createElement('div');
    this.panel.className = 'calendar-panel';
    this.panel.setAttribute('role', 'dialog');
    this.panel.setAttribute('aria-modal', 'true');
    this.panel.setAttribute('aria-labelledby', 'calendar-title');
    
    // El HTML se generará dinámicamente según la vista
    this.updatePanelContent();
    
    document.body.appendChild(this.panel);
    
    // Botón Escape para cerrar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    });
    
    // Ocultar inicialmente
    this.panel.style.display = 'none';

    // Escuchar eventos de actividades de lectura
    document.addEventListener('reading-activity-added', (event) => {
      // Actualizar la vista si estamos mostrando el día relacionado con la actividad añadida
      const addedDate = new Date(event.detail.activity.date);
      const currentViewDate = this.selectedDate;
      
      if (addedDate.getDate() === currentViewDate.getDate() &&
          addedDate.getMonth() === currentViewDate.getMonth() &&
          addedDate.getFullYear() === currentViewDate.getFullYear()) {
        this.renderDayTasks();
      }
      
      // Si estamos en vista mensual y es este mes, actualizar los días
      if (this.currentView === 'month' && 
          addedDate.getMonth() === this.currentDate.getMonth() &&
          addedDate.getFullYear() === this.currentDate.getFullYear()) {
        this.renderMonthDays();
      }
    });
    document.addEventListener('cleaning-activity-added', (event) => {
      console.log('Actividad de limpieza registrada:', event.detail.activity);
  
      // Actualizar el calendario si está visible
      if (this.isVisible) {
        if (this.currentView === 'month') {
          this.renderMonthDays();
        } else {
          this.renderDayTasks();
        }
      }
    });
  }
  
  updatePanelContent() {
    if (this.currentView === 'month') {
      this.renderMonthView();
    } else {
      this.renderDayView();
    }
    
    // Configurar eventos comunes
    const closeButton = this.panel.querySelector('.close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.hide());
    }
  }
  
  renderMonthView() {
    const monthNames = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 
                       'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    this.panel.innerHTML = `
      <div class="panel-content">
      <div class="panel-header">
        <div class="header-controls">
          <div class="left-buttons">
            <button class="back-button">←</button>
            <button class="refresh-button">↻</button>
          </div>
          <div class="right-buttons">
            <button class="close-button" aria-label="Cerrar">×</button>
          </div>
        </div>
      </div>
     
        
        <div class="month-view">
          <div class="month-header">
            <button id="prev-month" class="nav-button">&lt;</button>
            <h2>${monthNames[month]} ${year}</h2>
            <button id="next-month" class="nav-button">&gt;</button>
          </div>
          
          <div class="weekdays-header">
            <div>Lu</div><div>Ma</div><div>Mi</div>
            <div>Ju</div><div>Vi</div><div>Sa</div><div>Do</div>
          </div>
          
          <div id="calendar-grid" class="calendar-grid"></div>
          
          <div class="calendar-footer">
            <div></div>
            <div class="search-container">
              <span>Busca una fecha específica:</span>
              <input type="date" id="date-search">
              <button id="search-button">🔍</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Generar días del calendario
    this.renderMonthDays();
    
    // Configurar eventos específicos de la vista mensual
    const prevMonthBtn = this.panel.querySelector('#prev-month');
    const nextMonthBtn = this.panel.querySelector('#next-month');
    const backBtn = this.panel.querySelector('.back-button');
    const refreshBtn = this.panel.querySelector('.refresh-button');
    const closeBtn = this.panel.querySelector('.close-button');
    const dateSearch = this.panel.querySelector('#date-search');
    const searchBtn = this.panel.querySelector('#search-button');
    
    prevMonthBtn.addEventListener('click', () => this.navigateMonth(-1));
    nextMonthBtn.addEventListener('click', () => this.navigateMonth(1));
    
    if (backBtn) {
      backBtn.addEventListener('click', () => this.hide());
    }
    
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.loadSavedData();
        this.renderMonthDays();
      });
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }
    
    searchBtn.addEventListener('click', () => {
      if (dateSearch.value) {
        const date = new Date(dateSearch.value);
        this.currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
        this.selectedDate = new Date(date);
        this.switchToDay();
      }
    });
  }
  
  renderMonthDays() {
    const calendarGrid = this.panel.querySelector('#calendar-grid');
    if (!calendarGrid) return;
    
    calendarGrid.innerHTML = '';
    
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    // Primer día del mes (0=Domingo, 1=Lunes, etc.)
    let firstDay = new Date(year, month, 1).getDay();
    if (firstDay === 0) firstDay = 7; // Convertir domingo (0) a 7
    
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // Días del mes anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i > 0; i--) {
      const day = prevMonthLastDay - i + 1;
      const dayCell = document.createElement('div');
      dayCell.className = 'day prev-month';
      dayCell.textContent = day;
      calendarGrid.appendChild(dayCell);
    }
    
    // Días del mes actual
    const today = new Date();
    const activitiesMap = this.getMonthActivitiesMap(year, month);
    
    for (let i = 1; i <= lastDay; i++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'day';
      
      // Día actual
      const dayDate = new Date(year, month, i);
      if (dayDate.getDate() === today.getDate() && 
          dayDate.getMonth() === today.getMonth() && 
          dayDate.getFullYear() === today.getFullYear()) {
        dayCell.classList.add('today');
      }
      
      // Contenido del día
      const dayHeader = document.createElement('div');
      dayHeader.className = 'day-number';
      dayHeader.textContent = i;
      dayCell.appendChild(dayHeader);
      
      // Añadir tareas/actividades para este día
      const dateKey = this.formatDateKey(dayDate);
      const dayTasks = activitiesMap[dateKey] || [];
      
      if (dayTasks.length > 0) {
        const tasksContainer = document.createElement('div');
        tasksContainer.className = 'day-tasks';
        
        // Limitar a máximo 3 tareas visibles
        const visibleTasks = dayTasks.slice(0, 3);
        const remainingCount = dayTasks.length - visibleTasks.length;
        
        visibleTasks.forEach(task => {
          const taskElement = document.createElement('div');
          taskElement.className = 'task-item';
          taskElement.style.backgroundColor = this.getCategoryColor(task.category);
          
          // Truncar título si es demasiado largo
          const title = task.category || task.title || task.text;
          
          // Añadir indicador de urgencia al inicio si existe
          if (task.urgency && task.urgency !== 'normal') {
            const urgencyMarkers = {
              'baja': '⚪ ',
              'alta': '🟠 ',
              'urgente': '🔴 '
            };
            const marker = urgencyMarkers[task.urgency] || '';
            taskElement.textContent = marker + (title.length > 13 ? title.substring(0, 11) + '...' : title);
          } else {
            taskElement.textContent = title.length > 15 ? title.substring(0, 13) + '...' : title;
          }
          
          tasksContainer.appendChild(taskElement);
        });
        
        if (remainingCount > 0) {
          const moreElement = document.createElement('div');
          moreElement.className = 'more-tasks';
          moreElement.textContent = `+${remainingCount} más`;
          tasksContainer.appendChild(moreElement);
        }
        
        dayCell.appendChild(tasksContainer);
      }
      
      // Evento clic para ver el día
      dayCell.addEventListener('click', () => {
        this.selectedDate = new Date(year, month, i);
        this.switchToDay();
      });
      
      calendarGrid.appendChild(dayCell);
    }
    
    // Días del mes siguiente
    const totalCells = 42; // 6 filas x 7 días
    const remainingCells = totalCells - (firstDay - 1) - lastDay;
    
    for (let i = 1; i <= remainingCells; i++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'day next-month';
      dayCell.textContent = i;
      calendarGrid.appendChild(dayCell);
    }
  }
  

  renderDayView() {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateString = this.selectedDate.toLocaleDateString('es-ES', options);
    const formattedDate = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    
    this.panel.innerHTML = `
      <div class="panel-content">
      <div class="panel-header">
        <div class="header-controls">
          <div class="left-buttons">
            <button class="back-button">←</button>
            <button class="refresh-button">↻</button>
          </div>
          <div class="right-buttons">
            <button class="close-button" aria-label="Cerrar">×</button>
          </div>
        </div>
      </div>
        
        <div class="day-view">
          <div class="day-header">
            <h2>${formattedDate}</h2>
          </div>
          
          <div class="day-timeline" id="day-timeline"></div>
          
          <div class="day-footer">
            <button id="back-to-month" class="footer-button">Volver</button>
            <button id="add-task-btn" class="primary-button">Añadir Tarea</button>
          </div>
        </div>
      </div>
    `;
    
    // Crear la línea temporal con horas
    this.renderDayTimeline();
    
    // Configurar eventos para esta vista
    const backToMonthBtn = this.panel.querySelector('#back-to-month');
    const addTaskBtn = this.panel.querySelector('#add-task-btn');
    const backBtn = this.panel.querySelector('.back-button');
    const refreshBtn = this.panel.querySelector('.refresh-button');
    const closeBtn = this.panel.querySelector('.close-button');
    
    if (backToMonthBtn) {
      backToMonthBtn.addEventListener('click', () => this.switchToMonth());
    }
    
    if (addTaskBtn) {
      addTaskBtn.addEventListener('click', () => this.showAddTaskForm());
    }
    
    if (backBtn) {
      backBtn.addEventListener('click', () => this.switchToMonth());
    }
    
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.loadSavedData();
        this.renderDayTimeline();
      });
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }
  }
  
  renderDayTimeline() {
    const timeline = this.panel.querySelector('#day-timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    
    // Crear las horas del día
    for (let hour = 8; hour <= 18; hour++) {
      const timeSlot = document.createElement('div');
      timeSlot.className = 'time-slot';
      
      const timeLabel = document.createElement('div');
      timeLabel.className = 'time-label';
      timeLabel.textContent = `${hour}:00`;
      
      const timeContent = document.createElement('div');
      timeContent.className = 'time-content';
      
      // Añadir evento de doble clic para crear tarea rápidamente
      timeSlot.addEventListener('dblclick', () => {
        this.showAddTaskForm(hour); // Pasar la hora como parámetro
      });
      
      timeSlot.appendChild(timeLabel);
      timeSlot.appendChild(timeContent);
      
      timeline.appendChild(timeSlot);
    }
    
    // Añadir las tareas del día
    this.renderDayTasks();
  }
  
  renderDayTasks() {
    const dateKey = this.formatDateKey(this.selectedDate);
    const activitiesList = this.getAllActivityData();
    
    // Filtrar actividades para este día
    const dayActivities = activitiesList.filter(activity => {
      const actDate = new Date(activity.date);
      return actDate.getDate() === this.selectedDate.getDate() && 
             actDate.getMonth() === this.selectedDate.getMonth() && 
             actDate.getFullYear() === this.selectedDate.getFullYear();
    });
    
    // Contenedores por hora
    const timeContents = this.panel.querySelectorAll('.time-content');
    timeContents.forEach(container => {
      container.innerHTML = '';
    });
    
    // Limpiar contenidos anteriores
    timeContents.forEach(container => {
      container.innerHTML = '';
    });
    
    // Colocar actividades/tareas en sus franjas horarias
    dayActivities.forEach(activity => {
      // Determinar hora (simplificado, asumimos actividades de 1 hora)
      let hour = new Date(activity.timestamp || activity.date).getHours();
      // Ajustar al rango visible (8-18)
      if (hour < 8) hour = 8;
      if (hour > 18) hour = 18;
      
      const index = hour - 8; // Índice 0 = 8:00
      if (index >= 0 && index < timeContents.length) {
        const taskElement = document.createElement('div');
        taskElement.className = 'day-task-item';

        // Añadir una clase específica según el origen
        if (activity.sourceType === 'reading') {
          taskElement.classList.add('reading-activity');
        } else if (activity.sourceType === 'sport') {
          taskElement.classList.add('sport-activity');
        } else {
          taskElement.classList.add('calendar-task');
        }

        taskElement.style.backgroundColor = this.getCategoryColor(activity.category);
        
        const title = document.createElement('div');
        title.className = 'task-title';
        if (activity.sourceType === 'reading') {
          title.textContent = activity.bookTitle || 'Lectura';
          
          // Agregar un icono o indicador de que es actividad de lectura
          const indicator = document.createElement('span');
          indicator.className = 'activity-type-icon';
          indicator.textContent = '📚'; // Icono de libro
          title.prepend(indicator);
        } else if (activity.sourceType === 'sport') {
          title.textContent = activity.text || 'Deporte';
          
          // Agregar un icono o indicador de que es actividad deportiva
          const indicator = document.createElement('span');
          indicator.className = 'activity-type-icon';
          indicator.textContent = '💪'; // Icono de deporte
          title.prepend(indicator);
        } else {
          title.textContent = activity.text || 'Tarea';
        }
        
        const detail = document.createElement('div');
        detail.className = 'task-detail';

        if (activity.location || activity.url || activity.guests) {
          // Crear contenedor para información adicional
          const additionalInfo = document.createElement('div');
          additionalInfo.className = 'task-additional-info';
          
          // Mostrar ubicación si existe
          if (activity.location) {
            const locationEl = document.createElement('div');
            locationEl.className = 'task-location';
            locationEl.innerHTML = `📍 ${activity.location}`;
            additionalInfo.appendChild(locationEl);
          }
          
          // Mostrar URL si existe
          if (activity.url) {
            const urlEl = document.createElement('div');
            urlEl.className = 'task-url';
            urlEl.innerHTML = `🔗 <a href="${activity.url}" target="_blank">Enlace</a>`;
            additionalInfo.appendChild(urlEl);
          }
          
          // Mostrar invitados si existen
          if (activity.guests) {
            const guestsEl = document.createElement('div');
            guestsEl.className = 'task-guests';
            guestsEl.innerHTML = `👥 ${activity.guests}`;
            additionalInfo.appendChild(guestsEl);
          }
          
          // Mostrar urgencia con un indicador visual
          if (activity.urgency && activity.urgency !== 'normal') {
            const urgencyEl = document.createElement('div');
            urgencyEl.className = `task-urgency ${activity.urgency}`;
            const urgencyLabels = {
              'baja': '⚪ Baja', 
              'alta': '🟠 Alta', 
              'urgent': '🔴 Urgente'
            };
            urgencyEl.textContent = urgencyLabels[activity.urgency] || activity.urgency;
            additionalInfo.appendChild(urgencyEl);
          }
          
          taskElement.appendChild(additionalInfo);
        }
        
        // Mostrar la duración o las horas si están disponibles
        if (activity.duration || activity.hours) {
          const durationValue = activity.duration || activity.hours;
          detail.textContent = `${activity.notes ? activity.notes + ' - ' : ''}${durationValue} hora${durationValue !== 1 ? 's' : ''}`;
        } else {
          detail.textContent = activity.notes || activity.text || '';
        }
        
        taskElement.appendChild(title);
        taskElement.appendChild(detail);
        
        // Añadir acciones
        const actions = document.createElement('div');
        actions.className = 'task-actions';
        actions.innerHTML = `
          <label><input type="checkbox" class="task-done" ${activity.completed ? 'checked' : ''}> Completado</label>
          <button class="delete-task">Eliminar</button>
        `;
        
        // Eventos de las acciones
        const checkbox = actions.querySelector('.task-done');
        const deleteBtn = actions.querySelector('.delete-task');

        
        checkbox.addEventListener('change', () => {
          activity.completed = checkbox.checked;
          this.updateActivity(activity);
          
          if (checkbox.checked) {
            taskElement.classList.add('task-completed');
          } else {
            taskElement.classList.remove('task-completed');
          }
        });
        
        deleteBtn.addEventListener('click', () => {
          this.deleteActivity(activity);
          taskElement.remove();
        });
        
        taskElement.appendChild(actions);
        timeContents[index].appendChild(taskElement);
      }
    });
  }
  
  showAddTaskForm(preselectedHour = null) {
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = this.selectedDate.toLocaleDateString('es-ES', dateOptions);
    
    // Crear formulario para añadir tarea
    const taskForm = document.createElement('div');
    taskForm.className = 'task-form-overlay';
  
    // Generar opciones de horas
    let hourOptions = '';
    for (let h = 0; h <= 23; h++) {
      const selected = (h === preselectedHour) ? 'selected' : '';
      hourOptions += `<option value="${h}" ${selected}>${h}:00</option>`;
    }
  
    // Generar opciones de duración
    let durationOptions = '';
    for (let d = 0.5; d <= 8; d += 0.5) {
      durationOptions += `<option value="${d}">${d} hora${d !== 1 ? 's' : ''}</option>`;
    }
  
    taskForm.innerHTML = `
      <div class="task-form-container">
      <h3>Nueva tarea para ${formattedDate}</h3>
      <form id="add-task-form">
        <div class="form-group">
          <label for="task-activity-type">Tipus d'activitat:</label>
          <select id="task-activity-type" required>
            <option value="general">General</option>
            <option value="reading">Estudi/Llibre</option>
            <option value="cleaning">Escombra/Tasques de casa</option>
          </select>
        </div>

        <div class="form-group">
          <label for="task-category">Categoria:</label>
          <select id="task-category">
            <!-- Las opciones se generarán dinámicamente -->
          </select>
        </div>
        
        <div class="form-group">
          <label for="task-text">Descripció:</label>
          <input type="text" id="task-text" required autofocus>
        </div>
        
        <div class="form-group">
          <label for="task-hour">Hora d'inici:</label>
          <select id="task-hour">
            ${hourOptions}
          </select>
        </div>
        
        <div class="form-group">
          <label for="task-duration">Duració:</label>
          <select id="task-duration">
            ${durationOptions}
          </select>
        </div>
        
        <!-- Botón para mostrar/ocultar campos adicionales -->
        <button type="button" id="show-more-task-fields" class="secondary-button">Afegir més dades</button>
        
        <!-- Sección adicional inicialmente oculta -->
        <div id="additional-task-fields" class="additional-fields" style="display: none;">
          <hr>
          <div class="form-group">
            <label for="task-location">Ubicació:</label>
            <input type="text" id="task-location" placeholder="Direcció o ubicació">
          </div>
          <div class="form-group">
            <label for="task-urgency">Nivell d'urgència:</label>
            <select id="task-urgency">
              <option value="baixa">Baixa</option>
              <option value="normal" selected>Normal</option>
              <option value="alta">Alta</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div class="form-group">
            <label for="task-url">URL relacionat:</label>
            <input type="url" id="task-url" placeholder="https://...">
          </div>
          <div class="form-group">
            <label for="task-guests">Convidats:</label>
            <input type="text" id="task-guests" placeholder="Noms separats per comes">
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" id="cancel-task">Cancel·lar</button>
          <button type="submit">Desar</button>
        </div>
      </form>
    </div>
    `;
    
    document.body.appendChild(taskForm);
    
    // IMPORTANTE: Primero añadir al DOM, luego acceder a los elementos
    const form = taskForm.querySelector('#add-task-form');
    const cancelBtn = taskForm.querySelector('#cancel-task');
    const activityTypeSelect = form.querySelector('#task-activity-type');
    const categorySelect = form.querySelector('#task-category');

    const categoriesByType = {
      general: [
        { value: 'Reunió', text: 'Reunió' },
        { value: 'Tasca', text: 'Tasca' },
        { value: 'Esdeveniment', text: 'Esdeveniment' },
        { value: 'Altres', text: 'Altres' }
      ],
      cleaning: [
        { value: 'Escombrar', text: 'Escombrar' },
        { value: 'Fregar el terra', text: 'Fregar el terra' },
        { value: 'Treure la pols', text: 'Treure la pols' },
        { value: 'Netejar vidres', text: 'Netejar vidres' },
        { value: 'Neteja general', text: 'Neteja general' }
      ],
      reading: [
        { value: 'Estudiar Factors Humans', text: 'Estudiar Factors Humans' },
        { value: 'Estudiar Anàlisi Complexa', text: 'Estudiar Anàlisi Complexa' },
        { value: 'Estudiar Programació', text: 'Estudiar Programació' },
        { value: 'Llegir Fantasia', text: 'Llegir Fantasia' },
        { value: 'Llegir Assaig', text: 'Llegir Assaig' },
        { value: 'Altres', text: 'Altres' }
      ]
    };

    // Función para actualizar las categorías según el tipo seleccionado
    function updateCategories(activityType) {
      // Vaciar opciones existentes
      categorySelect.innerHTML = '';
      
      // Añadir nuevas opciones según el tipo seleccionado
      const categories = categoriesByType[activityType] || categoriesByType.general;
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.value;
        option.textContent = category.text;
        categorySelect.appendChild(option);
      });
    }

    // Configurar el cambio de tipo de actividad
    activityTypeSelect.addEventListener('change', () => {
      updateCategories(activityTypeSelect.value);
    });

    // Inicializar con las categorías por defecto
    updateCategories('general');

    // Configurar el botón de mostrar/ocultar campos adicionales
    const showMoreFieldsBtn = taskForm.querySelector('#show-more-task-fields');
    const additionalFields = taskForm.querySelector('#additional-task-fields');
    
    showMoreFieldsBtn.addEventListener('click', () => {
      if (additionalFields.style.display === 'none') {
        additionalFields.style.display = 'block';
        showMoreFieldsBtn.textContent = 'Mostrar menos datos';
      } else {
        additionalFields.style.display = 'none';
        showMoreFieldsBtn.textContent = 'Añadir más datos';
      }
    });
    
    cancelBtn.addEventListener('click', () => {
      document.body.removeChild(taskForm);
    });
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const activityType = form.querySelector('#task-activity-type').value;
      const text = form.querySelector('#task-text').value;
      const hour = form.querySelector('#task-hour').value;
      const duration = form.querySelector('#task-duration').value;
      const category = form.querySelector('#task-category').value;
      
      // Campos adicionales
      const location = form.querySelector('#task-location').value;
      const urgency = form.querySelector('#task-urgency').value;
      const url = form.querySelector('#task-url').value;
      const guests = form.querySelector('#task-guests').value;
      
      // Garantizar que usamos la fecha correcta
      const taskDate = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        this.selectedDate.getDate(),
        parseInt(hour),
        0,
        0
      );
      
      const formattedDate = `${taskDate.getFullYear()}-${(taskDate.getMonth() + 1).toString().padStart(2, '0')}-${taskDate.getDate().toString().padStart(2, '0')}`;
      const timestamp = taskDate.toISOString();
    
    // Dependiendo del tipo de actividad, procesar de manera diferente
    if (activityType === 'cleaning') {
      // Crear una actividad de limpieza
      const cleaningActivity = {
        type: category, // Usar la categoría seleccionada como tipo
        date: formattedDate,
        hours: parseFloat(duration),
        notes: text,
        timestamp: timestamp,
        completed: true,
        sourceType: 'cleaning',
        location: location || null,
        urgency: urgency || 'normal',
        url: url || null,
        guests: guests || null
      };
      
      // Guardar en localStorage
      const cleaningActivities = JSON.parse(localStorage.getItem('cleaningActivities')) || [];
      cleaningActivities.push(cleaningActivity);
      localStorage.setItem('cleaningActivities', JSON.stringify(cleaningActivities));
      
      // Disparar evento para que CleaningModal se actualice
      document.dispatchEvent(new CustomEvent('cleaning-activity-added', { 
        detail: { activity: cleaningActivity }
      }));

      ProgressAnimationService.showProgressAnimation(category, 'cleaning');
    
      // Renderizar después de la animación
      setTimeout(() => {
        this.renderDayTasks();
      }, 2800);
    } 
    else if (activityType === 'reading') {
      // Si es actividad de lectura/estudio
      const readingActivity = {
        bookTitle: text,
        category: category,
        date: formattedDate,
        hours: parseFloat(duration),
        notes: '',
        timestamp: timestamp,
        completed: true,
        sourceType: 'reading',
        location: location || null,
        urgency: urgency || 'normal',
        url: url || null,
        guests: guests || null
      };
      
      // Guardar en localStorage
      const readingActivities = JSON.parse(localStorage.getItem('readingActivities')) || [];
      readingActivities.push(readingActivity);
      localStorage.setItem('readingActivities', JSON.stringify(readingActivities));
      
      // Disparar evento
      document.dispatchEvent(new CustomEvent('reading-activity-added', { 
        detail: { activity: readingActivity }
      }));

      ProgressAnimationService.showProgressAnimation(category, 'reading');
    
      // Renderizar después de la animación
      setTimeout(() => {
        this.renderDayTasks();
      }, 2800);
    }
    else {
      // Actividad general del calendario
      this.addNewActivity({
        text: text,
        category: category,
        date: formattedDate,
        timestamp: timestamp,
        completed: false,
        duration: parseFloat(duration),
        sourceType: 'calendar',
        location: location || null,
        urgency: urgency || 'normal',
        url: url || null,
        guests: guests || null
      });

      taskForm.style.opacity = '0';
      taskForm.style.pointerEvents = 'none';
      
      // 2. Mostrar la animación
      ProgressAnimationService.showProgressAnimation(category, activityType);
      
      // 3. Cuando la animación termine, eliminar el formulario y actualizar la vista
      setTimeout(() => {
        document.body.removeChild(taskForm);
        this.renderDayTasks();
        
        // Desplazar a la franja horaria correspondiente
        setTimeout(() => {
          const hourIndex = parseInt(hour) - 8;
          const timeSlots = this.panel.querySelectorAll('.time-slot');
          
          if (hourIndex >= 0 && hourIndex < timeSlots.length) {
            timeSlots[hourIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 200);
      }, 2800);
    }
        
      document.body.removeChild(taskForm);
      this.renderDayTasks();

      
      
      // Desplazar a la franja horaria correspondiente
      setTimeout(() => {
        const hourIndex = parseInt(hour) - 8;
        const timeSlots = this.panel.querySelectorAll('.time-slot');
        
        if (hourIndex >= 0 && hourIndex < timeSlots.length) {
          timeSlots[hourIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 3000);
    });
  }
  
  switchToDay() {
    this.currentView = 'day';
    this.updatePanelContent();
  }
  
  switchToMonth() {
    this.currentView = 'month';
    this.updatePanelContent();
  }
  
  navigateMonth(direction) {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + direction,
      1
    );
    this.renderMonthView();
  }
  
  // Métodos auxiliares para gestión de datos
  
  getAllActivityData() {
    // Obtener actividades de lectura
    const readingActivities = JSON.parse(localStorage.getItem('readingActivities')) || [];
    
    // Convertir actividades de lectura al formato de calendario sin alterar su estructura original
    const formattedReadingActivities = readingActivities.map(activity => {
      const hour = activity.hour || 9;
      return {
        ...activity, // Mantener todos los campos originales
        // Solo añadir campos necesarios para la visualización si no existen
        text: activity.bookTitle || activity.notes || activity.category,
        category: activity.category || 'Lectura',
        date: activity.date,
        hour: hour,
        timestamp: activity.timestamp || new Date().toISOString(),
        // Campos adicionales - asegurar que se preservan
        location: activity.location || null,
        urgency: activity.urgency || 'normal',
        url: activity.url || null,
        guests: activity.guests || null,
        // Usar un ID para diferenciar el origen
        sourceType: 'reading'
      };
    });

    const cleaningActivities = JSON.parse(localStorage.getItem('cleaningActivities')) || [];
    const formattedCleaningActivities = cleaningActivities.map(activity => {
      const hour = activity.hour || 9;

      return {
        ...activity,
        text: activity.type || "Limpieza",
        category: "Limpieza",
        date: activity.date,
        hour: hour,
        timestamp: activity.timestamp,
        duration: activity.hours,
        completed: activity.completed || true,
        // Campos adicionales - asegurar que se preservan
        location: activity.location || null,
        urgency: activity.urgency || 'normal',
        url: activity.url || null,
        guests: activity.guests || null,
        sourceType: 'cleaning'
      };
    });
    
    // NO incluir las actividades deportivas directamente, ya están en el calendario
    // Las actividades deportivas ya se añaden como tareas de calendario en el evento sport-activity-added
    
    // Convertir tareas del calendario para formato uniforme
    const calendarTasks = [];
    Object.entries(this.tasks).forEach(([dateKey, tasks]) => {
      const [year, month, day] = dateKey.split('-').map(Number);
      tasks.forEach(task => {
        calendarTasks.push({
          text: task.text,
          date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
          completed: task.completed || false,
          timestamp: task.createdAt || new Date(year, month-1, day, 12, 0, 0).toISOString(),
          category: task.category,
          duration: task.duration || 1,
          sourceType: task.sourceType || 'calendar',
          taskId: task.createdAt,
          sourceId: task.sourceId // Mantener el ID original de las actividades deportivas
        });
      });
    });
    
    // Devolver ambos tipos de actividades
    return [...formattedReadingActivities, ...formattedCleaningActivities, ...calendarTasks];
  }
  
  getMonthActivitiesMap(year, month) {
    const activities = this.getAllActivityData();
    const activitiesMap = {};
    
    activities.forEach(activity => {
      const actDate = new Date(activity.date);
      
      if (actDate.getFullYear() === year && actDate.getMonth() === month) {
        const dateKey = this.formatDateKey(actDate);
        
        if (!activitiesMap[dateKey]) {
          activitiesMap[dateKey] = [];
        }
        
        activitiesMap[dateKey].push(activity);
      }
    });
    
    return activitiesMap;
  }
  
  addNewActivity(activity) {
    // Si tiene bookId, es una actividad de lectura (no la procesamos aquí)
    if (activity.bookId || activity.sourceType === 'reading') {
      console.warn("Las actividades de lectura deben añadirse desde ActivityModal");
      return;
    }
    
    // Detectar si es una categoría deportiva si no se especificó directamente
    if (!activity.sourceType) {
      const sportCategories = ["Gimnasio", "Correr", "Baloncesto", "Fútbol", "Natación", "Ciclismo", "Yoga"];
      activity.sourceType = sportCategories.includes(activity.category) ? 'sport' : 'calendar';
    }
    
    // Crear una ID única para la actividad
    const createdAt = activity.timestamp || new Date().toISOString();
    
    // Guardar como tarea del calendario
    const activityDate = new Date(activity.date);
    const dateKey = this.formatDateKey(activityDate);
    
    if (!this.tasks[dateKey]) {
      this.tasks[dateKey] = [];
    }
    
    // NO asignamos sourceId por defecto para actividades deportivas,
    // esto permite que se muestren en cada mancuerna que se abra
    const newTask = {
      text: activity.text,
      category: activity.category,
      completed: activity.completed || false,
      createdAt: createdAt,
      duration: activity.duration || 1,
      sourceType: activity.sourceType,
      // Solo pasamos sourceId si ya viene asignado específicamente
      ...(activity.sourceId && { sourceId: activity.sourceId })
    };
    
    this.tasks[dateKey].push(newTask);
    this.saveTasks();
    
    // Si es actividad deportiva completada, disparar evento
    if (activity.sourceType === 'sport' && activity.completed) {
      document.dispatchEvent(new CustomEvent('calendar-task-completed', {
        detail: { 
          task: newTask,
          category: activity.category 
        }
      }));
    }
  }

  addTaskToCalendar(dateKey, task) {
    // Obtener tareas existentes
    if (!this.tasks[dateKey]) {
      this.tasks[dateKey] = [];
    }
    
    // Añadir la nueva tarea
    this.tasks[dateKey].push(task);
    
    // Guardar en localStorage
    localStorage.setItem('calendar-tasks', JSON.stringify(this.tasks));
  }

  updateActivity(activity) {
    // Si es actividad de limpieza, disparar evento específico
    if (activity.sourceType === 'cleaning') {
      const cleaningActivities = JSON.parse(localStorage.getItem('cleaningActivities')) || [];
      const activityIndex = cleaningActivities.findIndex(act => 
        act.timestamp === activity.timestamp
      );
      
      if (activityIndex !== -1) {
        // Actualizar en localStorage
        cleaningActivities[activityIndex].completed = activity.completed;
        localStorage.setItem('cleaningActivities', JSON.stringify(cleaningActivities));
        
        // Disparar evento para que CleaningModal se actualice
        document.dispatchEvent(new CustomEvent('cleaning-activity-updated', { 
          detail: { activity: cleaningActivities[activityIndex] }
        }));
      }
      return;
    }

    // Si es actividad de lectura, actualizar en localStorage
    if (activity.sourceType === 'reading' || activity.bookId) {
      const readingActivities = JSON.parse(localStorage.getItem('readingActivities')) || [];
      const activityIndex = readingActivities.findIndex(act => 
        act.timestamp === activity.timestamp || 
        (act.bookId === activity.bookId && act.date === activity.date)
      );
      
      if (activityIndex !== -1) {
        readingActivities[activityIndex].completed = activity.completed;
        localStorage.setItem('readingActivities', JSON.stringify(readingActivities));
        
        // Disparar evento para actualizar otras vistas
        document.dispatchEvent(new CustomEvent('reading-activity-updated', { 
          detail: { activity: readingActivities[activityIndex] }
        }));
      }
      return;
    }
  
  // Para tareas de calendario
  if (activity.sourceType === 'calendar' && activity.taskId) {
    const dateKey = this.formatDateKey(new Date(activity.date));
    if (this.tasks[dateKey]) {
      const taskIndex = this.tasks[dateKey].findIndex(t => t.createdAt === activity.taskId);
      if (taskIndex !== -1) {
        // Verificar si cambia el estado de completado
        const wasCompleted = this.tasks[dateKey][taskIndex].completed;
        const nowCompleted = activity.completed;
        
        this.tasks[dateKey][taskIndex] = {
          ...this.tasks[dateKey][taskIndex],
          text: activity.text,
          completed: activity.completed
        };
        this.saveTasks();
        
        // Si cambió el estado a completado, disparar un evento para actualizar estadísticas
        if (!wasCompleted && nowCompleted) {
          document.dispatchEvent(new CustomEvent('calendar-task-completed', { 
            detail: { 
              task: this.tasks[dateKey][taskIndex],
              category: this.tasks[dateKey][taskIndex].category
            }
          }));
        }
        // Si cambió de completado a no completado
        else if (wasCompleted && !nowCompleted) {
          document.dispatchEvent(new CustomEvent('calendar-task-uncompleted', { 
            detail: { 
              task: this.tasks[dateKey][taskIndex],
              category: this.tasks[dateKey][taskIndex].category
            }
          }));
        }
      }
    }
  }
}

  deleteActivity(activity) {
    // Si es una actividad de limpieza
    if (activity.sourceType === 'cleaning') {
      const cleaningActivities = JSON.parse(localStorage.getItem('cleaningActivities')) || [];
      const filteredActivities = cleaningActivities.filter(act => 
        act.timestamp !== activity.timestamp
      );
      
      // Guardar las actividades actualizadas
      localStorage.setItem('cleaningActivities', JSON.stringify(filteredActivities));
      
      // Disparar evento para actualizar CleaningModal
      document.dispatchEvent(new CustomEvent('cleaning-activity-deleted', { 
        detail: { activity: activity }
      }));
      
      return;
    }
    // Si es una actividad de lectura, eliminarla del localStorage
    if (activity.sourceType === 'reading' || activity.bookId) {
      const readingActivities = JSON.parse(localStorage.getItem('readingActivities')) || [];
      const filteredActivities = readingActivities.filter(act => 
        act.timestamp !== activity.timestamp && 
        !(act.bookId === activity.bookId && act.date === activity.date)
      );
      
      // Guardar las actividades actualizadas
      localStorage.setItem('readingActivities', JSON.stringify(filteredActivities));
      
      // Disparar evento para actualizar otras vistas
      document.dispatchEvent(new CustomEvent('reading-activity-deleted', { 
        detail: { activity: activity }
      }));
      
      return;
    }
    
    // Para tareas del calendario continuar con el código existente
    if (activity.sourceType === 'calendar' || activity.taskId) {
      const dateKey = this.formatDateKey(new Date(activity.date));
      if (this.tasks[dateKey]) {
        const filteredTasks = this.tasks[dateKey].filter(
          t => t.createdAt !== (activity.taskId || activity.timestamp)
        );
        
        if (filteredTasks.length !== this.tasks[dateKey].length) {
          this.tasks[dateKey] = filteredTasks;
          this.saveTasks();
        }
      }
    }
  }
  
  formatDateKey(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  
  getCategoryColor(category) {
    const colorMap = {
      'Estudiar Factors Humans': '#f39c12',
      'Estudiar Anàlisi Complexa': '#FF6633',
      'Estudiar Programació': '#2ecc71',
      'Llegir Fantasia': '#9b59b6',
      'Llegir Assaig': '#e74c3c',
      'Calendario': '#1abc9c',
      'Otros': '#95a5a6',
      'Gimnasio': '#d35400',
      'Correr': '#16a085',
      'Baloncesto': '#8e44ad',
      'Fútbol': '#27ae60',
      'Natación': '#3498db',
      'Ciclismo': '#c0392b',
      'Yoga': '#2980b9',
      'Deporte': '#95a5a6'
    };
    
    return colorMap[category] || '#95a5a6';
  }
  
  loadSavedData() {
    // Cargar tareas del calendario
    const savedTasks = localStorage.getItem('calendar-tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }
  
  saveTasks() {
    localStorage.setItem('calendar-tasks', JSON.stringify(this.tasks));
  }
  
  show(calendarObject) {
    // Mostrar panel
    this.panel.style.display = 'block';
    this.isVisible = true;
    
    // Por defecto, mostrar vista mensual actual
    this.currentDate = new Date(
      new Date().getFullYear(), 
      new Date().getMonth(), 
      1
    );
    this.selectedDate = new Date();
    this.currentView = 'month';
    
    // Actualizar contenido
    this.updatePanelContent();
    
    // Animar entrada
    setTimeout(() => {
      this.panel.classList.add('active');
    }, 10);
  }
  
  hide() {
    // Animar salida
    this.panel.classList.remove('active');
    
    // Ocultar tras animación
    setTimeout(() => {
      this.panel.style.display = 'none';
      this.isVisible = false;
    }, 300);
  }
}