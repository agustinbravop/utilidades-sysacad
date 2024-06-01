/** Traduce de la nota textual en la tabla del SYSACAD al número correspondiente. */
const GRADES_TABLE = {
  uno: 1,
  dos: 2,
  tres: 3,
  cuatro: 4,
  cinco: 5,
  seis: 6,
  siete: 7,
  ocho: 8,
  nueve: 9,
  diez: 10,
  "Aprob.": undefined,
  "Ausen.": undefined,
};

/**
 * Obtiene un arreglo de números (y `undefined`s) que representa
 * las calificaciones obtenidas en los exámenes finales.
 * Un `undefined` representa finales ausentes o aprobados sin nota.
 */
function getGrades() {
  const finalsTable = document.querySelectorAll("table > tbody > tr");
  let grades = [];

  finalsTable.forEach((rowNode) => {
    grades.push(GRADES_TABLE[rowNode.children[2].textContent]);
  });

  return grades;
}

/** Retorna el promedio de una lista de números. */
function average(nums) {
  return nums.reduce((acum, g) => g + acum, 0) / nums.length;
}

const grades = getGrades().filter((g) => g !== undefined);

// Promedio sin aplazos.
const avgWithoutFailures = average(grades.filter((g) => g >= 6));
const htmlAverageWithoutFailures = `
<p>🎯 <b>Promedio sin aplazos:</b> ${avgWithoutFailures.toFixed(2) ?? "-"}</p>
`;

// Promedio con aplazos.
const htmlAverageWithFailures = `
<p>🎯 <b>Promedio con aplazos:</b> ${average(grades).toFixed(2) ?? "-"}</p>
`;

// Tabla del HTML en la que colocar los promedios.
const tableContainer = document.querySelector("div.table-responsive");

// Se inserta el HTML generado al DOM para ser renderizado.
chrome.storage.local.get(["features"]).then((items) => {
  // Primero se valida si la funcionalidad está habilitada.
  if (items.features.includes("averages")) {
    tableContainer.insertAdjacentHTML(
      "beforeend",
      htmlAverageWithoutFailures + htmlAverageWithFailures
    );
  }
});
