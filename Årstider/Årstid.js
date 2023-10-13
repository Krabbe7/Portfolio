let se = {
  displayMessage: function (msg) {
    let beskedomrade = document.getElementById("beskedomrade");
    beskedomrade.innerHTML = msg;
  }
};

let timeoutId;
function indtast() {
  let månederForår = ["Marts", "April", "Maj"];
  let månederSommer = ["Juni", "Juli", "August"];
  let månederEfterår = ["September", "Oktober", "November"];
  let månederVinter = ["December", "Januar", "Februar"];

  let inputElement = document.getElementById("måned");
  let indtastetMåned = inputElement.value.trim();

  indtastetMåned =
    indtastetMåned.charAt(0).toUpperCase() +
    indtastetMåned.slice(1).toLowerCase();

    document.getElementById("forår-billede").style.display = "none";
    document.getElementById("sommer-billede").style.display = "none";
    document.getElementById("efterår-billede").style.display = "none";
    document.getElementById("vinter-billede").style.display = "none";
  
    document.getElementById("beskedomrade").style.display = "block";

  if(timeoutId) {
    clearTimeout(timeoutId);
  }

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
    se.displayMessage("Den måned findes vist ikke, i hvertfald ikke på jorden");
  }

  timeoutId = setTimeout(function () {
    document.getElementById("beskedomrade").style.display = "none";
    document.getElementById("forår-billede").style.display = "none";
    document.getElementById("sommer-billede").style.display = "none";
    document.getElementById("efterår-billede").style.display = "none";
    document.getElementById("vinter-billede").style.display = "none";
  }, 7000);

  inputElement.value = "";
  return false;
}

function init() {
  let Knap = document.getElementById("knap");
  Knap.onclick = handleKnap;
  let måned = document.getElementById("måned");
  måned.onkeydown = handleKeyPress;
}


function handleKeyPress(e) {
  let Knap = document.getElementById("knap");
  if (e.keyCode === 13) {
    Knap.click();
    return false;
  }
}