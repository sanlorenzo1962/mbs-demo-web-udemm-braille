MBS_DEMO_MODOS_POC_03_3_REFLOW_TEXTO_GRANDE
Fecha: 2026-10-04

BASE
POC 03.2 – Barra de accesibilidad visual incremental.

PROBLEMA DETECTADO
A 130–140% algunos textos largos, especialmente:
- Intermedio
- Voz educativa MBS
salían de sus botones o desplazaban leyendas.

CAUSA
La tipografía aumentaba correctamente, pero algunos bloques seguían
compartiendo una distribución de dos columnas con ancho insuficiente.

CORRECCIÓN
- Se conserva el rango 80–140%.
- No se achica artificialmente ninguna palabra.
- Desde 130% se activa un reflow de accesibilidad:
  * MODO ocupa todo el ancho.
  * VOZ EDUCATIVA MBS ocupa todo el ancho.
  * El cuadro principal puede crecer hasta 760 px.
  * Idioma y barra de accesibilidad mantienen su comportamiento.
- Intermedio conserva su denominación completa.
- En pantallas angostas los controles pueden pasar a disposición vertical.
- No se modifica la lógica pedagógica del Modo Inicial.

PRUEBA RECOMENDADA
Comparar 100%, 120%, 130% y 140%.
Verificar especialmente:
- Inicial / Intermedio / Avanzado
- Activada / Desactivada
- leyendas MODO y VOZ EDUCATIVA MBS
- entrada al Modo Inicial
