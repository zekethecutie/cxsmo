import { readFile } from "node:fs/promises";

for (const filename of process.argv.slice(2)) {
  const bytes = await readFile(filename);
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  console.log(`${filename}\t${width}x${height}`);
}
