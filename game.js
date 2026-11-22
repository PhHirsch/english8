/* English 8 – Login, Münzen, Avatar (gemeinsam für alle Spiele) */
(function () {
  // Web-App-URL aus Google Apps Script (Bereitstellung). Leer = ohne Login.
  const API_URL = "https://script.google.com/macros/s/AKfycbxmdoTnQaLougRUL6RqSAfwHywTgxVepUnJqXu5vbe4-iJRGgpqnSqLb0wHZWQfzi0/exec";

  const CATALOG = [{"id": "skin1", "slot": "skin", "name": "Tone 1", "price": 0, "color": "#f6d7c3"}, {"id": "skin2", "slot": "skin", "name": "Tone 2", "price": 0, "color": "#eec1a0"}, {"id": "skin3", "slot": "skin", "name": "Tone 3", "price": 0, "color": "#d9a177"}, {"id": "skin4", "slot": "skin", "name": "Tone 4", "price": 0, "color": "#b97d53"}, {"id": "skin5", "slot": "skin", "name": "Tone 5", "price": 0, "color": "#8d5a3b"}, {"id": "skin6", "slot": "skin", "name": "Tone 6", "price": 0, "color": "#5c3a24"}, {"id": "eye-brown", "slot": "eyes", "name": "Brown", "price": 0, "color": "#6b4428"}, {"id": "eye-dark", "slot": "eyes", "name": "Dark brown", "price": 0, "color": "#3a2416"}, {"id": "eye-blue", "slot": "eyes", "name": "Blue", "price": 0, "color": "#3c7fc4"}, {"id": "eye-green", "slot": "eyes", "name": "Green", "price": 0, "color": "#4f8a4a"}, {"id": "eye-grey", "slot": "eyes", "name": "Grey", "price": 0, "color": "#7c8a96"}, {"id": "lash-off", "slot": "lashes", "name": "Simple", "price": 0}, {"id": "lash-on", "slot": "lashes", "name": "Lashes", "price": 0}, {"id": "hs-short", "slot": "hairstyle", "name": "Short", "price": 0, "kind": "short"}, {"id": "hs-buzz", "slot": "hairstyle", "name": "Buzz cut", "price": 0, "kind": "buzz"}, {"id": "hs-curly", "slot": "hairstyle", "name": "Curly", "price": 0, "kind": "curly"}, {"id": "hs-bob", "slot": "hairstyle", "name": "Bob", "price": 0, "kind": "bob"}, {"id": "hs-long", "slot": "hairstyle", "name": "Long", "price": 0, "kind": "long"}, {"id": "hs-ponytail", "slot": "hairstyle", "name": "Ponytail", "price": 0, "kind": "ponytail"}, {"id": "hs-bun", "slot": "hairstyle", "name": "Bun", "price": 0, "kind": "bun"}, {"id": "hs-braids", "slot": "hairstyle", "name": "Braids", "price": 0, "kind": "braids"}, {"id": "hc-black", "slot": "haircolor", "name": "Black", "price": 0, "color": "#1e1915"}, {"id": "hc-darkbrown", "slot": "haircolor", "name": "Dark brown", "price": 0, "color": "#3b2618"}, {"id": "hc-brown", "slot": "haircolor", "name": "Brown", "price": 0, "color": "#6b4226"}, {"id": "hc-lightbrown", "slot": "haircolor", "name": "Light brown", "price": 0, "color": "#9a6a40"}, {"id": "hc-blonde", "slot": "haircolor", "name": "Blonde", "price": 0, "color": "#d9b45c"}, {"id": "hc-ginger", "slot": "haircolor", "name": "Ginger", "price": 0, "color": "#b9562a"}, {"id": "hc-blue", "slot": "haircolor", "name": "Blue", "price": 150, "color": "#3a78d8"}, {"id": "hc-pink", "slot": "haircolor", "name": "Pink", "price": 150, "color": "#e66aa8"}, {"id": "hc-purple", "slot": "haircolor", "name": "Purple", "price": 150, "color": "#8a5cd0"}, {"id": "hc-green", "slot": "haircolor", "name": "Green", "price": 150, "color": "#3fa86a"}, {"id": "hc-silver", "slot": "haircolor", "name": "Silver", "price": 200, "color": "#c9ced6"}, {"id": "hc-rainbow", "slot": "haircolor", "name": "Rainbow ✨", "price": 800, "color": "#e66aa8", "fx": "rainbow"}, {"id": "top-tshirt-white", "slot": "top", "name": "White T-shirt", "price": 0, "kind": "tshirt", "color": "#f2f2f0"}, {"id": "top-tshirt-navy", "slot": "top", "name": "Navy T-shirt", "price": 40, "kind": "tshirt", "color": "#2d3e66"}, {"id": "top-tshirt-red", "slot": "top", "name": "Red T-shirt", "price": 40, "kind": "tshirt", "color": "#cf3b3b"}, {"id": "top-tshirt-yellow", "slot": "top", "name": "Yellow T-shirt", "price": 40, "kind": "tshirt", "color": "#f0c03a"}, {"id": "top-hoodie-grey", "slot": "top", "name": "Grey hoodie", "price": 60, "kind": "hoodie", "color": "#8d939c"}, {"id": "top-hoodie-pink", "slot": "top", "name": "Pink hoodie", "price": 70, "kind": "hoodie", "color": "#e86aa6"}, {"id": "top-hoodie-green", "slot": "top", "name": "Green hoodie", "price": 70, "kind": "hoodie", "color": "#3f9a6e"}, {"id": "top-hoodie-black", "slot": "top", "name": "Black hoodie", "price": 80, "kind": "hoodie", "color": "#2a2b30"}, {"id": "top-sweater-purple", "slot": "top", "name": "Purple jumper", "price": 90, "kind": "sweater", "color": "#7e5cc4"}, {"id": "top-sweater-cream", "slot": "top", "name": "Cream jumper", "price": 90, "kind": "sweater", "color": "#eadfc8"}, {"id": "top-jacket", "slot": "top", "name": "Denim jacket", "price": 180, "kind": "jacket", "color": "#4a6d9c"}, {"id": "top-football", "slot": "top", "name": "Football shirt", "price": 200, "kind": "football", "color": "#d23b3b"}, {"id": "top-dress-teal", "slot": "top", "name": "Teal dress", "price": 200, "kind": "dress", "color": "#2fa79a"}, {"id": "top-dress-red", "slot": "top", "name": "Red dress", "price": 220, "kind": "dress", "color": "#c8324a"}, {"id": "top-detective", "slot": "top", "name": "Detective coat", "price": 400, "kind": "detective", "color": "#b8935a"}, {"id": "top-space", "slot": "top", "name": "Space suit", "price": 450, "kind": "space", "color": "#eef1f5"}, {"id": "top-xmas", "slot": "top", "name": "Christmas jumper 🎄", "price": 150, "kind": "xmas", "color": "#c8312b", "months": [12]}, {"id": "hat-none", "slot": "hat", "name": "No hat", "price": 0}, {"id": "hat-bow", "slot": "hat", "name": "Hair bow", "price": 50, "kind": "bow", "color": "#ff4f8b"}, {"id": "hat-cap-red", "slot": "hat", "name": "Red cap", "price": 60, "kind": "cap", "color": "#cf3b3b"}, {"id": "hat-cap-blue", "slot": "hat", "name": "Blue cap", "price": 60, "kind": "cap", "color": "#2f5fb3"}, {"id": "hat-beanie-yellow", "slot": "hat", "name": "Yellow beanie", "price": 70, "kind": "beanie", "color": "#e9b62f"}, {"id": "hat-beanie-grey", "slot": "hat", "name": "Grey beanie", "price": 70, "kind": "beanie", "color": "#7d838c"}, {"id": "hat-santa", "slot": "hat", "name": "Santa hat 🎄", "price": 100, "kind": "santa", "color": "#c8312b", "months": [12]}, {"id": "hat-bunny", "slot": "hat", "name": "Bunny ears 🐣", "price": 120, "kind": "bunny", "color": "#f4f1ea", "months": [3, 4]}, {"id": "hat-flowers", "slot": "hat", "name": "Flower crown 🌼", "price": 120, "kind": "flowers", "color": "#ff8fb1", "months": [6, 7]}, {"id": "hat-detective", "slot": "hat", "name": "Detective hat", "price": 350, "kind": "detective", "color": "#7d6a4f"}, {"id": "hat-crown", "slot": "hat", "name": "Crown 👑", "price": 1200, "kind": "crown", "color": "#f2c230", "fx": "sparkle"}, {"id": "gl-none", "slot": "glasses", "name": "No glasses", "price": 0}, {"id": "gl-round", "slot": "glasses", "name": "Round glasses", "price": 50, "kind": "round"}, {"id": "gl-square", "slot": "glasses", "name": "Square glasses", "price": 60, "kind": "square"}, {"id": "gl-sun", "slot": "glasses", "name": "Sunglasses", "price": 180, "kind": "sun"}, {"id": "gl-heart", "slot": "glasses", "name": "Heart glasses", "price": 350, "kind": "heart"}, {"id": "gl-star", "slot": "glasses", "name": "Star glasses", "price": 400, "kind": "star"}, {"id": "jw-none", "slot": "jewellery", "name": "None", "price": 0}, {"id": "jw-studs", "slot": "jewellery", "name": "Gold studs", "price": 50, "kind": "studs"}, {"id": "jw-hoops", "slot": "jewellery", "name": "Hoop earrings", "price": 80, "kind": "hoops"}, {"id": "ex-none", "slot": "extra", "name": "Nothing", "price": 0}, {"id": "ex-headphones", "slot": "extra", "name": "Headphones", "price": 220, "kind": "headphones"}, {"id": "ex-cat", "slot": "extra", "name": "Cat", "price": 450, "kind": "cat"}, {"id": "ex-dog", "slot": "extra", "name": "Dog", "price": 450, "kind": "dog"}, {"id": "bg-plain", "slot": "bg", "name": "Light", "price": 0, "kind": "plain", "color": "#e7ecf4"}, {"id": "bg-blue", "slot": "bg", "name": "Blue", "price": 0, "kind": "plain", "color": "#cfe0f5"}, {"id": "bg-mint", "slot": "bg", "name": "Mint", "price": 40, "kind": "plain", "color": "#cdeee0"}, {"id": "bg-sunset", "slot": "bg", "name": "Sunset", "price": 120, "kind": "sunset"}, {"id": "bg-london", "slot": "bg", "name": "London", "price": 150, "kind": "london"}, {"id": "bg-beach", "slot": "bg", "name": "Beach", "price": 150, "kind": "beach"}, {"id": "bg-snow", "slot": "bg", "name": "Snowy night 🎄", "price": 120, "kind": "snow", "months": [12]}, {"id": "bg-space", "slot": "bg", "name": "Space", "price": 250, "kind": "space"}, {"id": "bg-gold", "slot": "bg", "name": "Gold glitter ✨", "price": 900, "kind": "gold"}, {"id": "bg-galaxy", "slot": "bg", "name": "Galaxy (animated) ✨", "price": 1500, "kind": "galaxy"}];
  const SLOTS = ["skin", "eyes", "lashes", "hairstyle", "haircolor", "top", "hat", "glasses", "jewellery", "extra", "bg"];
  const TABS = [["Face", ["skin", "eyes", "lashes"]], ["Hair", ["hairstyle", "haircolor"]], ["Clothes", ["top"]], ["Hats", ["hat"]], ["Glasses", ["glasses"]], ["Jewellery", ["jewellery"]], ["Extras", ["extra"]], ["Backgrounds", ["bg"]]];
  const SLOTNAME = { skin: "Skin tone", eyes: "Eye colour", lashes: "Eyes", hairstyle: "Hairstyle", haircolor: "Hair colour", top: "Clothes", hat: "Hats", glasses: "Glasses", jewellery: "Jewellery", extra: "Extras", bg: "Backgrounds" };
  const DEFAULT = { skin: "skin2", eyes: "eye-brown", lashes: "lash-off", hairstyle: "hs-short", haircolor: "hc-brown", top: "top-tshirt-white", hat: "hat-none", glasses: "gl-none", jewellery: "jw-none", extra: "ex-none", bg: "bg-plain" };
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
      server: "Server error. Try again. – Serverfehler, versuch es nochmal.",
      season: "This item is not available right now. – Dieses Teil gibt es gerade nicht."
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

  /* ---------- Avatar (Porträt) ---------- */
  let RID = 0;
  const byId = {}; CATALOG.forEach(i => byId[i.id] = i);
  function mix(a, b, t) {
    const p = x => [parseInt(x.slice(1, 3), 16), parseInt(x.slice(3, 5), 16), parseInt(x.slice(5, 7), 16)];
    const A = p(a), B = p(b);
    return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
  }
  const dk = (c, t) => mix(c, "#000000", t), lt = (c, t) => mix(c, "#ffffff", t);
  function starPts(cx, cy, r) {
    const p = [];
    for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * .45 : r; p.push((cx + rr * Math.cos(a)).toFixed(1) + "," + (cy + rr * Math.sin(a)).toFixed(1)); }
    return p.join(" ");
  }
  function twinkle(x, y, r, col, delay) {
    return `<polygon points="${starPts(x, y, r)}" fill="${col}"><animate attributeName="opacity" values="1;.15;1" dur="2.4s" begin="${delay}s" repeatCount="indefinite"/></polygon>`;
  }

  function background(it) {
    const k = it.kind;
    if (k === "plain") return `<rect width="200" height="200" fill="${it.color}"/><circle cx="100" cy="86" r="82" fill="${dk(it.color, .05)}"/>`;
    if (k === "sunset") return `<defs><linearGradient id="bgS${RID}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a5a"/><stop offset=".55" stop-color="#ff6f91"/><stop offset="1" stop-color="#6b4ab5"/></linearGradient></defs><rect width="200" height="200" fill="url(#bgS${RID})"/><circle cx="100" cy="120" r="50" fill="#ffd36e" opacity=".7"/>`;
    if (k === "london") return `<rect width="200" height="200" fill="#bcdcf4"/><rect x="10" y="40" width="26" height="160" fill="#c9ad78"/><path d="M8 40 L23 8 L38 40 Z" fill="#8a7350"/><circle cx="23" cy="62" r="9" fill="#fff" stroke="#6b5a3e" stroke-width="2"/><path d="M23 62 L23 56 M23 62 L27 64" stroke="#333" stroke-width="1.5"/><rect x="150" y="120" width="50" height="80" rx="6" fill="#c8312b"/><rect x="156" y="128" width="16" height="14" fill="#d8ecfa"/><rect x="178" y="128" width="16" height="14" fill="#d8ecfa"/>`;
    if (k === "beach") return `<rect width="200" height="200" fill="#9edcf7"/><circle cx="164" cy="34" r="18" fill="#ffd54d"/><rect y="118" width="200" height="34" fill="#3ea0e0"/><path d="M0 124 Q25 118 50 124 T100 124 T150 124 T200 124" stroke="#c9ecff" stroke-width="2.5" fill="none"/><rect y="150" width="200" height="50" fill="#f3d58f"/>`;
    if (k === "space") return `<rect width="200" height="200" fill="#121838"/><circle cx="164" cy="38" r="18" fill="#b07cff"/><ellipse cx="164" cy="38" rx="30" ry="7" fill="none" stroke="#e5d3ff" stroke-width="3"/>` + [[18, 20], [40, 70], [182, 110], [14, 150], [60, 18], [120, 14], [30, 110]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="1.8" fill="#fff"/>`).join("");
    if (k === "snow") return `<rect width="200" height="200" fill="#20365e"/><circle cx="160" cy="34" r="14" fill="#f4f1d8"/>` + Array.from({ length: 16 }, (_, i) => { const x = (i * 53) % 200, d = 4 + (i % 5); return `<circle cx="${x}" cy="-5" r="${1.5 + (i % 3)}" fill="#fff" opacity=".9"><animate attributeName="cy" values="-5;205" dur="${d}s" begin="-${(i * 0.7) % d}s" repeatCount="indefinite"/></circle>`; }).join("");
    if (k === "gold") return `<defs><radialGradient id="bgG${RID}" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#fff1b0"/><stop offset=".5" stop-color="#f2c230"/><stop offset="1" stop-color="#b8860b"/></radialGradient></defs><rect width="200" height="200" fill="url(#bgG${RID})"/>` + [[20, 24, 8, 0], [176, 40, 7, .6], [26, 130, 6, 1.2], [180, 150, 8, .3], [150, 16, 5, 1.6], [50, 70, 4, .9]].map(s => twinkle(s[0], s[1], s[2], "#fff", s[3])).join("");
    if (k === "galaxy") return `<defs><radialGradient id="bgX${RID}" cx=".5" cy=".5" r=".8"><stop offset="0" stop-color="#5a2a9a"/><stop offset=".6" stop-color="#1d1350"/><stop offset="1" stop-color="#080622"/></radialGradient></defs><rect width="200" height="200" fill="url(#bgX${RID})"/>
      <ellipse cx="100" cy="90" rx="120" ry="30" fill="#ff6fd8" opacity=".18"><animateTransform attributeName="transform" type="rotate" values="0 100 90;360 100 90" dur="40s" repeatCount="indefinite"/></ellipse>
      <ellipse cx="100" cy="90" rx="110" ry="22" fill="#6fd8ff" opacity=".15"><animateTransform attributeName="transform" type="rotate" values="60 100 90;420 100 90" dur="55s" repeatCount="indefinite"/></ellipse>` +
      [[16, 20, 4, 0], [180, 30, 5, .7], [30, 120, 3, 1.4], [176, 140, 4, .2], [140, 12, 3, 1.1], [60, 40, 3, 1.8], [10, 80, 3, .5]].map(s => twinkle(s[0], s[1], s[2], "#fff", s[3])).join("") +
      `<line x1="0" y1="0" x2="14" y2="7" stroke="#fff" stroke-width="2" stroke-linecap="round"><animateTransform attributeName="transform" type="translate" values="-20 10;220 120" dur="3.5s" repeatCount="indefinite"/></line>`;
    return `<rect width="200" height="200" fill="#e7ecf4"/>`;
  }

  function hairShapes(style, F, hd, hl) {
    const strands = d => `<path d="${d}" stroke="${hd}" stroke-width="1" opacity=".45" fill="none"/>`;
    const back = {
      long: `<path d="M-38 -12 C-46 -62 46 -62 38 -12 C40 20 46 50 48 80 C20 90 -20 90 -48 80 C-46 50 -40 20 -38 -12 Z" ${F}/>` + strands("M-30 20 C-32 45 -36 62 -40 76 M30 20 C32 45 36 62 40 76 M-24 30 C-26 50 -28 66 -30 80"),
      bob: `<path d="M-39 -12 C-46 -60 46 -60 39 -12 C40 8 42 22 42 32 C30 38 -30 38 -42 32 C-42 22 -40 8 -39 -12 Z" ${F}/>`,
      ponytail: `<path d="M24 -44 C56 -40 60 -4 52 36 C50 48 42 54 38 50 C44 22 42 -12 22 -32 Z" ${F}/>`,
      bun: `<circle cx="2" cy="-60" r="17" ${F}/>` + strands("M-10 -66 C-4 -72 8 -72 14 -64"),
      curly: [[-34, -30], [-38, -4], [-36, 20], [34, -30], [38, -4], [36, 20], [-22, -52], [0, -58], [22, -52]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="15" ${F}/>`).join(""),
      braids: [-34, 34].map(x => Array.from({ length: 6 }, (_, i) => `<ellipse cx="${x + (x < 0 ? -2 : 2)}" cy="${8 + i * 11}" rx="7.5" ry="7" ${F} stroke="${hd}" stroke-width=".8" stroke-opacity=".5"/>`).join("")).join("")
    };
    const side = tight => `<path d="M-37 ${tight ? -4 : 6} C-44 -50 -6 -64 14 -60 C38 -54 44 -30 37 ${tight ? -4 : 6} C35 -16 28 -34 10 -38 C-4 -28 -22 -24 -37 ${tight ? -4 : 6} Z" ${F}/>` + strands("M8 -56 C-4 -46 -18 -36 -28 -18 M14 -54 C4 -42 -6 -36 -16 -30 M20 -52 C30 -42 34 -30 35 -16") + `<path d="M-6 -56 C6 -60 18 -58 26 -50" stroke="${hl}" stroke-width="2.2" opacity=".5" fill="none"/>`;
    const front = {
      short: `<path d="M-36 -6 C-42 -50 -12 -64 6 -60 C32 -58 44 -38 37 -6 C36 -22 30 -32 20 -36 C10 -30 -10 -30 -22 -38 C-30 -30 -34 -20 -36 -6 Z" ${F}/>` + strands("M-20 -46 C-10 -40 4 -40 14 -46 M-28 -36 C-20 -30 -10 -32 -4 -36") + `<path d="M-14 -54 C-4 -58 8 -58 18 -54" stroke="${hl}" stroke-width="2" opacity=".5" fill="none"/>`,
      buzz: `<path d="M-34 -12 C-36 -48 -12 -56 0 -56 C12 -56 36 -48 34 -12 C30 -30 18 -38 0 -38 C-18 -38 -30 -30 -34 -12 Z" ${F} opacity=".92"/>`,
      curly: [[-26, -40], [-12, -48], [4, -50], [20, -46], [30, -34], [-34, -20], [34, -18]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="11" ${F}/>`).join("") + [[-20, -44], [0, -50], [22, -42]].map(p => `<path d="M${p[0] - 5} ${p[1]} q5 -5 10 0" stroke="${hd}" stroke-width="1.2" fill="none" opacity=".6"/>`).join(""),
      bob: `<path d="M-37 -2 C-42 -54 42 -54 37 -2 C36 -16 32 -24 26 -27 L-26 -27 C-32 -24 -36 -16 -37 -2 Z" ${F}/>` + strands("M-18 -27 L-16 -48 M-4 -27 L-3 -50 M10 -27 L9 -50 M22 -27 L20 -46") + `<path d="M-14 -46 C-2 -50 10 -50 20 -46" stroke="${hl}" stroke-width="2" opacity=".5" fill="none"/>`,
      long: side(false), ponytail: side(true), bun: side(true), braids: side(true)
    };
    return { back: back[style] || "", front: front[style] || "" };
  }

  function face(sk, iris, lashes, browC, id) {
    const skd = dk(sk, .22), lip = mix(sk, "#b4405a", .45), lipd = mix(sk, "#7a2238", .5);
    let s = `<ellipse cx="-34" cy="-1" rx="5.5" ry="9" fill="${sk}"/><ellipse cx="34" cy="-1" rx="5.5" ry="9" fill="${dk(sk, .08)}"/><path d="M-35 -5 q-2 4 0 8 M35 -5 q2 4 0 8" stroke="${skd}" stroke-width="1.2" fill="none" opacity=".6"/>`;
    s += `<path d="M-34 -10 C-36 -42 -20 -54 0 -54 C20 -54 36 -42 34 -10 C33 10 25 28 12 37 C6 41 -6 41 -12 37 C-25 28 -33 10 -34 -10 Z" fill="url(#${id}sk)"/>`;
    s += `<ellipse cx="-20" cy="12" rx="10" ry="6" fill="url(#${id}bl)"/><ellipse cx="20" cy="12" rx="10" ry="6" fill="url(#${id}bl)"/>`;
    s += `<path d="M-14 33 C-6 38 6 38 14 33" stroke="${skd}" stroke-width="1" fill="none" opacity=".35"/>`;
    for (const x of [-13, 13]) {
      const d = x < 0 ? -1 : 1, eyeP = `M${x - 8.5} -5 Q${x} -11.5 ${x + 8.5} -5 Q${x} -0.5 ${x - 8.5} -5 Z`;
      s += `<path d="${eyeP}" fill="#fbf7f3"/><clipPath id="${id}e${d}"><path d="${eyeP}"/></clipPath>`;
      s += `<g clip-path="url(#${id}e${d})"><circle cx="${x}" cy="-5.5" r="4.6" fill="${iris}"/><circle cx="${x}" cy="-5.5" r="4.6" fill="none" stroke="#000" stroke-opacity=".35" stroke-width=".8"/><circle cx="${x}" cy="-5.5" r="2.1" fill="#120d0a"/><circle cx="${x + 1.6}" cy="-7.2" r="1.2" fill="#fff"/></g>`;
      s += `<path d="M${x - 9} -4.6 Q${x} -12.5 ${x + 9} -4.6" stroke="#2a1d16" stroke-width="${lashes ? 2.2 : 1.5}" fill="none" stroke-linecap="round"/>`;
      if (lashes) s += `<path d="M${x + d * 8.5} -5 l${d * 3.2} -2.6 M${x + d * 6} -8.2 l${d * 2.2} -2.5" stroke="#2a1d16" stroke-width="1.2" stroke-linecap="round"/>`;
      s += `<path d="M${x - 6} -1.8 Q${x} 0.6 ${x + 6} -1.8" stroke="${skd}" stroke-width=".8" fill="none" opacity=".5"/>`;
      s += `<path d="M${d * 22} -15 Q${d * 14} -21.5 ${d * 5} -17.5 Q${d * 14} -18.5 ${d * 22} -13.5 Z" fill="${browC}" stroke="${browC}" stroke-width="1.2" stroke-linejoin="round"/>`;
    }
    s += `<path d="M-1.5 -4 C-2 4 -3.5 8 -5.5 10.5 C-3 13 3 13 5.5 10.5" stroke="${skd}" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".8"/><path d="M-3 11.5 q1.2 1 2.4 0 M0.6 11.5 q1.2 1 2.4 0" stroke="${skd}" stroke-width="1" fill="none" opacity=".7"/>`;
    s += `<path d="M-10.5 20.5 Q-5 17.6 0 19.6 Q5 17.6 10.5 20.5 Q0 22.8 -10.5 20.5 Z" fill="${lipd}"/><path d="M-10 20.8 Q0 29 10 20.8 Q0 23.6 -10 20.8 Z" fill="${lip}"/><path d="M-3 24.6 Q0 25.6 3 24.6" stroke="#fff" stroke-width=".9" opacity=".35" fill="none"/>`;
    s += `<path d="M-11 20 q-1.5 .6 -2.2 -.6 M11 20 q1.5 .6 2.2 -.6" stroke="${skd}" stroke-width="1" fill="none" opacity=".7"/>`;
    return s;
  }

  function jewellery(it) {
    if (it.kind === "studs") return `<circle cx="-34" cy="9" r="2.6" fill="#f2c230" stroke="#b8860b" stroke-width=".8"/><circle cx="34" cy="9" r="2.6" fill="#f2c230" stroke="#b8860b" stroke-width=".8"/>`;
    if (it.kind === "hoops") return `<circle cx="-35" cy="14" r="6" fill="none" stroke="#e0b03a" stroke-width="1.8"/><circle cx="35" cy="14" r="6" fill="none" stroke="#e0b03a" stroke-width="1.8"/>`;
    return "";
  }
  function glassesSVG(it) {
    const k = it.kind;
    if (k === "round") return `<circle cx="-13" cy="-5" r="10" fill="rgba(255,255,255,.12)" stroke="#2b2b2b" stroke-width="2"/><circle cx="13" cy="-5" r="10" fill="rgba(255,255,255,.12)" stroke="#2b2b2b" stroke-width="2"/><path d="M-3 -6 Q0 -9 3 -6 M-23 -6 L-34 -8 M23 -6 L34 -8" stroke="#2b2b2b" stroke-width="2" fill="none"/>`;
    if (k === "square") return `<rect x="-24" y="-13" width="20" height="15" rx="3" fill="rgba(255,255,255,.12)" stroke="#1f2c4a" stroke-width="2.4"/><rect x="4" y="-13" width="20" height="15" rx="3" fill="rgba(255,255,255,.12)" stroke="#1f2c4a" stroke-width="2.4"/><path d="M-4 -8 L4 -8 M-24 -9 L-34 -9 M24 -9 L34 -9" stroke="#1f2c4a" stroke-width="2.4"/>`;
    if (k === "sun") return `<path d="M-25 -12 L-2 -12 Q-1 3 -14 4 Q-26 3 -25 -12 Z" fill="#14141a"/><path d="M25 -12 L2 -12 Q1 3 14 4 Q26 3 25 -12 Z" fill="#14141a"/><path d="M-2 -10 L2 -10 M-25 -11 L-34 -9 M25 -11 L34 -9" stroke="#14141a" stroke-width="2.2"/><path d="M-21 -8 L-15 -8 M7 -8 L13 -8" stroke="#fff" stroke-width="1.6" opacity=".45" stroke-linecap="round"/>`;
    if (k === "heart") return [-13, 13].map(x => `<path d="M${x} 5 L${x - 10} -5 Q${x - 12} -14 ${x - 5} -14 Q${x} -14 ${x} -9 Q${x} -14 ${x + 5} -14 Q${x + 12} -14 ${x + 10} -5 Z" fill="#ff4f8b" fill-opacity=".85" stroke="#b0144f" stroke-width="1.5"/>`).join("") + `<path d="M-3 -9 L3 -9 M-23 -8 L-34 -8 M23 -8 L34 -8" stroke="#b0144f" stroke-width="1.5"/>`;
    if (k === "star") return [-13, 13].map(x => `<polygon points="${starPts(x, -5, 13)}" fill="#ffd23f" fill-opacity=".9" stroke="#c99a00" stroke-width="1.4"/>`).join("") + `<path d="M-3 -6 L3 -6 M-24 -7 L-34 -8 M24 -7 L34 -8" stroke="#c99a00" stroke-width="1.6"/>`;
    return "";
  }
  function hatSVG(it) {
    const hc = it.color || "#2f5fb3", hcd = dk(hc, .25);
    switch (it.kind) {
      case "cap": return `<path d="M-38 -24 C-38 -66 38 -66 38 -24 Z" fill="${hc}"/><path d="M-40 -24 C-20 -30 20 -30 52 -22 C40 -14 10 -16 -40 -20 Z" fill="${hcd}"/><path d="M0 -64 L0 -26 M-20 -56 C-14 -40 -14 -32 -16 -26" stroke="${hcd}" stroke-width="1.2" fill="none"/><circle cx="0" cy="-64" r="2.5" fill="${hcd}"/><path d="M-30 -40 C-24 -54 -12 -60 0 -60" stroke="#fff" stroke-width="2" opacity=".2" fill="none"/>`;
      case "beanie": return `<path d="M-38 -24 C-38 -78 38 -78 38 -24 Z" fill="${hc}"/><rect x="-40" y="-32" width="80" height="14" rx="6" fill="${hcd}"/>` + Array.from({ length: 13 }, (_, i) => `<path d="M${-36 + i * 6} -30 l0 10" stroke="${dk(hc, .4)}" stroke-width="1.2"/>`).join("") + `<circle cx="0" cy="-74" r="8" fill="#f4f1ea"/>`;
      case "bow": return `<path d="M22 -50 L8 -60 L10 -40 Z M22 -50 L36 -62 L36 -40 Z" fill="${hc}" stroke="${dk(hc, .3)}" stroke-width="1.2"/><circle cx="22" cy="-50" r="4" fill="${dk(hc, .15)}"/>`;
      case "santa": return `<path d="M-38 -30 C-34 -70 20 -82 44 -50 C50 -40 52 -30 48 -22 C42 -40 30 -52 18 -54 C10 -48 -20 -40 -38 -30 Z" fill="${hc}"/><circle cx="50" cy="-20" r="7" fill="#f4f1ea"/><rect x="-42" y="-34" width="84" height="13" rx="6.5" fill="#f4f1ea"/>`;
      case "bunny": return `<path d="M-18 -46 C-28 -72 -26 -92 -16 -92 C-6 -92 -6 -72 -10 -48 Z M18 -46 C28 -72 26 -92 16 -92 C6 -92 6 -72 10 -48 Z" fill="#f4f1ea" stroke="#d8d2c6" stroke-width="1.2"/><path d="M-16 -52 C-21 -70 -20 -85 -16 -85 C-12 -85 -12 -70 -12 -54 Z M16 -52 C21 -70 20 -85 16 -85 C12 -85 12 -70 12 -54 Z" fill="#ffb3c7"/><path d="M-36 -36 C-30 -56 30 -56 36 -36" stroke="#f4f1ea" stroke-width="4" fill="none"/>`;
      case "flowers": return `<path d="M-36 -36 C-30 -56 30 -56 36 -36" stroke="#5a9a4a" stroke-width="3" fill="none"/>` + [[-32, -40, "#ff8fb1"], [-20, -50, "#ffd54d"], [-6, -55, "#ffffff"], [8, -55, "#ff8fb1"], [22, -50, "#b48cff"], [33, -40, "#ffd54d"]].map(f => [0, 72, 144, 216, 288].map(a => `<circle cx="${(f[0] + 3.6 * Math.cos(a * Math.PI / 180)).toFixed(1)}" cy="${(f[1] + 3.6 * Math.sin(a * Math.PI / 180)).toFixed(1)}" r="3.2" fill="${f[2]}"/>`).join("") + `<circle cx="${f[0]}" cy="${f[1]}" r="2" fill="#e8a020"/>`).join("");
      case "detective": return `<path d="M-38 -26 C-36 -60 36 -60 38 -26 Z" fill="${hc}"/><path d="M-36 -36 L36 -36" stroke="${dk(hc, .2)}" stroke-width="1"/><path d="M-44 -24 Q0 -36 44 -24 Q0 -18 -44 -24 Z" fill="${dk(hc, .15)}"/><rect x="-37" y="-32" width="74" height="7" fill="#3e3326"/><path d="M-30 -40 L-26 -54 M-14 -40 L-12 -58 M2 -40 L2 -59 M18 -40 L16 -57 M32 -40 L28 -52" stroke="${dk(hc, .25)}" stroke-width="1" opacity=".6"/>`;
      case "crown": return `<g><path d="M-24 -42 L-26 -66 L-13 -54 L0 -70 L13 -54 L26 -66 L24 -42 Z" fill="#f2c230" stroke="#b8860b" stroke-width="1.5"/><rect x="-25" y="-46" width="50" height="6" rx="2" fill="#e0a91c" stroke="#b8860b" stroke-width="1"/><circle cx="0" cy="-54" r="3.5" fill="#d92b4b"/><circle cx="-15" cy="-49" r="2.4" fill="#3a7bd5"/><circle cx="15" cy="-49" r="2.4" fill="#3fae5a"/>${twinkle(-30, -70, 5, "#fff6c0", 0)}${twinkle(32, -62, 4, "#fff6c0", 1.1)}</g>`;
    }
    return "";
  }
  function topSVG(it, id, sk) {
    const top = it.color, topd = dk(top, .28), F = `fill="url(#${id}t)"`;
    let s = `<path d="M86 120 L86 150 Q100 158 114 150 L114 120 Z" fill="${dk(sk, .12)}"/><path d="M86 132 Q100 144 114 132 L114 140 Q100 150 86 140 Z" fill="${dk(sk, .25)}" opacity=".4"/>`;
    const sh = "M18 200 C20 174 44 160 76 154 Q100 166 124 154 C156 160 180 174 182 200 Z";
    switch (it.kind) {
      case "hoodie": s += `<path d="${sh}" ${F}/><path d="M66 156 C70 140 84 148 100 164 C116 148 130 140 134 156 C126 176 74 176 66 156 Z" fill="${topd}"/><path d="M92 166 L90 192 M108 166 L110 192" stroke="#f4f1ea" stroke-width="2.2" stroke-linecap="round"/><circle cx="90" cy="193" r="2" fill="#f4f1ea"/><circle cx="110" cy="193" r="2" fill="#f4f1ea"/>`; break;
      case "football": s += `<path d="${sh}" ${F}/><path d="M78 154 L100 178 L122 154" stroke="#fff" stroke-width="5" fill="none"/><path d="M30 186 L50 172 M170 186 L150 172" stroke="#fff" stroke-width="4"/><text x="146" y="196" font-family="Arial Black,Arial" font-weight="900" font-size="18" fill="#fff" text-anchor="middle">8</text>`; break;
      case "jacket": s += `<path d="${sh}" ${F}/><path d="M76 154 L92 186 L100 166 L108 186 L124 154 Q100 168 76 154 Z" fill="#f2f2f0"/><path d="M76 154 L90 190 L84 200 L64 200 Z M124 154 L110 190 L116 200 L136 200 Z" fill="${lt(top, .12)}"/><path d="M60 178 h18 v10 h-18 Z M122 178 h18 v10 h-18 Z" fill="none" stroke="${topd}" stroke-width="1.5"/><path d="M56 168 L54 200 M144 168 L146 200" stroke="#e8c070" stroke-width="1" stroke-dasharray="3 2"/><circle cx="69" cy="183" r="1.6" fill="#d9b25a"/><circle cx="131" cy="183" r="1.6" fill="#d9b25a"/>`; break;
      case "dress": s += `<path d="${sh}" fill="${dk(sk, .03)}"/><path d="M58 200 C60 182 66 170 74 164 L78 156 Q100 182 122 156 L126 164 C134 170 140 182 142 200 Z" ${F}/><path d="M74 158 L64 156 M126 158 L136 156" stroke="${topd}" stroke-width="4" stroke-linecap="round"/><path d="M80 176 Q100 188 120 176" stroke="${lt(top, .3)}" stroke-width="1.5" fill="none"/>`; break;
      case "sweater": s += `<path d="${sh}" ${F}/><path d="M78 154 Q100 170 122 154 L122 161 Q100 177 78 161 Z" fill="${topd}"/>` + [0, 1, 2, 3, 4, 5].map(i => `<path d="M${81 + i * 7.5} ${158 + [1, 3, 4, 4, 3, 1][i]} l0 5" stroke="${dk(top, .4)}" stroke-width="1"/>`).join("") + `<path d="M40 186 Q100 176 160 186 M46 194 Q100 184 154 194" stroke="${topd}" stroke-width="1" opacity=".5" fill="none"/>`; break;
      case "detective": s += `<path d="${sh}" ${F}/><path d="M70 150 L92 194 L100 170 L108 194 L130 150 L120 148 L100 166 L80 148 Z" fill="${lt(top, .12)}" stroke="${topd}" stroke-width="1"/><path d="M100 170 L100 200" stroke="${topd}" stroke-width="1.5"/><circle cx="90" cy="196" r="2.2" fill="#5a4026"/><circle cx="110" cy="196" r="2.2" fill="#5a4026"/><path d="M84 160 Q100 172 116 160" fill="#f2f2f0"/>`; break;
      case "space": s += `<path d="${sh}" ${F}/><path d="M68 158 Q100 182 132 158 L132 166 Q100 192 68 166 Z" fill="#c6ccd6"/><rect x="120" y="176" width="22" height="16" rx="3" fill="#3a6fd8"/><circle cx="126" cy="184" r="2.2" fill="#ff5a5a"/><circle cx="131" cy="184" r="2.2" fill="#ffd34d"/><circle cx="136" cy="184" r="2.2" fill="#4cff9a"/><circle cx="64" cy="184" r="8" fill="#3a6fd8"/><polygon points="${starPts(64, 184, 5)}" fill="#fff"/>`; break;
      case "xmas": s += `<path d="${sh}" ${F}/><path d="M78 154 Q100 170 122 154 L122 161 Q100 177 78 161 Z" fill="#f4f1ea"/><path d="M24 186 L36 178 L48 186 L60 178 L72 186 L84 178 L96 186 L108 178 L120 186 L132 178 L144 186 L156 178 L168 186 L178 180" stroke="#f4f1ea" stroke-width="3" fill="none"/><path d="M40 194 l4 -4 l4 4 l-4 4 Z M96 196 l4 -4 l4 4 l-4 4 Z M152 194 l4 -4 l4 4 l-4 4 Z" fill="#2f8a4a"/>`; break;
      default: s += `<path d="${sh}" ${F}/><path d="M80 154 Q100 170 120 154" stroke="${topd}" stroke-width="3" fill="none"/><path d="M80 154 Q100 166 120 154" stroke="${lt(top, .25)}" stroke-width="1" fill="none"/>`;
    }
    return s;
  }
  function extraSVG(it) {
    if (it.kind === "headphones") return `<g transform="translate(100 96) scale(1.15)"><path d="M-40 -4 C-44 -72 44 -72 40 -4" stroke="#24242c" stroke-width="5" fill="none"/><rect x="-47" y="-13" width="13" height="24" rx="5" fill="#ef5b3a"/><rect x="34" y="-13" width="13" height="24" rx="5" fill="#ef5b3a"/></g>`;
    if (it.kind === "cat") return `<g transform="translate(150 150) scale(.9)"><path d="M30 40 Q48 24 38 8" stroke="#e08a2e" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cx="16" cy="42" rx="22" ry="14" fill="#f39a3b"/><circle cx="6" cy="20" r="14" fill="#f39a3b"/><path d="M-6 12 L-4 -2 L4 8 Z M18 12 L16 -2 L8 8 Z" fill="#f39a3b"/><path d="M-3 10 L-3 2 L2 8 Z M15 10 L15 2 L10 8 Z" fill="#ffb3a0"/><path d="M0 26 q6 4 12 0 M2 14 l2 2 M10 14 l-2 2" stroke="#c46f1e" stroke-width="1" fill="none"/><circle cx="1" cy="19" r="2.2" fill="#2a2a2a"/><circle cx="11" cy="19" r="2.2" fill="#2a2a2a"/><path d="M5 23 l1 1 l1 -1" stroke="#7a3a20" stroke-width="1.2" fill="none"/></g>`;
    if (it.kind === "dog") return `<g transform="translate(144 146) scale(.95)"><ellipse cx="22" cy="46" rx="24" ry="14" fill="#a8743f"/><ellipse cx="12" cy="24" rx="15" ry="14" fill="#c08850"/><ellipse cx="-1" cy="22" rx="6" ry="12" fill="#7a5028" transform="rotate(20 -1 22)"/><ellipse cx="25" cy="22" rx="6" ry="12" fill="#7a5028" transform="rotate(-20 25 22)"/><ellipse cx="12" cy="31" rx="8" ry="6" fill="#e8c9a0"/><circle cx="12" cy="28" r="2.6" fill="#2a2a2a"/><circle cx="7" cy="21" r="2" fill="#2a2a2a"/><circle cx="17" cy="21" r="2" fill="#2a2a2a"/><path d="M12 32 q0 4 3 4" stroke="#2a2a2a" stroke-width="1" fill="none"/><path d="M2 36 Q12 40 22 36" stroke="#d23b3b" stroke-width="3" fill="none"/></g>`;
    return "";
  }

  function clean(eq) {
    const e = Object.assign({}, DEFAULT);
    if (eq) for (const k of SLOTS) if (eq[k] && byId[eq[k]] && byId[eq[k]].slot === k) e[k] = eq[k];
    return e;
  }
  function avatarSVG(eq) {
    const e = clean(eq), id = "av" + (RID++);
    const it = k => byId[e[k]];
    const sk = it("skin").color, iris = it("eyes").color, hcIt = it("haircolor"), hc = hcIt.color;
    const top = it("top").color;
    let defs = `<linearGradient id="${id}sk" x1="0" x2="1"><stop offset="0" stop-color="${lt(sk, .08)}"/><stop offset=".65" stop-color="${sk}"/><stop offset="1" stop-color="${dk(sk, .14)}"/></linearGradient>
      <linearGradient id="${id}t" x1="0" x2="1"><stop offset="0" stop-color="${lt(top, .12)}"/><stop offset=".6" stop-color="${top}"/><stop offset="1" stop-color="${dk(top, .25)}"/></linearGradient>
      <radialGradient id="${id}bl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#e86a7a" stop-opacity=".28"/><stop offset="1" stop-color="#e86a7a" stop-opacity="0"/></radialGradient>`;
    if (hcIt.fx === "rainbow") defs += `<linearGradient id="${id}h" x1="0" y1="0" x2="1" y2="1" spreadMethod="reflect"><stop offset="0" stop-color="#ff5a7a"/><stop offset=".2" stop-color="#ffa53a"/><stop offset=".4" stop-color="#ffe14a"/><stop offset=".6" stop-color="#4fd17a"/><stop offset=".8" stop-color="#4aa8ff"/><stop offset="1" stop-color="#a66bff"/><animateTransform attributeName="gradientTransform" type="translate" values="0 0;1 1" dur="4s" repeatCount="indefinite"/></linearGradient>`;
    else defs += `<linearGradient id="${id}h" x1="0" y1="0" x2=".6" y2="1"><stop offset="0" stop-color="${lt(hc, .22)}"/><stop offset=".45" stop-color="${hc}"/><stop offset="1" stop-color="${dk(hc, .35)}"/></linearGradient>`;
    const hd = hcIt.fx === "rainbow" ? "#7a4aa0" : dk(hc, .4), hl = hcIt.fx === "rainbow" ? "#ffffff" : lt(hc, .35);
    const hair = hairShapes(it("hairstyle").kind, `fill="url(#${id}h)"`, hd, hl);
    const browC = hcIt.fx === "rainbow" ? "#4a2f22" : dk(hc, .25);
    const H = s => `<g transform="translate(100 96) scale(1.15)">${s}</g>`;
    let s = `<defs>${defs}</defs>` + background(it("bg"));
    s += H(hair.back);
    s += topSVG(it("top"), id, sk);
    s += H(face(sk, iris, e.lashes === "lash-on", browC, id) + jewellery(it("jewellery")) + hair.front + glassesSVG(it("glasses")) + hatSVG(it("hat")));
    s += extraSVG(it("extra"));
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto">${s}</svg>`;
  }
  function rarity(price) {
    if (!price) return { name: "Free", color: "#7dffb0" };
    if (price < 100) return { name: "Common", color: "#c9d2e3" };
    if (price < 300) return { name: "Rare", color: "#5aa9ff" };
    if (price < 700) return { name: "Epic", color: "#c07cff" };
    return { name: "Legendary", color: "#f2c230" };
  }
  function inSeason(item) { return !item.months || item.months.indexOf(new Date().getMonth() + 1) >= 0; }

  window.E8 = { CATALOG: CATALOG, SLOTS: SLOTS, TABS: TABS, SLOTNAME: SLOTNAME, DEFAULT: DEFAULT, getSession: getSession, login: login, logout: logout, call: call, errText: errText, reportInto: reportInto, avatarSVG: avatarSVG, clean: clean, rarity: rarity, inSeason: inSeason, item: id => byId[id], online: () => !!API_URL && API_URL.indexOf("/*") !== 0 };
})();
