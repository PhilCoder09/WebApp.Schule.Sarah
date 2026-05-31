/* ============================================================
   Knack den Code – Mission Pythagoras
   script.js  –  Vanilla JS, kein Framework, kein Build-Tool
   ============================================================ */

'use strict';

// ── STATIONEN ────────────────────────────────────────────────
const STATIONS = [
  {
    id: 1,
    title: 'Begriffe am rechtwinkligen Dreieck',
    task:
      'Ein rechtwinkliges Dreieck hat die Seiten a = 6 cm, b = 8 cm und c = 10 cm.\n' +
      'Welche Seite ist die Hypotenuse?',
    answer: 'c',
    type: 'text',
    extra: {
      task: 'Welche Seite liegt immer gegenüber dem rechten Winkel?',
      answer: 'hypotenuse',
      type: 'text'
    },
    code: 'M'
  },
  {
    id: 2,
    title: 'Hypotenuse erkennen',
    task: 'Welche Seite liegt immer gegenüber dem rechten Winkel?',
    answer: 'hypotenuse',
    type: 'text',
    extra: {
      task: 'Sind Katheten die Seiten, die am rechten Winkel liegen? Antworte mit ja oder nein.',
      answer: 'ja',
      type: 'text'
    },
    code: 'Q'
  },
  {
    id: 3,
    title: 'Pythagorasformel erkennen',
    task:
      'Welche Formel gehört zum Satz des Pythagoras?\n\n' +
      'A: a+b=c\n' +
      'B: a²+b²=c²\n' +
      'C: ab=c\n\n' +
      'Gib A, B oder C ein.',
    answer: 'b',
    type: 'text',
    extra: {
      task: 'Ergänze: a² + b² = ?',
      answer: ['c²', 'c^2', 'c2'],
      type: 'text'
    },
    code: 'T'
  },
  {
    id: 4,
    title: 'Formel mit anderen Variablen',
    task:
      'In einem rechtwinkligen Dreieck heißen die Katheten x und y. Die Hypotenuse heißt z.\n' +
      'Schreibe die passende Pythagorasformel.',
    answer: ['x²+y²=z²', 'x^2+y^2=z^2', 'x2+y2=z2'],
    type: 'text',
    extra: {
      task: 'Die Katheten heißen r und s. Die Hypotenuse heißt t. Schreibe die passende Formel.',
      answer: ['r²+s²=t²', 'r^2+s^2=t^2', 'r2+s2=t2'],
      type: 'text'
    },
    code: 'B'
  },
  {
    id: 5,
    title: 'Hypotenuse berechnen',
    task: 'Gegeben: a = 5 cm, b = 12 cm. Berechne c.',
    answer: 13,
    type: 'number',
    extra: {
      task: 'Gegeben: a = 8 cm, b = 15 cm. Berechne c.',
      answer: 17,
      type: 'number'
    },
    code: 'X'
  },
  {
    id: 6,
    title: 'Hypotenuse mit Dezimalergebnis',
    task: 'Gegeben: a = 4 cm, b = 5 cm. Berechne c. Runde auf zwei Dezimalstellen.',
    answer: 6.40,
    type: 'number',
    extra: {
      task: 'Gegeben: a = 6 cm, b = 10 cm. Berechne c. Runde auf zwei Dezimalstellen.',
      answer: 11.66,
      type: 'number'
    },
    code: 'H'
  },
  {
    id: 7,
    title: 'Kathete berechnen',
    task: 'Gegeben: c = 13 cm, a = 5 cm. Berechne b.',
    answer: 12,
    type: 'number',
    extra: {
      task: 'Gegeben: c = 10 cm, b = 6 cm. Berechne a.',
      answer: 8,
      type: 'number'
    },
    code: 'P'
  },
  {
    id: 8,
    title: 'Kathete berechnen 2',
    task: 'Gegeben: c = 15 cm, a = 9 cm. Berechne b.',
    answer: 12,
    type: 'number',
    extra: {
      task: 'Gegeben: c = 17 cm, b = 8 cm. Berechne a.',
      answer: 15,
      type: 'number'
    },
    code: 'K'
  },
  {
    id: 9,
    title: 'Planskizze und Hypotenuse',
    task:
      'Ein rechtwinkliges Dreieck besitzt die Katheten a = 9 cm und b = 12 cm.\n' +
      'Berechne die Hypotenuse c.',
    answer: 15,
    type: 'number',
    extra: {
      task:
        'Ein rechtwinkliges Dreieck besitzt die Katheten a = 7 cm und b = 24 cm.\n' +
        'Berechne die Hypotenuse c.',
      answer: 25,
      type: 'number'
    },
    code: 'R'
  },
  {
    id: 10,
    title: 'Weitere Planskizze',
    task:
      'Ein rechtwinkliges Dreieck besitzt die Katheten a = 10 cm und b = 24 cm.\n' +
      'Berechne die Hypotenuse c.',
    answer: 26,
    type: 'number',
    extra: {
      task:
        'Ein rechtwinkliges Dreieck besitzt die Katheten a = 12 cm und b = 16 cm.\n' +
        'Berechne die Hypotenuse c.',
      answer: 20,
      type: 'number'
    },
    code: 'A'
  },
  {
    id: 11,
    title: 'Leiter am Haus',
    task:
      'Eine Leiter steht 5 m von einer Hauswand entfernt. Das Fenster befindet sich 12 m über dem Boden.\n' +
      'Wie lang muss die Leiter mindestens sein?',
    answer: 13,
    type: 'number',
    extra: {
      task:
        'Eine Leiter steht 6 m von einer Hauswand entfernt. Das Fenster befindet sich 8 m über dem Boden.\n' +
        'Wie lang muss die Leiter mindestens sein?',
      answer: 10,
      type: 'number'
    },
    code: 'N'
  },
  {
    id: 12,
    title: 'Feuerwehrleiter',
    task:
      'Eine Leiter steht 8 m von einer Hauswand entfernt. Das Fenster befindet sich 15 m über dem Boden.\n' +
      'Wie lang muss die Leiter mindestens sein?',
    answer: 17,
    type: 'number',
    extra: {
      task:
        'Eine Leiter steht 9 m von einer Hauswand entfernt. Das Fenster befindet sich 12 m über dem Boden.\n' +
        'Wie lang muss die Leiter mindestens sein?',
      answer: 15,
      type: 'number'
    },
    code: 'F'
  },
  {
    id: 13,
    title: 'Stern-Aufgabe ⭐',
    task:
      'Ein Stern besteht aus rechtwinkligen Dreiecken. In einem Dreieck gilt: a = 5 cm und c = 13 cm.\n' +
      'Berechne zuerst die fehlende Kathete b.',
    answer: 12,
    type: 'number',
    extra: {
      task:
        'In einem weiteren rechtwinkligen Dreieck gilt: b = 12 cm und c = 20 cm.\n' +
        'Berechne die fehlende Kathete z. Runde auf zwei Dezimalstellen.',
      answer: 16,
      type: 'number'
    },
    code: 'Z'
  }
];

// ── ZUSTAND ───────────────────────────────────────────────────
const STORAGE_KEY = 'pythagoras_mission_v1';

let state = {
  currentIndex: -1,   // -1 = Startbildschirm
  collectedCodes: []  // Array der gesammelten Buchstaben (in Reihenfolge)
};

// ── HILFSFUNKTIONEN ───────────────────────────────────────────

/**
 * Bereinigt eine Eingabe: entfernt Einheiten, Leerzeichen,
 * normalisiert Komma → Punkt.
 */
function cleanInput(raw) {
  return raw
    .trim()
    .replace(/\s+/g, '')          // alle Leerzeichen entfernen
    .replace(/cm|m\b/gi, '')      // Einheiten entfernen
    .replace(',', '.');           // Komma → Punkt
}

/**
 * Prüft eine Antwort gegen den erwarteten Wert.
 * type: 'number' | 'text'
 * expected: Zahl, String oder Array von Strings
 */
function isCorrect(raw, expected, type) {
  const cleaned = cleanInput(raw);

  if (type === 'number') {
    const num = parseFloat(cleaned);
    if (isNaN(num)) return false;
    const exp = Array.isArray(expected) ? expected[0] : expected;
    return Math.abs(num - exp) <= 0.05;
  }

  // text
  const lower = cleaned.toLowerCase();
  if (Array.isArray(expected)) {
    return expected.some(e => e.toLowerCase().replace(/\s+/g, '') === lower);
  }
  return expected.toLowerCase().replace(/\s+/g, '') === lower;
}

// ── SPEICHERN / LADEN ─────────────────────────────────────────

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // localStorage nicht verfügbar – kein Problem
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Validierung
      if (
        typeof parsed.currentIndex === 'number' &&
        Array.isArray(parsed.collectedCodes)
      ) {
        state = parsed;
      }
    }
  } catch (e) {
    // Fehler beim Laden → Standardzustand behalten
  }
}

// ── DOM-HELFER ────────────────────────────────────────────────

function $(id) { return document.getElementById(id); }

function showOnly(screenId) {
  $('start-screen').classList.add('hidden');
  $('station-card').classList.add('hidden');
  $('finish-screen').classList.add('hidden');
  $(screenId).classList.remove('hidden');
}

function setFeedback(elId, msg, type) {
  const el = $(elId);
  el.textContent = msg;
  el.className = 'feedback ' + type;
  el.classList.remove('hidden');
}

function hideFeedback(elId) {
  const el = $(elId);
  el.classList.add('hidden');
  el.textContent = '';
  el.className = 'feedback hidden';
}

// ── CODE-LEISTE RENDERN ───────────────────────────────────────

function renderCodeBar() {
  const bar = $('code-bar');
  bar.innerHTML = '';

  STATIONS.forEach((station, i) => {
    const letter = state.collectedCodes[i];
    if (letter) {
      const span = document.createElement('span');
      span.className = 'code-letter';
      span.textContent = letter;
      span.title = 'Station ' + station.id;
      bar.appendChild(span);
    } else {
      const span = document.createElement('span');
      span.className = 'code-slot';
      span.textContent = i + 1;
      span.title = 'Station ' + station.id + ' – noch nicht gelöst';
      bar.appendChild(span);
    }
  });
}

// ── FORTSCHRITTSBALKEN ────────────────────────────────────────

function renderProgress() {
  const done = state.collectedCodes.filter(Boolean).length;
  const total = STATIONS.length;
  const pct = Math.round((done / total) * 100);
  $('progress-fill').style.width = pct + '%';
  $('progress-text').textContent = 'Station ' + done + ' / ' + total;
}

// ── STATION ANZEIGEN ─────────────────────────────────────────

function showStation(index) {
  const station = STATIONS[index];

  // Karte zurücksetzen
  $('station-number').textContent = 'Station ' + station.id;
  $('station-title').textContent = station.title;
  $('task-text').textContent = station.task;

  $('answer-input').value = '';
  $('answer-input').disabled = false;
  $('check-btn').disabled = false;

  hideFeedback('feedback-main');

  $('extra-section').classList.add('hidden');
  $('extra-text').textContent = '';
  $('extra-input').value = '';
  $('extra-input').disabled = false;
  $('extra-check-btn').disabled = false;
  hideFeedback('feedback-extra');

  $('next-section').classList.add('hidden');
  $('code-reveal').innerHTML = '';

  showOnly('station-card');

  // Fokus auf Eingabefeld
  setTimeout(() => $('answer-input').focus(), 100);
}

// ── ANTWORT PRÜFEN ────────────────────────────────────────────

function checkAnswer() {
  const index = state.currentIndex;
  const station = STATIONS[index];
  const raw = $('answer-input').value;

  if (!raw.trim()) {
    setFeedback('feedback-main', '⚠ Bitte gib eine Antwort ein.', 'info');
    return;
  }

  if (isCorrect(raw, station.answer, station.type)) {
    // ✅ Richtig
    $('answer-input').disabled = true;
    $('check-btn').disabled = true;
    setFeedback('feedback-main', '✅ Richtig! Super gemacht!', 'correct');
    revealCode(index, false);
  } else {
    // ❌ Falsch → Zusatzaufgabe
    $('answer-input').disabled = true;
    $('check-btn').disabled = true;
    setFeedback(
      'feedback-main',
      '❌ Das ist leider nicht richtig. Löse die Zusatzaufgabe!',
      'wrong'
    );
    showExtra(station);
  }
}

// ── ZUSATZAUFGABE ANZEIGEN ────────────────────────────────────

function showExtra(station) {
  $('extra-text').textContent = station.extra.task;
  $('extra-section').classList.remove('hidden');
  setTimeout(() => $('extra-input').focus(), 100);
}

// ── ZUSATZAUFGABE PRÜFEN ──────────────────────────────────────

function checkExtra() {
  const index = state.currentIndex;
  const station = STATIONS[index];
  const raw = $('extra-input').value;

  if (!raw.trim()) {
    setFeedback('feedback-extra', '⚠ Bitte gib eine Antwort ein.', 'info');
    return;
  }

  if (isCorrect(raw, station.extra.answer, station.extra.type)) {
    // ✅ Zusatzaufgabe richtig
    $('extra-input').disabled = true;
    $('extra-check-btn').disabled = true;
    setFeedback('feedback-extra', '✅ Gut gemacht! Du hast die Zusatzaufgabe gelöst.', 'correct');
    revealCode(index, true);
  } else {
    // ❌ Zusatzaufgabe falsch
    $('extra-input').disabled = true;
    $('extra-check-btn').disabled = true;
    setFeedback(
      'feedback-extra',
      '❌ Hole dir Hilfe oder vergleiche deinen Rechenweg noch einmal.',
      'wrong'
    );
    // Trotzdem Weiter-Button anzeigen (ohne Code zu sammeln)
    showNextButton(index, true);
  }
}

// ── CODE ENTHÜLLEN ────────────────────────────────────────────

function revealCode(index, fromExtra) {
  const station = STATIONS[index];
  const letter = station.code;

  // Code in Zustand speichern (falls noch nicht vorhanden)
  if (!state.collectedCodes[index]) {
    state.collectedCodes[index] = letter;
    saveState();
    renderCodeBar();
    renderProgress();
  }

  showNextButton(index, false, letter);
}

function showNextButton(index, noCode, letter) {
  const reveal = $('code-reveal');
  if (!noCode && letter) {
    reveal.innerHTML =
      '🔑 Dein Codebuchstabe für diese Station: ' +
      '<span class="big-letter">' + letter + '</span>';
  } else if (noCode) {
    reveal.innerHTML =
      '<span style="color:var(--text-muted);font-size:0.9rem;">' +
      'Kein Codebuchstabe für diese Station – weiter zur nächsten.</span>';
  }

  const nextSection = $('next-section');
  nextSection.classList.remove('hidden');

  // Letzter Station?
  const isLast = index === STATIONS.length - 1;
  const btn = $('next-btn');
  if (isLast) {
    btn.textContent = '🏁 Mission abschließen';
  } else {
    btn.textContent = '➡ Weiter zur nächsten Station';
  }

  // Scrollen zum Weiter-Button
  setTimeout(() => nextSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150);
}

// ── NÄCHSTE STATION ───────────────────────────────────────────

function nextStation() {
  const nextIndex = state.currentIndex + 1;

  if (nextIndex >= STATIONS.length) {
    // Alle Stationen abgeschlossen
    showFinish();
    return;
  }

  state.currentIndex = nextIndex;
  saveState();
  showStation(nextIndex);
}

// ── ABSCHLUSS ─────────────────────────────────────────────────

function showFinish() {
  showOnly('finish-screen');

  const finalCodeEl = $('final-code');
  finalCodeEl.innerHTML = '';

  STATIONS.forEach((station, i) => {
    const letter = state.collectedCodes[i] || '?';
    const span = document.createElement('span');
    span.className = 'code-letter';
    span.textContent = letter;
    span.title = 'Station ' + station.id;
    finalCodeEl.appendChild(span);
  });

  renderProgress();
}

// ── MISSION STARTEN ───────────────────────────────────────────

function startMission() {
  state.currentIndex = 0;
  saveState();
  showStation(0);
}

// ── FORTSCHRITT ZURÜCKSETZEN ──────────────────────────────────

function resetProgress() {
  if (!confirm('Möchtest du deinen Fortschritt wirklich zurücksetzen?\nAlle gesammelten Codebuchstaben gehen verloren.')) {
    return;
  }
  state = { currentIndex: -1, collectedCodes: [] };
  saveState();
  renderCodeBar();
  renderProgress();
  showOnly('start-screen');
}

// ── ENTER-TASTE ───────────────────────────────────────────────

document.addEventListener('keydown', function (e) {
  if (e.key !== 'Enter') return;

  // Haupteingabe
  if (document.activeElement === $('answer-input')) {
    checkAnswer();
    return;
  }

  // Zusatzeingabe
  if (document.activeElement === $('extra-input')) {
    checkExtra();
    return;
  }
});

// ── BROWSER-ZURÜCK VERHINDERN ─────────────────────────────────
// Wir pushen einen Eintrag in die History, damit der Zurück-Button
// nicht die Seite verlässt, sondern nur den State-Eintrag entfernt.
// Das verhindert, dass Schüler per Zurück-Taste Stationen überspringen.

(function preventBackNavigation() {
  history.pushState(null, '', location.href);
  window.addEventListener('popstate', function () {
    history.pushState(null, '', location.href);
  });
})();

// ── INITIALISIERUNG ───────────────────────────────────────────

function init() {
  loadState();
  renderCodeBar();
  renderProgress();

  if (state.currentIndex === -1) {
    // Noch nicht gestartet
    showOnly('start-screen');
  } else if (state.currentIndex >= STATIONS.length) {
    // Bereits abgeschlossen
    showFinish();
  } else {
    // Mitten in einer Station – Station neu anzeigen
    showStation(state.currentIndex);
  }
}

// Starten, sobald das DOM bereit ist
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
