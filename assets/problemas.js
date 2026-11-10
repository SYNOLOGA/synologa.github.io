/*
  PROBLEMAS PARA ASPIRANTES A ASESOR
  ----------------------------------
  8 problemas por materia. La página le da a cada aspirante uno al azar y no le
  repite los que ya vio en ese navegador. Aquí solo están los enunciados:
  las respuestas están guardadas en el Apps Script (variable RESPUESTAS_ASESOR),
  para que nadie las vea en la página.

  Si se agrega o cambia un problema, hay que cambiar también su respuesta en el
  Apps Script con el MISMO código (por ejemplo "AL-3").
*/
const PROBLEMAS_ASESOR = {
  "Cálculo y Geometría Analítica": [
    { codigo: "CGA-1", texto: "Calcula el límite cuando x tiende a 3 de (x² − 9) / (x − 3)." },
    { codigo: "CGA-2", texto: "Sea f(x) = x³ − 6x² + 9x + 1. ¿En qué valor de x > 1 tiene f un mínimo local?" },
    { codigo: "CGA-3", texto: "Si f(x) = (2x + 1)³, ¿cuánto vale f′(1)?" },
    { codigo: "CGA-4", texto: "¿Cuál es la pendiente de la recta tangente a y = x² + 3x en el punto donde x = 2?" },
    { codigo: "CGA-5", texto: "¿Cuál es la distancia entre los puntos (1, 2) y (7, 10)?" },
    { codigo: "CGA-6", texto: "¿Cuál es el radio de la circunferencia x² + y² − 6x + 8y = 0?" },
    { codigo: "CGA-7", texto: "Calcula el límite cuando x tiende a 0 de sen(5x) / x." },
    { codigo: "CGA-8", texto: "Si f(x) = x·eˣ, ¿cuánto vale la segunda derivada f″(0)?" }
  ],
  "Álgebra": [
    { codigo: "ALG-1", texto: "¿Cuánto vale la suma de las raíces de 2x² − 10x + 3 = 0?" },
    { codigo: "ALG-2", texto: "Si x + y = 10 y xy = 21, ¿cuánto vale x² + y²?" },
    { codigo: "ALG-3", texto: "¿Cuál es el módulo del número complejo z = 6 − 8i?" },
    { codigo: "ALG-4", texto: "Calcula (1 + i)⁴. Escribe el resultado como número real." },
    { codigo: "ALG-5", texto: "¿Cuánto vale log₂(64) − log₃(27)?" },
    { codigo: "ALG-6", texto: "¿Cuál es el coeficiente de x² en el desarrollo de (x + 2)⁵?" },
    { codigo: "ALG-7", texto: "¿Cuál es el residuo de dividir P(x) = x³ − 2x² + 4x − 5 entre (x − 2)?" },
    { codigo: "ALG-8", texto: "Si 2x + y = 11 y x − y = 1, ¿cuánto vale el producto x·y?" }
  ],
  "Álgebra Lineal": [
    { codigo: "AL-1", texto: "Calcula el determinante de la matriz [ 2 1 0 ; 1 3 1 ; 0 1 2 ] (renglones separados por ;)." },
    { codigo: "AL-2", texto: "Sea A = [ 1 2 ; 3 4 ]. ¿Cuánto vale la traza de A²?" },
    { codigo: "AL-3", texto: "¿Cuál es el valor propio (eigenvalor) más grande de la matriz [ 4 1 ; 2 3 ]?" },
    { codigo: "AL-4", texto: "¿Cuál es el rango de la matriz [ 1 2 3 ; 2 4 6 ; 1 0 1 ]?" },
    { codigo: "AL-5", texto: "Calcula el producto punto de u = (1, 2, 3) y v = (4, −5, 6)." },
    { codigo: "AL-6", texto: "¿Cuál es la dimensión del conjunto de soluciones de x + y + z = 0 en ℝ³?" },
    { codigo: "AL-7", texto: "Resuelve el sistema x + y + z = 6, x − y = 0, z = 2x. ¿Cuánto vale x?" },
    { codigo: "AL-8", texto: "Si A es una matriz de 3×3 con det(A) = 2, ¿cuánto vale det(3A)?" }
  ],
  "Cálculo Integral": [
    { codigo: "CI-1", texto: "Calcula la integral de 0 a 2 de (3x² + 1) dx." },
    { codigo: "CI-2", texto: "Calcula la integral de 0 a π de sen(x) dx." },
    { codigo: "CI-3", texto: "Calcula la integral de 1 a e de (1/x) dx." },
    { codigo: "CI-4", texto: "Calcula la integral de 0 a 1 de x·eˣ dx." },
    { codigo: "CI-5", texto: "¿Cuál es el área entre la curva y = 6x − x² y el eje x?" },
    { codigo: "CI-6", texto: "Calcula la integral de 0 a 3 de |x − 1| dx." },
    { codigo: "CI-7", texto: "La región bajo y = √x, de x = 0 a x = 4, gira alrededor del eje x. Si el volumen es V, ¿cuánto vale V/π?" },
    { codigo: "CI-8", texto: "Calcula la integral de 0 a 1 de 2x·(x² + 1)³ dx." }
  ],
  "Cálculo Vectorial": [
    { codigo: "CV-1", texto: "Sea f(x, y) = x²y + 3y². ¿Cuánto vale ∂f/∂y en el punto (1, 2)?" },
    { codigo: "CV-2", texto: "Sea f(x, y) = 3x + 4y. ¿Cuál es la magnitud de su gradiente?" },
    { codigo: "CV-3", texto: "Calcula la integral doble de (x + y) sobre el rectángulo 0 ≤ x ≤ 1, 0 ≤ y ≤ 2." },
    { codigo: "CV-4", texto: "Sea F = (x², yz, z²). ¿Cuánto vale la divergencia de F en el punto (1, 1, 1)?" },
    { codigo: "CV-5", texto: "¿Cuál es la magnitud del producto cruz (2, 1, 0) × (1, 3, 0)?" },
    { codigo: "CV-6", texto: "Sea f(x, y) = x² + y². Calcula su derivada direccional en (1, 2) en la dirección del vector unitario (3/5, 4/5)." },
    { codigo: "CV-7", texto: "Calcula la integral triple de (x + y + z) sobre el cubo 0 ≤ x, y, z ≤ 1." },
    { codigo: "CV-8", texto: "Sea F = (−y, x, 0). ¿Cuánto vale la componente z de su rotacional?" }
  ],
  "Ecuaciones Diferenciales": [
    { codigo: "ED-1", texto: "Resuelve y′ = 3y con y(0) = 2. ¿Cuánto vale y(ln 2)?" },
    { codigo: "ED-2", texto: "Si y = cos(kx), con k > 0, es solución de y″ + 9y = 0, ¿cuánto vale k?" },
    { codigo: "ED-3", texto: "Para y″ − 5y′ + 6y = 0, ¿cuál es la raíz más grande de la ecuación característica?" },
    { codigo: "ED-4", texto: "Resuelve y′ = 2x con y(0) = 1. ¿Cuánto vale y(3)?" },
    { codigo: "ED-5", texto: "La transformada de Laplace de t² es una función F(s). ¿Cuánto vale F(1)?" },
    { codigo: "ED-6", texto: "Para y′ + y = 0 con y(0) = 5, ¿cuánto vale y′(0)?" },
    { codigo: "ED-7", texto: "¿Cuánto vale el wronskiano de eˣ y e²ˣ en x = 0?" },
    { codigo: "ED-8", texto: "Resuelve y″ = 6x con y(0) = 0 y y′(0) = 0. ¿Cuánto vale y(2)?" }
  ]
};
