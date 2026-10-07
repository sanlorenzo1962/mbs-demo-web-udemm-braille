# MBS – Signografía francesa y notación Antoine
**Estado:** validado en demo WebApp – Modo Intermedio  
**Fecha:** 2026-10-05

## 1. Criterio general

El francés no debe reutilizar sin más la lógica numérica de ES/PT/EN.

En Modo Intermedio:

- ES/PT/EN conservan el modo numérico activado por `3-4-5-6`.
- FR utiliza una rama propia basada en notación Antoine.
- En FR, el **punto 6** activa el estado `ANT.`.
- `ANT.` permanece activo hasta `SP`.
- `SP` confirma la secuencia y devuelve el modo a estado normal.

Esta diferencia debe trasladarse posteriormente al `traductor.h` del ESP32-S3.

---

## 2. Puntuación francesa validada

| Signo | Nombre FR | Puntos |
|---|---|---|
| `,` | virgule | 2 |
| `;` | point-virgule | 2-3 |
| `:` | deux-points | 2-5 |
| `.` | point | 2-5-6 |
| `?` | point d’interrogation | 2-6 |
| `!` | point d’exclamation | 2-3-5 |
| `"` | guillemets | 2-3-5-6 |
| `(` | parenthèse ouvrante | 2-3-6 |
| `)` | parenthèse fermante | 3-5-6 |
| `'` | apostrophe | 3 |
| `/` | barre oblique | 3-4 |
| `-` | trait d’union | 3-6 |

Para `-`, el carácter visual permanece `-` y la Voz MBS utiliza `trait d’union` en contexto texto.

---

## 3. Numeración Antoine validada

Con `ANT.` activo:

| Dígito | Puntos |
|---|---|
| 1 | 1-6 |
| 2 | 1-2-6 |
| 3 | 1-4-6 |
| 4 | 1-4-5-6 |
| 5 | 1-5-6 |
| 6 | 1-2-4-6 |
| 7 | 1-2-4-5-6 |
| 8 | 1-2-5-6 |
| 9 | 2-4-6 |
| 0 | 3-4-5-6 |

Prueba completa validada: `1234567890`.

---

## 4. Operadores Antoine validados

| Operador | Puntos | Representación |
|---|---|---|
| suma | 2-3-5 | `+` |
| resta | 3-6 | `-` |
| multiplicación | 3-5 | `×` |
| división | 2-5 | `÷` |
| igualdad | 2-3-5-6 | `=` |

Expresiones completas validadas:

- `2+3=5`
- `6×4=24`
- `8÷2=4`

La Voz MBS pronuncia naturalmente los operadores, por ejemplo `multiplié par` y `divisé par`.

---

## 5. Porcentaje francés validado

El porcentaje francés se implementa como **símbolo compuesto de dos celdas** dentro del estado Antoine:

1. primera celda: punto `5`;
2. segunda celda: puntos `3-4-6`;
3. resultado: `%`;
4. Voz MBS: `pour cent`.

La primera celda no debe generar todavía el símbolo final. El sistema espera la segunda celda y recién entonces confirma `%`.

Esto requiere en el firmware un estado intermedio específico, por ejemplo:

`frPercentPending = true`

que se limpia al completar la segunda celda, al producirse un error o al finalizar con `SP`.

---

## 6. Estados visuales

Los textos `MAY.`, `NÚM.` y `ANT.` son **indicadores de estado**, no caracteres Braille.

En la demo validada:

- no escalan con A+/140%;
- permanecen contenidos dentro del panel;
- las letras, números y símbolos reales sí conservan el aumento accesible.

---

## 7. Reglas a trasladar al `traductor.h`

La migración al ESP32-S3 debe preservar estas decisiones:

1. separar la rama francesa de la rama numérica ES/PT/EN;
2. activar Antoine con punto 6 sólo en FR;
3. mantener Antoine activo hasta `SP`;
4. usar la tabla numérica Antoine específica;
5. interpretar operadores según contexto matemático;
6. implementar `%` como secuencia de dos celdas;
7. conservar puntuación francesa específica;
8. mantener separación entre carácter visual y locución TTS cuando sea necesario;
9. no modificar ES/PT/EN ya validados salvo una validación específica posterior.

---

## 8. Estado de los demás idiomas

### Español
Validado:
- puntuación básica;
- `+`, `-`, `×`, `÷`, `=`, `%`;
- resolución contextual `!/+`, `í/÷`, guión/menos.

### Inglés
Validado:
- puntuación básica;
- funcionamiento actual con `*` y `/`.
No se modifica por ahora.

### Portugués
Validado:
- puntuación básica;
- funcionamiento actual con `*` y `/`.
La signografía matemática específica queda pendiente de una validación propia antes de cambiarla.

---

## 9. Estado de cierre

La demo actual puede considerarse **candidata a versión pública** una vez superado un smoke test final de:

- Inicio;
- Inicial;
- Intermedio ES/PT/EN/FR;
- Avanzado;
- A− / A / A+;
- tema/contraste;
- voz ON/OFF;
- regreso a inicio;
- una escritura corta por idioma;
- una expresión Antoine;
- exportaciones de Avanzado.

No agregar nuevas funciones antes de ese smoke test.
