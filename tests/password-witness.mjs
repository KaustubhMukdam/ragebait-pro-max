import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const source = await readFile(new URL('../js/modules/password_rules.js', import.meta.url), 'utf8');
const witness = source.match(/WITNESS_PASSWORD='([^']+)'/)[1];
const checks = [s=>s.length>=8,s=>/[A-Z]/.test(s),s=>/[a-z]/.test(s),s=>/[02468]/.test(s),s=>/[!]/.test(s),s=>s.includes('Rage'),s=>s.indexOf('2')>=0&&s.indexOf('2')<s.indexOf('6'),s=>/\d$/.test(s)];
assert.equal(checks.length,8); assert.ok(checks.every(fn=>fn(witness)), `Witness fails: ${witness}`); console.log(`PASS: ${witness} satisfies all ${checks.length} password rules.`);
