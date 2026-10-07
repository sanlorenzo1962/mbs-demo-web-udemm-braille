MBS_DEMO_MODOS_POC_03_MODO_INICIAL
Fecha: 2026-10-03

OBJETIVO
Integrar el Modo Inicial real sobre la pantalla de inicio accesible validada POC 02.7.

BASE PEDAGÓGICA
El estudiante reconoce los seis puntos de la celda Braille de manera individual.
Cada punto:
- se ilumina;
- reproduce un tono propio;
- puede ser pronunciado por la voz educativa;
- se apaga automáticamente.

FUNCIONES INTEGRADAS
- Celda Braille visual 1-2-3 / 4-5-6.
- Emulador con disposición física:
  EN – 3 – 2 – 1 – SP – 4 – 5 – 6 – EN.
- Frecuencias:
  punto 1 = 330 Hz
  punto 2 = 392 Hz
  punto 3 = 466 Hz
  punto 4 = 554 Hz
  punto 5 = 659 Hz
  punto 6 = 784 Hz
- Duración regulable entre 0,2 y 1,2 s.
- Tema heredado desde Inicio.
- Idioma heredado ES / PT / EN / FR.
- Voz educativa heredada desde Inicio.
- Botón Volver a inicio.
- Texto básico del modo traducido a los cuatro idiomas.
- Si la voz educativa está activa, el estado dinámico usa aria-live=off
  para reducir superposición con lector de pantalla.
- Si la voz educativa está desactivada, aria-live=polite permite que
  Narrador/NVDA anuncie el punto.

PREPARACIÓN PARA ESP32
Si el WebSocket recibe una máscara de un único punto mientras Modo Inicial
está activo, se presenta ese punto:
1, 2, 4, 8, 16, 32 -> puntos 1..6.

NO INTEGRADO TODAVÍA
- Modo Intermedio.
- Persistencia entre reinicios.
- Validación física completa con ESP32.
