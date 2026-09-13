MBS DEMO BRAILLE V4 — ENSANCHAMIENTO CONTROLADO
Fecha: 13/09/2026

CAMBIO ÚNICO
- Se modifica únicamente styles.css.
- No cambia index.html.
- No cambia app.js.
- No cambia ninguna lógica de Braille, prefijos, TTS, métricas o lecciones.

OBJETIVO
Aprovechar mejor el ancho de pantalla sin reorganizar todavía los bloques.

AJUSTES
- .layout: max-width de 1020 px a 1280 px.
- Columna izquierda: de 320 px a 360 px.
- Separación entre columnas: de 18 px a 22 px.
- Salvaguarda intermedia para pantallas entre 721 y 1180 px:
  ancho 1080 px y columna izquierda 330 px.
- Se conserva el cambio a una sola columna por debajo de 720 px.

PARA APLICAR
1. Subir únicamente styles.css al repositorio experimental.
2. Commit changes.
3. Esperar unos segundos.
4. Recargar con Ctrl+F5.
