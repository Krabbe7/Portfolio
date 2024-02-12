import { spilStatus } from "./main.js";
import { spillerVariabler } from "./SpillerVariabler.js";
import { fjendeVariabler } from "./fjender.js";
import { skiftTur, bestemVinder } from "./Spillogik.js";

//--------------Funktion til spillerens angreb--------------
export const attack = () => {
  const dmgNumberFjende = document.getElementById("dmgNumberFjende");
  const minSkade = 5 + spillerVariabler.totalMinSkadeModifier;
  const maxSkade = 20 + spillerVariabler.totalSkadeModifier;
  const hpSkade = Math.floor(
    Math.random() * (maxSkade - minSkade + 1) + minSkade
  );

  fjendeVariabler.nuvaerendeFjende.liv = Math.max(
    fjendeVariabler.nuvaerendeFjende.liv - hpSkade,
    0
  );

  const hpProcentFjende =
    (fjendeVariabler.nuvaerendeFjende.liv /
      fjendeVariabler.nuvaerendeFjende.maxLiv) *
    100;
  fjendeVariabler.hpFillBarFjende.style.width = hpProcentFjende + "%";

  fjendeVariabler.fjendeLiv.textContent = fjendeVariabler.nuvaerendeFjende.liv;

  fjendeVariabler.fjendeCharImg.src =
    fjendeVariabler.nuvaerendeFjende.charImgDmg;

  dmgNumberFjende.classList.add("active");
  dmgNumberFjende.style.display = "block";
  dmgNumberFjende.textContent = `-${hpSkade}`;

  setTimeout(() => {
    dmgNumberFjende.classList.remove("active");
    dmgNumberFjende.style.display = "none";
    dmgNumberFjende.textContent = "";
  }, 1500);

  setTimeout(() => {
    fjendeVariabler.fjendeCharImg.src =
      fjendeVariabler.nuvaerendeFjende.charImg;
  }, 500);

  if (
    fjendeVariabler.nuvaerendeFjende.liv === 0 ||
    (fjendeVariabler.nuvaerendeFjende.erMimic &&
      fjendeVariabler.nuvaerendeFjende.liv === 0)
  ) {
    spillerVariabler.dineActions.style.visibility = "hidden";
    bestemVinder();
  } else {
    skiftTur();
  }
};

//--------------Funktion til spillerens special angreb--------------
export const spcAttack = () => {
  const dmgNumberFjende = document.getElementById("dmgNumberFjende");
  const spcAtkManaCost =
    15 + spillerVariabler.nuvaerendeLevel.spcAttackMpCostIncrease;
  const spcMinSkade = 15 + spillerVariabler.totalMinSpcSkadeModifier;
  const spcMaxSkade = 30 + spillerVariabler.totalSpcSkadeModifier;

  if (spillerVariabler.antalManaDig >= spcAtkManaCost) {
    spillerVariabler.antalManaDig -= spcAtkManaCost;
    const hpSkade = Math.floor(
      Math.random() * (spcMaxSkade - spcMinSkade + 1) + spcMinSkade
    );

    fjendeVariabler.nuvaerendeFjende.liv = Math.max(
      fjendeVariabler.nuvaerendeFjende.liv - hpSkade,
      0
    );

    const hpProcentFjende =
      (fjendeVariabler.nuvaerendeFjende.liv /
        fjendeVariabler.nuvaerendeFjende.maxLiv) *
      100;
    fjendeVariabler.hpFillBarFjende.style.width = hpProcentFjende + "%";

    fjendeVariabler.fjendeLiv.textContent =
      fjendeVariabler.nuvaerendeFjende.liv;

    fjendeVariabler.fjendeCharImg.src =
      fjendeVariabler.nuvaerendeFjende.charImgDmg;

    dmgNumberFjende.classList.add("active");
    dmgNumberFjende.style.display = "block";
    dmgNumberFjende.textContent = `-${hpSkade}`;

    spillerVariabler.heltMP.textContent = spillerVariabler.antalManaDig;

    const manaProcent =
      (spillerVariabler.antalManaDig / spillerVariabler.heltMana) * 100;
    spillerVariabler.manaFillBar.style.width = manaProcent + "%";

    setTimeout(() => {
      dmgNumberFjende.classList.remove("active");
      dmgNumberFjende.style.display = "none";
      dmgNumberFjende.textContent = "";
    }, 1500);

    setTimeout(() => {
      fjendeVariabler.fjendeCharImg.src =
        fjendeVariabler.nuvaerendeFjende.charImg;
    }, 500);

    if (
      fjendeVariabler.nuvaerendeFjende.liv === 0 ||
      (fjendeVariabler.nuvaerendeFjende.erMimic &&
        fjendeVariabler.nuvaerendeFjende.liv === 0)
    ) {
      spillerVariabler.dineActions.style.visibility = "hidden";
      bestemVinder();
    } else {
      skiftTur();
    }
  } else {
    spilStatus.innerHTML = "Ikke nok MP!";
  }
};

//--------------Funktion til spillerens healing--------------
export const heal = () => {
  let healManaCost = 5 + spillerVariabler.nuvaerendeLevel.mpCostIncrease;
  const healNumberHero = document.getElementById("healNumberHero");
  const minHeal = 5 + spillerVariabler.totalMinHealModifier;
  const maxHeal = 15 + spillerVariabler.totalHealModifier;

  if (spillerVariabler.antalManaDig >= healManaCost) {
    spillerVariabler.antalManaDig -= healManaCost;
    const hpHeal = Math.floor(
      Math.random() * (maxHeal - minHeal + 1) + minHeal
    );

    spillerVariabler.antalhpdig = Math.min(
      spillerVariabler.antalhpdig + hpHeal + spillerVariabler.totalHealModifier,
      spillerVariabler.heltLiv + spillerVariabler.totalMaxHpIncrease
    );

    spillerVariabler.heltHP.textContent = spillerVariabler.antalhpdig;

    const hpProcentHeal =
      (spillerVariabler.antalhpdig /
        (spillerVariabler.heltLiv + spillerVariabler.totalMaxHpIncrease)) *
      100;
    spillerVariabler.hpFillBar.style.width = hpProcentHeal + "%";

    spillerVariabler.heltCharImg.src =
      "Billeder/" + spillerVariabler.vaaben.replace(".png", "_heal.png");

    healNumberHero.classList.add("active");
    healNumberHero.style.display = "block";
    healNumberHero.textContent = `+${hpHeal}`;

    spillerVariabler.heltMP.textContent = spillerVariabler.antalManaDig;

    const manaProcent =
      (spillerVariabler.antalManaDig /
        (spillerVariabler.heltMana + spillerVariabler.totalMaxMpIncrease)) *
      100;
    spillerVariabler.manaFillBar.style.width = manaProcent + "%";

    setTimeout(() => {
      healNumberHero.classList.remove("active");
      healNumberHero.style.display = "none";
      healNumberHero.textContent = "";
    }, 1000);

    setTimeout(() => {
      spillerVariabler.heltCharImg.src = "Billeder/" + spillerVariabler.vaaben;
    }, 500);

    skiftTur();
  } else {
    spilStatus.innerHTML = "Ikke nok MP!";
  }
};

//--------------Funktion til fjendens angreb--------------
export const attackfjende = () => {
  const dmgNumberHero = document.getElementById("dmgNumberHero");
  const minSkade = 5 + fjendeVariabler.nuvaerendeFjende.minSkadeModifierFjende;
  const maxSkade = 15 + fjendeVariabler.nuvaerendeFjende.skadeModifierFjende;

  const hpSkade = Math.floor(
    Math.random() * (maxSkade - minSkade + 1) + minSkade
  );

  spillerVariabler.antalhpdig = Math.max(
    spillerVariabler.antalhpdig - hpSkade,
    0
  );

  spillerVariabler.heltHP.textContent = spillerVariabler.antalhpdig;

  const hpProcent =
    (spillerVariabler.antalhpdig /
      (spillerVariabler.heltLiv + spillerVariabler.totalMaxHpIncrease)) *
    100;
  spillerVariabler.hpFillBar.style.width = hpProcent + "%";

  spillerVariabler.heltCharImg.src =
    "./Billeder/" + spillerVariabler.vaaben.replace(".png", "_damage.png");

  dmgNumberHero.classList.add("active");
  dmgNumberHero.style.display = "block";
  dmgNumberHero.textContent = `-${hpSkade}`;

  setTimeout(() => {
    dmgNumberHero.classList.remove("active");
    dmgNumberHero.style.display = "none";
    dmgNumberHero.textContent = "";
  }, 1000);

  setTimeout(() => {
    spillerVariabler.heltCharImg.src = "./Billeder/" + spillerVariabler.vaaben;
  }, 500);

  skiftTur();

  if (spillerVariabler.antalhpdig === 0) {
    spillerVariabler.dineActions.style.visibility = "hidden";
    bestemVinder();
  }
};

//--------------Funktion til fjendens heal--------------
export const healfjende = () => {
  const healNumberFjende = document.getElementById("healNumberFjende");
  let healManaCostFjende = 5 + fjendeVariabler.nuvaerendeFjende.mpCostFjende;

  const minHeal = 5 + fjendeVariabler.nuvaerendeFjende.minHealModifierFjende;
  const maxHeal = 15 + fjendeVariabler.nuvaerendeFjende.healModifierFjende;

  const hpHeal = Math.floor(Math.random() * (maxHeal - minHeal + 1) + minHeal);

  fjendeVariabler.nuvaerendeFjende.liv = Math.min(
    fjendeVariabler.nuvaerendeFjende.liv +
      hpHeal +
      fjendeVariabler.nuvaerendeFjende.healModifierFjende,
    fjendeVariabler.nuvaerendeFjende.maxLiv
  );

  fjendeVariabler.fjendeLiv.textContent = fjendeVariabler.nuvaerendeFjende.liv;

  fjendeVariabler.fjendeCharImg.src =
    fjendeVariabler.nuvaerendeFjende.charImgHeal;

  const hpProcentHealFjende =
    (fjendeVariabler.nuvaerendeFjende.liv /
      fjendeVariabler.nuvaerendeFjende.maxLiv) *
    100;

  fjendeVariabler.hpFillBarFjende.style.width = hpProcentHealFjende + "%";

  fjendeVariabler.nuvaerendeFjende.mana -= healManaCostFjende;
  fjendeVariabler.fjendeMana.textContent =
    fjendeVariabler.nuvaerendeFjende.mana;

  const manaProcentFjende =
    (fjendeVariabler.nuvaerendeFjende.mana /
      fjendeVariabler.nuvaerendeFjende.maxMana) *
    100;
  fjendeVariabler.manaFillBarFjende.style.width = manaProcentFjende + "%";

  healNumberFjende.classList.add("active");
  healNumberFjende.style.display = "block";
  healNumberFjende.textContent = `+${hpHeal}`;

  setTimeout(() => {
    healNumberFjende.classList.remove("active");
    healNumberFjende.style.display = "none";
    healNumberFjende.textContent = "";
  }, 1000);

  setTimeout(() => {
    fjendeVariabler.fjendeCharImg.src =
      fjendeVariabler.nuvaerendeFjende.charImg;
  }, 500);

  skiftTur();
};
