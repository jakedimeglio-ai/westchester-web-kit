# Game Kit v2 (Oct 2026)

Free 3D models, sounds and game libraries for the Friends Forever arcade, Castaways, and the future App Store game. Every item was tested in the same three.js version the arcade uses (r128). See `catalog.png` and `catalog-racing-kit.png` for a picture of every model.

## 1. 3D models (`models/`): 75 CC0 models by Kenney

CC0 means no rules at all: they're free for anything, including paid App Store games, and need no credit.

**What we changed:** the originals needed a separate texture file next to them. Each one has been rebuilt as a single self-contained `.glb`, so you can drop it anywhere, or embed it in a published page, and it just works. All 75 load in three.js r128.

| Folder | Highlights | Good for |
|---|---|---|
| `arena/` | **character-soldier** with **32 animations** (idle, walk, sprint, jump, crouch, sit, drive, die, pick-up, melee, kick, shoot, emotes), sword, spear, walls, columns, stairs, statue, trophy, tree | Player avatars for the arcade lobby and Castaways, Free-For-All arena pieces |
| `platformer/` | **character** (idle, walk, jump), coins, flag, platforms, bricks, clouds, grass | Coins/collectibles, a platformer mini game |
| `fps/` | **enemy-flying** (monster), two blasters, walls, platforms, clouds | Night monsters, a shooter mini game |
| `racing/` | 4 trucks + motorcycle, track pieces (straight, corner, bump, finish), forest/tent scenery | A racing mini game for the arcade |
| `city/` | 5 buildings, roads, intersections, lamp-post road, fountain, tree patches | Arcade street outside, city scenery |

**Using one animated character for several players:** load it once, then clone it with `THREE.SkeletonUtils.clone(gltf.scene)`, one clone per friend. Each clone plays its own animation. The demo does exactly this.

## 1b. Racing Kit (`models/racing-kit/`): 112 CC0 models by Kenney, for the kart racer

The kit contains:

- **Track:** straights, long straights, bumps, ramps, bridges, splits and crossings, pit lane, start line and starting grid.
- **Corners in 3 sizes:** each comes plain, with sand, with a red-and-white border, or with a wall.
- **Scenery:** 4 race cars, grandstands, pit garages and offices, tents, fences, rails, barriers, light towers, start lights, flags, billboards, pylons and trees.

**Fixed:** the original files stored their colors in the wrong color space, so every engine showed them faded (red barriers came out pink). All 112 were corrected, re-rendered and checked in three.js r128.

**Grid:** road tiles are 1×1 units. Corners are 1, 2 or 3 tiles wide, and long straights are 1×2. Tracks snap together on a grid.

**Scale for karts:** the race cars are 0.73 wide on a road that's 1 wide, so they're big for a kart track. Scale the whole track up (for example, 1 tile = 8 meters) and use our own karts.

## 2. Sounds (`sounds/`): 32 CC0 sound effects, converted to MP3

The originals were `.ogg` files, which iPhones don't reliably play, so they were converted to MP3.

- **platformer:** jump, land, fall, walking, coin, break
- **fps:** blaster, rapid-fire blaster, enemy attack, enemy hurt, enemy destroyed, weapon change, jumps, land, walking
- **racing:** engine, motorcycle engine, skid, impact
- **city:** place, remove and rotate sounds, toggle, plus a background **ambience** loop

These pair with the synthesized sound pack in `ff-arcade-vendor-kit/`. Use the MP3s for realistic sounds (engines, footsteps) and the synth pack for arcade beeps.

## 3. Libraries (`vendor/`)

| File | Global | What it's for |
|---|---|---|
| `simplex-noise-4.0.3-seeded.min.js` | `SimplexNoise` | **Terrain generation** (mountains, lakes, rivers). Every phone given the same seed builds the *identical* island, so the 4 players never need to send the map to each other. Tested: same seed → identical terrain. |
| `yuka-0.7.8.min.js` | `YUKA` | **Creature AI**: animals that wander and flee, monsters that chase and pursue, state machines (sleep → hunt at night), vision cones. Tested: a chaser closed a 5-meter gap in 3 seconds. |
| `three-r128-addons/` | `THREE.Sky`, `THREE.Water`, `THREE.SkeletonUtils` | Realistic sky with a sun, ocean with reflections and waves (plus its normal map), and character cloning. These are the exact r128 versions. |
| `stats-0.17.0.min.js` | `Stats` | An on-screen FPS meter for checking performance on the real iPhones. |
| `phaser-4.2.1.min.js` | `Phaser` | A full **2D game engine** for the App Store game idea (RimWorld-style colony sim or any top-down game): tilemaps, sprites, physics, touch input. |

Quick start:

```js
// Seeded island
const W = SimplexNoise.seeded(roomCode);           // same code -> same island on every phone
const height = (x, z) => W.noise2D(x * 0.01, z * 0.01) * 12 + W.noise2D(x * 0.05, z * 0.05) * 2;

// Monster that chases a player
const ai = new YUKA.EntityManager();
const monster = new YUKA.Vehicle(); monster.maxSpeed = 4;
monster.steering.add(new YUKA.PursuitBehavior(playerVehicle));
ai.add(monster);
// Each frame:
ai.update(dt);
monsterMesh.position.copy(monster.position);
```

## 4. Demo (`demos/island-demo.html`)

A sky, an ocean with moving reflections, a sand island, three players cloned from one character file and each playing a different animation, plus trees and a motorcycle. It's the look Castaways can build from.

Open it through a web server (Cloudflare, or GitHub Pages on this repo), not by double-clicking: browsers block local 3D model loading.

## Licenses

| Item | License |
|---|---|
| Kenney models, sounds and Racing Kit | **CC0**, public domain |
| Kenney starter-kit code | MIT |
| simplex-noise, alea, Yuka, stats.js, Phaser, three.js | MIT |

Original texts are in `LICENSES/`. Nothing requires on-screen credit.

## Considered and skipped

- **Mixamo characters.** Free to use in games, but not allowed to be re-shared in a public repo like this one.
- **Chiptune music packs from GitHub.** Most are covers of copyrighted songs.
- **Newer particle and effects libraries.** They need three.js r150+, so they're worth revisiting if the arcade ever upgrades from r128.
