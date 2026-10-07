MBS_DEMO_MODOS_POC_03_7_CORRECCIONES_PORTADA_INICIAL
Fecha: 2026-10-04

BASE
POC 03.6 – Nivel de tono y entrada.

CORRECCIONES

1. LOCUCIÓN AL ENTRAR AL MODO INICIAL
Problema:
Se escuchaba únicamente el idioma seleccionado.

Causa:
setLang() conservaba un anuncio automático diferido del idioma.
Ese anuncio se ejecutaba unos milisegundos después y cancelaba:
“Modo Inicial. Seleccione un punto.”

Solución:
Al ingresar desde la portada se aplica el idioma sin repetir su nombre.
El Modo Inicial conserva su anuncio propio.

2. PORTADA – SCROLL HORIZONTAL
Problema:
Al modificar el tamaño de texto aparecía barra horizontal.

Causa:
El padding de la tarjeta se sumaba a su ancho y overflow-y habilitaba
también desplazamiento horizontal.

Solución:
- box-sizing: border-box
- overflow-x: hidden
- límites de ancho responsivos

3. MODO INICIAL MÁS COMPACTO
Se reduce moderadamente:
- ancho máximo de la pantalla;
- tamaño físico de los seis puntos;
- separaciones;
- teclado visual;
- márgenes y panel de nivel de tono.

No se cambia:
- escala 1–10 del tono;
- locución del slider;
- botón Volver a inicio;
- lógica de puntos;
- portada accesible;
- Intermedio provisional;
- Avanzado validado.
