# Friends Forever Arcade: Vendor Kit (Oct 2026)

Open-source libraries pulled from GitHub/npm. Each one is license-checked, tested, and repackaged as a drop-in `<script>` global, so it fits the arcade's current setup: Three.js r128 as a global, with no build step.

**Where it goes:** copy the `vendor/` folder into the site repo next to `shared/` and `arcade/`. Then deploy to Cloudflare Pages as usual.

## What's inside

| File | Global | What it unlocks | Size (gzip) | License |
|---|---|---|---|---|
| `vendor/cannon-es-0.20.0.min.js` | `CANNON` | Real 3D physics. Beer pong balls can bounce off cup rims, and mini golf gets ramps, walls and lips. | 36 KB | MIT |
| `vendor/rapier3d-compat-0.21.0.min.js` | `RAPIER` | Faster physics that is **deterministic**: the same shot gives the identical result on every phone. Use it only where every client must agree exactly. | 1.6 MB | Apache-2.0 |
| `vendor/ff-sfx-zzfx-1.4.0.min.js` | `FFSfx` | 13 arcade sounds that are synthesized live, so there are no audio files to load. | 3 KB | MIT |

Every file was smoke-tested before packaging:

- Rapier ran the same simulation twice and produced bit-identical results.
- Cannon settled a ball on a floor.
- All 13 sounds rendered without errors.

## Quick use

**Sounds** (works today, tiny):

```html
<script src="vendor/ff-sfx-zzfx-1.4.0.min.js"></script>
<script>
  // Inside the arcade's first tap handler. This shares its AudioContext so iOS unlocks audio once.
  FFSfx.useContext(ac());
  FFSfx.play('coin');            // click coin beep go jump punch boom cue clack splash putt win lose
  FFSfx.play('clack', 0.6, -0.4); // volume, stereo pan
</script>
```

To tweak a sound, paste its array from `src/ff-sfx.js` into the ZzFX designer (killedbyapixel.github.io/ZzFX). Copy the result back into the file, then rebuild with:

`npx esbuild src/ff-sfx.js --bundle --format=iife --minify --outfile=vendor/ff-sfx-zzfx-1.4.0.min.js`

**Cannon** (for beer pong and mini golf):

```js
const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
const ball = new CANNON.Body({ mass: 0.0027, shape: new CANNON.Sphere(0.02) });
world.addBody(ball);
// Each frame:
world.step(1/60, dt);
mesh.position.copy(ball.position);
```

**Rapier** (needs a one-time async init):

```js
await RAPIER.init();
const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
// Each frame:
world.step();
```

**Published claude.ai previews:** these bundles can be inlined. Alternatively, load the official builds from `cdn.jsdelivr.net/npm/...` with a module script.

## Pool realism: important license note

The most realistic open-source pool engine on GitHub is `tailuge/billiards`. It models cushion physics, spin, swerve and massé. However, it is **GPL-3.0** licensed. Copying its code into Friends Forever would legally require open-sourcing the whole site, so none of it is included here.

The physics it is built on comes from published research, and research results can't be copyrighted. That research covers:

- the Han (2005) cushion model,
- the transition from sliding to rolling friction,
- spin transfer between balls.

A pool upgrade can be written from those papers directly. A general engine like Cannon or Rapier would **not** make pool more realistic, because billiards needs specialized physics.

## Considered and skipped

- **Three.js r128 → r186 upgrade.** It would bring better lighting and performance, but it's a big migration across the whole arcade. Worth doing as its own project.
- **New multiplayer library.** The existing MQTT + Firebase layer already covers this.
- **Joystick and tween libraries.** The arcade already has its own.

`LICENSES/` holds the original license texts. `src/ZzFX.js` is ZzFX 1.4.0 with one change: the AudioContext is created lazily and can be shared, which makes it iPhone-friendly.
