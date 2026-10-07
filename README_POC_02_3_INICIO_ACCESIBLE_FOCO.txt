MBS_DEMO_MODOS_POC_02_3_INICIO_ACCESIBLE_FOCO
Fecha: 2026-10-03

CORRECCIÓN PRINCIPAL
La WebApp antigua/Avanzada quedaba visualmente detrás de la pantalla inicial
pero sus controles seguían entrando en la navegación por TAB y podían ser
anunciados por Narrador/NVDA.

SOLUCIÓN
- El contenedor de la WebApp avanzada arranca con el atributo HTML `inert`.
- Mientras Inicio está visible, todo lo que queda detrás:
  * no recibe foco por TAB;
  * no recibe clics;
  * no forma parte de la navegación del lector de pantalla.
- Al entrar en Modo Avanzado se elimina `inert`.
- Al volver a Inicio se aplica `inert` nuevamente.
- Inicial e Intermedio mantienen la WebApp avanzada bloqueada hasta que
  integremos sus interfaces reales.

NO SE MODIFICA
- Semántica radio del POC 02.2.
- Etiquetas accesibles de idiomas.
- Tema claro con contraste reforzado.
- Criterio de Inicio sin TTS propio de MBS.
