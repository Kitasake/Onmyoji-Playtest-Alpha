// elementBonus.js

const weaknessMap = {
  Fire: "Ice",
  Wind: "Fire",
  Lightning: "Wind",
  Ice: "Lightning"
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
