
window.onload = function () {
    let minutter = 0;
    let sekunder = 0;
    let milisek = 0;
    let tilfojMilisek = document.getElementById("milisekDisplay");
    let tilfojSekunder = document.getElementById("sekunderDisplay");
    let tilfojMinutter = document.getElementById("minutterDisplay");
    let buttonStart = document.getElementById("button-start");
    let buttonStop = document.getElementById("button-stop");
    let buttonReset = document.getElementById("button-reset");
    let interval;


    buttonStart.onclick = function () {
        clearInterval(interval);
        interval = setInterval(startTimer, 10);
    };

    buttonStop.onclick = function () {
        clearInterval(interval);
    };

    buttonReset.onclick = function () {
        clearInterval(interval);
        milisek = 0;
        sekunder = 0;
        minutter = 0;
        tilfojMilisek.innerHTML = "00";
        tilfojSekunder.innerHTML = "00";
        tilfojMinutter.innerHTML = "00";
    };

    function startTimer() {
        milisek++;

        if (milisek <= 9) {
            tilfojMilisek.innerHTML = "0" + milisek;
        }

        if (milisek > 9) {
            tilfojMilisek.innerHTML = milisek;
        }

        if (milisek > 99) {
            console.log("sekunder");
            sekunder++;
            tilfojSekunder.innerHTML = "0" + sekunder;
            milisek = 0;
            tilfojMilisek.innerHTML = "00";
        }

        if (sekunder > 9) {
            tilfojSekunder.innerHTML = sekunder;
        }

        if (sekunder > 59) {
            console.log("minutter");
            minutter++;
            tilfojMinutter.innerHTML = "0" + minutter;
            sekunder = 0;
            tilfojSekunder.innerHTML = "00";
        }
    }

};
