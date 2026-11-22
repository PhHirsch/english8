/**
 * English 8 – Spielstand-Speicher
 * Diese Datei in die Google-Tabelle kopieren: Erweiterungen → Apps Script.
 * Das Skript hat nur Zugriff auf DIESE eine Tabelle.
 * @OnlyCurrentDoc
 */

// ===== Einstellungen =====
const ANZAHL_SPIELER = 30;      // so viele Logins legt "einrichten" an
const MAX_FEHLVERSUCHE = 5;     // danach wird die Nummer kurz gesperrt
const SPERRE_MINUTEN = 5;
const MUENZEN_WIEDERHOLUNG = 2; // Münzen für eine Wiederholung ohne Verbesserung
const MAX_BELOHNTE_WDH_PRO_TAG = 3;

// Shop-Katalog (muss zu game.js passen – nicht von Hand ändern)
const ITEMS = /*ITEMS*/;
const SLOTS = ["skin","hair","top","hat","glasses","acc","bg"];
const DEFAULT = {skin:"skin1",hair:"hair-brown",top:"top-tshirt",hat:"hat-none",glasses:"gl-none",acc:"acc-none",bg:"bg-plain"};

// Spalten im Blatt "Spieler"
const C = {NR:0, PIN:1, MUENZEN:2, GEKAUFT:3, AVATAR:4, FEHL:5, GESPERRT:6, LOGIN:7};

/** Einmal ausführen: legt die Blätter an. */
function einrichten() {
  const ss = SpreadsheetApp.getActive();
  let sp = ss.getSheetByName("Spieler");
  if (!sp) sp = ss.insertSheet("Spieler", 0);
  if (sp.getLastRow() === 0) {
    sp.appendRow(["Nr", "PIN", "Münzen", "Gekauft", "Avatar", "Fehlversuche", "Gesperrt bis", "Letzter Login"]);
    sp.getRange("B:B").setNumberFormat("@");
    const rows = [];
    for (let i = 1; i <= ANZAHL_SPIELER; i++) {
      rows.push([i, String(Math.floor(Math.random() * 10000)).padStart(4, "0"), 0, "", "", 0, "", ""]);
    }
    sp.getRange(2, 1, rows.length, 8).setValues(rows);
    sp.setFrozenRows(1);
    sp.getRange("1:1").setFontWeight("bold");
    sp.setColumnWidth(4, 260); sp.setColumnWidth(5, 200);
  }
  let er = ss.getSheetByName("Ergebnisse");
  if (!er) er = ss.insertSheet("Ergebnisse", 1);
  if (er.getLastRow() === 0) {
    er.appendRow(["Zeitpunkt", "Nr", "Spiel", "Fehler", "Sterne", "Münzen +", "Durchgang"]);
    er.setFrozenRows(1);
    er.getRange("1:1").setFontWeight("bold");
  }
  ["Tabellenblatt1", "Sheet1"].forEach(n => {
    const s = ss.getSheetByName(n);
    if (s && s.getLastRow() === 0 && ss.getSheets().length > 2) ss.deleteSheet(s);
  });
}

function doGet() { return out({ ok: true, msg: "English 8 Speicher läuft." }); }

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const d = JSON.parse(e.postData.contents);
    return out(handle(d));
  } catch (err) {
    return out({ ok: false, error: "server" });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function handle(d) {
  if (!d || typeof d.action !== "string") return { ok: false, error: "bad" };
  const a = auth(d);
  if (a.error) return { ok: false, error: a.error };
  const p = a.p;
  switch (d.action) {
    case "login":
      p.sh.getRange(p.row, C.LOGIN + 1).setValue(new Date());
      return { ok: true, state: state(p) };
    case "result": return result(p, d);
    case "buy": return buy(p, d);
    case "equip": return equip(p, d);
  }
  return { ok: false, error: "bad" };
}

function player(nr) {
  const sh = SpreadsheetApp.getActive().getSheetByName("Spieler");
  const v = sh.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) {
    if (String(v[i][C.NR]).trim() === String(nr)) return { sh: sh, row: i + 1, v: v[i] };
  }
  return null;
}

function auth(d) {
  const nr = String(d.nr || "").trim(), pin = String(d.pin || "").trim();
  if (!/^\d{1,4}$/.test(nr) || !/^\d{4}$/.test(pin)) return { error: "login" };
  const p = player(nr);
  if (!p) return { error: "login" };
  const until = p.v[C.GESPERRT] instanceof Date ? p.v[C.GESPERRT].getTime() : 0;
  if (until > Date.now()) return { error: "locked" };
  const realPin = String(p.v[C.PIN]).trim().padStart(4, "0");
  if (realPin !== pin) {
    const f = (Number(p.v[C.FEHL]) || 0) + 1;
    if (f >= MAX_FEHLVERSUCHE) {
      p.sh.getRange(p.row, C.FEHL + 1, 1, 2).setValues([[0, new Date(Date.now() + SPERRE_MINUTEN * 60000)]]);
      return { error: "locked" };
    }
    p.sh.getRange(p.row, C.FEHL + 1).setValue(f);
    return { error: "login" };
  }
  if (Number(p.v[C.FEHL]) > 0 || p.v[C.GESPERRT]) p.sh.getRange(p.row, C.FEHL + 1, 1, 2).setValues([[0, ""]]);
  return { p: p };
}

function owned(p) { return String(p.v[C.GEKAUFT] || "").split(",").map(s => s.trim()).filter(Boolean); }
function equipped(p) {
  let e = {};
  try { e = JSON.parse(p.v[C.AVATAR] || "{}"); } catch (x) {}
  return Object.assign({}, DEFAULT, e);
}
function resultsOf(nr) {
  const er = SpreadsheetApp.getActive().getSheetByName("Ergebnisse");
  return er.getDataRange().getValues().slice(1).filter(r => String(r[1]) === String(nr));
}
function state(p) {
  const stars = {};
  resultsOf(p.v[C.NR]).forEach(r => { stars[r[2]] = Math.max(stars[r[2]] || 0, Number(r[4]) || 0); });
  return { nr: String(p.v[C.NR]), coins: Number(p.v[C.MUENZEN]) || 0, owned: owned(p), equipped: equipped(p), stars: stars };
}

function result(p, d) {
  const game = String(d.game || "");
  const mistakes = Math.floor(Number(d.mistakes));
  if (!/^[a-z0-9-]{1,40}$/.test(game) || !(mistakes >= 0 && mistakes < 1000)) return { ok: false, error: "bad" };
  const stars = mistakes <= 2 ? 3 : mistakes <= 6 ? 2 : 1;
  const prev = resultsOf(p.v[C.NR]).filter(r => r[2] === game);
  const best = prev.reduce((m, r) => Math.max(m, Number(r[4]) || 0), 0);
  const today = new Date().toDateString();
  const todayCount = prev.filter(r => r[0] instanceof Date && r[0].toDateString() === today).length;
  let earned;
  if (prev.length === 0) earned = 10 + stars * 10;
  else if (stars > best) earned = (stars - best) * 10;
  else earned = todayCount < MAX_BELOHNTE_WDH_PRO_TAG ? MUENZEN_WIEDERHOLUNG : 0;
  SpreadsheetApp.getActive().getSheetByName("Ergebnisse")
    .appendRow([new Date(), Number(p.v[C.NR]), game, mistakes, stars, earned, prev.length + 1]);
  const coins = (Number(p.v[C.MUENZEN]) || 0) + earned;
  p.sh.getRange(p.row, C.MUENZEN + 1).setValue(coins);
  p.v[C.MUENZEN] = coins;
  return { ok: true, earned: earned, stars: stars, first: prev.length === 0, improved: prev.length > 0 && stars > best, state: state(p) };
}

function buy(p, d) {
  const it = ITEMS[d.item];
  if (!it || it.price <= 0) return { ok: false, error: "bad" };
  const o = owned(p);
  if (o.indexOf(d.item) >= 0) return { ok: false, error: "owned" };
  const coins = Number(p.v[C.MUENZEN]) || 0;
  if (coins < it.price) return { ok: false, error: "coins" };
  o.push(d.item);
  p.sh.getRange(p.row, C.MUENZEN + 1, 1, 2).setValues([[coins - it.price, o.join(",")]]);
  p.v[C.MUENZEN] = coins - it.price; p.v[C.GEKAUFT] = o.join(",");
  return { ok: true, state: state(p) };
}

function equip(p, d) {
  const want = d.equipped || {};
  const o = owned(p);
  const e = {};
  for (const s of SLOTS) {
    const id = want[s];
    const it = ITEMS[id];
    if (!it || it.slot !== s || (it.price > 0 && o.indexOf(id) < 0)) return { ok: false, error: "bad" };
    e[s] = id;
  }
  p.sh.getRange(p.row, C.AVATAR + 1).setValue(JSON.stringify(e));
  p.v[C.AVATAR] = JSON.stringify(e);
  return { ok: true, state: state(p) };
}
