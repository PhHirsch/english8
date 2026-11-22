/* English 8 – Login, Münzen, Avatar (gemeinsam für alle Spiele) */
(function () {
  // Web-App-URL aus Google Apps Script (Bereitstellung). Leer = ohne Login.
  const API_URL = "/*API_URL*/";

  const CATALOG = /*CATALOG*/;
  const SLOTS = [["skin", "Skin"], ["hair", "Hair"], ["top", "Clothes"], ["hat", "Hats"], ["glasses", "Glasses"], ["acc", "Extras"], ["bg", "Backgrounds"]];
  const DEFAULT = { skin: "skin1", hair: "hair-brown", top: "top-tshirt", hat: "hat-none", glasses: "gl-none", acc: "acc-none", bg: "bg-plain" };
  const SKEY = "e8session", MAXAGE = 90 * 60 * 1000;

  function getSession() {
    try {
      const s = JSON.parse(sessionStorage.getItem(SKEY));
      if (s && Date.now() - s.t < MAXAGE) return s;
      sessionStorage.removeItem(SKEY);
    } catch (e) {}
    return null;
  }
  function setSession(s) { s.t = Date.now(); try { sessionStorage.setItem(SKEY, JSON.stringify(s)); } catch (e) {} }
  function logout() { try { sessionStorage.removeItem(SKEY); } catch (e) {} }

  async function api(action, data) {
    if (!API_URL || API_URL.indexOf("/*") === 0) return { ok: false, error: "offline" };
    try {
      const r = await fetch(API_URL, { method: "POST", body: JSON.stringify(Object.assign({ action: action }, data)) });
      return await r.json();
    } catch (e) { return { ok: false, error: "network" }; }
  }
  async function login(nr, pin) {
    const r = await api("login", { nr: String(nr).trim(), pin: String(pin).trim() });
    if (r.ok) setSession({ nr: String(nr).trim(), pin: String(pin).trim(), state: r.state });
    return r;
  }
  async function call(action, extra) {
    const s = getSession();
    if (!s) return { ok: false, error: "nologin" };
    const r = await api(action, Object.assign({ nr: s.nr, pin: s.pin }, extra || {}));
    if (r.ok && r.state) { s.state = r.state; setSession(s); }
    if (r.error === "login" || r.error === "locked") logout();
    return r;
  }
  function errText(e) {
    return ({
      offline: "Login is not set up yet. – Login ist noch nicht eingerichtet.",
      network: "No connection. Try again. – Keine Verbindung, versuch es nochmal.",
      login: "Wrong number or PIN. – Nummer oder PIN falsch.",
      locked: "Too many wrong tries. Wait 5 minutes. – Zu viele Fehlversuche, warte 5 Minuten.",
      coins: "Not enough coins. – Nicht genug Münzen.",
      nologin: "Please log in on the start page. – Bitte auf der Startseite anmelden.",
      server: "Server error. Try again. – Serverfehler, versuch es nochmal."
    })[e] || ("Error: " + e);
  }

  /* Ergebnis am Ende eines Spiels melden und anzeigen */
  function reportInto(elId, game, S, save) {
    const box = document.getElementById(elId);
    if (!box) return;
    if (!API_URL || API_URL.indexOf("/*") === 0) { box.style.display = "none"; return; }
    const se = getSession();
    const show = r => {
      let t = `<div style="font-size:24px;font-weight:700">+${r.earned} 🪙</div>`;
      t += `<div>${"⭐".repeat(r.stars)}${"☆".repeat(3 - r.stars)} · You have <b>${r.state.coins} 🪙</b> now.</div>`;
      if (!r.first && !r.improved) t += `<div style="font-size:14px;opacity:.75">Played before: fewer coins. Get more stars for more coins! – Wiederholung: weniger Münzen, mehr Sterne bringen mehr.</div>`;
      if (r.improved) t += `<div style="font-size:14px;opacity:.75">New best! – Neuer Rekord!</div>`;
      box.innerHTML = t;
    };
    if (!se) { box.innerHTML = "🪙 Log in on the start page to earn coins. <div style='font-size:14px;opacity:.75'>Melde dich auf der Startseite an, um Münzen zu sammeln.</div>"; return; }
    if (S.reportedResult) { show(S.reportedResult); return; }
    box.textContent = "Saving your coins … 🪙";
    call("result", { game: game, mistakes: S.mistakes }).then(r => {
      if (r.ok) { S.reportedResult = r; save(); show(r); }
      else box.innerHTML = "⚠️ " + errText(r.error) + " <button onclick='location.reload()' style='font-size:16px'>Try again</button>";
    });
  }

  /* ---------- Avatar ---------- */
  const SKIN = { skin1: "#f3d1b5", skin2: "#e0ac84", skin3: "#c68a5e", skin4: "#8d5a3b", skin5: "#5c3a24" };
  const HAIR = { "hair-brown": "#5a3a1e", "hair-black": "#1d1a18", "hair-blonde": "#e0b851", "hair-red": "#b5522a", "hair-blue": "#3a7bd5", "hair-pink": "#e86fb0", "hair-green": "#3fae5a" };
  const TOPC = { "top-tshirt": "#9aa3ad", "top-hoodie": "#2f5fb3", "top-football": "#d23b3b", "top-detective": "#b8935a", "top-tux": "#1f1f24", "top-space": "#eef1f5" };
  function star(cx, cy, r) {
    let p = [];
    for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; p.push((cx + rr * Math.cos(a)).toFixed(1) + "," + (cy + rr * Math.sin(a)).toFixed(1)); }
    return p.join(" ");
  }
  function avatarSVG(eq) {
    eq = Object.assign({}, DEFAULT, eq || {});
    const sk = SKIN[eq.skin] || SKIN.skin1, hr = HAIR[eq.hair] || HAIR["hair-brown"], tc = TOPC[eq.top] || TOPC["top-tshirt"];
    let s = "";
    // background
    switch (eq.bg) {
      case "bg-london": s += `<rect width="120" height="165" fill="#a9d3f5"/><rect y="140" width="120" height="25" fill="#6b8f5a"/><rect x="6" y="34" width="18" height="110" fill="#b39a6b"/><polygon points="5,34 15,14 25,34" fill="#7d6a4f"/><circle cx="15" cy="48" r="6" fill="#fff" stroke="#5a4a30" stroke-width="1.5"/><rect x="92" y="112" width="28" height="30" rx="3" fill="#c8312b"/><rect x="95" y="116" width="8" height="7" fill="#cfe8ff"/><rect x="106" y="116" width="8" height="7" fill="#cfe8ff"/><rect x="95" y="127" width="8" height="7" fill="#cfe8ff"/><rect x="106" y="127" width="8" height="7" fill="#cfe8ff"/>`; break;
      case "bg-beach": s += `<rect width="120" height="165" fill="#8fd3f4"/><circle cx="100" cy="22" r="12" fill="#ffd34d"/><rect y="92" width="120" height="30" fill="#2f8fd8"/><path d="M0 98 Q15 94 30 98 T60 98 T90 98 T120 98" stroke="#bfe6ff" stroke-width="2" fill="none"/><rect y="120" width="120" height="45" fill="#f1d28c"/>`; break;
      case "bg-space": s += `<rect width="120" height="165" fill="#0b1030"/>` + [[10, 12], [30, 40], [100, 60], [80, 14], [14, 90], [108, 120], [20, 140], [95, 100], [50, 8]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="1.3" fill="#fff"/>`).join("") + `<circle cx="98" cy="30" r="11" fill="#c77dff"/><ellipse cx="98" cy="30" rx="18" ry="4" fill="none" stroke="#f0d0ff" stroke-width="2"/>`; break;
      case "bg-gold": s += `<rect width="120" height="165" fill="#e8b923"/><rect width="120" height="165" fill="#fff3" /><polygon points="${star(16, 20, 7)}" fill="#fff8"/><polygon points="${star(104, 40, 6)}" fill="#fff8"/><polygon points="${star(14, 120, 5)}" fill="#fff8"/><polygon points="${star(106, 140, 7)}" fill="#fff8"/>`; break;
      default: s += `<rect width="120" height="165" fill="#2b3448"/>`;
    }
    // legs
    s += `<rect x="47" y="112" width="11" height="34" fill="#2b3550"/><rect x="62" y="112" width="11" height="34" fill="#2b3550"/>`;
    s += `<ellipse cx="51" cy="147" rx="9" ry="5" fill="#222"/><ellipse cx="69" cy="147" rx="9" ry="5" fill="#222"/>`;
    if (eq.acc === "acc-skate") s += `<rect x="30" y="151" width="60" height="6" rx="3" fill="#e2553a"/><circle cx="40" cy="160" r="3.5" fill="#333"/><circle cx="80" cy="160" r="3.5" fill="#333"/>`;
    // arms + torso
    s += `<rect x="28" y="76" width="11" height="34" rx="5" fill="${tc}"/><rect x="81" y="76" width="11" height="34" rx="5" fill="${tc}"/>`;
    s += `<circle cx="33.5" cy="112" r="5" fill="${sk}"/><circle cx="86.5" cy="112" r="5" fill="${sk}"/>`;
    if (eq.top === "top-detective") s += `<rect x="36" y="72" width="48" height="64" rx="8" fill="${tc}"/><rect x="36" y="100" width="48" height="5" fill="#6b4f2a"/><path d="M50 72 L60 92 L70 72" stroke="#8a6c3e" stroke-width="3" fill="none"/>`;
    else s += `<rect x="37" y="72" width="46" height="46" rx="10" fill="${tc}"/>`;
    if (eq.top === "top-hoodie") s += `<rect x="47" y="100" width="26" height="12" rx="4" fill="#264d93"/><line x1="54" y1="74" x2="54" y2="88" stroke="#fff" stroke-width="1.5"/><line x1="66" y1="74" x2="66" y2="88" stroke="#fff" stroke-width="1.5"/>`;
    if (eq.top === "top-football") s += `<path d="M52 72 Q60 80 68 72" stroke="#fff" stroke-width="3" fill="none"/><text x="60" y="106" font-size="20" font-weight="700" fill="#fff" text-anchor="middle" font-family="Arial">8</text>`;
    if (eq.top === "top-tux") s += `<polygon points="52,72 68,72 60,98" fill="#fff"/><polygon points="54,76 60,79 54,82" fill="#c8312b"/><polygon points="66,76 60,79 66,82" fill="#c8312b"/><circle cx="60" cy="88" r="1.3" fill="#222"/><circle cx="60" cy="93" r="1.3" fill="#222"/>`;
    if (eq.top === "top-space") s += `<rect x="49" y="84" width="22" height="14" rx="3" fill="#3a6fd8"/><circle cx="54" cy="91" r="2" fill="#ff5a5a"/><circle cx="60" cy="91" r="2" fill="#ffd34d"/><circle cx="66" cy="91" r="2" fill="#4cff9a"/><rect x="28" y="96" width="11" height="4" fill="#3a6fd8"/><rect x="81" y="96" width="11" height="4" fill="#3a6fd8"/>`;
    if (eq.acc === "acc-guitar") s += `<rect x="91" y="66" width="5" height="40" fill="#6b4423"/><rect x="89.5" y="60" width="8" height="8" rx="1" fill="#3b2410"/><ellipse cx="94" cy="118" rx="13" ry="16" fill="#c0782f"/><ellipse cx="94" cy="110" rx="9" ry="9" fill="#d68b3c"/><circle cx="94" cy="118" r="4" fill="#3b2410"/>`;
    // head
    s += `<rect x="54" y="64" width="12" height="10" fill="${sk}"/><circle cx="40" cy="50" r="4" fill="${sk}"/><circle cx="80" cy="50" r="4" fill="${sk}"/><circle cx="60" cy="48" r="20" fill="${sk}"/>`;
    s += `<path d="M40 47 Q39 26 60 26 Q81 26 80 47 Q74 35 60 36 Q46 35 40 47 Z" fill="${hr}"/>`;
    s += `<circle cx="53" cy="50" r="2.2" fill="#222"/><circle cx="67" cy="50" r="2.2" fill="#222"/><path d="M53 57 Q60 62 67 57" stroke="#6a3a2a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    // glasses
    if (eq.glasses === "gl-round") s += `<circle cx="53" cy="50" r="5.5" fill="rgba(255,255,255,.25)" stroke="#111" stroke-width="1.8"/><circle cx="67" cy="50" r="5.5" fill="rgba(255,255,255,.25)" stroke="#111" stroke-width="1.8"/><line x1="58.5" y1="50" x2="61.5" y2="50" stroke="#111" stroke-width="1.8"/>`;
    if (eq.glasses === "gl-sun") s += `<rect x="45" y="46" width="13" height="8" rx="2" fill="#111"/><rect x="62" y="46" width="13" height="8" rx="2" fill="#111"/><line x1="58" y1="49" x2="62" y2="49" stroke="#111" stroke-width="2"/>`;
    if (eq.glasses === "gl-star") s += `<polygon points="${star(53, 50, 8)}" fill="#ffd23f" stroke="#c99a00" stroke-width="1"/><polygon points="${star(67, 50, 8)}" fill="#ffd23f" stroke="#c99a00" stroke-width="1"/>`;
    // hats
    if (eq.hat === "hat-cap") s += `<path d="M39 42 Q39 23 60 23 Q81 23 81 42 Z" fill="#d33a3a"/><rect x="70" y="38" width="22" height="5" rx="2" fill="#b02c2c"/>`;
    if (eq.hat === "hat-beanie") s += `<path d="M39 42 Q39 20 60 20 Q81 20 81 42 Z" fill="#2a9d8f"/><rect x="38" y="37" width="44" height="7" rx="3" fill="#21867a"/><circle cx="60" cy="19" r="5" fill="#fff"/>`;
    if (eq.hat === "hat-cowboy") s += `<path d="M44 37 Q44 15 60 18 Q76 15 76 37 Z" fill="#a0692f"/><rect x="44" y="31" width="32" height="4" fill="#5a3a1e"/><ellipse cx="60" cy="37" rx="34" ry="6" fill="#8b5a2b"/>`;
    if (eq.hat === "hat-detective") s += `<path d="M41 37 Q43 17 60 17 Q77 17 79 37 Z" fill="#7d6a4f"/><rect x="42" y="31" width="36" height="4" fill="#3e3326"/><ellipse cx="60" cy="37" rx="28" ry="5" fill="#6b5a43"/>`;
    if (eq.hat === "hat-crown") s += `<polygon points="42,38 42,20 51,30 60,15 69,30 78,20 78,38" fill="#f2c230" stroke="#c79a10" stroke-width="1.5"/><circle cx="60" cy="31" r="2.5" fill="#d33a3a"/><circle cx="49" cy="33" r="2" fill="#3a7bd5"/><circle cx="71" cy="33" r="2" fill="#3fae5a"/>`;
    if (eq.acc === "acc-headphones") s += `<path d="M37 50 Q37 21 60 21 Q83 21 83 50" stroke="#222" stroke-width="4" fill="none"/><rect x="32" y="43" width="9" height="15" rx="3" fill="#e2553a"/><rect x="79" y="43" width="9" height="15" rx="3" fill="#e2553a"/>`;
    if (eq.acc === "acc-cat") s += `<path d="M108 150 Q118 138 112 128" stroke="#f08a24" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="151" rx="12" ry="8" fill="#f08a24"/><circle cx="90" cy="139" r="8" fill="#f08a24"/><polygon points="84,134 85,125 90,132" fill="#f08a24"/><polygon points="96,134 95,125 90,132" fill="#f08a24"/><circle cx="87.5" cy="139" r="1.3" fill="#222"/><circle cx="92.5" cy="139" r="1.3" fill="#222"/>`;
    return `<svg viewBox="0 0 120 165" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto">${s}</svg>`;
  }

  window.E8 = { CATALOG: CATALOG, SLOTS: SLOTS, DEFAULT: DEFAULT, getSession: getSession, login: login, logout: logout, call: call, errText: errText, reportInto: reportInto, avatarSVG: avatarSVG, item: id => CATALOG.find(i => i.id === id), online: () => !!API_URL && API_URL.indexOf("/*") !== 0 };
})();
