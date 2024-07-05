/** @typedef {{ name: string, passed: bool }} Course */

/** Obtiene un arreglo de las materias del estado académico. */
function getCourses() {
  const coursesTable = document.querySelectorAll("table > tbody > tr");

  /** @type {Course[]} */
  let courses = [];

  coursesTable.forEach((rowNode) => {
    // Una materia está aprobada si dice "Aprobada con ..." en la columna "Estado".
    const name = rowNode.children[1].textContent;
    const passed = rowNode.children[2].textContent.includes("Aprobada");

    courses.push({ name, passed });
  });

  return courses;
}

// Se persisten materias del estado académico en el item 'courses' del
// storage, para que otras vistas del SYSACAD puedan acceder a esos
// datos. Ej: para medir el progreso en "Materias del plan".
const courses = getCourses();
browser.storage.local.set({ courses });
