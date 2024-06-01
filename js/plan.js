/** Retorna un arreglo con solo las materias aprobadas. */
function getPassedCourses(courses) {
  if (!courses || !Array.isArray(courses)) {
    return [];
  }
  return courses.filter((course) => course.passed);
}

/** Agrega un ícono a las materias del plan ya aprobadas. */
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
const htmlProgressFootnote = `
<p>* Un ✅ indica que la materia está aprobada en el listado de exámenes.</p>
`;

// Inicialización (corre una sola vez cuando la página carga).
/*
  courses: {
    name: string,
    passed: bool
  }[]
 */
chrome.storage.local.get(["courses", "features"]).then((items) => {
  // Primero se valida si la feature está habilitada.
  if (items.features.includes("progress")) {
    showProgress(items.courses);
    tableContainer.insertAdjacentHTML("beforeend", htmlProgressFootnote);
  }
});
