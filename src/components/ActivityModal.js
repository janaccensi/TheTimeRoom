import { ActivitiesMockData } from "../models/ActivitiesMockData";

export class ActivityModal {
  constructor() {
    this.modal = null;
    this.formModal = null;
    this.currentObject = null;
    this.onSave = null;
    this.init();
    
    // Afegim activitats simulades si no hi ha dades
    this.addMockActivities();

    // Escoltem events d'activitats de calendari
    document.addEventListener('calendar-task-completed', () => {
      // Actualitzem estadístiques quan es completa una tasca del calendari
      if (this.currentObject) {
        this.loadObjectStats(this.currentObject.userData.id, this.currentObject.userData.activityType || 'reading');
      }
      this.loadCategoryStats();
    });
    
    document.addEventListener('calendar-task-uncompleted', () => {
      // Actualitzem estadístiques quan una tasca canvia a no completada
      if (this.currentObject) {
        this.loadObjectStats(this.currentObject.userData.id, this.currentObject.userData.activityType || 'reading');
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
    this.modal.setAttribute('aria-labelledby', 'activity-title');
    
    this.modal.innerHTML = `
      <div class="modal-content stats-modal">
        <span class="close-button" aria-label="Tancar">&times;</span>
        <h2 id="activity-title">Activitat</h2>
        
        <!-- Secció per mostrar les categories i el progrés -->
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
        
        <!-- Contenidor específic pels detalls de l'objecte per evitar sobreposició -->
        <div class="object-details-container">
          <p id="form-object-title" class="object-form-title"></p>
          <p id="form-activity-type" class="activity-type-indicator"></p>
        </div>
        
        <div id="modal-description" class="visually-hidden">Formulari per registrar hores d'activitat</div>
        
        <div class="activity-form">
          <div class="form-group">
            <label for="activity-category">Categoria:</label>
            <select id="activity-category" aria-required="true" aria-label="Categoria de l'activitat">
              <!-- Les opcions s'ompliran dinàmicament segons el tipus d'activitat -->
            </select>
          </div>
          
          <!-- Nou camp de text personalitzat, inicialment ocult -->
          <div class="form-group custom-category-group hidden" id="custom-category-container">
            <label for="custom-category">La teva categoria:</label>
            <input type="text" id="custom-category" placeholder="Introdueix la categoria personalitzada" 
              aria-label="Categoria personalitzada">
          </div>
          
          <div class="form-group">
            <label for="activity-date">Data:</label>
            <input type="date" id="activity-date" aria-required="true" aria-label="Data de l'activitat">
          </div>
          <div class="form-group">
            <label for="activity-hour">Hora:</label>
            <select id="activity-hour" aria-label="Hora de l'activitat">
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
            <label for="activity-time">Hores d'activitat:</label>
            <input type="number" id="activity-time" min="0.25" max="24" step="0.25" value="1" aria-required="true" aria-label="Hores d'activitat">
          </div>
          <div class="form-group">
            <label for="activity-notes">Notes:</label>
            <textarea id="activity-notes" rows="3" aria-label="Notes sobre l'activitat"></textarea>
          </div>
          
          <!-- Botón para mostrar/ocultar campos adicionales -->
          <button type="button" id="show-more-activity-fields" class="secondary-button">Afegir més dades</button>
          
          <!-- Sección adicional inicialmente oculta -->
          <div id="additional-activity-fields" class="additional-fields" style="display: none;">
            <div class="form-group">
              <label for="activity-location">Ubicació:</label>
              <input type="text" id="activity-location" placeholder="Direcció o ubicació" aria-label="Ubicació de l'activitat">
            </div>
            <div class="form-group">
              <label for="activity-urgency">Nivell d'urgència:</label>
              <select id="activity-urgency" aria-label="Nivell d'urgència de l'activitat">
                <option value="baixa">Baixa</option>
                <option value="normal" selected>Normal</option>
                <option value="alta">Alta</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div class="form-group">
              <label for="activity-url">URL relacionat:</label>
              <input type="url" id="activity-url" placeholder="https://..." aria-label="URL relacionat amb l'activitat">
            </div>
            <div class="form-group">
              <label for="activity-guests">Convidats:</label>
              <input type="text" id="activity-guests" placeholder="Noms separats per comes" aria-label="Persones convidades a l'activitat">
            </div>
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

    const showMoreFieldsBtn = this.formModal.querySelector('#show-more-activity-fields');
    const additionalFields = this.formModal.querySelector('#additional-activity-fields');

    showMoreFieldsBtn.addEventListener('click', () => {
      if (additionalFields.style.display === 'none') {
        // Primer fem que l'element sigui visible però amb altura 0
        additionalFields.style.display = 'block';
        additionalFields.style.maxHeight = '0';
        additionalFields.style.overflow = 'hidden';
        additionalFields.style.transition = 'max-height 0.5s ease-in-out, opacity 0.4s ease-in-out';
        additionalFields.style.opacity = '0';
        
        // Forcem un reflow abans d'aplicar la nova alçada
        void additionalFields.offsetHeight;
        
        // Ara ajustem l'alçada i opacitat per fer l'animació
        additionalFields.style.maxHeight = '800px'; // Valor prou gran
        additionalFields.style.opacity = '1';
        
        showMoreFieldsBtn.textContent = 'Mostrar menys dades';
        
        // Fem scroll suaument cap a la secció
        setTimeout(() => {
          additionalFields.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      } else {
        // Animació per ocultar
        additionalFields.style.maxHeight = '0';
        additionalFields.style.opacity = '0';
        
        // Esperem que acabi l'animació abans d'ocultar-lo completament
        setTimeout(() => {
          additionalFields.style.display = 'none';
        }, 400); // Temps lleugerament inferior a la transició per evitar salts
        
        showMoreFieldsBtn.textContent = 'Afegir més dades';
      }
    });
    
    // Inicialitzem la data a avui
    const dateInput = this.formModal.querySelector('#activity-date');
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    dateInput.value = dateStr;

    // Afegim l'event listener per detectar quan se selecciona "Altres"
    const categorySelect = this.formModal.querySelector('#activity-category');
    categorySelect.addEventListener('change', () => {
      const customCategoryContainer = this.formModal.querySelector('#custom-category-container');
      if (categorySelect.value === 'Altres') {
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
   * Mostra el modal per a un objecte específic
   * @param {Object} object - L'objecte 3D que s'ha fet clic
   */
  show(object) {
    this.currentObject = object;
    const objectType = object.userData.type || 'item';
    const activityType = object.userData.activityType || 'general';
    
    // Actualitzem el títol segons l'objecte
    const objectTitle = this.modal.querySelector('#activity-title');
    objectTitle.textContent = object.userData.activityType || 'Activitat';
     
    // Carreguem les estadístiques de l'objecte
    this.loadObjectStats(object.userData.id, activityType);
    
    // Carreguem les estadístiques de categories
    this.loadCategoryStats(activityType);
    
    // Mostrem el modal
    this.modal.classList.remove('hidden');
  }
  

  
  /**
   * Obté el títol descriptiu per cada tipus d'activitat
   * @param {string} activityType - El tipus d'activitat
   * @returns {string} - Títol descriptiu
   */
  getActivityTypeTitle(activityType) {
    const titles = {
      'reading': 'Lectura',
      'work': 'Treball',
      'sport': 'Activitat física',
      'cleaning': 'Neteja',
      'leisure': 'Temps lliure',
      'study': 'Estudi'
    };
    return titles[activityType] || 'Activitat';
  }
  
  /**
   * Obté les categories disponibles per un tipus d'activitat
   * @param {string} activityType - El tipus d'activitat
   * @returns {Array} - Array amb les categories
   */
  getCategoriesForActivityType(activityType) {
    const categories = {
      'reading': ['Literatura Fantàstica', 'Ciència Ficció', 'Novel·la Contemporània', 
                 'Literatura Clàssica', 'Divulgació Científica', 'Literatura Infantil', 'Assaig', 'Altres'],
      'work': ['Desenvolupament', 'Reunions', 'Documentació', 'Planificació', 
               'Investigació', 'Avaluació', 'Gestió de Projectes', 'Altres'],
      'sport': ['Gimnàs', 'Entrenament funcional', 'Esports d\'equip', 'Flexibilitat', 
               'Resistència', 'Córrer', 'Natació', 'Ciclisme', 'Altres'],
      'cleaning': ['Manteniment llar', 'Organització', 'Espai de treball', 'Cuina', 
                  'Roba', 'Neteja profunda', 'Altres'],
      'leisure': ['Sèries', 'Pel·lícules', 'Música', 'Videojocs', 'Documentals', 
                 'Cinema', 'Lectura per plaer', 'Altres'],
      'study': ['Factors Humans', 'Anàlisi Complexa', 'Programació', 'Idiomes', 
               'Història', 'Ciències', 'Matemàtiques', 'Altres']
    };
    
    return categories[activityType] || ['General', 'Altres'];
  }
  
  hide() {
    this.modal.classList.add('hidden');
    this.formModal.classList.add('hidden');
    this.currentObject = null;
  }
  
  showActivityForm() {
    // Ocultem el primer modal i mostrem el formulari
    this.modal.classList.add('hidden');
    
    const objectType = this.currentObject.userData.type || 'item';
    const activityType = this.currentObject.userData.activityType || 'general';
    
    // Actualitzem la informació de l'objecte al formulari
    const formObjectTitle = this.formModal.querySelector('#form-object-title');
    formObjectTitle.textContent = this.currentObject.userData.title || 'Activitat';
    
    // Mostrem el tipus d'activitat
    const formActivityType = this.formModal.querySelector('#form-activity-type');
    formActivityType.textContent = `Tipus: ${this.getActivityTypeTitle(activityType)}`;
    
    // Actualitzem les categories disponibles
    this.updateCategoryOptions(activityType);
    
    // Actualitzem el títol del formulari
    const formTitle = this.formModal.querySelector('#form-title');
    formTitle.textContent = `Registra ${this.getActivityTypeTitle(activityType).toLowerCase()}`;
    
    // Mostrem el formulari
    this.formModal.classList.remove('hidden');
    
    // Focus al primer camp per accessibilitat
    setTimeout(() => {
      this.formModal.querySelector('#activity-date').focus();
    }, 100);
  }
  
  /**
   * Actualitza les opcions del selector de categories segons el tipus d'activitat
   * @param {string} activityType - El tipus d'activitat
   */
  updateCategoryOptions(activityType) {
    const categorySelect = this.formModal.querySelector('#activity-category');
    const customCategoryContainer = this.formModal.querySelector('#custom-category-container');
    
    categorySelect.innerHTML = '';
    
    const categories = this.getCategoriesForActivityType(activityType);
    
    // Assegurem que "Altres" sempre és l'última opció
    let otherOption = null;
    categories.forEach(category => {
      if (category !== 'Altres') {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      } else {
        // Guardem l'opció "Altres" per afegir-la al final
        otherOption = category;
      }
    });
    
    // Afegim "Altres" al final
    if (otherOption) {
      const option = document.createElement('option');
      option.value = otherOption;
      option.textContent = otherOption;
      categorySelect.appendChild(option);
    }
    
    // Si l'objecte té una categoria predefinida, la seleccionem
    if (this.currentObject.userData.category && categories.includes(this.currentObject.userData.category)) {
      categorySelect.value = this.currentObject.userData.category;
    }
    
    // Mostrem/ocultem el camp personalitzat segons l'opció seleccionada
    if (categorySelect.value === 'Altres') {
      customCategoryContainer.classList.remove('hidden');
    } else {
      customCategoryContainer.classList.add('hidden');
    }
  }
  
  showHistory() {
    const activityType = this.currentObject.userData.activityType || 'reading';
    const objectId = this.currentObject.userData.id;
    
    console.log(`Mostrant l'historial de ${this.currentObject.userData.title} (${activityType})`);
    
    // Obtenim les activitats per aquest objecte i tipus d'activitat
    const activitats = this.getActivitiesByObjectId(objectId, activityType);
    
    // Mostrem l'historial
    if (activitats.length > 0) {
      let missatge = `Historial d'activitats per "${this.currentObject.userData.title}":\n\n`;
      activitats.forEach((act, index) => {
        const date = new Date(act.date).toLocaleDateString('ca-ES');
        missatge += `${index + 1}. ${date}: ${act.hours} hores - ${act.category}\n`;
        if (act.notes) missatge += `   Notes: ${act.notes}\n`;
      });
      alert(missatge);
    } else {
      alert(`Encara no hi ha activitats registrades per "${this.currentObject.userData.title}".`);
    }
  }
  
  loadObjectStats(objectId, activityType) {
    if (!objectId) return;

    // Obtenir activitats relacionades amb aquest objecte
    const activitats = this.getActivitiesByObjectId(objectId, activityType);
    
    // Obtenir tasques del calendari que coincideixen amb les categories d'aquest objecte
    const calendarTasksRaw = JSON.parse(localStorage.getItem('calendar-tasks')) || {};
    const calendarActivities = [];
    
    // Busquem les categories utilitzades per aquest objecte
    const objectCategories = new Set(activitats.map(act => act.category));
    
    // Si hi ha categories, busquem tasques del calendari relacionades
    if (objectCategories.size > 0) {
      Object.entries(calendarTasksRaw).forEach(([dateKey, tasks]) => {
        tasks.forEach(task => {
          // Si la tasca està completada i la seva categoria coincideix
          if (task.completed && objectCategories.has(task.category)) {
            calendarActivities.push({
              category: task.category,
              hours: task.duration || 1,
              timestamp: task.createdAt || new Date().toISOString()
            });
          }
        });
      });
    }
    
    // Combinar totes les fonts de dades
    const allActivities = [...activitats, ...calendarActivities];
    
    // En comptes d'actualitzar elements del DOM que no existeixen,
    // guardem les dades per si les necessitem més endavant
    this._objectActivities = allActivities;
    this._totalActivitiesHours = allActivities.reduce((sum, act) => {
      const hours = parseFloat(act.hours || act.duration || 0);
      return sum + (isNaN(hours) ? 0 : hours);
    }, 0);
    this._activitiesSessions = activitats.length;
  }
  
  loadCategoryStats(activityType) {
    // Si no es proporciona un tipus, utilitzem el tipus de l'objecte actual
    const currentType = activityType || (this.currentObject && this.currentObject.userData.activityType) || 'reading';
    
    // Obtenim les activitats del tipus especificat
    const storageKey = `${currentType}Activities`;
    const activities = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Obtenim tasques del calendari relacionades amb aquest tipus d'activitat
    const calendarTasksRaw = JSON.parse(localStorage.getItem('calendar-tasks')) || {};
    const calendarActivities = [];

    // Convertim les tasques del calendari a un format similar
    Object.entries(calendarTasksRaw).forEach(([dateKey, tasks]) => {
      tasks.forEach(task => {
        // Només comptem tasques completades que coincideixin amb el tipus d'activitat
        if (task.completed && task.activityType === currentType) {
          calendarActivities.push({
            category: task.category || 'Altres',
            hours: task.duration || 1,
            timestamp: task.createdAt || new Date().toISOString()
          });
        }
      });
    });
    
    // Combinar totes les fonts d'activitats
    const allActivities = [...activities, ...calendarActivities];
    
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
      const category = activity.category || 'Altres';
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
        // Usem toFixed per mostrar sempre un decimal en el percentatge
        const realPercentage = totalHours > 0 ? (hours / totalHours * 100).toFixed(1) : '0.0';
        
        const scaledPercentage = maxHours > 0 ? Math.round((hours / maxHours) * 100) : 0;
        
        // També per a les hores
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
  
  getActivitiesByObjectId(objectId, activityType = 'reading') {
    // Recuperem les activitats del tipus específic
    const storageKey = `${activityType}Activities`;
    const allActivities = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    // Filtrem només les activitats relacionades amb aquest objecte
    return allActivities.filter(act => {
      // Comprovem diferents propietats segons el tipus d'activitat
      if (activityType === 'reading') {
        return act.bookId === objectId;
      } else if (activityType === 'work') {
        return act.folderId === objectId;
      } else {
        return act.objectId === objectId;
      }
    });
  }
  
  setOnSave(callback) {
    this.onSave = callback;
  }
  
  /**
   * Desa una nova activitat al localStorage i dispara els events corresponents
   */
  saveActivity() {
    if (!this.currentObject) return;

    const activityType = this.currentObject.userData.activityType || 'reading';
    const categorySelect = this.formModal.querySelector('#activity-category');
    const customCategoryInput = this.formModal.querySelector('#custom-category');
    const dateInput = this.formModal.querySelector('#activity-date');
    const timeInput = this.formModal.querySelector('#activity-time');
    const notesInput = this.formModal.querySelector('#activity-notes');

    const locationInput = this.formModal.querySelector('#activity-location');
    const urgencySelect = this.formModal.querySelector('#activity-urgency');
    const urlInput = this.formModal.querySelector('#activity-url');
    const guestsInput = this.formModal.querySelector('#activity-guests');

    const hours = parseFloat(timeInput.value);
    if (isNaN(hours)) {
      alert('Si us plau, introdueix un nombre vàlid d\'hores');
      return;
    }
    
    // Determinem la categoria final, usant el valor personalitzat si s'ha seleccionat "Altres"
    let finalCategory = categorySelect.value;
    if (finalCategory === 'Altres' && customCategoryInput.value.trim()) {
      finalCategory = customCategoryInput.value.trim();
    }
    
    // Preparem les dades de l'activitat amb els camps comuns
    const activityData = {
      objectId: this.currentObject.userData.id,
      objectTitle: this.currentObject.userData.title,
      type: activityType,
      category: finalCategory,
      date: dateInput.value,
      hours: hours,
      notes: notesInput.value,
      timestamp: new Date().toISOString(),
      completed: true,
      duration: hours
    };
    
    // Afegim camps específics segons el tipus d'activitat
    if (activityType === 'reading') {
      activityData.bookId = this.currentObject.userData.id;
      activityData.bookTitle = this.currentObject.userData.title;
    } else if (activityType === 'work') {
      activityData.folderId = this.currentObject.userData.id;
      activityData.folderTitle = this.currentObject.userData.title;
    }
    
    // Obtenim les activitats existents del tipus corresponent i afegim la nova
    const storageKey = `${activityType}Activities`;
    const activities = JSON.parse(localStorage.getItem(storageKey)) || [];
    activities.push(activityData);
    localStorage.setItem(storageKey, JSON.stringify(activities));
    
    // Actualitzem també el magatzem general d'activitats per compatibilitat
    const allActivities = JSON.parse(localStorage.getItem('userActivities')) || [];
    allActivities.push(activityData);
    localStorage.setItem('userActivities', JSON.stringify(allActivities));
    
    // Disparar dos events: un per al calendari i un altre per actualitzar l'objecte visual
    const calendarEvent = new CustomEvent(`${activityType}-activity-added`, { 
      detail: { activity: activityData }
    });
    document.dispatchEvent(calendarEvent);
    
    // Disparar esdeveniment específic per actualitzar l'objecte visual corresponent
    const updateEvent = new CustomEvent(`${activityType}-object-update-needed`, {
      detail: { 
        type: activityType, 
        activity: activityData 
      }
    });
    document.dispatchEvent(updateEvent);
    
    // També mantenim l'esdeveniment genèric per compatibilitat
    const bookshelfEvent = new CustomEvent('bookshelf-update-needed', {
      detail: { 
        type: activityType, 
        activity: activityData 
      }
    });
    document.dispatchEvent(bookshelfEvent);
    
    // Actualitzem estadístiques i tanquem el formulari
    this.loadObjectStats(this.currentObject.userData.id, activityType);
    this.loadCategoryStats(activityType);
    this.formModal.classList.add('hidden');
    
    // Mostrar animación de progreso
    ProgressAnimationService.showProgressAnimation(
      activityData.category, 
      'reading'
    );
    
    // Volver a mostrar modal principal después de la animación
    setTimeout(() => {
      this.loadBookStats(this.currentBook.userData.id);
      this.loadCategoryStats();
      this.modal.classList.remove('hidden');
    }, 2800);
  }

  // Afegim mètode per generar activitats de prova
  addMockActivities() {
    // Comprovem si ja existeixen activitats
    ActivitiesMockData.ensureMockActivitiesExist();
  }
}

// Estils auxiliars - Substitueix el bloc d'estils existent
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
    
    /* Contenidor dels detalls de l'objecte amb millor espaiament */
    .object-details-container {
      margin-bottom: 1.5em;
      padding: 0.5em 0;
    }
    
    /* Títol de l'objecte amb millor contrast i espaiament */
    .object-form-title {
      font-size: 1.2em;
      font-weight: 500;
      color: #333;
      margin: 0.5em 0;
      padding: 0;
      line-height: 1.3;
    }
    
    /* Indicador de tipus d'activitat sense marges negatius */
    .activity-type-indicator {
      font-size: 0.9em;
      margin: 0.5em 0 1em 0;
      color: #666;
      font-style: italic;
      line-height: 1.2;
    }
    
    /* Millores generals del formulari */
    .activity-form {
      margin-top: 1em;
    }
    
    .form-group {
      margin-bottom: 1.2em;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.4em;
      font-weight: 500;
    }
    
    /* Estil millorat pel botó per fer-lo més visible */
    .save-button {
      margin-top: 0.5em;
      padding: 0.6em 1.2em;
      font-weight: 500;
    }
    
    /* Estil per al contenidor de categoria personalitzada */
    .custom-category-group.hidden {
      display: none;
    }
    
    .custom-category-group {
      margin-top: -0.5em;
      margin-left: 1em;
      padding: 0.5em;
      border-left: 3px solid #e0e0e0;
      background-color: #f9f9f9;
      transition: all 0.3s ease;
    }
    
    #custom-category {
      width: 100%;
      padding: 0.5em;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    /* Estils per millorar l'espaiament de la secció "Afegir més dades" */
    #show-more-activity-fields {
      margin-top: 1em;
      margin-bottom: 1.5em;
      width: auto;
      display: block;
    }
    
    .additional-fields {
      background-color: #f8f8f8;
      border-radius: 8px;
      padding: 1.2em;
      margin-top: 1.2em;
      margin-bottom: 1.5em;
      border: 1px solid #e0e0e0;
    }
    
    .additional-fields .form-group {
      margin-bottom: 1.8em;
    }
    
    .additional-fields .form-group:last-child {
      margin-bottom: 0.5em;
    }
    
    /* Millora dels camps d'entrada */
    .additional-fields input,
    .additional-fields select,
    .additional-fields textarea {
      padding: 0.7em;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: white;
    }
  `;
  document.head.appendChild(style);
}