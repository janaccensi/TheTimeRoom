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

    document.addEventListener('sport-activity-added', (event) => {
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

    // Escuchar eventos de actividades de estudio
    document.addEventListener('study-activity-added', (event) => {
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

    // Escuchar eventos de actividades de ocio
    document.addEventListener('leisure-activity-added', (event) => {
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
    
    // Escuchar eventos de actividades de trabajo
    document.addEventListener('work-activity-added', (event) => {
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
          
          // Usar el sistema pseudo-aleatorio para asignar un color
          const taskId = task.taskId || task.timestamp || '';
          const categoryNumber = this.getCategoryNumber(task.category, taskId);
          
          // Si está completada, usar la versión de categoría completada
          if (task.completed) {
            taskElement.classList.add(`categoria-${categoryNumber}-completed`);
          } else {
            taskElement.classList.add(`categoria-${categoryNumber}`);
          }
          
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
    
    // Variables para el arrastre
    let isDragging = false;
    let startHour = null;
    let currentHour = null;
    let dragPreview = null;
    
    // Crear las horas del día (24 horas)
    for (let hour = 0; hour <= 23; hour++) {
      const timeSlot = document.createElement('div');
      timeSlot.className = 'time-slot';
      timeSlot.dataset.hour = hour;
      
      const timeLabel = document.createElement('div');
      timeLabel.className = 'time-label';
      timeLabel.textContent = `${hour}:00`;
      
      const timeContent = document.createElement('div');
      timeContent.className = 'time-content';
      
      // Añadir evento de doble clic para crear tarea rápidamente
      timeSlot.addEventListener('dblclick', () => {
        this.showAddTaskForm(hour); // Pasar la hora como parámetro
      });
      
      // Eventos para arrastrar y seleccionar un rango de tiempo
      timeSlot.addEventListener('mousedown', (e) => {
        // Solo iniciar si el clic fue en el área de contenido, no en tareas existentes
        if (e.target === timeContent || e.target === timeSlot) {
          isDragging = true;
          startHour = hour;
          currentHour = hour;
          
          // Crear elemento visual para la vista previa
          dragPreview = document.createElement('div');
          dragPreview.className = 'drag-time-preview';
          dragPreview.innerHTML = `<span>${hour}:00 - ${hour+1}:00</span>`;
          timeContent.appendChild(dragPreview);
          
          // Prevenir selección de texto durante el arrastre
          e.preventDefault();
        }
      });
      
      timeSlot.appendChild(timeLabel);
      timeSlot.appendChild(timeContent);
      
      timeline.appendChild(timeSlot);
    }
    
    // Evento de movimiento del mouse (para actualizar la vista previa mientras arrastra)
    timeline.addEventListener('mousemove', (e) => {
      if (!isDragging || !startHour) return;
      
      // Determinar sobre qué franja horaria está el cursor
      const timeSlotUnder = document.elementFromPoint(e.clientX, e.clientY);
      const hourSlot = timeSlotUnder?.closest('.time-slot');
      
      if (hourSlot && hourSlot.dataset.hour) {
        const targetHour = parseInt(hourSlot.dataset.hour);
        
        // Si cambió la hora, actualizar la vista previa
        if (targetHour !== currentHour) {
          currentHour = targetHour;
          
          // Actualizar todos los elementos visuales de arrastre
          this.updateDragPreview(timeline, startHour, currentHour);
        }
      }
    });
    
    // Evento cuando se suelta el botón del mouse
    document.addEventListener('mouseup', (e) => {
      if (isDragging) {
        // Limpiar la vista previa
        const previewElements = timeline.querySelectorAll('.drag-time-preview');
        previewElements.forEach(el => el.remove());
        
        // Si realmente arrastró (hay diferencia entre inicio y fin)
        if (startHour !== null && currentHour !== null) {
          // Ordenar las horas (para permitir arrastrar hacia arriba también)
          const minHour = Math.min(startHour, currentHour);
          const maxHour = Math.max(startHour, currentHour);
          
          // Calcular duración en horas
          const duration = maxHour - minHour + 1;
          
          // Abrir el formulario con la hora de inicio y duración
          this.showAddTaskForm(minHour, duration);
        }
        
        // Resetear variables
        isDragging = false;
        startHour = null;
        currentHour = null;
        dragPreview = null;
      }
    });
    
    // Añadir las tareas del día
    this.renderDayTasks();
  }
  
  // Método para actualizar la vista previa durante el arrastre
  updateDragPreview(timeline, startHour, endHour) {
    // Limpiar previews anteriores
    const previewElements = timeline.querySelectorAll('.drag-time-preview');
    previewElements.forEach(el => el.remove());
    
    // Ordenar las horas (para permitir arrastrar hacia arriba también)
    const minHour = Math.min(startHour, endHour);
    const maxHour = Math.max(startHour, endHour);
    
    // Añadir elementos de vista previa en todas las celdas incluidas en el rango
    for (let hour = minHour; hour <= maxHour; hour++) {
      const timeSlot = timeline.querySelector(`.time-slot[data-hour="${hour}"]`);
      if (timeSlot) {
        const timeContent = timeSlot.querySelector('.time-content');
        const preview = document.createElement('div');
        preview.className = 'drag-time-preview';
        
        // Si es la primera o última hora, mostrar texto informativo
        if (hour === minHour) {
          preview.innerHTML = `<span>Inicio: ${minHour}:00</span>`;
        } else if (hour === maxHour) {
          preview.innerHTML = `<span>Fin: ${maxHour+1}:00</span>`;
        }
        
        timeContent.appendChild(preview);
      }
    }
    
    // Mostrar duración total en la primera franja
    const firstSlot = timeline.querySelector(`.time-slot[data-hour="${minHour}"]`);
    if (firstSlot) {
      const duration = maxHour - minHour + 1;
      const firstPreview = firstSlot.querySelector('.drag-time-preview');
      if (firstPreview) {
        firstPreview.innerHTML += `<div class="duration-indicator">Duración: ${duration} ${duration === 1 ? 'hora' : 'horas'}</div>`;
      }
    }
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
    
    // Limpiar contenidos anteriores
    timeContents.forEach(container => {
      container.innerHTML = '';
    });
    
    // Colocar actividades/tareas en sus franjas horarias
    dayActivities.forEach(activity => {
      // Determinar hora de inicio
      const activityDate = new Date(activity.timestamp || activity.date);
      let startHour = activity.hour || activityDate.getHours();
      
      // Determinar duración (por defecto 1 hora si no se especifica)
      const duration = parseFloat(activity.duration || activity.hours || 1);
      
      // Crear elemento de tarea
      const taskElement = document.createElement('div');
      taskElement.className = 'day-task-item';

      // Añadir una clase específica según el origen
      if (activity.sourceType === 'reading') {
        taskElement.classList.add('reading-activity');
      } else if (activity.sourceType === 'cleaning') {
        taskElement.classList.add('cleaning-activity');
        } else if (activity.sourceType === 'sport') {
          taskElement.classList.add('sport-activity');
      } else if (activity.sourceType === 'study') {
        taskElement.classList.add('study-activity');
      } else {
        taskElement.classList.add('calendar-task');
      }

      // Obtener el ID único de la tarea para usarlo en todo el método
      let taskId = activity.taskId || activity.timestamp || '';
      
      // Asignar un color pseudo-aleatorio usando el ID para consistencia
      const categoryNumber = this.getCategoryNumber(activity.category, taskId);
      taskElement.classList.add(`categoria-${categoryNumber}`);

      // Agregar clase 'multi-hour' para tareas que ocupan múltiples horas
      if (duration > 1) {
        taskElement.classList.add('multi-hour-task');
        // Establecer la altura según la duración
        taskElement.style.height = `calc(${Math.min(duration, 24 - startHour)} * 100% - 8px)`;
      }

      // Crear título
      const title = document.createElement('div');
      title.className = 'task-title';
      if (activity.sourceType === 'reading') {
        title.textContent = activity.bookTitle || 'Lectura';
        
        // Agregar un icono o indicador de que es actividad de lectura
        const indicator = document.createElement('span');
        indicator.className = 'activity-type-icon';
        indicator.textContent = '📚'; // Icono de libro
        title.prepend(indicator);
      } else if (activity.sourceType === 'cleaning') {
        title.textContent = activity.type || 'Limpieza';
        
        const indicator = document.createElement('span');
        indicator.className = 'activity-type-icon';
        indicator.textContent = '🧹'; // Icono de escoba
        title.prepend(indicator);
      } 
      else if (activity.sourceType === 'sport') {
        title.textContent = activity.text || 'Deporte';
        
        const indicator = document.createElement('span');
        indicator.className = 'activity-type-icon';
        indicator.textContent = '🏋️'; // Icono de mancuerna
        title.prepend(indicator);
      }
      else if (activity.sourceType === 'study') {
        title.textContent = activity.text || 'Estudio';
        
        const indicator = document.createElement('span');
        indicator.className = 'activity-type-icon';
        indicator.textContent = '💻'; // Icono de ordenador/estudio
        title.prepend(indicator);
      }
      else if (activity.sourceType === 'leisure') {
        title.textContent = activity.text || 'Ocio';
        
        const indicator = document.createElement('span');
        indicator.className = 'activity-type-icon';
        indicator.textContent = '📺'; // Icono de televisión/ocio
        title.prepend(indicator);
      }
      else if (activity.sourceType === 'work') {
        title.textContent = activity.text || 'Trabajo';
        
        const indicator = document.createElement('span');
        indicator.className = 'activity-type-icon';
        indicator.textContent = '💼'; // Icono de maletín/trabajo
        title.prepend(indicator);
      }
      else {
        title.textContent = activity.text || 'Tarea';
      }
      
      // Crear detalle
      const detail = document.createElement('div');
      detail.className = 'task-detail';

      // Añadir información de duración
      if (duration) {
        const durationText = document.createElement('div');
        durationText.className = 'task-duration';
        durationText.textContent = `⏱️ ${duration} hora${duration !== 1 ? 's' : ''}`;
        
        // Añadir hora de fin si la actividad dura más de 1 hora
        if (duration > 1) {
          const endHour = startHour + Math.floor(duration);
          durationText.textContent += ` (${startHour}:00 - ${endHour}:00)`;
        }
        
        detail.appendChild(durationText);
      }
      
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
        
        detail.appendChild(additionalInfo);
      }
      
      // Añadir notas si existen
      if (activity.notes) {
        detail.appendChild(document.createTextNode(activity.notes));
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
        
        // Si es una tarea multi-hora, eliminar todas las instancias
        if (taskElement.classList.contains('multi-hour-task')) {
          const allInstances = document.querySelectorAll(`[data-task-id="${taskId}"]`);
          allInstances.forEach(instance => instance.remove());
        } else {
          taskElement.remove();
        }
      });
      
      taskElement.appendChild(actions);
      
      // Añadir un identificador único para poder eliminar todas las instancias
      taskElement.dataset.taskId = taskId;
      
      // Agregar elemento a la franja horaria inicial
      if (startHour >= 0 && startHour < timeContents.length) {
        timeContents[startHour].appendChild(taskElement);
        
        // Si la tarea tiene una duración de más de una hora, ocupar también las siguientes franjas
        if (duration > 1) {
          // Calcular cuántas franjas horarias adicionales se necesitan (sin exceder las 24 horas)
          const additionalSlots = Math.min(Math.floor(duration) - 1, 23 - startHour);
          
          // Para cada franja adicional, crear un marcador de "ocupado"
          for (let i = 1; i <= additionalSlots; i++) {
            const nextHour = startHour + i;
            if (nextHour < timeContents.length) {
              const occupiedMarker = document.createElement('div');
              occupiedMarker.className = 'hour-occupied-marker';
              occupiedMarker.dataset.taskId = taskId;
              occupiedMarker.dataset.parentHour = startHour;
              timeContents[nextHour].appendChild(occupiedMarker);
            }
          }
        }
      }
      
      // Si estaba completada, añadir clase correspondiente
      if (activity.completed) {
        taskElement.classList.add('task-completed');
      }
    });
  }
  
  showAddTaskForm(preselectedHour = null, preselectedDuration = 1) {
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = this.selectedDate.toLocaleDateString('es-ES', dateOptions);
    
    // Crear formulario para añadir tarea
    const taskForm = document.createElement('div');
    taskForm.className = 'task-form-overlay';
  
    // Generar opciones de horas (ahora mostrando las 24 horas)
    let hourOptions = '';
    for (let h = 0; h <= 23; h++) {
      const selected = (h === preselectedHour) ? 'selected' : '';
      hourOptions += `<option value="${h}" ${selected}>${h}:00</option>`;
    }
  
    // Generar opciones de duración
    let durationOptions = '';
    for (let d = 0.5; d <= 8; d += 0.5) {
      const selected = (d === preselectedDuration) ? 'selected' : '';
      durationOptions += `<option value="${d}" ${selected}>${d} hora${d !== 1 ? 's' : ''}</option>`;
    }
  
    taskForm.innerHTML = `
      <div class="task-form-container">
      <h3>Nueva tarea para ${formattedDate}</h3><br>
      <form id="add-task-form">
        <div class="form-group">
          <label for="task-activity-type">Tipo de actividad:</label>
          <select id="task-activity-type" required>
            <option value="general">General</option>
            <option value="reading">Libro/Lectura</option>
            <option value="cleaning">Escoba/Tareas del hogar</option>
            <option value="sport">Mancuerna/Deporte</option>
            <option value="study">Estudio</option>
            <option value="leisure">Ocio</option>
            <option value="work">Trabajo</option>
          </select>
        </div>

        <div class="form-group">
          <label for="task-category">Categoría:</label>
          <select id="task-category">
            <!-- Las opciones se generarán dinámicamente -->
          </select>
        </div>
        
        <div class="form-group">
          <label for="task-text">Descripción:</label>
          <input type="text" id="task-text" required autofocus>
        </div>
        
        <div class="form-group">
          <label for="task-hour">Hora de inicio:</label>
          <select id="task-hour">
            ${hourOptions}
          </select>
        </div>
        
        <div class="form-group">
          <label for="task-duration">Duración:</label>
          <select id="task-duration">
            ${durationOptions}
          </select>
        </div>
        
        <!-- Botón para mostrar/ocultar campos adicionales -->
        <button type="button" id="show-more-task-fields" class="secondary-button">Añadir más datos</button>
        
        <!-- Sección adicional inicialmente oculta -->
        <div id="additional-task-fields" class="additional-fields" style="display: none;">
          <hr>
          <div class="form-group">
            <label for="task-location">Ubicación:</label>
            <input type="text" id="task-location" placeholder="Dirección o ubicación">
          </div>
          <div class="form-group">
            <label for="task-urgency">Nivel de urgencia:</label>
            <select id="task-urgency">
              <option value="baja">Baja</option>
              <option value="normal" selected>Normal</option>
              <option value="alta">Alta</option>
              <option value="urgente">Urgente</option>
            </select>
          </div>
          <div class="form-group">
            <label for="task-url">URL relacionada:</label>
            <input type="url" id="task-url" placeholder="https://...">
          </div>
          <div class="form-group">
            <label for="task-guests">Invitados:</label>
            <input type="text" id="task-guests" placeholder="Nombres separados por comas">
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" id="cancel-task">Cancelar</button>
          <button type="submit">Guardar</button>
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
        { value: 'Reunión', text: 'Reunión' },
        { value: 'Tarea', text: 'Tarea' },
        { value: 'Evento', text: 'Evento' },
        { value: 'Otros', text: 'Otros' }
      ],
      cleaning: [
        { value: 'Barrer', text: 'Barrer' },
        { value: 'Fregar el suelo', text: 'Fregar el suelo' },
        { value: 'Quitar el polvo', text: 'Quitar el polvo' },
        { value: 'Limpiar vidrios', text: 'Limpiar vidrios' },
        { value: 'Limpieza general', text: 'Limpieza general' }
      ],
      study: [
        { value: 'Estudiar Factores Humanos', text: 'Estudiar Factores Humanos' },
        { value: 'Estudiar Análisis Complejo', text: 'Estudiar Análisis Complejo' },
        { value: 'Estudiar Programación', text: 'Estudiar Programación' },
        { value: 'Estudiar Física', text: 'Estudiar Física' },
        { value: 'Estudiar Matemáticas', text: 'Estudiar Matemáticas' },
        { value: 'Estudiar Otros', text: 'Estudiar Otros' }
      ],
      reading: [
        { value: 'Leer Fantasía', text: 'Leer Fantasía' },
        { value: 'Leer Ensayo', text: 'Leer Ensayo' },
        { value: 'Leer Novela', text: 'Leer Novela' },
        { value: 'Leer Ciencia Ficción', text: 'Leer Ciencia Ficción' },
        { value: 'Leer Biografía', text: 'Leer Biografía' },
        { value: 'Leer Otros', text: 'Leer Otros' }
      ],
      sport: [
        { value: 'Gimnasio', text: 'Gimnasio' },
        { value: 'Entrenamiento funcional', text: 'Entrenamiento funcional' },
        { value: 'Deportes de equipo', text: 'Deportes de equipo' },
        { value: 'Flexibilidad', text: 'Flexibilidad' },
        { value: 'Resistencia', text: 'Resistencia' },
        { value: 'Correr', text: 'Correr' },
        { value: 'Natación', text: 'Natación' },
        { value: 'Ciclismo', text: 'Ciclismo' },
        { value: 'Otros', text: 'Otros' }
      ],
      leisure: [
        { value: 'Ver películas', text: 'Ver películas' },
        { value: 'Ver series', text: 'Ver series' },
        { value: 'Videojuegos', text: 'Videojuegos' },
        { value: 'Redes sociales', text: 'Redes sociales' },
        { value: 'Música', text: 'Música' },
        { value: 'Otros', text: 'Otros' }
      ],
      work: [
        { value: 'Reunión de trabajo', text: 'Reunión de trabajo' },
        { value: 'Proyecto', text: 'Proyecto' },
        { value: 'Llamada', text: 'Llamada' },
        { value: 'Presentación', text: 'Presentación' },
        { value: 'Administración', text: 'Administración' },
        { value: 'Planificación', text: 'Planificación' },
        { value: 'Documentación', text: 'Documentación' },
        { value: 'Email', text: 'Email' },
        { value: 'Formación', text: 'Formación' },
        { value: 'Otros', text: 'Otros' }
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
        hour: parseInt(hour),
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
        hour: parseInt(hour),
        notes: '',
        timestamp: timestamp,
        completed: false,
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
    else if (activityType === 'sport') {
      // Si es actividad deportiva
      const sportActivity = {
        text: text,
        category: category,
        date: formattedDate,
        hours: parseFloat(duration),
        duration: parseFloat(duration),  // Aseguramos que se guarda la duración correctamente
        hour: parseInt(hour),
        notes: '',
        timestamp: timestamp,
        completed: false,
        sourceType: 'sport',
        location: location || null,
        urgency: urgency || 'normal',
        url: url || null,
        guests: guests || null
      };
      // Guardar en localStorage
      const sportActivities = JSON.parse(localStorage.getItem('sportActivities')) || [];
      sportActivities.push(sportActivity);
      localStorage.setItem('sportActivities', JSON.stringify(sportActivities));
      // Disparar evento
      document.dispatchEvent(new CustomEvent('sport-activity-added', {
        detail: { activity: sportActivity }
      }));
      ProgressAnimationService.showProgressAnimation(category, 'sport');
      // Renderizar después de la animación
      setTimeout(() => {
        this.renderDayTasks();
      }
      , 2800);
    }
    else if (activityType === 'study') {
      // Si es actividad de estudio
      const studyActivity = {
        text: text,
        category: category,
        date: formattedDate,
        hours: parseFloat(duration),
        hour: parseInt(hour),
        notes: '',
        timestamp: timestamp,
        completed: false,
        sourceType: 'study',
        location: location || null,
        urgency: urgency || 'normal',
        url: url || null,
        guests: guests || null
      };
      // Guardar en localStorage
      const studyActivities = JSON.parse(localStorage.getItem('studyActivities')) || [];
      studyActivities.push(studyActivity);
      localStorage.setItem('studyActivities', JSON.stringify(studyActivities));
      // Disparar evento
      document.dispatchEvent(new CustomEvent('study-activity-added', {
        detail: { activity: studyActivity }
      }));
      ProgressAnimationService.showProgressAnimation(category, 'study');
      // Renderizar después de la animación
      setTimeout(() => {
        this.renderDayTasks();
      }, 2800);
    }
    else if (activityType === 'leisure') {
      // Si es actividad de ocio
      const leisureActivity = {
        text: text,
        category: category,
        date: formattedDate,
        hours: parseFloat(duration),
        hour: parseInt(hour),
        notes: '',
        timestamp: timestamp,
        completed: false,
        sourceType: 'leisure',
        location: location || null,
        urgency: urgency || 'normal',
        url: url || null,
        guests: guests || null
      };
      // Guardar en localStorage
      const leisureActivities = JSON.parse(localStorage.getItem('leisureActivities')) || [];
      leisureActivities.push(leisureActivity);
      localStorage.setItem('leisureActivities', JSON.stringify(leisureActivities));
      // Disparar evento
      document.dispatchEvent(new CustomEvent('leisure-activity-added', {
        detail: { activity: leisureActivity }
      }));
      ProgressAnimationService.showProgressAnimation(category, 'leisure');
      // Renderizar después de la animación
      setTimeout(() => {
        this.renderDayTasks();
      }, 2800);
    }
    else if (activityType === 'work') {
      // Si es actividad de trabajo
      const workActivity = {
        text: text,
        category: category,
        date: formattedDate,
        hours: parseFloat(duration),
        hour: parseInt(hour),
        notes: '',
        timestamp: timestamp,
        completed: false,
        sourceType: 'work',
        location: location || null,
        urgency: urgency || 'normal',
        url: url || null,
        guests: guests || null
      };
      // Guardar en localStorage
      const workActivities = JSON.parse(localStorage.getItem('workActivities')) || [];
      workActivities.push(workActivity);
      localStorage.setItem('workActivities', JSON.stringify(workActivities));
      // Disparar evento
      document.dispatchEvent(new CustomEvent('work-activity-added', {
        detail: { activity: workActivity }
      }));
      ProgressAnimationService.showProgressAnimation(category, 'work');
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
      // Extraer la hora del timestamp si no está especificada directamente
      let hour = activity.hour;
      if (!hour && activity.timestamp) {
        const timestampDate = new Date(activity.timestamp);
        hour = timestampDate.getHours();
      }
      // Si aún no hay hora, usar 9 como fallback
      hour = hour || 9;
      
      return {
        ...activity,
        text: activity.bookTitle || activity.notes || activity.category,
        category: activity.category || 'Lectura',
        date: activity.date,
        hour: hour,
        timestamp: activity.timestamp || new Date().toISOString(),
        location: activity.location || null,
        urgency: activity.urgency || 'normal',
        url: activity.url || null,
        guests: activity.guests || null,
        sourceType: 'reading'
      };
    });

    // Obtener actividades de limpieza
    const cleaningActivities = JSON.parse(localStorage.getItem('cleaningActivities')) || [];
    const formattedCleaningActivities = cleaningActivities.map(activity => {
      // Extraer la hora del timestamp
      let hour = activity.hour;
      if (!hour && activity.timestamp) {
        const timestampDate = new Date(activity.timestamp);
        hour = timestampDate.getHours();
      }
      hour = hour || 9;

      return {
        ...activity,
        text: activity.type || "Limpieza",
        category: "Limpieza",
        date: activity.date,
        hour: hour,
        timestamp: activity.timestamp,
        duration: activity.hours,
        completed: activity.completed || true,
        location: activity.location || null,
        urgency: activity.urgency || 'normal',
        url: activity.url || null,
        guests: activity.guests || null,
        sourceType: 'cleaning'
      };
    });
    
    // Obtener actividades de deporte
    const sportActivities = JSON.parse(localStorage.getItem('sportActivities')) || [];
    const formattedSportActivities = sportActivities.map(activity => {
      // Extraer la hora del timestamp
      let hour = activity.hour;
      if (!hour && activity.timestamp) {
        const timestampDate = new Date(activity.timestamp);
        hour = timestampDate.getHours();
      }
      hour = hour || 9;
      
      return {
        ...activity,
        text: activity.text || "Actividad deportiva",
        category: activity.category || "Deporte",
        date: activity.date,
        hour: hour,
        timestamp: activity.timestamp,
        duration: activity.duration || 1,
        completed: activity.completed || false,
        location: activity.location || null,
        urgency: activity.urgency || 'normal',
        url: activity.url || null,
        guests: activity.guests || null,
        sourceType: 'sport'
      };
    });
    
    // Obtener actividades de estudio
    const studyActivities = JSON.parse(localStorage.getItem('studyActivities')) || [];
    const formattedStudyActivities = studyActivities.map(activity => {
      // Extraer la hora del timestamp
      let hour = activity.hour;
      if (!hour && activity.timestamp) {
        const timestampDate = new Date(activity.timestamp);
        hour = timestampDate.getHours();
      }
      hour = hour || 9;
      
      return {
        ...activity,
        text: activity.text || "Actividad de estudio",
        category: activity.category || "Estudio",
        date: activity.date,
        hour: hour,
        timestamp: activity.timestamp,
        duration: activity.duration || activity.hours || 1,
        completed: activity.completed || false,
        location: activity.location || null,
        urgency: activity.urgency || 'normal',
        url: activity.url || null,
        guests: activity.guests || null,
        sourceType: 'study'
      };
    });

    // Obtener actividades de ocio
    const leisureActivities = JSON.parse(localStorage.getItem('leisureActivities')) || [];
    const formattedLeisureActivities = leisureActivities.map(activity => {
      // Extraer la hora del timestamp
      let hour = activity.hour;
      if (!hour && activity.timestamp) {
        const timestampDate = new Date(activity.timestamp);
        hour = timestampDate.getHours();
      }
      hour = hour || 9;
      
      return {
        ...activity,
        text: activity.text || "Actividad de ocio",
        category: activity.category || "Ocio",
        date: activity.date,
        hour: hour,
        timestamp: activity.timestamp,
        duration: activity.duration || activity.hours || 1,
        completed: activity.completed || false,
        location: activity.location || null,
        urgency: activity.urgency || 'normal',
        url: activity.url || null,
        guests: activity.guests || null,
        sourceType: 'leisure'
      };
    });
    
    // Obtener actividades de trabajo
    const workActivities = JSON.parse(localStorage.getItem('workActivities')) || [];
    const formattedWorkActivities = workActivities.map(activity => {
      // Extraer la hora del timestamp
      let hour = activity.hour;
      if (!hour && activity.timestamp) {
        const timestampDate = new Date(activity.timestamp);
        hour = timestampDate.getHours();
      }
      hour = hour || 9;
      
      return {
        ...activity,
        text: activity.text || "Actividad de trabajo",
        category: activity.category || "Trabajo",
        date: activity.date,
        hour: hour,
        timestamp: activity.timestamp,
        duration: activity.duration || activity.hours || 1,
        completed: activity.completed || false,
        location: activity.location || null,
        urgency: activity.urgency || 'normal',
        url: activity.url || null,
        guests: activity.guests || null,
        sourceType: 'work'
      };
    });
    
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
    
    // Devolver todos los tipos de actividades
    return [
      ...formattedReadingActivities, 
      ...formattedCleaningActivities, 
      ...formattedSportActivities,
      ...formattedStudyActivities,
      ...formattedLeisureActivities,
      ...formattedWorkActivities,
      ...calendarTasks
    ];
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
      const sportCategories = ["Gimnasio", "Entrenamiento funcional", "Deportes de equipo", "Flexibilidad", "Resistencia", "Correr", "Natación", "Ciclismo", "Otros"];
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
    // Si es una actividad de deporte, actualizar en localStorage
    if (activity.sourceType === 'sport') {
      const sportActivities = JSON.parse(localStorage.getItem('sportActivities')) || [];
      const activityIndex = sportActivities.findIndex(act => 
        act.timestamp === activity.timestamp
      );
      
      if (activityIndex !== -1) {
        sportActivities[activityIndex].completed = activity.completed;
        localStorage.setItem('sportActivities', JSON.stringify(sportActivities));
        
        // Disparar evento para actualizar otras vistas
        document.dispatchEvent(new CustomEvent('sport-activity-updated', { 
          detail: { activity: sportActivities[activityIndex] }
        }));
      }
      return;
    }
    
    // Si es una actividad de estudio, actualizar en localStorage
    if (activity.sourceType === 'study') {
      const studyActivities = JSON.parse(localStorage.getItem('studyActivities')) || [];
      const activityIndex = studyActivities.findIndex(act => 
        act.timestamp === activity.timestamp
      );
      
      if (activityIndex !== -1) {
        studyActivities[activityIndex].completed = activity.completed;
        localStorage.setItem('studyActivities', JSON.stringify(studyActivities));
        
        // Disparar evento para actualizar otras vistas
        document.dispatchEvent(new CustomEvent('study-activity-updated', { 
          detail: { activity: studyActivities[activityIndex] }
        }));
      }
      return;
    }
    
    // Si es una actividad de ocio, actualizar en localStorage
    if (activity.sourceType === 'leisure') {
      const leisureActivities = JSON.parse(localStorage.getItem('leisureActivities')) || [];
      const activityIndex = leisureActivities.findIndex(act => 
        act.timestamp === activity.timestamp
      );
      
      if (activityIndex !== -1) {
        leisureActivities[activityIndex].completed = activity.completed;
        localStorage.setItem('leisureActivities', JSON.stringify(leisureActivities));
        
        // Disparar evento para actualizar otras vistas
        document.dispatchEvent(new CustomEvent('leisure-activity-updated', { 
          detail: { activity: leisureActivities[activityIndex] }
        }));
      }
      return;
    }

    // Si es una actividad de trabajo, actualizar en localStorage
    if (activity.sourceType === 'work') {
      const workActivities = JSON.parse(localStorage.getItem('workActivities')) || [];
      const activityIndex = workActivities.findIndex(act => 
        act.timestamp === activity.timestamp
      );
      
      if (activityIndex !== -1) {
        workActivities[activityIndex].completed = activity.completed;
        localStorage.setItem('workActivities', JSON.stringify(workActivities));
        
        // Disparar evento para actualizar otras vistas
        document.dispatchEvent(new CustomEvent('work-activity-updated', { 
          detail: { activity: workActivities[activityIndex] }
        }));
      }
      return;
    }
  
  // Para tareas del calendario
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
    // Si es una actividad deportiva, eliminarla del localStorage
    if (activity.sourceType === 'sport') {
      const sportActivities = JSON.parse(localStorage.getItem('sportActivities')) || [];
      const filteredActivities = sportActivities.filter(act => 
        act.timestamp !== activity.timestamp
      );
      
      // Guardar las actividades actualizadas
      localStorage.setItem('sportActivities', JSON.stringify(filteredActivities));
      
      // Disparar evento para actualizar otras vistas
      document.dispatchEvent(new CustomEvent('sport-activity-deleted', { 
        detail: { activity: activity }
      }));
      
      return;
    }
    
    // Si es una actividad de estudio, eliminarla del localStorage
    if (activity.sourceType === 'study') {
      const studyActivities = JSON.parse(localStorage.getItem('studyActivities')) || [];
      const filteredActivities = studyActivities.filter(act => 
        act.timestamp !== activity.timestamp
      );
      
      // Guardar las actividades actualizadas
      localStorage.setItem('studyActivities', JSON.stringify(filteredActivities));
      
      // Disparar evento para actualizar otras vistas
      document.dispatchEvent(new CustomEvent('study-activity-deleted', { 
        detail: { activity: activity }
      }));
      
      return;
    }
    
    // Si es una actividad de ocio, eliminarla del localStorage
    if (activity.sourceType === 'leisure') {
      const leisureActivities = JSON.parse(localStorage.getItem('leisureActivities')) || [];
      const filteredActivities = leisureActivities.filter(act => 
        act.timestamp !== activity.timestamp
      );
      
      // Guardar las actividades actualizadas
      localStorage.setItem('leisureActivities', JSON.stringify(filteredActivities));
      
      // Disparar evento para actualizar otras vistas
      document.dispatchEvent(new CustomEvent('leisure-activity-deleted', { 
        detail: { activity: activity }
      }));
      
      return;
    }
    
    // Si es una actividad de trabajo, eliminarla del localStorage
    if (activity.sourceType === 'work') {
      const workActivities = JSON.parse(localStorage.getItem('workActivities')) || [];
      const filteredActivities = workActivities.filter(act => 
        act.timestamp !== activity.timestamp
      );
      
      // Guardar las actividades actualizadas
      localStorage.setItem('workActivities', JSON.stringify(filteredActivities));
      
      // Disparar evento para actualizar otras vistas
      document.dispatchEvent(new CustomEvent('work-activity-deleted', { 
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
      'Estudiar Factores Humanos': '#f39c12',
      'Estudiar Análisis Complejo': '#FF6633',
      'Estudiar Programación': '#2ecc71',
      'Estudiar Física': '#3498db',
      'Estudiar Matemáticas': '#9b59b6',
      'Estudiar Otros': '#e74c3c',
      'Leer Fantasía': '#9b59b6',
      'Leer Ensayo': '#e74c3c',
      'Leer Novela': '#1abc9c',
      'Leer Ciencia Ficción': '#FF9800',
      'Leer Biografía': '#27ae60',
      'Leer Otros': '#95a5a6',
      'Reunión': '#1abc9c',
      'Tarea': '#3498db',
      'Evento': '#FF9800',
      'Limpieza general': '#27ae60',
      'Barrer': '#8e44ad',
      'Fregar el suelo': '#2980b9',
      'Quitar el polvo': '#c0392b',
      'Limpiar vidrios': '#16a085',
      'Limpieza': '#27ae60',
      'Otros': '#95a5a6',
      // Categorías deportivas en castellano
      'Gimnasio': '#d35400',
      'Correr': '#16a085',
      'Deportes de equipo': '#8e44ad',
      'Flexibilidad': '#2980b9',
      'Resistencia': '#27ae60',
      'Natación': '#3498db',
      'Ciclismo': '#c0392b',
      'Entrenamiento funcional': '#e74c3c',
      'Otros': '#95a5a6'
    };
    
    return colorMap[category] || '#95a5a6';
  }

  getCategoryClass(category) {
    const classMap = {
      'Estudiar Factores Humanos': 'category-factors-humans',
      'Estudiar Análisis Complejo': 'category-analysis-complex',
      'Estudiar Programación': 'category-programming',
      'Estudiar Física': 'category-physics',
      'Estudiar Matemáticas': 'category-mathematics',
      'Estudiar Otros': 'category-study-others',
      'Leer Fantasía': 'category-fantasy',
      'Leer Ensayo': 'category-essay',
      'Leer Novela': 'category-novel',
      'Leer Ciencia Ficción': 'category-science-fiction',
      'Leer Biografía': 'category-biography',
      'Leer Otros': 'category-reading-others',
      'Reunión': 'category-meeting',
      'Tarea': 'category-task',
      'Evento': 'category-event',
      'Limpieza general': 'category-general-cleaning',
      'Barrer': 'category-sweeping',
      'Fregar el suelo': 'category-mopping',
      'Quitar el polvo': 'category-dusting',
      'Limpiar vidrios': 'category-window-cleaning',
      'Limpieza': 'category-cleaning',
      'Otros': 'category-others'
    };
    
    return classMap[category] || null;
  }

  getCategoryNumber(category, taskId = '') {
    // Creamos un número pseudo-aleatorio basado en el ID de la tarea o el nombre de la categoría
    // para garantizar que la misma tarea siempre tenga el mismo color
    let seed = 0;
    
    // Si tenemos un ID de tarea, lo usamos como semilla
    if (taskId) {
      for (let i = 0; i < taskId.length; i++) {
        seed += taskId.charCodeAt(i);
      }
    } else {
      // Si no hay ID, usamos la categoría como semilla
      for (let i = 0; i < category.length; i++) {
        seed += category.charCodeAt(i);
      }
    }
    
    // Generamos un número del 1 al 6 basado en la semilla
    const colorNumber = (seed % 6) + 1;
    
    return colorNumber;
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