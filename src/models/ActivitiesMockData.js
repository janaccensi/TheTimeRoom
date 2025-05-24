/**
 * Proporciona datos simulados para diferentes tipos de actividades
 */
export class ActivitiesMockData {
  
  /**
   * Genera actividades simuladas de lectura (libros)
   * @returns {Array} - Lista de actividades de lectura
   */
  static generateReadingActivities() {
    return [
      // LECTURA
      {
        objectId: "book_0",
        objectTitle: "Leyendo El Señor de los Anillos",
        type: "reading",
        category: "Literatura Fantástica",
        date: "2025-04-01",
        hours: 1.5,
        notes: "Capítulo sobre La Comarca",
        timestamp: "2025-04-01T18:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "book_1",
        objectTitle: "Lectura de Dune",
        type: "reading",
        category: "Ciencia Ficción",
        date: "2025-04-02",
        hours: 2,
        notes: "Capítulos iniciales",
        timestamp: "2025-04-02T19:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "book_2",
        objectTitle: "Leyendo una novela de Haruki Murakami",
        type: "reading",
        category: "Novela Contemporánea",
        date: "2025-04-03",
        hours: 1.2,
        notes: "Norwegian Wood",
        timestamp: "2025-04-03T17:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "book_3",
        objectTitle: "Leyendo La Odisea",
        type: "reading",
        category: "Literatura Clásica",
        date: "2025-04-04",
        hours: 1.7,
        notes: "Capítulo sobre Polifemo",
        timestamp: "2025-04-04T18:30:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "book_4",
        objectTitle: "Lectura sobre física cuántica",
        type: "reading",
        category: "Divulgación Científica",
        date: "2025-04-05",
        hours: 1.5,
        notes: "Capítulo de 'El universo elegante'",
        timestamp: "2025-04-05T16:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "book_5",
        objectTitle: "Leyendo un cuento infantil",
        type: "reading",
        category: "Literatura Infantil",
        date: "2025-04-06",
        hours: 0.8,
        notes: "Cuento para dormir",
        timestamp: "2025-04-06T20:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "book_6",
        objectTitle: "Lectura de 'Meditaciones' de Marco Aurelio",
        type: "reading",
        category: "Ensayo",
        date: "2025-04-07",
        hours: 1.3,
        notes: "Reflexiones filosóficas",
        timestamp: "2025-04-07T19:30:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "book_7",
        objectTitle: "Lectura de textos diversos",
        type: "reading",
        category: "Otros",
        date: "2025-04-08",
        hours: 1.1,
        notes: "Artículos online",
        timestamp: "2025-04-08T21:00:00", // Eliminado .000Z
        completed: true
      }      
    ];
  }
  
  /**
   * Genera actividades simuladas de trabajo (carpetas)
   * @returns {Array} - Lista de actividades de trabajo
   */
  static generateWorkActivities() {
    return [
      {
        objectId: "folder_2_0",
        objectTitle: "Implementar funcionalidad de pago",
        type: "work",
        category: "Desarrollo",
        date: "2025-04-01",
        hours: 4,
        notes: "Integración con Stripe",
        timestamp: "2025-04-01T09:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "folder_2_1",
        objectTitle: "Reunión con el equipo de marketing",
        type: "work",
        category: "Reuniones",
        date: "2025-04-02",
        hours: 1,
        notes: "Definición de estrategia de lanzamiento",
        timestamp: "2025-04-02T10:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "folder_2_2",
        objectTitle: "Redactar documento técnico",
        type: "work",
        category: "Documentación",
        date: "2025-04-03",
        hours: 2,
        notes: "Especificaciones del API",
        timestamp: "2025-04-03T11:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "folder_2_3",
        objectTitle: "Planificar roadmap Q2",
        type: "work",
        category: "Planificación",
        date: "2025-04-04",
        hours: 1.5,
        notes: "Definición de objetivos y KPIs",
        timestamp: "2025-04-04T12:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "folder_2_4",
        objectTitle: "Analizar tecnologías Web3",
        type: "work",
        category: "Investigación",
        date: "2025-04-05",
        hours: 3,
        notes: "Comparación entre Layer 2",
        timestamp: "2025-04-05T13:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "folder_2_5",
        objectTitle: "Evaluación de rendimiento del equipo",
        type: "work",
        category: "Evaluación",
        date: "2025-04-06",
        hours: 2,
        notes: "Feedback individualizado",
        timestamp: "2025-04-06T14:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "folder_2_6",
        objectTitle: "Seguimiento del proyecto X",
        type: "work",
        category: "Gestión de Proyectos",
        date: "2025-04-07",
        hours: 1.8,
        notes: "Revisión de hitos",
        timestamp: "2025-04-07T15:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "folder_2_7",
        objectTitle: "Soporte técnico a cliente",
        type: "work",
        category: "Otros",
        date: "2025-04-08",
        hours: 1.2,
        notes: "Resolución de bug urgente",
        timestamp: "2025-04-08T16:00:00", // Eliminado .000Z
        completed: true
      }
    ];
  }
  
  /**
   * Genera actividades simuladas de deporte (pesas)
   * @returns {Array} - Lista de actividades deportivas
   */
  static generateSportActivities() {
    return [
      {
        objectId: "dumbbell_0",
        objectTitle: "Sesión de fuerza en el gimnasio",
        type: "sport",
        category: "Gimnasio",
        date: "2025-04-02",
        hours: 1.2,
        notes: "Trabajo de piernas y espalda con pesas",
        timestamp: "2025-04-02T18:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "dumbbell_1",
        objectTitle: "Entrenamiento funcional al aire libre",
        type: "sport",
        category: "Entrenamiento funcional",
        date: "2025-04-03",
        hours: 1,
        notes: "Circuito de HIIT con peso corporal",
        timestamp: "2025-04-03T07:30:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "dumbbell_2",
        objectTitle: "Partido de fútbol con amigos",
        type: "sport",
        category: "Deportes de equipo",
        date: "2025-04-04",
        hours: 1.5,
        notes: "Partido semanal, buen ritmo y trabajo en equipo",
        timestamp: "2025-04-04T20:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "dumbbell_3",
        objectTitle: "Yoga para flexibilidad",
        type: "sport",
        category: "Flexibilidad",
        date: "2025-04-05",
        hours: 0.8,
        notes: "Sesión enfocada en estiramientos de cadera y espalda",
        timestamp: "2025-04-05T09:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "dumbbell_4",
        objectTitle: "Sesión de bici estática de resistencia",
        type: "sport",
        category: "Resistencia",
        date: "2025-04-06",
        hours: 1.3,
        notes: "Sesión moderada de 60 minutos + calentamiento y estiramientos",
        timestamp: "2025-04-06T17:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "dumbbell_5",
        objectTitle: "Carrera de 5 km por el parque",
        type: "sport",
        category: "Correr",
        date: "2025-04-07",
        hours: 0.9,
        notes: "Buenos tiempos, mejora de ritmo respecto a la semana pasada",
        timestamp: "2025-04-07T08:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "dumbbell_6",
        objectTitle: "Entrenamiento de natación estilo crol",
        type: "sport",
        category: "Natación",
        date: "2025-04-08",
        hours: 1.1,
        notes: "Series de 50 m y técnica de respiración",
        timestamp: "2025-04-08T19:30:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "dumbbell_7",
        objectTitle: "Salida en bicicleta de montaña",
        type: "sport",
        category: "Ciclismo",
        date: "2025-04-09",
        hours: 2.5,
        notes: "Ruta por el parque natural con desnivel considerable",
        timestamp: "2025-04-09T10:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "dumbbell_8",
        objectTitle: "Escalada indoor",
        type: "sport",
        category: "Otros",
        date: "2025-04-10",
        hours: 1.7,
        notes: "Práctica de bloques de dificultad media",
        timestamp: "2025-04-10T18:00:00", // Eliminado .000Z
        completed: true
      },
      {
        objectId: "dumbbell_9",
        objectTitle: "Vuelta por Vallparadís",
        type: "sport",
        category: "Correr",
        date: "2025-05-18",
        hours: 2.0,
        notes: "Vuelta por el parque de Vallparadís, buen ritmo",
        timestamp: "2025-05-18T11:00:00", // Eliminado .000Z
        completed: false
      }
    ];

  }
  
  /**
   * Genera actividades simuladas de limpieza (escoba)
   * @returns {Array} - Lista de actividades de limpieza
   */
  static generateCleaningActivities() {
    return [
      {
        objectId: "broom_0",
        objectTitle: "Limpieza general",
        type: "cleaning",
        category: "Mantenimiento hogar",
        date: "2025-04-04",
        hours: 2.0,
        notes: "Limpieza general de todo el apartamento",
        timestamp: "2025-04-04T10:00:00",
        completed: true
      },
      {
        objectId: "broom_1",
        objectTitle: "Organización de armario",
        type: "cleaning",
        category: "Organización",
        date: "2025-04-09",
        hours: 1.5,
        notes: "Reorganización y limpieza del armario",
        timestamp: "2025-04-09T16:00:00",
        completed: true
      },
      {
        objectId: "broom_0",
        objectTitle: "Limpieza área de estudio",
        type: "cleaning",
        category: "Espacio de trabajo",
        date: "2025-04-13",
        hours: 0.75,
        notes: "Reorganización y limpieza del escritorio",
        timestamp: "2025-04-13T11:30:00",
        completed: true
      },
      {
        objectId: "broom_1",
        objectTitle: "Limpieza profunda de cocina",
        type: "cleaning",
        category: "Cocina",
        date: "2025-04-19",
        hours: 2.25,
        notes: "Limpieza a fondo de la cocina y electrodomésticos",
        timestamp: "2025-04-19T09:45:00",
        completed: true
      },
      {
        objectId: "broom_0",
        objectTitle: "Lavandería y plancha",
        type: "cleaning",
        category: "Ropa",
        date: "2025-04-23",
        hours: 1.25,
        notes: "Lavar y planchar la ropa de la semana",
        timestamp: "2025-04-23T14:00:00",
        completed: true
      }
    ];
  }
  
  /**
   * Genera actividades simuladas de ocio (TV/Micrófono)
   * @returns {Array} - Lista de actividades de ocio
   */
  static generateLeisureActivities() {
    return [
      {
        objectId: "tv_0",
        objectTitle: "Maratón de serie",
        type: "leisure",
        category: "Series",
        date: "2025-04-01",
        hours: 3.5,
        notes: "Maratón de la nueva temporada de The Office",
        timestamp: "2025-04-01T20:00:00",
        completed: true
      },
      {
        objectId: "tv_1",
        objectTitle: "Sesión de cine",
        type: "leisure",
        category: "Películas",
        date: "2025-04-02",
        hours: 2,
        notes: "Vimos 'Dune' en el cine",
        timestamp: "2025-04-02T19:00:00",
        completed: true
      },
      {
        objectId: "tv_2",
        objectTitle: "Escuchar álbum nuevo",
        type: "leisure",
        category: "Música",
        date: "2025-04-03",
        hours: 1,
        notes: "Primera escucha del último disco de Coldplay",
        timestamp: "2025-04-03T17:00:00",
        completed: true
      },
      {
        objectId: "tv_3",
        objectTitle: "Partida de videojuegos",
        type: "leisure",
        category: "Videojuegos",
        date: "2025-04-04",
        hours: 2.5,
        notes: "Sesión cooperativa en Zelda: Tears of the Kingdom",
        timestamp: "2025-04-04T21:00:00",
        completed: true
      },
      {
        objectId: "tv_4",
        objectTitle: "Documental sobre ciencia",
        type: "leisure",
        category: "Documentales",
        date: "2025-04-05",
        hours: 1.5,
        notes: "Nueva serie de Netflix sobre el espacio",
        timestamp: "2025-04-05T18:00:00",
        completed: true
      },
      {
        objectId: "tv_5",
        objectTitle: "Salida al cine",
        type: "leisure",
        category: "Cine",
        date: "2025-04-06",
        hours: 2,
        notes: "Cine con amigos para ver 'Barbie'",
        timestamp: "2025-04-06T19:30:00",
        completed: true
      },
      {
        objectId: "tv_6",
        objectTitle: "Leer por placer",
        type: "leisure",
        category: "Lectura por placer",
        date: "2025-04-07",
        hours: 1.2,
        notes: "Capítulos finales de 'El Principito'",
        timestamp: "2025-04-07T22:00:00",
        completed: true
      },
      {
        objectId: "tv_7",
        objectTitle: "Relax con podcast",
        type: "leisure",
        category: "Otros",
        date: "2025-04-08",
        hours: 0.8,
        notes: "Escuchando un podcast de filosofía por la tarde",
        timestamp: "2025-04-08T20:30:00",
        completed: true
      }
    ];
  }
  

  /**
   * Genera actividades simuladas de estudio (escuela/universidad)
   * @returns {Array} - Lista de actividades de estudio
   */
  static generateStudyActivities() {
    return [
      {
        objectId: "study_0_0",
        objectTitle: "Diseño Centrado en el Usuario",
        type: "study",
        category: "Factores Humanos",
        date: "2025-04-03",
        hours: 2.5,
        notes: "Análisis de interacción persona-ordenador y principios de usabilidad",
        timestamp: "2025-04-03T14:00:00",
        completed: true
      },

      {
        objectId: "study_0_1",
        objectTitle: "Transformadas y Series",
        type: "study",
        category: "Análisis Complejo",
        date: "2025-04-07",
        hours: 3.0,
        notes: "Estudio de transformadas de Fourier y series complejas",
        timestamp: "2025-04-07T10:30:00",
        completed: true
      },
      {
        objectId: "study_0_2",
        objectTitle: "Desarrollo Web",
        type: "study",
        category: "Programación",
        date: "2025-04-11",
        hours: 2.75,
        notes: "Prácticas con React y Node.js para aplicaciones web",
        timestamp: "2025-04-11T15:45:00",
        completed: true
      },
      {
        objectId: "study_1_0",
        objectTitle: "Alemán B1",
        type: "study",
        category: "Idiomas",
        date: "2025-04-14",
        hours: 1.5,
        notes: "Práctica de gramática y vocabulario para el examen oficial",
        timestamp: "2025-04-14T18:00:00",
        completed: true
      },
      {
        objectId: "study_1_1",
        objectTitle: "Historia Contemporánea",
        type: "study",
        category: "Historia",
        date: "2025-04-18",
        hours: 2.0,
        notes: "Revisión de los acontecimientos clave del siglo XX",
        timestamp: "2025-04-18T17:15:00",
        completed: true
      },
      {
        objectId: "study_1_2",
        objectTitle: "Física Cuántica",
        type: "study",
        category: "Ciencias",
        date: "2025-04-21",
        hours: 3.25,
        notes: "Principios fundamentales y mecánica cuántica básica",
        timestamp: "2025-04-21T09:00:00",
        completed: true
      },
      {
        objectId: "study_2_0",
        objectTitle: "Estadística Avanzada",
        type: "study",
        category: "Matemáticas",
        date: "2025-04-23",
        hours: 2.5,
        notes: "Modelos probabilísticos y análisis multivariante",
        timestamp: "2025-04-23T13:30:00",
        completed: true
      },
      {
        objectId: "study_2_1",
        objectTitle: "Técnicas de Estudio",
        type: "study",
        category: "Otros",
        date: "2025-04-25",
        hours: 1.0,
        notes: "Mejora de metodologías de aprendizaje y gestión del tiempo",
        timestamp: "2025-04-25T16:00:00",
        completed: true
      },
      {
        objectId: "study_2_2",
        objectTitle: "Estudiar tema 4 de física",
        type: "study",
        category: "Física",
        date: "2025-05-18",
        hours: 3.0,
        notes: "Repaso de las leyes de Newton y sus aplicaciones",
        timestamp: "2025-05-18T17:00:00",
        completed: false
      }
      
    ];
  }
  /**
   * Añade todas las actividades simuladas al localStorage
   */
  static addAllMockActivities() {
    const readingActivities = this.generateReadingActivities();
    const workActivities = this.generateWorkActivities();
    const sportActivities = this.generateSportActivities();
    const cleaningActivities = this.generateCleaningActivities();
    const leisureActivities = this.generateLeisureActivities();
    const studyActivities = this.generateStudyActivities();
    
    // Guardamos cada tipo de actividad en su propio espacio
    localStorage.setItem('readingActivities', JSON.stringify(readingActivities));
    localStorage.setItem('workActivities', JSON.stringify(workActivities));
    localStorage.setItem('sportActivities', JSON.stringify(sportActivities));
    localStorage.setItem('cleaningActivities', JSON.stringify(cleaningActivities));
    localStorage.setItem('leisureActivities', JSON.stringify(leisureActivities));
    localStorage.setItem('studyActivities', JSON.stringify(studyActivities));
    
    // También guardamos todas las actividades juntas en userActivities para compatibilidad
    const allActivities = [
      ...readingActivities,
      ...workActivities,
      ...sportActivities,
      ...cleaningActivities,
      ...leisureActivities,
      ...studyActivities
    ];
    
    localStorage.setItem('userActivities', JSON.stringify(allActivities));
    
    console.log(`Se han añadido ${allActivities.length} actividades simuladas: 
      - ${readingActivities.length} lectura
      - ${workActivities.length} trabajo
      - ${sportActivities.length} deporte
      - ${cleaningActivities.length} limpieza
      - ${leisureActivities.length} ocio
      - ${studyActivities.length} estudio`
    );
    
    return allActivities;
  }
  
  /**
   * Comprueba si hay actividades y añade simuladas si no las hay
   */
  static ensureMockActivitiesExist() {
    const existingActivities = JSON.parse(localStorage.getItem('userActivities')) || [];
    
    if (existingActivities.length === 0) {
      return this.addAllMockActivities();
    } else {
      console.log(`Ya existen ${existingActivities.length} actividades, no se añadirán simuladas`);
      return existingActivities;
    }
  }
}