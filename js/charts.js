/* charts.js — Génome Réunion · Réunion DRCI/DSIO
   Graphiques Chart.js (vendorisé, pas de CDN) : donut ancestral (slide 3),
   radar des pondérations S_div (slide 9), comparatif budgétaire (slide 15).
   Les slides inactives restent dans le flux (opacity/visibility, pas de
   display:none) : les canvas ont donc une taille dès le chargement et les
   graphiques peuvent être initialisés une seule fois, sans attendre
   l'activation de leur slide. */

(function () {
  'use strict';

  if (typeof Chart === 'undefined') return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  Chart.defaults.font.family = "'DM Sans', sans-serif";
  Chart.defaults.color = '#2A3A48';
  Chart.defaults.animation = reduceMotion ? false : { duration: 600 };

  var NAVY = '#0F3A56';
  var TEAL = '#1E6E8C';
  var CORAL = '#E8654A';
  var BORDER = '#D8D2C6';

  function titleFont() {
    return { family: "'Space Grotesk', sans-serif", weight: '700', size: 13 };
  }

  var ancestryCanvas = document.getElementById('ancestryChart');
  if (ancestryCanvas) {
    new Chart(ancestryCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Afrique / Malgache', 'Inde du Sud', 'Européen', 'Zarabe / Gujarati', 'Chinois / Asie'],
        datasets: [{
          data: [45, 25, 15, 8, 7],
          backgroundColor: [TEAL, CORAL, NAVY, 'oklch(0.55 0.12 200)', 'oklch(0.50 0.10 150)'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '58%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: function (ctx) { return ctx.label + ' : ' + ctx.parsed + ' %'; } }
          }
        }
      }
    });
  }

  var radarCanvas = document.getElementById('sdivRadarChart');
  if (radarCanvas) {
    new Chart(radarCanvas, {
      type: 'radar',
      data: {
        labels: ['PCA_score', 'ADMIX_score', 'IBD_score', 'ROH_score'],
        datasets: [{
          label: 'Pondération S_div',
          data: [0.30, 0.30, 0.25, 0.15],
          backgroundColor: 'rgba(232, 101, 74, 0.18)',
          borderColor: CORAL,
          borderWidth: 2,
          pointBackgroundColor: CORAL,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            min: 0,
            max: 0.35,
            ticks: { stepSize: 0.10, backdropColor: 'transparent', color: '#6A7178' },
            grid: { color: BORDER },
            angleLines: { color: BORDER },
            pointLabels: { font: titleFont(), color: NAVY }
          }
        }
      }
    });
  }

  var scenarioCanvas = document.getElementById('scenarioChart');
  if (scenarioCanvas) {
    new Chart(scenarioCanvas, {
      type: 'bar',
      data: {
        labels: ['Génotypage', 'Infrastructure IT', 'Ressources humaines'],
        datasets: [
          { label: 'Scénario Optimal', data: [265, 270, 524], backgroundColor: TEAL, borderRadius: 4 },
          { label: 'Scénario Maximal', data: [479, 334, 524], backgroundColor: CORAL, borderRadius: 4 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', align: 'end', labels: { boxWidth: 12, font: { family: "'DM Sans', sans-serif", size: 13 } } },
          tooltip: { callbacks: { label: function (ctx) { return ctx.dataset.label + ' : ' + ctx.parsed.y + ' K€'; } } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: titleFont(), color: NAVY } },
          y: { beginAtZero: true, title: { display: true, text: '€ (milliers)' }, grid: { color: BORDER } }
        }
      }
    });
  }
})();
