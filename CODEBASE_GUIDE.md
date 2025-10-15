# Clay Roofing New York Codebase Guide

## Overview
Next.js project on Vercel with v0.dev. Tailwind for styles, Radix UI for buttons/dropdowns.

## Project Structure
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   └── dropdown-menu.tsx
│   └── Header.tsx
├── pages/
│   ├── index.tsx (Home)
│   ├── about.tsx
│   ├── contact.tsx
│   ├── gallery.tsx
│   └── tile-selection.tsx
├── public/
│   └── clay-roofing-new-york-logo.png
├── lib/
│   └── utils.ts
├── styles/
│   └── globals.css
├── next.config.js
├── package.json
└── CODEBASE_GUIDE.md (This file)

## Key Connections
- Pages (e.g., `index.tsx`) import `Header.tsx`.
- `Header.tsx` uses `ui/button.tsx` and `ui/dropdown-menu.tsx`.
- All UI files use `lib/utils.ts` for styles.

## Visual File Flow (Your Ladder Map)
This shows file links. GitHub renders it automatically.

\`\`\`mermaid
graph TD
    subgraph "Pages (Start Here)"
        A[pages/index.tsx (Home)]
        B[pages/contact.tsx]
        C[pages/gallery.tsx]
    end
    subgraph "Header"
        D[components/Header.tsx]
    end
    subgraph "UI Parts"
        E[ui/button.tsx]
        F[ui/dropdown-menu.tsx]
        G[ui/dialog.tsx]
    end
    subgraph "Helpers"
        H[lib/utils.ts]
        I[public/logo.png]
        J[styles/globals.css]
    end

    A --> D
    B --> D
    C --> D
    D --> E
    D --> F
    D --> I
    E --> H
    F --> H
    G --> H
    D --> J
    E --> J
    F --> J
    G --> J

    classDef page fill:#e1f5fe
    classDef header fill:#f3e5f5
    classDef ui fill:#e8f5e8
    classDef helper fill:#fff3e0
    class A,B,C page
    class D header
    class E,F,G ui
    class H,I,J helper
