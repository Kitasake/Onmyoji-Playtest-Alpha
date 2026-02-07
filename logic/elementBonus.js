// elementBonus.js

const strengthMap = {
  Fire: "Ice",
  Ice : "Lightning",
  Lightning : "Wind",
  Wind : "Fire
};

/**
 * Returns bonus dice based on spell type and element interaction
 * @param {Object} spell
 * @param {Object} yokai
 * @returns {number}
 */
export function getElementBonusDice(spell, yokai) {
  const spellElement = spell.element;
  const yokaiElement = yokai.element;

  // ATTACK: spell is strong against Yokai
  if (
    spell.type === "attack" &&
    strengthMap[spellElement] === yokaiElement
  ) {
    return 1;
  }

  // DEFENSE: Element matches Yokai
  if (
    spell.type === "defense" &&
    spellElement === yokaiElement
  ) {
    return 1;
  }

  return 0;
}
