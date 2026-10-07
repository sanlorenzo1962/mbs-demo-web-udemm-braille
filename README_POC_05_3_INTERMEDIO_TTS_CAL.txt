MBS_DEMO_MODOS_POC_05_3_INTERMEDIO_TTS_CAL
Fecha: 2026-10-05

OBJETIVO
Comprobar dentro del flujo real del Modo Intermedio el hallazgo de la prueba
diagnóstica: el sintetizador español pronuncia correctamente “cál”, mientras
que interpreta “cal” como “calorías”.

CAMBIO CONTROLADO
- En pantalla, buffer y “Último resultado” se conserva exactamente “cal”.
- Sólo para la Voz MBS, y sólo en español, “cal” se envía al TTS como “cál”.
- La frase sigue siendo “Escribiste ...”.
- Ninguna otra palabra se modifica.

IMPORTANTE
Esta versión NO pretende resolver todavía todas las abreviaturas.
Es una prueba de arquitectura: separar texto escrito de texto preparado para TTS.

NO SE MODIFICÓ
- lógica Braille;
- números;
- MAY./NÚM.;
- tonos;
- accesibilidad;
- interfaz;
- otros idiomas;
- Modo Avanzado.
