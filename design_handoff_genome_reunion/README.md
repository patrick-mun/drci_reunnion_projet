# Handoff : Diaporama Génome Réunion

## Vue d'ensemble

Ce package contient le diaporama de présentation du projet **Génome Réunion** — premier référentiel génomique dédié à la population réunionnaise, porté par le CHU de La Réunion. Le deck a été conçu pour une réunion de présentation aux équipes DRCI et DSIO du CHU.

## À propos des fichiers de design

Les fichiers HTML fournis sont des **prototypes de référence haute-fidélité** créés dans un environnement de design en HTML. Ils ne sont pas destinés à être déployés tels quels en production. L'objectif est de **recréer fidèlement ce diaporama** en tant que page HTML autonome, en s'inspirant du code source fourni pour reproduire les visuels, la typographie, les couleurs et les interactions.

Le fichier principal `Genome Reunion Deck.dc.html` peut être ouvert directement dans un navigateur pour visualiser le résultat attendu. Il dépend de `deck-stage.js`, `support.js` et `image-slot.js` (tous inclus dans le package).

## Fidélité

**Haute-fidélité (hifi)** — Le prototype est pixel-perfect avec couleurs, typographies, espacements et interactions finaux. La recréation doit correspondre visuellement à l'original.

---

## Structure du deck — 21 diapositives

| N° | Label | Type |
|----|-------|------|
| 01 | Couverture | Slide pleine page fond navy |
| 02 | Sommaire | 3 blocs numérotés |
| 03 | Contexte scientifique | 2 colonnes + stats |
| 04 | Singularité réunionnaise | 2 colonnes + barres ancestrales |
| 05 | Impact clinique VUS | Comparatif Européen vs Réunionnais |
| 06 | Risques pharmaceutiques | CYP2C9/C19/D6 + 4 conséquences |
| 07 | Biais IA médicaments | Chaîne propagation + 4 dérives |
| 08 | Objectifs du projet | 4 chiffres clés en grid |
| 09 | Pipeline méthodologique | 3 blocs en séquence avec flèches |
| 10 | Algorithme S_div | Formule + 4 composants |
| 11 | Calendrier 7 phases | Timeline + 7 cartes |
| 12 | Modules IA | Grid 2×2 |
| 13 | [Section] Budget | Slide de section fond navy |
| 14 | Postes de dépenses | Barres horizontales |
| 15 | 3 décisions structurantes | 3 colonnes comparatives |
| 16 | Scénarios et financements | 2 colonnes |
| 17 | [Section] Systèmes d'information | Slide de section fond teal |
| 18 | Infrastructure IT | 2 colonnes listes |
| 19 | Sécurité des données | 3 piliers |
| 20 | Accompagnement DSIO & DRCI | 2 colonnes |
| 21 | Équipe et prochaines étapes | Équipe + logos partenaires |

---

## Design tokens

### Couleurs principales

```css
--navy:     #0F3A56;   /* Fond sombre principal */
--teal:     #1E6E8C;   /* Accent bleu-vert */
--coral:    #E8654A;   /* Accent orange-rouge */
--bg-light: #F4F1EA;   /* Fond clair beige chaud */
--muted:    #6A7178;   /* Texte secondaire */
--border:   #D8D2C6;   /* Bordures */
--navy-dark:#16242E;   /* Fond très sombre (sections) */
```

### Typographie

| Usage | Police | Poids | Taille slide |
|-------|--------|-------|-------------|
| Titres H1 | Space Grotesk | 700 | 54–64px |
| Titres H2 | Space Grotesk | 700 | 36–46px |
| Labels section | Space Grotesk | 600 | 22–26px — UPPERCASE, letter-spacing 3px |
| Corps de texte | DM Sans | 300–400 | 26–30px |
| Texte secondaire | DM Sans | 400 | 24px |
| Grands chiffres | Space Grotesk | 700 | 56–82px |

Import Google Fonts :
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
```

### Espacements (base 1920×1080px)

```
padding horizontal : 100px
padding top : 72–84px
padding bottom : 64–72px
gap titre : 22–32px
gap items : 12–20px
border-radius cards : 10–16px
```

---

## Slides de section (intercalaires)

3 slides de section introduisent chaque grande partie :
- **Budget** (slide 13) : fond `#0F3A56`, grand titre blanc, chiffres en évidence
- **Systèmes d'information** (slide 17) : fond `#1E6E8C`, titre blanc

Structure type :
```html
<div style="background:#0F3A56; height:100%; display:flex; flex-direction:column; justify-content:center; padding:84px 100px;">
  <span style="color:#E8654A; font-family:'Space Grotesk'; font-size:26px; letter-spacing:4px; text-transform:uppercase;">Libellé section</span>
  <h1 style="color:white; font-family:'Space Grotesk'; font-size:96px; font-weight:700;">Titre</h1>
  <p style="color:rgba(255,255,255,0.62); font-size:30px;">Sous-titre</p>
</div>
```

---

## Composants récurrents

### Label de section (eyebrow)
```html
<span style="font-family:'Space Grotesk',sans-serif; font-size:22-26px; font-weight:600; color:#1E6E8C; letter-spacing:3px; text-transform:uppercase;">Nom section</span>
```

### Card fond clair
```html
<div style="padding:20-32px; background:#F4F1EA; border-radius:10-16px; border:1px solid #D8D2C6;">
```

### Card fond corail léger
```html
<div style="padding:20px; background:oklch(0.97 0.02 30); border-radius:10px; border:1px solid oklch(0.88 0.06 30);">
```

### Barre de progression (barres budget)
```html
<div style="flex:1; height:42px; background:#D8D2C6; border-radius:4px; overflow:hidden;">
  <div style="width:64%; height:100%; background:#1E6E8C; display:flex; align-items:center; padding:0 16px;">
    <span style="color:white; font-weight:700;">334 000 €</span>
  </div>
</div>
```

---

## Navigation et interactions

Le deck utilise **deck-stage.js** (web component `<deck-stage>`), qui gère :
- Navigation clavier ← → (flèches)
- Rail de vignettes en bas (clic pour naviguer, drag pour réordonner)
- Scaling automatique 1920×1080 → taille fenêtre
- Notes conférencier via `data-speaker-notes` sur chaque `<section>`
- Export PDF (une page par slide via Cmd+P)

```html
<deck-stage width="1920" height="1080">
  <section data-label="01 — Couverture" data-speaker-notes="Notes…">
    <!-- contenu -->
  </section>
  <!-- … autres sections … -->
</deck-stage>
```

---

## Logo Génome Réunion

Le logo est un SVG inline composé de :
- 3 courbes sinusoïdales (blanc semi-transparent, teal `#1E6E8C`, coral `#E8654A`)
- 3 points terminaux colorés
- Texte : "Génome **Réunion**" en Space Grotesk 700/400
- Sous-titre : "RÉFÉRENTIEL GÉNOMIQUE" en 10.5px, letter-spacing 3.4px

Voir le fichier `assets/logo.svg` pour la source complète.

---

## Logos partenaires (slide 21)

3 emplacements prévu pour des logos déposés par l'utilisateur :
- **POPgen** (PFMG2025) — `presse.efs.sante.fr` ou site AVIESAN
- **EFS** — `presse.efs.sante.fr/photos/logo`
- **CHU de La Réunion** — `chu-reunion.fr/presse-et-communication/logos-et-charte-graphique-chu`

Les slots utilisent `<image-slot>` (web component, voir `image-slot.js`). Chaque slot :
- `id` unique : `logo-popgen`, `logo-efs`, `logo-chu`
- `fit="contain"` pour afficher le logo entier
- Conteneur blanc arrondi 150×70–120px

---

## Fichiers inclus

| Fichier | Description |
|---------|-------------|
| `Genome Reunion Deck.dc.html` | Fichier principal du diaporama (à ouvrir dans le navigateur) |
| `deck-stage.js` | Web component shell du deck (navigation, scaling, rail) |
| `image-slot.js` | Web component slots logos glisser-déposer |
| `support.js` | Runtime DC (ne pas modifier) |
| `assets/logo.svg` | Logo Génome Réunion SVG |
| `assets/favicon.svg` | Favicon |
| `css/styles.css` | Styles du site web Génome Réunion (référence charte) |

---

## Notes d'implémentation pour Claude Code

1. **Ouvrir `Genome Reunion Deck.dc.html` dans un navigateur** pour visualiser le rendu final attendu — c'est la référence visuelle.
2. Le fichier dépend de `deck-stage.js`, `support.js` et `image-slot.js` dans le même dossier.
3. Tous les styles sont en **inline CSS** — pas de feuille de styles externe nécessaire pour le deck.
4. Les slides sont des `<section>` enfants directs du `<deck-stage>`.
5. Pour un export HTML autonome (sans dépendances), utiliser l'outil `super_inline_html` ou bundler manuellement les scripts.
6. Le deck est conçu pour 1920×1080 — le scaling vers d'autres résolutions est géré automatiquement par `deck-stage.js`.
