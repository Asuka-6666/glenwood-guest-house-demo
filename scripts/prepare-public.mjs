import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const publicRoot = join(root, 'public');
const generatedImageRoot = join(publicRoot, 'image');
const sourceFiles = ['index.html', 'styles.css', 'script.js', 'site-config.js'];
const assetPattern = /image\/(?:[A-Za-z0-9_.-]+\/)*[A-Za-z0-9_.-]+\.(?:avif|gif|jpe?g|png|svg|webp)/gi;

rmSync(generatedImageRoot, { recursive: true, force: true });
mkdirSync(generatedImageRoot, { recursive: true });

const references = new Set();
for (const file of sourceFiles) {
  const contents = readFileSync(join(root, file), 'utf8');
  for (const match of contents.matchAll(assetPattern)) references.add(match[0].replaceAll('\\', '/'));
}

const assertExactCase = (reference) => {
  let current = root;
  for (const segment of reference.split('/')) {
    const exactEntry = readdirSync(current).find((entry) => entry === segment);
    if (!exactEntry) throw new Error(`Missing asset or path-case mismatch: ${reference}`);
    current = join(current, exactEntry);
  }
};

for (const reference of [...references].sort()) {
  assertExactCase(reference);
  const source = join(root, ...reference.split('/'));
  if (!existsSync(source)) throw new Error(`Missing referenced asset: ${reference}`);
  const destination = join(publicRoot, ...reference.split('/'));
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination);
}

console.log(`Prepared ${references.size} referenced image assets in public/image.`);
