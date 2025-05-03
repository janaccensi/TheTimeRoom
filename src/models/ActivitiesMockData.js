/**
 * Proporciona dades simulades per diferents tipus d'activitats
 */
export class ActivitiesMockData {
  
  /**
   * Genera activitats simulades de lectura (llibres)
   * @returns {Array} - Llista d'activitats de lectura
   */
  static generateReadingActivities() {
    return [
      {
        objectId: "book_0_0",
        objectTitle: "El nom del vent",
        type: "reading",
        category: "Literatura Fantàstica",
        date: "2025-04-05",
        hours: 2.5,
        notes: "Primera part de la trilogia de Rothfuss",
        timestamp: "2025-04-05T20:30:00.000Z",
        completed: true
      },
      {
        objectId: "book_0_1",
        objectTitle: "Sapiens",
        type: "reading",
        category: "Divulgació Científica",
        date: "2025-04-08",
        hours: 1.75,
        notes: "Història breu de la humanitat",
        timestamp: "2025-04-08T15:45:00.000Z",
        completed: true
      },
      {
        objectId: "book_0_2",
        objectTitle: "1984",
        type: "reading",
        category: "Literatura Clàssica",
        date: "2025-04-12",
        hours: 3.0,
        notes: "Lectura sobre distopies polítiques",
        timestamp: "2025-04-12T10:15:00.000Z",
        completed: true
      },
      {
        objectId: "book_1_0",
        objectTitle: "Duna",
        type: "reading",
        category: "Ciència Ficció",
        date: "2025-04-15",
        hours: 2.25,
        notes: "Clàssic de Frank Herbert",
        timestamp: "2025-04-15T22:00:00.000Z",
        completed: true
      },
      {
        objectId: "book_1_1",
        objectTitle: "La fàbrica",
        type: "reading",
        category: "Novel·la Contemporània",
        date: "2025-04-18",
        hours: 1.5,
        notes: "Novel·la sobre el món laboral actual",
        timestamp: "2025-04-18T18:30:00.000Z",
        completed: true
      },
      {
        objectId: "book_1_2",
        objectTitle: "El petit príncep",
        type: "reading",
        category: "Literatura Infantil",
        date: "2025-04-22",
        hours: 1.0,
        notes: "Relectura del clàssic de Saint-Exupéry",
        timestamp: "2025-04-22T19:20:00.000Z",
        completed: true
      }
    ];
  }
  
  /**
   * Genera activitats simulades de treball (carpetes)
   * @returns {Array} - Llista d'activitats de treball
   */
  static generateWorkActivities() {
    return [
      {
        objectId: "folder_2_0",
        objectTitle: "Informe trimestral",
        type: "work",
        category: "Documentació",
        date: "2025-04-03",
        hours: 4.5,
        notes: "Preparació de l'informe trimestral de resultats",
        timestamp: "2025-04-03T09:00:00.000Z",
        completed: true
      },
      {
        objectId: "folder_2_1",
        objectTitle: "Reunió d'equip",
        type: "work",
        category: "Reunions",
        date: "2025-04-06",
        hours: 1.5,
        notes: "Planificació sprint amb l'equip de desenvolupament",
        timestamp: "2025-04-06T14:30:00.000Z",
        completed: true
      },
      {
        objectId: "folder_2_2",
        objectTitle: "Anàlisi de dades",
        type: "work",
        category: "Investigació",
        date: "2025-04-10",
        hours: 3.25,
        notes: "Anàlisi estadística de les dades de l'experiment",
        timestamp: "2025-04-10T10:00:00.000Z",
        completed: true
      },
      {
        objectId: "folder_3_0",
        objectTitle: "Proposta de projecte",
        type: "work",
        category: "Documentació",
        date: "2025-04-14",
        hours: 5.0,
        notes: "Desenvolupament de la proposta pel nou client",
        timestamp: "2025-04-14T08:45:00.000Z",
        completed: true
      },
      {
        objectId: "folder_3_1",
        objectTitle: "Revisió del codi",
        type: "work",
        category: "Desenvolupament",
        date: "2025-04-17",
        hours: 2.75,
        notes: "Revisió i millora del codi de la darrera funcionalitat",
        timestamp: "2025-04-17T13:20:00.000Z",
        completed: true
      }
    ];
  }
  
  /**
   * Genera activitats simulades d'esport (peses)
   * @returns {Array} - Llista d'activitats esportives
   */
  static generateSportActivities() {
    return [
      {
        objectId: "dumbbell_0",
        objectTitle: "Entrenament de força",
        type: "sport",
        category: "Gimnàs",
        date: "2025-04-02",
        hours: 1.5,
        notes: "Rutina de força centrada en la part superior del cos",
        timestamp: "2025-04-02T18:00:00.000Z",
        completed: true
      },
      {
        objectId: "dumbbell_1",
        objectTitle: "Cardio i resistència",
        type: "sport",
        category: "Entrenament funcional",
        date: "2025-04-07",
        hours: 1.25,
        notes: "Sessions d'intervals d'alta intensitat",
        timestamp: "2025-04-07T07:30:00.000Z",
        completed: true
      },
      {
        objectId: "dumbbell_2",
        objectTitle: "Partit de bàsquet",
        type: "sport",
        category: "Esports d'equip",
        date: "2025-04-11",
        hours: 2.0,
        notes: "Partit amistós amb companys de feina",
        timestamp: "2025-04-11T19:00:00.000Z",
        completed: true
      },
      {
        objectId: "dumbbell_0",
        objectTitle: "Ioga i estiraments",
        type: "sport",
        category: "Flexibilitat",
        date: "2025-04-16",
        hours: 1.0,
        notes: "Sessió centrada en flexibilitat i relaxació",
        timestamp: "2025-04-16T20:00:00.000Z",
        completed: true
      },
      {
        objectId: "dumbbell_1",
        objectTitle: "Natació",
        type: "sport",
        category: "Resistència",
        date: "2025-04-20",
        hours: 1.75,
        notes: "Entrenament de diferents estils de natació",
        timestamp: "2025-04-20T16:30:00.000Z",
        completed: true
      }
    ];
  }
  
  /**
   * Genera activitats simulades de neteja (escombra)
   * @returns {Array} - Llista d'activitats de neteja
   */
  static generateCleaningActivities() {
    return [
      {
        objectId: "broom_0",
        objectTitle: "Neteja general",
        type: "cleaning",
        category: "Manteniment llar",
        date: "2025-04-04",
        hours: 2.0,
        notes: "Neteja general de tot l'apartament",
        timestamp: "2025-04-04T10:00:00.000Z",
        completed: true
      },
      {
        objectId: "broom_1",
        objectTitle: "Organització d'armari",
        type: "cleaning",
        category: "Organització",
        date: "2025-04-09",
        hours: 1.5,
        notes: "Reorganització i neteja de l'armari",
        timestamp: "2025-04-09T16:00:00.000Z",
        completed: true
      },
      {
        objectId: "broom_0",
        objectTitle: "Neteja àrea d'estudi",
        type: "cleaning",
        category: "Espai de treball",
        date: "2025-04-13",
        hours: 0.75,
        notes: "Reorganització i neteja de l'escriptori",
        timestamp: "2025-04-13T11:30:00.000Z",
        completed: true
      },
      {
        objectId: "broom_1",
        objectTitle: "Neteja profunda de cuina",
        type: "cleaning",
        category: "Cuina",
        date: "2025-04-19",
        hours: 2.25,
        notes: "Neteja a fons de la cuina i electrodomèstics",
        timestamp: "2025-04-19T09:45:00.000Z",
        completed: true
      },
      {
        objectId: "broom_0",
        objectTitle: "Bugaderia i planxa",
        type: "cleaning",
        category: "Roba",
        date: "2025-04-23",
        hours: 1.25,
        notes: "Rentar i planxar la roba de la setmana",
        timestamp: "2025-04-23T14:00:00.000Z",
        completed: true
      }
    ];
  }
  
  /**
   * Genera activitats simulades de lleure (TV/Micròfon)
   * @returns {Array} - Llista d'activitats de lleure
   */
  static generateLeisureActivities() {
    return [
      {
        objectId: "tv_0",
        objectTitle: "Maratón de sèrie",
        type: "leisure",
        category: "Sèries",
        date: "2025-04-01",
        hours: 3.5,
        notes: "Maratón de la nova temporada de The Office",
        timestamp: "2025-04-01T20:00:00.000Z",
        completed: true
      },
      {
        objectId: "microphone_0",
        objectTitle: "Sessió de karaoke",
        type: "leisure",
        category: "Música",
        date: "2025-04-05",
        hours: 2.0,
        notes: "Sessió de karaoke amb amics",
        timestamp: "2025-04-05T21:30:00.000Z",
        completed: true
      },
      {
        objectId: "tv_0",
        objectTitle: "Documental",
        type: "leisure",
        category: "Documentals",
        date: "2025-04-08",
        hours: 1.5,
        notes: "Documental sobre vida marina",
        timestamp: "2025-04-08T22:00:00.000Z",
        completed: true
      },
      {
        objectId: "microphone_1",
        objectTitle: "Pràctica de guitarra",
        type: "leisure",
        category: "Música",
        date: "2025-04-12",
        hours: 1.25,
        notes: "Pràctica de noves cançons",
        timestamp: "2025-04-12T17:00:00.000Z",
        completed: true
      },
      {
        objectId: "tv_0",
        objectTitle: "Pel·lícula clàssica",
        type: "leisure",
        category: "Cinema",
        date: "2025-04-18",
        hours: 2.25,
        notes: "Visionat de Casablanca",
        timestamp: "2025-04-18T20:30:00.000Z",
        completed: true
      }
    ];
  }
  
  /**
   * Afegeix totes les activitats simulades al localStorage
   */
  static addAllMockActivities() {
    const readingActivities = this.generateReadingActivities();
    const workActivities = this.generateWorkActivities();
    const sportActivities = this.generateSportActivities();
    const cleaningActivities = this.generateCleaningActivities();
    const leisureActivities = this.generateLeisureActivities();
    
    // Guardem cada tipus d'activitat al seu propi espai
    localStorage.setItem('readingActivities', JSON.stringify(readingActivities));
    localStorage.setItem('workActivities', JSON.stringify(workActivities));
    localStorage.setItem('sportActivities', JSON.stringify(sportActivities));
    localStorage.setItem('cleaningActivities', JSON.stringify(cleaningActivities));
    localStorage.setItem('leisureActivities', JSON.stringify(leisureActivities));
    
    // També guardem totes les activitats juntes a userActivities per compatibilitat
    const allActivities = [
      ...readingActivities,
      ...workActivities,
      ...sportActivities,
      ...cleaningActivities,
      ...leisureActivities
    ];
    
    localStorage.setItem('userActivities', JSON.stringify(allActivities));
    
    console.log(`S'han afegit ${allActivities.length} activitats simulades: 
      - ${readingActivities.length} lectura
      - ${workActivities.length} treball
      - ${sportActivities.length} esport
      - ${cleaningActivities.length} neteja
      - ${leisureActivities.length} lleure`);
    
    return allActivities;
  }
  
  /**
   * Comprova si hi ha activitats i afegeix simulades si no n'hi ha
   */
  static ensureMockActivitiesExist() {
    const existingActivities = JSON.parse(localStorage.getItem('userActivities')) || [];
    
    if (existingActivities.length === 0) {
      return this.addAllMockActivities();
    } else {
      console.log(`Ja existeixen ${existingActivities.length} activitats, no s'afegiran simulades`);
      return existingActivities;
    }
  }
}