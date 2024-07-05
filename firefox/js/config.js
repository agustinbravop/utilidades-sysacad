/**
 * Handler que elimina el item 'imageDataUrl' del storage.
 * @param {HTMLElement} imageInput
 */
function removeImage(imageInput) {
  browser.storage.local.remove(["imageDataUrl"]);
  imageInput.value = ""; // Limpia el input de la UI.
}

/**
 * Handler que persiste el item 'imageDataUrl' en storage.
 * En `background_image.js` hay un listener cuando `imageDataUrl` cambia.
 */
function storeImage() {
  if (this.files.length > 0) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      browser.storage.local.set({ imageDataUrl: reader.result });
    });

    reader.readAsDataURL(this.files[0]);
  }
}

// Inyectar al DOM el event listener para cuando se sube una imagen.
const imageInput = document.getElementById("image_input");
imageInput.addEventListener("change", storeImage);

// Inyectar al DOM el event listener para cuando se elimina una imagen.
document
  .getElementById("clear_button")
  .addEventListener("click", () => removeImage(imageInput));

/**
 * Handler que persiste si la feature asociada a un checkbox
 * de la configuración está habilitada o deshabilitada.
 * El item `features` del storage es un array de strings.
 */
function handleFeatureCheckboxToggle() {
  browser.storage.local.get("features", ({ features = [] }) => {
    if (this.checked) {
      // Se habilita la funcionalidad agregándola al arreglo.
      features.push(this.name);
    } else {
      // Se deshabilita la funcionalidad quitándola del arreglo.
      const idx = features.indexOf(this.name);
      if (idx >= 0) {
        features.splice(idx, 1);
      }
    }

    browser.storage.local.set({ features });
  });
}

/** Suscribe el handler de habilitación de features a su input del DOM correspondiente.
 * @param {string[]} enabledFeatures las features habilitadas al cargar la página.
 * @param {string} feature la feature cuyo input se le suscribirá este handler.
 */
function suscribeChangeHandler(enabledFeatures, feature) {
  const inputElement = document.getElementById(feature);

  // Establece el valor guardado previamente como valor inicial del checkbox.
  inputElement.checked = enabledFeatures.includes(feature);

  inputElement.addEventListener("change", handleFeatureCheckboxToggle);
}

// Feature flags array.
const allFeatures = ["averages", "progress"];

browser.storage.local.get("features", (items) => {
  const enabledFeatures = items.features ?? [];
  // Se inyectan al DOM los listeners de los checkboxes de features.
  allFeatures.forEach((feat) => suscribeChangeHandler(enabledFeatures, feat));
});
