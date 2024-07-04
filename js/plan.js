/**
 * `Course` representa una materia y si está aprobada o no.
 * @typedef {{ name: string, passed: bool }} Course
 */

/**
 * Retorna un arreglo con solo las materias aprobadas.
 * @param {Course[]} courses
 */
function getPassedCourses(courses) {
  if (!courses || !Array.isArray(courses)) {
    return [];
  }
  return courses.filter((course) => course.passed);
}

/**
 * Agrega un ícono a las materias del plan ya aprobadas.
 * @param {Course[]} courses
 */
function showProgress(courses) {
  const passedCourses = getPassedCourses(courses);
  const coursesTable = document.querySelectorAll("table > tbody > tr");

  coursesTable.forEach((rowNode) => {
    const courseTdNode = rowNode.children[2];
    const courseName = courseTdNode.textContent;

    const passed = passedCourses.some((c) => c.name === courseName && c.passed);
    if (passed) {
      courseTdNode.insertAdjacentText("afterbegin", "✅ ");
    }
  });
}

// Tabla del HTML en la que colocar el footnote.
const tableContainer = document.querySelector("div.table-responsive");
const HTML_PROGRESS_FOOTNOTE = `
<p>* Un ✅ indica que la materia está aprobada en el estado académico.</p>
`;

// Inicialización (corre una sola vez cuando la página carga).
chrome.storage.local
  .get(["courses", "features"])
  .then(({ courses = [], features = [] }) => {
    // Primero se valida si la feature está habilitada.
    if (features.includes("progress")) {
      showProgress(courses);
      tableContainer.insertAdjacentHTML("beforeend", HTML_PROGRESS_FOOTNOTE);
    }
  });
