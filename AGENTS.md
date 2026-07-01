# Règles de travail pour ce dépôt

Ce projet est une présentation HTML/CSS/JS statique (deck de réunion DRCI/DSIO
pour le projet Génome Réunion). La priorité est la maintenabilité du code, la
lisibilité de `index.html`, et la cohérence visuelle entre les slides.

## Principes généraux

- Ne pas dégrader la maintenabilité du dépôt pour accélérer une correction.
- Séparer autant que possible le contenu, la structure et la présentation.
- Préférer des changements petits, lisibles et faciles à relire.
- Préserver le contenu (scientifique, budgétaire, organisationnel) sauf
  demande explicite.

## HTML

- Garder `index.html` correctement indenté après chaque modification.
- Une slide doit rester un bloc `<section class="slide ...">` clairement
  identifiable, avec `data-label` et `data-notes` renseignés.
- Ajouter des commentaires HTML seulement pour délimiter les slides ou les
  blocs importants (voir les séparateurs `<!-- NN — Titre -->` existants).
- Éviter les conteneurs inutiles et les structures difficiles à relire.
- Avant de finir une tâche, vérifier que la hiérarchie parent/enfant reste
  facile à comprendre.

## CSS

- Ne pas ajouter de CSS inline sauf exception très justifiée (ex. une valeur
  de couleur `oklch(...)` ou une largeur de barre calculée dynamiquement qui
  n'a pas encore de classe dédiée).
- Si un style inline temporaire est ajouté pour débloquer une correction, le
  sortir vers le fichier CSS de la famille de slides concernée dans la même
  session ou juste après.
- Réutiliser les classes existantes de `css/main.css` avant d'en créer de
  nouvelles.
- Si un motif visuel revient au moins deux fois, créer une classe dédiée.
- Regrouper les styles par composant (`css/main.css`) ou par famille de
  slides (`css/slides/s0N-*.css`).
- Nommer les classes de manière explicite et cohérente avec la famille de la
  slide, par exemple : `bias-*`, `clinical-*`, `pharma-*`, `ai-*` (contexte),
  `budget-*`, `decision-*`, `funding-*` (budget), `infra-*`, `security-*`,
  `support-*` (systèmes d'information).

## Contenu des slides

- Ne pas modifier le fond scientifique, budgétaire ou organisationnel sans
  demande explicite.
- Ne pas raccourcir, reformuler ou enrichir un message sans validation si
  cela peut changer son sens (montants, effectifs, dates de calendrier,
  noms de l'équipe).
- Garder les libellés courts, lisibles et cohérents avec le reste du deck.

## Notes conférencier

- Chaque `<section>` de `index.html` porte l'attribut `data-notes` utilisé
  par `presenter.html`.
- `presenter.html` embarque sa propre copie de ces notes (tableau `NOTES`)
  pour fonctionner hors ligne sans dépendre d'un accès cross-frame au DOM de
  `index.html`.
- **Obligation** : toute modification du texte d'un `data-notes`, ou tout
  ajout/suppression/déplacement de slide, doit être répercutée dans le
  tableau `NOTES` de `presenter.html` dans le même commit.

## Refactor et commits

- Ne pas mélanger dans un même commit :
  - refactor de structure
  - changement de contenu
  - correction visuelle
- Si un refactor est fait, il doit améliorer la lisibilité du code sans
  changer le message de la slide.
- Avant un commit, vérifier qu'aucun style inline inutile n'a été laissé.

## Index du projet (CLAUDE.md)

- `CLAUDE.md` contient l'index structuré du projet : carte des slides,
  fichiers CSS par famille, IDs DOM, palette de couleurs.
- **Obligation** : après toute modification qui ajoute une slide, déplace une
  slide, crée une classe CSS ou modifie un ID DOM, mettre à jour `CLAUDE.md`
  dans le même commit.

- Favoriser la maintenabilité plutôt que la vitesse brute.
- Proposer une structure propre avant d'ajouter des exceptions locales.
- Quand un doute existe entre correction rapide et solution propre, préférer
  la solution propre si son coût reste raisonnable.
