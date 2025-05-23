import { ProgressAnimationService } from './ProgressAnimation.js';

export class CleaningModal {
    constructor() {
      this.modal = null;
      this.formModal = null;
      this.currentItem = null;
      this.onSave = null;
      this.init();
      
      // Agregar datos simulados para limpiezas
      this.addMockActivities();
  
      // Escuchar eventos de calendario para actividades de limpieza
      document.addEventListener('calendar-task-completed', () => {
        this.loadCleaningStats();
        this.calculateCleanlinessLevel();
      });
      
      document.addEventListener('cleaning-activity-updated', (event) => {
        console.log('Actividad de limpieza actualizada desde calendario:', event.detail.activity);
        this.loadCleaningStats();
        this.calculateCleanlinessLevel();
      });
      
      document.addEventListener('cleaning-activity-deleted', (event) => {
        console.log('Actividad de limpieza eliminada desde calendario:', event.detail.activity);
        this.loadCleaningStats();
        this.calculateCleanlinessLevel();
      });
    }

    updateAllStats() {
        // Actualizar barras de progreso y stats
        const cleaningActivities = this.getCleaningActivities();
        
        // Actualizar elementos de estadística si el modal está abierto
        if (this.modal) {
          const totalHoursElement = this.modal.querySelector('#total-cleaning-hours');
          const lastSessionElement = this.modal.querySelector('#last-cleaning-session');
          const sessionsCountElement = this.modal.querySelector('#cleaning-sessions-count');
          
          if (totalHoursElement && lastSessionElement && sessionsCountElement) {
            // Calcular horas totales
            const totalHours = cleaningActivities.reduce((sum, act) => {
              return sum + parseFloat(act.hours || 0);
            }, 0);
            
            totalHoursElement.textContent = totalHours.toFixed(1);
            sessionsCountElement.textContent = cleaningActivities.length;
            
            // Última sesión
            if (cleaningActivities.length > 0) {
              const sortedActivities = [...cleaningActivities].sort((a, b) => 
                new Date(b.date) - new Date(a.date)
              );
              
              const lastDate = new Date(sortedActivities[0].date);
              const formatOptions = { day: 'numeric', month: 'short' };
              lastSessionElement.textContent = lastDate.toLocaleDateString('es-ES', formatOptions);
            } else {
              lastSessionElement.textContent = '-';
            }
            
            // Actualizar barras de progreso
            this.loadCleaningTypeStats(cleaningActivities);
          }
        }
        
        // Siempre recalcular el nivel de limpieza
        this.calculateCleanlinessLevel();
      }
      
      // Modificar loadCleaningStats para llamar a updateAllStats
      loadCleaningStats() {
        this.updateAllStats();
      }
    
    init() {
      // Modal principal (estadísticas y opciones)
      this.modal = document.createElement('div');
      this.modal.className = 'cleaning-modal hidden';
      this.modal.setAttribute('role', 'dialog');
      this.modal.setAttribute('aria-modal', 'true');
      this.modal.setAttribute('aria-labelledby', 'cleaning-title');
      
      this.modal.innerHTML = `
        <div class="modal-content stats-modal">
          <span class="close-button" aria-label="Cerrar">&times;</span>
          <h2 id="cleaning-title">Escoba</h2>
          
          <div class="cleaning-stats">
            <h3>Actividad de limpieza reciente</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value" id="total-cleaning-hours">0</div>
                <div class="stat-label">Horas totales</div>
              </div>
              <div class="stat-item">
                <div class="stat-value" id="last-cleaning-session">-</div>
                <div class="stat-label">Última limpieza</div>
              </div>
              <div class="stat-item">
                <div class="stat-value" id="cleaning-sessions-count">0</div>
                <div class="stat-label">Limpiezas totales</div>
              </div>
            </div>
          </div>
          
          <!-- Sección para mostrar tipos de limpieza y progreso -->
          <div class="cleaning-type-stats">
            <h3>Tipos de limpieza</h3>
            <div id="cleaning-progress" class="cleaning-container">
              <!-- Aquí se insertarán las barras de progreso -->
              <div class="loading-cleaning">Cargando datos de limpieza...</div>
            </div>
          </div>
          
          <div class="modal-actions">
            <button id="view-cleaning-history" class="secondary-button">Ver historial</button>
            <button id="add-cleaning" class="primary-button">Registrar limpieza</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(this.modal);
      
      // Modal de formulario
      this.formModal = document.createElement('div');
      this.formModal.className = 'cleaning-modal hidden';
      this.formModal.setAttribute('role', 'dialog');
      this.formModal.setAttribute('aria-modal', 'true');
      this.formModal.setAttribute('aria-labelledby', 'form-title');
      
      this.formModal.innerHTML = `
        <div class="modal-content">
          <span class="close-button" aria-label="Cerrar">&times;</span>
          <h2 id="form-title">Registrar una limpieza</h2>
          <p id="form-cleaning-title" class="form-subtitle"></p>
          
          <div class="cleaning-form">
            <div class="form-group">
              <label for="cleaning-type">Tipo de limpieza:</label>
              <select id="cleaning-type" aria-required="true">
                <option value="Barrer">Barrer</option>
                <option value="Fregar">Fregar el suelo</option>
                <option value="Quitar el polvo">Quitar el polvo</option>
                <option value="Limpiar cristales">Limpiar cristales</option>
                <option value="Limpieza general">Limpieza general</option>
              </select>
            </div>
            <div class="form-group">
              <label for="cleaning-date">Fecha:</label>
              <input type="date" id="cleaning-date" aria-required="true">
            </div>
            <div class="form-group">
            <label for="cleaning-hour">Hora de inicio:</label>
            <select id="cleaning-hour" aria-required="true">
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
              <label for="cleaning-time">Duración (horas):</label>
              <input type="number" id="cleaning-time" min="0.25" max="24" step="0.25" value="1" aria-required="true">
            </div>
            <div class="form-group">
              <label for="cleaning-notes">Notas:</label>
              <textarea id="cleaning-notes" rows="3"></textarea>
            </div>

            <!-- Botón para mostrar/ocultar campos adicionales -->
            <button type="button" id="show-more-fields" class="secondary-button">Añadir más datos</button>
            
            <!-- Sección adicional inicialmente oculta -->
            <div id="additional-fields" class="additional-fields" style="display: none;">
              <hr>
              <div class="form-group">
                <label for="cleaning-location">Ubicación:</label>
                <input type="text" id="cleaning-location" placeholder="Dirección o ubicación">
              </div>
              <div class="form-group">
                <label for="cleaning-urgency">Nivel de urgencia:</label>
                <select id="cleaning-urgency">
                  <option value="baja">Baja</option>
                  <option value="normal" selected>Normal</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
              <div class="form-group">
                <label for="cleaning-url">URL relacionada:</label>
                <input type="url" id="cleaning-url" placeholder="https://...">
              </div>
              <div class="form-group">
                <label for="cleaning-guests">Invitados:</label>
                <input type="text" id="cleaning-guests" placeholder="Nombres separados por comas">
              </div>
            </div>
            
            <button id="save-cleaning" class="save-button">Guardar actividad</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(this.formModal);
      
      // Configurar eventos
      const closeBtn = this.modal.querySelector('.close-button');
      closeBtn.addEventListener('click', () => this.hide());
      
      const viewHistoryBtn = this.modal.querySelector('#view-cleaning-history');
      viewHistoryBtn.addEventListener('click', () => this.showHistory());
      
      const addCleaningBtn = this.modal.querySelector('#add-cleaning');
      addCleaningBtn.addEventListener('click', () => this.showCleaningForm());
      
      const closeFormBtn = this.formModal.querySelector('.close-button');
      closeFormBtn.addEventListener('click', () => {
        this.formModal.classList.add('hidden');
        this.modal.classList.remove('hidden');
      });
      
      const saveBtn = this.formModal.querySelector('#save-cleaning');
      saveBtn.addEventListener('click', () => this.saveCleaningActivity());

      const showMoreFieldsBtn = this.formModal.querySelector('#show-more-fields');
      const additionalFields = this.formModal.querySelector('#additional-fields');

      showMoreFieldsBtn.addEventListener('click', () => {
        if (additionalFields.style.display === 'none') {
          additionalFields.style.display = 'block';
          showMoreFieldsBtn.textContent = 'Mostrar menos datos';
        } else {
          additionalFields.style.display = 'none';
          showMoreFieldsBtn.textContent = 'Añadir más datos';
        }
      });
      
      // Inicializar fecha a hoy
      const dateInput = this.formModal.querySelector('#cleaning-date');
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      dateInput.value = dateStr;
    }
    
    show(item) {
      this.currentItem = item;
      
      // Actualizar título
      const cleaningTitle = this.modal.querySelector('#cleaning-title');
      cleaningTitle.textContent = "Actividades de limpieza";
      
      // Cargar estadísticas
      this.loadCleaningStats();
      
      // Mostrar el modal
      this.modal.classList.remove('hidden');
    }
    
    hide() {
      this.modal.classList.add('hidden');
      this.formModal.classList.add('hidden');
      this.currentItem = null;
    }
    
    showCleaningForm() {
      // Ocultar modal principal y mostrar formulario
      this.modal.classList.add('hidden');
      
      // Actualizar información en el formulario
      const formTitle = this.formModal.querySelector('#form-cleaning-title');
      formTitle.textContent = "Registra una nueva actividad de limpieza";
      
      // Mostrar formulario
      this.formModal.classList.remove('hidden');
      
      // Focus al primer campo por accesibilidad
      setTimeout(() => {
        this.formModal.querySelector('#cleaning-date').focus();
      }, 100);
    }
    
    showHistory() {
      // Obtener actividades de limpieza
      const cleaningActivities = this.getCleaningActivities();
      
      // Mostrar historial
      if (cleaningActivities.length > 0) {
        let message = `Historial de actividades de limpieza:\n\n`;
        cleaningActivities.forEach((act, index) => {
          message += `${index + 1}. ${act.date}: ${act.hours} horas - ${act.type}\n`;
          if (act.notes) message += `   Notas: ${act.notes}\n`;
        });
        alert(message);
      } else {
        alert('Todavía no hay actividades de limpieza registradas.');
      }
    }
    
    loadCleaningStats() {
      // Obtener actividades de limpieza
      const cleaningActivities = this.getCleaningActivities();
      
      // Actualizar elementos de estadística
      const totalHoursElement = this.modal.querySelector('#total-cleaning-hours');
      const lastSessionElement = this.modal.querySelector('#last-cleaning-session');
      const sessionsCountElement = this.modal.querySelector('#cleaning-sessions-count');
      
      // Calcular horas totales
      const totalHours = cleaningActivities.reduce((sum, act) => {
        return sum + parseFloat(act.hours || 0);
      }, 0);
      
      totalHoursElement.textContent = totalHours.toFixed(1);
      sessionsCountElement.textContent = cleaningActivities.length;
      
      // Última sesión
      if (cleaningActivities.length > 0) {
        const sortedActivities = [...cleaningActivities].sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );
        
        const lastDate = new Date(sortedActivities[0].date);
        const formatOptions = { day: 'numeric', month: 'short' };
        lastSessionElement.textContent = lastDate.toLocaleDateString('es-ES', formatOptions);
      } else {
        lastSessionElement.textContent = '-';
      }
      
      // Cargar estadísticas por tipo de limpieza
      this.loadCleaningTypeStats(cleaningActivities);
    }
    
    loadCleaningTypeStats(cleaningActivities) {
      const cleaningContainer = this.modal.querySelector('#cleaning-progress');
      
      if (cleaningActivities.length === 0) {
        cleaningContainer.innerHTML = `
          <p class="no-data-message">Todavía no hay actividades de limpieza registradas.</p>
        `;
        return;
      }
      
      // Agrupar por tipo y sumar horas
      const typeHours = {};
      let totalHours = 0;
      
      cleaningActivities.forEach(activity => {
        const type = activity.type;
        if (!typeHours[type]) {
          typeHours[type] = 0;
        }
        const hours = parseFloat(activity.hours || 0);
        typeHours[type] += hours;
        totalHours += hours;
      });
      
      // Encontrar el tipo con más horas para escalar
      const maxHours = Math.max(...Object.values(typeHours));
      
      // Renderizar barras de progreso
      cleaningContainer.innerHTML = '';
      
      Object.entries(typeHours)
        .sort((a, b) => b[1] - a[1])
        .forEach(([type, hours]) => {
          const percentage = totalHours > 0 ? (hours / totalHours * 100).toFixed(1) : '0.0';
          const scaledPercentage = maxHours > 0 ? Math.round((hours / maxHours) * 100) : 0;
          
          const typeElement = document.createElement('div');
          typeElement.className = 'cleaning-type-item';
          
          // Crear un color basado en el tipo
          const hue = this.getHueFromString(type);
          const color = `hsl(${hue}, 70%, 50%)`;
          
          typeElement.innerHTML = `
            <div class="cleaning-type-label">
              <span class="cleaning-type-name">${type}</span>
              <span class="cleaning-type-percentage">${percentage}%</span>
            </div>
            <div class="cleaning-progress-container">
              <div class="cleaning-progress-bar" style="width: ${scaledPercentage}%; background-color: ${color}"></div>
            </div>
            <div class="cleaning-type-hours">${hours.toFixed(1)} horas</div>
          `;
          
          cleaningContainer.appendChild(typeElement);
        });
    }
    
    getHueFromString(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash % 360;
    }
    
    getCleaningActivities() {
      return JSON.parse(localStorage.getItem('cleaningActivities')) || [];
    }
    
    saveCleaningActivity() {
      const typeSelect = this.formModal.querySelector('#cleaning-type');
      const dateInput = this.formModal.querySelector('#cleaning-date');
      const hourSelect = this.formModal.querySelector('#cleaning-hour');
      const timeInput = this.formModal.querySelector('#cleaning-time');
      const notesInput = this.formModal.querySelector('#cleaning-notes');

      const locationInput = this.formModal.querySelector('#cleaning-location');
      const urgencySelect = this.formModal.querySelector('#cleaning-urgency');
      const urlInput = this.formModal.querySelector('#cleaning-url');
      const guestsInput = this.formModal.querySelector('#cleaning-guests');
      
      const hours = parseFloat(timeInput.value);
      if (isNaN(hours)) {
        alert('Por favor, introduce un número válido de horas');
        return;
      }
      
      // Crear fecha con hora específica
      const selectedDate = new Date(dateInput.value);
      selectedDate.setHours(parseInt(hourSelect.value), 0, 0);
      
      const activityData = {
        type: typeSelect.value,
        date: dateInput.value,
        hour: parseInt(hourSelect.value), // Guardar la hora
        hours: hours,
        notes: notesInput.value,
        timestamp: selectedDate.toISOString(), // Timestamp con hora correcta
        completed: true,
        sourceType: 'cleaning',
        location: locationInput.value || null,
        urgency: urgencySelect.value || 'normal',
        url: urlInput.value || null,
        guests: guestsInput.value || null
      };
  
      
      // Guardar actividad
      const activities = this.getCleaningActivities();
      activities.push(activityData);
      localStorage.setItem('cleaningActivities', JSON.stringify(activities));
      
      // Disparar evento para actualizar calendario
      const event = new CustomEvent('cleaning-activity-added', { 
        detail: { activity: activityData }
      });
      document.dispatchEvent(event);
      
      // Ocultar formulario y mostrar animación
      this.formModal.classList.add('hidden');
      
      // Mostrar animación de progreso
      ProgressAnimationService.showProgressAnimation(
        activityData.type, 
        'cleaning'
      );
      
      // Volver a mostrar modal principal después de la animación
      setTimeout(() => {
        this.loadCleaningStats();
        this.modal.classList.remove('hidden');
      }, 2800);
    }
    
    setOnSave(callback) {
      this.onSave = callback;
    }
    
    // Método para agregar datos simulados
    addMockActivities() {
      const existingActivities = this.getCleaningActivities();
      
      if (existingActivities.length > 0) {
        return;
      }
      
      const mockActivities = [
        {
          type: "Barrer",
          date: "2025-03-10",
          hours: 0.5,
          notes: "Limpieza del salón",
          timestamp: "2025-03-10T10:30:00.000Z",
          completed: true
        },
        {
          type: "Fregar",
          date: "2025-03-15",
          hours: 1.0,
          notes: "Limpieza completa de la casa",
          timestamp: "2025-03-15T14:00:00.000Z",
          completed: true
        },
        {
          type: "Quitar el polvo",
          date: "2025-03-20",
          hours: 0.75,
          notes: "Limpieza de la librería",
          timestamp: "2025-03-20T09:30:00.000Z",
          completed: true
        },
        {
          type: "Limpiar cristales",
          date: "2025-04-01",
          hours: 1.25,
          notes: "Limpieza de las ventanas",
          timestamp: "2025-04-01T15:20:00.000Z",
          completed: true
        },
        {
          type: "Barrer",
          date: "2025-04-05",
          hours: 0.5,
          notes: "Limpieza rápida",
          timestamp: "2025-04-05T18:00:00.000Z",
          completed: true
        }
      ];
      
      localStorage.setItem('cleaningActivities', JSON.stringify(mockActivities));
      console.log("Se han añadido actividades de limpieza simuladas.");
    }

    calculateCleanlinessLevel() {
        const activities = this.getCleaningActivities();
        
        // Si no hay actividades, escoba completamente sucia (nivel 0)
        if (activities.length === 0) {
        this.cleanlinessLevel = 0;
        console.log("Nivel de limpieza: 0 (sin actividades)");
        document.dispatchEvent(new CustomEvent('cleanliness-level-changed', { 
            detail: { level: 0 }
        }));
        return 0;
        }
        
        // Obtener fecha actual y fecha de hace 7 días
        const today = new Date();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        
        // Filtrar actividades de la última semana
        const weeklyActivities = activities.filter(act => {
        const actDate = new Date(act.date);
        return actDate >= oneWeekAgo && actDate <= today;
        });
        
        // Calcular horas totales de la semana
        const weeklyHours = weeklyActivities.reduce((sum, act) => {
        return sum + parseFloat(act.hours || 0);
        }, 0);
        
        // Objetivo: 17 horas semanales = 100% limpia
        const targetHours = 17;
        
        // Calcular nivel de limpieza (0-100) basado en horas semanales
        let cleanlinessPercentage = Math.min(100, (weeklyHours / targetHours) * 100);
        
        // Garantizar que el nivel no sea menor a 10% si hay alguna actividad reciente
        if (weeklyActivities.length > 0 && cleanlinessPercentage < 10) {
        cleanlinessPercentage = 10;
        }
        
        this.cleanlinessLevel = Math.round(cleanlinessPercentage);
        
        console.log(`Nivel de limpieza: ${this.cleanlinessLevel}% (${weeklyHours.toFixed(1)} horas semanales)`);
        
        // Disparar evento para actualizar la escoba
        document.dispatchEvent(new CustomEvent('cleanliness-level-changed', { 
        detail: { level: this.cleanlinessLevel }
        }));
        
        return this.cleanlinessLevel;
    }
}