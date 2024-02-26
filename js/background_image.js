/** Establece la imagen de fondo del SYSACAD. */
function setBackgroundImage(dataUrl) {
  if (dataUrl) {
    // Se establece la imagen personalizada como fondo.
    document.body.style.backgroundImage = `url('${dataUrl}')`;
  } else {
    // No hay fondo personalizado, así que se vuelve al original.
    document.body.style.backgroundImage =
      "url(https://sysacadweb.frre.utn.edu.ar/static/img/back3.png)";
  }
}

// Inicialización (corre una sola vez cuando la página carga).
chrome.storage.local.get("imageDataUrl").then((items) => {
  setBackgroundImage(items.imageDataUrl);
});

// Event listener (corre cada vez que cambia el atributo `imageDataUrl`).
// Actualiza el fondo sin que el usuario tenga que refrescar.
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.imageDataUrl) {
    setBackgroundImage(changes.imageDataUrl.newValue);
  }
});
