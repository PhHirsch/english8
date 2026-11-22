# Vorlage: Lern-Spiele-Website für eine Klasse

Diese Datei beschreibt das System, das für den E-Kurs Englisch 8 gebaut wurde (Repo `PhHirsch/english8`, Seite https://phhirsch.github.io/english8/). Sie ist die Arbeitsgrundlage, um dasselbe Prinzip für weitere Klassen aufzubauen. **Claude: Lies diese Datei vollständig, bevor du etwas baust.**

---

## 1. Grundprinzip

- **Eine Klasse = ein GitHub-Repository** (öffentlich, GitHub Pages auf `main` / root) **+ eine eigene Google-Tabelle mit Apps-Script** im Google-Konto `phhirsch7@gmail.com`.
- Die Spiele liegen als statische HTML-Seiten auf GitHub Pages. Nur der **Spielstand** (Logins, Münzen, Ergebnisse, Avatar) liegt in der Google-Tabelle.
- SuS loggen sich mit **Nummer + 4-stelliger PIN** ein (keine Namen, die Zuordnung Nummer → Name führt die Lehrkraft offline). Ohne Login kann man spielen, bekommt aber keine Münzen.
- Geteilte iPads (Ausleihgeräte): Login und Spielstände liegen in `sessionStorage`; Spiele fragen beim Öffnen „Continue as …? / I'm a new player“; automatische Abmeldung nach 90 Minuten.

## 2. Dateien im Repo

| Datei | Zweck |
|---|---|
| `index.html` | Startseite: Login, Avatar, Level/XP, Abzeichen, Münzen, Shop („Wardrobe & shop“), Kacheln für alle Spiele mit Sternen und Top 3, Tages-Challenge |
| `game.js` | **Gemeinsames Modul (generiert, nicht von Hand bearbeiten!)**: Login/API, `E8.reportInto()`, Avatar-Zeichnung (`E8.avatarSVG`, `E8.myAvatar`), Shop-Katalog, Level |
| `shop.json` | **Generiert**: Shop-Katalog für das Google-Skript (nur Teile freigeschalteter Units) |
| `bosses.js` | SVG-Grafiken der Vokabel-Bosse (`BOSSART[kind]`) |
| `vocab-uX.js` | Vokabeldaten je Unit (Format siehe 6.) |
| `boss.html` | Vokabel-Bosskampf, `boss.html?id=<abschnitt-id>`; `?id=daily` = Tages-Challenge (automatisch, 10 Zufallswörter aus allen Units, gleich für alle an einem Tag) |
| weitere `*.html` | Grammatik-/Story-Spiele |
| `speicher/` | Quellen: `catalog.py` (Shop-Teile), `game_head.part` / `game_avatar.part` / `game_tail.part` (Teile von game.js), `Code.gs.tpl` → `Code.gs` (Apps-Script), `build.py`, `mock.js` (Test-Server) |

### Build
```
cd speicher
python3 catalog.py                      # erzeugt catalog.json
python3 build.py "<WEB-APP-URL>"        # erzeugt ../game.js, ../shop.json, Code.gs
```
- In `build.py` steht `ACTIVE_UNITS = [...]` → welche Unit-Shopteile sichtbar/kaufbar sind. Ausgabepfade in `build.py` ggf. auf das neue Repo anpassen.
- Nach Änderungen an `game.js` die Versionsnummer `game.js?v=N` in **allen** HTML-Dateien erhöhen (Cache der iPads).
- Achtung: `build.py` immer mit der **echten Web-App-URL** ausführen, bevor gepusht wird (zum Testen mit `http://localhost:8787/exec` und `node mock.js`).

## 3. Google-Tabelle + Apps-Script (pro Klasse eine eigene)

- Blätter: **Spieler** (Nr, PIN, Münzen, Gekauft, Avatar, Fehlversuche, Gesperrt bis, Letzter Login), **Ergebnisse** (Zeitpunkt, Nr, Spiel, Fehler, Sterne, Münzen +, Durchgang, Zeit (s), Aufgaben), **Übersicht** (automatisch: Level, XP, Münzen, zuletzt gespielt, Sterne pro Spiel).
- Das Skript (`speicher/Code.gs`, `@OnlyCurrentDoc`) lädt den Shop-Katalog per `UrlFetchApp` aus `<seite>/shop.json` → **neue Spiele/Shop-Teile brauchen kein neues Skript**. In `Code.gs.tpl` die Konstante `KATALOG_URL` auf die neue Seite anpassen!
- Aktionen: `login`, `result` (game, mistakes, secs, total), `buy`, `equip`, `scores` (Top 3 pro Spiel, ohne Login).
- Regeln: Sterne bei `total` > 0: Fehlerquote ≤ 10 % → 3, ≤ 25 % → 2, sonst 1 (ohne total: ≤2 Fehler → 3, ≤6 → 2). Münzen: erstes Mal 10 + 10×Sterne; Verbesserung 10 pro neuem Stern; Wiederholung 2 (max. 3×/Tag); `daily`: 5×Sterne, 1×/Tag. Level aus XP (= Summe aller verdienten Münzen): 0, 50, 120, 220, 350, 500, 700, 950, 1250, 1600, 2000, 2500. Sperre nach 5 falschen PINs für 5 Min.

### Neue Tabelle einrichten (Claude macht das im Browser der Claude-App)
1. Lehrkraft ist im eingebauten Browser mit `phhirsch7@gmail.com` angemeldet.
2. Neue Tabelle anlegen (`https://docs.google.com/spreadsheets/create`), Namen z. B. „<Klasse> Spielstand“.
3. Erweiterungen → Apps Script öffnet einen neuen Tab, den der Browser blockiert → stattdessen `https://script.google.com/home/my` öffnen und das Projekt anklicken (oder Lehrkraft klickt selbst).
4. Code einfügen per JavaScript im Editor: `const t = await fetch("<seite>/speicher/Code.gs?x="+Date.now()).then(r=>r.text()); const m = monaco.editor.getModels()[0]; m.pushEditOperations([], [{range: m.getFullModelRange(), text: t}], () => null);` → dann in den Editor klicken und `Strg+S`. (Screenshots im Editor können veraltet sein – Inhalt per JS prüfen.)
5. Funktion `einrichten` ausführen → **Lehrkraft** muss „Berechtigungen überprüfen“ klicken und zulassen (Popup darf Claude nicht öffnen). Im Protokoll muss „… Shop-Teile geladen.“ stehen.
6. Bereitstellen → Neue Bereitstellung → Web-App, Ausführen als: Ich, Zugriff: **Jeder** → Web-App-URL in `build.py`-Aufruf verwenden.
7. Spätere Skript-Änderungen: Code ersetzen, speichern, Bereitstellen → Bereitstellungen verwalten → Bearbeiten → Version „Neue Version“ → Bereitstellen (URL bleibt gleich).

## 4. GitHub
- Konto `PhHirsch`. Repo per `add_repo` (access: push) anhängen, klonen, committen mit `git -c user.name="PhHirsch" -c user.email="PhHirsch@users.noreply.github.com"`, pushen.
- GitHub Pages muss die Lehrkraft einmal selbst einschalten (Settings → Pages → Branch `main`, `/ (root)`); die API dafür ist gesperrt.
- QR-Code: mit Python (`reportlab.graphics.barcode.qrencoder` + PIL) erzeugen und mit `cv2.QRCodeDetector` prüfen.

## 5. Spiele bauen – Regeln & Stil (wichtig!)
- **Vor dem Bauen Optionen/Themen vorschlagen** und auf Auswahl warten.
- Jedes Spiel ist eine **neue, spannende Spielart** mit Geschichte (bisher: Detektivfall, Raumstation mit Sauerstoff, Zeitmaschine 1870/heute, Wettrennen Storm Chasers, Vokabel-Bosskampf). Story muss in sich logisch sein; nur wenn es passt, ans Buch angelehnt. Interessant & abwechslungsreich geht vor Buchnähe.
- **Selbstkorrigierend, man kommt nur weiter, wenn es richtig ist.** Falsche Aufgaben kommen später wieder. Gezielte Hinweise bei Fehlern (Englisch + kurze deutsche Hilfe).
- ca. **15 Minuten**, iPad-tauglich (große Buttons, Tippen statt Ziehen), Arbeitsanweisungen in der Zielsprache + kurze deutsche Hilfe, Regelkarte jederzeit aufrufbar.
- Neue Phänomene erst erklären/erschließen lassen, dann anwenden. Aufgabentypen mischen: Auswählen, Eintippen (Rechtschreibung!), Sätze bauen, Zuordnen, Fehler finden.
- Der **Avatar des Spielers** kommt in jedem Spiel vor (`E8.myAvatar()`).
- Technische Konventionen jedes Spiels:
  - `<script src="game.js?v=N"></script>` einbinden; Spielstand `S` in `sessionStorage` mit eigenem `KEY`; `S.nr = E8.getSession()?.nr`; wenn eingeloggte Nummer ≠ `S.nr` → neu starten; angefangenes Spiel → „Welcome back – Continue / I'm a new player“.
  - `S.start`, `S.end`, `S.mistakes`, `S.total` (Anzahl Aufgaben) setzen; am Ende `E8.reportInto("coinbox", "<spiel-id>", S, save)`.
  - Ende: Buttons „New player / play again“ und „← All exercises“; „← All exercises“ auch oben.
  - In `index.html` in `GRAMMAR` eintragen (`id`, `unit`, `file`, `icon`, `topic`, `name`, `info`, `color`). Mit `unit` erscheint es unter der passenden Unit.
- Vor dem Pushen mit Playwright (`/usr/bin/google-chrome`) + `mock.js` komplett durchspielen, auch mit Fehlern.

## 6. Vokabel-Bosse
`vocab-uX.js`:
```js
window.VOCAB = window.VOCAB || {};
VOCAB["u2"] = { unit: "Unit 2 · Titel", sections: [
  { id: "boss-u2-wayin", part: "Way in", title: "…", pages: "p. 193–194 (best known – to tear up)", boss: "tornado", bossName: "Tornado Twister",
    words: [["to report (on)", "berichten (über)"], …] } ] };
```
- Klammern im Englischen = optional beim Eintippen; `sb`/`sth` werden toleriert. (AE) o. ä. in die deutsche Bedeutung schreiben.
- Abschnitte mit > 30 Wörtern aufteilen. Boss-Arten in `bosses.js` (tornado, robot, ghost, bossy, slime, manager, locker) – neue Bosse dort ergänzen und in `index.html` eine Farbe in `BOSSCOL` setzen.
- Neue `vocab-uX.js` in `index.html` und `boss.html` einbinden.

## 7. Shop & Gamification
- Avatar im realistischen Porträt-Stil, frei kombinierbar (keine Junge/Mädchen-Auswahl). Kategorien: Face (skin, eyes, lashes, face paint), Hair, Clothes, Hats, Glasses, Jewellery, Extras (pets & gadgets, aura), Backgrounds.
- Preisstufen: Common < 100, Rare < 300, Epic < 700, Legendary ab 700 (oft animiert, mit Level-Sperre `lvl`). Saison-Teile über `months`, Unit-Teile über `unit` (sichtbar, sobald die Unit in `ACTIVE_UNITS` steht).
- **Freischalten neuer Units:** Wenn die Lehrkraft Spiele zu einer neuen Unit bestellt, diese Unit in `ACTIVE_UNITS` aufnehmen und neu bauen.
- Bewusst **nicht**: Zufallsboxen/Loot-Boxen, Bestenlisten mit Namen (nur Nummern), Bonus-Münzen durch die Lehrkraft, Kostüme von Religionsgemeinschaften o. Ä.
- Abzeichen (in `index.html`, `ACH`) und Top 3 pro Spiel (wenigste Fehler, dann schnellste Zeit).
