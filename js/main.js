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
  historia();
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

/* Historia de Instagram de la portada.
   Se avanza tocando la mitad derecha, se retrocede con la izquierda,
   o con las flechas del teclado cuando la historia tiene el foco.
   No avanza sola: solo responde a lo que hace la persona. */
function historia() {
  const story = document.getElementById('story');
  if (!story) return;

  const frames = story.querySelectorAll('.frame');
  const bars = story.querySelectorAll('.bars i');
  const contador = document.getElementById('storyCount');
  let actual = 0;

  const mostrar = (n) => {
    actual = Math.max(0, Math.min(frames.length - 1, n));
    frames.forEach((f, i) => f.classList.toggle('is-on', i === actual));
    bars.forEach((b, i) => b.classList.toggle('done', i <= actual));
    contador.textContent = `${actual + 1} de ${frames.length}`;
  };

  story.querySelector('.tap-next').addEventListener('click', () => mostrar(actual + 1));
  story.querySelector('.tap-prev').addEventListener('click', () => mostrar(actual - 1));
  story.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); mostrar(actual + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); mostrar(actual - 1); }
  });

  /* Encuesta del último cuadro: cada respuesta lleva a un lugar distinto */
  const respuesta = document.getElementById('pollReply');
  story.querySelectorAll('[data-vote]').forEach((btn) => {
    btn.addEventListener('click', () => {
      story.querySelectorAll('[data-vote]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      respuesta.hidden = false;
      respuesta.innerHTML = btn.dataset.vote === 'si'
        ? 'Para crecer con orden, mira el <a href="#curso">curso de diciembre</a>.'
        : 'Hablemos y lo revisamos juntos: <a href="#contacto">escríbeme</a>.';
    });
  });

  mostrar(0);
}
