// Checks the recorded Thai voice clips:
//  1. every Thai phrase in data.js has a clip
//  2. clip length is plausible for the text (catches cut-off or garbled clips)
//  3. speech recognition (Whisper) transcribes the clip back and compares with the intended text
// Writes tools/thai-check.json and prints the clips that need a human listen.
//   cd tools && npm i && node check-thai.mjs
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";
import { MPEGDecoder } from "mpg123-decoder";
import { pipeline } from "@huggingface/transformers";

const ROOT = new URL("../public/", import.meta.url);
const { spokenPhrases } = vm.runInNewContext(readFileSync(new URL("data.js", ROOT), "utf8") + "\n;({spokenPhrases})");
const index = JSON.parse(readFileSync(new URL("audio/index.json", ROOT), "utf8"));
const only = process.argv[2];   // optional: limit to phrases containing this text

const thai = [...new Set(spokenPhrases().filter(p => p[0] === "th").map(p => p[1]))].filter(t => !only || t.includes(only));
const missing = thai.filter(t => !index[`th|${t}`]);
console.log(`${thai.length} Thai phrases, ${missing.length} without a clip`);

const decoder = new MPEGDecoder(); await decoder.ready;
const decode = async file => {
  await decoder.reset();
  const { channelData, sampleRate } = decoder.decode(new Uint8Array(readFileSync(new URL("audio/" + file, ROOT))));
  const src = channelData[0], ratio = sampleRate / 16000, out = new Float32Array(Math.floor(src.length / ratio));
  for (let i = 0; i < out.length; i++) out[i] = src[Math.floor(i * ratio)];   // resample to 16 kHz for Whisper
  return { audio: out, sec: src.length / sampleRate };
};

const asr = await pipeline("automatic-speech-recognition", "onnx-community/whisper-large-v3-turbo", { dtype: { encoder_model: "q4", decoder_model_merged: "q4" } });
const norm = s => s.replace(/[\s!?,.'"“”~–\-ๆ]/g, "");
const lev = (a, b) => { const d = Array.from({ length: a.length + 1 }, (_, i) => [i]); for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length]; };

const rows = [];
for (const text of thai.filter(t => index[`th|${t}`])) {
  const { audio, sec } = await decode(index[`th|${text}`]);
  const heard = (await asr(audio, { language: "thai", task: "transcribe" })).text.trim();
  const a = norm(text), b = norm(heard), sim = 1 - lev(a, b) / Math.max(a.length, b.length, 1);
  const cps = a.length / sec;   // Thai characters per second; normal speech ≈ 4–12
  rows.push({ text, heard, sim: +sim.toFixed(2), sec: +sec.toFixed(2), cps: +cps.toFixed(1) });
  if (rows.length % 25 === 0) console.log(rows.length);
}
writeFileSync(new URL("thai-check.json", import.meta.url), JSON.stringify({ missing, rows }, null, 1));
const flagged = rows.filter(r => r.sim < .7 || r.cps < 2 || r.cps > 16).sort((a, b) => a.sim - b.sim);
console.log(`checked ${rows.length}, average match ${(rows.reduce((s, r) => s + r.sim, 0) / rows.length).toFixed(2)}, flagged ${flagged.length}`);
for (const r of flagged) console.log(`${r.sim}\t${r.sec}s\t${r.text}\t→ ${r.heard}`);
