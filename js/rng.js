/**
 * rng.js — seeded randomness. AGENTS.md hard constraint 4:
 * every random behavior in this project must come from here so
 * the chaos is reproducible (same seed -> same shuffle/dodge/roll).
 */

/** Default seed: fixed forever ("RAGE" in hex-ish style). */
export const DEFAULT_SEED = 0x7ea5beef;

/**
 * mulberry32 PRNG.
 * @param {number} seed
 * @returns {{
 *   seed: number,
 *   next: () => number,                 // float in [0, 1)
 *   int: (min: number, max: number) => number, // inclusive
 *   pick: <T>(arr: T[]) => T,
 *   shuffle: <T>(arr: T[]) => T[],      // new array, Fisher-Yates
 *   roll: (sides?: number) => number    // 1..sides
 * }}
 */
export function createRng(seed = DEFAULT_SEED) {
  let s = seed >>> 0;

  const next = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const int = (min, max) => Math.floor(next() * (max - min + 1)) + min;

  const pick = (arr) => arr[int(0, arr.length - 1)];

  const shuffle = (arr) => {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = int(0, i);
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };

  const roll = (sides = 6) => int(1, sides);

  return { seed, next, int, pick, shuffle, roll };
}
