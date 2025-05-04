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
      // READING
      {
        objectId: "book_0",
        objectTitle: "Llegint El Senyor dels Anells",
        type: "reading",
        category: "Literatura Fantàstica",
        date: "2025-04-01",
        hours: 1.5,
        notes: "Capítol sobre la Comarca",
        timestamp: "2025-04-01T18:00:00.000Z",
        completed: true
      },
      {
        objectId: "book_1",
        objectTitle: "Lectura de Dune",
        type: "reading",
        category: "Ciència Ficció",
        date: "2025-04-02",
        hours: 2,
        notes: "Capítols inicials",
        timestamp: "2025-04-02T19:00:00.000Z",
        completed: true
      },
      {
        objectId: "book_2",
        objectTitle: "Llegint una novel·la de Haruki Murakami",
        type: "reading",
        category: "Novel·la Contemporània",
        date: "2025-04-03",
        hours: 1.2,
        notes: "Norwegian Wood",
        timestamp: "2025-04-03T17:00:00.000Z",
        completed: true
      },
      {
        objectId: "book_3",
        objectTitle: "Llegint L'Odissea",
        type: "reading",
        category: "Literatura Clàssica",
        date: "2025-04-04",
        hours: 1.7,
        notes: "Capítol sobre Polifem",
        timestamp: "2025-04-04T18:30:00.000Z",
        completed: true
      },
      {
        objectId: "book_4",
        objectTitle: "Lectura sobre física quàntica",
        type: "reading",
        category: "Divulgació Científica",
        date: "2025-04-05",
        hours: 1.5,
        notes: "Capítol de 'L'univers elegant'",
        timestamp: "2025-04-05T16:00:00.000Z",
        completed: true
      },
      {
        objectId: "book_5",
        objectTitle: "Llegint un conte infantil",
        type: "reading",
        category: "Literatura Infantil",
        date: "2025-04-06",
        hours: 0.8,
        notes: "Conte per dormir",
        timestamp: "2025-04-06T20:00:00.000Z",
        completed: true
      },
      {
        objectId: "book_6",
        objectTitle: "Lectura de 'Meditacions' de Marc Aureli",
        type: "reading",
        category: "Assaig",
        date: "2025-04-07",
        hours: 1.3,
        notes: "Reflexions filosòfiques",
        timestamp: "2025-04-07T19:30:00.000Z",
        completed: true
      },
      {
        objectId: "book_7",
        objectTitle: "Lectura de textos diversos",
        type: "reading",
        category: "Altres",
        date: "2025-04-08",
        hours: 1.1,
        notes: "Articles online",
        timestamp: "2025-04-08T21:00:00.000Z",
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
        objectTitle: "Implementar funcionalitat de pagament",
        type: "work",
        category: "Desenvolupament",
        date: "2025-04-01",
        hours: 4,
        notes: "Integració amb Stripe",
        timestamp: "2025-04-01T09:00:00.000Z",
        completed: true
      },
      {
        objectId: "folder_2_1",
        objectTitle: "Reunió amb l'equip de màrqueting",
        type: "work",
        category: "Reunions",
        date: "2025-04-02",
        hours: 1,
        notes: "Definició d'estratègia de llançament",
        timestamp: "2025-04-02T10:00:00.000Z",
        completed: true
      },
      {
        objectId: "folder_2_2",
        objectTitle: "Redactar document tècnic",
        type: "work",
        category: "Documentació",
        date: "2025-04-03",
        hours: 2,
        notes: "Especificacions de l'API",
        timestamp: "2025-04-03T11:00:00.000Z",
        completed: true
      },
      {
        objectId: "folder_2_3",
        objectTitle: "Planificar roadmap Q2",
        type: "work",
        category: "Planificació",
        date: "2025-04-04",
        hours: 1.5,
        notes: "Definició d'objectius i KPIs",
        timestamp: "2025-04-04T12:00:00.000Z",
        completed: true
      },
      {
        objectId: "folder_2_4",
        objectTitle: "Analitzar tecnologies Web3",
        type: "work",
        category: "Investigació",
        date: "2025-04-05",
        hours: 3,
        notes: "Comparació entre Layer 2",
        timestamp: "2025-04-05T13:00:00.000Z",
        completed: true
      },
      {
        objectId: "folder_2_5",
        objectTitle: "Avaluació de rendiment de l'equip",
        type: "work",
        category: "Avaluació",
        date: "2025-04-06",
        hours: 2,
        notes: "Feedback individualitzat",
        timestamp: "2025-04-06T14:00:00.000Z",
        completed: true
      },
      {
        objectId: "folder_2_6",
        objectTitle: "Seguiment del projecte X",
        type: "work",
        category: "Gestió de Projectes",
        date: "2025-04-07",
        hours: 1.8,
        notes: "Revisió de milestones",
        timestamp: "2025-04-07T15:00:00.000Z",
        completed: true
      },
      {
        objectId: "folder_2_7",
        objectTitle: "Suport tècnic a client",
        type: "work",
        category: "Altres",
        date: "2025-04-08",
        hours: 1.2,
        notes: "Resolució de bug urgent",
        timestamp: "2025-04-08T16:00:00.000Z",
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
// SPORT
{
  objectId: "dumbbell_0",
  objectTitle: "Sessió de força al gimnàs",
  type: "sport",
  category: "Gimnàs",
  date: "2025-04-02",
  hours: 1.2,
  notes: "Treball de cames i esquena amb peses",
  timestamp: "2025-04-02T18:00:00.000Z",
  completed: true
},
{
  objectId: "dumbbell_1",
  objectTitle: "Entrenament funcional a l'aire lliure",
  type: "sport",
  category: "Entrenament funcional",
  date: "2025-04-03",
  hours: 1,
  notes: "Circuit de HIIT amb pes corporal",
  timestamp: "2025-04-03T07:30:00.000Z",
  completed: true
},
{
  objectId: "dumbbell_2",
  objectTitle: "Partit de futbol amb amics",
  type: "sport",
  category: "Esports d'equip",
  date: "2025-04-04",
  hours: 1.5,
  notes: "Partit setmanal, bon ritme i treball en equip",
  timestamp: "2025-04-04T20:00:00.000Z",
  completed: true
},
{
  objectId: "dumbbell_3",
  objectTitle: "Ioga per a flexibilitat",
  type: "sport",
  category: "Flexibilitat",
  date: "2025-04-05",
  hours: 0.8,
  notes: "Sessió enfocada en estiraments de maluc i esquena",
  timestamp: "2025-04-05T09:00:00.000Z",
  completed: true
},
{
  objectId: "dumbbell_4",
  objectTitle: "Sessió de bici estàtica de resistència",
  type: "sport",
  category: "Resistència",
  date: "2025-04-06",
  hours: 1.3,
  notes: "Sessió moderada de 60 minuts + escalfament i estiraments",
  timestamp: "2025-04-06T17:00:00.000Z",
  completed: true
},
{
  objectId: "dumbbell_5",
  objectTitle: "Cursa de 5 km pel parc",
  type: "sport",
  category: "Córrer",
  date: "2025-04-07",
  hours: 0.9,
  notes: "Bons temps, millora de ritme respecte la setmana passada",
  timestamp: "2025-04-07T08:00:00.000Z",
  completed: true
},
{
  objectId: "dumbbell_6",
  objectTitle: "Entrenament de natació estil crol",
  type: "sport",
  category: "Natació",
  date: "2025-04-08",
  hours: 1.1,
  notes: "Series de 50 m i tècnica de respiració",
  timestamp: "2025-04-08T19:30:00.000Z",
  completed: true
},
{
  objectId: "dumbbell_7",
  objectTitle: "Sortida en bicicleta de muntanya",
  type: "sport",
  category: "Ciclisme",
  date: "2025-04-09",
  hours: 2.5,
  notes: "Ruta pel parc natural amb desnivell considerable",
  timestamp: "2025-04-09T10:00:00.000Z",
  completed: true
},
{
  objectId: "dumbbell_8",
  objectTitle: "Escalada indoor",
  type: "sport",
  category: "Altres",
  date: "2025-04-10",
  hours: 1.7,
  notes: "Pràctica de blocs de dificultat mitjana",
  timestamp: "2025-04-10T18:00:00.000Z",
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
        objectTitle: "Marató de sèrie",
        type: "leisure",
        category: "Sèries",
        date: "2025-04-01",
        hours: 3.5,
        notes: "Marató de la nova temporada de The Office",
        timestamp: "2025-04-01T20:00:00.000Z",
        completed: true
      },
      {
        objectId: "tv_1",
        objectTitle: "Sessió de cinema",
        type: "leisure",
        category: "Pel·lícules",
        date: "2025-04-02",
        hours: 2,
        notes: "Vam veure 'Dune' al cinema",
        timestamp: "2025-04-02T19:00:00.000Z",
        completed: true
      },
      {
        objectId: "tv_2",
        objectTitle: "Escoltar àlbum nou",
        type: "leisure",
        category: "Música",
        date: "2025-04-03",
        hours: 1,
        notes: "Primer escolta de l'últim disc de Coldplay",
        timestamp: "2025-04-03T17:00:00.000Z",
        completed: true
      },
      {
        objectId: "tv_3",
        objectTitle: "Partida a videojocs",
        type: "leisure",
        category: "Videojocs",
        date: "2025-04-04",
        hours: 2.5,
        notes: "Sessió cooperativa a Zelda: Tears of the Kingdom",
        timestamp: "2025-04-04T21:00:00.000Z",
        completed: true
      },
      {
        objectId: "tv_4",
        objectTitle: "Documental sobre ciència",
        type: "leisure",
        category: "Documentals",
        date: "2025-04-05",
        hours: 1.5,
        notes: "Nova sèrie de Netflix sobre l'espai",
        timestamp: "2025-04-05T18:00:00.000Z",
        completed: true
      },
      {
        objectId: "tv_5",
        objectTitle: "Sortida al cinema",
        type: "leisure",
        category: "Cinema",
        date: "2025-04-06",
        hours: 2,
        notes: "Cinema amb amics per veure 'Barbie'",
        timestamp: "2025-04-06T19:30:00.000Z",
        completed: true
      },
      {
        objectId: "tv_6",
        objectTitle: "Llegir per plaer",
        type: "leisure",
        category: "Lectura per plaer",
        date: "2025-04-07",
        hours: 1.2,
        notes: "Capítols finals de 'El Petit Príncep'",
        timestamp: "2025-04-07T22:00:00.000Z",
        completed: true
      },
      {
        objectId: "tv_7",
        objectTitle: "Relax amb podcast",
        type: "leisure",
        category: "Altres",
        date: "2025-04-08",
        hours: 0.8,
        notes: "Escoltant un podcast de filosofia al vespre",
        timestamp: "2025-04-08T20:30:00.000Z",
        completed: true
      }
    ];
  }
  

  /**
   * Genera activitats simulades d'estudi (escola/universitat)
   * @returns {Array} - Llista d'activitats d'estudi
   */



  static generateStudyActivities() {
    return [
      {
        objectId: "study_0_0",
        objectTitle: "Disseny Centrat en l'Usuari",
        type: "study",
        category: "Factors Humans",
        date: "2025-04-03",
        hours: 2.5,
        notes: "Anàlisi d'interacció persona-ordinador i principis d'usabilitat",
        timestamp: "2025-04-03T14:00:00.000Z",
        completed: true
      },
      {
        objectId: "study_0_1",
        objectTitle: "Transformades i Series",
        type: "study",
        category: "Anàlisi Complexa",
        date: "2025-04-07",
        hours: 3.0,
        notes: "Estudi de transformades de Fourier i series complexes",
        timestamp: "2025-04-07T10:30:00.000Z",
        completed: true
      },
      {
        objectId: "study_0_2",
        objectTitle: "Desenvolupament Web",
        type: "study",
        category: "Programació",
        date: "2025-04-11",
        hours: 2.75,
        notes: "Pràctiques amb React i Node.js per aplicacions web",
        timestamp: "2025-04-11T15:45:00.000Z",
        completed: true
      },
      {
        objectId: "study_1_0",
        objectTitle: "Alemany B1",
        type: "study",
        category: "Idiomes",
        date: "2025-04-14",
        hours: 1.5,
        notes: "Pràctica de gramàtica i vocabulari per l'examen oficial",
        timestamp: "2025-04-14T18:00:00.000Z",
        completed: true
      },
      {
        objectId: "study_1_1",
        objectTitle: "Història Contemporània",
        type: "study",
        category: "Història",
        date: "2025-04-18",
        hours: 2.0,
        notes: "Revisió dels esdeveniments clau del segle XX",
        timestamp: "2025-04-18T17:15:00.000Z",
        completed: true
      },
      {
        objectId: "study_1_2",
        objectTitle: "Física Quàntica",
        type: "study",
        category: "Ciències",
        date: "2025-04-21",
        hours: 3.25,
        notes: "Principis fonamentals i mecànica quàntica bàsica",
        timestamp: "2025-04-21T09:00:00.000Z",
        completed: true
      },
      {
        objectId: "study_2_0",
        objectTitle: "Estadística Avançada",
        type: "study",
        category: "Matemàtiques",
        date: "2025-04-23",
        hours: 2.5,
        notes: "Models probabilístics i anàlisi multivariant",
        timestamp: "2025-04-23T13:30:00.000Z",
        completed: true
      },
      {
        objectId: "study_2_1",
        objectTitle: "Tècniques d'Estudi",
        type: "study",
        category: "Altres",
        date: "2025-04-25",
        hours: 1.0,
        notes: "Millora de metodologies d'aprenentatge i gestió del temps",
        timestamp: "2025-04-25T16:00:00.000Z",
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
    const studyActivities = this.generateStudyActivities();
    
    // Guardem cada tipus d'activitat al seu propi espai
    localStorage.setItem('readingActivities', JSON.stringify(readingActivities));
    localStorage.setItem('workActivities', JSON.stringify(workActivities));
    localStorage.setItem('sportActivities', JSON.stringify(sportActivities));
    localStorage.setItem('cleaningActivities', JSON.stringify(cleaningActivities));
    localStorage.setItem('leisureActivities', JSON.stringify(leisureActivities));
    localStorage.setItem('studyActivities', JSON.stringify(studyActivities));
    
    // També guardem totes les activitats juntes a userActivities per compatibilitat
    const allActivities = [
      ...readingActivities,
      ...workActivities,
      ...sportActivities,
      ...cleaningActivities,
      ...leisureActivities,
      ...studyActivities
    ];
    
    localStorage.setItem('userActivities', JSON.stringify(allActivities));
    
    console.log(`S'han afegit ${allActivities.length} activitats simulades: 
      - ${readingActivities.length} lectura
      - ${workActivities.length} treball
      - ${sportActivities.length} esport
      - ${cleaningActivities.length} neteja
      - ${leisureActivities.length} lleure
      - ${studyActivities.length} estudi`
    );
    
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