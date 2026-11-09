# Images du site WOP

Les images actuelles sont des **substituts temporaires**, reprises des maquettes.
Pour les remplacer, déposez la nouvelle image **au même endroit, avec exactement le même nom et la même extension**.
Next.js génère lui-même les formats optimisés (WebP/AVIF) et les tailles adaptées à chaque écran.

Si l'extension change (ex. `.png` au lieu de `.jpg`), il faudra mettre à jour l'import dans le code : prévenez l'équipe dev.

## Recommandations

- Photos en **JPG**, qualité 80–85 %. Le PNG est réservé au logo et aux images avec transparence.
- Pas besoin de compresser à l'avance : Next.js s'en charge. Évitez seulement les fichiers de plus de 5 Mo.
- **Droit à l'image** : accord écrit de chaque personne reconnaissable.
- **Licence** : pour les photos de banques d'images, conservez la licence ou la facture.

## Fichiers attendus

| Fichier | Usage | Taille conseillée |
|---|---|---|
| `marque/logo-wop.png` | Logo (en-tête, pied de page) — idéalement fourni aussi en **SVG** | 600 × 252 px minimum |
| `accueil/hero.jpg` | Photo plein écran en haut de l'accueil | **2400 × 1600 px** minimum |
| `accueil/kpi-1.jpg`, `kpi-2.jpg`, `kpi-3.jpg` | Arche photo de la section « WOP en quelques chiffres » | 1000 × 1250 px (format 4:5) |
| `accueil/pilier-equiper.webp`, `pilier-inspirer.webp` | Silhouettes détourées (fond transparent) des piliers | 800 × 1200 px, PNG/WebP transparent |
| `accueil/pilier-connecter.webp` | Photo du pilier « Connecter » | 900 × 1300 px |

Les dossiers des autres pages (découvrir, équipe, etc.) seront ajoutés au fil des étapes.
