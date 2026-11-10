/*
  CATÁLOGO DE MATERIALES
  ----------------------
  Cada material es un bloque { ... } dentro de la lista.
  Para agregar uno nuevo, copia un bloque, cambia los datos y pon el enlace de Drive.

  Campos:
    titulo    Nombre corto del material.
    materia   Nombre de la materia, siempre escrito igual (así funcionan los filtros).
    semestre  Número del semestre (1, 2, 3, 4...).
    profesor  Nombre del profesor, o "" si no aplica.
    tipo      Apuntes, Resumen, Guía de estudio, Ejercicios resueltos, Presentación u Otro.
    autor     Nombre de quien lo compartió (siempre se da crédito).
    enlace    Enlace de Drive al archivo.
    ejemplo   true solo en estos ejemplos. Bórralos cuando haya material real.
*/
const MATERIALES = [
  {
    titulo: "Apuntes de límites y continuidad",
    materia: "Cálculo y Geometría Analítica",
    semestre: 1,
    profesor: "",
    tipo: "Apuntes",
    autor: "Equipo SYNOLOGA",
    enlace: "",
    ejemplo: true,
  },
  {
    titulo: "Guía de estudio del primer parcial",
    materia: "Álgebra",
    semestre: 1,
    profesor: "",
    tipo: "Guía de estudio",
    autor: "Equipo SYNOLOGA",
    enlace: "",
    ejemplo: true,
  },
  {
    titulo: "Ejercicios resueltos de espacios vectoriales",
    materia: "Álgebra Lineal",
    semestre: 2,
    profesor: "",
    tipo: "Ejercicios resueltos",
    autor: "Equipo SYNOLOGA",
    enlace: "",
    ejemplo: true,
  },
  {
    titulo: "Resumen de ecuaciones de primer orden",
    materia: "Ecuaciones Diferenciales",
    semestre: 3,
    profesor: "",
    tipo: "Resumen",
    autor: "Equipo SYNOLOGA",
    enlace: "",
    ejemplo: true,
  },
  {
    titulo: "Formulario de integrales de línea",
    materia: "Cálculo Vectorial",
    semestre: 3,
    profesor: "",
    tipo: "Resumen",
    autor: "Equipo SYNOLOGA",
    enlace: "",
    ejemplo: true,
  },
  {
    titulo: "Métodos de integración con ejemplos",
    materia: "Cálculo Integral",
    semestre: 2,
    profesor: "",
    tipo: "Guía de estudio",
    autor: "Equipo SYNOLOGA",
    enlace: "",
    ejemplo: true,
  },
  {
    titulo: "Estequiometría: problemas resueltos",
    materia: "Química",
    semestre: 1,
    profesor: "",
    tipo: "Ejercicios resueltos",
    autor: "Equipo SYNOLOGA",
    enlace: "",
    ejemplo: true,
  },
];
