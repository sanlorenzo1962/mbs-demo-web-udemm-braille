MBS_DEMO_MODOS_POC_05_0_INTERMEDIO_INTEGRADO
Fecha: 2026-10-05

OBJETIVO
Integrar el Modo Intermedio dentro de la base POC 04.6 sin modificar la lógica
del Modo Avanzado.

DECISIONES PEDAGÓGICAS
- Sin métricas, WPM, cronómetro ni evaluación.
- Práctica libre o guiada de letras, números y palabras cortas.
- Hereda idioma, tamaño de texto, contraste, tema y Voz MBS desde Inicio.
- Tonos de pulsación ON/OFF como único ajuste propio.
- Duración del tono fija (~0,64 s, equivalente aproximado a Nivel 5).
- MAY. afecta sólo al próximo carácter válido.
- NÚM. permanece activo hasta SP.
- SP pronuncia la palabra o número completo, lo conserva como “Último resultado”
  y limpia el campo de construcción para una nueva entrada.
- EN sólo confirma la celda en el emulador visual.
- En el MBS físico, las celdas recibidas por WebSocket se consideran ya confirmadas.
- ENTER físico no tiene función en este nivel.

PRUEBA SUGERIDA
1. Inicio: elegir INTERMEDIO, idioma y Voz MBS.
2. Con el emulador, seleccionar puntos y pulsar EN.
3. Probar una palabra corta (por ejemplo CASA) y finalizar con SP.
4. Probar MAY. (4+6) y luego una letra.
5. Probar NÚM. (3+4+5+6), varios dígitos y SP.
6. Desactivar Tonos de pulsación y repetir.
7. Verificar A-/A/A+, contraste y tema.
8. Probar Voz MBS ON/OFF.
9. Confirmar que Avanzado permanece sin cambios funcionales.

NOTA
Esta POC no resuelve todavía BKSP/corrección de caracteres ya confirmados.
Esa decisión se deja deliberadamente fuera hasta validarla pedagógicamente.
