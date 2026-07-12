// Deterministic seeded RNG for form generation (xmur3 hash -> mulberry32).
// Same seed string always yields the same stream, on any platform.

function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seedString) {
  const next = mulberry32(xmur3(seedString)());
  return {
    // integer in [min, max] inclusive
    int(min, max) {
      return min + Math.floor(next() * (max - min + 1));
    },
    pick(array) {
      return array[Math.floor(next() * array.length)];
    },
    shuffle(array) {
      const out = array.slice();
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    },
  };
}

// Short stable id from a string (for form IDs).
export function shortHash(str) {
  const h = xmur3(str)();
  return h.toString(36).padStart(7, '0');
}
