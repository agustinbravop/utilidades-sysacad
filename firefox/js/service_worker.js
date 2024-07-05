// Al hacer click en el botón de acción de la extensión, redirige
// el navegador a la página de configuración de la extensión.
browser.browserAction.onClicked.addListener(async () => {
  browser.tabs.create({
    active: true,
    url: "config.html",
  });
});

// Si ya había una configuración de features previa, se la mantiene.
browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.get("features").then(({ features }) => {
    if (!Array.isArray(features)) {
      // No hay un array de features configurado ==> por defecto se activan todas.
      browser.storage.local.set({ features: ["averages", "progress"] });
    }
  });
});
