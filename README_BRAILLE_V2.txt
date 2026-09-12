MBS DEMO BRAILLE V2 — 12/09/2026

Cambios respecto de V1:
- ^ se interpreta como prefijo de mayúscula (puntos 4+6, máscara 0x28).
- ^^ activa bloqueo de mayúsculas.
- # se interpreta como prefijo numérico (puntos 3+4+5+6, máscara 0x3C).
- ^ y # NO aparecen como caracteres en TEXTO GENERADO.
- Ambos prefijos SÍ aparecen en TEXTO BRAILLE.
- ESPACIO o ENTER cancelan modo numérico y modo mayúscula, incluido LOCK.
- Se preservan TTS, métricas, lecciones y resto de la demo.
- No se modifica firmware.

Pruebas sugeridas:
^casa
^^casa casa
#123
#12 34
^a
