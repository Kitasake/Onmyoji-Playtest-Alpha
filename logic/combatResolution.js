// combatResolution.js
// Resolves spell effects, dice rolls, and damage vs Yokai

import { rollDice } from "./dice.js";
import { qualifiesForElementBonus } from "./elementBonus.js";

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
  let attackBonusUsed = false;
  let defenseBonusUsed = false;

  const actionResults = [];

  playerActions.forEach(action => {
    const { spell } = action;

    const isAttack = spell.type === "attack";
    const isDefense = spell.type === "defense";

    let diceExpression = spell.dice;
    let bonusDice = 0;

    if (qualifiesForElementBonus(spell, yokai)) {
      if (spell.type === "attack" && !attackBonusUsed) {
        bonusDice = 1;
        attackBonusUsed = true;
      }

      if (spell.type === "defense" && !defenseBonusUsed) {
        bonusDice = 1;
        defenseBonusUsed = true;
      }
    }
    

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

  function resolveDefense(spells, yokai) {
  return spells.filter(spell => {
    if (!spell.isDefense) return false;

    const rule = gameState.rules.defenseElementRestriction;

    if (rule === "none") return true;
    if (rule === "match") return spell.element === yokai.element;

    return true;
  });
}

  function applyResistance(totalAttackDice, spells, yokai) {
  const rule = gameState.rules.resistancePenalty;

  if (!rule.enabled) return totalAttackDice;

  const hasWeakAttack = spells.some(
    s => s.isAttack && s.element === yokai.strongAgainst
  );

  if (!hasWeakAttack) return totalAttackDice;

  return Math.max(0, totalAttackDice - rule.removeDice);
}

  

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
