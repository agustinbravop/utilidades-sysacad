/**
 * `Grade` representa la nota de un exámen final.
 * Vale `undefined` cuando fue ausente o aprobado sin nota.
 * @typedef {(number | undefined)} Grade
 */

/**
 * Traductor de la nota textual en la tabla del SYSACAD al número correspondiente.
 * @type { Object.<string, Grade> }
 */
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

  /** @type {Grade[]} */
  let grades = [];

  // Por cada fila de la tabla de exámenes finales...
  finalsTable.forEach((rowNode) => {
    // ...agregar la nota registrada a `grades`.
    grades.push(GRADES_TABLE[rowNode.children[2].textContent]);
  });

  return grades;
}

/**
 * Retorna el promedio (como un string) de una lista de números.
 * @param {number[]} nums
 */
function average(nums) {
  const avg = nums.reduce((acum, g) => g + acum, 0) / nums.length;
  const text = avg.toFixed(2) ?? "-";
  const sanitizedText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return sanitizedText;
}

// Usar solo las notas numéricas (ignorar los exámenes ausentes).
const grades = getGrades().filter((g) => g !== undefined);

// HTML con los promedios.
const htmlFootnote = `
<p>🎯 <b>Promedio sin aplazos:</b> ${average(grades.filter((g) => g >= 6))}</p>
<p>🎯 <b>Promedio con aplazos:</b> ${average(grades)}</p>
`;

// Tabla del HTML en la que colocar los promedios.
const tableContainer = document.querySelector("div.table-responsive");

// Se inserta el HTML generado al DOM para ser renderizado.
browser.storage.local.get(["features"]).then(({ features = [] }) => {
  // Primero se valida si la funcionalidad está habilitada.
  if (features.includes("averages")) {
    tableContainer.insertAdjacentHTML("beforeend", htmlFootnote);
  }
});
