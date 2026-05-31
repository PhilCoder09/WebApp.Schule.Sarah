/* ============================================================
   Knack den Code – Mission Pythagoras
   script.js  –  Vanilla JS, kein Framework, kein Build-Tool
   ============================================================ */

'use strict';

// ══════════════════════════════════════════════════════════════
// STATIONEN
// Jede Station hat:
//   id        – Nummer (1–13)
//   title     – Titel
//   parts     – Array von Teilfragen { question, answer, type }
//               type: 'number' | 'text' | 'formula'
//   onCorrect – { giveCode: 'X', next: N }
//   onWrong   – { next: N }
//
// Codeblöcke (Position im 7-stelligen Code):
//   Block 1 (pos 0): Station 1 oder 2  → A
//   Block 2 (pos 1): Station 3 oder 4  → Z
//   Block 3 (pos 2): Station 5 oder 6  → L
//   Block 4 (pos 3): Station 7 oder 8  → J
//   Block 5 (pos 4): Station 9 oder 10 → C
//   Block 6 (pos 5): Station 11 oder 12→ H
//   Block 7 (pos 6): Station 13        → B
// ══════════════════════════════════════════════════════════════

const STATIONS = {

  1: {
    id: 1,
    title: 'Begriffe und erste Rechnung',
    parts: [
      {
        question: 'Wie lang ist Seite c, wenn a = 6 cm und b = 8 cm sind?',
        answer: 10,
        type: 'number'
      },
      {
        question:
          'Welche Aussage ist richtig?\n' +
          'A) Die Hypotenuse liegt immer gegenüber dem rechten Winkel.\n' +
          'B) Die Hypotenuse ist die kürzeste Seite.\n' +
          'C) Katheten liegen gegenüber dem rechten Winkel.',
        answer: 'a',
        type: 'text'
      }
    ],
    onCorrect: { giveCode: 'A', codePos: 0, next: 3 },
    onWrong:   { next: 2 }
  },

  2: {
    id: 2,
    title: 'Förderstation Begriffe',
    isSupport: true,
    parts: [
      {
        question:
          'Hast du immer die längste Seite im Dreieck als Hypotenuse markiert?\n' +
          'Antworte mit Ja oder Nein.',
        answer: 'ja',
        type: 'text'
      }
    ],
    onCorrect: { giveCode: 'A', codePos: 0, next: 3 },
    onWrong:   { next: 3 }
  },

  3: {
    id: 3,
    title: 'Formel erkennen und übertragen',
    parts: [
      {
        question:
          'Welche Formel gehört zum Satz des Pythagoras?\n' +
          'A) a + b = c\n' +
          'B) a² + b² = c²\n' +
          'C) ab = c',
        answer: 'b',
        type: 'text'
      },
      {
        question: 'Katheten u und v, Hypotenuse w. Schreibe die Formel.',
        answer: ['u^2+v^2=w^2', 'u²+v²=w²'],
        type: 'formula'
      },
      {
        question: 'Katheten r und s, Hypotenuse t. Schreibe die Formel.',
        answer: ['r^2+s^2=t^2', 'r²+s²=t²'],
        type: 'formula'
      },
      {
        question: 'Katheten x und y, Hypotenuse z. Schreibe die Formel.',
        answer: ['x^2+y^2=z^2', 'x²+y²=z²'],
        type: 'formula'
      },
      {
        question: 'Katheten b und c, Hypotenuse a. Schreibe die Formel.',
        answer: ['b^2+c^2=a^2', 'b²+c²=a²'],
        type: 'formula'
      }
    ],
    onCorrect: { giveCode: 'Z', codePos: 1, next: 5 },
    onWrong:   { next: 4 }
  },

  4: {
    id: 4,
    title: 'Förderstation Formel',
    isSupport: true,
    parts: [
      {
        question: 'Katheten a und b, Hypotenuse c. Schreibe die Formel.',
        answer: ['a^2+b^2=c^2', 'a²+b²=c²'],
        type: 'formula'
      },
      {
        question: 'Katheten b und c, Hypotenuse a. Schreibe die Formel.',
        answer: ['b^2+c^2=a^2', 'b²+c²=a²'],
        type: 'formula'
      },
      {
        question: 'Katheten a und c, Hypotenuse b. Schreibe die Formel.',
        answer: ['a^2+c^2=b^2', 'a²+c²=b²'],
        type: 'formula'
      }
    ],
    onCorrect: { giveCode: 'Z', codePos: 1, next: 5 },
    onWrong:   { next: 5 }
  },

  5: {
    id: 5,
    title: 'Hypotenuse berechnen',
    parts: [
      {
        question:
          'Berechne die Hypotenuse.\n' +
          'Gegeben: a = 5 cm, b = 12 cm.\n' +
          'Ergebnis mit Einheit möglich.',
        answer: 13,
        type: 'number'
      },
      {
        question:
          'Berechne die Hypotenuse.\n' +
          'Gegeben: a = 8,5 cm, b = 15 cm.\n' +
          'Gib zwei Nachkommastellen an.',
        answer: 17.24,
        type: 'number'
      }
    ],
    onCorrect: { giveCode: 'L', codePos: 2, next: 7 },
    onWrong:   { next: 6 }
  },

  6: {
    id: 6,
    title: 'Förderstation Hypotenuse',
    isSupport: true,
    parts: [
      {
        question:
          'Berechne die Hypotenuse.\n' +
          'Gegeben: a = 4 cm, b = 5 cm.\n' +
          'Gib eine Nachkommastelle an.',
        answer: 6.4,
        type: 'number'
      },
      {
        question:
          'Berechne die Hypotenuse.\n' +
          'Gegeben: a = 6 cm, b = 10 cm.\n' +
          'Gib zwei Nachkommastellen an.',
        answer: 11.66,
        type: 'number'
      }
    ],
    onCorrect: { giveCode: 'L', codePos: 2, next: 7 },
    onWrong:   { next: 7 }
  },

  7: {
    id: 7,
    title: 'Kathete berechnen',
    parts: [
      {
        question:
          'Berechne die Kathete.\n' +
          'Gegeben: c = 13 cm, a = 5 cm. Berechne b.',
        answer: 12,
        type: 'number'
      },
      {
        question:
          'Berechne die Kathete.\n' +
          'Gegeben: c = 10 cm, b = 6 cm. Berechne a.',
        answer: 8,
        type: 'number'
      }
    ],
    onCorrect: { giveCode: 'J', codePos: 3, next: 9 },
    onWrong:   { next: 8 }
  },

  8: {
    id: 8,
    title: 'Förderstation Kathete',
    isSupport: true,
    parts: [
      {
        question:
          'Berechne die Kathete.\n' +
          'Gegeben: c = 15 cm, a = 9 cm. Berechne b.',
        answer: 12,
        type: 'number'
      },
      {
        question:
          'Berechne die Kathete.\n' +
          'Gegeben: c = 17 cm, b = 8 cm. Berechne a.',
        answer: 15,
        type: 'number'
      }
    ],
    onCorrect: { giveCode: 'J', codePos: 3, next: 9 },
    onWrong:   { next: 9 }
  },

  9: {
    id: 9,
    title: 'Planskizze und Hypotenuse',
    parts: [
      {
        question:
          'Ein rechtwinkliges Dreieck besitzt die Katheten a = 9 cm und b = 12 cm.\n' +
          'Wie lang ist die Hypotenuse?',
        answer: 15,
        type: 'number'
      }
    ],
    onCorrect: { giveCode: 'C', codePos: 4, next: 11 },
    onWrong:   { next: 10 }
  },

  10: {
    id: 10,
    title: 'Förderstation Planskizze',
    isSupport: true,
    parts: [
      {
        question:
          'Ein rechtwinkliges Dreieck besitzt die Katheten a = 10 cm und b = 24 cm.\n' +
          'Wie lang ist die Hypotenuse?',
        answer: 26,
        type: 'number'
      }
    ],
    onCorrect: { giveCode: 'C', codePos: 4, next: 11 },
    onWrong:   { next: 11 }
  },

  11: {
    id: 11,
    title: 'Leiter am Haus',
    parts: [
      {
        question:
          'Eine Leiter steht 5 m von einer Hauswand entfernt.\n' +
          'Das Fenster befindet sich 12 m über dem Boden.\n' +
          'Wie lang ist die Leiter?',
        answer: 13,
        type: 'number'
      }
    ],
    onCorrect: { giveCode: 'H', codePos: 5, next: 12 },
    onWrong:   { next: 12 }
  },

  12: {
    id: 12,
    title: 'Feuerwehrleiter',
    parts: [
      {
        question:
          'Eine Leiter steht 8 m von einer Hauswand entfernt.\n' +
          'Das Fenster befindet sich 15 m über dem Boden.\n' +
          'Wie lang ist die Leiter?',
        answer: 17,
        type: 'number'
      }
    ],
    onCorrect: { giveCode: 'H', codePos: 5, next: 13 },
    onWrong:   { next: 13 }
  },

  13: {
    id: 13,
    title: 'Stern-Aufgabe ⭐',
    parts: [
      {
        question:
          'Wie lang ist Seite x?\n' +
          'Gib zwei Nachkommastellen an.',
        answer: 19.84,
        type: 'number'
      },
      {
        question:
          'Wie lang ist Seite z?\n' +
          'Gib zwei Nachkommastellen an.',
        answer: 39.76,
        type: 'number'
      }
    ],
    onCorrect: { giveCode: 'B', codePos: 6, next: null },
    onWrong:   { next: null }
  }

};

// Maximaler Code (7 Positionen)
const CODE_LENGTH = 7;

// ══════════════════════════════════════════════════════════════
// ZUSTAND
// ══════════════════════════════════════════════════════════════

const STORAGE_KEY = 'pythagoras_v2';

let state = {
  unlocked:      false,   // Passwort korrekt eingegeben?
  currentStation: null,   // aktuelle Stations-ID (1–13)
  codeSlots:     new Array(CODE_LENGTH).fill(null), // null = noch nicht erhalten
  visited:       []       // besuchte Stations-IDs
};

// Zwischenspeicher für die aktuelle Prüfung
let pendingNext = null;   // nächste Station nach "Weiter"

// ══════════════════════════════════════════════════════════════
// EINGABE-NORMALISIERUNG & PRÜFUNG
// ══════════════════════════════════════════════════════════════

/**
 * Bereinigt eine Eingabe:
 * - Leerzeichen entfernen
 * - Einheiten (cm, m) entfernen
 * - Komma → Punkt
 * - ˆ → ^ (kopiertes Sonderzeichen)
 * - ² → ^2
 */
function normalize(raw) {
  return raw
    .trim()
    .replace(/\s+/g, '')
    .replace(/cm\b/gi, '')
    .replace(/(?<!\^)m\b/gi, '')   // "m" als Einheit, aber nicht "^m"
    .replace(',', '.')
    .replace(/\u02C6/g, '^')       // ˆ (U+02C6) → ^
    .replace(/²/g, '^2');          // ² → ^2
}

/**
 * Prüft eine einzelne Teilantwort.
 * type: 'number' | 'text' | 'formula'
 */
function checkPart(raw, expected, type) {
  const cleaned = normalize(raw);

  if (type === 'number') {
    const num = parseFloat(cleaned);
    if (isNaN(num)) return false;
    const exp = typeof expected === 'number' ? expected : parseFloat(expected);
    return Math.abs(num - exp) <= 0.05;
  }

  if (type === 'formula') {
    const lc = cleaned.toLowerCase();
    if (Array.isArray(expected)) {
      return expected.some(e => normalize(e).toLowerCase() === lc);
    }
    return normalize(expected).toLowerCase() === lc;
  }

  // text
  const lc = cleaned.toLowerCase();
  if (Array.isArray(expected)) {
    return expected.some(e => e.toLowerCase().replace(/\s+/g, '') === lc);
  }
  return expected.toLowerCase().replace(/\s+/g, '') === lc;
}

// ══════════════════════════════════════════════════════════════
// LOCALSTORAGE
// ══════════════════════════════════════════════════════════════

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed.unlocked === 'boolean' &&
      Array.isArray(parsed.codeSlots) &&
      parsed.codeSlots.length === CODE_LENGTH &&
      Array.isArray(parsed.visited)
    ) {
      state = parsed;
    }
  } catch (_) {}
}

// ══════════════════════════════════════════════════════════════
// DOM-HELFER
// ══════════════════════════════════════════════════════════════

function $(id) { return document.getElementById(id); }

const SCREENS = ['screen-start', 'screen-password', 'screen-station', 'screen-finish'];

function showScreen(id) {
  SCREENS.forEach(s => $(s).classList.add('hidden'));
  $(id).classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setFeedback(msg, type) {
  const el = $('st-feedback');
  el.innerHTML = msg;
  el.className = 'feedback ' + type;
  el.classList.remove('hidden');
}

function hideFeedback() {
  const el = $('st-feedback');
  el.classList.add('hidden');
  el.className = 'feedback hidden';
  el.innerHTML = '';
}

// ══════════════════════════════════════════════════════════════
// CODE-LEISTE
// ══════════════════════════════════════════════════════════════

// Erwartete Buchstaben in Reihenfolge (für Anzeige)
const CODE_LETTERS = ['A', 'Z', 'L', 'J', 'C', 'H', 'B'];

function renderCodeBar() {
  const bar = $('code-bar');
  bar.innerHTML = '';

  for (let i = 0; i < CODE_LENGTH; i++) {
    const letter = state.codeSlots[i];
    const span = document.createElement('span');
    if (letter) {
      span.className = 'code-letter';
      span.textContent = letter;
      span.title = 'Block ' + (i + 1) + ': ' + letter;
    } else {
      span.className = 'code-slot';
      span.textContent = '_';
      span.title = 'Block ' + (i + 1) + ': noch nicht erhalten';
    }
    bar.appendChild(span);
  }
}

function giveCodeLetter(pos, letter) {
  // Nur vergeben, wenn Slot noch leer
  if (state.codeSlots[pos] === null) {
    state.codeSlots[pos] = letter;
    saveState();
    renderCodeBar();
  }
}

// ══════════════════════════════════════════════════════════════
// PASSWORT
// ══════════════════════════════════════════════════════════════

function showPasswordPrompt() {
  $('pw-input').value = '';
  $('pw-feedback').classList.add('hidden');
  $('pw-feedback').textContent = '';
  showScreen('screen-password');
  setTimeout(() => $('pw-input').focus(), 120);
}

function checkPassword() {
  const val = $('pw-input').value.trim().toLowerCase();
  if (val === 'kathete') {
    state.unlocked = true;
    saveState();
    startGame();
  } else {
    const fb = $('pw-feedback');
    fb.textContent = '❌ Das Passwort stimmt noch nicht. Tipp: Eine Seite am rechten Winkel.';
    fb.className = 'feedback wrong';
    fb.classList.remove('hidden');
    $('pw-input').value = '';
    $('pw-input').focus();
  }
}

// ══════════════════════════════════════════════════════════════
// SPIEL STARTEN / FORTSETZEN
// ══════════════════════════════════════════════════════════════

function startGame() {
  $('code-bar-wrapper').classList.remove('hidden');
  renderCodeBar();

  if (state.currentStation === null) {
    // Frisch starten
    loadStation(1);
  } else if (state.currentStation === 'done') {
    showFinish();
  } else {
    loadStation(state.currentStation);
  }
}

// ══════════════════════════════════════════════════════════════
// STATION LADEN & ANZEIGEN
// ══════════════════════════════════════════════════════════════

function loadStation(id) {
  const station = STATIONS[id];
  if (!station) { showFinish(); return; }

  state.currentStation = id;
  if (!state.visited.includes(id)) state.visited.push(id);
  saveState();

  pendingNext = null;

  // Badge & Titel
  $('st-badge').textContent =
    (station.isSupport ? '🔧 Förderstation ' : 'Station ') + station.id;
  $('st-title').textContent = station.title;

  // Teilfragen aufbauen
  const partsEl = $('st-parts');
  partsEl.innerHTML = '';

  station.parts.forEach((part, idx) => {
    const block = document.createElement('div');
    block.className = 'part-block';

    if (station.parts.length > 1) {
      const label = document.createElement('div');
      label.className = 'part-label';
      label.textContent = 'Teilaufgabe ' + (idx + 1);
      block.appendChild(label);
    }

    const q = document.createElement('div');
    q.className = 'part-question';
    q.textContent = part.question;
    block.appendChild(q);

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'part-input';
    input.placeholder = 'Deine Antwort …';
    input.autocomplete = 'off';
    input.dataset.partIndex = idx;
    input.id = 'part-input-' + idx;

    // Enter → prüfen
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') checkStation();
    });

    block.appendChild(input);
    partsEl.appendChild(block);
  });

  // Buttons zurücksetzen
  hideFeedback();
  $('st-check-btn').disabled = false;
  $('st-check-btn').classList.remove('hidden');
  $('st-next-btn').classList.add('hidden');

  showScreen('screen-station');

  // Fokus auf erstes Eingabefeld
  setTimeout(() => {
    const first = document.getElementById('part-input-0');
    if (first) first.focus();
  }, 120);
}

// ══════════════════════════════════════════════════════════════
// STATION PRÜFEN
// ══════════════════════════════════════════════════════════════

function checkStation() {
  const id = state.currentStation;
  const station = STATIONS[id];

  // Alle Eingaben sammeln
  const inputs = document.querySelectorAll('.part-input');
  let allCorrect = true;
  let emptyFound = false;

  inputs.forEach((input, idx) => {
    if (!input.value.trim()) emptyFound = true;
  });

  if (emptyFound) {
    setFeedback('⚠ Bitte fülle alle Felder aus.', 'info');
    return;
  }

  inputs.forEach((input, idx) => {
    const part = station.parts[idx];
    if (!checkPart(input.value, part.answer, part.type)) {
      allCorrect = false;
    }
  });

  // Eingaben sperren
  inputs.forEach(inp => { inp.disabled = true; });
  $('st-check-btn').disabled = true;

  if (allCorrect) {
    handleCorrect(station);
  } else {
    handleWrong(station);
  }

  // Zum Feedback scrollen
  setTimeout(() => {
    $('st-feedback').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// ══════════════════════════════════════════════════════════════
// RICHTIG / FALSCH
// ══════════════════════════════════════════════════════════════

function handleCorrect(station) {
  const { giveCode, codePos, next } = station.onCorrect;

  // Buchstabe vergeben (nur wenn Slot noch leer)
  const alreadyHad = state.codeSlots[codePos] !== null;
  giveCodeLetter(codePos, giveCode);

  let msg = '✅ Richtig! Super gemacht!';
  if (!alreadyHad) {
    msg += '\n🔑 Du erhältst den Codebuchstaben: <strong>' + giveCode + '</strong>';
  }

  setFeedback(msg, 'correct');
  pendingNext = next;
  showNextButton(next);
}

function handleWrong(station) {
  const { next } = station.onWrong;

  let msg = '❌ Das ist leider nicht richtig.';
  if (next !== null) {
    const nextStation = STATIONS[next];
    if (nextStation && nextStation.isSupport) {
      msg += '\n➡ Weiter zur Förderstation ' + next + '.';
    } else if (next !== null) {
      msg += '\n➡ Weiter zu Station ' + next + '.';
    }
  } else {
    msg += '\n➡ Das war die letzte Station.';
  }

  setFeedback(msg, 'wrong');
  pendingNext = next;
  showNextButton(next);
}

function showNextButton(next) {
  const btn = $('st-next-btn');
  if (next === null) {
    btn.textContent = '🏁 Mission abschließen';
  } else {
    btn.textContent = '➡ Weiter';
  }
  btn.classList.remove('hidden');
}

// ══════════════════════════════════════════════════════════════
// WEITER-NAVIGATION
// ══════════════════════════════════════════════════════════════

function goNext() {
  if (pendingNext === null) {
    // Ende
    state.currentStation = 'done';
    saveState();
    showFinish();
  } else {
    loadStation(pendingNext);
  }
}

// ══════════════════════════════════════════════════════════════
// ABSCHLUSS
// ══════════════════════════════════════════════════════════════

function showFinish() {
  $('code-bar-wrapper').classList.remove('hidden');
  renderCodeBar();

  const el = $('finish-code');
  el.innerHTML = '';

  for (let i = 0; i < CODE_LENGTH; i++) {
    const letter = state.codeSlots[i];
    const span = document.createElement('span');
    if (letter) {
      span.className = 'code-letter';
      span.textContent = letter;
    } else {
      span.className = 'code-slot';
      span.textContent = '_';
    }
    el.appendChild(span);
  }

  showScreen('screen-finish');
}

// ══════════════════════════════════════════════════════════════
// FORTSCHRITT ZURÜCKSETZEN
// ══════════════════════════════════════════════════════════════

function resetProgress() {
  if (!confirm(
    'Möchtest du deinen Fortschritt wirklich zurücksetzen?\n' +
    'Alle gesammelten Codebuchstaben gehen verloren.'
  )) return;

  state = {
    unlocked:       false,
    currentStation: null,
    codeSlots:      new Array(CODE_LENGTH).fill(null),
    visited:        []
  };
  pendingNext = null;
  saveState();

  $('code-bar-wrapper').classList.add('hidden');
  showScreen('screen-start');
}

// ══════════════════════════════════════════════════════════════
// BROWSER-ZURÜCK VERHINDERN
// ══════════════════════════════════════════════════════════════

(function preventBack() {
  history.pushState(null, '', location.href);
  window.addEventListener('popstate', function () {
    history.pushState(null, '', location.href);
  });
})();

// ══════════════════════════════════════════════════════════════
// PASSWORT-EINGABE: ENTER-TASTE
// ══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {
  const pwInput = $('pw-input');
  if (pwInput) {
    pwInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') checkPassword();
    });
  }
});

// ══════════════════════════════════════════════════════════════
// INITIALISIERUNG
// ══════════════════════════════════════════════════════════════

function init() {
  loadState();

  if (state.unlocked) {
    // Passwort war bereits korrekt → direkt ins Spiel
    $('code-bar-wrapper').classList.remove('hidden');
    renderCodeBar();

    if (state.currentStation === 'done') {
      showFinish();
    } else if (state.currentStation !== null) {
      loadStation(state.currentStation);
    } else {
      loadStation(1);
    }
  } else {
    showScreen('screen-start');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
