MBS_DEMO_MODOS_POC_03_1_ACCESIBILIDAD_VISUAL_GLOBAL
Fecha: 2026-10-04

BASE
POC 03 – Modo Inicial integrado.

OBJETIVO
Agregar una capa común de accesibilidad visual antes de integrar
los modos Intermedio y Avanzado en la nueva arquitectura.

NUEVAS OPCIONES EN INICIO
1. Tamaño de texto
   - A− = pequeño
   - A  = normal
   - A+ = grande

2. Contraste
   - Normal
   - Alto

3. Tema
   - Oscuro
   - Claro
   (ya existente y conservado)

ALCANCE
Las opciones son globales y se aplican a:
- pantalla Inicio;
- Modo Inicial;
- Modo Avanzado existente;
- futuros modos Intermedio y Avanzado integrados.

ACCESIBILIDAD
- Los controles nuevos usan selección exclusiva tipo radio.
- Narrador/NVDA recibe etiquetas “Texto pequeño / normal / grande”.
- El alto contraste funciona tanto con tema oscuro como claro.
- Los estados continúan sin depender sólo del color.
- La pantalla Inicio sigue SIN TTS propio de MBS.

NO INCLUIDO TODAVÍA
- Persistencia entre reinicios.
- Colores diferenciados por punto.
- Integración real del Modo Intermedio.

CRITERIO DE PRUEBA
- Probar A− / A / A+ en Inicio y Modo Inicial.
- Probar Normal / Alto con tema Oscuro.
- Probar Normal / Alto con tema Claro.
- Verificar que Volver a inicio conserva la selección durante la sesión.
- Verificar que el Modo Inicial mantiene tonos, puntos, slider y TTS.
