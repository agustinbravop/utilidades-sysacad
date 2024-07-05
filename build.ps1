# Este script exporta el proyecto a unos .zip para publicarlos en los distintos navegadores.
# Se necesita un `manifest.json` para Chrome y otro distinto para Firefox. 

# Solo estos archivos son los que interesa empaquetar y publicar.
$GenericFiles = "LICENSE", "PRIVACY.md", "README.md"
$FirefoxFiles = $GenericFiles + "firefox/*"
$ChromeFiles = $GenericFiles + "chrome/*"

# Versiones anteriores de `Compress-Archive` ponen paths de archivos con `\` y no `/`.
Import-module -Name Microsoft.PowerShell.Archive -MinimumVersion '1.2.5'

# Exportar zip para Google Chrome Web Store.

Compress-Archive -Force -DestinationPath utilidades-sysacad-chrome.zip -Path $ChromeFiles

# Exportar zip para Firefox Add-Ons.

Compress-Archive -Force -DestinationPath utilidades-sysacad-firefox.zip -Path $FirefoxFiles
