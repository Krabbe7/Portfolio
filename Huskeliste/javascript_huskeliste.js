// Funktion til at skubbe indtastet opgave ned i en opgavesektion
document.querySelector(`#push`).onclick = () => {
  // Hent input-elementet
  const inputElement = document.querySelector("#nyopgave input");

  // Tjek om inputfeltet er tomt
  if (inputElement.value.length == 0) {
    alert(`Indtast venligst en vare til listen`);
  } else {
    // Hent opgaver-containeren
    const opgaverContainer = document.querySelector("#opgaver");

    // Opret overskrift for tilføjet opgaver
    const headingOpgaver = document.getElementById("headingOpgaver");
    if (!headingOpgaver) {
      const overskriftH1 = document.createElement("h2");
      overskriftH1.textContent = "Opgaver";
      opgaverContainer.insertBefore(overskriftH1, opgaverContainer.firstChild);
      overskriftH1.id = "headingOpgaver";
    }

    // Opret en ny opgave-container
    const nyOpgaveDiv = document.createElement("div");
    nyOpgaveDiv.classList.add("opgave");

    // Generer HTML-indhold i opgave-containeren
    nyOpgaveDiv.innerHTML = `
      <input type="checkbox" class="checkbox" />
      <span id="opgavenavn">
        ${inputElement.value}
      </span>
      <button class="slet">
        <i class="far fa-trash-alt"></i>
      </button>
    `;

    // Tilføj opgave-containeren til containeren der indeholder opgaver
    opgaverContainer.appendChild(nyOpgaveDiv);

    // Nulstil inputfeltet
    inputElement.value = "";

    // Vis opgaver-sektionen
    const visOpgave = document.getElementById("opgaver");
    visOpgave.style.display = "block";

    // funtion til slet-knap
    const sletKnap = nyOpgaveDiv.querySelector(".slet");
    sletKnap.onclick = () => {
      nyOpgaveDiv.remove();
      tjekTomOgGem(visOpgave);
    };

    // Funktion til checkbox
    const checkbox = nyOpgaveDiv.querySelector(".checkbox");
    checkbox.addEventListener("change", () => {
      const færdigeOpgaverContainer = document.querySelector("#færdigeOpgaver");

      if (checkbox.checked) {
        // Hvis checkbox er markeret, flyt opgave til "Færdige Opgaver"
        færdigeOpgaverContainer.style.display = "block";
        færdigeOpgaverContainer.appendChild(nyOpgaveDiv);
      } else {
        // Hvis checkbox er ikke markeret, flyt opgave tilbage til "Opgaver"
        færdigeOpgaverContainer.style.display = "none";
        opgaverContainer.appendChild(nyOpgaveDiv);
      }

      tjekTomOgGem(visOpgave);
    });
  }
};


// Hent container-elementet
const container = document.querySelector(".container");

// Opret sektionen for færdige opgaver med en overskrift
const faerdigeOpgaverSektion = document.createElement("div");
faerdigeOpgaverSektion.id = "færdigeOpgaver";
faerdigeOpgaverSektion.innerHTML =
  "<h2 id='headingFærdigeOpgaver'>Færdige Opgaver</h2>";
container.appendChild(faerdigeOpgaverSektion);

// Funktion til at tjekke om sektionen er tom og hvis den er så skjul den
tjekTomOgGem = (element) => {
  const opgaver = document.querySelectorAll("#opgaver .opgave");
  const faerdigeOpgaver = document.getElementById("færdigeOpgaver");

  const headingOpgaver = document.getElementById("headingOpgaver");
  const headingFaerdigeOpgaver = document.getElementById(
    "headingFærdigeOpgaver"
  );

  // Tjek om opgaver-sektionen er tom
  if (opgaver.length === 0) {
    element.style.display = "none";

    // Skjul overskriften for opgaver, hvis den vises
    if (headingOpgaver) {
      headingOpgaver.style.display = "none";
    }
  } else {
    // Vis opgaver-sektionen
    element.style.display = "block";

    // Vis overskriften for opgaver
    if (headingOpgaver) {
      headingOpgaver.style.display = "block";
    }
  }

  // Tjek om færdige opgaver-sektionen er tom
  if (
    !faerdigeOpgaver ||
    faerdigeOpgaver.querySelectorAll(".opgave").length === 0
  ) {
    // Skjul overskriften og container for færdige opgaver, hvis den vises
    if (headingFaerdigeOpgaver) {
      headingFaerdigeOpgaver.style.display = "none";
      faerdigeOpgaver.style.display = "none";
    }
  } else {
    // Vis overskriften for færdige opgaver
    if (headingFaerdigeOpgaver) {
      headingFaerdigeOpgaver.style.display = "block";
    }
  }
};
// Funktion for at starte ved at trykke på enter-tasten
init = () => {
  let inputtext = document.getElementById("inputtext");
  inputtext.onkeydown = handleKeyPress;
}

// Funktion til at håndtere Enter-tasten og tilføj-knap
handleKeyPress = (e) => {
  let Knap = document.getElementById("push");
  if (e.keyCode === 13) {
    Knap.click();
    return false;
  }
}
// Funktion til at starte ved indlæsning af siden
window.onload = init();
