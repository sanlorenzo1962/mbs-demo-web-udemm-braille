MBS_DEMO_MODOS_POC_03_9_FONDO_OVERLAY_FIJO
Fecha: 2026-10-04

BASE
POC 03.8 – Reflow 140% de portada.

PROBLEMA
Al desplazar verticalmente la portada al 140% aparecía debajo, como
un “fantasma”, parte de la WebApp Avanzada.

CAUSA
El fondo oscuro .overlay-bg era absoluto y se desplazaba junto con
el contenido del overlay. La WebApp inferior permanecía inactiva,
pero se volvía visualmente visible en la zona no cubierta.

CORRECCIÓN
- .overlay-bg queda fijo al viewport.
- #overlay-inicio incorpora un fondo opaco de respaldo.
- La WebApp subyacente continúa inert mientras la portada está activa.

NO SE MODIFICA
- Reflow de 80–140%.
- Modo Inicial.
- TTS.
- Nivel de tono.
- Intermedio.
- Avanzado.
