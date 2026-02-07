// elementBonus.js

const weaknessMap = {
  Fire: "Wind",
  Wind: "Lightning",
  Lightning: "Ice",
  Ice: "Fire"
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

  // ATTACK: Yokai is weak to this element
  if (
    spell.type === "attack" &&
    weaknessMap[spellElement] === yokaiElement
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
