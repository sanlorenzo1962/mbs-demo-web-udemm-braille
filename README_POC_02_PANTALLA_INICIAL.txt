MBS_DEMO_MODOS_POC_02_PANTALLA_INICIAL
Fecha: 2026-10-03

OBJETIVO
Validar la nueva pantalla inicial de configuración sin integrar todavía
las interfaces específicas de Modo Inicial y Modo Intermedio.

CONFIGURACIÓN DISPONIBLE
- Modo: Inicial / Intermedio / Avanzado
- Idioma: ES / PT / EN / FR
- Tema: Oscuro / Claro
- Voz educativa MBS: Activada / Desactivada

COMPORTAMIENTO
- AVANZADO abre la demo validada actual, sin panel de Lecciones.
- INICIAL e INTERMEDIO muestran un placeholder temporal que confirma
  la selección. Sus interfaces se integrarán en los siguientes POC.
- No se agregó persistencia entre recargas.
- No se modificaron métricas, WPM, exportación, emulador, tablas Braille
  ni la lógica central del modo avanzado.
- La lógica interna antigua de Lecciones sigue archivada en app.js, pero
  no existe interfaz visible de Lecciones.

CRITERIO DE PRUEBA
1. Abrir index.html.
2. Probar las tres opciones de modo.
3. Probar ES/PT/EN/FR.
4. Probar tema oscuro/claro.
5. Probar voz educativa activada/desactivada.
6. Verificar que Avanzado conserva el funcionamiento del POC 01.
