// Downloads Twemoji SVGs (CC BY 4.0) for every emoji used in the game, so pictures look the same on
// every device and are served from our own site (works offline, no third-party requests).
// Output: public/emoji/<codepoints>.svg + public/emoji/index.json (list of available codes).
//   cd tools && node fetch-emoji.mjs
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";

const ROOT = new URL("../public/", import.meta.url);
const OUT = new URL("emoji/", ROOT);
mkdirSync(OUT, { recursive: true });
const SRC = "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/";
// Same rules as the game (index.html): emoji sequence → Twemoji file name
const EMOJI_RE = /\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic}️?|[\u{1F3FB}-\u{1F3FF}])*/gu;
const codeOf = e => [...(e.includes("‍") ? e : e.replace(/️/g, ""))].map(c => c.codePointAt(0).toString(16)).join("-");

const text = ["data.js", "index.html"].map(f => readFileSync(new URL(f, ROOT), "utf8")).join("\n");
const codes = [...new Set([...text.matchAll(EMOJI_RE)].map(m => codeOf(m[0])))];
console.log(`${codes.length} emoji found`);

const ok = [];
await Promise.all(codes.map(async code => {
  const file = new URL(`${code}.svg`, OUT);
  if (existsSync(file)) { ok.push(code); return; }
  const r = await fetch(SRC + code + ".svg").catch(() => null);
  if (r?.ok) { writeFileSync(file, await r.text()); ok.push(code); }
  else console.warn("no twemoji for", code, String.fromCodePoint(...code.split("-").map(h => parseInt(h, 16))));
}));
writeFileSync(new URL("index.json", OUT), JSON.stringify(ok.sort()));
for (const f of readdirSync(OUT)) if (f.endsWith(".svg") && !ok.includes(f.slice(0, -4))) unlinkSync(new URL(f, OUT));
console.log(`done: ${ok.length} pictures`);
