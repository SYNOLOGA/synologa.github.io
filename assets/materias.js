/*
  CATÁLOGO DE MATERIAS
  --------------------
  Cada materia tiene su propia portada y su propia página (materia.html#clave).

  Campos:
    clave     Identificador sin acentos ni espacios. Se usa en el enlace de la página.
    nombre    Nombre de la materia, escrito EXACTAMENTE igual que en materiales.js.
    semestre  Semestre sugerido. Revísenlo contra el plan de estudios de su carrera.
    portada   Dibujo de la portada (ver assets/portadas.js): calculo, algebra, lineal,
              integral, vectorial, edo, quimica, fisica, estatica, dinamica,
              probabilidad, electricidad, termo, programacion.
    tono      Combinación de colores de la portada: 0, 1, 2 o 3.
    asesoria  true si la materia está en el piloto de asesorías (sección 9.2 del doc).
    horarios  Solo materias con asesoría: lista de [día, hora]. Día 1 = lunes ... 5 = viernes;
              hora en formato 24 h (17 = 5 p. m.). Deben ser IGUALES a los del Apps Script
              (variable HORARIOS) para que el botón «Agendar» marque la opción correcta.
    temas     Temas principales, separados por coma.
*/
const MATERIAS = [
  { clave: "calculo-geometria-analitica", nombre: "Cálculo y Geometría Analítica", semestre: 1, portada: "calculo", tono: 0, asesoria: true, horarios: [[1, 17], [3, 17]],
    temas: "Funciones, límites, continuidad, derivadas, representación gráfica" },
  { clave: "algebra", nombre: "Álgebra", semestre: 1, portada: "algebra", tono: 1, asesoria: true, horarios: [[2, 17], [4, 17]],
    temas: "Operaciones algebraicas, ecuaciones, factorización, números complejos" },
  { clave: "quimica", nombre: "Química", semestre: 1, portada: "quimica", tono: 2, asesoria: false,
    temas: "Estructura atómica, enlace químico, estequiometría" },
  { clave: "fundamentos-fisica", nombre: "Fundamentos de Física", semestre: 1, portada: "fisica", tono: 3, asesoria: false,
    temas: "Mediciones, vectores, movimiento ondulatorio" },
  { clave: "fundamentos-programacion", nombre: "Fundamentos de Programación", semestre: 1, portada: "programacion", tono: 1, asesoria: false,
    temas: "Algoritmos, diagramas de flujo, estructuras de control" },

  { clave: "algebra-lineal", nombre: "Álgebra Lineal", semestre: 2, portada: "lineal", tono: 2, asesoria: true, horarios: [[1, 18], [3, 18]],
    temas: "Matrices, determinantes, sistemas de ecuaciones, espacios vectoriales" },
  { clave: "calculo-integral", nombre: "Cálculo Integral", semestre: 2, portada: "integral", tono: 0, asesoria: true, horarios: [[2, 18], [4, 18]],
    temas: "Integración, métodos de integración, aplicaciones" },
  { clave: "estatica", nombre: "Estática", semestre: 2, portada: "estatica", tono: 3, asesoria: false,
    temas: "Equilibrio de partículas y cuerpos rígidos, armaduras" },

  { clave: "calculo-vectorial", nombre: "Cálculo Vectorial", semestre: 3, portada: "vectorial", tono: 1, asesoria: true, horarios: [[3, 19], [5, 17]],
    temas: "Vectores, funciones de varias variables, derivadas parciales, integrales múltiples" },
  { clave: "ecuaciones-diferenciales", nombre: "Ecuaciones Diferenciales", semestre: 3, portada: "edo", tono: 2, asesoria: true, horarios: [[1, 19], [5, 18]],
    temas: "Ecuaciones de primer y segundo orden, métodos de solución, aplicaciones" },
  { clave: "cinematica-dinamica", nombre: "Cinemática y Dinámica", semestre: 3, portada: "dinamica", tono: 0, asesoria: false,
    temas: "Movimiento de partículas, leyes de Newton, trabajo y energía" },

  { clave: "probabilidad", nombre: "Probabilidad", semestre: 4, portada: "probabilidad", tono: 3, asesoria: false,
    temas: "Probabilidad, variables aleatorias, distribuciones" },
  { clave: "electricidad-magnetismo", nombre: "Electricidad y Magnetismo", semestre: 4, portada: "electricidad", tono: 1, asesoria: false,
    temas: "Campo eléctrico, circuitos, campo magnético" },
  { clave: "termodinamica", nombre: "Termodinámica", semestre: 4, portada: "termo", tono: 2, asesoria: false,
    temas: "Propiedades de las sustancias, primera y segunda ley" },
];
