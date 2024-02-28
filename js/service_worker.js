// Al hacer click en el botón de acción de la extensión, redirige
// el navegador a la página de configuración de la extensión.
chrome.action.onClicked.addListener(async () => {
  chrome.tabs.create({
    active: true,
    url: chrome.runtime.getURL("config.html"),
  });
});

// Si ya había una configuración de features previa, se la mantiene.
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("features", (items) => {
    if (!Array.isArray(items.features)) {
      // No hay un array de features configurado, por defecto se activan todas.
      chrome.storage.local.set({ features: ["averages", "progress"] });
    }
  });
});
