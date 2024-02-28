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

// Inicialización (corre una sola vez cuando la página carga).
/*
  courses: {
    name: string,
    passed: bool
  }[]
 */
chrome.storage.local.get("courses").then((items) => {
  showProgress(items.courses);
});
