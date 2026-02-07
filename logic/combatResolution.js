// combatResolution.js
// Resolves spell effects, dice rolls, and damage vs Yokai

import { rollDice } from "./dice.js";
import { getElementBonusDice } from "./elementBonus.js";

/**
 * Resolves combat for a single round
 * @param {Object} yokai
 * @param {Array} playerActions - [{ playerId, spell }]
 * @param {number} roundNumber
 * @returns {Object}
 */
export function resolveCombat(yokai, playerActions, roundNumber) {
  const yokaiHP = yokai.hp[`r${roundNumber}`];

  let totalAttackDamage = 0;
  let totalDefense = 0;

  const actionResults = [];

  playerActions.forEach(action => {
    const { spell } = action;

    const isAttack = spell.type === "attack";
    const isDefense = spell.type === "defense";

    let diceExpression = spell.dice;
    let bonusDice = getElementBonusDice(spell, yokai);
    

    const rollResult = rollDice(diceExpression, bonusDice);

    if (isAttack) {
      totalAttackDamage += rollResult.total;
    }

    if (isDefense) {
      totalDefense += rollResult.total;
    }

    actionResults.push({
      playerId: action.playerId,
      spell: spell.name,
      type: spell.type,
      dice: diceExpression,
      bonusDice,
      roll: rollResult.rolls,
      total: rollResult.total
    });
  });

  const netDamageToYokai = Math.max(0, totalAttackDamage + totalDefense);
  const remainingHP = Math.max(0, yokaiHP - netDamageToYokai);
  

  return {
    yokai: yokai.name,
    round: roundNumber,
    yokaiHP,
    totalAttackDamage,
    totalDefense,
    netDamageToYokai,
    remainingHP,
    actionResults
  };
}
