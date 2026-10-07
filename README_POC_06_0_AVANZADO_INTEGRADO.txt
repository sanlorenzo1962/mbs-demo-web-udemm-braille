MBS_DEMO_MODOS_POC_06_0_AVANZADO_INTEGRADO
Fecha: 2026-10-05

OBJETIVO
Integrar formalmente el Modo Avanzado dentro de la arquitectura por modos
sin reescribir ni alterar la WebApp avanzada ya validada.

CAMBIOS
- Se agrega botón “Volver a inicio” en el encabezado del Modo Avanzado.
- El botón se traduce según ES/PT/EN/FR.
- El foco del botón queda cubierto por el TTS general ya existente de la WebApp.
- La etiqueta “Modo Avanzado” se localiza según idioma.
- El Avanzado hereda desde Inicio:
  idioma, tamaño de texto, contraste, tema y Voz MBS.
- Si existe una sesión activa, “Volver a inicio” NO abandona silenciosamente
  la pantalla: solicita detener la sesión primero, preservando métricas/resumen.

NO SE MODIFICA
- interpretación Braille;
- velocidad/WPM;
- sesiones y métricas;
- buffer de escritura;
- TTS de palabras existente;
- exportación TXT/CSV;
- WebSocket;
- emulador;
- tablas multilingües;
- lógica de Inicial e Intermedio.

PRUEBA SUGERIDA
1. Entrar a Avanzado desde Inicio con distintas preferencias.
2. Confirmar idioma/tema/escala/contraste/Voz MBS.
3. Probar “Volver a inicio” sin sesión activa.
4. Iniciar sesión y comprobar que “Volver” solicita detenerla primero.
5. Verificar escritura, velocidad, sesión, limpiar, TXT y CSV como antes.
