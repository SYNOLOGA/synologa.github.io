# Página web de SYNOLOGA

Página hecha con HTML, CSS y JavaScript, sin programas ni librerías extra. Se puede abrir directo en el navegador (doble clic en `index.html`) y subir tal cual a cualquier hosting.

## Qué hay en cada archivo

| Archivo | Qué es |
|---|---|
| `index.html` | Inicio: portada, los tres apartados, el Reto SYNOLOGA (juego) y preguntas frecuentes |
| `apuntes.html` | Ver apuntes: materias por semestre y buscador (acepta `apuntes.html?q=palabra`) |
| `materia.html` | Página de cada materia (por ejemplo `materia.html#algebra-lineal`) |
| `subir.html` | Subir apuntes: cómo funciona, qué se acepta y enlace al formulario |
| `asesorias.html` | Asesorías: horarios con botón «Agendar», reglas y «Quiero ser asesor» |
| `acerca.html` | Qué es SYNOLOGA y contacto |
| `privacidad.html` | Aviso de privacidad (texto del Área Legal) |
| `terminos.html` | Condiciones de uso (texto del Área Legal) |
| `assets/config.js` | Enlaces: formulario, Drive, agenda, correo y redes |
| `assets/materias.js` | Catálogo de materias: nombre, semestre, temas, portada y si tiene asesoría |
| `assets/portadas.js` | Dibujos de las portadas de cada materia, con los colores del logo |
| `assets/problemas.js` | Problemas para aspirantes a asesor (8 por materia). Las respuestas están solo en el Apps Script (`RESPUESTAS_ASESOR`) |
| `assets/materiales.js` | Lista de materiales que aparecen en el buscador |
| `assets/estilos.css` | Colores, letras y diseño |
| `assets/app.js` | Funcionamiento del buscador y los enlaces |

## Lo que se cambia seguido

- **Enlaces y correo:** en `assets/config.js`. Mientras un enlace diga `"PENDIENTE"`, la página avisa que todavía no está listo en lugar de abrirlo.
- **Agregar un material:** ya no se hace a mano. Al poner «Aprobado» en la hoja de respuestas, el sistema de Google lo agrega a la hoja «SYNOLOGA · Catálogo (público)» y la página lo muestra sola (su ID va en `catalogo` de `assets/config.js`). Para quitar un material, se borra su fila del Catálogo. `materiales.js` solo guarda los ejemplos que se ven mientras el Catálogo está vacío.
- **Agregar una materia:** en `assets/materias.js`, copiar un bloque y elegir su portada y su tono de color. Revisen que el semestre coincida con su plan de estudios.
- **Quitar los ejemplos:** borrar los bloques que tienen `ejemplo: true` cuando ya haya material real.

## Horarios de asesoría

Están en `assets/materias.js` (campo `horarios`) y en el Apps Script «Automatizacion SYNOLOGA» (variable `HORARIOS`). **Deben ser iguales en los dos lados.** Si se cambian:
1. Cambiarlos en `materias.js` y en el Apps Script.
2. En el Apps Script, correr `rehacerFormularioAsesorias` (solo si el formulario aún no tiene respuestas reales; si ya tiene, editar las opciones a mano en el formulario).
3. Cada botón «Agendar» abre el formulario con el horario ya marcado gracias a `entradaHorario` en `config.js`.

## Aspirantes a asesor

En Asesorías → «Quiero ser asesor», el aspirante elige materia y la página le da un problema al azar de `problemas.js`, sin repetirle los que ya vio. Al enviar el formulario «SYNOLOGA · Quiero ser asesor», el Apps Script compara su resultado con `RESPUESTAS_ASESOR` y anota «Correcto» o «Incorrecto» en la hoja de respuestas, pero **no lo aprueba solo**: el equipo revisa el procedimiento (que no sea de una IA) y elige Aprobado o Rechazado en la columna «Estado». Al aprobar, se agrega a la pestaña «Asesores» y le llega un correo de bienvenida.

## Anunciantes

El botón «Quiero anunciarme» abre el formulario «SYNOLOGA · Anúnciate con nosotros». Las solicitudes se aprueban o rechazan igual, en la columna «Estado» de su hoja de respuestas. Las condiciones están en `terminos.html#anunciantes`. Para agregar o cambiar un problema, se cambia en los dos lados con el mismo código (por ejemplo `AL-3`).

## Subirla a un hosting

Como es una página estática, se sube gratis a Cloudflare Pages (la opción elegida en la sección 2.5 del doc) y después se le conecta el dominio propio. Basta con subir la carpeta completa.

## Anuncios (AdSense)

Cuando Google apruebe la cuenta, se pega su código en el `<head>` de cada página, donde dice "Google AdSense". En `index.html` ya hay un espacio reservado para un anuncio debajo de los resultados.

## Más adelante

Para la etapa 2 (inicio de sesión y detectores de IA y plagio), la sección 2.5 del doc propone agregar Cloudflare Workers como servidor y Supabase como base de datos, sin cambiar estos archivos HTML.
