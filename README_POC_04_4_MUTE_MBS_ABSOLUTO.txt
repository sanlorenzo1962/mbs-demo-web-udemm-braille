MBS_DEMO_MODOS_POC_04_4_MUTE_MBS_ABSOLUTO
Fecha: 2026-10-04

BASE
POC 04.3 – Voz MBS OFF robusta.

PROBLEMA
En PT / EN / FR todavía podían escucharse locuciones relacionadas con
el MBS aun seleccionando “Voz educativa MBS = Desactivada”.

CAUSA
La función _speakText permitía que llamadas antiguas con force:true
ignoraran el estado modoVoz.

CORRECCIÓN
Se implementa un MUTE MAESTRO:
- si modoVoz == false, _speakText nunca habla;
- force:true ya no puede saltarse el apagado;
- al desactivar la voz se cancelan utterances y temporizadores pendientes.

IMPORTANTE
Narrador/NVDA/VoiceOver no dependen de speechSynthesis de MBS.
Por lo tanto, con MBS OFF el lector de pantalla seguirá hablando
normalmente.

PRUEBA CLAVE
Narrador ON + Voz educativa MBS OFF:
- probar ES, PT, EN y FR;
- cualquier voz que permanezca será del lector de pantalla,
  no del TTS propio del MBS.

NO SE MODIFICA
- Semántica de puntos.
- Slider.
- Portada.
- Escala.
- Intermedio.
- Avanzado.
