import { ActivitiesMockData } from "../models/ActivitiesMockData";
import {ProgressAnimationService} from "../components/ProgressAnimation";


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
    console.log(`Mostrant modal per ${objectType} (${activityType})`);
    
    // Actualitzem el títol segons l'objecte
    const objectTitle = this.modal.querySelector('#activity-title');
    objectTitle.textContent = this.getActivityTypeTitle(activityType) || 'Activitat';
     
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
   * Obté les categories disponibles per un tipus d'activitat, basades en activitats existents
   * @param {string} activityType - El tipus d'activitat
   * @returns {Array} - Array amb les categories
   */
  getCategoriesForActivityType(activityType) {
    // Obtenim les activitats del tipus especificat
    const storageKey = `${activityType}Activities`;
    const activities = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    // Obtenim les tasques del calendari relacionades amb aquest tipus d'activitat
    const calendarTasksRaw = JSON.parse(localStorage.getItem('calendar-tasks')) || {};
    const relatedTasks = [];
    
    // Busquem tasques que coincideixin amb el tipus d'activitat
    Object.values(calendarTasksRaw).forEach(tasks => {
      tasks.forEach(task => {
        if (task.activityType === activityType && task.category) {
          relatedTasks.push(task.category);
        }
      });
    });
    
    // Categories per defecte que sempre seran disponibles per a cada tipus d'activitat
    const defaultCategories = {
      'reading': ['Literatura Fantàstica', 'Ciència Ficció'],
      'work': ['Desenvolupament', 'Reunions'],
      'sport': ['Gimnàs', 'Córrer'],
      'cleaning': ['Manteniment llar', 'Organització'],
      'leisure': ['Sèries', 'Pel·lícules'],
      'study': ['Programació', 'Idiomes']
    };
    
    // Crear un Set per eliminar duplicats
    const uniqueCategories = new Set();
    
    // Afegir les categories de les activitats registrades
    activities.forEach(activity => {
      if (activity.category) uniqueCategories.add(activity.category);
    });
    
    // Afegir categories de tasques del calendari
    relatedTasks.forEach(category => uniqueCategories.add(category));
    
    // Afegir les categories per defecte si no hi ha activitats registrades
    if (uniqueCategories.size === 0 && defaultCategories[activityType]) {
      defaultCategories[activityType].forEach(cat => uniqueCategories.add(cat));
    }
    
    // Convertir el Set a array i ordenar alfabèticament
    const categoriesArray = Array.from(uniqueCategories).sort();
    
    // Assegurem que "Altres" sempre és present i al final
    if (!categoriesArray.includes('Altres')) {
      categoriesArray.push('Altres');
    } else {
      // Si ja existeix, l'eliminem i el tornem a afegir al final
      const index = categoriesArray.indexOf('Altres');
      categoriesArray.splice(index, 1);
      categoriesArray.push('Altres');
    }
    
    return categoriesArray.length > 0 ? categoriesArray : ['General', 'Altres'];
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
    const activitats = this.getActivitiesByActivityType(activityType);
    
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
    const activitats = this.getActivitiesByActivityType(activityType);
    
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
  
  getActivitiesByActivityType(activityType) {

    console.log("Holaaa")
    // Recuperem les activitats del tipus específic
    const storageKey = `${activityType}Activities`;
    return JSON.parse(localStorage.getItem(storageKey)) || [];            
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
    // Afegeixo aquesta línia per obtenir l'hora seleccionada
    const hourSelect = this.formModal.querySelector('#activity-hour');
    const timeInput = this.formModal.querySelector('#activity-time');
    const notesInput = this.formModal.querySelector('#activity-notes');

    // Comprovem que existeixi el selector d'hora
    if (!hourSelect) {
      console.error("El selector d'hora no s'ha trobat");
      return;
    }
    
    const locationInput = this.formModal.querySelector('#activity-location');
    const urgencySelect = this.formModal.querySelector('#activity-urgency');
    const urlInput = this.formModal.querySelector('#activity-url');
    const guestsInput = this.formModal.querySelector('#activity-guests');

    const hours = parseFloat(timeInput.value);
    if (isNaN(hours)) {
      alert('Si us plau, introdueix un nombre vàlid d\'hores');
      return;
    }

    if(this.currentObject.userData.type === 'broom') {
      
      const activities = JSON.parse(localStorage.getItem('cleaningActivities')) || [];

      console.log(activities.length);
      
        // Si no hay actividades, escoba completamente sucia (nivel 0)
        if (activities.length == 0) {          
          this.cleanlinessLevel = 0;
          console.log("Nivel de limpieza: 0 (sin actividades)");
          document.dispatchEvent(new CustomEvent('cleanliness-level-changed', { 
              detail: { level: 0 }
          }));
          return 0;
        }
        
          
        // Calcular horas totales de la semana
        const weeklyHours = activities.reduce((sum, act) => {
        return sum + parseFloat(act.hours || 0);
        }, 0);
                
        // Objetivo: 17 horas semanales = 100% limpia
        const targetHours = 17;
        
        // Calcular nivel de limpieza (0-100) basado en horas semanales
        let cleanlinessPercentage = Math.min(100, (weeklyHours / targetHours) * 100);
        
        // Garantizar que el nivel no sea menor a 10% si hay alguna actividad reciente
        if (cleanlinessPercentage < 10) {
        cleanlinessPercentage = 10;
        }
        
        this.cleanlinessLevel = Math.round(cleanlinessPercentage);
        
        console.log(`Nivel de limpieza: ${this.cleanlinessLevel}% (${weeklyHours.toFixed(1)} horas semanales)`);
        
        // Disparar evento para actualizar la escoba
        document.dispatchEvent(new CustomEvent('cleanliness-level-changed', { 
        detail: { level: this.cleanlinessLevel }
        }));                      
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
      // Afegim l'hora a les dades de l'activitat
      hour: parseInt(hourSelect.value, 10),  // Important: assegurar-se que es converteix a enter
      hours: hours,
      notes: notesInput.value,
      timestamp: dateInput.value,
      completed: true,
      duration: hours
    };
    
    // Afegim els camps dels camps addicionals si estan visibles
    const additionalFields = this.formModal.querySelector('#additional-activity-fields');
    if (additionalFields && additionalFields.style.display !== 'none') {
      if (locationInput) activityData.location = locationInput.value;
      if (urgencySelect) activityData.urgency = urgencySelect.value;
      if (urlInput) activityData.url = urlInput.value;
      if (guestsInput) activityData.guests = guestsInput.value;
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
    ProgressAnimationService.showProgressAnimation(activityData.category, activityType);
    

    
    
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