
document.querySelector(`#push`).onclick = function () {
  const inputElement = document.querySelector("#nyopgave input");

  if (inputElement.value.length == 0) {
    alert(`Indtast venligst en vare til listen`);
  } else {
    const opgaverContainer = document.querySelector("#opgaver");

    const nyOpgaveDiv = document.createElement("div");
    nyOpgaveDiv.classList.add("opgave");

    nyOpgaveDiv.innerHTML = `
      <input type="checkbox" class="checkbox" />
      <span id="opgavenavn">
        ${inputElement.value}
      </span>
      <button class="slet">
        <i class="far fa-trash-alt"></i>
      </button>
    `;

    opgaverContainer.appendChild(nyOpgaveDiv);

    inputElement.value = "";

    const visOpgave = document.getElementById("opgaver");
    visOpgave.style.display = "block";

    const sletKnap = nyOpgaveDiv.querySelector(".slet");
    sletKnap.onclick = function () {
      nyOpgaveDiv.remove();
      const opgaver = document.querySelectorAll(".opgave");
      if (opgaver.length === 0) {
        visOpgave.style.display = "none";
      }
    };
  }
};

