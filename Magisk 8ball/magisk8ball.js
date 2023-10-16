// sætte variabler til dom-elementer
const Knap2 = document.getElementById("knap2");
const Container2 = document.getElementById("container2");
const Container1 = document.getElementById("container1");
const Container3 = document.getElementById("container3");
const SvarOmrade = document.getElementById("svarOmrade");
const ImageElement = document.getElementById("eightball");
const Overskrift = document.getElementById("overskrift");
const FaaSvar = document.getElementById("knap2");
const NytSprg = document.getElementById("knap3");
const Input = document.getElementById("sporgsmaal");

// Startfunktion, til at kunne stille spørgsmål
const start = () => {
  ImageElement.setAttribute('src', 'eightball_grafik_sporgsmaal.png');
  Container2.style.display = "flex";
  Container1.style.display = "none";
  Container3.style.display = "none";
  SvarOmrade.style.display = "none";
};

// Funktion til at eightball giver svar baseret på en array der udvælger svar tilfældigt
const visSvar = () => {
  
  const eightBall = {
    advice: ["Ja", "Nej", "Måske", "Ingen </br> chance", "Tjooo, </br> hvorfor ikke", "Prøv igen </br> senere"],
    index: 0,
    answer: () => {
      eightBall.index = Math.floor(Math.random() * eightBall.advice.length);
    },
    look: () => {
      return eightBall.advice[eightBall.index];
    }
  };

  // Vælg et tilfældigt svar fra 'eightBall'
  eightBall.answer();
  const randomAnswer = eightBall.look();

  // Opdater DOM-elementer og layout ved svar
  SvarOmrade.innerHTML = randomAnswer;
  SvarOmrade.style.display = "block";
  ImageElement.setAttribute('src', 'eightball_grafik_svar.png');
  Overskrift.style.display = "none";
  FaaSvar.style.display = "none";
  NytSprg.style.display = "block";
  Input.style.display = "none";
  Container3.style.display = "flex";
};

// Funktion til at nulstille og starte et nyt spørgsmål
const nytSprg = () => {
  ImageElement.setAttribute('src', 'eightball_grafik_sporgsmaal.png');
  Overskrift.style.display = "block";
  FaaSvar.style.display = "block";
  NytSprg.style.display = "none";
  Input.style.display = "block";
  SvarOmrade.style.display = "none";

  // Nulstil inputfeltet
  Input.value = "";
};

// Funktion for at starte ved at trykke på enter-tasten
init = () => {
  let måned = document.getElementById("sporgsmaal");
  måned.onkeydown = handleKeyPress;
}

// Funktion til at håndtere Enter-tasten og få svar-knap
handleKeyPress = (e) => {
  if (e.keyCode === 13) {
    Knap2.click();
    return false;
  }
};
// Funktion til at starte ved indlæsning af siden
window.onload = init();