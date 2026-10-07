MBS - POC DE INTEGRACION - ETAPA 01

Estado: demo validada como base, con el panel visible de Lecciones retirado.

OBJETIVO
- Verificar que la demo siga funcionando sin cambios en sus funciones principales.
- No integrar todavía Inicial / Intermedio / Avanzado.
- No modificar todavía el firmware ESP32-S3.

CAMBIO REALIZADO
- Se retiró del index.html el panel lateral de Lecciones y su botón de acceso.

NO SE MODIFICO
- app.js: se conserva por ahora la lógica interna de lecciones, inactiva al no existir su interfaz.
- styles.css: se conservan por ahora los estilos de lecciones.
- Idiomas ES/PT/EN/FR.
- TTS.
- Emulador Braille.
- Métricas y WPM.
- Sesiones.
- Exportación TXT/CSV.
- Resto de la demo validada.

CRITERIO
Primero validar que quitar la interfaz de lecciones no produzca regresiones.
Luego se continuará con la nueva pantalla inicial de modos.
