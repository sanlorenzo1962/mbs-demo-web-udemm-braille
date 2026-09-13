MBS DEMO BRAILLE V7 — SEPARACIÓN VISUAL DE PALABRAS
Fecha: 13/09/2026

OBJETIVO
Hacer inequívoca la separación entre palabras en el bloque TEXTO BRAILLE.

CAMBIO ÚNICO EN LÓGICA DE PRESENTACIÓN
- Se modifica únicamente app.js.
- Cuando el texto contiene un espacio:
  * se agrega una celda Braille vacía real (U+2800);
  * y luego una separación visual adicional (U+2003).
- No cambia el texto convencional.
- No cambian tablas Braille.
- No cambian prefijos ^ / #.
- No cambian TTS, métricas ni lecciones.
- No cambia el firmware.

IMPORTANTE
Para evaluar esta V7, conviene volver al CSS de V5
(styles_V4_ANCHO_VALIDADA.css NO; usar el CSS de V5 con idiomas verticales),
sin el word-spacing experimental de V6, para no sumar dos efectos visuales.

PRUEBA SUGERIDA
^hola mis amigos, cómo están?
