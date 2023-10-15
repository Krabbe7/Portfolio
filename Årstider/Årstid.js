// Metode til at vise beskeder
let se = {
  displayMessage: function (msg) {
    let beskedomrade = document.getElementById("beskedomrade");
    beskedomrade.innerHTML = msg;
  }
};

// Variabel til at holde timeout-id
let timeoutId;

// Funktion for at behandle indtastning
function indtast() {
  // Måneder opdelt i årstider
  let månederForår = ["Marts", "April", "Maj"];
  let månederSommer = ["Juni", "Juli", "August"];
  let månederEfterår = ["September", "Oktober", "November"];
  let månederVinter = ["December", "Januar", "Februar"];

  // Hent input-elementet
  let inputElement = document.getElementById("måned");
  let indtastetMåned = inputElement.value.trim();

  // Gør den første bogstav stort og resten små for at det kan sammenlignes med måned-array'erne
  indtastetMåned =
    indtastetMåned.charAt(0).toUpperCase() +
    indtastetMåned.slice(1).toLowerCase();

  // Skjul alle billeder og vis beskedområdet
  document.getElementById("forår-billede").style.display = "none";
  document.getElementById("sommer-billede").style.display = "none";
  document.getElementById("efterår-billede").style.display = "none";
  document.getElementById("vinter-billede").style.display = "none";
  document.getElementById("beskedomrade").style.display = "block";

  // Hvis der er en aktiv timeout, ryd den
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  // Identificer årstiden baseret på den indtastede måned
  if (månederForår.includes(indtastetMåned)) {
    se.displayMessage("Det er forår, dejligt!");
    document.getElementById("forår-billede").style.display = "block";
  } else if (månederSommer.includes(indtastetMåned)) {
    se.displayMessage("Så er det sommer, lækker!");
    document.getElementById("sommer-billede").style.display = "block";
  } else if (månederEfterår.includes(indtastetMåned)) {
    se.displayMessage("Det er efterår. Nu falder bladene");
    document.getElementById("efterår-billede").style.display = "block";
  } else if (månederVinter.includes(indtastetMåned)) {
    se.displayMessage("Det er vinter, brrrrr!");
    document.getElementById("vinter-billede").style.display = "block";
  } else {
    se.displayMessage("Den måned findes vist ikke, i hvert fald ikke på jorden");
  }

  // Opret en timeout til at skjule beskedområdet og billeder efter 7 sekunder
  timeoutId = setTimeout(function () {
    document.getElementById("beskedomrade").style.display = "none";
    document.getElementById("forår-billede").style.display = "none";
    document.getElementById("sommer-billede").style.display = "none";
    document.getElementById("efterår-billede").style.display = "none";
    document.getElementById("vinter-billede").style.display = "none";
  }, 7000);

  // Nulstil inputfeltet efter at trykke på se-knappen eller enter-tasteb
  inputElement.value = "";
  return false;
}

// Funktion for at starte ved at trykke på enter-tasten
function init() {
  let måned = document.getElementById("måned");
  måned.onkeydown = handleKeyPress;
}

// Funktion til at håndtere Enter-tasten og se-knap
function handleKeyPress(e) {
  let Knap = document.getElementById("knap");
  if (e.keyCode === 13) {
    Knap.click();
    return false;
  }
}
// Funktion til at starte ved indlæsning af siden
window.onload = init();