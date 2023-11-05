const input = document.querySelector(".input");
const tal = document.querySelectorAll(".tal");
const operators = document.querySelectorAll(".operator");
const clear = document.getElementById("clear");
const resultatKnap = document.getElementById("resultat");
let resultatVist = false;
let sidsteOperator = "";

// Funktion til at klikke på tal på lommeregneren
for (let i = 0; i < tal.length; i++) {
  tal[i].addEventListener("click", (e) => {
    if (sidsteOperator === "=") {
      input.innerHTML = "";
      sidsteOperator = "";
    }
    // Undgå at tilføje et nul foran det første tal
    const nuvaerendeString = input.innerHTML;
    if (nuvaerendeString === "0") {
      input.innerHTML = e.target.innerHTML;
    } else {
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// Funktion til at klikke på operators på lommeregneren
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", (e) => {
    let nuvaerendeString = input.innerHTML;
    let lastChar = nuvaerendeString[nuvaerendeString.length - 1];

    if (e.target.innerHTML === "(") {
      input.innerHTML += e.target.innerHTML;
    } else if (e.target.innerHTML === ")") {
      if (nuvaerendeString.indexOf("(") !== -1) {
        input.innerHTML += e.target.innerHTML;
      }
    } else if (
      lastChar !== "+" &&
      lastChar !== "-" &&
      lastChar !== "*" &&
      lastChar !== "/" &&
      lastChar !== "("
    ) {
      input.innerHTML += e.target.innerHTML;
    }

    sidsteOperator = e.target.innerHTML;
  });
}

// Funktion til at vise resultatet
resultatKnap.addEventListener("click", () => {
  const inputString = input.innerHTML;
  const result = eval(inputString);
  if (!isNaN(result)) {
    input.innerHTML = result;
    sidsteOperator = "";
  } else {
    console.log("Ugyldigt udtryk");
  }
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

// Funktion til at lave udregninger
evaluerExpression = (expression) => {
  const operatorStack = []; // Stack til at håndtere operatører i en array
  const vaerdiStack = []; // Stack til at opbevare tal i en array

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char === "(") {
      operatorStack.push(char); // Hvis karakteren er en venstre parentes, tilføjes den til operatørstakken.
    } else if (char === ")") {
      // Hvis karakteren er en højre parentes, skal udtrykket i paranteserne evalueres

      // Logik til at gøre dette ved at fjerne operatører og værdier fra stakkene og udføre beregningerne.
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        const nuvaerendeOperator = operatorStack.pop();
        const num2 = vaerdiStack.pop();
        const num1 = vaerdiStack.pop();
        vaerdiStack.push(lavUdregning(num1, num2, nuvaerendeOperator));
      }
      operatorStack.pop(); // Fjern venstre parentes fra operatørstakken efter udregning
    } else if (erOperator(char)) {
      // Hvis karakteren er en operator, skal den håndtere operatorprioritet
      // Dette gøres ved at sammenligne den med den øverste operatør på stakken og udføre beregninger i den rigtige rækkefølge.
      while (
        operatorStack.length > 0 &&
        udregningRaekkefoelge(char) <=
          udregningRaekkefoelge(operatorStack[operatorStack.length - 1])
      ) {
        const nuvaerendeOperator = operatorStack.pop();
        const num2 = vaerdiStack.pop();
        const num1 = vaerdiStack.pop();
        vaerdiStack.push(lavUdregning(num1, num2, nuvaerendeOperator));
      }
      operatorStack.push(char); // Tilføj den aktuelle operator til operatørstakken
    } else {
      // Hvis karakteren er en numerisk værdi eller decimalpunkt, skal der opbygges et tal ved at indsamle cifre fra en string og lave den til en numerisk-værdi.
      let num = "";
      while (
        i < expression.length &&
        (erNumerisk(expression[i]) || expression[i] === ".")
      ) {
        num += expression[i];
        i++;
      }
      i--;

      if (i < expression.length && expression[i + 1] === "(") {
        operatorStack.push("*"); // Hvis der er en åben parentes efter et tal, tilføj en implicit multiplicerende operator (*)
      }
      vaerdiStack.push(parseFloat(num)); // Tilføj tallet til værdistakken
    }
  }
  // Når alle tegn er behandlet, kan der stadig være operatører på operatørstakken.
  // Vi skal fortsat udføre de resterende beregninger.
  while (operatorStack.length > 0) {
    const nuvaerendeOperator = operatorStack.pop();
    const num2 = vaerdiStack.pop();
    const num1 = vaerdiStack.pop();
    vaerdiStack.push(lavUdregning(num1, num2, nuvaerendeOperator));
  }
  return vaerdiStack[0];
};

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

// Funktion til at afgøre, om en karakter er en matematisk operator
function erOperator(char) {
  return "+-*/".includes(char);
}

// Funktion til at afgøre, om en karakter er en numerisk værdi (0-9)
function erNumerisk(char) {
  return /[0-9]/.test(char);
}
