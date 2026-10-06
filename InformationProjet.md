Stack projet 
Framework        Next.js
Langage          TypeScript
UI               React
Styling          Tailwind CSS
Routing          App Router Next.js
Lint             ESLint
Compiler          React Compiler
Bundler dev      Turbopack
Hébergement      Vercel
Versioning       Git + GitHub


Architecture 
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   └── layout/
│
├── features/
│   ├── programs/
│   ├── testimonials/
│   ├── partners/
│   ├── contact/
│   └── newsletter/
│
├── data/
├── lib/
├── services/
└── types/


Un découpage par niveau 
Pages
↓
Features métier
↓
Composants réutilisables

Exemple d'application 
Accueil
↓
Hero / Programmes / Témoignages / Partenaires
↓
Button / Card / Container / SectionTitle


Structute cible 
src/
├── app/
│   ├── page.tsx
│   │
│   ├── decouvrir/
│   │   └── page.tsx
│   │
│   ├── programmes/
│   │   └── page.tsx
│   │
│   ├── stories/
│   │   └── page.tsx
│   │
│   ├── soutenir/
│   │   └── page.tsx
│   │
│   └── contact/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── SectionTitle.tsx
│       └── Card.tsx
│
└── features/
    ├── home/
    ├── programs/
    ├── testimonials/
    ├── partners/
    ├── newsletter/
    └── contact/


La règle à retenir est simple :
app/ = routes et pages.
features/ = logique liée au métier WOP.
components/ = composants génériques réutilisables.

la page orchestre, elle ne contient pas toute l’implémentation.
Deuxième décision importante : avec Next.js App Router, les composants sont par défaut des Server Components.
Donc on ne met surtout pas "use client" partout.
On utilisera "use client" uniquement quand le composant a besoin d’interactivité

Dernière règle d’architecture pour le projet : une fonctionnalité possède autant que possible ses propres composants, types et données.


Gestion BDD 
Next.js
   ↓
Supabase
   ├── PostgreSQL
   ├── Auth
   ├── Storage
   └── API


Workflow github 
main = branche stable
dev = branche d’intégration

Puis chacun travaille sur une petite branche de feature.
Exemple :
main
└── dev
    ├── feat/homepage
    ├── feat/header
    ├── feat/programs
    └── fix/mobile-menu

Convention de commits 

feat: nouvelle fonctionnalité
fix: correction
chore: configuration / dépendances
refactor: restructuration du code
docs: documentation
test: tests


Le fonctionnement :
1. on  part toujours de dev.
git checkout dev
git pull

2. on  crée une branche pour votre tâche.
git checkout -b feat/header

3. on  développe puis committez.
git add .
git commit -m "feat: add responsive header"

4. on  pousse votre branche.
git push -u origin feat/header

5. on  ouvre une Pull Request :
feat/header → dev

6. L’autre personne relit rapidement :
   - est-ce que ça fonctionne ?
   - pas de régression ?
   - code compréhensible ?
   - pas de secret poussé ?
Puis merge.

Convention de branches :
feat/nom-fonctionnalite
fix/nom-bug
refactor/nom
docs/nom


Le workflow complet devient donc :

Jira / US
    ↓
Créer branche depuis dev
    ↓
Développer
    ↓
Commit
    ↓
Push
    ↓
Pull Request
    ↓
Review par l'autre
    ↓
Merge dans dev
    ↓
Test global
    ↓
PR dev → main