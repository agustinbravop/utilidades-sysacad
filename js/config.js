/** Retorna un handler que elimina el item 'imageDataUrl' del storage. */
function removeImage(imageInput) {
  return () => {
    chrome.storage.local.remove(["imageDataUrl"]);
    imageInput.value = ""; // Limpia el input de la UI.
  };
}

/**
 * Handler que persiste el item 'imageDataUrl' en storage.
 * En `background_image.js` hay un listener cuando `imageDataUrl` cambia.
 */
function storeImage() {
  if (this.files.length > 0) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      chrome.storage.local.set({
        imageDataUrl: reader.result,
      });
    });
    reader.readAsDataURL(this.files[0]);
  }
}

// Se inyectan las dos funciones como event listeners del DOM
// de la página de configuración de la extensión.
const imageInput = document.getElementById("image_input");
imageInput.addEventListener("change", storeImage);

document
  .getElementById("clear_button")
  .addEventListener("click", removeImage(imageInput));

/** Establece el valor inicial (el que ya tenía) del checkbox. */
function setInitialCheckboxValue(inputElement) {
  chrome.storage.local.get("features", (items) => {
    inputElement.checked = items.features.includes(inputElement.id);
  });
}

/**
 * Handler que persiste si la feature asociada a un checkbox
 * de la configuración está habilitada o deshabilitada.
 * El item `features` del storage es un array de strings.
 */
function handleFeatureCheckbox() {
  chrome.storage.local.get("features", (items) => {
    const features = items.features ?? [];

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

    chrome.storage.local.set({ features });
  });
}

/** Suscribe el handler de habilitación de features a su input del DOM correspondiente. */
function suscribeChangeHandler(feature) {
  const inputElement = document.getElementById(feature);

  setInitialCheckboxValue(inputElement);
  inputElement.addEventListener("change", handleFeatureCheckbox);
}

const features = ["averages", "progress"];

// Se inyectan al DOM los listeners de los checkboxes de features.
features.forEach(suscribeChangeHandler);
