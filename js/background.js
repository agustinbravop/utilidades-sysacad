// Al hacer click en el botón de acción de la extensión, redirige
// el navegador a la página de configuración de la extensión.
chrome.action.onClicked.addListener(async () => {
  chrome.tabs.create({
    active: true,
    url: chrome.runtime.getURL("config.html"),
  });
});
