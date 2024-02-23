/** Traduce de la nota textual en la tabla al número correspondiente. */
const gradesTable = {
  uno: 1,
  dos: 2,
  tres: 3,
  cuatro: 4,
  cinco: 5,
  seis: 6,
  siete: 7,
  ocho: 8,
  ocho: 8,
  nueve: 9,
  diez: 10,
  "Aprob.": undefined,
  "Ausen.": undefined,
};

/**
 * Obtiene un arreglo de números (y `undefined`) que representa
 * las calificaciones obtenidas en los exámenes finales.
 * `undefined` representa a finales ausentes o aprobados sin nota.
 */
function getGrades() {
  const finalsTable = document.querySelectorAll("table > tbody > tr");
  let grades = [];

  finalsTable.forEach((v) => {
    grades.push(gradesTable[v.children[2].textContent]);
  });

  return grades;
}

/** Retorna el promedio de una lista de números. */
function average(nums) {
  return nums.reduce((acum, g) => g + acum, 0) / nums.length;
}

/** Genera el promedio sin aplazos de la tabla de exámenes finales. */
function showAverageWithoutFailures(grades) {
  // Se excluyen los aplazos (notas 1-5)
  const avg = average(grades.filter((g) => g >= 6));

  return `
    <p>😸<b>Promedio sin aplazos:</b> ${avg.toFixed(2) ?? "-"}</p>
  `;
}

/** Genera el promedio con aplazos de la tabla de exámenes finales. */
function showAverageWithFailures(grades) {
  return `
    <p>😸<b>Promedio con aplazos:</b> ${average(grades).toFixed(2) ?? "-"}</p>
  `;
}

const tableContainer = document.querySelector("div.table-responsive");
const grades = getGrades().filter((g) => g !== undefined);

// Se inserta el HTML generado al DOM para ser renderizado.
tableContainer.insertAdjacentHTML(
  "beforeend",
  showAverageWithoutFailures(grades) + showAverageWithFailures(grades),
);
