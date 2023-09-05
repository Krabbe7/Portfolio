let view = {
    displayMessage(msg) {
        const beskedomrade = document.getElementById("beskedomrade");
        beskedomrade.innerHTML = msg;
    },
    displayHit(location) {
        const  cell = document.getElementById(location);
        cell.setAttribute("class", "hit")
    },

    displayMiss(location) {
        const  cell = document.getElementById(location);
        cell.setAttribute("class", "miss")
    }
};

let model = {
    brætstorrelse: 7,
    numSkibe: 3,
    skibLength: 3,
    skibSunket: 0,


    skibe: [ 
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] } ]
    ,

    fire(guess) {
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
    erSunket(skib) {
        return skib.hits.every(hit => hit === "Ramt");
                r
        
    },

    generateSkibsplacering() {
        
        for (let i = 0; i < this.numSkibe; i++) {
            let locations;
            do {
                locations = this.generateSkib();
            } while (this.collision(locations));
            this.skibe[i].locations = locations;
        }
    },
  
    generateSkib() {
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

    collision(locations) {
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


let controller = {
    guesses: 0,
    processGuess: function (guess) {
        let location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.skibSunket === model.numSkibe) {
                view.displayMessage("Du sank alle mine skibe på " + this.guesses + " gæt")
            }
        }

    }
};

function parseGuess(guess) {
    let  alfabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
        alert("Hov, du skal indtaste et bokstav og et tal")
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


}

function init() {
    let  skydKnap = document.getElementById("skydKnap");
    skydKnap.onclick = handleSkydKnap;
    let  gætInput = document.getElementById("gætInput");
    gætInput.onkeydown = handleKeyPress;

    model.generateSkibsplacering();
}

function handleSkydKnap() {
    let  gætInput = document.getElementById("gætInput");
    let  guess = gætInput.value;
    controller.processGuess(guess);

    gætInput.value = "";
}

function handleKeyPress(e) {
    let skydKnap = document.getElementById("skydKnap");
    if (e.keyCode === 13) {
        skydKnap.click();
        return false;
    }
}

window.onload = init;


