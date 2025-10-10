# Clay Roofing New York Codebase Guide

## Overview
Next.js mobile landing page built with v0.dev, deployed on Vercel. Uses Tailwind CSS and Radix UI. Created 08:00 PM EDT, Oct 09, 2025.

## Project Structure
- `pages/`: Routes (e.g., `index.tsx` for Home Landing).
- `components/`: Reusable UI (e.g., `Header.tsx`).
- `components/ui/`: UI primitives (e.g., `button.tsx`, `dropdown-menu.tsx`).
- `public/`: Assets (e.g., `clay-roofing-new-york-logo.png`).
- `lib/`: Utilities (e.g., `utils.ts`).
- `styles/`: Global styles (e.g., `globals.css`).
- `app/`: Layout (e.g., `layout.tsx`).

## Key Connections
- All `pages/` files (e.g., `index.tsx`) are wrapped by `app/layout.tsx`, which imports `components/Header.tsx`.
- `Header.tsx` uses `components/ui/button.tsx` and `components/ui/dropdown-menu.tsx`.
- UI components (`button.tsx`, `dropdown-menu.tsx`, `dialog.tsx`) rely on `lib/utils.ts` for Tailwind styling.
- `pages/contact.tsx` likely uses `components/ui/dialog.tsx` for modals.

## Visual File Flow (Ladder Diagram)
Update this Mermaid code as v0 changes the project.

```mermaid
graph TD
    subgraph "Pages (Routes - Entry Points)"
        A[pages/index.tsx Home Landing]
        B[pages/about.tsx]
        C[pages/contact.tsx]
        D[pages/gallery.tsx]
        E[pages/tile-selection.tsx]
    end

    subgraph "Header Component"
        F[components/Header.tsx Navigation Logo]
    end

    subgraph "UI Primitives (Radix UI)"
        G[components/ui/button.tsx Quote Button]
        H[components/ui/dropdown-menu.tsx Mobile Menu]
        I[components/ui/dialog.tsx Possible Modal]
    end

    subgraph "Utilities & Assets"
        J[lib/utils.ts Tailwind Styling]
        K[public/clay-roofing-new-york-logo.png Logo]
        L[styles/globals.css Global Styles]
        M[app/layout.tsx Root Layout]
    end

    %% Connections (Imports/Dependencies)
    A --> M
    B --> M
    C --> M
    D --> M
    E --> M
    M --> F
    F --> G
    F --> H
    F --> K
    G --> J
    H --> J
    I --> J
    F --> L
    G --> L
    H --> L
    I --> L
    M --> L
    C --> I

    %% Styling for Ladder View
    classDef page fill:#e1f5fe,stroke:#01579b
    classDef header fill:#f3e5f5,stroke:#4a148c
    classDef ui fill:#e8f5e8,stroke:#1b5e20
    classDef util fill:#fff3e0,stroke:#e65100
    class A,B,C,D,E page
    class F header
    class G,H,I ui
    class J,K,L,M util
