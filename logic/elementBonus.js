const weaknessMap = {
  Fire: "Wind",
  Wind: "Lightning",
  Lightning: "Ice",
  Ice: "Fire"
};

export function getElementBonusDice(spell, yokai) {
  const spellElement = spell.element;
  const yokaiElement = yokai.element;

  if (weaknessMap[spellElement] === yokaiElement) {
    return 1; // +1 bonus die
  }

  return 0;
}
