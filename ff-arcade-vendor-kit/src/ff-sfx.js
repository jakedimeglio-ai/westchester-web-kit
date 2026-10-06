// Friends Forever arcade sound pack, built on ZzFX (MIT, Frank Force).
// Every sound is synthesized at play time: no audio files to download.
// Tweak any preset at https://killedbyapixel.github.io/ZzFX/ and paste the array back in.
import { zzfx, ZZFX, ZZFXSound } from './ZzFX.js';

// Param order: volume, randomness, frequency, attack, sustain, release, shape, shapeCurve,
// slide, deltaSlide, pitchJump, pitchJumpTime, repeatTime, noise, modulation, bitCrush,
// delay, sustainVolume, decay, tremolo, filter
const PRESETS = {
  click:     [.5,,900,,.01,.03,1,,,,,,,,,,,.5],          // UI tap
  coin:      [,,1675,,.06,.24,1,1.82,,,837,.06],          // reward / points
  beep:      [,,880,,.08,.05,1],                          // countdown 3-2-1
  go:        [,,1320,,.12,.1,1],                          // countdown GO
  jump:      [,,320,,.07,.12,,1.6,9],                     // Free-For-All jump
  punch:     [1.5,.1,90,,.04,.2,4,2,-4,,,,,1.8,,.2],      // Free-For-All hit
  boom:      [2,.2,60,.02,.2,.6,4,,-1,,,,,2.5,,.4,.1,.5,.2], // KO / explosion
  cue:       [1,.05,180,.002,.01,.07,4,,,,,,,1.2,,,,.4],  // pool cue strike
  clack:     [.8,.05,1200,,.005,.03,1,3,,,,,,.3],         // ball-on-ball
  splash:    [1,.1,400,.01,.05,.25,4,,-2,,,,,2,,,,.5,.1], // beer pong cup sink
  putt:      [.7,.05,260,,.01,.05,1,2,,,,,,.4],           // mini golf putt
  win:       [1,,523,.02,.2,.3,1,,,,262,.08,.1],          // round won
  lose:      [,,330,.02,.15,.4,2,,-5],                    // round lost
};

// Pre-build samples once so playback has zero lag on iPhone.
const cache = {};
function play(name, volumeScale = 1, pan = 0) {
  const p = PRESETS[name];
  if (!p) return null;
  if (!cache[name]) cache[name] = new ZZFXSound([...p]); // copy: ZZFXSound mutates its input
  return cache[name].play(volumeScale, 1, 1, pan);
}

const FFSfx = { play, presets: PRESETS, zzfx, ZZFX, ZZFXSound,
  // Call once from the arcade's first tap so iOS unlocks audio, and to share its AudioContext.
  useContext(ctx) { ZZFX.audioContext = ctx; },
  setVolume(v) { ZZFX.volume = v; } };

window.FFSfx = FFSfx; window.zzfx = zzfx; window.ZZFX = ZZFX; window.ZZFXSound = ZZFXSound;
export default FFSfx;
