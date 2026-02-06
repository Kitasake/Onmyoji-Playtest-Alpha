// gameState.js
// Central source of truth for the playtest app

import { createPlayers, applyOverflowDamage, areAllPlayersDefeated } from "./logic/playerState.js";

export const gameState = {
  round: 1,
  maxRounds: 4,

  players: [],
  currentYokai: null,

  spellHands: {},
  selectedSpells: {}

  // Used by some UI modules
  lastCombatResult: null
};

/**
 * Initializes a new game
 * @param {number} playerCount
 */
export function initGame(playerCount = 4) {
  gameState.round = 1;
  gameState.players = createPlayers(playerCount);
  gameState.currentYokai = null;

  // MUST be an object, not an array
  gameState.spellHands = {};
  gameState.selectedSpells = {};
  gameState.lastCombatResult = null;
}


/**
 * Advances the round counter
 */
export function advanceRound() {
  gameState.round += 1;
}

/**
 * Applies overflow damage from combat to players
 * @param {number} overflowDamage
 * @returns {boolean} true if all players are defeated
 */
export function resolvePlayerDamage(overflowDamage) {
  applyOverflowDamage(gameState.players, overflowDamage);
  return areAllPlayersDefeated(gameState.players);
}
