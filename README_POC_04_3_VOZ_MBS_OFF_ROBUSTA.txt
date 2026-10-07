MBS_DEMO_MODOS_POC_04_3_VOZ_MBS_OFF_ROBUSTA
Fecha: 2026-10-04

BASE
POC 04.2 – Puntos sin estado.

PROBLEMA
Con Narrador activo, al seleccionar:
“Voz educativa MBS = Desactivada”
la voz propia del MBS podía seguir hablando.

CAUSA PROBABLE
La selección visual del radio podía quedar desincronizada de la variable
interna vozInicio según el modo de interacción con Narrador.

CORRECCIÓN
Al pulsar INICIAR:
- se lee directamente cuál radio está checked;
- se sincroniza vozInicio;
- se aplica modoVoz;
- si queda desactivado, se cancela cualquier utterance pendiente.

OBJETIVO
Que el resultado sea idéntico tanto si la opción se selecciona con:
- mouse;
- Tab + flechas;
- Narrador;
- otro lector de pantalla.

NO SE MODIFICA
- Semántica de los puntos.
- Slider.
- TTS cuando está activado.
- Portada.
- Tamaños.
- Intermedio.
- Avanzado.
