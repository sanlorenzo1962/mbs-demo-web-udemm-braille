MBS_DEMO_MODOS_POC_04_2_PUNTOS_SIN_ESTADO
Fecha: 2026-10-04

BASE
POC 04.1 – Ajuste final de escala + reflow.

OBJETIVO
Corregir la semántica accesible de los seis puntos del Modo Inicial.

PROBLEMA
Narrador anunciaba los puntos como controles de estado:
“encendido / apagado”.

Esto no corresponde al comportamiento real del Modo Inicial:
cada punto es una acción momentánea que produce tono + locución
y luego vuelve automáticamente a reposo.

CAMBIO
- Se elimina aria-pressed de los seis puntos.
- Cada punto mantiene una etiqueta accesible simple:
  “Punto 1”, “Punto 2”, ..., “Punto 6”.
- Para Narrador/NVDA deberían presentarse como botones normales,
  sin estado encendido/apagado.

NO SE MODIFICA
- Slider Nivel 1–10.
- TTS MBS.
- Volver a inicio.
- Portada.
- Tamaños y reflow.
- Intermedio.
- Avanzado.
