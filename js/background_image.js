/** Establece la imagen de fondo del SYSACAD. */
function setBackgroundImage(data_url) {
  if (data_url) {
    // Se establece la imagen personalizada como fondo.
    document.body.style.backgroundImage = `url('${data_url}')`;
  } else {
    // No hay fondo personalizado, así que se vuelve al original.
    document.body.style.backgroundImage =
      "url(https://sysacadweb.frre.utn.edu.ar/static/img/back3.png)";
  }
}

// Inicialización (corre una sola vez cuando la página carga).
chrome.storage.local.get("image_data_url").then((items) => {
  setBackgroundImage(items.image_data_url);
});

// Event listener (corre cada vez que cambia el atributo `image_data_url`).
// Actualiza el fondo sin que el usuario tenga que refrescar.
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName == "local" && changes.image_data_url) {
    setBackgroundImage(changes.image_data_url.newValue);
  }
});
