/* app.js — Génome Réunion · Réunion DRCI/DSIO
   Navigation du deck, accessibilité clavier, menu mobile, synchro presenter.html. */

(function () {
  'use strict';

  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var total = slides.length;
  var deck = document.getElementById('deck');
  var pf = document.getElementById('pf');
  var ctr = document.getElementById('ctr');
  var bp = document.getElementById('bp');
  var bn = document.getElementById('bn');
  var navLogo = document.getElementById('nav-logo');
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobile-menu');
  var pills = Array.prototype.slice.call(document.querySelectorAll('.sec-pill'));

  var deckViewport = document.getElementById('deck-viewport');

  var current = 0;

  // Mise à l'échelle de la scène fixe 1920×1080 pour un rendu WYSIWYG.
  var SCENE_W = 1920, SCENE_H = 1080;
  function fitDeck() {
    if (!deck || !deckViewport) return;
    var scale = Math.min(deckViewport.clientWidth / SCENE_W, deckViewport.clientHeight / SCENE_H);
    deck.style.setProperty('--deck-scale', scale);
  }

  function clamp(i) { return Math.max(0, Math.min(total - 1, i)); }

  function partAt(i) {
    return slides[i] ? slides[i].dataset.part || '' : '';
  }

  function updatePills() {
    var part = partAt(current);
    var order = ['hero', 'contexte', 'budget', 'si'];
    var partIndex = order.indexOf(part);
    pills.forEach(function (pill, i) {
      pill.classList.toggle('active', i === partIndex);
    });
  }

  function render() {
    slides.forEach(function (s, i) {
      s.classList.toggle('is-active', i === current);
      s.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });
    pf.style.width = ((current + 1) / total * 100) + '%';
    ctr.textContent = (current + 1) + ' / ' + total;
    bp.disabled = current === 0;
    bn.disabled = current === total - 1;
    updatePills();
    slides[current].querySelector('.slide-inner').scrollTop = 0;
  }

  function goTo(i, opts) {
    var next = clamp(i);
    if (next === current && !(opts && opts.force)) return;
    current = next;
    render();
    history.replaceState(null, '', '#' + current);
    broadcastState();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function broadcastState() {
    var payload = { type: 'deck:state', index: current, total: total };
    try {
      if (window.opener) window.opener.postMessage(payload, '*');
      if (window.parent && window.parent !== window) window.parent.postMessage(payload, '*');
    } catch (e) { /* cross-origin no-op */ }
  }

  window.addEventListener('message', function (e) {
    var data = e.data;
    if (!data || typeof data !== 'object') return;
    if (data.type === 'deck:goto' && Number.isInteger(data.index)) {
      goTo(data.index, { force: true });
    }
  });

  bp.addEventListener('click', prev);
  bn.addEventListener('click', next);

  navLogo.addEventListener('click', function () { goTo(0); });
  navLogo.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(0); }
  });

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      goTo(parseInt(pill.dataset.goto, 10));
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  if (burger) {
    burger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.target && /input|textarea/i.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); goTo(total - 1); }
    else if (e.key === 'Escape') { mobileMenu.classList.remove('open'); }
  });

  // Support tactile (swipe) basique
  var touchStartX = null;
  document.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) { dx < 0 ? next() : prev(); }
    touchStartX = null;
  }, { passive: true });

  // Mise à l'échelle : au chargement, au redimensionnement et sur rotation.
  fitDeck();
  if ('ResizeObserver' in window && deckViewport) {
    new ResizeObserver(fitDeck).observe(deckViewport);
  } else {
    window.addEventListener('resize', fitDeck);
  }
  window.addEventListener('orientationchange', fitDeck);
  window.addEventListener('load', fitDeck);

  // Point d'entrée : hash d'URL (#12) permet le deep-link, utilisé par presenter.html
  var initial = parseInt(location.hash.replace('#', ''), 10);
  current = clamp(Number.isInteger(initial) ? initial : 0);
  render();

  window.addEventListener('hashchange', function () {
    var i = parseInt(location.hash.replace('#', ''), 10);
    if (Number.isInteger(i)) goTo(i, { force: true });
  });

  // API exposée pour presenter.html (accès direct via contentWindow)
  window.deckApp = { goTo: goTo, next: next, prev: prev, getIndex: function () { return current; }, total: total, slides: slides };
})();
