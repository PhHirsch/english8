/* Trading cards: jede Karte gehört fest zu einem Spiel – kein Zufall.
   Bekommen: mindestens 1 Stern · Gold: 3 Sterne · 👑: ohne Fehler (Flawless) · 🔥: Hard mode geschafft */
window.CROMOS = [
  { id: "one-ones", f: "🕵️", n: "The Camera Thief", c: "#2a3a5a", t: "Somebody stole a camera at Camden Market. Which one? The expensive one!", de: "aus The Camden Market Camera Case" },
  { id: "if-clauses", f: "👩🏽‍🚀", n: "Commander Lee", c: "#1a2a5a", t: "Captain of the spaceship Orion. If the oxygen runs out, she will stay calm.", de: "aus Mission Orion" },
  { id: "modals-time", f: "👩‍🔬", n: "Dr. Kowalski", c: "#4a3a1a", t: "Science teacher in Kansas. She built a time machine in the school basement.", de: "aus The Time Machine" },
  { id: "modals-storm", f: "🌪️", n: "Team Twister", c: "#3a4a5a", t: "The fastest storm chasers in Oklahoma. They must win – but they can't beat you!", de: "aus Storm Chasers" },
  { id: "final-u2", f: "🦬", n: "Big Bad Bison", c: "#6a2a0a", t: "The mascot of Westwood High. Now he is calm again – and he loves grammar.", de: "Endgegner Unit 2" },
  { id: "tele-1", f: "👩🏼", n: "Lena", c: "#2a5a5a", t: "15, from Höxter, exchange student in Ohio. Who sent the strange message?", de: "aus der Serie Exchange Year" },
  { id: "verbs", f: "🕹️", n: "Verb Blaster", c: "#3a0a6a", t: "An arcade machine from 1985. Go – went – gone … or GAME OVER!", de: "Arcade" },
  { id: "adv-24", f: "🦌", n: "The Christmas Stag", c: "#0f3a2a", t: "He only appears at Christmas. Merry Christmas and a Happy New Year!", de: "Adventskalender, Türchen 24" }
];
/* Vokabel-Bosse bekommen automatisch eine Karte */
(function () {
  const E = { tornado: "🌪️", robot: "🤖", ghost: "👻", bossy: "😠", slime: "🟢", manager: "💼", locker: "🗄️" };
  Object.values(window.VOCAB || {}).forEach(u => u.sections.forEach(s => window.CROMOS.splice(window.CROMOS.length - 3, 0, { id: s.id, f: E[s.boss] || "👾", n: s.bossName, c: "#4a1a5a", t: "Vocabulary boss: " + s.title + ". Beaten – the words are yours!", de: "Vokabel-Boss " + (s.part || "") })));
})();
window.cromoState = function (s, id) {
  const st = (s && s.stars) || {}, pf = (s && s.perfect) || [];
  return { got: (st[id] || 0) > 0, gold: (st[id] || 0) >= 3, crown: pf.indexOf(id) >= 0, hard: (st[id + "-hard"] || 0) > 0 };
};
window.cromoCard = function (c, s, big) {
  const k = cromoState(s, c.id), w = big ? 170 : 120;
  if (!k.got) return `<div class="cromo off" style="width:${w}px"><div class="cf">❓</div><div class="cn">???</div><div class="ct">${c.de}</div></div>`;
  return `<div class="cromo ${k.gold ? "gold" : ""}" style="width:${w}px;--c:${c.c}"><div class="cb">${k.crown ? "👑" : ""}${k.hard ? "🔥" : ""}</div><div class="cf">${c.f}</div><div class="cn">${c.n}</div><div class="ct">${c.t}</div></div>`;
};
window.CROMO_CSS = `.cromo{position:relative;flex:none;border-radius:12px;padding:10px 8px 8px;text-align:center;background:linear-gradient(160deg,var(--c,#333),#111);border:3px solid #ffffff33;box-shadow:0 6px 16px #0008;color:#fff}
  .cromo.gold{border-color:#ffd23a;background:linear-gradient(160deg,#ffd23a,var(--c,#333) 45%,#111);box-shadow:0 0 18px #ffd23a88,0 6px 16px #0008}
  .cromo.gold:before{content:"";position:absolute;inset:0;border-radius:9px;background:linear-gradient(120deg,transparent 30%,#ffffff44 45%,transparent 60%);background-size:250% 100%;animation:shine 2.6s linear infinite}
  @keyframes shine{from{background-position:150% 0}to{background-position:-100% 0}}
  .cromo.off{background:#1a1a22;border-style:dashed;color:#888}
  .cromo .cf{font-size:44px;line-height:1.2}
  .cromo .cn{font-weight:800;font-size:14px;margin-top:2px}
  .cromo .ct{font-size:11.5px;line-height:1.3;opacity:.85;margin-top:4px}
  .cromo .cb{position:absolute;top:4px;right:6px;font-size:15px}`;
