/** Retorna un handler que elimina el item 'image_data_url' del storage. */
function removeImage(imageInput) {
  return () => {
    chrome.storage.local.remove(["image_data_url"]);
    imageInput.value = ""; // Limpia el input de la UI.
  };
}

/**
 * Handler que persiste el item 'image_data_url' en storage.
 * En `background_image.js` hay un listener cuando `image_data_url` cambia.
 */
function storeImage() {
  if (this.files.length > 0) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      chrome.storage.local.set({
        image_data_url: reader.result,
      });
    });
    reader.readAsDataURL(this.files[0]);
  }
}

// Se inyectan las dos funciones como event listeners del DOM
// de la página de configuración de la extensión.
const imageInput = document.getElementById("image_picker");
imageInput.addEventListener("change", storeImage);

document
  .getElementById("button_clear")
  .addEventListener("click", removeImage(imageInput));
