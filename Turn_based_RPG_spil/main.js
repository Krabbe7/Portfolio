import { spillerVariabler } from "./SpillerVariabler.js";
import { fjendeVariabler, skatteKister, mimics } from "./fjender.js";
import { attack, spcAttack, heal } from "./actions.js";
import {
  opdaterInfo,
  nuvaerendeSpillersTur,
  spilLogikVariabler,
  skiftFjende,
} from "./Spillogik.js";

export const spilStatus = document.getElementById("spilstatus");

export const screenDiv = document.getElementById("windowContainer2");

//--------------Funktion til at starte spillet--------------
const start = document.getElementById("startKamp");
start.addEventListener("click", function () {
  const gameContainer = document.getElementById("gameContainer");
  const scrollDivStart = document.getElementById("windowContainer1");
  const infoDiv = document.getElementById("windowContainer3");
  const actionsDiv = document.getElementById("windowContainer4");
  gameContainer.style.border = "2px solid";
  scrollDivStart.style.display = "none";
  screenDiv.style.display = "flex";
  actionsDiv.style.display = "flex";
  infoDiv.style.display = "block";

  let valgtSpiller = "spilleren";

  spillerVariabler.heltHP.textContent = spillerVariabler.antalhpdig;
  spillerVariabler.heltMaxHP.textContent = spillerVariabler.heltLiv;
  spillerVariabler.heltMP.textContent = spillerVariabler.antalManaDig;
  spillerVariabler.heltMaxMP.textContent = spillerVariabler.heltMana;
  spillerVariabler.spillerLevel.textContent = spillerVariabler.levelHero;
  spillerVariabler.expSpiller.textContent = spillerVariabler.antalExp;
  spillerVariabler.kravExpSpiller.textContent = spillerVariabler.ExpKrav;

  spilLogikVariabler.nuvaerendeSpiller = valgtSpiller;
  spilStatus.innerHTML = nuvaerendeSpillersTur();
  fjendeVariabler.fjendeCharImg.src = fjendeVariabler.nuvaerendeFjende.charImg;

  opdaterInfo();
});

//--------------Logik til hvis man møder en skattekiste--------------
let aktuelSkattekisteTæller = 0;
let mimicTæller = 0;

const aabenChest = () => {
  aabenKisteKnap.style.display = "none";
  let treasure;
  let kisteEllerMimic = Math.floor(Math.random() * 3);

  if (
    (kisteEllerMimic === 2 && mimicTæller < mimics.length) ||
    (aktuelSkattekisteTæller >= 3 && mimicTæller < mimics.length)
  ) {
    fjendeVariabler.nuvaerendeFjende = mimics[mimicTæller];
    mimicTæller++;
    spillerVariabler.dineActions.style.visibility = "visible";
    opdaterInfo();
  } else {
    fjendeVariabler.nuvaerendeFjende = skatteKister[aktuelSkattekisteTæller];
    aktuelSkattekisteTæller++;

    fjendeVariabler.fjendeCharImg.src =
      "./billeder/" + fjendeVariabler.nuvaerendeFjende.treasure;

    const vaabenNavn = fjendeVariabler.nuvaerendeFjende.skattekisteVaaben
      .replace("Hero", "")
      .replace("_", "")
      .replace("_", " ")
      .replace(".png", "");

    console.log("Før opdatering:");
    console.log("Total skade modifier:", spillerVariabler.totalSkadeModifier);
    console.log("Total heal modifier:", spillerVariabler.totalHealModifier);
    console.log("Total max HP increase:", spillerVariabler.totalMaxHpIncrease);

    spillerVariabler.totalMaxHpIncrease +=
      fjendeVariabler.nuvaerendeFjende.maxHPIncreaseHelt;

    spillerVariabler.totalSkadeModifier +=
      fjendeVariabler.nuvaerendeFjende.skadeModifierHelt;

    spillerVariabler.totalHealModifier +=
      fjendeVariabler.nuvaerendeFjende.healModifierHelt;

    console.log("Efter opdatering:");
    console.log("Total skade modifier:", spillerVariabler.totalSkadeModifier);
    console.log("Total heal modifier:", spillerVariabler.totalHealModifier);
    console.log("Total max HP increase:", spillerVariabler.totalMaxHpIncrease);
    spillerVariabler.heltMaxHP.textContent =
      spillerVariabler.heltLiv + spillerVariabler.totalMaxHpIncrease;

    const hpProcent =
      (spillerVariabler.antalhpdig /
        (spillerVariabler.heltLiv + spillerVariabler.totalMaxHpIncrease)) *
      100;
    spillerVariabler.hpFillBar.style.width = hpProcent + "%";

    setTimeout(() => {
      spilLogikVariabler.kampFaerdigDiv.classList.add("kampfaerdig");

      spilLogikVariabler.kampFaerdigDiv.innerHTML = `
    <div id="resultDiv">
  <p>Du fundet </br> ${vaabenNavn} </br>
  </br>+ ${fjendeVariabler.nuvaerendeFjende.maxHPIncreaseHelt} hp
  </br>+ ${fjendeVariabler.nuvaerendeFjende.skadeModifierHelt} skade
  </br> + ${fjendeVariabler.nuvaerendeFjende.healModifierHelt} heal
  </br>
  </br> 
  <button id="naesteKamp"> Kæmp videre </button>
  </div>
  `;

      windowContainer2.appendChild(spilLogikVariabler.kampFaerdigDiv);

      const naesteKampKnap = document.getElementById("naesteKamp");
      naesteKampKnap.addEventListener("click", () => {
        skiftFjende();
        // Når du åbner en kiste
        spillerVariabler.vaaben =
          skatteKister[aktuelSkattekisteTæller - 1].skattekisteVaaben;

        // Opdater heltens billede med det nye våben
        spillerVariabler.heltCharImg.src =
          "./billeder/" + spillerVariabler.vaaben;
      });
    }, 1000);
  }
};
export const aabenKisteKnap = document.getElementById("aabenKiste");
aabenKisteKnap.addEventListener("click", aabenChest);

//--------------Logik til hvis man møder et hvilested--------------
const hvileSted = () => {
  gendanHP.style.display = "none";

  fjendeVariabler.fjendeCharImg.src = "./billeder/tent.png";

  spillerVariabler.antalhpdig =
    spillerVariabler.heltLiv + spillerVariabler.totalMaxHpIncrease;
  spillerVariabler.heltHP.textContent = spillerVariabler.antalhpdig;

  spillerVariabler.hpFillBar.style.width = "100%";

  spillerVariabler.antalManaDig =
    spillerVariabler.heltMana + spillerVariabler.totalMaxMpIncrease;
  spillerVariabler.heltMP.textContent = spillerVariabler.antalManaDig;

  spillerVariabler.manaFillBar.style.width = "100%";

  setTimeout(() => {
    spilLogikVariabler.kampFaerdigDiv.classList.add("kampfaerdig");

    spilLogikVariabler.kampFaerdigDiv.innerHTML = `
      <div id="resultDiv">
        <p>Du fundet et hvilested </br></br></br>Du har gendannet HP </br>og klar til at kæmpe videre! </p>
        <button id="naesteKamp">Næste kamp</button>
      </div>
    `;

    windowContainer2.appendChild(spilLogikVariabler.kampFaerdigDiv);

    const naesteKampKnap = document.getElementById("naesteKamp");

    naesteKampKnap.addEventListener("click", skiftFjende);
  }, 1000);
};

export const gendanLivKnap = document.getElementById("gendanHP");
gendanLivKnap.addEventListener("click", hvileSted);

const buttonattackdig = document.getElementById("attackDig");
buttonattackdig.addEventListener("click", attack);

const buttonspcattackdig = document.getElementById("spcAttackDig");
buttonspcattackdig.addEventListener("click", spcAttack);

const buttonhealdig = document.getElementById("healbredDig");
buttonhealdig.addEventListener("click", heal);
