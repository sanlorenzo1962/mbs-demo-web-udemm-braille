# MBS – POC 06.12 – TTS alias en una sola locución

Base: POC 06.11
Fecha: 2026-10-07

## Problema observado en POC 06.11

La lectura por una utterance independiente para cada letra:
- evitó la expansión semántica;
- pero produjo pausas grandes entre letras;
- acumuló atraso de TTS frente a la escritura rápida (ej. ~45 WPM).

Por lo tanto esa estrategia se descarta para Avanzado.

## Estrategia POC 06.12

Para los pocos tokens conflictivos detectados experimentalmente se usa
un alias fonético completo enviado en UNA sola utterance.

Ejemplos ES:
- kg  -> "ka ge"
- cm  -> "ce eme"
- ml  -> "eme ele"
- min -> "eme i ene"
- cal -> "ce a ele"

El texto visible y exportado permanece exactamente igual.

## Tokens protegidos

ES:
cal, cm, mm, km, kg, ml, min

PT:
kg, ml, min

FR:
min

EN:
sin cambios

## Objetivo de prueba

Comprobar dos cosas:
1. que desaparezcan las expansiones ("kilogramos", "centímetros", etc.);
2. que el ritmo vuelva a ser fluido, sin la demora grande entre letras de 06.11.

No se modifica la corrección ya validada de guión/menos en Intermedio.
