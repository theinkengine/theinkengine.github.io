import { spawn } from "node:child_process";
import fs from "node:fs";

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const url = "file:///C:/Users/Leo/repositorios/theinkengine.github.io/index.html";
const port = 9336;
const out = "C:/Users/Leo/.local/share/opencode/tool-output";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const child = spawn(chrome, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars",
  `--remote-debugging-port=${port}`,
  "--user-data-dir=C:/Users/Leo/AppData/Local/Temp/opencode/cdp-prof-marquee",
  "--window-size=1440,1200", "about:blank",
]);

let id = 0;
let wsUrl = null;
for (let i = 0; i < 60; i++) {
  try {
    const list = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json());
    if (list.length) { wsUrl = list[0].webSocketDebuggerUrl; break; }
  } catch {}
  await sleep(200);
}
if (!wsUrl) throw new Error("no target");

const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r));
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise((res) => {
  const i = ++id;
  pending.set(i, res);
  ws.send(JSON.stringify({ id: i, method, params }));
});

console.error("target", wsUrl); await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url });
await sleep(3500); console.error("loaded");

console.error("shot1"); const shot1 = await send("Page.captureScreenshot", { format: "png" });
console.error("write1"); fs.writeFileSync(`${out}/qa-hero-tags.png`, Buffer.from(shot1.result.data, "base64"));

await send("Runtime.evaluate", {
  expression: `document.documentElement.style.scrollBehavior='auto'; const el=document.querySelector('.marquee'); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 300);`,
});
await sleep(800);

const shot2 = await send("Page.captureScreenshot", { format: "png" });
fs.writeFileSync(`${out}/qa-marquee.png`, Buffer.from(shot2.result.data, "base64"));

const info = await send("Runtime.evaluate", {
  expression: `JSON.stringify({hero:document.querySelector('.hero .eyebrow').textContent, spans:document.querySelectorAll('.marquee span').length, trackWidth:document.querySelector('.marquee__track').scrollWidth, view:innerWidth, height:document.querySelector('.hero .eyebrow').getBoundingClientRect().height, anim:getComputedStyle(document.querySelector('.marquee__track')).animationDuration})`,
  returnByValue: true,
});
console.log(info.result.result.value);

ws.close();
child.kill();
