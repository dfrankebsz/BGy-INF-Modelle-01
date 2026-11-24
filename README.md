# Modell-Detektive – digitaler Informatik-Lernkurs

**Thema:** Grundlagen informatischer Modelle, Berufliches Gymnasium, Klasse 11.  
**Stand:** 24. November 2026 · Version 3 (dynamische Kapitelzähler).  
**Stack:** Reines HTML/CSS/JavaScript, Netlify Functions, Netlify Blobs und PDFKit. **Keine Supabase-Datenbank und kein allgemeiner `AUTH`-Schlüssel.**

## Inhalt

Der Kurs enthält die Inhalte der beigefügten Präsentation *Grundlagen Modelle_2026_Skript.pptx*: Modellbegriff, Original/Abstraktion, fünf Modellzwecke, vier Modellarten, Abbildungs-, Verkürzungs- und pragmatisches Merkmal, vier Modellgrenzen und die Fallstudie zu verzögerten Kundenbestellungen.

- Fünf Kapitel mit **automatisch angezeigter, inhaltlich gewichteter Aufgabenanzahl** (4 / 6 / 9 / 10 / 11; insgesamt 40 reguläre Aufgaben). Einfache Einführungen enthalten weniger Übungen, Eigenschaften, Grenzen und Modellbeurteilung entsprechend mehr. Über alle regulären Aufgaben gilt: AFB I 25 %, AFB II 50 %, AFB III 25 %.
- Fünf Bonusaufgaben (AFB II/III), zusätzlich auf die vertiefenden Kapitel konzentriert: 0 / 1 / 1 / 1 / 2.
- Abschlusstest mit zehn Aufgaben und Selbstcheck mit neun Kompetenzen (Skala 1–5).
- Interaktive Karten, Kostenfunktion, Modellabstraktion, Angebots-/Nachfragegrafik und Vergleich von Organigramm, Umsatz- und Prozessdiagramm.
- Multiple Choice (einzeln/mehrfach), Richtig/Falsch, Kategorisierung und Drag-and-Drop mit Touch-/Tastatur-Alternative, Zuordnung, Reihenfolge, Zahleneingabe, Freitext mit Musterlösung.
- XP, Levels, Avatar, Outfits, Haustiere, Galerie und Shop. Bereits verdiente XP bleiben als Gesamtpunktestand erhalten; nur das verfügbare Guthaben sinkt durch Käufe.
- Gäste: Browser-lokale Speicherung. Konten: Klasse + selbstgewählter Nickname + Passwort; Daten geräteübergreifend über Netlify Blobs. PDF-Export der eigenen bearbeiteten Aufgaben.

## Deployment aus dem ZIP über GitHub und Netlify

1. ZIP **entpacken**. Den **Inhalt des entpackten Ordners** (also `index.html`, `netlify.toml`, `course-data.js`, `app.js`, `styles.css`, `package.json`, `netlify/`, `scripts/` und `assets/`) in das **Stammverzeichnis** eines neuen GitHub-Repositories hochladen. **Nicht die ZIP-Datei selbst** als einzige Datei hochladen.
2. In Netlify **Add new project → Import an existing project → GitHub** auswählen, das Repository verbinden.
3. Netlify liest `netlify.toml`: Publish directory `dist` und Functions directory `netlify/functions`. Netlify führt `npm run build` aus und installiert die Abhängigkeiten aus `package.json`. Nur `dist/` wird öffentlich ausgeliefert; der Netlify-Functions-Code bleibt serverseitig. Node.js 22.13 oder neuer verwenden.
4. **Bevor eine Lehrkraft registriert wird:** Unter **Project configuration → Environment variables** die Variable `TEACHER_ACCESS_CODE` mit einem **langen, geheimen, selbst gewählten Code (mindestens 16 Zeichen)** anlegen. Dieser muss für **Functions/Runtime** verfügbar sein. **Nicht in den Quellcode, nicht in GitHub und nicht in `netlify.toml` eintragen.** Anschließend **neu deployen**. Es ist kein allgemeiner `AUTH`-Schlüssel erforderlich.
5. Webseite öffnen. Im Gastmodus ist der gesamte Kurs benutzbar. Für einen Schülerzugang im Dialog `Registrieren` die Rolle `Schüler/in`, Klasse, Nickname und Passwort wählen. Für ein Lehrerkonto Rolle `Lehrkraft`, **dieselbe Klasse** und den Code aus Schritt 4 eingeben.
6. In der Lehreransicht erscheinen nur Schülerkonten aus **der Klasse des Lehrerkontos**. Für mehrere Klassen kann die Lehrkraft pro Klasse ein eigenes Lehrerkonto erstellen. Die Klasse wird pro Konto bei der Registrierung festgelegt.
7. Nach einem Lehrkraft-Passwortreset wird ein **vorläufiges Passwort nur einmal angezeigt**. Persönlich übermitteln. Beim nächsten Login ist ein Passwortwechsel erforderlich.

Die Netlify-Umgebungsvariable muss über die **Netlify-Oberfläche** (oder CLI) gesetzt werden; Variablen in `netlify.toml` stehen Functions nicht automatisch zur Verfügung. Hinweise: https://docs.netlify.com/build/functions/environment-variables/ und https://docs.netlify.com/build/data-and-storage/netlify-blobs/ .

## Datenhaltung und Zugriffsregeln

- `modellkurs-accounts-v1`: Nickname (klassenbezogen), Klasse, Rolle, passwortgehashte Zugangsdaten, Reset-Revision.
- `modellkurs-progress-v1`: Antworten, Aufgabenstatus, Selbstchecks, erworbene Shop-Artikel und Avatar-Ausstattung pro Konto.
- `modellkurs-sessions-v1`: Hash eines kryptografisch zufälligen Sessiontokens mit Ablaufdatum.
- **Speicherregion:** `eu-central-1` (Frankfurt) wird bei **jedem** Zugriff explizit gesetzt. Bei einem späteren Regionswechsel werden vorhandene Daten nicht automatisch migriert.
- Sessioncookie: `HttpOnly`, `SameSite=Lax` und auf HTTPS `Secure`. Keine Zugangsdaten in Browser-LocalStorage; nur Gastantworten werden lokal gespeichert.
- Passwörter werden mit Scrypt, individuellem Salt und 64-Byte-Hash gespeichert. Ein Lehrer kann keine Passwörter auslesen, sondern nur ein vorläufiges neu setzen.
- Schülerkonten und Lehrerrollen werden serverseitig geprüft. Lehrkräfte können nur Lernende der eigenen Klasse verwalten.
- Automatisch auswertbare Aufgaben werden **auch serverseitig** anhand der Kursdaten geprüft. Freitext wird niemals automatisch bewertet. Erledigt-Markierung bei Freitext bedeutet **Selbsteinschätzung**.
- `RESET KLASSE` setzt die Fortschritte aller Schüler/innen der Klasse zurück, erhöht für jedes Konto die Revision und verhindert, dass ältere Fortschrittsspeicherungen einen Lehrkraft-Reset einfach überschreiben.

**Datenschutz / Schulpraxis:** Es werden zwar keine Klarnamen oder E-Mails benötigt, Nickname + Klasse + Lernfortschritt können aber personenbezogene Daten darstellen. Vor produktivem Schuleinsatz Datenverarbeitung, Rechtsgrundlage, Informationspflichten, Aufbewahrung, Netlify-Vertrag/AVV und Schulfreigabe prüfen. Das Paket stellt keine rechtsverbindliche DSGVO-Konformitätsprüfung dar. Es gibt kein öffentliches Leaderboard, um Lernleistungen nicht klassenöffentlich zu machen. Lehrerfortschritte bleiben von den Schülerlisten getrennt.

**Sicherheitsgrenzen:** Der Lehrercode muss geheim bleiben; alle Besitzer des Codes können Lehrkonten für eine Klasse anlegen. Accounts nutzen keine E-Mail-Wiederherstellung. Der Browser ist keine prüfungssichere Umgebung. Netlify Blobs ist für den geplanten Lernkurs zweckmäßig, aber kein transaktionales Datenbanksystem. Gleichzeitige Änderungen desselben Kontos auf mehreren Geräten können zuletzt gespeicherte Antworten überschreiben. Regelmäßige externe Backups sind bei längerem Einsatz sinnvoll.

## PDF-Portfolio

Die Schaltfläche **„PDF erstellen“** erstellt serverseitig ein zusammenhängendes PDF. Es enthält die Fragestellungen und sämtliche schon bearbeiteten Antworten im jeweiligen Kapitel sowie die Kennzeichnung, ob automatisch korrekt bewertet oder selbst eingeschätzt wurde. Das ist auch ohne Registrierung möglich, solange der Kurs über Netlify bereitgestellt wird (die PDF-Funktion benötigt Netlify Functions).

## Testen / Entwickeln

```bash
npm install
npm run check
npm test
npm run build
npx netlify-cli dev
```

Den Link von Netlify Dev im Browser öffnen. Ein einfacher lokaler HTML-Dateiaufruf (`file://`) unterstützt die Netlify-Functions-Endpunkte nicht. Der reine Gast-Lernpfad kann alternativ von einem lokalen Webserver wie `python -m http.server 8000` geöffnet werden, ohne Konten oder PDF-Erstellung.

## Inhaltliche Pflege

- `course-data.js`: Alle Lehrinhalte, Aufgaben, Lösungen, AFB-Stufen, Bonus, Test, Glossar und Shopartikel.
- `app.js`: Darstellung, Interaktion, Gamification, Authentifizierungsschnittstelle und Lernfortschritt im Browser.
- `netlify/functions/api.mjs`: Zugangsschutz, Blobs-Zugriffe, Lehrerfunktionen und PDF-Export.
- `index.html`, `styles.css`: Oberfläche.
- `assets/karte-a.jpg`, `assets/karte-b.jpg`: Zwei Karten aus der vom Nutzer bereitgestellten Präsentation (ältere geografische und schematische U-Bahn-Karte). Vor öffentlichem Einsatz Bildrechte und Quellenkennzeichnung beachten.

**Quelle der fachlichen Kursinhalte:** Vom Auftraggeber bereitgestellte Präsentation *Grundlagen Modelle_2026_Skript.pptx* und Auszug des Informatik-Lehrplans Berufliches Gymnasium Sachsen 2026 (LB 2). Aus Gründen der inhaltlichen Zuverlässigkeit sind CampusMerch und die Zahlenbeispiele ausdrücklich fiktiv. Die Lehrkraft sollte vor dem Einsatz die Darstellung und alle Musterlösungen fachlich prüfen.

## Korrektur in Version 3

Die Version 2 enthielt zwei fest hinterlegte `/8`-Anzeigen. In Version 3 beziehen sowohl die linke Navigation als auch die Kapitel-Fortschrittsanzeige den Nenner aus der tatsächlichen Anzahl der Aufgaben im Kapitel. Bei künftigen Änderungen in `course-data.js` werden die Zähler automatisch angepasst. Nach dem Austausch der Dateien die neue GitHub-Version zu Netlify deployen (ggf. **Clear cache and deploy site**). Die Dateiverweise im HTML enthalten zur Vermeidung älterer Browser-Caches den Versionsparameter `v=3`.
