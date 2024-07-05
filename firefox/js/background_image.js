const DEFAULT_DATA_URL =
  "https://sysacadweb.frre.utn.edu.ar/static/img/back3.png";

/**
 * Retorna la URL ingresada por el usuario pseudo sanitizada.
 * Si no hay una URL, utiliza la URL por defecto del fondo del SYSACAD.
 */
function sanitizeDataUrl(dataUrl) {
  if (dataUrl && typeof dataUrl === "string") {
    return dataUrl;
  } else {
    return DEFAULT_DATA_URL;
  }
}

/** Establece la imagen de fondo del SYSACAD. */
function setBackgroundImage(dataUrl) {
  document.body.style.backgroundImage = `url('${sanitizeDataUrl(dataUrl)}')`;
}

// Esto es lo máa antes posible que se puede inicializar la imagen de fondo en el CSS.
// Esto minimiza la duración del flash en que se ve el fondo por defecto, pero parece ser
// imposible eliminarlo por completo, dado que el CSS se carga antes que el JavaScript.
browser.storage.local.get("imageDataUrl").then(({ imageDataUrl }) => {
  document.documentElement.insertAdjacentHTML(
    "beforeend",
    `<style>
      body {
        background-image: url('${sanitizeDataUrl(imageDataUrl)}');
      }
    </style>`
  );
});

// Event listener (corre cada vez que cambia el atributo `imageDataUrl`).
// Actualiza el fondo sin que el usuario tenga que refrescar la página.
browser.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.imageDataUrl) {
    setBackgroundImage(changes.imageDataUrl.newValue);
  }
});
