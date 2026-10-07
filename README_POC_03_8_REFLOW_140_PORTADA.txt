MBS_DEMO_MODOS_POC_03_8_REFLOW_140_PORTADA
Fecha: 2026-10-04

BASE
POC 03.7 – Correcciones portada + Modo Inicial.

OBJETIVO
Corregir únicamente el comportamiento de la portada al llegar a 140%.

CAMBIO
- Entre 80% y 130% se conserva el comportamiento validado.
- Al llegar a 140%:
  * la tarjeta deja de usar scroll interno;
  * se elimina cualquier desplazamiento horizontal;
  * si la altura de la pantalla no alcanza, el desplazamiento permitido
    es únicamente vertical sobre la portada completa;
  * la barra de accesibilidad puede envolver;
  * se reducen sólo espacios decorativos, no el tamaño de texto elegido.

NO SE MODIFICA
- Modo Inicial.
- Locuciones.
- Nivel de tono 1–10.
- Volver a inicio.
- Intermedio provisional.
- Avanzado validado.

CRITERIO
El aumento de texto debe producir reflow, no obligar a desplazamiento
horizontal ni encerrar al usuario en una pequeña zona con scroll interno.
