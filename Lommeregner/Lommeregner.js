const input = document.querySelector(".input");
const tal = document.querySelectorAll(".tal");
const operators = document.querySelectorAll(".operator");
const clear = document.getElementById("clear");
const resultatKnap = document.getElementById("resultat");
let resultatVist = false;
let sidsteOperator = "";

// Funktion til at afgøre, om en karakter er en matematisk operator
function erOperator(char) {
  return "+-*/".includes(char);
}

// Funktion til at afgøre, om en karakter er en numerisk værdi (0-9)
function erNumerisk(char) {
  return /[0-9]/.test(char);
}

// Funktion til at klikke på tal på lommeregneren
const haandterklik = (e) => {
  const clickedValue = e.target.innerHTML;
  let nuvaerendeString = input.innerHTML;
  let lastChar = nuvaerendeString[nuvaerendeString.length - 1];
  if (sidsteOperator === "=") {
    input.innerHTML = "";
    sidsteOperator = "";
  }

  if (nuvaerendeString === "0") {
    input.innerHTML = clickedValue;
  } else if (clickedValue === "(") {
    if (erNumerisk(lastChar) || lastChar === ")") {
      input.innerHTML += "*";
    }
    input.innerHTML += clickedValue;
  } else if (clickedValue === ")") {
    if (nuvaerendeString.indexOf("(") !== -1) {
      input.innerHTML += clickedValue;
    }
  } else if (erOperator(clickedValue)) {
    sidsteOperator = clickedValue;
    if (erOperator(lastChar) && clickedValue !== "(") {
      lastChar !== "+" &&
        lastChar !== "-" &&
        lastChar !== "*" &&
        lastChar !== "/" &&
        lastChar !== "(";
    } else {
      input.innerHTML += clickedValue;
    }
  } else {
    input.innerHTML += clickedValue;
  }
};
// Funktion til at håndtere klik på tal via haandterklik funktionen
tal.forEach((t) => {
  t.addEventListener("click", haandterklik);
});
// Funktion til at håndtere klik på operators via haandterklik funktionen
operators.forEach((o) => {
  o.addEventListener("click", haandterklik);
});

// Funktion til at slette input
slet.addEventListener("click", () => {
  const inputElement = document.querySelector(".input");
  const inputValue = inputElement.innerHTML;

  if (inputValue.length === 1) {
    inputElement.innerHTML = "0";
  } else {
    inputElement.innerHTML = inputValue.substring(0, inputValue.length - 1);
  }
});

// Funktion til at rydde input-feltet
clear.addEventListener("click", () => {
  input.innerHTML = "";
  sidsteOperator = "";
});

// Funktion til at vise resultatet via klik på resultatknap
resultatKnap.addEventListener("click", () => {
  let inputString = input.innerHTML;

  // Tæl åbne og lukkende parenteser
  const antalAabneparanteser = (inputString.match(/\(/g) || []).length;
  const antalLukketParanteser = (inputString.match(/\)/g) || []).length;

  // Hvis der mangler lukkende parenteser, tilføj dem
  if (antalAabneparanteser > antalLukketParanteser) {
    const diff = antalAabneparanteser - antalLukketParanteser;
    inputString += ")".repeat(diff);
  }

  // Tæl åbne og lukkende parenteser igen
  const endeligNrAbneParanteser = (inputString.match(/\(/g) || []).length;
  const endeligNrLukketParanteser = (inputString.match(/\)/g) || []).length;

  // Hvis antallet af åbne og lukkende parenteser er ens, så udregnes resultatet
  if (endeligNrAbneParanteser === endeligNrLukketParanteser) {
    const result = evaluerExpression(inputString);

    if (!isNaN(result)) {
      input.innerHTML = result;
      sidsteOperator = "";
    } else {
      console.log("Ugyldigt udtryk");
    }
  } else {
    console.log("Ugyldigt udtryk - ubalancerede parenteser");
  }

  sidsteOperator = "";
});

// Funktion til at lave en udregning med to tal og en operator
lavUdregning = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return num1 + num2;

    case "-":
      return num1 - num2;

    case "*":
      return num1 * num2;

    case "/":
      return num1 / num2;

    default:
      return NaN;
  }
};

// Funktion til at bestemmee tækkefølgen for operators, for en udregning
udregningRaekkefoelge = (operator) => {
  switch (operator) {
    case "+":

    case "-":
      return 1;

    case "*":

    case "/":
      return 2;

    default:
      return 0;
  }
};

// Funktion til at lave udregninger
const evaluerExpression = (expression) => {
  try {
    const result = eval(expression);

    if (!isNaN(result)) {
      return result;
    } else {
      window.alert("Ugyldigt resultat");
      return NaN;
    }
  } catch (error) {
    window.alert("Fejl i evaluering af udtryk: " + error.message);
    return NaN;
  }
};
