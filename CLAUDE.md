# CLAUDE.md — Index du projet Génome Réunion (Réunion DRCI/DSIO)

## Vue d'ensemble

Présentation HTML/CSS/JS statique — **21 slides** (0–20), zéro build tool, zéro CDN à l'exécution (hors Google Fonts).
Deck de réunion destiné aux équipes DRCI et DSIO du CHU de La Réunion, structuré en 3 parties : contexte &amp; démarche
scientifique, budget &amp; financements, systèmes d'information &amp; accompagnement.
Recréé à partir du prototype de design haute-fidélité `design_handoff_genome_reunion/Genome Reunion Deck.dc.html`
(Claude Design) en page HTML autonome, avec séparation contenu / structure / présentation.
Règles de travail détaillées dans `AGENTS.md`.

## Fichiers principaux

| Fichier | Rôle |
|---|---|
| `index.html` | Les 21 slides (source unique de vérité) |
| `presenter.html` | Mode présentation deux-écrans : slide courante (iframe, gauche) + notes + aperçu slide suivante (droite), synchro par `postMessage`, fenêtre audience séparée |
| `css/main.css` | Variables de design, reset, navigation fixe, mécanique du deck (fade + `is-active`), typographie, composants transversaux (card, grid, callout, formule, sommaire, pipeline, timeline, modules, équipe), responsive, menu mobile |
| `css/presenter.css` | Styles dédiés à `presenter.html` (barre outils, timer, panneaux notes/aperçu, séparateur redimensionnable) |
| `css/slides/s00-hero.css` | Slides 0–1 — couverture, sommaire |
| `css/slides/s01-contexte.css` | Slides 2–6 — contexte scientifique, singularité réunionnaise, impact clinique VUS, pharmacogénétique, biais IA médicaments |
| `css/slides/s02-methodologie.css` | Slides 7–11 — objectifs, pipeline méthodologique, algorithme S_div, calendrier, modules IA |
| `css/slides/s03-budget.css` | Slides 12–15 — section budget, postes de dépenses, 3 décisions structurantes, scénarios &amp; financements |
| `css/slides/s04-si.css` | Slides 16–19 — section SI, infrastructure IT, sécurité des données, accompagnement DSIO &amp; DRCI |
| `css/slides/s05-equipe.css` | Slide 20 — équipe et prochaines étapes |
| `js/app.js` | Navigation (clavier, tactile, boutons), barre de progression, compteur, pastilles de section actives, menu burger mobile, synchro `postMessage` avec `presenter.html` |
| `js/charts.js` | Initialisation des 3 graphiques Chart.js (donut ancestral slide 3, radar S_div slide 9, comparatif budgétaire slide 15) |
| `js/vendor/chart.umd.js` | Chart.js 4.4.6 vendorisé (build UMD, récupéré via `npm pack`, pas de CDN) |
| `assets/logo.svg` / `assets/logo-white.svg` | Logo Génome Réunion (variante navy pour fonds clairs / variante blanche pour fonds navy·teal) |
| `assets/favicon.svg` | Favicon |
| `AGENTS.md` | Règles de travail (contenu, CSS, commits, conventions de nommage) |
| `CLAUDE.md` | Index technique du projet (ce fichier) |
| `README.md` | Guide utilisateur et architecture |
| `design_handoff_genome_reunion/` | Prototype de design source (Claude Design) — référence visuelle, non déployé |

## index.html — Carte des slides

| Idx | Titre | Partie | Fond | Notes |
|---|---|---|---|---|
| 0 | Couverture | — | `slide--navy` | Titre, équipe porteuse, version |
| 1 | Sommaire | — | `slide--white` | 3 blocs numérotés, plages de slides |
| 2 | Contexte scientifique | 1 · Contexte | `slide--white` | Sous-représentation génomique, 96 % / 1,1 % |
| 3 | La singularité réunionnaise | 1 · Contexte | `slide--white` | Admixture multicontinentale + effet fondateur, **donut Chart.js** `#ancestryChart` |
| 4 | Impact clinique VUS | 1 · Contexte | `slide--cream` | Comparatif patient Européen vs Réunionnais |
| 5 | Risques pharmaceutiques | 1 · Contexte | `slide--white` | CYP2C9 / CYP2C19 / CYP2D6, sur/sous-dosage |
| 6 | Biais IA médicaments | 1 · Contexte | `slide--cream` | Chaîne de propagation du biais + 4 dérives |
| 7 | Objectifs du projet | 1 · Contexte | `slide--navy` | 4 chiffres clés (2 500 / 350 / 100 / 36 mois) |
| 8 | Pipeline méthodologique | 1 · Contexte | `slide--white` | 3 blocs fléchés : cohorte SNP → familles → WGS |
| 9 | Algorithme S_div | 1 · Contexte | `slide--cream` | Formule + 4 composantes pondérées + **radar Chart.js** `#sdivRadarChart` |
| 10 | Calendrier 7 phases | 1 · Contexte | `slide--white` | Timeline + 7 cartes de phase + jalons |
| 11 | Modules IA | 1 · Contexte | `slide--white` | Grid 2×2 des 4 modules cliniques |
| 12 | [Section] Budget | 2 · Budget | `slide--navy` | Slide intercalaire, 2 scénarios chiffrés |
| 13 | Postes de dépenses | 2 · Budget | `slide--white` | Barres horizontales, total 1 709 000 € |
| 14 | 3 décisions structurantes | 2 · Budget | `slide--cream` | Génotypage / infrastructure / RH |
| 15 | Scénarios et financements | 2 · Budget | `slide--white` | Optimal vs Maximal, **barres groupées Chart.js** `#scenarioChart` + 4 sources de financement |
| 16 | [Section] Systèmes d'information | 3 · SI | `slide--teal` | Slide intercalaire |
| 17 | Infrastructure IT | 3 · SI | `slide--white` | Calcul &amp; stockage / réseau &amp; logiciels |
| 18 | Sécurité des données | 3 · SI | `slide--cream` | 3 piliers : hébergement, sécurité, gouvernance |
| 19 | Accompagnement DSIO &amp; DRCI | 3 · SI | `slide--white` | 2 colonnes de besoins/accompagnement |
| 20 | Équipe et prochaines étapes | 3 · SI | `slide--navy` | Équipe porteuse, partenaires, 4 prochaines étapes |

### Pastilles de navigation → slides d'entrée de partie

| Pastille | `data-goto` | Slide |
|---|---|---|
| Accueil | 0 | 0 — Couverture |
| 01 · Contexte scientifique | 2 | 2 — Contexte scientifique |
| 02 · Budget | 12 | 12 — [Section] Budget |
| 03 · Systèmes d'information | 16 | 16 — [Section] Systèmes d'information |

`data-part` sur chaque `<section>` (`hero` / `contexte` / `budget` / `si`) pilote la mise en évidence de la
pastille active dans `js/app.js` (`updatePills()`).

## IDs DOM utilisés par js/app.js

| ID | Rôle |
|---|---|
| `#deck` | Conteneur des 21 slides |
| `#deck-viewport` | Zone visible sous la nav + barre de progression |
| `#bp` / `#bn` | Boutons Précédent / Suivant |
| `#ctr` | Compteur « N / 21 » (`aria-live`) |
| `#pf` | Barre de progression (largeur %) |
| `#nav-logo` | Logo nav, clic/`Enter` → retour slide 0 |
| `#burger` / `#mobile-menu` | Menu mobile (&lt; 900 px) |
| `.sec-pill` | Pastilles de section (nav desktop + menu mobile), `data-goto="<index>"` |

`window.deckApp` expose `goTo(i)`, `next()`, `prev()`, `getIndex()`, `total`, `slides` pour un contrôle
programmatique (utilisé potentiellement par `presenter.html` si l'accès direct au DOM de l'iframe est possible).

## presenter.html — synchronisation

- `#p-main-frame` (iframe) affiche la slide courante ; `#p-next-frame` affiche un aperçu de la slide suivante.
- Navigation pilotée uniquement par `presenter.html`, qui envoie `{type:'deck:goto', index}` via `postMessage`
  aux deux iframes et à la fenêtre audience (`window.open('index.html', 'genome_reunion_audience')`).
- `js/app.js`, dans `index.html`, répond aux messages `deck:goto` et renvoie `{type:'deck:state', index, total}`
  à `window.opener` / `window.parent` à chaque changement — permet une synchro bidirectionnelle si l'audience ou
  l'iframe principale est navigée directement au clavier.
- Notes conférencier embarquées dans un tableau `NOTES` local à `presenter.html` (copie du contenu des attributs
  `data-notes` de `index.html` — voir règle de mise à jour dans `AGENTS.md`).
- Statut de connexion audience basé sur la fraîcheur du dernier `deck:state` reçu (`< 5 s`).
- Chronomètre conférencier démarré au premier changement de slide, réinitialisable.
- Séparateur notes/aperçu redimensionnable, ratio persisté dans `localStorage`
  (`genome-reunion-presenter-ratio`).

## Graphiques Chart.js

| Canvas | Slide | Type | Données |
|---|---|---|---|
| `#ancestryChart` | 3 — La singularité réunionnaise | donut | Composition ancestrale illustrative (45/25/15/8/7 %) |
| `#sdivRadarChart` | 9 — Algorithme S_div | radar | Pondération des 4 composantes (0,30/0,30/0,25/0,15) |
| `#scenarioChart` | 15 — Scénarios et financements | barres groupées | Génotypage / Infrastructure IT / RH — Optimal vs Maximal |

`js/charts.js` initialise les 3 graphiques une seule fois au chargement de `index.html` : les slides inactives
restent dans le flux (`opacity`/`visibility`, jamais `display:none`), donc chaque `<canvas>` a déjà une taille
exploitable dès `DOMContentLoaded`, sans attendre l'activation de sa slide. Aucune donnée n'est dupliquée par
rapport aux slides textuelles (12, 13) — les graphiques resynthétisent des chiffres déjà présentés ailleurs
dans le deck.

## Conventions de nommage CSS

| Famille | Préfixe | Fichier |
|---|---|---|
| Hero / Sommaire | `hero-*` / `toc-*` | s00-hero.css / main.css |
| Contexte scientifique | `bias-*` / `singularity-*` / `ancestry-*` / `clinical-*` / `pharma-*` / `ai-*` | s01-contexte.css |
| Méthodologie | `kpi-*` / `pipeline-*` / `algo-*` / `phase-*` / `module-*` | s02-methodologie.css + main.css |
| Budget | `budget-*` / `decision-*` / `scenario-*` / `funding-*` | s03-budget.css |
| Systèmes d'information | `infra-*` / `security-*` / `support-*` | s04-si.css |
| Équipe | `team-*` / `partners-*` / `step-item-*` | s05-equipe.css + main.css |
| Transversal | `card-*` / `grid-*` / `callout-*` / `stat-*` / `section-*` | main.css |

## Palette de couleurs (variables CSS — `css/main.css`)

| Variable | Valeur | Usage |
|---|---|---|
| `--navy` | #0F3A56 | Fond principal sombre, texte principal, titres |
| `--teal` | #1E6E8C | Accent primaire, section Systèmes d'information |
| `--coral` | #E8654A | Accent alerte / mise en évidence, section Budget |
| `--bg-light` | #F4F1EA | Fond slides neutres (« cream ») |
| `--muted` | #6A7178 | Texte secondaire |
| `--border` | #D8D2C6 | Bordures |
| `--ink` | #2A3A48 | Texte de corps sur fond clair |
| `--amber` | oklch(0.52 0.13 72) | Accent formation / RH |
| `--blue` | oklch(0.43 0.14 252) | Accent infrastructure IT |
| `--green` | oklch(0.45 0.15 150) | Accent financement / coût nul (POPgen) |

## Règle de mise à jour

> **Après toute modification qui change l'un des éléments ci-dessous, mettre à jour
> la section correspondante de ce fichier ET du git commit :**
>
> - Modification du nombre de slides → « **21 slides** » en vue d'ensemble + tableau « Carte des slides »
> - Ajout / suppression / déplacement d'une slide → tableau « Carte des slides » + tableau `NOTES` de `presenter.html`
> - Ajout d'une classe CSS → tableau « Conventions de nommage CSS »
> - Nouvel ID DOM utilisé par `js/app.js` → tableau « IDs DOM »
> - Modification de la cible d'une pastille de navigation → tableau « Pastilles de navigation »

Les numéros de ligne ne sont pas utilisés dans cet index ; seuls l'ordre et le contenu comptent.
