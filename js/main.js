/* =========================================================
   Paula Gaitán · Versión 2 "Portada de revista" · Interacciones
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
  ajustarCabecera();
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

  let texto;
  if (ahora > fin) {
    texto = 'Pregunta por la próxima edición.';
  } else if (ahora >= inicio) {
    texto = 'El curso está en marcha.';
  } else if (dias === 1) {
    texto = 'Empieza <b>mañana</b>.';
  } else {
    texto = `Faltan <b>${dias} días</b> para empezar.`;
  }
  el.innerHTML = texto;
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

/* Ajusta el nombre de la portada para que ocupe exactamente el ancho disponible,
   como la cabecera de una revista. Se recalcula al cargar la fuente y al cambiar el tamaño. */
function ajustarCabecera() {
  const h = document.querySelector('.masthead');
  if (!h) return;
  const medir = () => {
    const disponible = h.parentElement.clientWidth;
    h.style.fontSize = '100px';
    h.style.display = 'inline-block';
    h.style.width = 'auto';
    const natural = h.getBoundingClientRect().width;
    h.style.display = '';
    h.style.width = '';
    if (natural > 0) {
      const tam = Math.min(260, (100 * disponible / natural) * 0.995);
      h.style.fontSize = tam + 'px';
      document.documentElement.style.setProperty('--mast-size', tam + 'px');
    }
  };
  medir();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);
  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(medir, 100); });
}
