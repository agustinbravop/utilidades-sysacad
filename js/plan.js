/** Retorna un arreglo con solo las materias aprobadas. */
function getPassedCourses(academicState) {
  if (!academicState || !Array.isArray(academicState)) {
    return [];
  }
  return academicState.filter((course) => course.passed);
}

/** Agrega un ícono a las materias del plan ya aprobadas. */
function showProgress(academicState) {
  const passedCourses = getPassedCourses(academicState);
  const coursesTable = document.querySelectorAll("table > tbody > tr");

  coursesTable.forEach((rowNode) => {
    const courseTdNode = rowNode.children[2];
    const courseName = courseTdNode.textContent;

    const passed = passedCourses.some((c) => c.name === courseName && c.passed);
    if (passed) {
      courseTdNode.insertAdjacentText("afterbegin", "✅");
    }
  });
}

// Inicialización (corre una sola vez cuando la página carga).
chrome.storage.local.get("academicState").then((items) => {
  showProgress(items.academicState);
});
