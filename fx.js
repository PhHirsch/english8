/* The Hirsch Games – Combo & Konfetti für die älteren Spiele (nur Optik).
   Wird NACH dem Spielskript eingebunden und hängt sich an fb(…, good) und mistake(). */
(function () {
  const css = `.fxc{position:fixed;left:50%;top:38%;transform:translate(-50%,-50%);font-size:54px;font-weight:900;color:#ffd23a;text-shadow:0 0 18px #ff8a2a,0 4px 0 #a04a00;pointer-events:none;z-index:60;animation:fxc 1s ease-out forwards;white-space:nowrap;font-family:Arial Black,Arial,sans-serif}
  @keyframes fxc{0%{transform:translate(-50%,-50%) scale(.3);opacity:0}25%{transform:translate(-50%,-50%) scale(1.15);opacity:1}100%{transform:translate(-50%,-120%) scale(1);opacity:0}}
  .fxf{position:fixed;width:10px;height:14px;top:40%;left:50%;z-index:59;pointer-events:none;border-radius:2px;animation:fxf 1.1s ease-out forwards}
  @keyframes fxf{to{transform:translate(var(--x),var(--y)) rotate(var(--r));opacity:0}}
  .fxb{position:fixed;right:12px;top:12px;z-index:58;background:rgba(0,0,0,.55);color:#ffb03a;font-weight:800;font-size:17px;padding:6px 12px;border-radius:20px;pointer-events:none;font-family:Arial,sans-serif;transition:transform .2s}
  .fxb.hot{color:#ff5a2a;text-shadow:0 0 8px #ff8a2a}.fxb.pop{transform:scale(1.25)}
  @media(max-width:560px){.fxc{font-size:36px}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const KEY = "fx-" + location.pathname + location.search;
  let D = { c: 0, b: 0 }; try { D = JSON.parse(sessionStorage.getItem(KEY)) || D; } catch (e) {}
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(D)); } catch (e) {} };
  const badge = document.createElement("div"); badge.className = "fxb"; document.body.appendChild(badge);
  const show = () => { badge.style.display = D.c >= 2 ? "block" : "none"; badge.textContent = "🔥 ×" + D.c; badge.className = "fxb" + (D.c >= 5 ? " hot" : ""); };
  function confetti(n) {
    const C = ["#ffd23a", "#ff4f8b", "#3ab0ff", "#3fd27a", "#ff8a2a", "#a05cf0"];
    for (let i = 0; i < n; i++) { const e = document.createElement("i"); e.className = "fxf";
      e.style.cssText = `background:${C[i % 6]};--x:${(Math.random() * 2 - 1) * 46}vw;--y:${(Math.random() * 1.2 - .3) * 50}vh;--r:${Math.random() * 720}deg;left:${45 + Math.random() * 10}%`;
      document.body.appendChild(e); setTimeout(() => e.remove(), 1200); }
  }
  let last = 0;
  function hit() {
    const now = Date.now(); if (now - last < 400) return; last = now;
    if (D.fin) D = { c: 0, b: 0 };
    D.c++; D.b = Math.max(D.b, D.c); save(); show();
    badge.classList.add("pop"); setTimeout(() => badge.classList.remove("pop"), 200);
    const c = D.c;
    if (c === 3 || c === 5 || (c % 5 === 0 && c >= 10)) {
      const el = document.createElement("div"); el.className = "fxc"; el.textContent = c >= 10 ? `🔥 ×${c} UNSTOPPABLE!` : c >= 5 ? `🔥 ×${c} ON FIRE!` : `🔥 ×${c} COMBO!`;
      document.body.appendChild(el); setTimeout(() => el.remove(), 1000); confetti(c >= 5 ? 40 : 22);
    }
  }
  function miss() { D.c = 0; save(); show(); }
  function reset() { D = { c: 0, b: 0 }; save(); show(); }
  window.FX = { hit, miss, reset, confetti, best: () => D.b };
  if (typeof window.fb === "function" && !window.FX_MANUAL) { const o = window.fb; window.fb = function (m, g) { o.apply(this, arguments); if (g) hit(); else if (typeof window.mistake !== "function") miss(); }; }
  if (typeof window.mistake === "function" && !window.FX_MANUAL) { const o = window.mistake; window.mistake = function () { o.apply(this, arguments); miss(); }; }
  if (window.E8 && E8.reportInto) { const o = E8.reportInto; E8.reportInto = function (elId, game, S) { const el = document.getElementById(elId);
    if (el && D.b >= 3 && !document.getElementById("fxbest")) el.insertAdjacentHTML("beforebegin", `<div id="fxbest" style="font-weight:800;color:#ffb03a;margin:8px 0">Best combo: 🔥 ×${D.b}</div>`);
    if (S && S.mistakes === 0) confetti(60);
    D.fin = 1; save();
    const r = o.apply(this, arguments); return r; }; }
  show();
})();
