// Variable der bruges til at vise spilstatusbeskeder.
const statusDisplay = document.querySelector(".spilstatus");

// Variabel til at styre om spillet er i gang eller ej.
let spilIGang = true;

// Variabel til at holde styr på den nuværende spiller.
let nuvaerendeSpiller = "";

// Variabel og funtion til at holde styr på om spiller 1 er X eller O og start spillet
let valgtSymbol = "";

document.querySelector(".vaelgX").addEventListener("click", function () {
  valgtSymbol = "X";
  startSpillet();
});

document.querySelector(".vaelgO").addEventListener("click", function () {
  valgtSymbol = "O";
  startSpillet();
});

// Viser spillet på spillebrættet, og skjuler valg af x eller o boks.
startSpillet = () => {
  document.querySelector(".vaelgxo").style.display = "none";
  document.querySelector("section").style.display = "block";

  nuvaerendeSpiller = valgtSymbol;

  statusDisplay.innerHTML = nuvaerendeSpillersTur();
};
// Array til at repræsentere tilstanden af spillet på spillebrættet.
let spilState = ["", "", "", "", "", "", "", "", ""];

// Funktion, der returnerer en besked om, hvem der har vundet.
const vinderBesked = () => `${nuvaerendeSpiller} vandt!`;

// Funktion, der returnerer en besked om uafgjort.
const uafgjordt = () => `Det blev uafgjordt`;

// Funktion, der returnerer en besked om, hvis tur det er.
const nuvaerendeSpillersTur = () => `Det er ${nuvaerendeSpiller}'s tur`;

// Angiver spilstatusbeskeden med den nuværende spillers tur.
statusDisplay.innerHTML = nuvaerendeSpillersTur();

// Funktion til at håndtere spillets logik, når en celle klikkes på.
const handleCellSpillet = (klikketCell, klikketCellIndex) => {
  spilState[klikketCellIndex] = nuvaerendeSpiller;
  klikketCell.innerHTML = nuvaerendeSpiller;
  klikketCell.setAttribute("data-symbol", nuvaerendeSpiller);
};

// Funktion til at skifte den nuværende spiller.
const handleSpillerSkift = () => {
  nuvaerendeSpiller = nuvaerendeSpiller === "X" ? "O" : "X";
  statusDisplay.innerHTML = nuvaerendeSpillersTur();
};

// Vindende kombinationer på spillebrættet.
const vinderBetingelser = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Funktion til at validere og håndtere resultatet af spillet.
const handleResultatValidering = () => {
  let rundteVundet = false;
  for (let i = 0; i <= 7; i++) {
    const vindBetingelse = vinderBetingelser[i];
    let a = spilState[vindBetingelse[0]];
    let b = spilState[vindBetingelse[1]];
    let c = spilState[vindBetingelse[2]];

    // Hvis en af cellerne er tom, fortsæt med næste iteration.
    if (a === "" || b === "" || c === "") {
      continue;
    }

    // Hvis de tre celler er ens, har den nuværende spiller vundet.
    if (a === b && b === c) {
      rundteVundet = true;
      break;
    }
  }

  // Hvis runden er vundet, opdater statusbeskeden og afslut spillet.
  if (rundteVundet) {
    statusDisplay.innerHTML = vinderBesked();
    spilIGang = false;
    return;
  }

  let rundteUafgjort = !spilState.includes("");
  if (rundteUafgjort) {
    statusDisplay.innerHTML = uafgjordt();
    spilIGang = false;
    return;
  }

  // Hvis runden ikke er vundet, skift spilleren.
  handleSpillerSkift();
};

// Funktion til at håndtere klik på en celle.
const handleCellKlik = (klikketCellEvent) => {
  const klikketCell = klikketCellEvent.target;

  // Hent indexet for den klikkede celle fra dens attribut.
  const klikketCellIndex = parseInt(
    klikketCell.getAttribute("data-cell-index")
  );

  // Hvis cellen allerede er klikkry på eller spillet ikke er i gang, skal der ikke gøres noget.
  if (spilState[klikketCellIndex] !== "" || !spilIGang) {
    return;
  }

  // Opdatere spiltilstanden og checke resultatet.
  handleCellSpillet(klikketCell, klikketCellIndex);
  handleResultatValidering();
};

// Funktion til at genstarte spillet.
const handleGenstartSpil = () => {
  spilIGang = true;
  nuvaerendeSpiller = nuvaerendeSpiller === "X" ? "O" : "X";
  spilState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = nuvaerendeSpillersTur();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
};

// Gør det muligt at klikke på alle celler og knappen til at genstarte spillet.
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellKlik));
document
  .querySelector(".genstartSpil")
  .addEventListener("click", handleGenstartSpil);
