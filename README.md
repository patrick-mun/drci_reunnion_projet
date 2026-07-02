<p align="center">
  <img src="assets/logo.svg" alt="Génome Réunion — Référentiel génomique" height="72">
</p>

# Génome Réunion — Réunion de présentation DRCI &amp; DSIO

Présentation HTML/CSS/JS statique du projet **Génome Réunion** — premier référentiel génomique dédié à la
population réunionnaise, porté par le CHU de La Réunion — préparée pour une réunion de présentation aux
équipes DRCI (Direction de la Recherche Clinique et de l'Innovation) et DSIO (Direction des Systèmes
d'Information et de l'Organisation) du CHU.

21 slides, zéro build tool, zéro CDN à l'exécution (hors Google Fonts). Ouvrable directement dans un
navigateur, sans serveur ni compilation.

## Aperçu rapide

```bash
# Depuis la racine du dépôt
python3 -m http.server 8000
# puis ouvrir http://localhost:8000/index.html
```

Le fichier peut aussi être ouvert directement en double-cliquant sur `index.html` (`file://`), mais un
serveur local est recommandé pour un rendu et une synchro presenter/audience fiables sur tous les
navigateurs.

## Structure du deck — 21 slides

| Partie | Slides | Contenu |
|---|---|---|
| Couverture &amp; sommaire | 1–2 | Titre, équipe, déroulé de la réunion |
| 1 · Contexte &amp; démarche scientifique | 3–11 | Angle mort de la médecine de précision, singularité génétique réunionnaise, impact clinique, pharmacogénétique, biais IA, objectifs, pipeline, algorithme S_div, calendrier, modules IA |
| 2 · Budget &amp; financements | 12–15 | Postes de dépenses, 3 décisions structurantes, scénarios et financements (FEDER, PHRC-R, POPgen) |
| 3 · Systèmes d'information &amp; accompagnement | 16–20 | Infrastructure IT, sécurité des données, accompagnement DSIO &amp; DRCI, équipe et prochaines étapes |

La partie 1 s'adresse à l'ensemble des participants ; les parties 2 et 3 impliquent plus particulièrement
la DRCI et la DSIO.

## Navigation

- **Flèches ← / →**, `PageUp` / `PageDown`, `Home` / `End` : navigation clavier
- **Swipe** tactile sur mobile/tablette
- **Pastilles de section** dans la nav (Accueil / Contexte / Budget / Systèmes d'information)
- **Menu burger** sur écran &lt; 900 px
- Barre de progression et compteur de slides dans la nav fixe

## Mode présentation

`presenter.html` propose un mode deux-écrans pour l'orateur :

- slide courante affichée en grand (colonne gauche) avec ses propres contrôles Précédent/Suivant
- notes conférencier et aperçu de la slide suivante (colonne droite)
- chronomètre de présentation
- bouton **« Ouvrir la vue audience »** : ouvre `index.html` dans une fenêtre séparée à projeter, synchronisée
  en temps réel avec le panneau de contrôle

## Design

Charte graphique reprise du prototype de design haute-fidélité fourni (`design_handoff_genome_reunion/`,
généré avec Claude Design) :

- **Couleurs** : navy `#0F3A56`, teal `#1E6E8C`, coral `#E8654A`, fond clair `#F4F1EA`
- **Typographie** : Space Grotesk (titres, chiffres clés) + DM Sans (corps de texte)
- **Composants** : cards, grilles, callouts, barres de progression, formule mise en avant, timeline,
  sommaire numéroté — voir `CLAUDE.md` pour le détail des classes CSS

## Fichiers du dépôt

| Fichier / dossier | Rôle |
|---|---|
| `index.html` | Le deck complet (21 slides) |
| `presenter.html` | Mode présentation deux-écrans |
| `css/main.css` | Design system, navigation, mécanique du deck, composants transversaux |
| `css/presenter.css` | Styles du mode présentation |
| `css/slides/` | Styles spécifiques par famille de slides |
| `js/app.js` | Navigation, accessibilité, synchro presenter |
| `assets/` | Logo (versions navy et blanche) et favicon SVG |
| `design_handoff_genome_reunion/` | Prototype de design source (référence visuelle, non déployé) |
| `AGENTS.md` | Règles de travail pour toute contribution au dépôt |
| `CLAUDE.md` | Index technique détaillé du projet |
| `SECURITY.md` | Politique de signalement des vulnérabilités |

## Contribuer

Voir `AGENTS.md` pour les règles de travail (structure HTML, conventions CSS, gestion du contenu, commits)
et `CLAUDE.md` pour l'index technique (carte des slides, IDs DOM, conventions de nommage) à tenir à jour à
chaque modification.
