# Design System: Semestra Enterprise

> Cultural and educational gaming brand dedicated to preserving and celebrating Malaysian and Southeast Asian heritage.

## 1. Brand Identity & Character
- **Product:** Board games, educational card games, and interactive cultural experiences (flagship: *Malaysian Heritage Match*).
- **Audience:** Families, educators, students, and culture enthusiasts across Malaysia and Southeast Asia.
- **Mood:** Warm, tactile, authentic, culturally grounded, and legible. Editorial clarity over artificial tech aesthetics.

## 2. Antislop Dials
- **ENERGY:** 1 (Calm, grounded, respectful editorial structure)
- **RHYTHM:** 2 (Consistent grid layout with clear typographic hierarchy)
- **MOTION:** 1 (Functional transitions only: 0.15s–0.2s ease on focus/hover; zero endless loops or pulsing effects)

## 3. Color Palette
- **Base Canvas (Light Warm Paper):** `#FBF9F5`
- **Surface / Cards:** `#FFFFFF`
- **Subtle Surface / Elevated:** `#F4EFEA`
- **Primary Typography:** `#1E232A` (deep warm slate; contrast ratio > 12:1 against canvas)
- **Secondary Typography:** `#5A626C` (balanced mid-slate; contrast ratio > 5.5:1 against canvas, passes WCAG AA)
- **Borders & Dividers:** `#E6DFD5` (natural warm linen)
- **Brand Accent (Terracotta / Heritage Coral):** `#C8413B` (derived directly from the Semestra logo mark; contrast ratio 4.8:1 against canvas)
- **Brand Accent Hover:** `#B0322D`
- **Warm Gold Accent (Secondary Badge / Detail):** `#9C6E2E` (accessible warm amber)
- **Focus Ring:** `2px solid #C8413B` with `2px` offset

## 4. Typography
- **Font Stack:** `"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`
- **Hierarchy:**
  - H1: 2.5rem (desktop) / 2rem (mobile), line-height 1.25, font-weight 700, `#1E232A`
  - H2: 1.75rem, font-weight 600, `#1E232A`
  - H3: 1.25rem, font-weight 600, `#1E232A`
  - Body: 1rem, line-height 1.6, `#1E232A`
  - Muted/Notes: 0.875rem, `#5A626C`

## 5. Components & Rules
- **Navigation:** Solid clean background (`#FFFFFF` with `#E6DFD5` bottom border), fixed with proper document offset. No blanket blur/glassmorphism.
- **Logo Presentation:** Preserves natural aspect ratio (`height: 48px; width: auto; object-fit: contain;`), non-distorted, no scale pulsing.
- **Buttons:** Solid heritage coral button with high-contrast white text (`#FFFFFF` on `#C8413B`), standard 6px radius. No generic cyber-cyan gradients or neon glows.
- **Cards:** Clean white surface, 1px border (`#E6DFD5`), subtle 2px–4px shadow for elevation, no floating blur or cyan borders.
- **Interactive Controls:** All buttons, links, and the mobile hamburger menu must be keyboard-accessible (`Tab`, `Enter`, `Space`) with visible focus outlines.
