import { spillerVariabler } from "./SpillerVariabler.js";

import { fjender, fjendeVariabler } from "./fjender.js";

import { attackfjende, healfjende } from "./actions.js";

import {
  spilStatus,
  screenDiv,
  aabenKisteKnap,
  gendanLivKnap,
} from "./main.js";

import { levels } from "./levels.js";

export let spilLogikVariabler = {
  nuvaerendeSpiller: "",
  kampFaerdigDiv: document.createElement("div"),
};

export const nuvaerendeSpillersTur = () => {
  return `Det er ${spilLogikVariabler.nuvaerendeSpiller}s tur`;
};

//--------------Opdatering af spller- og fjendeinfo--------------
export const opdaterInfo = () => {
  const levelFjendeContainer = document.getElementById("levelFjendeContainer");

  if (fjendeVariabler.nuvaerendeFjende.erSkattekiste) {
    spillerVariabler.dineActions.style.visibility = "hidden";
    aabenKisteKnap.style.display = "inline-block";
  } else if (fjendeVariabler.nuvaerendeFjende.erTelt) {
    spillerVariabler.dineActions.style.visibility = "hidden";
    gendanLivKnap.style.display = "inline-block";
  }

  fjendeVariabler.fjendeNavn.textContent =
    fjendeVariabler.nuvaerendeFjende.navn;
  fjendeVariabler.fjendeLiv.textContent = fjendeVariabler.nuvaerendeFjende.liv;
  fjendeVariabler.fjendeLivMax.textContent =
    fjendeVariabler.nuvaerendeFjende.maxLiv;
  fjendeVariabler.fjendeMana.textContent =
    fjendeVariabler.nuvaerendeFjende.mana;
  fjendeVariabler.fjendeManaMax.textContent =
    fjendeVariabler.nuvaerendeFjende.maxMana;
  fjendeVariabler.fjendeLevel.textContent =
    fjendeVariabler.nuvaerendeFjende.level;
  fjendeVariabler.fjendeCharImg.src = fjendeVariabler.nuvaerendeFjende.charImg;

  fjendeVariabler.fjendeCharImg.style.width =
    fjendeVariabler.fjendeCharImg.style.height =
      fjendeVariabler.nuvaerendeFjende.fjendeImgSize;

  console.log("Total skade modifier:", spillerVariabler.totalSkadeModifier);
  console.log("Total heal modifier:", spillerVariabler.totalHealModifier);
  console.log("Total max HP increase:", spillerVariabler.totalMaxHpIncrease);

  spillerVariabler.heltCharImg.style.width =
    spillerVariabler.heltCharImg.style.height =
      fjendeVariabler.nuvaerendeFjende.heltImgSize;

  skiftBaggrund();
};

//--------------Ændring af baggrund alt efter antal fjender besejret--------------
const skiftBaggrund = () => {
  const fjendeIndex = fjendeVariabler.nuvaerendeFjendeIndex;
  if (fjendeIndex >= 0 && fjendeIndex <= 8) {
    screenDiv.style.backgroundImage =
      "url('./Billeder/Background_enviroment1.jpg')";
  } else if (fjendeIndex >= 9 && fjendeIndex <= 5) {
    screenDiv.style.backgroundImage =
      "url('./Billeder/Background_enviroment2.jpg')";
  } else if (fjendeIndex >= 6 && fjendeIndex <= 18) {
    screenDiv.style.backgroundImage =
      "url('./Billeder/Background_enviroment3.jpg')";
  } else if (fjendeIndex >= 19 && fjendeIndex <= 26) {
    screenDiv.style.backgroundImage =
      "url('./Billeder/Background_enviroment4.jpg')";
  } else {
    screenDiv.style.backgroundImage =
      "url('./Billeder/Background_enviroment5.jpg')";
  }
};

//--------------Opdatering af spller exp og level op--------------
const opdaterExp = () => {
  spillerVariabler.antalExp =
    spillerVariabler.antalExp + fjendeVariabler.nuvaerendeFjende.antalExp;

  const expProcent =
    (spillerVariabler.antalExp / spillerVariabler.ExpKrav) * 100;

  spillerVariabler.expFillBar.style.width = `${expProcent}%`;

  spillerVariabler.expSpiller.textContent = spillerVariabler.antalExp;

  if (spillerVariabler.antalExp >= spillerVariabler.ExpKrav) {
    spillerVariabler.levelHero++;
    spillerVariabler.antalExp =
      spillerVariabler.antalExp - spillerVariabler.ExpKrav;

    console.log("level op!");

    const levelFaktor = 1.5;
    spillerVariabler.ExpKrav = Math.round(
      spillerVariabler.ExpKrav * levelFaktor
    );

    spillerVariabler.nuvaerendeLevel = levels.find(
      (level) => level.level === spillerVariabler.levelHero
    );

    spillerVariabler.totalSkadeModifier +=
      spillerVariabler.nuvaerendeLevel.skadeModifier;
    spillerVariabler.totalMinSkadeModifier +=
      spillerVariabler.nuvaerendeLevel.minSkadeModifier;

    spillerVariabler.totalSpcSkadeModifier +=
      spillerVariabler.nuvaerendeLevel.spcSkademodifier;
    spillerVariabler.totalMinSpcSkadeModifier +=
      spillerVariabler.nuvaerendeLevel.minSpecSkadeModifier;

    spillerVariabler.totalHealModifier +=
      spillerVariabler.nuvaerendeLevel.healModifier;
    spillerVariabler.totalMinHealModifier +=
      spillerVariabler.nuvaerendeLevel.minHealModifier;

    spillerVariabler.totalMaxHpIncrease +=
      spillerVariabler.nuvaerendeLevel.maxHPIncrease;
    spillerVariabler.totalMaxMpIncrease +=
      spillerVariabler.nuvaerendeLevel.maxMPIncrease;

    console.log("Total skade modifier:", spillerVariabler.totalSkadeModifier);
    console.log("Total heal modifier:", spillerVariabler.totalHealModifier);
    console.log("Total max HP increase:", spillerVariabler.totalMaxHpIncrease);
    console.log("Total max MP increase:", spillerVariabler.totalMaxMpIncrease);

    spillerVariabler.antalhpdig =
      spillerVariabler.heltLiv + spillerVariabler.totalMaxHpIncrease;
    spillerVariabler.heltHP.textContent = spillerVariabler.antalhpdig;

    spillerVariabler.hpFillBar.style.width = "100%";

    spillerVariabler.antalManaDig =
      spillerVariabler.heltMana + spillerVariabler.totalMaxMpIncrease;
    spillerVariabler.heltMP.textContent = spillerVariabler.antalManaDig;

    spillerVariabler.manaFillBar.style.width = "100%";

    const overskydendeExpProcent =
      (spillerVariabler.antalExp / spillerVariabler.ExpKrav) * 100;

    spillerVariabler.expFillBar.style.width = `${overskydendeExpProcent}%`;
  }

  spillerVariabler.spillerLevel.textContent = spillerVariabler.levelHero;
  spillerVariabler.expSpiller.textContent = spillerVariabler.antalExp;
  spillerVariabler.kravExpSpiller.textContent = spillerVariabler.ExpKrav;
  spillerVariabler.heltMaxHP.textContent =
    spillerVariabler.heltLiv + spillerVariabler.totalMaxHpIncrease;
  spillerVariabler.heltMaxMP.textContent =
    spillerVariabler.heltMana + spillerVariabler.totalMaxMpIncrease;
};

//--------------Logik til at bestemme hvem der starter i en ny kamp--------------
const bestemHvemStarter = () => {
  const randomStarter = Math.random();

  if (
    fjendeVariabler.nuvaerendeFjende &&
    fjendeVariabler.nuvaerendeFjende.erSkattekiste
  ) {
    spilLogikVariabler.nuvaerendeSpiller = "spilleren";
    spillerVariabler.dineActions.style.visibility = "hidden";
  } else if (
    fjendeVariabler.nuvaerendeFjende &&
    fjendeVariabler.nuvaerendeFjende.erTelt
  ) {
    spilLogikVariabler.nuvaerendeSpiller = "spilleren";
    spillerVariabler.dineActions.style.visibility = "hidden";
  } else if (randomStarter < 0.4) {
    spilLogikVariabler.nuvaerendeSpiller = "spilleren";
    spillerVariabler.dineActions.style.visibility = "visible";
  } else {
    spilLogikVariabler.nuvaerendeSpiller =
      fjendeVariabler.nuvaerendeFjende.navn;
    setTimeout(() => fjendesTur(), 1000);
  }

  spilStatus.innerHTML = nuvaerendeSpillersTur();

  if (spilLogikVariabler.nuvaerendeSpiller !== "spilleren") {
    spillerVariabler.dineActions.style.visibility = "hidden";

    setTimeout(() => {
      if (
        fjendeVariabler.nuvaerendeFjende.liv > 0 &&
        spillerVariabler.antalhpdig > 0
      ) {
        spillerVariabler.dineActions.style.visibility = "visible";
      }
    }, 2000);
  }
};

//--------------Opdatering af ny fjende--------------
export const skiftFjende = () => {
  fjendeVariabler.nuvaerendeFjendeIndex++;
  fjendeVariabler.hpFillBarFjende.style.width = "100%";
  fjendeVariabler.manaFillBarFjende.style.width = "100%";

  if (fjendeVariabler.nuvaerendeFjendeIndex < fjender.length) {
    fjendeVariabler.nuvaerendeFjende =
      fjender[fjendeVariabler.nuvaerendeFjendeIndex];

    opdaterInfo();
    bestemHvemStarter();

    if (spilLogikVariabler.kampFaerdigDiv) {
      spilLogikVariabler.kampFaerdigDiv.remove();
    }
  } else {
    spilStatus.innerHTML = "Du har besejret dragen!";
    spillerVariabler.dineActions.style.visibility = "hidden";
  }
};

//--------------Logik til at skifte tur i mellem spiller og fjende--------------
export const skiftTur = () => {
  if (spilLogikVariabler.nuvaerendeSpiller === "spilleren") {
    spilLogikVariabler.nuvaerendeSpiller = `${fjendeVariabler.nuvaerendeFjende.navn}`;
  } else {
    spilLogikVariabler.nuvaerendeSpiller = "spilleren";
  }
  setTimeout(() => {
    spilStatus.innerHTML = nuvaerendeSpillersTur();
  }, 1000);

  if (spilLogikVariabler.nuvaerendeSpiller !== "spilleren") {
    spillerVariabler.dineActions.style.visibility = "hidden";

    setTimeout(() => {
      fjendesTur();

      if (
        fjendeVariabler.nuvaerendeFjende.liv > 0 &&
        spillerVariabler.antalhpdig > 0
      ) {
        setTimeout(() => {
          spillerVariabler.dineActions.style.visibility = "visible";
        }, 1000);
      }
    }, 2000);
  }
};

//--------------Styre om fjenden skal angribe eller heale--------------
const fjendesTur = () => {
  const graenseForHeal = 0.5 * fjendeVariabler.nuvaerendeFjende.maxLiv;
  if (fjendeVariabler.nuvaerendeFjende.liv > 0) {
    if (
      fjendeVariabler.nuvaerendeFjende.kanHeal &&
      fjendeVariabler.nuvaerendeFjende.liv <= graenseForHeal
    ) {
      const healEllerAngrib = Math.floor(Math.random() * 3);
      if (
        (healEllerAngrib === 0 || healEllerAngrib === 1) &&
        fjendeVariabler.nuvaerendeFjende.mana >=
          fjendeVariabler.healManaCostFjende
      ) {
        healfjende();
      } else {
        attackfjende();
      }
    } else {
      attackfjende();
    }
  }
};

//--------------Logik til at bestemme vinder og om sidste fjende er besejret--------------
export const bestemVinder = () => {
  const forrigeLevelHero = spillerVariabler.levelHero;
  const startOver = () => {
    location.reload();
  };

  if (fjendeVariabler.nuvaerendeFjende.liv === 0) {
    spilStatus.innerHTML = "Spilleren vandt!";

    setTimeout(() => {
      fjendeVariabler.fjendeCharImg.src = "./Billeder/enemy_tombstone.png";
    }, 1500);

    setTimeout(() => {
      spilLogikVariabler.kampFaerdigDiv.classList.add("kampfaerdig");

      spilLogikVariabler.kampFaerdigDiv.innerHTML = `
      <div id="resultDiv">
    <p>Du besejrede </br> ${fjendeVariabler.nuvaerendeFjende.navn} </br></br> + ${fjendeVariabler.nuvaerendeFjende.antalExp} Exp</p>
    <button id="naesteKamp"> Kæmp videre </button>
    </div>
    `;
      opdaterExp();

      if (fjendeVariabler.nuvaerendeFjendeIndex === fjender.length - 1) {
        spilLogikVariabler.kampFaerdigDiv.innerHTML = `
          <div id="resultDiv">
        <p>Du besejrede </br> ${fjendeVariabler.nuvaerendeFjende.navn} </br></br>Eldoria er reddet </br> og kan nu leve trygt igen! </p>
        <button id="spilFaerdig"> Spil igen </button>
        </div>
        `;
      } else if (spillerVariabler.levelHero > forrigeLevelHero) {
        const PowerUpsAtVise = [
          {
            stat: "Hp",
            vaerdi: spillerVariabler.nuvaerendeLevel.maxHPIncrease,
          },
          {
            stat: "Mp",
            vaerdi: spillerVariabler.nuvaerendeLevel.maxMPIncrease,
          },
          {
            stat: "Attack",
            vaerdi: spillerVariabler.nuvaerendeLevel.skadeModifier,
          },
          {
            stat: "Spc attack",
            vaerdi: spillerVariabler.nuvaerendeLevel.spcSkademodifier,
          },
          {
            stat: "Heal",
            vaerdi: spillerVariabler.nuvaerendeLevel.healModifier,
          },
        ];

        const filtreretPowerUpAttributes = PowerUpsAtVise.filter(
          (attr) => attr.vaerdi > 0
        );

        const powerUpAttributesHTML = filtreretPowerUpAttributes
          .map(
            (attr) => `
        </br> + ${attr.vaerdi} ${attr.stat}
      `
          )
          .join("");

        spilLogikVariabler.kampFaerdigDiv.innerHTML = `
              <div id="resultDiv">
            <p>LEVEL OP! </br>
            level ${spillerVariabler.levelHero}
            </br> ${powerUpAttributesHTML}
            </p>
            <button id="naesteKamp"> Kæmp videre </button>
            </div>
            `;
      }
      screenDiv.appendChild(spilLogikVariabler.kampFaerdigDiv);

      if (fjendeVariabler.nuvaerendeFjendeIndex === fjender.length - 1) {
        const spilFaerdigKnap = document.getElementById("spilFaerdig");
        spilFaerdigKnap.addEventListener("click", startOver);
      } else {
        const naesteKampKnap = document.getElementById("naesteKamp");
        naesteKampKnap.addEventListener("click", skiftFjende);
      }
    }, 2000);
  } else if (spillerVariabler.antalhpdig === 0) {
    spilStatus.innerHTML = `${fjendeVariabler.nuvaerendeFjende.navn} vandt!`;

    setTimeout(() => {
      spillerVariabler.heltCharImg.src = "./Billeder/Hero_tombstone.png";
    }, 1000);

    setTimeout(() => {
      spilLogikVariabler.kampFaerdigDiv.classList.add("kampfaerdig");

      spilLogikVariabler.kampFaerdigDiv.innerHTML = `
        <div id="resultDiv">
      <p>Du blev besejret af </br> ${fjendeVariabler.nuvaerendeFjende.navn}</p>
      <button id="proevIgen"> Spil igen </button>
      </div>
      `;

      screenDiv.appendChild(spilLogikVariabler.kampFaerdigDiv);
      const proevIgenKnap = document.getElementById("proevIgen");
      proevIgenKnap.addEventListener("click", startOver);
    }, 2000);
  }
};
