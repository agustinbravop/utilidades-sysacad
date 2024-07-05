const form = document.getElementsByTagName("form")[0];

// Se controla el legajo al intentar iniciar sesión.
// FIXME: Si un usuario ingresa un usuario incorrecto igual se borra
// lo persistido, por más que el inicio de sesión haya fallado.
form.addEventListener("submit", () => {
  const username = document.getElementById("username").value;

  browser.storage.local.get("username").then((items) => {
    if (items.username !== username) {
      // El legajo es distinto al anterior ==> se guarda el usuario nuevo.
      browser.storage.local.set({ username });
      // Se eliminan los datos persistidos que son del usuario anterior.
      browser.storage.local.remove("courses");
    }
  });
});
