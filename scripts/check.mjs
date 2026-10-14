import { access, readFile, readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const requiredFiles = ['dist/index.html', 'dist/styles.css', 'dist/app.mjs', 'dist/domain.mjs'];

async function javascriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) result.push(...await javascriptFiles(path));
    else if (entry.isFile() && /\.(?:mjs|js)$/u.test(entry.name)) result.push(path);
  }
  return result;
}

try {
  for (const file of requiredFiles) await access(resolve(root, file));
  JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
  const files = [
    ...await javascriptFiles(resolve(root, 'dist')),
    ...await javascriptFiles(resolve(root, 'scripts')),
  ];
  for (const file of files) {
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(result.stderr || `Syntaksfejl i ${file}`);
  }
  console.log(`Kontrol OK: ${requiredFiles.length} appfiler findes, og ${files.length} JavaScript-filer har gyldig syntaks.`);
} catch (error) {
  console.error(`Kontrol fejlede: ${error.message}`);
  process.exitCode = 1;
}
