MBS_DEMO_MODOS_POC_03_5_VOZ_FUNCIONAL_INICIAL
Fecha: 2026-10-04

BASE
POC 03.4 – Accesibilidad primero.

OBJETIVO
Permitir que el Modo Inicial sea utilizable con:
- lector de pantalla OFF
- Voz educativa MBS ON

sin convertir la interfaz en una locución permanente.

CAMBIOS
1. Al entrar al Modo Inicial:
   “Modo Inicial. Seleccione un punto.”
   (traducido según el idioma elegido).

2. Botón Volver a inicio:
   se anuncia al recibir foco mediante teclado.

3. Control Duración del tono:
   al recibir foco anuncia:
   “Duración del tono. 0,6 segundos.”
   Al cambiar el valor anuncia sólo el nuevo valor.

4. Puntos 1–6:
   conservan el feedback ya existente:
   tono + “Punto X”.

5. Se elimina el botón LIMPIAR.
   Ya no tiene función pedagógica porque cada punto se apaga
   automáticamente y no existe un estado acumulado que borrar.

NO MODIFICADO
- Pantalla inicial accesible.
- Barra de accesibilidad visual.
- Tema, contraste y tamaño.
- Modo Intermedio provisional.
- Modo Avanzado validado.
- Lógica física/WebSocket del Modo Inicial.

CRITERIO
La voz MBS habla sólo cuando la información es necesaria para
orientarse o aprender. Se evita describir elementos redundantes.
