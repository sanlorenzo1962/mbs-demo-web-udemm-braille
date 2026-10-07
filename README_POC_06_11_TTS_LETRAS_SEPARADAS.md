# MBS – POC 06.11 – TTS por letras separadas

Base: POC 06.10
Fecha: 2026-10-07

## Motivo

La estrategia POC 06.10 no funcionó con el TTS real de Windows/Chrome:
enviar `k, g`, `c, m`, etc. dentro de una sola utterance seguía permitiendo
que el motor normalizara el token como una unidad y pronunciara
"kilogramos", "centímetros", etc.

## Cambio

Para los tokens conflictivos, cada letra se envía ahora como una
SpeechSynthesisUtterance independiente.

Ejemplo visual:
`kg`

El TTS recibe:
1. `k`
2. `g`

Nunca recibe la cadena completa `kg`, por lo que no debería poder
normalizarla como "kilogramos".

## Tokens protegidos

ES:
- cal
- cm
- mm
- km
- kg
- ml
- min

PT:
- kg
- ml
- min

FR:
- min

EN:
- sin cambios

## Intermedio

Se conserva intacta la corrección ya validada de POC 06.10:
el cierre por SP recuerda el contexto individual de cada carácter,
por lo que `-` en texto se pronuncia "guión" y `-` en NÚM. se pronuncia
"menos" aunque ambos estén en la misma secuencia.

## Prueba mínima

Avanzado ES:
- cal
- cm
- mm
- km
- kg
- ml
- min

Esperado:
- lectura literal/deletreada;
- no "calorías", "centímetros", "kilómetros", etc.

Luego:
- PT: kg, ml, min
- FR: min
