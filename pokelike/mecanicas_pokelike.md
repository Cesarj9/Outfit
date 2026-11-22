# Mecánicas Pokelike

Niveles de certeza: **UI** = descripción del juego leída por este agente · **HEREDADO** = traspaso del agente anterior (3.7.1, hasta 17/11/2026), no reverificado · **HIPÓTESIS**.

La tabla completa de reliquias/objetos (texto literal de la guía del juego, v3.7.1, 2026-11-20) está en `pokelike_db.json → objetos_reliquias`. Este archivo solo recoge lo que cambia decisiones.

## Verificado en la UI (2026-11-20, v3.7.1)
- Guía: 207 reliquias, 37 objetos equipables, 4 utilizables (Moon Stone, Rare Candy, Sacred Ash, TM).
- 18 cristales Z con requisito «Capstone: offered once 3 of your relics show <Tipo> and the <Tipo> trait is active».
- Amuletos sin hueco: Oval Charm («Charm: doesn't use a relic slot»), Shiny Hunter, Legend Lure; Dowsing Machine y Rotom Catalog se consumen al cogerlos.
- **Iron Ball cambió**: ahora es «Cursed relic from the Gym Challenge badge rules» (contradice el traspaso). No contar con ella como protección.
- Sacred Ash: restaura PS completos y revive (vivo o debilitado).
- Shiny Charm: completar Pokédex Gen 1 → dobla tasa shiny. Aurora Charm: completar las 721 → 1 de cada 5 shinies es aurora (en vez de 1 de 10).
- Poison Barb existe como reliquia (+2 acumulaciones al golpear) y como equipable (+40% daño Veneno y fuerza ataques Veneno). Clave = nombre + categoría + versión.
- PC: 313 líneas totales; Pokédex 721 (Gen 1 = 151).

## Heredado (pendiente de reverificar en partida)
- Experiencia: salvaje +1, entrenador +2, líder +2.
- Movimientos: captura mapa 1 → nivel 1; mapa 2+ → nivel 2; máximo 3.
- Aportación a rasgos: normal 1, shiny 2, aurora 3.
- Rasgos: Agua 2/4/6 → 33%/67%/100% con −1/−2/−3; Acero −15% por cada 2; Hada/Fuego ±1 por cada 2 al inicio; Volador +1 VEL por cada 2; Tierra −1 VEL por cada 2; Psíquico salpicadura 10% por cada 2; Siniestro crítico +25%/+50%; Roca 33%/67%; Planta 15%/30%; Normal +25%/+50% PS; Eléctrico 20%/40%; Hielo 12% congelar; Fantasma 15%/30% ejecución; Bicho 15%/30% nivel extra.
- Veneno: máx. 12 acumulaciones, 5% PS máx. por acumulación nominal, escalado por diferencia de nivel.
- Topes de estadísticas ±10.
- Liga: 4 Alto Mando + campeón, sin curación garantizada entre combates.
- Evoluciones vistas: Staryu→Starmie Nv36, Tentacool→Tentacruel ~Nv30.

## Estrategias que ganaron (ejemplos, no plantillas)
- **Agua (Starmie + Tentacruel aurora)**: Focus Sash, Lax Incense, Macho Brace, Grip Claw, Poisonium Z + Shiny Hunter; Restos en Starmie; Swampert de líder ante Eléctrico.
- **Fuego (Mega Houndoom)**: Dread Plate, Razor Claw, Salac Berry, Destiny Knot, Focus Sash. Derrota previa por Aerodactyl de Blue más rápido.
- **Hada (Mega Mawile aurora)**: Hard Stone, Soothe Bell, Poison Barb, Damp Rock, Light Clay.

## Lecciones Mono-Veneno (2026-11-22, revisión con César)
- César: las reliquias (pasivas) no estaban bien elegidas en Veneno 5 (Incienso Duplo, Incienso Suave, Gafas Especiales, Baya Aranja, Lazo Destino) → perdimos ante la Campeona Nv135-140.
- HIPÓTESIS a probar: el daño por veneno es % de PS máx. y no depende del nivel; priorizar reliquias que multiplican el veneno: Tabla Tóxica (×2 veneno), Brazal Firme (2 golpes → doble de acumulaciones), Venenostal Z (el veneno se propaga al caer un rival), Garra Garfio, Toxisfera; y subir el rasgo Veneno (T7-T8) con más shiny/aurora Veneno.
- Incienso Suave reduce también nuestro daño directo a la mitad: útil para sobrevivir, pero sin multiplicadores de veneno no remata a los Campeones.
