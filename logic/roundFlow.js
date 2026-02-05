// roundFlow.js

import { gameState, advanceRound, resolvePlayerDamage } from "../gameState.js";
import { selectRandomYokai, loadYokaiEncyclopedia } from "./yokaiSelection.js";
import { generateSpellHand } from "./spellHand.js";
import { resolveCombat } from "./combatResolution.js";

/**
 * Starts a new round
 */
export async function startRound() {
  await loadYokaiEncyclopedia();
  
  gameState.currentYokai = selectRandomYokai();
  gameState.spellHands = [];

  // Generate spell hand per player
  gameState.players.forEach(player => {
    if (!player.alive) return;

    const handState = generateSpellHand(player.element);
    gameState.spellHands.push({
      playerId: player.id,
      hand: handState.hand,
      element: player.element
    });

  });

  showCluesOnly();
}

/**
 * Players submit spells (UI calls this)
 * @param {Array} submittedSpells
 */
export function submitSpells(submittedSpells) {
  const combatResult = resolveCombat(
    gameState.currentYokai,
    submittedSpells,
    gameState.round
  );

  gameState.lastCombatResult = combatResult;
  revealCombatResults(combatResult);

  const allPlayersDefeated = resolvePlayerDamage(
    combatResult.overflowDamage
  );

  if (allPlayersDefeated) {
    endGame(false);
    return;
  }

  if (gameState.round >= gameState.maxRounds) {
    endGame(true);
    return;
  }

  //advanceRound();
}

/**
 * Ends the game
 * @param {boolean} victory
 */
function endGame(victory) {
  if (victory) {
    console.log("VICTORY – The Yokai have been sealed!");
  } else {
    console.log("DEFEAT – The Onmyoji have fallen...");
  }
}

/**
 * UI HOOKS (to be implemented in HTML)
 */
function showCluesOnly() {
  console.log("Round", gameState.round);
  console.log("Season:", gameState.currentYokai.season);
  console.log("Area:", gameState.currentYokai.area);
  console.log("Weather:", gameState.currentYokai.weather);
}

function revealCombatResults(combatResult) {
  console.log("Yokai:", combatResult.yokai);
  console.log("HP Before:", combatResult.yokaiHP);
  console.log("Attack:", combatResult.totalAttackDamage);
  console.log("Defense:", combatResult.totalDefense);
  console.log("Remaining HP:", combatResult.remainingHP);
  console.log("Overflow:", combatResult.overflowDamage);
}
