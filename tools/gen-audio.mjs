// Pre-records every phrase Momo speaks with natural neural voices (Microsoft Edge TTS, free).
// Output: public/audio/<hash>.mp3 + public/audio/index.json ("lang|text" -> file).
// Re-run after adding words/phrases; existing files are skipped.
//   cd tools && npm i && node gen-audio.mjs
import { EdgeTTS } from "node-edge-tts";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync, unlinkSync } from "node:fs";

const ROOT = new URL("../public/", import.meta.url);
const OUT = new URL("audio/", ROOT);
mkdirSync(OUT, { recursive: true });
const html = readFileSync(new URL("index.html", ROOT), "utf8");
const grab = name => Function(`return ${html.match(new RegExp(`const ${name}\\s*=\\s*(\\[[\\s\\S]*?\\n\\]|\\{[\\s\\S]*?\\n\\});`))[1]}`)();
const V = grab("V"), PETS = grab("PETS"), PET_PITCH = Function(`return ${html.match(/const PET_PITCH=(\{[^}]*\})/)[1]}`)();

// Child-friendly neural voices
const VOICES = {
  en: { voice: "en-US-AnaNeural", rate: "-8%", pitch: "+0Hz" },      // young girl voice
  zh: { voice: "zh-CN-XiaoyiNeural", rate: "-12%", pitch: "+10Hz" }, // lively, warm
  th: { voice: "th-TH-PremwadeeNeural", rate: "-5%", pitch: "+15Hz" },
};

const jobs = new Map(); // key -> {lang,text,pitch?}
const add = (lang, text, pitch) => { const k = `${lang}|${text}`; if (!jobs.has(k)) jobs.set(k, { lang, text, pitch }); };
const both = (en, zh) => { add("en", en); add("zh", zh); };

// Vocabulary
for (const w of Object.values(V).flat()) { add("en", String(w[1])); add("zh", w[2]); add("en", `${w[1][0]}, ${w[1]}`); }
// Fixed phrases
both("Try again", "再试试"); both("Hooray! You did it!", "太棒了!"); both("Whose shadow is this?", "这是谁的影子?");
both("How many?", "有几个?"); both("Which one is different?", "哪个不一样?"); both("What comes next?", "下一个是什么?");
add("en", "Yay!");
for (const t of ["ผ่านด่านก่อนหน้าก่อนนะ", "ครบแล้ว เก่งมาก", "เก็บดาวเพิ่มอีกนิดนะ", "3 ขวบ", "4 ขวบ", "5 ขวบ", "6 ขวบ"]) add("th", t);
// Buddy intros, each with its own pitch
for (const p of PETS) { const hz = `${Math.round(((PET_PITCH[p.id] || 1.15) - 1.1) * 120)}Hz`.replace(/^(\d)/, "+$1");
  add("en", p.en, hz); add("zh", p.zh, hz); }
// Basket: "Put N fruits in the basket" (same plural rule as the game)
const pl = (w, n) => n < 2 || /s$/.test(w) ? w : w.replace(/y$/, "ie") + "s";
for (const w of V.fruits) for (let n = 1; n <= 5; n++) both(`Put ${V.numbers[n - 1][1]} ${pl(w[1], n)} in the basket`, `请放${V.numbers[n - 1][2]}个${w[2]}`);
// Addition up to 10
for (let a = 1; a <= 9; a++) for (let b = 1; a + b <= 10; b++) {
  const qe = `${V.numbers[a - 1][1]} plus ${V.numbers[b - 1][1]}`, qz = `${V.numbers[a - 1][2]}加${V.numbers[b - 1][2]}`, s = V.numbers[a + b - 1];
  both(qe, qz); both(`${qe} is ${s[1]}`, `${qz}等于${s[2]}`);
}

const fileOf = k => createHash("sha1").update(k).digest("hex").slice(0, 12) + ".mp3";
const index = {};
const todo = [...jobs].filter(([k]) => { index[k] = fileOf(k); const f = new URL(fileOf(k), OUT); return !(existsSync(f) && statSync(f).size > 500); });
console.log(`${jobs.size} phrases, ${todo.length} to record`);

let done = 0;
async function rec([k, { lang, text, pitch }]) {
  const v = VOICES[lang], path = new URL(fileOf(k), OUT);
  for (let tryN = 1; tryN <= 4; tryN++) {
    try {
      await new EdgeTTS({ voice: v.voice, lang: v.voice.slice(0, 5), rate: v.rate, pitch: pitch || v.pitch, timeout: 20000,
        outputFormat: "audio-24khz-48kbitrate-mono-mp3" }).ttsPromise(text, path.pathname.slice(/^\/[A-Za-z]:/.test(path.pathname) ? 1 : 0));
      if (statSync(path).size > 500) { if (++done % 25 === 0) console.log(done); return; }
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
