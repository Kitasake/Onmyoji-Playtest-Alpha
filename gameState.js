// gameState.js
// Central source of truth for the playtest app

import { createPlayers } from "./logic/playerState.js";

export const gameState = {
  round: 1,
  maxRounds: 4,

  partyHP: 80,
  maxPartyHP: 80,

  players: [],
  currentYokai: null,

  spellHands: {},
  selectedSpells: {},

  // Used by some UI modules
  lastCombatResult: null
};

/**
 * Initializes a new game
 * @param {number} playerCount
 */
export function initGame(playerCount = 4, options = {}) {
  const { partyHP = 80 } = options;
  gameState.round = 1;
  gameState.players = createPlayers(playerCount);
  gameState.currentYokai = null;

  gameState.maxPartyHP = partyHP;
  gameState.partyHP = partyHP;

  // MUST be an object, not an array
  gameState.spellHands = {};
  gameState.selectedSpells = {};
  gameState.lastCombatResult = null;
  gameState.gameOver = false;
  gameState.victory = false;
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
export function resolvePartyDamage(damage) {
  gameState.partyHP -= damage;
  if (gameState.partyHP < 0) {
    gameState.partyHP = 0;
  }

  return gameState.partyHP === 0;
}

