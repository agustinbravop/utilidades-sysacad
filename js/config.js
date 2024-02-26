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
