MBS_DEMO_MODOS_POC_04_1_AJUSTE_FINAL_ESCALA_REFLOW
Fecha: 2026-10-04

BASE
POC 04.0 – Escala base 1080p.

CRITERIO DE VALIDACIÓN
- Chrome al 100%.
- Tamaño MBS normal como referencia.
- Resolución de referencia: 1920x1080.
- Sin desplazamiento horizontal.
- El aumento de accesibilidad puede generar desplazamiento vertical.

CAMBIOS

1. MODO INICIAL
Se reduce aproximadamente un 10% la escala física:
- ancho general;
- diámetro de puntos;
- separación entre puntos;
- teclado visual;
- panel de nivel de tono;
- márgenes y espacios.

La tipografía funcional se conserva en un tamaño legible.

Objetivo:
Que Chrome 100% se aproxime a la proporción visual que antes resultaba
cómoda con Chrome 90%.

2. PORTADA AL 140%
- Se eliminan recortes laterales.
- Todos los bloques quedan limitados al ancho real disponible.
- Se refuerza box-sizing:border-box.
- Se permite reflow de botones y textos.
- Se mantiene únicamente desplazamiento vertical si la altura no alcanza.
- No se amplía artificialmente la tarjeta.

NO SE MODIFICA
- TTS.
- Nivel de tono 1–10.
- Volver a inicio.
- Modo Intermedio provisional.
- Modo Avanzado validado.
