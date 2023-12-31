// View-objekt med metoder til at opdatere interface
let view = {
    displayMessage: (msg) => {
        const beskedomrade = document.getElementById("beskedomrade");
        beskedomrade.innerHTML = msg;
    },
    displayHit: (location) => {
        const  cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: (location) => {
        const  cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

// Model-objekt, der repræsenterer spillogik og data
const model = {
    brætstorrelse: 7,
    numSkibe: 3,
    skibLength: 3,
    skibSunket: 0,
    skibe: [
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] }
    ],

    fire: function(guess) {
        for (let i = 0; i < this.numSkibe; i++) {
            let skib = this.skibe[i];
            let locations = skib.locations;
            let index = locations.indexOf(guess);
            if (index >= 0) {
                skib.hits[index] = "Ramt!";
                view.displayHit(guess);
                view.displayMessage("Ramt!");

                if (this.erSunket(skib)) {
                    view.displayMessage("Du sank mit slagskib!");
                    this.skibSunket++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("Ha, du ramte ikke!");
        return false;
    },
    erSunket: function(skib) {
        return skib.hits.every(hit => hit === "Ramt");
    },

    generateSkibsplacering: function() {
        for (let i = 0; i < this.numSkibe; i++) {
            let locations;
            do {
                locations = this.generateSkib();
            } while (this.collision(locations));
            this.skibe[i].locations = locations;
        }
    },

    generateSkib: function() {
        let  retning = Math.floor(Math.random() * 2);
        let row, col;

        if (retning === 1) {
            row = Math.floor(Math.random() * this.brætstorrelse);
            col = Math.floor(Math.random() * (this.brætstorrelse - this.skibLength));
        } else {
            row = Math.floor(Math.random() * (this.brætstorrelse - this.skibLength));
            col = Math.floor(Math.random() * this.brætstorrelse);
        }

        const nySkibsplacering = [];
        for (let i = 0; i < this.skibLength; i++) {
            if (retning === 1) {
                nySkibsplacering.push (row + "" + (col + i));
            } else {
                nySkibsplacering.push ((row + i) + "" + col);
            }
        }
        return nySkibsplacering;
    },

    collision: function(locations) {
        for (let i = 0; i < this.numSkibe; i++) {
            let  skib = this.skibe[i];
            for (let j = 0; j < locations.length; j++) {
                if (skib.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
};

// Controller-objekt til at styre interaktionen
const controller = {
    guesses: 0,
    guessedLocations: [],

    // Funktion til at behandle brugerens gæt
    processGuess: function (guess) {
        let location = parseGuess(guess);
        if (location) {
            if(this.guessedLocations.includes(location)) {
                view.displayMessage("Du har allerede gættet på denne </br> position");
                return;
            }
            this.guessedLocations.push(location);
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.skibSunket === model.numSkibe) {
                view.displayMessage("Du sank alle mine skibe på " + this.guesses + " gæt");
            }
        }
    }
};

// Funktion til at analysere brugerens gæt
parseGuess = (guess) => {
    const  alfabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
        alert("Hov, du skal indtaste et bokstav og et tal");
    } else {
        firstChar = guess.charAt(0).toUpperCase();
        let  row = alfabet.indexOf(firstChar);
        let  column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("Hov, det er ikke på brættet");
        } else if (row < 0 || row >= model.brætstorrelse ||
            column < 0 || column >= model.brætstorrelse) {
            alert("Hov, det er ikke på spilbrættet");
        } else {
            return row + column;
        }
    }
    return null;
};

// Funktion for at starte ved at trykke på skyd-tasten eller enter-knappen
init = () => {
    const  skydKnap = document.getElementById("skydKnap");
    skydKnap.onclick = handleSkydKnap;
    const  gætInput = document.getElementById("gætInput");
    gætInput.onkeydown = handleKeyPress;

    model.generateSkibsplacering();
};

// Funktion til at håndtere klik på skyd-tasten
handleSkydKnap = () => {
    const  gætInput = document.getElementById("gætInput");
    const  guess = gætInput.value;
    controller.processGuess(guess);

    gætInput.value = "";
};

// Funktion til at håndtere enter-tasten og skyd-tasten
handleKeyPress = (e) => {
    const skydKnap = document.getElementById("skydKnap");
    if (e.keyCode === 13) {
        skydKnap.click();
        return false;
    }
};

// Funktion til at starte spillet ved indlæsning af siden
window.onload = init;