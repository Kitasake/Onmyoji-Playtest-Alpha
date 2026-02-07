//playerEncyclopedia.js

import yokaiData from "./yokaiEncyclopedia.json";

const STORAGE_KEY = "onmyoji_player_encyclopedia";

export let playerEncyclopedia = {};

export function initPlayerEncyclopedia() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    playerEncyclopedia = JSON.parse(saved);
    return;
  }

  yokaiData.forEach(yokai => {
    playerEncyclopedia[yokai.name] = {
      name: yokai.name,
      element: yokai.element,

      discovered: false,

      knownClues: {
        area: false,
        season: false,
        weather: false
      },

      knownHP: {
        r1: false,
        r2: false,
        r3: false,
        r4: false
      }
    };
  });

  savePlayerEncyclopedia();
}

export function revealYokaiInfo(yokai, round) {
  const entry = playerEncyclopedia[yokai.name];
  if (!entry) return;

  entry.discovered = true;

  // Always reveal location clues
  entry.knownClues.area = true;
  entry.knownClues.season = true;
  entry.knownClues.weather = true;

  // Reveal HP for this specific round only
  entry.knownHP[`r${round}`] = true;

  savePlayerEncyclopedia();
}

export function resetPlayerEncyclopedia() {
  localStorage.removeItem("onmyoji_player_encyclopedia");
}
