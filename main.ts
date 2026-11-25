// honest-appliance-error-adec4450: the one line a washing machine shows
// when a single sock blocks its drain. This program writes that single
// line to /output/entry.txt, where the gate reads it.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The line: a washing machine, flat and put-upon, reports the honest fault —
// one sock has survived the wash, the spin, and 400 watts of engineering —
// and gives up, telling its owner to come and get it.
const LINE =
  'ERROR E04: Drain blocked by one sock. It survived the wash, the spin, and 400 watts of engineering. I am done. Come and get it.';

if (LINE.length < 1 || LINE.length > 200 || LINE.includes('\n') || LINE.trim().length === 0) {
  console.error('entry line is not a single non-blank line of 1-200 characters');
  process.exit(1);
}

// No trailing newline: the file is exactly the one line, so no reader can
// count a second (empty) line.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE);
console.log(`wrote ${LINE.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
