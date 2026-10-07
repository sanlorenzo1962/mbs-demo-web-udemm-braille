MBS_DEMO_MODOS_POC_04_5_NARRADOR_SIN_ARIA_LIVE
Fecha: 2026-10-04

BASE
POC 04.4 – Mute MBS absoluto.

OBJETIVO
Reducir duplicaciones de Narrador/NVDA dentro del Modo Inicial.

CAMBIOS
1. initialStatus usa aria-live="off" siempre.
2. Con Voz educativa MBS OFF:
   - no se anuncia automáticamente “Modo Inicial. Seleccione un punto”.
   - Narrador/NVDA sólo leen controles y textos cuando el usuario navega/focaliza.
3. Con Voz educativa MBS ON:
   - se conserva el anuncio propio del MBS al entrar;
   - se conserva tono + “Punto X”;
   - se conserva locución del slider y Volver a inicio.

SE CONSERVA
- etiquetas accesibles de los botones;
- semántica de los puntos como botones normales;
- slider Nivel 1–10;
- portada y tamaños;
- Intermedio provisional;
- Avanzado validado.

PRUEBA CLAVE
Narrador ON + Voz MBS OFF:
- entrar a Inicial;
- recorrer con Tab;
- verificar que Narrador no reciba anuncios automáticos de estado
  y que la experiencia quede menos repetitiva.
