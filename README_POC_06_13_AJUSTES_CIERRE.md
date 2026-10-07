# MBS – POC 06.13 – Ajustes de cierre

Base: POC 06.12
Fecha: 2026-10-07

Se realizan ÚNICAMENTE dos correcciones acordadas antes del cierre de la demo.

## 1. Modo claro – texto de escritura en Intermedio

Problema:
- el texto que se está construyendo (`ESCRIBIENDO / ÉCRITURE / WRITING`)
  se mostraba blanco sobre fondo claro y podía desaparecer visualmente.

Corrección:
- en tema claro, `.intermediate-building` usa azul oscuro `#174f7d`;
- tema oscuro y alto contraste permanecen sin cambios.

## 2. Intermedio – feedback de puntos

Problema:
- la Voz educativa MBS anunciaba "Punto 1", "Punto 2", etc.

Corrección:
- en Modo Intermedio anuncia solamente `1`, `2`, ... `6`;
- en Modo Inicial se conserva "Punto 1 / Dot 1 / Point 1", porque allí
  la identificación espacial del punto forma parte del objetivo pedagógico;
- el `aria-label` descriptivo de los botones de Intermedio se conserva para
  lectores de pantalla. Sólo cambia la Voz educativa MBS.

## No se modifica

- TTS de abreviaturas de POC 06.12;
- traducción Braille;
- puntuación;
- Antoine;
- porcentaje francés;
- MAY./NÚM./ANT.;
- Avanzado;
- exportación TXT/CSV;
- lógica de SP/EN.

## Prueba mínima

1. Tema claro + Intermedio: escribir `boa` o cualquier palabra.
   El texto en construcción debe verse claramente en azul oscuro.
2. Con Voz MBS activa, tabular por los puntos 1–6 en Intermedio.
   Debe decir sólo "1", "2", ... "6".
3. Entrar a Inicial y comprobar que continúa diciendo
   "Punto 1 / Ponto 1 / Dot 1 / Point 1" según idioma.
