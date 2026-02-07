// yokaiEncyclopedia.js

const STORAGE_KEY = "onmyoji_yokai_encyclopedia";

export let yokaiEncyclopedia = {};
import { yokaiList } from "./yokaiData.js";

export function initEncyclopedia() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    yokaiEncyclopedia = JSON.parse(saved);
    return;
  }

  // Create blank encyclopedia
  yokaiList.forEach(yokai => {
    yokaiEncyclopedia[yokai.id] = {
      id: yokai.id,
      name: yokai.name,
      discovered: false,

      knownClues: {
        area: false,
        season: false,
        weather: false,
        time: false
      },

      knownStats: {
        hp: []
      }
    };
  });

  saveEncyclopedia();
}
