export class ActivityModal {
  constructor() {
    this.modal = null;
    this.formModal = null;
    this.currentBook = null;
    this.onSave = null;
    this.init();
    
    // Afegim activitats simulades si no hi ha dades
    this.addMockActivities();

    // Escuchar eventos de actividades de calendario
    document.addEventListener('calendar-task-completed', () => {
      // Actualizar estadísticas cuando se completa una tarea del calendario
      if (this.currentBook) {
        this.loadBookStats(this.currentBook.userData.id);
      }
      this.loadCategoryStats();
    });
    
    document.addEventListener('calendar-task-uncompleted', () => {
      // Actualizar estadísticas cuando una tarea cambia a no completada
      if (this.currentBook) {
        this.loadBookStats(this.currentBook.userData.id);
      }
      this.loadCategoryStats();
    });
  }
  
  init() {
    // Primer modal (estadístiques i opcions)
    this.modal = document.createElement('div');
    this.modal.className = 'activity-modal hidden';
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('aria-labelledby', 'book-title');
    
    this.modal.innerHTML = `
      <div class="modal-content stats-modal">
        <span class="close-button" aria-label="Tancar">&times;</span>
        <h2 id="book-title">Llibre</h2>
        
        <div class="book-stats">
          <h3>Activitat recent</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value" id="total-hours">0</div>
              <div class="stat-label">Hores totals</div>
            </div>
            <div class="stat-item">
              <div class="stat-value" id="last-session">-</div>
              <div class="stat-label">Última sessió</div>
            </div>
            <div class="stat-item">
              <div class="stat-value" id="sessions-count">0</div>
              <div class="stat-label">Sessions</div>
            </div>
          </div>
        </div>
        
        <!-- Nova secció per mostrar les categories i el progrés -->
        <div class="category-stats">
          <h3>Distribució per categories</h3>
          <div id="categories-progress" class="categories-container">
            <!-- Aquí s'inseriran les barres de progrés -->
            <div class="loading-categories">Carregant dades de categories...</div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button id="view-history" class="secondary-button">Veure historial</button>
          <button id="add-activity" class="primary-button">Afegir activitat</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.modal);
    
    // Segon modal (formulari)
    this.formModal = document.createElement('div');
    this.formModal.className = 'activity-modal hidden';
    this.formModal.setAttribute('role', 'dialog');
    this.formModal.setAttribute('aria-modal', 'true');
    this.formModal.setAttribute('aria-labelledby', 'form-title');
    this.formModal.setAttribute('aria-describedby', 'modal-description');
    
    this.formModal.innerHTML = `
      <div class="modal-content">
        <span class="close-button" aria-label="Tancar">&times;</span>
        <h2 id="form-title">Registra activitat</h2>
        <p id="form-book-title" class="book-form-title"></p>
        <div id="modal-description" class="visually-hidden">Formulari per registrar hores de lectura</div>
        
        <div class="activity-form">
          <div class="form-group">
            <label for="activity-category">Categoria:</label>
            <select id="activity-category" aria-required="true" aria-label="Categoria de l'activitat">
              <option value="Estudiar Factors Humans">Estudiar Factors Humans</option>
              <option value="Estudiar Anàlisi Complexa">Estudiar Anàlisi Complexa</option>
              <option value="Estudiar Programació">Estudiar Programació</option>
              <option value="Llegir Fantasia">Llegir Fantasia</option>
              <option value="Llegir Assaig">Llegir Assaig</option>
              <option value="Altres">Altres</option>
            </select>
          </div>
          <div class="form-group">
            <label for="activity-date">Data:</label>
            <input type="date" id="activity-date" aria-required="true" aria-label="Data de lectura">
          </div>
          <div class="form-group">
            <label for="activity-time">Hores d'activitat:</label>
            <input type="number" id="activity-time" min="0.25" max="24" step="0.25" value="1" aria-required="true" aria-label="Hores d'activitat">
          </div>
          <div class="form-group">
            <label for="activity-notes">Notes:</label>
            <textarea id="activity-notes" rows="3" aria-label="Notes sobre l'activitat"></textarea>
          </div>
          <button id="save-activity" class="save-button">Desa activitat</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.formModal);
    
    // Configurem els events del primer modal
    const closeBtn = this.modal.querySelector('.close-button');
    closeBtn.addEventListener('click', () => this.hide());
    
    const viewHistoryBtn = this.modal.querySelector('#view-history');
    viewHistoryBtn.addEventListener('click', () => this.showHistory());
    
    const addActivityBtn = this.modal.querySelector('#add-activity');
    addActivityBtn.addEventListener('click', () => this.showActivityForm());
    
    // Configurem els events del segon modal
    const closeFormBtn = this.formModal.querySelector('.close-button');
    closeFormBtn.addEventListener('click', () => {
      this.formModal.classList.add('hidden');
      this.modal.classList.remove('hidden');
    });
    
    const saveBtn = this.formModal.querySelector('#save-activity');
    saveBtn.addEventListener('click', () => this.saveActivity());
    
    // Afegim l'event per ESC segons accessibilitat
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
    
    // Inicialitzem la data a avui
    const dateInput = this.formModal.querySelector('#activity-date');
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    dateInput.value = dateStr;
  }
  
  show(book) {
    this.currentBook = book;
    
    // Actualitzem només el títol del llibre
    const bookTitle = this.modal.querySelector('#book-title');
    bookTitle.textContent = book.userData.title;
    
    // Carreguem les estadístiques del llibre
    this.loadBookStats(book.userData.id);
    
    // Carreguem les estadístiques de categories
    this.loadCategoryStats();
    
    // Mostrem el primer modal
    this.modal.classList.remove('hidden');
  }
  
  hide() {
    this.modal.classList.add('hidden');
    this.formModal.classList.add('hidden');
    this.currentBook = null;
  }
  
  showActivityForm() {
    // Ocultem el primer modal i mostrem el formulari
    this.modal.classList.add('hidden');
    
    // Actualitzem la informació del llibre al formulari
    const formBookTitle = this.formModal.querySelector('#form-book-title');
    formBookTitle.textContent = this.currentBook.userData.title;
    
    // Mostrem el formulari
    this.formModal.classList.remove('hidden');
    
    // Focus al primer camp per accessibilitat
    setTimeout(() => {
      this.formModal.querySelector('#activity-date').focus();
    }, 100);
  }
  
  showHistory() {
    // Implementació per mostrar l'historial (podria ser un tercer modal o una secció)
    console.log("Mostrant l'historial de " + this.currentBook.userData.title);
    
    // Aquí es podria carregar l'historial del localStorage i mostrar-lo
    const activitats = this.getActivitatsByBookId(this.currentBook.userData.id);
    
    // Per ara simplement mostrarem un alert amb les activitats
    if (activitats.length > 0) {
      let missatge = `Historial d'activitats per "${this.currentBook.userData.title}":\n\n`;
      activitats.forEach((act, index) => {
        missatge += `${index + 1}. ${act.date}: ${act.hours} hores\n`;
        if (act.notes) missatge += `   Notes: ${act.notes}\n`;
      });
      alert(missatge);
    } else {
      alert(`Encara no hi ha activitats registrades per "${this.currentBook.userData.title}".`);
    }
  }
  
  loadBookStats(bookId) {
    if (!bookId) return;

    // Obtener actividades de lectura relacionadas con este libro
    const actividades = this.getActivitatsByBookId(bookId);
    
    // Obtener tareas del calendario que estén relacionadas con este libro
    const calendarTasksRaw = JSON.parse(localStorage.getItem('calendar-tasks')) || {};
    const calendarActivities = [];
    
    // Lista de categorías de lectura/estudio
    const readingCategories = [
      "Estudiar Factors Humans", "Estudiar Anàlisi Complexa", 
      "Estudiar Programació", "Llegir Fantasia", "Llegir Assaig"
    ];
    
    Object.entries(calendarTasksRaw).forEach(([dateKey, tasks]) => {
      tasks.forEach(task => {
        // Solo incluir tareas completadas, de tipo lectura o con categorías de lectura
        // y excluir explícitamente tareas de tipo deporte
        if (task.completed && 
            (readingCategories.includes(task.category) || task.sourceType === 'reading') && 
            task.sourceType !== 'sport') {
          
          // Si la tarea tiene sourceId de libro y coincide con este libro,
          // o si no tiene sourceId pero es de una categoría usada por este libro
          if ((task.sourceId === bookId) || 
              (bookId === this.currentBook?.userData?.id && !task.sourceId)) {
            calendarActivities.push({
              category: task.category,
              hours: task.duration || 1,
              timestamp: task.createdAt || new Date().toISOString()
            });
          }
        }
      });
    });

    // Combinar ambas fuentes de datos
    const allActivities = [...actividades, ...calendarActivities];
    
    // Actualitzem els elements d'estadística
    const totalHoursElement = this.modal.querySelector('#total-hours');
    const lastSessionElement = this.modal.querySelector('#last-session');
    const sessionsCountElement = this.modal.querySelector('#sessions-count');
    
    // Calcular estadísticas combinadas
    const totalHoras = allActivities.reduce((sum, act) => {
      const hours = parseFloat(act.hours || act.duration || 0);
      return sum + (isNaN(hours) ? 0 : hours);
    }, 0);
    totalHoursElement.textContent = totalHoras.toFixed(1);
    
    // Nombre de sessions
    sessionsCountElement.textContent = actividades.length;
    
    // Última sessió
    if (actividades.length > 0) {
      // Ordenem per data més recent
      const sortedActivitats = [...actividades].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      
      const lastDate = new Date(sortedActivitats[0].date);
      const formatOptions = { day: 'numeric', month: 'short' };
      lastSessionElement.textContent = lastDate.toLocaleDateString('ca-ES', formatOptions);
    } else {
      lastSessionElement.textContent = '-';
    }
  }
  
  loadCategoryStats() {
    // Obtener actividades de lectura
    const readingActivities = JSON.parse(localStorage.getItem('readingActivities')) || [];

    // Obtener tareas del calendario
    const calendarTasksRaw = JSON.parse(localStorage.getItem('calendar-tasks')) || {};
    const calendarActivities = [];

    // Convertir el formato de tareas de calendario a un array similar al de lectura
    Object.entries(calendarTasksRaw).forEach(([dateKey, tasks]) => {
      tasks.forEach(task => {
        if (task.completed) { // Solo contar las tareas completadas
          calendarActivities.push({
            category: task.category || 'Otros',
            hours: task.duration || 1,
            timestamp: task.createdAt || new Date().toISOString()
          });
        }
      });
    });
    
    // Combinar ambas fuentes de actividades
    const allActivities = [...readingActivities, ...calendarActivities];
    
    if (allActivities.length === 0) {
      const categoriesContainer = this.modal.querySelector('#categories-progress');
      categoriesContainer.innerHTML = `
        <p class="no-data-message">Encara no hi ha activitats registrades.</p>
      `;
      return;
    }
    
    // Agrupem les activitats per categoria i sumem les hores
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
    
    // Trobem la categoria amb més hores per escalar els percentatges
    const maxHours = Math.max(...Object.values(categoryHours));
    
    // Calculem els percentatges i creem les barres de progrés
    const categoriesContainer = this.modal.querySelector('#categories-progress');
    categoriesContainer.innerHTML = '';
    
    Object.entries(categoryHours)
      .sort((a, b) => b[1] - a[1]) // Ordenem per hores (descendent)
      .forEach(([category, hours]) => {
        // Usar toFixed para mostrar siempre un decimal en el porcentaje
        const realPercentage = totalHours > 0 ? (hours / totalHours * 100).toFixed(1) : '0.0';
        
        const scaledPercentage = maxHours > 0 ? Math.round((hours / maxHours) * 100) : 0;
        
        // Mismo toFixed para horas
        const formattedHours = hours.toFixed(1);
        
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category-item';
        
        // Creem un color dinàmic basat en el nom de la categoria
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
          <div class="category-hours">${formattedHours} hores</div>
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
  
  getActivitatsByBookId(bookId) {
    // Recupera les activitats del localStorage
    const allActivities = JSON.parse(localStorage.getItem('readingActivities')) || [];
    
    // Filtra només les d'aquest llibre
    return allActivities.filter(act => act.bookId === bookId);
  }
  
  setOnSave(callback) {
    this.onSave = callback;
  }
  
  saveActivity() {
    if (!this.currentBook) return;
  
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
      bookId: this.currentBook.userData.id,
      bookTitle: this.currentBook.userData.title,
      category: categorySelect.value,
      date: dateInput.value,
      hours: hours,
      notes: notesInput.value,
      timestamp: new Date().toISOString(),
      sourceType: 'reading',
      completed: true, // Marcar automáticamente como completado
      duration: hours // Añadir también la duración para consistencia
    };
    
    // El resto del código permanece igual
    const activities = JSON.parse(localStorage.getItem('readingActivities')) || [];
    activities.push(activityData);
    localStorage.setItem('readingActivities', JSON.stringify(activities));
    
    // Disparar un evento que CalendarPanel pueda escuchar para actualizar su vista
    const event = new CustomEvent('reading-activity-added', { 
      detail: { activity: activityData }
    });
    document.dispatchEvent(event);
    
    // Actualizar estadísticas y cerrar el formulario
    this.loadBookStats(this.currentBook.userData.id);
    this.loadCategoryStats();
    this.formModal.classList.add('hidden');
    this.modal.classList.remove('hidden');
  }

  // Afegim mètode per generar activitats de prova
  addMockActivities() {
    // Comprovem si ja existeixen activitats
    const existingActivities = JSON.parse(localStorage.getItem('readingActivities')) || [];
    
    if (existingActivities.length > 0) {
      console.log("Ja hi ha activitats registrades, no s'afegiran les simulades.");
      return;
    }
    
    const mockActivities = [
      // Activitats d'estudi de Factors Humans
      {
        bookId: "book_0",
        bookTitle: "Llibre 1",
        category: "Estudiar Factors Humans",
        date: "2025-03-15",
        hours: 2.5,
        notes: "Capítol sobre disseny centrat en l'usuari",
        timestamp: "2025-03-15T10:30:00.000Z"
      },
      {
        bookId: "book_5",
        bookTitle: "Llibre 6",
        category: "Estudiar Factors Humans",
        date: "2025-03-20",
        hours: 1.75,
        notes: "Accessibilitat i disseny universal",
        timestamp: "2025-03-20T15:45:00.000Z"
      },
      {
        bookId: "book_2",
        bookTitle: "Llibre 3",
        category: "Estudiar Factors Humans",
        date: "2025-04-05",
        hours: 3,
        notes: "Preparació exercicis avaluació d'usabilitat",
        timestamp: "2025-04-05T09:15:00.000Z"
      },
      
      // Activitats d'estudi d'Anàlisi Complexa
      {
        bookId: "book_1",
        bookTitle: "Llibre 2",
        category: "Estudiar Anàlisi Complexa",
        date: "2025-03-18",
        hours: 2,
        notes: "Teoria de funcions holomorfes",
        timestamp: "2025-03-18T14:20:00.000Z"
      },
      {
        bookId: "book_3",
        bookTitle: "Llibre 4",
        category: "Estudiar Anàlisi Complexa",
        date: "2025-04-01",
        hours: 3.5,
        notes: "Exercicis d'integració en el pla complex",
        timestamp: "2025-04-01T16:30:00.000Z"
      },
      
      // La resta d'activitats simulades amb diferents llibres i categories...
    ];
    
    // Desem les activitats simulades al localStorage
    localStorage.setItem('readingActivities', JSON.stringify(mockActivities));
    console.log("S'han afegit activitats simulades per provar el sistema de progrés.");
  }
}

// Classe d'estil auxiliar per text ocult per a lectors de pantalla
if (!document.getElementById('accessibility-styles')) {
  const style = document.createElement('style');
  style.id = 'accessibility-styles';
  style.textContent = `
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
  document.head.appendChild(style);
}