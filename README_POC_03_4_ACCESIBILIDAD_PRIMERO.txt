MBS_DEMO_MODOS_POC_03_4_ACCESIBILIDAD_PRIMERO
Fecha: 2026-10-04

BASE
POC 03.3 – Reflow para texto grande.

CRITERIO NUEVO
La pantalla deja de tratar la accesibilidad como un ajuste posterior.
La disposición robusta pasa a ser el diseño base desde el inicio.

OBJETIVO
Acercar Inicio y Modo Inicial a una lógica de accesibilidad primero,
compatible con navegación por teclado y lectores de pantalla, y con
comportamiento estable entre 80% y 140% de tamaño de texto.

CAMBIOS PRINCIPALES
- Layout de una columna para los bloques de configuración.
- MODO ocupa siempre todo el ancho disponible.
- IDIOMA ocupa un bloque propio.
- ACCESIBILIDAD VISUAL ocupa un bloque propio.
- VOZ EDUCATIVA MBS ocupa un bloque propio.
- El reflow ya no aparece recién a 130%: es permanente.
- Se mantienen A− / A / A+ con rango 80–140%.
- Se mantienen contraste, tema y restablecimiento.
- Foco visible reforzado.
- Altura mínima de controles de 44 px.
- Selección indicada por más de un recurso visual.
- Se agrega enlace “Saltar a la configuración principal”.
- Se agrega texto oculto descriptivo para la barra de accesibilidad.
- Se respeta prefers-reduced-motion.
- Se reducen adornos y sombras en la pantalla inicial.
- Intermedio conserva su nombre.
- No se modifica la lógica pedagógica del Modo Inicial.
- No se modifica el Avanzado validado.
- Intermedio continúa como placeholder.

VALIDACIÓN SUGERIDA
1. Revisar 80%, 100%, 120% y 140%.
2. Recorrer Inicio sólo con teclado.
3. Probar tema claro y oscuro.
4. Probar contraste normal y alto.
5. Entrar y volver desde Inicial.
6. Confirmar placeholder Intermedio.
7. Confirmar que Avanzado sigue abriendo la interfaz validada.
8. Más adelante: prueba guiada con Narrador/NVDA por una usuaria habitual.

NOTA
Este POC no constituye una certificación WCAG. Es una base de diseño
orientada a sus principios prácticos antes de realizar una revisión formal.
