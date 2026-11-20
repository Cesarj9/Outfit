# Reglas de César para Pokelike

Fuente: prompt de traspaso del 2026-11-20. Orden de prioridad: instrucción actual de César > excepción temporal activa > regla permanente > estrategia verificada.

## A. Reglas permanentes (preferencias de César)

**Trabajo**
- Ejecutar, no proponer. Decisiones rutinarias sin pedir permiso (nodos, capturas, objetos, orden, tutores, reinicios autorizados).
- Respetar modo, inicial, objetivo, nº de partidas y condición de parada. No sustituir un desafío por otro ni entrar en Endless/Historia/Torre por iniciativa propia.
- «Para» = parar. Si pide ver una selección, enseñarla antes de decidir.
- Hablar poco: auroras nuevos, victorias, derrotas, bloqueos y decisiones importantes. En español.
- No afirmar nada sin comprobarlo (captura ≠ registro; animación ≠ victoria).
- No jugar «en segundo plano» tras terminar la respuesta.

**Primer nodo de captura**
- Intento = entrar en el primer encuentro y revisar sus opciones (3 cartas + 1 reroll por carta = hasta 6 candidatos).
- Revisar las 3 cartas, luego cada reroll inmediatamente. Usar todos los rerolls salvo que ya haya algo a conservar (no rerollear encima de un aurora objetivo).
- Intentos 1–50: solo objetivos aurora activos (o aurora nuevo útil si no hay especie objetivo).
- Tras el 50: aceptar cualquier shiny/aurora útil. No aceptar un normal solo por llegar a 50.
- Shiny ≠ aurora. Aurora ya registrado ≠ «aurora nuevo».
- Revisar rerolls también en capturas/eventos posteriores.
- Contador real de intentos en `estado_actual.json`; separar confirmados de inciertos.
- Verificar cada reinicio (partida, inicial, equipo, mapa, sin modal). No re-elegir reliquia inicial si se conserva.

**Registro de auroras**
- Objetivo aurora conseguido solo con: victoria + comprobación en PC de la marca aurora.
- Capturado = «pendiente de registro». No liberarlo ni cambiarlo hasta terminar.
- Evoluciones de la misma línea no son objetivos nuevos.
- Forma mega, megapiedra, shiny y aurora son dimensiones distintas.

**Equipo y ruta**
- Nivel = prioridad alta; favorecer entrenadores si no compromete captura objetivo/curación/mejora decisiva.
- Mapa 1: normalmente solo una captura además del inicial. ~6 nodos de Pokéball en total como orientación.
- 1–3 combatientes fuertes + apoyos para rasgos. No sobrepriorizar tutores.
- Banda Focus antes que Caza Shiny si hubiera que elegir (comprobar primero si hay conflicto real; los amuletos no ocupan hueco).

**Navegador**
- Solo información visible (UI, accesibilidad, DOM mostrado). Nada de leer/modificar guardados internos o código para obtener ventaja.
- No borrar caché, cerrar sesión, cambiar de cuenta ni reiniciar con captura pendiente sin autorización.

## B. Excepciones temporales activas

- Ninguna activa a 2026-11-20 más allá del objetivo de traspaso.
- Objetivo de traspaso (por defecto, si César no indica otro): **Squirtle aurora** en el desafío Agua con la línea Staryu/Starmie, si ese desafío o su partida siguen disponibles. Si no, preguntar solo esa decisión. Búsqueda dirigida → otro shiny/aurora no sustituye a Squirtle aurora.

## C. Objetivos históricos (NO vigentes salvo nueva orden)

Gible/Bagon/Axew aurora, Mawile, Ralts, Absol, Pawniard, Beldum, línea Bagon, Latias/Mega Latias, Aggron Mono-Acero. Solo contexto.

Histórico de traspaso (no verificado por este agente):
- Charmander aurora: registrado según el agente anterior (16/11/2026).
- Tentacool aurora: registrado según el agente anterior (17/11/2026, #072).
- Squirtle aurora: pendiente. Segunda búsqueda: 45 intentos confirmados sin éxito (Staryu shiny Nv5, Shiny Hunter, Big Pearl).
Verificar todo en el PC real antes de usarlo.
