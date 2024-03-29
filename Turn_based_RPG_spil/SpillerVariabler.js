import { levels } from "./levels.js";
export let spillerVariabler = {
  heltLiv: 100,
  antalhpdig: 100,
  heltMana: 40,
  antalManaDig: 40,
  antalExp: 0,
  ExpKrav: 100,
  vaaben: "Hero.png",
  totalSkadeModifier: 0,
  totalMinSkadeModifier: 0,
  totalSpcSkadeModifier: 0,
  totalMinSpcSkadeModifier: 0,
  totalHealModifier: 0,
  totalMinHealModifier: 0,
  totalMaxHpIncrease: 0,
  totalMaxMpIncrease: 0,
  spillerLevel: document.getElementById("heroLevel"),
  heltHP: document.getElementById("HPdig"),
  heltMaxHP: document.getElementById("maxHPdig"),
  heltMP: document.getElementById("MPDig"),
  heltMaxMP: document.getElementById("maxMPDig"),
  expSpiller: document.getElementById("expDig"),
  kravExpSpiller: document.getElementById("maxExpDig"),
  dineActions: document.getElementById("actionsDig"),
  heltCharImg: document.getElementById("heroCharImg"),
  expFillBar: document.getElementById("expFill"),
  hpFillBar: document.getElementById("hpFill"),
  manaFillBar: document.getElementById("manaFill"),
  nuvaerendeLevelIndex: 0,
  nuvaerendeLevel: levels[0],
  levelHero: levels[0].level,
};
