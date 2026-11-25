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
- **LEY (César, 2026-11-23): el primer nodo NUNCA se salta.** Intentos 1–20: solo aurora NUEVO (o aurora objetivo activo). Tras el 20 sin aurora nuevo: seguir reiniciando hasta encontrar cualquier aurora o shiny útil (ya registrado vale). No aceptar un normal. (Antes el límite era 50; César lo bajó a 20.)
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
- (César, 2026-11-22) Llegar a la Liga con MUCHO más nivel: el nivel es la prioridad; elegir rutas con el máximo de entrenadores aunque cueste capturas/objetos.
- Nivel = prioridad alta; favorecer entrenadores si no compromete captura objetivo/curación/mejora decisiva.
- Mapa 1: normalmente solo una captura además del inicial. ~6 nodos de Pokéball en total como orientación.
- 1–3 combatientes fuertes + apoyos para rasgos. No sobrepriorizar tutores.
- Banda Focus antes que Caza Shiny si hubiera que elegir (comprobar primero si hay conflicto real; los amuletos no ocupan hueco).

**Navegador**
- Solo información visible (UI, accesibilidad, DOM mostrado). Nada de leer/modificar guardados internos o código para obtener ventaja.
- No borrar caché, cerrar sesión, cambiar de cuenta ni reiniciar con captura pendiente sin autorización.

## B. Excepciones temporales activas

- 2026-11-22: César pidió parar antes del Alto Mando y luego jugarlo con él (yo propongo orden, él decide). En Veneno 6 me pidió terminarlo yo («sigue tú»).
- 2026-11-22: diario Mono-Veneno con Tentacool: no salir del primer nodo hasta tener Gastly o Bulbasaur aurora (sin límite de 50 intentos); después ganar el desafío para registrarlo.

- 2026-11-21: búsqueda dirigida Heracross/Meditite aurora en el diario Mono-Lucha (Riolu ya conseguido). Con Heracross: su ataque se queda en nivel 1 (Mega, Skill Link).
- Ninguna otra activa más allá del objetivo de traspaso.
- Objetivo de traspaso (por defecto, si César no indica otro): **Squirtle aurora** en el desafío Agua con la línea Staryu/Starmie, si ese desafío o su partida siguen disponibles. Si no, preguntar solo esa decisión. Búsqueda dirigida → otro shiny/aurora no sustituye a Squirtle aurora.

## C. Objetivos históricos (NO vigentes salvo nueva orden)

Gible/Bagon/Axew aurora, Mawile, Ralts, Absol, Pawniard, Beldum, línea Bagon, Latias/Mega Latias, Aggron Mono-Acero. Solo contexto.

Histórico de traspaso (no verificado por este agente):
- Charmander aurora: registrado según el agente anterior (16/11/2026).
- Tentacool aurora: registrado según el agente anterior (17/11/2026, #072).
- Squirtle aurora: pendiente. Segunda búsqueda: 45 intentos confirmados sin éxito (Staryu shiny Nv5, Shiny Hunter, Big Pearl).
Verificar todo en el PC real antes de usarlo.

**Tierra / Groudon Primigenio (2026-11-23)**
- Meta de César: Groudon Primigenio = 50 victorias de desafío con Groudon como MVP (contador en Brazalete Mega, botón `btn-mega-nav`).
- Reliquias prioritarias Tierra: Roca Suave, Geostal Z, Disco Tierra, Banda Atadura + Cascabel Alivio, Servicio Raro, Incienso Acua. Groudon delante salvo contra voladores/Agua/Hielo.
- Cuando cambie el diario, seguir con el Desafío de Gimnasios normal usando Groudon (las victorias MVP en cualquier desafío cuentan).

**Volador / Mega-Rayquaza (2026-11-24)**
- Meta: Mega-Rayquaza = 50 victorias de desafío con Rayquaza MVP. Misma ley de primer nodo.
- En los mapas, Rayquaza va DETRÁS (la exp se reparte igual entre todos); delante solo en jefes. Si va delante en el mapa sin curas, cae y se queda atrás de nivel (Volador 9 y 13).
- Llegar a la Liga con Nv100+ (en Volador 7 se perdió contra Lance Nv140 con Nv78). Tutores/MT para Dragon Ascent pronto; Huevo Suerte o Caramelo Raro en Rayquaza.
- (César 2026-11-24) Prioridad máxima: conseguir el ataque fuerte (Dragon Ascent) cuanto antes con tutores y MT; elegir rutas con tutor. Con Dragon Ascent, Rayquaza va PRIMERO casi siempre (mapas y jefes). Excepción: Alto Mando, donde se decide por tipo. Si el Campeón lleva tipo Dragón, Rayquaza primero para que los dragones rivales no se hagan más fuertes con KOs.
- Campeones vistos con Volador: Lance (Johto, Dragón: Rayquaza 1º, hace falta Nv110+), Blue (Kanto: Scizor 1º contra Aerodactyl ganó en Volador 36; Pelipper/Gyarados 1º ganó en 11-12; Mantine 1º perdió), Cynthia (Sinnoh, Dragón: Rayquaza 1º), Diantha (Kalos, Dragón), Alder (Teselia), Steven (Hoenn: 3 Metagross; Dragon Ascent resistido; hace falta Fuego/Agua/Lucha fuertes y llegar con ellos vivos: no gastarlos contra Glacia). Kanto y Johto no curan entre combates del Alto Mando.
- Equipo ganador: Rayquaza + Fuego (Fletchling→Talonflame) + Agua (Ducklett→Swanna) + Roca (Aerodactyl) + Lucha (Hawlucha) + Siniestro (Vullaby). Steven (Acero) gana a equipos sin Fuego/Agua/Lucha.
- Rayquaza detrás en combates de mapa hasta tener Ascenso Draco y nivel; delante en jefes salvo contra Hielo.

## Mono-Psíquico con Abra (Mega-Alakazam), 2026-11-25
- Muy frágil al principio. Nodos de hierba (salvajes) muy peligrosos y solo dan +1 nivel: evitarlos (GRASSSC=0.3); entrenadores dan +2.
- CORREGIDO (Psíquico 8): Abra/Kadabra/Alakazam PRIMERO en mapas y gimnasios. Al final del orden no gana nivel y el resto cae; delante arrasa con la salpicadura y gana todo el nivel.
- Pasar siempre por Centro Pokémon antes del gimnasio (CENTERSC=15). Llevar 4+ Pokémon antes del gimnasio 2 (Bugsy Bicho / Whitney Normal).
- Liga de Hoenn (Sidney Siniestro): solo Agua/Lucha le hacen daño; Slowbro le ganó.

## Mono-Psíquico con Mewtwo (Mega-Mewtwo Y), 2026-11-25
- (César) Reliquia inicial SIEMPRE Teralito Psíquico (salpicadura −1 DEF esp.). Ley primer nodo: 20 intentos aurora nuevo, luego cualquier aurora/shiny.
- Mewtwo primero en mapas y gimnasios; tutores pronto (Psicorrayo→Psíquico→Onda Mental). En Alto Mando, por tipo (Acero: Fuego delante).
- Shiny/aurora/legendario cuentan doble para el rasgo Psíquico: al liberar, mantener T6 (12+).
- Psíquico-Mewtwo 1: victoria en Kalos (Diantha) con Mewtwo Nv83 MVP.
- Mewtwo 2-4: derrotas por nivel (Drake Hoenn; rival Hugh; Científico mapa 6). NO coger Cebo Legendario (quita entrenadores). No liberar shinies/auroras si baja el rasgo Psíquico. Evitar hierba con el equipo bajo.
- Cenizas Sagradas: en la pantalla «Elige tu Orden» del Alto Mando, clic en el objeto de la BOLSA y elegir el Pokémon debilitado.
- Mewtwo 6: perdida ante Karen (Siniestro). Para el Alto Mando, llevar SIEMPRE un atacante Hada/Lucha fuerte (Gardevoir/Gallade/Medicham) contra Siniestro.
- (César 2026-11-25) Centrarse en subir el máximo de nivel (rutas con más entrenadores, la hierba también suma) y en mejorar pronto el ataque de Mewtwo (tutores). Hada baja el ATK rival. Mewtwo 7 llegó a la Liga con Nv89 y casi gana a Blue.
- Mewtwo 9: NO encadenar hierba sin Centro en mapas 1-4 (equipo debilitado antes del gimnasio). La hierba vale para niveles solo si hay Centro después.
- Mewtwo 11 GANADA: sin objetos equipados + Incienso Puro (+60%), Porcehelado+Baya Arabol, Roca Lluvia. Mewtwo al final contra Karen y solo contra Lance.
- (Análisis de la partida de César, Mono-Psíquico Mewtwo, mapa 8 sin problemas) Equipo: Mewtwo + 5 shiny/aurora (Alakazam, Musharna, Espeon, Mr. Mime aurora, Chimecho) → rasgo Psíquico 12/14 T6 desde pronto, Hada T1; dos reliquias iniciales (borde turquesa); solo 2 objetos equipados. Nivel similar al mío (Nv74-77 en mapa 8): la diferencia NO es el nivel sino el T6 (60% de salpicadura) gracias a que todos son shiny/aurora (cuentan doble). REGLA: priorizar SIEMPRE shiny/aurora en capturas y eventos y sustituir a los normales por ellos; buscar T6 antes del mapa 5. Pokémon fuertes: Alakazam, Espeon, Musharna, Mr. Mime.
- (César, antes del gimnasio 8 Siniestro) Cambió Chimecho shiny por Gardevoir normal: Psíquico baja a 11/12 T5 pero Hada sube a 4/6 T2 (rivales −2 ATK y AT.ESP al empezar) CORRECCIÓN de César: el motivo es SOLO el rasgo Hada T2 (rivales −2 ATK y AT.ESP al inicio), no tener otro atacante: en el juego casi siempre solo importan 2-3 Pokémon del equipo (los que pelean); el resto está para los rasgos. Regla: los miembros de relleno se eligen por los rasgos que activan (Psíquico shiny/aurora, Hada hasta T2), no por su ataque.
- (César) Su run Mono-Psíquico solo cayó ante Steven (Campeón de Hoenn, 3 Metagross Acero/Psíquico): Psíquico y Hada no le hacen nada. Para Hoenn llevar cobertura anti-Acero dentro del tipo Psíquico: Fuego (Delphox, Victini), Tierra (Claydol con Tierra Viva/Fuerza Telúrica), Fantasma (Hoopa) o Siniestro (Malamar). Reservarlos (no gastarlos con Sidney/Glacia/Drake) y ponerlos delante contra Steven.

### Victoria Mewtwo 12 (Sinnoh, Cynthia) — receta
- Recuento de rasgos confirmado en UI: Mewtwo (legendario) cuenta 1, shiny 2, aurora 3. Con 5 shiny + Mewtwo = 11 (T5); para T6 hace falta al menos un aurora.
- Hada T1 desde el mapa 4 (Ralts→Gardevoir + Mr. Mime) aunque baje Psíquico a T4 un rato; luego un aurora (Slowbro) devolvió T5.
- Tabla Duende: en Gardevoir gana el gym 8 Siniestro; si Gardevoir cae en la Liga, pasarla a Mr. Mime en la pantalla «Elige tu Orden» (badge Restos → CAMBIAR en Gardevoir; badge Tabla → EQUIPAR en Mr. Mime).
- Cascabel Concha en Mewtwo: en Liga sin Centro se recupera del todo pegando (80 → 355 PS en un combate).
- Reliquias de bajadas: Baya Enigma + Roca Lluvia (+10% de daño por cada bajada) + Hada.

### Derrota Mewtwo 13 — lecciones
- Mega-Gardevoir (Megasinfonía) DESACTIVA el rasgo Psíquico: no equipar Gardevoirita en Mono-Psíquico.
- En mapas 6-7, los «?», Caballeros y Científicos van 20-25 niveles por encima: no encadenar más de 2 combates fuertes sin Centro; evitar «?» si no hay Centro justo después.
- Destello Inicial (el 1.º Pokémon cuenta como shiny): poner el relleno de Hada delante SOLO en gimnasios y Liga; en el mapa, Mewtwo delante.

## Desafío Bicho (César, 2026-11-25 noche)
- Inicial Scyther o Weedle (ambos aurora) hasta conseguir **Heracross aurora**; después usar Heracross con su ataque en nivel 1 (no mejorarlo con tutores: Mega/Skill Link).
- Misión: el máximo número de auroras posible. Ley del primer nodo: 20 intentos aurora nuevo, luego cualquier aurora/shiny.
- Tarea automática cada 2 h para reiniciar el navegador si se cierra por el límite.
