# MBS – POC 06.10 – Cierre TTS

Base: POC 06.9 documentada
Fecha: 2026-10-07

## Cambios localizados

### 1. Intermedio – guión / menos por contexto individual

Problema observado:
- `-` en texto se pronunciaba correctamente como guión.
- `-` en NÚM. se pronunciaba correctamente como menos.
- Si ambos aparecían en una misma secuencia y se cerraba con SP estando NÚM. activo,
  el cierre pronunciaba ambos como "menos".

Corrección:
- se guarda junto a cada carácter el contexto con el que fue ingresado;
- SP utiliza esa traza individual al realizar el deletreo final;
- no cambia ninguna tabla Braille ni la interpretación visual.

Prueba focal ES:
1. ingresar `-` en texto;
2. activar NÚM.;
3. ingresar `-`;
4. SP;
5. el cierre debe decir primero "guión" y luego "menos".

### 2. Avanzado – protección de abreviaturas TTS

Se protegen únicamente los tokens que fallaron en la prueba real:

ES:
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

Cuando aparece exactamente uno de esos tokens como palabra en Avanzado,
se envía al TTS separado por letras para impedir la expansión automática
a centímetros, kilogramos, minutos, etc.

Ejemplo:
- texto visual: `kg`
- locución protegida: `k, g`

No se modifica el texto escrito ni exportado.

## Se preserva

- signografía validada ES/PT/EN/FR;
- Antoine;
- porcentaje francés compuesto;
- MAY./NÚM./ANT.;
- Inicial;
- métricas de Avanzado;
- TXT/CSV;
- diseño y accesibilidad;
- palabras cortas normales como `bar`, `mol`, `lux`, `cal`.

## Smoke test recomendado

Intermedio:
- guión texto + menos numérico en una misma entrada.

Avanzado ES:
- cal (debe seguir natural)
- cm, mm, km, kg, ml, min (deben leerse literal, no expandirse)

Avanzado PT:
- kg, ml, min

Avanzado FR:
- min

Luego verificar una frase normal por idioma y exportación TXT/CSV.
