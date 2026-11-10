/* SYNOLOGA — funciones de la página (sin librerías externas) */

(function () {
  "use strict";

  var config = typeof SYNOLOGA_CONFIG !== "undefined" ? SYNOLOGA_CONFIG : {};
  var EJEMPLOS = typeof MATERIALES !== "undefined" ? MATERIALES : [];

  /* ---------- Catálogo: lo llena solo el sistema de Google al aprobar material ---------- */
  function leerCSV(texto) {
    var filas = [], fila = [], campo = "", comillas = false;
    for (var i = 0; i < texto.length; i++) {
      var c = texto[i];
      if (comillas) {
        if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
        else if (c === '"') comillas = false;
        else campo += c;
      } else if (c === '"') comillas = true;
      else if (c === ",") { fila.push(campo); campo = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && texto[i + 1] === "\n") i++;
        fila.push(campo); filas.push(fila); fila = []; campo = "";
      } else campo += c;
    }
    if (campo || fila.length) { fila.push(campo); filas.push(fila); }
    return filas;
  }
  function desdeCatalogo(texto) {
    var filas = leerCSV(texto), h = (filas.shift() || []).map(function (t) { return t.trim().toLowerCase(); });
    function v(f, nombre) { var i = h.indexOf(nombre); return i < 0 ? "" : (f[i] || "").trim(); }
    return filas.filter(function (f) { return v(f, "titulo") && v(f, "enlace"); }).map(function (f) {
      return {
        titulo: v(f, "titulo"), materia: v(f, "materia"), semestre: Number(v(f, "semestre")) || "",
        profesor: v(f, "profesor"), tipo: v(f, "tipo"), autor: v(f, "autor"), enlace: v(f, "enlace")
      };
    }).reverse(); // lo más nuevo primero
  }
  var id = config.catalogo;
  if (id && id !== "PENDIENTE" && window.fetch) {
    fetch("https://docs.google.com/spreadsheets/d/" + id + "/gviz/tq?tqx=out:csv&sheet=" + encodeURIComponent("Catálogo"))
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (t) { var reales = desdeCatalogo(t); iniciar(reales.length ? reales : EJEMPLOS); })
      .catch(function () { iniciar(EJEMPLOS); });
  } else iniciar(EJEMPLOS);

  function iniciar(DATOS) {
  var MATS = typeof MATERIAS !== "undefined" ? MATERIAS : [];
  var portada = window.portadaSVG || function () { return ""; };

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function escapar(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function sinAcentos(t) {
    return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  function materiaPorNombre(nombre) {
    for (var i = 0; i < MATS.length; i++) if (MATS[i].nombre === nombre) return MATS[i];
    return null;
  }
  function materialesDe(nombre) { return DATOS.filter(function (m) { return m.materia === nombre; }); }
  function reales(lista) { return lista.filter(function (m) { return !m.ejemplo; }); }

  /* ---------- Horarios de asesoría ---------- */
  var DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  var DIAS_CORTOS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  function hora12(h) { return h > 12 ? h - 12 : h; }
  // Igual que etiquetaHorario() del Apps Script: así el formulario marca la opción correcta.
  function etiquetaHorario(materia, dia, hora) {
    return materia + " · " + DIAS[dia] + " de " + hora12(hora) + " a " + hora12(hora + 1) + (hora + 1 >= 12 ? " p. m." : " a. m.");
  }
  function enlaceHorario(materia, dia, hora) {
    var base = config.agendaAsesorias;
    if (!base || base === "PENDIENTE") return "#";
    if (!config.entradaHorario || config.entradaHorario === "PENDIENTE") return base;
    return base + (base.indexOf("?") < 0 ? "?" : "&") + "usp=pp_url&" + config.entradaHorario + "=" +
      encodeURIComponent(etiquetaHorario(materia, dia, hora));
  }
  function resumenHorarios(m) {
    var hs = m.horarios || [];
    if (!hs.length) return "";
    var mismaHora = hs.every(function (h) { return h[1] === hs[0][1]; });
    if (mismaHora) return hs.map(function (h) { return DIAS_CORTOS[h[0]]; }).join(" y ") + " · " + hora12(hs[0][1]) + " a " + hora12(hs[0][1] + 1) + " p. m.";
    return hs.map(function (h) { return DIAS_CORTOS[h[0]] + " " + hora12(h[1]) + "–" + hora12(h[1] + 1); }).join(" · ") + " p. m.";
  }

  /* ---------- Avisos ---------- */
  var aviso = $("#aviso"), temporizador;
  function mostrarAviso(texto) {
    if (!aviso) return;
    aviso.textContent = texto;
    aviso.hidden = false;
    clearTimeout(temporizador);
    temporizador = setTimeout(function () { aviso.hidden = true; }, 4000);
  }

  /* ---------- Menú en celular ---------- */
  var botonMenu = $(".boton-menu"), menu = $(".menu");
  if (botonMenu && menu) {
    botonMenu.addEventListener("click", function () {
      var abierto = menu.classList.toggle("abierto");
      botonMenu.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
  }

  /* ---------- Enlaces que vienen de config.js ---------- */
  function listo(valor) { return valor && valor !== "PENDIENTE"; }
  $$("[data-enlace]").forEach(function (el) {
    var clave = el.getAttribute("data-enlace"), valor = config[clave];
    if (listo(valor)) {
      el.href = clave === "correoContacto" ? "mailto:" + valor : valor;
      if (clave !== "correoContacto") { el.target = "_blank"; el.rel = "noopener"; }
    } else {
      el.href = "#";
      el.addEventListener("click", function (e) {
        e.preventDefault();
        mostrarAviso("Este enlace todavía no está listo. Pronto lo activamos.");
      });
    }
  });
  $$("[data-texto]").forEach(function (el) {
    var valor = config[el.getAttribute("data-texto")];
    el.textContent = listo(valor) ? valor : "(correo pendiente)";
  });

  /* ---------- Compartir material: casilla de aceptación ---------- */
  var casilla = $("#acepto"), botonSubir = $("#boton-subir");
  if (casilla && botonSubir) {
    var actualizar = function () { botonSubir.setAttribute("aria-disabled", casilla.checked ? "false" : "true"); };
    casilla.addEventListener("change", actualizar);
    botonSubir.addEventListener("click", function (e) {
      if (!casilla.checked) {
        e.preventDefault();
        e.stopImmediatePropagation();
        mostrarAviso("Primero marca la casilla de condiciones para continuar.");
      }
    }, true);
    actualizar();
  }

  /* ---------- Red de nodos de la portada (como el logo) ---------- */
  var lienzo = $(".portada canvas");
  if (lienzo && lienzo.getContext) {
    var ctx = lienzo.getContext("2d"), nodos = [], ancho = 0, alto = 0, animando = false;
    var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dimensionar = function () {
      var r = lienzo.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
      ancho = r.width; alto = r.height;
      lienzo.width = ancho * d; lienzo.height = alto * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      var n = Math.round(Math.min(70, ancho * alto / 14000));
      nodos = [];
      for (var i = 0; i < n; i++) {
        nodos.push({ x: Math.random() * ancho, y: Math.random() * alto,
          vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18, oro: Math.random() < 0.22 });
      }
    };
    var dibujar = function () {
      ctx.clearRect(0, 0, ancho, alto);
      for (var i = 0; i < nodos.length; i++) {
        for (var j = i + 1; j < nodos.length; j++) {
          var dx = nodos[i].x - nodos[j].x, dy = nodos[i].y - nodos[j].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.strokeStyle = "rgba(108,192,232," + (0.22 * (1 - d / 130)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(nodos[i].x, nodos[i].y); ctx.lineTo(nodos[j].x, nodos[j].y); ctx.stroke();
          }
        }
      }
      nodos.forEach(function (p) {
        ctx.fillStyle = p.oro ? "rgba(232,194,90,.75)" : "rgba(108,192,232,.6)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.oro ? 2.6 : 2, 0, Math.PI * 2); ctx.fill();
      });
    };
    var paso = function () {
      if (!animando) return;
      nodos.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > ancho) p.vx *= -1;
        if (p.y < 0 || p.y > alto) p.vy *= -1;
      });
      dibujar();
      requestAnimationFrame(paso);
    };
    dimensionar(); dibujar();
    window.addEventListener("resize", function () { dimensionar(); dibujar(); });
    if (!quieto) {
      animando = true; requestAnimationFrame(paso);
      document.addEventListener("visibilitychange", function () {
        animando = !document.hidden;
        if (animando) requestAnimationFrame(paso);
      });
    }
  }

  /* ---------- Portadas sueltas (abanico, encabezados) ---------- */
  $$("[data-portada]").forEach(function (el) {
    var m = MATS.filter(function (x) { return x.clave === el.getAttribute("data-portada"); })[0];
    if (m) el.insertAdjacentHTML("afterbegin", portada(m.portada, m.tono, m.nombre));
  });

  /* ---------- Tarjetas de materias ---------- */
  function tarjeta(m) {
    var n = reales(materialesDe(m.nombre)).length;
    var meta = n ? n + (n === 1 ? " apunte revisado" : " apuntes revisados") : "Apuntes en camino";
    return '<a class="tarjeta-materia" href="materia.html#' + m.clave + '">' +
      '<div class="imagen">' + portada(m.portada, m.tono, m.nombre) + "</div>" +
      '<div class="cuerpo"><h3>' + escapar(m.nombre) + "</h3>" +
      '<p class="meta">' + meta + "</p>" +
      (m.asesoria ? '<span class="insignia">Asesoría disponible</span>' : "") +
      '<span class="ver-apuntes">Ver apuntes →</span></div></a>';
  }
  var rejilla = $("#rejilla-materias");
  if (rejilla) {
    var pintarMaterias = function () { rejilla.innerHTML = MATS.map(tarjeta).join(""); };
    pintarMaterias();
  }

  /* ---------- Renglón de material ---------- */
  function resaltar(texto, palabras) {
    var seguro = escapar(texto);
    if (!palabras.length) return seguro;
    var base = sinAcentos(seguro), marcas = [];
    palabras.forEach(function (p) {
      var i = base.indexOf(p);
      while (i !== -1 && p) { marcas.push([i, i + p.length]); i = base.indexOf(p, i + p.length); }
    });
    if (!marcas.length) return seguro;
    marcas.sort(function (a, b) { return a[0] - b[0]; });
    var salida = "", pos = 0;
    marcas.forEach(function (m) {
      if (m[0] < pos) return;
      salida += seguro.slice(pos, m[0]) + "<mark>" + seguro.slice(m[0], m[1]) + "</mark>";
      pos = m[1];
    });
    return salida + seguro.slice(pos);
  }
  function renglon(m, palabras) {
    var mat = materiaPorNombre(m.materia);
    var datos = ["<span>" + resaltar(m.materia, palabras) + "</span>"];
    datos.push("<span>" + escapar(m.tipo) + "</span>");
    var boton = m.enlace
      ? '<a class="boton boton-chico contorno" href="' + escapar(m.enlace) + '" target="_blank" rel="noopener">Abrir</a>'
      : '<a class="boton boton-chico contorno" href="#" data-sin-enlace aria-disabled="true">Abrir</a>';
    return '<li class="material"><div class="mini">' + (mat ? portada(mat.portada, mat.tono, mat.nombre) : "") + "</div>" +
      "<div><h3>" + resaltar(m.titulo, palabras) + (m.ejemplo ? '<span class="etiqueta-ejemplo">Ejemplo</span>' : "") + "</h3>" +
      '<p class="datos">' + datos.join("") + "</p>" +
      '<p class="autor">Compartido por <strong>' + escapar(m.autor) + "</strong></p></div>" + boton + "</li>";
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("[data-sin-enlace]")) {
      e.preventDefault();
      mostrarAviso("Este es un ejemplo. El material real aparecerá aquí cuando se suba.");
    }
  });

  /* ---------- Buscador de la página de inicio ---------- */
  var lista = $("#lista-materiales");
  if (lista) {
    var entrada = $("#busqueda"), conteo = $("#conteo");

    var pintar = function () {
      var palabras = sinAcentos(entrada.value).split(/\s+/).filter(Boolean);
      var filtrados = DATOS.filter(function (m) {
        var texto = sinAcentos([m.titulo, m.materia, m.tipo, m.autor].join(" "));
        return palabras.every(function (p) { return texto.indexOf(p) !== -1; });
      });
      var n = filtrados.length;
      conteo.textContent = (n === 1 ? "1 material encontrado" : n + " materiales encontrados") +
        (n && !reales(filtrados).length ? " (por ahora solo hay ejemplos)" : "");
      lista.innerHTML = n ? filtrados.map(function (m) { return renglon(m, palabras); }).join("") :
        '<li class="vacio"><h3>Todavía no hay material con esa palabra.</h3>' +
        '<p>Prueba con otra palabra. Si tienes apuntes de esta materia, <a href="subir.html">compártelos</a> y ayudas a quien viene detrás.</p></li>';
    };
    entrada.addEventListener("input", pintar);
    entrada.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); $("#resultados").scrollIntoView({ behavior: "smooth" }); }
    });
    // El buscador de la portada escribe en el buscador de resultados.
    var entradaPortada = $("#busqueda-portada");
    if (entradaPortada) entradaPortada.addEventListener("input", function () {
      entrada.value = entradaPortada.value; pintar();
    });
    var formBusqueda = $("#form-busqueda");
    if (formBusqueda) formBusqueda.addEventListener("submit", function (e) {
      e.preventDefault(); $("#resultados").scrollIntoView({ behavior: "smooth" });
    });
    // Si llega una búsqueda desde la portada (apuntes.html?q=...), se aplica.
    var q = new URLSearchParams(location.search).get("q");
    if (q) { entrada.value = q; setTimeout(function () { $("#resultados").scrollIntoView(); }, 50); }
    pintar();
  }

  /* ---------- Página de una materia ---------- */
  var cabecera = $("#cabecera-materia");
  if (cabecera) {
    var mostrarMateria = function () {
      var clave = decodeURIComponent((location.hash || "").replace("#", ""));
      var m = MATS.filter(function (x) { return x.clave === clave; })[0] || MATS[0];
      if (!m) return;
      document.title = m.nombre + " · SYNOLOGA";
      $("#materia-nombre").textContent = m.nombre;
      $("#materia-migas").textContent = m.nombre;
      $("#materia-semestre").textContent = m.asesoria ? "Apuntes revisados · Asesoría disponible" : "Apuntes revisados";
      $("#materia-temas").innerHTML = m.temas.split(",").map(function (t) { t = t.trim(); return "<li>" + escapar(t.charAt(0).toUpperCase() + t.slice(1)) + "</li>"; }).join("");
      $("#materia-portada").innerHTML = portada(m.portada, m.tono, m.nombre);
      $("#boton-asesoria").hidden = !m.asesoria;
      $("#boton-asesoria").href = "asesorias.html#" + m.clave;
      var lineaHorario = $("#materia-horarios");
      if (lineaHorario) {
        lineaHorario.hidden = !m.horarios;
        lineaHorario.textContent = m.horarios ? "Asesoría en línea: " + resumenHorarios(m) : "";
      }

      var propios = materialesDe(m.nombre);
      $("#materia-conteo").textContent = reales(propios).length
        ? reales(propios).length + (reales(propios).length === 1 ? " material revisado" : " materiales revisados") : "Todavía no hay material revisado de esta materia.";
      $("#materia-lista").innerHTML = propios.length ? propios.map(function (x) { return renglon(x, []); }).join("") :
        '<li class="vacio"><h3>Sé la primera persona en compartir material de ' + escapar(m.nombre) + ".</h3>" +
        '<p>Tus apuntes pueden ahorrarle horas a quien cursa la materia después de ti. <a href="subir.html">Compartir material</a></p></li>';

      var pos = MATS.indexOf(m), otras = [];
      for (var k = 1; k <= 4 && k < MATS.length; k++) otras.push(MATS[(pos + k) % MATS.length]);
      $("#materia-otras").innerHTML = otras.map(tarjeta).join("");
      $("#titulo-otras").hidden = !otras.length;
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", mostrarMateria);
    mostrarMateria();
  }

  /* ---------- Materias del piloto de asesorías ---------- */
  var rejillaAsesoria = $("#asesoria-materias");
  if (rejillaAsesoria) rejillaAsesoria.innerHTML = MATS.filter(function (m) { return m.asesoria; }).map(tarjeta).join("");

  var rejillaHorarios = $("#horarios-asesoria");
  if (rejillaHorarios) {
    rejillaHorarios.innerHTML = MATS.filter(function (m) { return m.asesoria && m.horarios; }).map(function (m) {
      var botones = m.horarios.map(function (h) {
        return '<a class="turno" target="_blank" rel="noopener" data-agendar href="' + escapar(enlaceHorario(m.nombre, h[0], h[1])) + '">' +
          "<span>" + DIAS[h[0]] + "</span><b>" + hora12(h[1]) + " a " + hora12(h[1] + 1) + " p. m.</b><em>Agendar →</em></a>";
      }).join("");
      return '<article class="tarjeta-horario" id="' + m.clave + '">' +
        '<div class="mini-portada">' + portada(m.portada, m.tono, m.nombre) + "</div>" +
        '<div class="cuerpo"><h3><a href="materia.html#' + m.clave + '">' + escapar(m.nombre) + "</a></h3>" +
        '<p class="meta">Google Meet · 1 hora</p></div>' +
        '<div class="turnos">' + botones + "</div></article>";
    }).join("");
    if (location.hash) { var marcado = document.getElementById(location.hash.slice(1)); if (marcado) { marcado.classList.add("resaltado"); marcado.scrollIntoView(); } }
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-agendar]");
    if (a && a.getAttribute("href") === "#") { e.preventDefault(); mostrarAviso("La agenda todavía no está lista. Pronto la activamos."); }
  });

  /* ---------- Botón «Quiero ser asesor» (correo con asunto listo) ---------- */
  var botonAsesor = $("#boton-ser-asesor");
  if (botonAsesor && listo(config.correoContacto)) {
    botonAsesor.href = "mailto:" + config.correoContacto + "?subject=" + encodeURIComponent("Quiero ser asesor de SYNOLOGA") +
      "&body=" + encodeURIComponent("Hola, me interesa ser asesor.\n\nNombre:\nCarrera:\nMateria(s) que puedo asesorar:\nHorario que me acomoda:\n");
  }

  /* ---------- Botones «Quiero anunciarme» ---------- */
  $$("[data-publicidad]").forEach(function (el) {
    if (listo(config.formularioAnunciantes)) { el.href = config.formularioAnunciantes; el.target = "_blank"; el.rel = "noopener"; return; }
    if (listo(config.correoContacto)) el.href = "mailto:" + config.correoContacto + "?subject=" + encodeURIComponent("Publicidad en SYNOLOGA") +
      "&body=" + encodeURIComponent("Hola, me interesa anunciarme en SYNOLOGA.\n\nNegocio o marca:\nQué quiero anunciar:\nContacto:\n");
  });

  /* ---------- Quiero ser asesor: problema al azar por materia ---------- */
  var cajaMaterias = $("#asesor-materias");
  if (cajaMaterias && typeof PROBLEMAS_ASESOR !== "undefined") {
    var leerVistos = function () { try { return JSON.parse(localStorage.getItem("synologa-problemas-vistos") || "[]"); } catch (e) { return []; } };
    var guardarVistos = function (v) { try { localStorage.setItem("synologa-problemas-vistos", JSON.stringify(v)); } catch (e) {} };
    cajaMaterias.innerHTML = Object.keys(PROBLEMAS_ASESOR).map(function (m) {
      return '<button type="button" data-materia="' + escapar(m) + '">' + escapar(m) + "</button>";
    }).join("");
    cajaMaterias.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-materia]");
      if (!b) return;
      $$("#asesor-materias button").forEach(function (o) { o.classList.toggle("activo", o === b); });
      var materia = b.getAttribute("data-materia"), lista = PROBLEMAS_ASESOR[materia], vistos = leerVistos();
      var nuevos = lista.filter(function (p) { return vistos.indexOf(p.codigo) < 0; });
      if (!nuevos.length) { // ya vio todos: se reinicia esa materia
        vistos = vistos.filter(function (c) { return !lista.some(function (p) { return p.codigo === c; }); });
        nuevos = lista;
      }
      var p = nuevos[Math.floor(Math.random() * nuevos.length)];
      vistos.push(p.codigo); guardarVistos(vistos);
      $("#asesor-codigo").textContent = "· " + p.codigo;
      $("#asesor-texto").textContent = p.texto;
      var base = config.formularioAsesores, enlace = "#";
      if (listo(base)) enlace = base + "?usp=pp_url&" + config.entradaAsesorMateria + "=" + encodeURIComponent(materia) +
        "&" + config.entradaAsesorCodigo + "=" + encodeURIComponent(p.codigo);
      $("#asesor-enviar").href = enlace;
      $("#asesor-problema").hidden = false;
    });
  }

  /* ---------- Reto SYNOLOGA: preguntas rápidas por 60 segundos ---------- */
  var juego = $("#juego");
  if (juego) {
    var J = { puntos: 0, racha: 0, tiempo: 60, reloj: null, correcta: null, bloqueado: false };
    var azar = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
    var sup = function (n) { return String(n).split("").map(function (c) { return "⁰¹²³⁴⁵⁶⁷⁸⁹"[+c]; }).join(""); };
    var GENERADORES = [
      function () { // derivada de a·xⁿ evaluada
        var a = azar(1, 5), n = azar(2, 4), k = azar(1, 3);
        return { tema: "Cálculo · derivadas", texto: "Si f(x) = " + (a > 1 ? a : "") + "x" + sup(n) + ", ¿cuánto vale f′(" + k + ")?", r: a * n * Math.pow(k, n - 1) };
      },
      function () { // integral de 2x de 0 a k
        var k = azar(2, 9);
        return { tema: "Cálculo Integral", texto: "∫₀" + "⁰¹²³⁴⁵⁶⁷⁸⁹"[k] + " 2x dx = ?", r: k * k };
      },
      function () { // determinante 2x2
        var a = azar(1, 6), b = azar(0, 5), c = azar(0, 5), d = azar(1, 6);
        return { tema: "Álgebra Lineal", html: "det <span class=\"matriz\"><span>" + a + "</span><span>" + b + "</span><span>" + c + "</span><span>" + d + "</span></span> = ?", r: a * d - b * c };
      },
      function () { // límite de (x²−k²)/(x−k)
        var k = azar(2, 9);
        return { tema: "Cálculo · límites", texto: "lím x→" + k + " de (x² − " + k * k + ") / (x − " + k + ") = ?", r: 2 * k };
      },
      function () { // ley de Ohm
        var i = azar(2, 9), r = azar(2, 12);
        return { tema: "Electricidad · Ley de Ohm", texto: "Por una resistencia de " + r + " Ω pasan " + i + " A. ¿Cuántos volts hay?", r: i * r };
      },
      function () { // sistema 2x2 sencillo
        var x = azar(1, 9), y = azar(1, 9);
        return { tema: "Álgebra", texto: "Si x + y = " + (x + y) + " y x − y = " + (x - y) + ", ¿cuánto vale x?", r: x };
      },
      function () { // producto punto
        var a = [azar(0, 4), azar(0, 4), azar(0, 4)], b = [azar(0, 4), azar(0, 4), azar(0, 4)];
        return { tema: "Cálculo Vectorial", texto: "(" + a.join(", ") + ") · (" + b.join(", ") + ") = ?", r: a[0] * b[0] + a[1] * b[1] + a[2] * b[2] };
      },
      function () { // EDO y' = ky, valor de k
        var k = azar(2, 7);
        return { tema: "Ecuaciones Diferenciales", texto: "y = e^(" + k + "x) cumple y′ = k·y. ¿Cuánto vale k?", r: k };
      }
    ];
    var leerRecord = function () { try { return +localStorage.getItem("synologa-reto") || 0; } catch (e) { return 0; } };
    var guardarRecord = function (n) { try { localStorage.setItem("synologa-reto", n); } catch (e) {} };
    $("#juego-record").textContent = leerRecord();

    var mostrar = function (id) {
      ["#juego-tablero", "#juego-final"].forEach(function (s) { $(s).hidden = s !== id; });
      $(".juego-intro").hidden = id !== null;
    };
    var nueva = function () {
      var g = GENERADORES[azar(0, GENERADORES.length - 1)]();
      var ops = [g.r];
      while (ops.length < 4) {
        var cerca = g.r + (azar(0, 1) ? 1 : -1) * azar(1, Math.max(3, Math.round(Math.abs(g.r) * 0.3)));
        if (ops.indexOf(cerca) < 0) ops.push(cerca);
      }
      ops.sort(function () { return Math.random() - 0.5; });
      J.correcta = g.r; J.bloqueado = false;
      $("#juego-tema").textContent = g.tema;
      if (g.html) $("#juego-pregunta").innerHTML = g.html; else $("#juego-pregunta").textContent = g.texto;
      $("#juego-opciones").innerHTML = ops.map(function (o) { return '<button type="button" class="juego-opcion" data-valor="' + o + '">' + o + "</button>"; }).join("");
    };
    var actualizar = function () {
      $("#juego-tiempo").textContent = J.tiempo;
      $("#juego-puntos").textContent = J.puntos;
      $("#juego-racha").textContent = J.racha;
      $("#juego-progreso").style.width = (J.tiempo / 60 * 100) + "%";
    };
    var terminar = function () {
      clearInterval(J.reloj);
      var record = leerRecord(), nuevo = J.puntos > record;
      if (nuevo) guardarRecord(J.puntos);
      $("#juego-record").textContent = Math.max(record, J.puntos);
      $("#juego-final-puntos").textContent = J.puntos;
      $("#juego-final-texto").textContent = nuevo && J.puntos > 0 ? "¡Nuevo récord! Compártelo con tus amigos y rétalos." :
        J.puntos >= 8 ? "¡Muy bien! Estás listo para el examen." :
        J.puntos >= 4 ? "Nada mal. Un repaso con apuntes y lo subes." : "Calentamiento. Dale otra vez, que a la segunda sale.";
      mostrar("#juego-final");
    };
    var iniciar = function () {
      J.puntos = 0; J.racha = 0; J.tiempo = 60;
      mostrar("#juego-tablero"); nueva(); actualizar();
      clearInterval(J.reloj);
      J.reloj = setInterval(function () { J.tiempo--; actualizar(); if (J.tiempo <= 0) terminar(); }, 1000);
    };
    $("#juego-iniciar").addEventListener("click", iniciar);
    $("#juego-otra").addEventListener("click", iniciar);
    $("#juego-opciones").addEventListener("click", function (e) {
      var b = e.target.closest(".juego-opcion");
      if (!b || J.bloqueado) return;
      J.bloqueado = true;
      var bien = +b.getAttribute("data-valor") === J.correcta;
      if (bien) { J.racha++; J.puntos += J.racha >= 3 ? 2 : 1; b.classList.add("bien"); }
      else {
        J.racha = 0; b.classList.add("mal");
        $$(".juego-opcion").forEach(function (o) { if (+o.getAttribute("data-valor") === J.correcta) o.classList.add("bien"); });
      }
      actualizar();
      setTimeout(function () { if (J.tiempo > 0) nueva(); }, bien ? 350 : 900);
    });
  }

  /* ---------- Números de la franja de inicio ---------- */
  $$("[data-dato]").forEach(function (el) {
    var k = el.getAttribute("data-dato");
    if (k === "materias") el.textContent = MATS.length;
    if (k === "asesorias") el.textContent = MATS.filter(function (m) { return m.asesoria; }).length;
  });

  /* ---------- Chips de materias de asesoría ---------- */
  $$("[data-chips-asesoria]").forEach(function (el) {
    el.innerHTML = MATS.filter(function (m) { return m.asesoria; }).map(function (m) {
      return '<a href="asesorias.html#' + m.clave + '"><b>' + escapar(m.nombre) + "</b>" +
        (m.horarios ? "<small>" + escapar(resumenHorarios(m)) + "</small>" : "") + "</a>";
    }).join("");
  });
  } // fin de iniciar
})();
