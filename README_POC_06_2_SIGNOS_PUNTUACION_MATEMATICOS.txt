MBS_DEMO_MODOS_POC_06_2_SIGNOS_PUNTUACION_MATEMATICOS
Fecha: 2026-10-05

OBJETIVO
Incorporar a la demo, antes de migrarla al ESP32-S3, la capa básica de
puntuación y símbolos matemáticos sin modificar el Modo Inicial.

MODO INTERMEDIO
Se habilitan, según las tablas ya existentes:
- puntuación: coma, punto, punto y coma, dos puntos, interrogación,
  exclamación, guion, apóstrofe, comillas, paréntesis y barra;
- matemáticos básicos en contexto numérico: +, -, *, /, = y %.
La Voz MBS pronuncia el nombre del signo al ingresarlo.
Al pulsar SP, el deletreo final usa también los nombres de los signos.

MODO AVANZADO
La lógica física de signos ya existente se conserva.
Se mejora el mapeo de la demo texto->Braille para comillas, apóstrofe,
barra y símbolos matemáticos básicos.

MODO INICIAL
Sin cambios: continúa dedicado al reconocimiento de puntos.

IMPORTANTE
No se agregan símbolos matemáticos avanzados ni notación científica.
Se mantiene el criterio incremental y se deja la validación fina por idioma
para una etapa específica antes de congelar la demo.

PENDIENTE SEPARADO
TTS Avanzado: expansiones automáticas de abreviaturas/unidades.
