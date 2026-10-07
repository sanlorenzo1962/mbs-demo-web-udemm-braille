MBS_DEMO_MODOS_POC_02_4_INICIO_ACCESIBLE_VISUAL
Fecha: 2026-10-03

OBJETIVO
Reforzar la selección visual de los grupos de opciones de la pantalla inicial
sin modificar la navegación accesible ya validada.

CAMBIOS
- Se agrega un indicador visual explícito en cada opción:
  ○ no seleccionado / ● seleccionado.
- La opción seleccionada usa borde más grueso, fondo más marcado y peso
  tipográfico mayor.
- Se mantiene la navegación estándar:
  TAB entra/sale de grupo y flechas cambian la opción.
- Se refuerza visualmente el grupo activo mediante :focus-within.
- No se modifica la política de Inicio sin TTS propio del MBS.

RESULTADO ESPERADO
Que una persona con baja visión o un acompañante vidente identifique más
claramente qué opción quedó seleccionada al usar teclado y Narrador.
