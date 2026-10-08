// Pre-records every phrase Momo speaks with natural neural voices (Microsoft Edge TTS, free).
// Phrases come from spokenPhrases() in public/data.js, so the game and recordings never drift apart.
// Output: public/audio/<hash>.mp3 + public/audio/index.json ("lang|text" -> file).
// Re-run after adding words/phrases; existing files are skipped.
//   cd tools && npm i && node gen-audio.mjs
import { EdgeTTS } from "node-edge-tts";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync, unlinkSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = new URL("../public/", import.meta.url);
const OUT = new URL("audio/", ROOT);
mkdirSync(OUT, { recursive: true });
const { spokenPhrases } = vm.runInNewContext(readFileSync(new URL("data.js", ROOT), "utf8") + "\n;({spokenPhrases})");

// Child-friendly neural voices
const VOICES = {
  en: { voice: "en-US-AnaNeural", rate: "-8%", pitch: 0 },          // young girl voice
  zh: { voice: "zh-CN-XiaoyiNeural", rate: "-12%", pitch: 10 },     // lively, warm
  th: { voice: "th-TH-PremwadeeNeural", rate: "-8%", pitch: 15 },   // gentle, friendly
};

const jobs = new Map(); // key -> {lang,text,pitch}
for (const [lang, text, pitch] of spokenPhrases()) { const k = `${lang}|${text}`; if (!jobs.has(k)) jobs.set(k, { lang, text, pitch }); }

const fileOf = k => createHash("sha1").update(k).digest("hex").slice(0, 12) + ".mp3";
const index = {};
const todo = [...jobs].filter(([k]) => { index[k] = fileOf(k); const f = new URL(fileOf(k), OUT); return !(existsSync(f) && statSync(f).size > 500); });
console.log(`${jobs.size} phrases, ${todo.length} to record`);

let done = 0;
async function rec([k, { lang, text, pitch }]) {
  const v = VOICES[lang], path = fileURLToPath(new URL(fileOf(k), OUT)), hz = (pitch ?? v.pitch);
  for (let tryN = 1; tryN <= 4; tryN++) {
    try {
      await new EdgeTTS({ voice: v.voice, lang: v.voice.slice(0, 5), rate: v.rate, pitch: `${hz >= 0 ? "+" : ""}${hz}Hz`, timeout: 20000,
        outputFormat: "audio-24khz-48kbitrate-mono-mp3" }).ttsPromise(text, path);
      if (statSync(path).size > 500) { if (++done % 50 === 0) console.log(done); return; }
    } catch (e) { if (tryN === 4) console.warn("FAILED", k, e?.message || e); }
    try { unlinkSync(path); } catch {}
    await new Promise(r => setTimeout(r, 1000 * tryN));
  }
  delete index[k];
}
const queue = [...todo];
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) await rec(queue.shift()); }));
writeFileSync(new URL("index.json", OUT), JSON.stringify(index));
console.log(`done: ${Object.keys(index).length} files in index`);
// Remove clips no longer used by the game
import { readdirSync } from "node:fs";
const keep = new Set(Object.values(index));
for (const f of readdirSync(OUT)) if (f.endsWith(".mp3") && !keep.has(f)) unlinkSync(new URL(f, OUT));
