MBS DEMO BRAILLE V5 — IDIOMAS VERTICALES
Fecha: 13/09/2026

OBJETIVO
Recuperar altura útil en el panel derecho aprovechando el ancho libre
de las pantallas de escritorio.

CAMBIO
- Sólo se modifica styles.css.
- No se modifica index.html.
- No se modifica app.js.
- No cambia la lógica de idiomas, Braille, prefijos, TTS, métricas o lecciones.

DISEÑO
- En pantallas de escritorio (>1180 px):
  * ancho máximo general: 1440 px;
  * selector de idiomas pasa a una franja vertical a la derecha;
  * el cuadro TEXTO DE PRUEBA sube y ocupa el lugar liberado;
  * los cuatro idiomas quedan uno debajo del otro.
- En pantallas medianas y móviles:
  * el selector vuelve automáticamente a su posición horizontal original.

IMPORTANTE
Esta V5 parte de la V4 validada. Si visualmente no convence,
basta volver a subir styles_V4_ANCHO_VALIDADA.css con el nombre styles.css.

PARA PROBAR
1. Subir únicamente styles.css al repositorio experimental.
2. Commit changes.
3. Esperar el despliegue de GitHub Pages.
4. Ctrl+F5.
5. Probar con el panel de lecciones cerrado y abierto.
