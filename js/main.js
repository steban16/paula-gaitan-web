/* =========================================================
   Paula Gaitán · Sitio personal · Interacciones
   Diseño y desarrollo: TYR Productions
   ========================================================= */

/* Configuración: cambia aquí los datos del curso sin tocar el HTML */
const CONFIG = {
  inicioCurso: '2026-12-09T00:00:00-05:00', // hora de Colombia
  finCurso:    '2026-12-10T23:59:00-05:00',
  formulario:  'https://docs.google.com/forms/d/e/1FAIpQLSchglCLMII_60s7EJIKklePBneN0kRXjq61rxKivuukDumhDA/viewform',
  enlaceTYR:   '', // tu Instagram o sitio web; si queda vacío, el crédito no es enlace
  // Pon esto en true cuando todos los textos estén completos:
  ocultarMarcasPendientes: false
};

document.addEventListener('DOMContentLoaded', () => {
  conectarFormulario();
  creditoTYR();
  cuentaRegresiva();
  if (CONFIG.ocultarMarcasPendientes) quitarMarcasPendientes();
  document.getElementById('anio').textContent = new Date().getFullYear();
});

/* Todos los enlaces con data-form abren el formulario de inscripción */
function conectarFormulario() {
  document.querySelectorAll('[data-form]').forEach((a) => {
    a.href = CONFIG.formulario;
    a.target = '_blank';
    a.rel = 'noopener';
  });
}

/* Muestra cuántos días faltan para el curso */
function cuentaRegresiva() {
  const el = document.getElementById('count');
  if (!el) return;

  const ahora = new Date();
  const inicio = new Date(CONFIG.inicioCurso);
  const fin = new Date(CONFIG.finCurso);
  const dias = Math.ceil((inicio - ahora) / 86400000);

  let html;
  if (ahora > fin) {
    html = '<span>Pregunta por la próxima edición</span>';
  } else if (ahora >= inicio) {
    html = '<span><b>Hoy</b>estamos en clase</span>';
  } else if (dias === 1) {
    html = '<span><b>1</b>día: empieza mañana</span>';
  } else {
    html = `<span><b>${dias}</b>días para empezar</span><span>Cupos limitados</span>`;
  }
  el.innerHTML = html;
}

/* Quita los recuadros punteados de "texto por completar" */
function quitarMarcasPendientes() {
  document.querySelectorAll('.edit').forEach((n) => n.classList.remove('edit'));
}

/* Crédito del desarrollador: enlaza a TYR Productions si hay un enlace configurado */
function creditoTYR() {
  const a = document.querySelector('.tyr');
  if (!a) return;
  if (CONFIG.enlaceTYR) {
    a.href = CONFIG.enlaceTYR;
    a.target = '_blank';
    a.rel = 'noopener';
  } else {
    a.removeAttribute('href');
  }
}
