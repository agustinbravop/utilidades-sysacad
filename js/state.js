/**
 * Obtiene un arreglo de las materias del estado académico, representadas
 * como un object con atributos `name: string` y `passed: bool`.
 */
function getCourses() {
  const coursesTable = document.querySelectorAll("table > tbody > tr");
  let courses = [];

  coursesTable.forEach((rowNode) => {
    // Una materia está aprobada si dice "Aprobada con ..." en la columna "Estado".
    const name = rowNode.children[1].textContent;
    const passed = rowNode.children[2].textContent.includes("Aprobada");

    courses.push({ name, passed });
  });

  return courses;
}

/**
 * Se persisten materias del estado académico en el item 'academicState' del
 * storage, para que otras vistas del SYSACAD puedan acceder a esos
 * datos. Ej: para medir el progreso en "Materias del plan".
 */
const courses = getCourses();
chrome.storage.local.set({ academicState: courses });
