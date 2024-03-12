interface omregningsRate {
  conversion_rate: number;
  conversion_result: number;
}

class valutaOmregner {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.init();
  }
  private async udfoerKonvertering(
    maengde: number,
    fraValuta: string,
    tilValuta: string,
    outputElement: HTMLParagraphElement
  ) {
    const url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${fraValuta}/${tilValuta}/${maengde}`;
    const response = await fetch(url);
    const data: omregningsRate = await response.json();
    console.log(url);
    if (
      data.conversion_rate !== undefined &&
      data.conversion_result !== undefined
    ) {
      outputElement.innerText = `${data.conversion_result.toFixed(
        2
      )} ${tilValuta}`;
    } else {
      outputElement.innerText = "Der opstod en fejl under konverteringen.";
    }
  }

  private async init() {
    const konverter = document.getElementById("konverter") as HTMLButtonElement;
    const outputElement = document.getElementById(
      "output"
    ) as HTMLParagraphElement;
    const antalInput = document.getElementById("belob") as HTMLInputElement;
    const fejlMelding = document.getElementById("error") as HTMLDivElement;

    konverter.addEventListener("click", async () => {
      const maengde = parseFloat(antalInput.value);
      if (!isNaN(maengde) && maengde > 0) {
        try {
          const fraValuta = document.getElementById(
            "valutaFra"
          ) as HTMLSelectElement;
          const tilValuta = document.getElementById(
            "valutaTil"
          ) as HTMLSelectElement;

          await this.udfoerKonvertering(
            maengde,
            fraValuta.value,
            tilValuta.value,
            outputElement
          );
        } catch (error) {
          console.error("Fejl ved konvertering:", error);
        }
      } else {
        fejlMelding.style.display = "flex";
        setTimeout(() => {
          fejlMelding.style.display = "none";
        }, 2000);
      }
    });
    const ombyt = document.getElementById("ombyt") as HTMLButtonElement;
    ombyt.addEventListener("click", () => {
      const fraValuta = document.getElementById(
        "valutaFra"
      ) as HTMLSelectElement;
      const tilValuta = document.getElementById(
        "valutaTil"
      ) as HTMLSelectElement;
      /*
      const maengde = parseFloat(antalInput.value);
        
      this.udfoerKonvertering(
        maengde,
        fraValuta.value,
        tilValuta.value,
        outputElement
      );
*/
      let temp = fraValuta.value;
      fraValuta.value = tilValuta.value;
      tilValuta.value = temp;
    });
  }
}

const apiKey = "180a84b836dbf0f6d54ccd58";
const omregnValuta = new valutaOmregner(apiKey);
