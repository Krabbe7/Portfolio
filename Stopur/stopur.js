// Vent med at køre koden, indtil siden er fuldt indlæst
window.onload = function () {
    // Variabler til at holde tidspunktet
    let minutter = 0;
    let sekunder = 0;
    let milisek = 0;

    // Hent referencer til HTML-elementer
    let tilfojMilisek = document.getElementById("milisekDisplay");
    let tilfojSekunder = document.getElementById("sekunderDisplay");
    let tilfojMinutter = document.getElementById("minutterDisplay");

    // Hent referencer til start, stop og reset knapper
    let buttonStart = document.getElementById("button-start");
    let buttonStop = document.getElementById("button-stop");
    let buttonReset = document.getElementById("button-reset");

    let interval; // Variabel til at gemme interval-ID for setInterval

    // klik på start-knappen
    buttonStart.onclick = function () {
        clearInterval(interval); // Stop tidligere tidtagning, hvis det er aktivt
        interval = setInterval(startTimer, 10); // Start et nyt interval hvert 10. millisekund
    };

    // klik på stop-knappen
    buttonStop.onclick = function () {
        clearInterval(interval); // Stop det aktuelle tidtagning
    };

    // klik på reset-knappen
    buttonReset.onclick = function () {
        clearInterval(interval); // Stop det aktuelle tidtagning
        // Nulstil og opdater HTML-elementer
        milisek = 0;
        sekunder = 0;
        minutter = 0;
        tilfojMilisek.innerHTML = "00";
        tilfojSekunder.innerHTML = "00";
        tilfojMinutter.innerHTML = "00";
    };

    // Funktion til at starte tidtagning
    function startTimer() {
        milisek++;

        // Opdater HTML-elementet for milisekunder
        if (milisek <= 9) {
            tilfojMilisek.innerHTML = "0" + milisek;
        }

        if (milisek > 9) {
            tilfojMilisek.innerHTML = milisek;
        }

        // Håndter overgang til sekunder
        if (milisek > 99) {
            sekunder++;
            tilfojSekunder.innerHTML = sekunder <= 9 ? "0" + sekunder : sekunder;
            milisek = 0;
            tilfojMilisek.innerHTML = "00";
        }

        // Håndter overgang til minutter
        if (sekunder > 59) {
            minutter++;
            tilfojMinutter.innerHTML = minutter <= 9 ? "0" + minutter : minutter;
            sekunder = 0;
            tilfojSekunder.innerHTML = "00";
        }
    }
};