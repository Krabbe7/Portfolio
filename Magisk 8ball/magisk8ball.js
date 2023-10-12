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

const handleKeyPress = (e) => {
  if (e.keyCode === 13) {
    Knap2.click();
    return false;
  }
};

const start = () => {
  ImageElement.setAttribute('src', 'eightball_grafik_sporgsmaal.png');
  Container2.style.display = "flex";
  Container1.style.display = "none";
  Container3.style.display = "none";
  SvarOmrade.style.display = "none";
};

const visSvar = () => {

  const eightBall = {
    advice: ["Ja", "Nej", "Måske", "Ingen </br> chance", "Tjooo, </br> hvorfor ikke", "Prøv igen </br> senere"],
    answer: function() {
      this.index = Math.floor(Math.random() * this.advice.length);
    },
    look: function() {
      return this.advice[this.index];
    }
  };

  eightBall.answer();
  const randomAnswer = eightBall.look();
  SvarOmrade.innerHTML = randomAnswer;
  SvarOmrade.style.display = "block";

  ImageElement.setAttribute('src', 'eightball_grafik_svar.png');
  Overskrift.style.display = "none";
  FaaSvar.style.display = "none";
  NytSprg.style.display = "block";
  Input.style.display = "none";
  Container3.style.display = "flex";
};

const nytSprg = () => {
  ImageElement.setAttribute('src', 'eightball_grafik_sporgsmaal.png');
  Overskrift.style.display = "block";
  FaaSvar.style.display = "block";
  NytSprg.style.display = "none";
  Input.style.display = "block";
  SvarOmrade.style.display = "none";

  Input.value = "";
};