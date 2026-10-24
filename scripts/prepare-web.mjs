import { createHash } from 'node:crypto';
import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

const root = process.cwd();
const source = path.join(root, 'web');
const output = path.join(root, '.build');
const site = path.join(output, 'site');
const partSize = 4 * 1024 * 1024;
const manifest = {};

async function listFiles(dir, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await listFiles(absolute, relative));
    else if (entry.isFile()) result.push({ absolute, relative });
  }
  return result;
}

await rm(output, { recursive: true, force: true });
await mkdir(site, { recursive: true });
for (const { absolute, relative } of await listFiles(source)) {
  const bytes = await readFile(absolute);
  const dest = path.join(site, relative);
  await mkdir(path.dirname(dest), { recursive: true });
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (bytes.length > partSize) {
    const chunks = [];
    for (let offset = 0, index = 0; offset < bytes.length; offset += partSize, index++) {
      const partRel = `__game_parts/${path.basename(relative)}.${String(index).padStart(3, '0')}.bin`;
      const partPath = path.join(site, partRel);
      await mkdir(path.dirname(partPath), { recursive: true });
      await writeFile(partPath, bytes.subarray(offset, Math.min(offset + partSize, bytes.length)));
      chunks.push(`/${partRel}`);
    }
    const type = relative.endsWith('.wasm') ? 'application/wasm' : 'application/octet-stream';
    manifest[`/${relative}`] = { parts: chunks, size: bytes.length, sha256, type };
  } else {
    await writeFile(dest, bytes);
  }
}
await writeFile(path.join(output, 'parts-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Prepared ${Object.keys(manifest).length} chunked asset(s) in .build/site`);
