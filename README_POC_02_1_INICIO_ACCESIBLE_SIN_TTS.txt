MBS_DEMO_MODOS_POC_02_1_INICIO_ACCESIBLE_SIN_TTS
Fecha: 2026-10-03

OBJETIVO
Validar la pantalla inicial como interfaz accesible, dejando su navegación
exclusivamente a cargo del lector de pantalla del sistema.

CAMBIOS
- La pantalla inicial NO genera TTS propio del MBS.
- Narrador/NVDA/VoiceOver quedan a cargo de anunciar controles y estados.
- La opción Voz educativa MBS se conserva, pero se aplica recién dentro del modo elegido.
- Se agregaron nombres accesibles completos a ES/PT/EN/FR.
- Se reforzó el foco visible para navegación por teclado.
- Volver a inicio cancela cualquier voz MBS activa y devuelve el foco al primer control.
- Inicial e Intermedio siguen siendo placeholders en este POC; no se integraron aún.
- Avanzado mantiene la demo actual.

PRUEBA RECOMENDADA
1. Abrir index.html con Narrador o NVDA activo.
2. Recorrer toda la pantalla con Tab y Shift+Tab.
3. Confirmar que sólo habla el lector de pantalla, sin voz MBS superpuesta.
4. Verificar que cada opción anuncia su estado seleccionado/no seleccionado.
5. Activar opciones con Enter y barra espaciadora.
6. Entrar y volver a Inicio; comprobar que el foco vuelve al primer control.
