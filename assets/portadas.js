/*
  PORTADAS DE MATERIAS
  --------------------
  Cada portada es una ilustración SVG hecha con código, con un objeto que
  representa la materia (matraz, balanza, imán, puente...) y los colores del
  logo: azul tinta, cian y dorado. No dependen de imágenes externas, así que
  cargan rápido y se ven nítidas en cualquier pantalla.

  Uso: portadaSVG("quimica", 2, "Química")
*/
(function () {
  "use strict";

  var TONOS = [
    { a: "#0c2244", b: "#1a4372" },
    { a: "#0f4a73", b: "#2088b0" },
    { a: "#0b2a52", b: "#25527f" },
    { a: "#162d50", b: "#3a6a96" },
  ];

  // Colores de las ilustraciones (del logo)
  var N = "#0c2244", N2 = "#143462", C = "#6cc0e8", C2 = "#2088b0", G = "#e2bc55", G2 = "#c99a2e",
      W = "#f5fafe", L = "#cfe6f5", R = "#e8735f";

  function f(n) { return Math.round(n * 10) / 10; }
  function pts(lista) { return lista.map(function (p) { return f(p[0]) + "," + f(p[1]); }).join(" "); }
  function ruta(lista) { return lista.map(function (p, i) { return (i ? "L" : "M") + f(p[0]) + " " + f(p[1]); }).join(" "); }
  function sombra(cx, cy, rx) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + f(rx * 0.12) + '" fill="#000" opacity=".22"/>'; }
  function flecha(x1, y1, x2, y2, color, g) {
    var a = Math.atan2(y2 - y1, x2 - x1), t = 5 + g * 1.6;
    return '<line x1="' + f(x1) + '" y1="' + f(y1) + '" x2="' + f(x2 - Math.cos(a) * t * 0.6) + '" y2="' + f(y2 - Math.sin(a) * t * 0.6) +
      '" stroke="' + color + '" stroke-width="' + g + '" stroke-linecap="round"/>' +
      '<polygon points="' + pts([[x2, y2], [x2 - t * Math.cos(a - 0.5), y2 - t * Math.sin(a - 0.5)], [x2 - t * Math.cos(a + 0.5), y2 - t * Math.sin(a + 0.5)]]) +
      '" fill="' + color + '"/>';
  }
  function lapiz(x, y, ang, largo) {
    return '<g transform="translate(' + x + " " + y + ") rotate(" + ang + ')">' +
      '<rect x="0" y="-6" width="' + largo + '" height="12" rx="2" fill="' + G + '"/>' +
      '<rect x="0" y="-6" width="' + largo + '" height="4" fill="#f2cd5c"/>' +
      '<rect x="-10" y="-6" width="12" height="12" rx="3" fill="' + R + '"/>' +
      '<rect x="-2" y="-6" width="5" height="12" fill="' + L + '"/>' +
      '<polygon points="' + largo + ",-6 " + (largo + 16) + ",0 " + largo + ',6" fill="#f3d9a8"/>' +
      '<polygon points="' + (largo + 10) + ",-2.2 " + (largo + 16) + ",0 " + (largo + 10) + ',2.2" fill="' + N + '"/></g>';
  }
  // Cubo en perspectiva isométrica con puntos de dado
  function dado(cx, cy, s, arriba, izq, der) {
    var k = 0.866 * s;
    var A = [cx, cy - s], B = [cx + k, cy - s / 2], O = [cx, cy], D = [cx - k, cy - s / 2];
    var E = [cx - k, cy + s / 2], F = [cx, cy + s], H = [cx + k, cy + s / 2];
    function cara(p0, pu, pv, n, fill) {
      var m = { 1: [[.5, .5]], 2: [[.25, .25], [.75, .75]], 3: [[.22, .22], [.5, .5], [.78, .78]],
        4: [[.27, .27], [.73, .27], [.27, .73], [.73, .73]], 5: [[.25, .25], [.75, .25], [.5, .5], [.25, .75], [.75, .75]],
        6: [[.27, .22], [.73, .22], [.27, .5], [.73, .5], [.27, .78], [.73, .78]] }[n];
      return m.map(function (q) {
        var x = p0[0] + q[0] * (pu[0] - p0[0]) + q[1] * (pv[0] - p0[0]);
        var y = p0[1] + q[0] * (pu[1] - p0[1]) + q[1] * (pv[1] - p0[1]);
        return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(s * 0.085) + '" fill="' + fill + '"/>';
      }).join("");
    }
    return '<polygon points="' + pts([A, B, O, D]) + '" fill="' + W + '"/>' +
      '<polygon points="' + pts([D, O, F, E]) + '" fill="' + L + '"/>' +
      '<polygon points="' + pts([O, B, H, F]) + '" fill="#a9cfe8"/>' +
      '<polygon points="' + pts([A, B, H, F, E, D]) + '" fill="none" stroke="' + N + '" stroke-opacity=".25" stroke-width="1.2" stroke-linejoin="round"/>' +
      cara(D, A, O, arriba, N) + cara(D, O, E, izq, N) + cara(O, B, F, der, N);
  }

  var DIBUJOS = {
    /* Cálculo y Geometría Analítica: hoja cuadriculada con cónicas, compás y lápiz */
    calculo: function () {
      var rejilla = "";
      for (var i = 0; i <= 15; i++) rejilla += '<line x1="' + (78 + i * 12) + '" y1="34" x2="' + (78 + i * 12) + '" y2="146"/>';
      for (var j = 0; j <= 9; j++) rejilla += '<line x1="78" y1="' + (34 + j * 12.4) + '" x2="258" y2="' + (34 + j * 12.4) + '"/>';
      return sombra(170, 160, 110) +
        '<g transform="rotate(-6 168 90)"><rect x="72" y="28" width="192" height="124" rx="6" fill="' + W + '"/>' +
        '<g stroke="' + C + '" stroke-opacity=".35" stroke-width="1">' + rejilla + "</g>" +
        '<g stroke="' + N + '" stroke-width="1.8" opacity=".75"><line x1="84" y1="118" x2="252" y2="118"/><line x1="114" y1="142" x2="114" y2="38"/></g>' +
        '<path d="M126 44 Q156 186 186 44" fill="none" stroke="' + G2 + '" stroke-width="3.2" stroke-linecap="round"/>' +
        '<ellipse cx="206" cy="80" rx="38" ry="22" fill="none" stroke="' + C2 + '" stroke-width="3.2"/>' +
        '<circle cx="190" cy="80" r="3" fill="' + N + '"/><circle cx="222" cy="80" r="3" fill="' + N + '"/></g>' +
        // compás
        '<g><line x1="262" y1="34" x2="238" y2="120" stroke="' + L + '" stroke-width="6" stroke-linecap="round"/>' +
        '<line x1="262" y1="34" x2="282" y2="118" stroke="' + L + '" stroke-width="6" stroke-linecap="round"/>' +
        '<line x1="238" y1="120" x2="236" y2="130" stroke="' + N + '" stroke-width="2.5" stroke-linecap="round"/>' +
        '<polygon points="279,112 286,112 283,126" fill="' + G + '"/>' +
        '<rect x="258" y="14" width="8" height="14" rx="3" fill="' + G + '"/><circle cx="262" cy="34" r="8" fill="' + G2 + '"/><circle cx="262" cy="34" r="3" fill="' + W + '"/></g>' +
        lapiz(30, 148, -28, 64);
    },

    /* Álgebra: balanza equilibrada con una incógnita */
    algebra: function () {
      var cubo = function (x, y, c) { return '<rect x="' + x + '" y="' + y + '" width="16" height="16" rx="3" fill="' + c + '" stroke="' + N + '" stroke-opacity=".25"/>'; };
      return sombra(160, 160, 70) +
        '<path d="M130 160 L190 160 L176 146 L144 146 Z" fill="' + L + '"/>' +
        '<rect x="155" y="44" width="10" height="104" rx="3" fill="' + L + '"/>' +
        '<rect x="70" y="44" width="180" height="7" rx="3.5" fill="' + W + '"/>' +
        '<circle cx="160" cy="47" r="10" fill="' + G + '"/><circle cx="160" cy="47" r="4" fill="' + N + '"/>' +
        '<polygon points="160,26 152,40 168,40" fill="' + G2 + '"/>' +
        '<g stroke="' + L + '" stroke-width="1.8"><line x1="80" y1="50" x2="52" y2="114"/><line x1="80" y1="50" x2="108" y2="114"/>' +
        '<line x1="240" y1="50" x2="212" y2="114"/><line x1="240" y1="50" x2="268" y2="114"/></g>' +
        '<path d="M44 114 Q80 134 116 114 Z" fill="' + C + '"/><path d="M204 114 Q240 134 276 114 Z" fill="' + C + '"/>' +
        // lado izquierdo: x + 2
        '<rect x="54" y="82" width="32" height="32" rx="5" fill="' + G + '" stroke="' + N + '" stroke-opacity=".25"/>' +
        '<text x="70" y="106" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="24" fill="' + N + '">x</text>' +
        cubo(90, 98, W) + cubo(90, 82, W) +
        // lado derecho: 5
        cubo(214, 98, W) + cubo(232, 98, W) + cubo(250, 98, W) + cubo(223, 82, W) + cubo(241, 82, W) +
        '<g fill="' + W + '" font-family="Georgia,serif" font-weight="700" opacity=".9" font-size="15" text-anchor="middle">' +
        '<text x="80" y="152">x + 2</text><text x="240" y="152">5</text></g>';
    },

    /* Química: matraz, tubo de ensayo y molécula */
    quimica: function () {
      var burbujas = [[140, 128, 4], [156, 118, 3], [168, 136, 5], [150, 100, 2.5], [162, 90, 2]].map(function (b) {
        return '<circle cx="' + b[0] + '" cy="' + b[1] + '" r="' + b[2] + '" fill="' + W + '" opacity=".75"/>';
      }).join("");
      return sombra(160, 160, 100) +
        // molécula
        '<g stroke="' + L + '" stroke-width="4"><line x1="58" y1="70" x2="36" y2="46"/><line x1="58" y1="70" x2="34" y2="94"/><line x1="58" y1="70" x2="86" y2="58"/></g>' +
        '<circle cx="58" cy="70" r="15" fill="' + G + '"/><circle cx="53" cy="65" r="4" fill="#fff" opacity=".6"/>' +
        '<circle cx="36" cy="46" r="9" fill="' + C + '"/><circle cx="34" cy="94" r="9" fill="' + C + '"/><circle cx="86" cy="58" r="9" fill="' + C + '"/>' +
        // matraz
        '<path d="M120 112 L180 112 L202 146 Q206 156 194 156 L106 156 Q94 156 98 146 Z" fill="' + C + '"/>' +
        '<path d="M120 112 L180 112" stroke="' + W + '" stroke-width="2" opacity=".7"/>' + burbujas +
        '<path d="M138 36 L138 80 L98 146 Q94 156 106 156 L194 156 Q206 156 202 146 L162 80 L162 36" fill="' + W + '" fill-opacity=".12" stroke="' + W + '" stroke-width="4" stroke-linejoin="round"/>' +
        '<rect x="132" y="28" width="36" height="9" rx="4" fill="' + W + '"/>' +
        '<path d="M110 140 L124 116" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>' +
        // tubo de ensayo
        '<g transform="rotate(14 250 90)"><path d="M236 92 L264 92 L264 140 A14 14 0 0 1 236 140 Z" fill="' + G + '"/>' +
        '<path d="M236 34 L236 140 A14 14 0 0 0 264 140 L264 34" fill="' + W + '" fill-opacity=".12" stroke="' + W + '" stroke-width="4"/>' +
        '<rect x="230" y="28" width="40" height="8" rx="4" fill="' + W + '"/></g>' +
        '<circle cx="258" cy="66" r="3" fill="' + G + '"/><circle cx="246" cy="54" r="2" fill="' + G + '"/>';
    },

    /* Fundamentos de Física: péndulo de Newton */
    fisica: function () {
      var s = "", xs = [150, 176, 202, 228];
      var hilos = function (x, y, top) {
        return '<line x1="' + (top - 9) + '" y1="34" x2="' + f(x) + '" y2="' + f(y) + '" stroke="' + L + '" stroke-width="1.5"/>' +
               '<line x1="' + (top + 9) + '" y1="34" x2="' + f(x) + '" y2="' + f(y) + '" stroke="' + L + '" stroke-width="1.5"/>';
      };
      xs.forEach(function (x) { s += hilos(x, 118, x); });
      var bolas = xs.map(function (x) { return '<circle cx="' + x + '" cy="128" r="13" fill="' + L + '"/><circle cx="' + (x - 4) + '" cy="123" r="4" fill="#fff"/>'; }).join("");
      var ang = 0.7, bx = 124 - 94 * Math.sin(ang), by = 34 + 94 * Math.cos(ang);
      return sombra(160, 162, 120) +
        '<rect x="40" y="150" width="244" height="12" rx="5" fill="' + C2 + '"/>' +
        '<g stroke="' + W + '" stroke-width="6" stroke-linecap="round" fill="none"><path d="M54 150 L54 30 L270 30 L270 150"/></g>' +
        s + bolas + hilos(bx + 9 * Math.cos(ang), by - 9 * Math.sin(ang), 124) +
        '<circle cx="' + f(bx) + '" cy="' + f(by) + '" r="13" fill="' + G + '"/><circle cx="' + f(bx - 4) + '" cy="' + f(by - 5) + '" r="4" fill="#fff" opacity=".8"/>' +
        '<path d="M' + f(bx + 4) + ' ' + f(by + 22) + ' Q104 146 122 144" fill="none" stroke="' + G + '" stroke-width="2.5" stroke-dasharray="3 6" stroke-linecap="round"/>' +
        '<g stroke="' + G + '" stroke-width="2.5" stroke-linecap="round"><line x1="250" y1="116" x2="262" y2="112"/><line x1="250" y1="128" x2="264" y2="128"/><line x1="250" y1="140" x2="262" y2="144"/></g>';
    },

    /* Fundamentos de Programación: laptop con código */
    programacion: function () {
      var lineas = [[0, 40, C], [0, 22, G], [14, 60, W], [14, 36, C], [28, 50, G], [28, 24, W], [14, 30, C], [0, 18, G]];
      var codigo = lineas.map(function (l, i) {
        return '<rect x="' + (104 + l[0]) + '" y="' + (46 + i * 9.5) + '" width="' + l[1] + '" height="4.5" rx="2.2" fill="' + l[2] + '" opacity=".9"/>';
      }).join("");
      return sombra(160, 158, 120) +
        '<rect x="88" y="30" width="144" height="100" rx="9" fill="' + L + '"/>' +
        '<rect x="96" y="38" width="128" height="84" rx="4" fill="#081a36"/>' + codigo +
        '<rect x="172" y="105" width="8" height="10" fill="' + G + '"><animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite"/></rect>' +
        '<path d="M64 134 L256 134 L274 150 Q276 154 270 154 L50 154 Q44 154 46 150 Z" fill="' + W + '"/>' +
        '<rect x="140" y="138" width="40" height="5" rx="2.5" fill="' + L + '"/>' +
        '<circle cx="256" cy="40" r="24" fill="' + G + '"/>' +
        '<text x="256" y="47" text-anchor="middle" font-family="Consolas,monospace" font-weight="700" font-size="17" fill="' + N + '">&lt;/&gt;</text>' +
        '<g fill="none" stroke="' + C + '" stroke-width="3" stroke-linecap="round" opacity=".8"><path d="M54 52 L40 66 L54 80"/><path d="M66 82 L78 50"/></g>';
    },

    /* Álgebra Lineal: matriz y vectores en el espacio */
    lineal: function () {
      var celdas = "", vals = [[1, 0, 2], [0, 3, 1], [4, 0, 1]];
      for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) {
        var diag = r === c;
        celdas += '<rect x="' + (52 + c * 24) + '" y="' + (52 + r * 24) + '" width="20" height="20" rx="4" fill="' + (diag ? G : W) + '" opacity="' + (diag ? 1 : 0.18) + '"/>' +
          '<text x="' + (62 + c * 24) + '" y="' + (67 + r * 24) + '" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="13" fill="' + (diag ? N : W) + '">' + vals[r][c] + "</text>";
      }
      var O = [212, 128];
      return celdas +
        '<g fill="none" stroke="' + W + '" stroke-width="4" stroke-linecap="round"><path d="M50 46 L42 46 L42 128 L50 128"/><path d="M122 46 L130 46 L130 128 L122 128"/></g>' +
        '<polygon points="' + pts([O, [264, 100], [296, 44], [244, 72]]) + '" fill="' + G + '" opacity=".22"/>' +
        '<g stroke="' + L + '" stroke-width="1.6" opacity=".6"><line x1="212" y1="128" x2="296" y2="160"/><line x1="212" y1="128" x2="212" y2="30"/><line x1="212" y1="128" x2="150" y2="162"/></g>' +
        '<g stroke="' + G + '" stroke-width="1.5" stroke-dasharray="4 4" opacity=".7"><line x1="264" y1="100" x2="296" y2="44"/><line x1="244" y1="72" x2="296" y2="44"/></g>' +
        flecha(O[0], O[1], 264, 100, C, 4) + flecha(O[0], O[1], 244, 72, W, 4) + flecha(O[0], O[1], 296, 44, G, 4.5) +
        '<circle cx="212" cy="128" r="5" fill="' + W + '"/>' +
''
    },

    /* Cálculo Integral: área bajo la curva con rectángulos y el signo de integral */
    integral: function () {
      var fn = function (x) { return 120 - 52 * Math.exp(-Math.pow((x - 190) / 60, 2)) - (x - 100) * 0.12; };
      var rects = "";
      for (var x = 110; x < 270; x += 20) {
        var y = fn(x + 10);
        rects += '<rect x="' + x + '" y="' + f(y) + '" width="20" height="' + f(140 - y) + '" fill="' + C + '" fill-opacity=".28" stroke="' + C + '" stroke-width="1.2"/>';
      }
      var curva = [];
      for (var i = 0; i <= 60; i++) { var xx = 96 + i * 3.2; curva.push([xx, fn(xx)]); }
      var area = ruta([[110, 140]].concat(curva.filter(function (p) { return p[0] >= 110 && p[0] <= 270; })).concat([[270, 140]])) + " Z";
      return '<path d="' + area + '" fill="' + G + '" fill-opacity=".22"/>' + rects +
        '<path d="' + ruta(curva) + '" fill="none" stroke="' + G + '" stroke-width="3.5" stroke-linecap="round"/>' +
        '<g stroke="' + W + '" stroke-width="2" opacity=".7"><line x1="88" y1="140" x2="300" y2="140"/></g>' +
        '<g stroke="' + W + '" stroke-width="2" stroke-dasharray="3 4" opacity=".7"><line x1="110" y1="140" x2="110" y2="96"/><line x1="270" y1="140" x2="270" y2="88"/></g>' +
        '<text x="110" y="158" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="14" fill="' + W + '">a</text>' +
        '<text x="270" y="158" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="14" fill="' + W + '">b</text>' +
        // signo de integral
        '<path d="M66 30 C54 26 50 40 48 60 L42 124 C40 144 34 152 22 146" fill="none" stroke="' + W + '" stroke-width="7" stroke-linecap="round"/>' +
        '<circle cx="68" cy="34" r="5" fill="' + W + '"/><circle cx="20" cy="142" r="5" fill="' + W + '"/>';
    },

    /* Estática: puente de armadura con cargas y reacciones */
    estatica: function () {
      var abajo = [[60, 118], [110, 118], [160, 118], [210, 118], [260, 118]];
      var arriba = [[85, 72], [135, 72], [185, 72], [235, 72]];
      var barras = "";
      for (var i = 0; i < 4; i++) {
        barras += '<line x1="' + abajo[i][0] + '" y1="118" x2="' + arriba[i][0] + '" y2="72"/>' +
                  '<line x1="' + arriba[i][0] + '" y1="72" x2="' + abajo[i + 1][0] + '" y2="118"/>';
      }
      var nodos = abajo.concat(arriba).map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="' + G + '" stroke="' + N + '" stroke-width="1.5"/>'; }).join("");
      var rayas = "";
      for (var x = 40; x <= 280; x += 12) rayas += '<line x1="' + x + '" y1="152" x2="' + (x - 8) + '" y2="160"/>';
      return '<line x1="30" y1="152" x2="290" y2="152" stroke="' + L + '" stroke-width="3"/>' +
        '<g stroke="' + L + '" stroke-width="1.5" opacity=".5">' + rayas + "</g>" +
        '<polygon points="60,122 46,152 74,152" fill="' + C + '"/><polygon points="260,122 246,146 274,146" fill="' + C + '"/>' +
        '<circle cx="252" cy="149" r="3" fill="' + C + '"/><circle cx="268" cy="149" r="3" fill="' + C + '"/>' +
        '<g stroke="' + W + '" stroke-width="5" stroke-linecap="round"><line x1="60" y1="118" x2="260" y2="118"/><line x1="85" y1="72" x2="235" y2="72"/>' + barras + "</g>" +
        nodos +
        flecha(160, 18, 160, 64, G, 4) + flecha(110, 30, 110, 64, G, 3) + flecha(210, 30, 210, 64, G, 3) +
        flecha(60, 176, 60, 158, C, 3.5) + flecha(260, 176, 260, 158, C, 3.5);
    },

    /* Cálculo Vectorial: superficie en 3D (silla de montar) con gradientes */
    vectorial: function () {
      var P = function (x, y) {
        var z = x * x - y * y;
        return [168 + (x - y) * 70, 94 + (x + y) * 30 - z * 30];
      };
      var s = "", n = 8;
      for (var i = 0; i <= n; i++) {
        var u = -1 + 2 * i / n, a = [], b = [];
        for (var j = 0; j <= 24; j++) { var v = -1 + 2 * j / 24; a.push(P(u, v)); b.push(P(v, u)); }
        s += '<path d="' + ruta(a) + '" stroke="' + C + '"/><path d="' + ruta(b) + '" stroke="' + L + '"/>';
      }
      var flechas = [[-0.6, 0.1], [0.5, -0.2], [0.1, 0.6], [-0.2, -0.6]].map(function (q) {
        var p = P(q[0], q[1]), g = [2 * q[0], -2 * q[1]], p2 = P(q[0] + g[0] * 0.18, q[1] + g[1] * 0.18);
        return flecha(p[0], p[1], p2[0], p2[1], G, 3) + '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="3.5" fill="' + G + '"/>';
      }).join("");
      return '<g fill="none" stroke-width="1.6" stroke-opacity=".85">' + s + "</g>" + flechas +
        '<g stroke="' + W + '" stroke-width="1.6" opacity=".5"><line x1="30" y1="160" x2="70" y2="140"/><line x1="30" y1="160" x2="30" y2="118"/><line x1="30" y1="160" x2="70" y2="178"/></g>';
    },

    /* Ecuaciones Diferenciales: sistema masa-resorte y oscilación amortiguada */
    edo: function () {
      var resorte = "M80 26 L80 34";
      for (var i = 0; i < 8; i++) resorte += " L" + (i % 2 ? 66 : 94) + " " + (40 + i * 7) + "";
      resorte += " L80 96 L80 102";
      var onda = [], env1 = [], env2 = [];
      for (var x = 130; x <= 300; x += 2) {
        var t = (x - 130) / 170, e = Math.exp(-2.6 * t);
        onda.push([x, 116 - 34 * e * Math.cos(t * 6 * Math.PI)]); env1.push([x, 116 - 34 * e]); env2.push([x, 116 + 34 * e]);
      }
      var rayas = "";
      for (var k = 50; k <= 110; k += 10) rayas += '<line x1="' + k + '" y1="20" x2="' + (k + 8) + '" y2="12"/>';
      return '<rect x="44" y="20" width="72" height="5" fill="' + L + '"/><g stroke="' + L + '" stroke-width="1.5">' + rayas + "</g>" +
        '<path d="' + resorte + '" fill="none" stroke="' + W + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>' +
        '<rect x="58" y="102" width="44" height="30" rx="5" fill="' + G + '"/>' +
        '<text x="80" y="123" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="16" fill="' + N + '">m</text>' +
        '<line x1="110" y1="116" x2="128" y2="116" stroke="' + G + '" stroke-width="2" stroke-dasharray="3 4"/>' +
        '<line x1="130" y1="116" x2="300" y2="116" stroke="' + W + '" stroke-width="1.5" opacity=".4"/>' +
        '<g fill="none" stroke="' + C + '" stroke-width="1.6" stroke-dasharray="4 5" opacity=".7"><path d="' + ruta(env1) + '"/><path d="' + ruta(env2) + '"/></g>' +
        '<path d="' + ruta(onda) + '" fill="none" stroke="' + G + '" stroke-width="3.2" stroke-linecap="round"/>' +
        '<text x="168" y="46" font-family="Georgia,serif" font-style="italic" font-size="17" fill="' + W + '" opacity=".9">y″ + y′ + y = 0</text>';
    },

    /* Cinemática y Dinámica: tiro parabólico con su velocidad */
    dinamica: function () {
      var tray = [];
      for (var x = 54; x <= 270; x += 6) { var u = (x - 162) / 108; tray.push([x, 40 + 100 * u * u]); }
      var bx = 106, by = 40 + 100 * Math.pow((bx - 162) / 108, 2), m = 200 * (bx - 162) / (108 * 108);
      var rayas = "";
      for (var k = 30; k <= 290; k += 12) rayas += '<line x1="' + k + '" y1="146" x2="' + (k - 8) + '" y2="154"/>';
      return '<line x1="24" y1="146" x2="296" y2="146" stroke="' + L + '" stroke-width="3"/><g stroke="' + L + '" stroke-width="1.5" opacity=".5">' + rayas + "</g>" +
        // cañón
        '<g transform="translate(48 136) rotate(-55)"><rect x="-4" y="-9" width="34" height="18" rx="6" fill="' + L + '"/><rect x="26" y="-10" width="6" height="20" rx="2" fill="' + W + '"/></g>' +
        '<circle cx="46" cy="138" r="10" fill="' + C2 + '"/><circle cx="46" cy="138" r="4" fill="' + L + '"/>' +
        '<path d="' + ruta(tray) + '" fill="none" stroke="' + W + '" stroke-width="2.5" stroke-dasharray="2 8" stroke-linecap="round"/>' +
        // componentes de la velocidad
        '<g stroke="' + C + '" stroke-width="2" stroke-dasharray="4 4"><line x1="' + bx + '" y1="' + f(by) + '" x2="' + (bx + 46) + '" y2="' + f(by) + '"/><line x1="' + bx + '" y1="' + f(by) + '" x2="' + bx + '" y2="' + f(by + m * 46) + '"/></g>' +
        flecha(bx, by, bx + 46, by + m * 46, G, 3.5) +
        '<circle cx="' + bx + '" cy="' + f(by) + '" r="9" fill="' + G + '"/><circle cx="' + (bx - 3) + '" cy="' + f(by - 3) + '" r="3" fill="#fff" opacity=".8"/>' +
        // bandera de llegada
        '<line x1="272" y1="146" x2="272" y2="104" stroke="' + W + '" stroke-width="3"/><polygon points="272,104 296,112 272,120" fill="' + R + '"/>' +
        '<text x="196" y="40" font-family="Georgia,serif" font-style="italic" font-size="17" fill="' + W + '" opacity=".9">F = ma</text>';
    },

    /* Probabilidad: dados, moneda y campana de Gauss */
    probabilidad: function () {
      var barras = "", alturas = [8, 20, 40, 64, 84, 92, 84, 64, 40, 20, 8];
      alturas.forEach(function (h, i) {
        barras += '<rect x="' + (78 + i * 16) + '" y="' + (128 - h) + '" width="13" height="' + h + '" rx="2" fill="' + C + '" opacity=".35"/>';
      });
      var campana = [];
      for (var x = 66; x <= 262; x += 3) campana.push([x, 128 - 96 * Math.exp(-Math.pow((x - 164) / 38, 2))]);
      return barras + '<path d="' + ruta(campana) + '" fill="none" stroke="' + C + '" stroke-width="2.5"/>' +
        '<line x1="56" y1="128" x2="276" y2="128" stroke="' + W + '" stroke-width="1.5" opacity=".5"/>' +
        sombra(150, 164, 80) +
        dado(118, 118, 30, 5, 2, 3) + dado(190, 124, 26, 6, 1, 4) +
        '<ellipse cx="258" cy="150" rx="22" ry="9" fill="' + G2 + '"/><ellipse cx="258" cy="146" rx="22" ry="9" fill="' + G + '"/>' +
        '<ellipse cx="258" cy="146" rx="14" ry="5.5" fill="none" stroke="' + G2 + '" stroke-width="2"/>';
    },

    /* Electricidad y Magnetismo: imán, líneas de campo, foco y rayo */
    electricidad: function () {
      var campo = [26, 44, 62].map(function (h) {
        return '<path d="M108 56 C108 ' + (52 - h) + " 212 " + (52 - h) + ' 212 56" />';
      }).join("");
      return sombra(160, 162, 70) +
        '<g fill="none" stroke="' + L + '" stroke-width="2" stroke-dasharray="5 6" opacity=".75">' + campo + "</g>" +
        '<path d="M108 52 L108 104 A52 52 0 0 0 212 104 L212 52" fill="none" stroke="' + W + '" stroke-width="30"/>' +
        '<rect x="93" y="44" width="30" height="24" fill="' + R + '"/><rect x="197" y="44" width="30" height="24" fill="' + C2 + '"/>' +
        '<g font-family="Montserrat,Arial,sans-serif" font-weight="800" font-size="15" fill="#fff" text-anchor="middle"><text x="108" y="62">N</text><text x="212" y="62">S</text></g>' +
        // foco
        '<circle cx="272" cy="70" r="30" fill="' + G + '" opacity=".18"/>' +
        '<path d="M272 46 C256 46 250 58 250 68 C250 80 262 84 262 94 L282 94 C282 84 294 80 294 68 C294 58 288 46 272 46 Z" fill="' + G + '"/>' +
        '<path d="M266 92 L266 80 L272 74 L278 80 L278 92" fill="none" stroke="' + G2 + '" stroke-width="2"/>' +
        '<rect x="261" y="96" width="22" height="6" rx="2" fill="' + L + '"/><rect x="263" y="104" width="18" height="6" rx="2" fill="' + L + '"/>' +
        // rayo
        '<polygon points="52,36 30,86 48,86 38,128 70,72 52,72 64,36" fill="' + G + '"/>';
    },

    /* Termodinámica: cilindro con pistón, flama y termómetro */
    termo: function () {
      var gas = [[132, 120], [150, 108], [168, 126], [186, 112], [142, 136], [176, 140], [160, 96], [190, 132], [128, 100]].map(function (p) {
        return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.5" fill="' + C + '"/>';
      }).join("");
      var marcas = "";
      for (var y = 44; y <= 112; y += 12) marcas += '<line x1="262" y1="' + y + '" x2="270" y2="' + y + '"/>';
      return '<g transform="translate(0 -12)">' + sombra(170, 168, 110) +
        '<path d="M110 152 Q160 150 210 152" fill="none" stroke="' + R + '" stroke-width="3" opacity=".5"/>' +
        '<rect x="116" y="80" width="88" height="70" fill="' + R + '" opacity=".14"/>' + gas +
        '<path d="M116 30 L116 150 L204 150 L204 30" fill="none" stroke="' + W + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<rect x="120" y="70" width="80" height="12" rx="2" fill="' + L + '"/><rect x="155" y="20" width="10" height="52" fill="' + L + '"/>' +
        '<rect x="143" y="14" width="34" height="8" rx="3" fill="' + W + '"/>' +
        // flama
        '<path d="M160 176 C140 176 138 160 146 150 C150 158 156 156 154 146 C164 152 176 160 172 168 C170 174 166 176 160 176 Z" fill="' + G + '"/>' +
        '<path d="M160 176 C152 176 150 168 156 162 C158 166 162 166 162 160 C168 166 168 176 160 176 Z" fill="' + R + '"/>' +
        // calor
        '<g fill="none" stroke="' + G + '" stroke-width="2.4" stroke-linecap="round" opacity=".8"><path d="M86 140 q-6 -10 0 -20 q6 -10 0 -20"/><path d="M70 136 q-6 -10 0 -20 q6 -10 0 -20"/></g>' +
        // termómetro
        '<rect x="246" y="34" width="16" height="96" rx="8" fill="' + W + '"/><rect x="251" y="70" width="6" height="62" rx="3" fill="' + R + '"/>' +
        '<circle cx="254" cy="138" r="13" fill="' + R + '"/><circle cx="250" cy="134" r="3.5" fill="#fff" opacity=".6"/>' +
        '<g stroke="' + L + '" stroke-width="2">' + marcas + "</g></g>";
    },
  };

  window.portadaSVG = function (tipo, tono, titulo) {
    var t = TONOS[(tono || 0) % TONOS.length];
    var dibujo = (DIBUJOS[tipo] || DIBUJOS.calculo)(t);
    var id = "g" + Math.random().toString(36).slice(2, 8);
    var puntos = "";
    for (var x = 10; x <= 320; x += 20) for (var y = 10; y <= 180; y += 20) puntos += '<circle cx="' + x + '" cy="' + y + '" r=".9"/>';
    return '<svg viewBox="0 0 320 180" role="img" aria-label="Portada de ' + (titulo || "materia") +
      '" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><radialGradient id="' + id + '" cx=".5" cy=".42" r=".75"><stop offset="0" stop-color="' + t.b +
      '"/><stop offset="1" stop-color="' + t.a + '"/></radialGradient></defs>' +
      '<rect width="320" height="180" fill="url(#' + id + ')"/>' +
      '<g fill="#ffffff" opacity=".08">' + puntos + "</g>" + dibujo + "</svg>";
  };
})();
