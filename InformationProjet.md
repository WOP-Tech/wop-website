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

Commandes pour lancer le projet en local 
npm run dev 