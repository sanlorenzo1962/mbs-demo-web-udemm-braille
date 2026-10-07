MBS_DEMO_MODOS_POC_06_7_INTERMEDIO_ESTADOS_SIN_ZOOM
Fecha: 2026-10-05

OBJETIVO
Corregir el desborde visual observado en Modo Intermedio al usar A+/140%.

CAMBIO
- Los textos grandes NÚM. y ANT. se tratan como indicadores de estado.
- Se muestran con tamaño fijo moderado (56 px), por lo que no crecen con
  el ajuste A+/140%.
- El badge inferior NÚM./ANT. también mantiene un tamaño estable al 140%.

SE PRESERVA
- Letras, números y símbolos reales continúan respondiendo al aumento de texto.
- No se modifica ninguna tabla Braille.
- No se modifica Antoine.
- No se modifica TTS.
- No se modifica Inicial ni Avanzado.

PRUEBA
Comparar Intermedio al 100%, 120% y 140%:
1) activar NÚM. en EN/ES/PT;
2) activar ANT. en FR;
3) comprobar que NÚM./ANT. no invadan el panel derecho;
4) comprobar que letras/dígitos reales sigan aumentando normalmente.
