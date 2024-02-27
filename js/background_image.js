const DEFAULT_DATA_URL =
  "https://sysacadweb.frre.utn.edu.ar/static/img/back3.png";

/** Establece la imagen de fondo del SYSACAD. */
function setBackgroundImage(dataUrl) {
  if (dataUrl) {
    // Se establece la imagen personalizada como fondo.
    document.body.style.backgroundImage = `url('${dataUrl}')`;
  } else {
    // No hay fondo personalizado, así que se vuelve al original.
    document.body.style.backgroundImage = `url('${DEFAULT_DATA_URL}')`;
  }
}

// Es lo antes posible que se puede inicializar la imagen de fondo en el CSS.
// Minimiza el tiempo del flash en que el fondo default se muestra, pero parece ser
// imposible eliminarlo por completo, dado que el CSS se carga antes que el JavaScript.
chrome.storage.local.get("imageDataUrl").then((items) => {
  document.documentElement.insertAdjacentHTML(
    "beforeend",
    `<style>
      body {
        background-image: url('${items.imageDataUrl || DEFAULT_DATA_URL}');
      }
    </style>`
  );
});

// Event listener (corre cada vez que cambia el atributo `imageDataUrl`).
// Actualiza el fondo sin que el usuario tenga que refrescar.
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.imageDataUrl) {
    setBackgroundImage(changes.imageDataUrl.newValue);
  }
});
