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
    
    // Añadir estilos
    this.addStyles();
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
          taskElement.textContent = title.length > 15 ? title.substring(0, 13) + '...' : title;
          
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
    
    // También cargar tareas del CalendarPanel
    const dayTasks = this.tasks[dateKey] || [];
    
    // Contenedores por hora
    const timeContents = this.panel.querySelectorAll('.time-content');
    if (!timeContents.length) return;
    
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
        taskElement.style.backgroundColor = this.getCategoryColor(activity.category);
        
        const title = document.createElement('div');
        title.className = 'task-title';
        title.textContent = activity.category || activity.bookTitle || 'Tarea';
        
        const detail = document.createElement('div');
        detail.className = 'task-detail';
        detail.textContent = activity.notes || activity.text || '';
        
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
    
    // Añadir también tareas específicas del calendario
    dayTasks.forEach(task => {
      // Tareas del calendario van a la franja de las 12:00 por defecto
      const index = 4; // 12:00
      
      if (index < timeContents.length) {
        const taskElement = document.createElement('div');
        taskElement.className = 'day-task-item';
        if (task.completed) taskElement.classList.add('task-completed');
        
        const title = document.createElement('div');
        title.className = 'task-title';
        title.textContent = task.text || 'Tarea';
        
        taskElement.appendChild(title);
        
        // Añadir acciones
        const actions = document.createElement('div');
        actions.className = 'task-actions';
        actions.innerHTML = `
          <label><input type="checkbox" class="task-done" ${task.completed ? 'checked' : ''}> Completado</label>
          <button class="delete-task">Eliminar</button>
        `;
        
        // Eventos de las acciones
        const checkbox = actions.querySelector('.task-done');
        const deleteBtn = actions.querySelector('.delete-task');
        
        checkbox.addEventListener('change', () => {
          task.completed = checkbox.checked;
          this.saveTasks();
          
          if (checkbox.checked) {
            taskElement.classList.add('task-completed');
          } else {
            taskElement.classList.remove('task-completed');
          }
        });
        
        deleteBtn.addEventListener('click', () => {
          const taskIndex = dayTasks.indexOf(task);
          if (taskIndex !== -1) {
            dayTasks.splice(taskIndex, 1);
            this.saveTasks();
            taskElement.remove();
          }
        });
        
        taskElement.appendChild(actions);
        timeContents[index].appendChild(taskElement);
      }
    });
  }
  
  showAddTaskForm() {

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = this.selectedDate.toLocaleDateString('es-ES', dateOptions);
    
    // Crear formulario para añadir tarea
    const taskForm = document.createElement('div');
    taskForm.className = 'task-form-overlay';
    taskForm.innerHTML = `
      <div class="task-form-container">
        <h3>Nueva tarea para ${formattedDate}</h3>
        <form id="add-task-form">
          <div class="form-group">
            <label for="task-text">Descripción:</label>
            <input type="text" id="task-text" required>
          </div>
          <div class="form-group">
            <label for="task-hour">Hora:</label>
            <select id="task-hour">
              ${Array.from({length: 11}, (_, i) => i + 8).map(h => 
                `<option value="${h}">${h}:00</option>`
              ).join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="task-category">Categoría:</label>
            <select id="task-category">
              <option value="Estudiar Factors Humans">Estudiar Factors Humans</option>
              <option value="Estudiar Anàlisi Complexa">Estudiar Anàlisi Complexa</option>
              <option value="Estudiar Programació">Estudiar Programació</option>
              <option value="Llegir Fantasia">Llegir Fantasia</option>
              <option value="Llegir Assaig">Llegir Assaig</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" id="cancel-task">Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    `;
    
    document.body.appendChild(taskForm);
    
    // Configurar eventos
    const form = taskForm.querySelector('#add-task-form');
    const cancelBtn = taskForm.querySelector('#cancel-task');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const text = form.querySelector('#task-text').value;
      const hour = form.querySelector('#task-hour').value;
      const category = form.querySelector('#task-category').value;
      
      // Garantizar que usamos la fecha correcta
      const taskDate = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        this.selectedDate.getDate(),
        parseInt(hour),
        0,
        0
      );
      
      this.addNewActivity({
        text: text,
        category: category,
        date: `${taskDate.getFullYear()}-${(taskDate.getMonth() + 1).toString().padStart(2, '0')}-${taskDate.getDate().toString().padStart(2, '0')}`,
        timestamp: taskDate.toISOString(),
        completed: false
      });
        
        document.body.removeChild(taskForm);
        this.renderDayTasks();
    });
    
    cancelBtn.addEventListener('click', () => {
      document.body.removeChild(taskForm);
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
  
  // Corregir la conversión de actividades
  getAllActivityData() {
    // Combinar datos de ActivityModal y CalendarPanel
    const readingActivities = JSON.parse(localStorage.getItem('readingActivities')) || [];
    
    // Convertir tareas del calendario al formato de actividades
    const calendarTasks = [];
    Object.entries(this.tasks).forEach(([dateKey, tasks]) => {
      const [year, month, day] = dateKey.split('-').map(Number);
      tasks.forEach(task => {
        // Corregir: month ya viene en formato 1-12, así que restamos 1 para JS Date
        calendarTasks.push({
          text: task.text,
          date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
          completed: task.completed,
          timestamp: task.createdAt || new Date(year, month-1, day, 12, 0, 0).toISOString(),
          category: 'Calendario'
        });
      });
    });
    
    return [...readingActivities, ...calendarTasks];
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
  
  // Corregir la adición de nuevas actividades
  addNewActivity(activity) {
    // Si es una tarea para el calendario, la guardamos en el sistema de tareas
    if (activity.category === 'Calendario') {
      // Usar directamente la fecha del objeto activity
      const activityDate = new Date(activity.date);
      const dateKey = `${activityDate.getFullYear()}-${activityDate.getMonth() + 1}-${activityDate.getDate()}`;
      
      if (!this.tasks[dateKey]) {
        this.tasks[dateKey] = [];
      }
      
      this.tasks[dateKey].push({
        text: activity.text,
        completed: false,
        createdAt: new Date().toISOString()
      });
      
      this.saveTasks();
    } 
    // Si no, la guardamos como actividad de lectura
    else {
      const activities = JSON.parse(localStorage.getItem('readingActivities')) || [];
      activities.push(activity);
      localStorage.setItem('readingActivities', JSON.stringify(activities));
    }
  }
  
  updateActivity(activity) {
    if (activity.bookId) {
      // Es una actividad de lectura
      const activities = JSON.parse(localStorage.getItem('readingActivities')) || [];
      const index = activities.findIndex(a => 
        a.bookId === activity.bookId && a.timestamp === activity.timestamp
      );
      
      if (index !== -1) {
        activities[index] = activity;
        localStorage.setItem('readingActivities', JSON.stringify(activities));
      }
    } else {
      // Es una tarea del calendario
      this.saveTasks();
    }
  }
  
  deleteActivity(activity) {
    if (activity.bookId) {
      // Es una actividad de lectura
      const activities = JSON.parse(localStorage.getItem('readingActivities')) || [];
      const filteredActivities = activities.filter(a => 
        !(a.bookId === activity.bookId && a.timestamp === activity.timestamp)
      );
      localStorage.setItem('readingActivities', JSON.stringify(filteredActivities));
    } else {
      // Es una tarea del calendario
      const dateKey = this.formatDateKey(new Date(activity.date));
      if (this.tasks[dateKey]) {
        const index = this.tasks[dateKey].findIndex(t => t.createdAt === activity.timestamp);
        if (index !== -1) {
          this.tasks[dateKey].splice(index, 1);
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
      'Estudiar Anàlisi Complexa': '#3498db',
      'Estudiar Programació': '#2ecc71',
      'Llegir Fantasia': '#9b59b6',
      'Llegir Assaig': '#e74c3c',
      'Calendario': '#1abc9c',
      'Otros': '#95a5a6'
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
  
  addStyles() {
    // Verificar si ya existe el estilo
    if (document.getElementById('calendar-panel-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'calendar-panel-styles';
    
    style.textContent = `
      .calendar-panel {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.9);
        width: 800px;
        max-width: 95vw;
        height: 600px;
        max-height: 90vh;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
        overflow: hidden;
      }
      
      .calendar-panel.active {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      
      .panel-content {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      .panel-header {
        background: #f5f5f5;
        border-bottom: 1px solid #e0e0e0;
        padding: 8px 16px;
      }
      
      .header-nav {
        display: flex;
        margin-bottom: 5px;
      }
      
      .header-nav button {
        background: none;
        border: none;
        padding: 5px 10px;
        margin-right: 5px;
        cursor: pointer;
        border-radius: 50%;
      }
      
      .header-nav button:hover {
        background-color: #e0e0e0;
      }
      
      .url-bar {
        background: white;
        border: 1px solid #ccc;
        border-radius: 15px;
        padding: 5px 15px;
        text-align: center;
        color: #666;
      }
      
      /* Vista de Mes */
      .month-view {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 15px;
        overflow-y: auto;
      }
      
      .month-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }
      
      .month-header h2 {
        margin: 0;
        font-weight: 500;
        text-transform: uppercase;
      }
      
      .nav-button {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 5px 10px;
      }
      
      .weekdays-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        font-weight: bold;
        margin-bottom: 5px;
        color: #666;
      }
      
      .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: minmax(80px, 1fr);
        gap: 5px;
        flex: 1;
      }
      
      .day {
        border: 1px solid #e0e0e0;
        padding: 5px;
        min-height: 80px;
        display: flex;
        flex-direction: column;
      }
      
      .day-number {
        font-weight: bold;
        margin-bottom: 5px;
      }
      
      .day.today {
        background-color: #f2f8fd;
        border-color: #3498db;
      }
      
      .day.prev-month, .day.next-month {
        background-color: #f9f9f9;
        color: #aaa;
      }
      
      .day-tasks {
        display: flex;
        flex-direction: column;
        gap: 2px;
        overflow: hidden;
      }
      
      .task-item {
        background-color: #e0e0e0;
        border-radius: 3px;
        padding: 2px 5px;
        font-size: 0.8rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      
      .more-tasks {
        font-size: 0.7rem;
        color: #666;
        text-align: center;
        margin-top: 2px;
      }
      
      .calendar-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #e0e0e0;
      }
      
      .search-container {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .footer-button {
        padding: 8px 15px;
        background: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .footer-button:hover {
        background: #e0e0e0;
      }
      
      /* Vista de Día */
      .day-view {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 15px;
        overflow: hidden;
      }
      
      .day-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }
      
      .day-header h2 {
        margin: 0;
        font-weight: 500;
      }
      
      .close-task-view {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
      }
      
      .day-timeline {
        flex: 1;
        overflow-y: auto;
        border-top: 1px solid #e0e0e0;
      }
      
      .time-slot {
        display: flex;
        border-bottom: 1px solid #e0e0e0;
        min-height: 60px;
      }
      
      .time-label {
        width: 60px;
        padding: 10px;
        text-align: center;
        font-weight: bold;
        color: #666;
        border-right: 1px solid #e0e0e0;
      }
      
      .time-content {
        flex: 1;
        padding: 5px;
      }
      
      .day-task-item {
        margin-bottom: 5px;
        border-radius: 4px;
        padding: 8px;
        background-color: #e0e0e0;
      }
      
      .task-title {
        font-weight: bold;
        margin-bottom: 3px;
      }
      
      .task-detail {
        font-size: 0.9rem;
        color: #555;
      }
      
      .task-actions {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .task-completed {
        opacity: 0.6;
      }
      
      .task-completed .task-title,
      .task-completed .task-detail {
        text-decoration: line-through;
      }
      
      .delete-task {
        background-color: #e74c3c;
        color: white;
        border: none;
        padding: 3px 8px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 0.8rem;
      }
      
      .day-footer {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #e0e0e0;
      }
      
      .primary-button {
        padding: 8px 15px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      
      /* Formulario de tareas */
      .task-form-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1100;
      }
      
      .task-form-container {
        width: 400px;
        max-width: 90%;
        background: white;
        padding: 20px;
        border-radius: 8px;
      }
      
      .form-group {
        margin-bottom: 15px;
      }
      
      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      
      .form-group input,
      .form-group select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      
      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
      
      .form-actions button {
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .form-actions button[type="submit"] {
        background: #3498db;
        color: white;
        border: none;
      }
      
      .form-actions button[type="button"] {
        background: #f5f5f5;
        border: 1px solid #ddd;
      }
      
      @media (max-width: 768px) {
        .calendar-panel {
          width: 95%;
          height: 85vh;
        }
        
        .calendar-grid {
          grid-auto-rows: minmax(60px, 1fr);
        }
      }
    `;

    style.textContent += `
      .panel-header {
        background: #f5f5f5;
        border-bottom: 1px solid #e0e0e0;
        padding: 8px 16px;
      }
      
      .header-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 36px;
      }
      
      .left-buttons {
        display: flex;
      }
      
      .right-buttons {
        display: flex;
      }
      
      .back-button, .refresh-button, .close-button {
        background: none;
        border: none;
        cursor: pointer;
        height: 36px;
        width: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      
      .back-button, .refresh-button {
        font-size: 1.2rem;
      }
      
      .close-button {
        font-size: 1.5rem;
      }
      
      .back-button:hover, .refresh-button:hover, .close-button:hover {
        background-color: #e0e0e0;
      }
    `;
    
    document.head.appendChild(style);
  }
}