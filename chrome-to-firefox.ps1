# Este script copia los archivos (excepto el manifest.json) del proyecto Chrome al Firefox.
# Realiza las modificaciones necesarias en el JavaScript para que sea válido en Firefox.

$Files = "js", "icons", "config.html"
$ChromeDirectory = "chrome"
$FirefoxDirectory = "firefox"
$ChromeFiles = $Files | ForEach-Object { $ChromeDirectory + "\" + $_ }
$FirefoxFiles = $Files | ForEach-Object { $FirefoxDirectory + "\" + $_ }

# Copiar archivos de la carpeta para Chrome a la carpeta para Firefox.

Copy-Item $ChromeFiles -Force -Destination $FirefoxDirectory -Recurse

# Reemplazar la variable global "chrome" por "browser".

# Por cada archivo de firefox...
Get-ChildItem -Path $FirefoxFiles -File | ForEach-Object {
  # ...si ese archivo incluye el string "chrome"...
  $FileContent = Get-Content $_.FullName
  If ($FileContent | Select-String -Pattern "chrome") {
    # ...por cada linea, reemplaza "chrome" por "browser".
    ($FileContent | ForEach-Object {
      $_ -Replace "chrome", "browser"
    }) | Set-Content $_.FullName
  }

  # Ahora pasar de "browser.action.onClicked" a "browser.browserAction.onClicked".
  $FileContent = Get-Content $_.FullName
  If ($FileContent | Select-String -Pattern "browser.action.onClicked") {
    ($FileContent | ForEach-Object {
      $_ -Replace "browser.action.onClicked", "browser.browserAction.onClicked"
    }) | Set-Content $_.FullName
  }
}
