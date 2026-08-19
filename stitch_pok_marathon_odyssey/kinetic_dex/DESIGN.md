---
name: Kinetic Dex
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#eabcb6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#b08781'
  outline-variant: '#5f3f3a'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690003'
  primary-container: '#ff5545'
  on-primary-container: '#5c0002'
  inverse-primary: '#c0000a'
  secondary: '#a6e6ff'
  on-secondary: '#003543'
  secondary-container: '#14d1ff'
  on-secondary-container: '#00566b'
  tertiary: '#e9c400'
  on-tertiary: '#3a3000'
  tertiary-container: '#c9a900'
  on-tertiary-container: '#4c3f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930005'
  secondary-fixed: '#b7eaff'
  secondary-fixed-dim: '#4cd6ff'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e60'
  tertiary-fixed: '#ffe16d'
  tertiary-fixed-dim: '#e9c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-xl:
    fontFamily: Sora
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
spacing:
  unit: 4px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 40px
  block-gap: 32px
---

## Brand & Style

The design system is a high-energy, technical interface designed for power users and competitive players. The brand personality is "Industrial Digitalism"—merging the raw, structural integrity of Neo-Brutalism with the high-tech, layered depth of Glassmorphism.

The UI evokes the feeling of a high-end tactical Pokedex. It prioritizes speed, data density, and clear hierarchy while maintaining a "hacker" aesthetic.

**Core Principles:**
- **Raw Structure:** Heavy borders and high-contrast divides create a sense of physical hardware.
- **Glass Optics:** Data panels utilize frosted transparency and colored glows to separate information layers without losing the sense of a unified environment.
- **Aggressive Typography:** Over-sized, bold headers cut through the visual noise to provide immediate orientation.
```

## Colors

The palette is anchored in a Deep Charcoal base to provide maximum contrast for vibrant, "type-inspired" accents.

- **Primary (Vivid Red):** Used for critical actions, fire-type indicators, and high-priority alerts.
- **Secondary (Electric Blue):** Used for navigation, water-type indicators, and active routing paths.
- **Accent (Electric Yellow):** Reserved for special highlights, electric-type data, and "unlocked" states.
- **Neutral (Deep Charcoal):** The structural foundation, used for container backgrounds and thick borders.

Functional colors for status (Success: Grass Green #4ADE80, Warning: Electric Yellow #FFD700) should follow the same high-vibrancy profile.

## Typography

This design system uses a triple-threat typographic strategy:
1. **Sora (Display/Headlines):** High-impact, geometric sans-serif for titles and Pokemon names.
2. **Hanken Grotesk (Body):** Clean, contemporary grotesque for reading stats and descriptions.
3. **JetBrains Mono (Data/Labels):** Monospaced font for technical details like Base Stats, IVs, and Route coordinates to reinforce the "scanning" aesthetic.

**Scaling:** Large display text should aggressively tighten letter-spacing. Labels should always be uppercase with slight tracking (+0.05em) for readability against dark backgrounds.

## Layout & Spacing

The layout utilizes a **Dynamic Offset Grid**. While columns exist, elements often break the "clean" vertical line with 4px or 8px offsets to create a more raw, non-traditional feel.

- **Desktop:** 12-column grid with wide gutters (20px). Use asymmetrical layouts where the sidebar or "Pokedex Entry" takes up 5 columns and the "Route Map" takes up 7.
- **Mobile:** Single column with 16px margins.
- **Rhythm:** All spacing must be multiples of 4px. Use generous vertical gaps (32px+) between major sections to allow the background glows to breathe.

## Elevation & Depth

Depth is achieved through **Material Stacking** rather than traditional shadows.

1. **The Void:** The base background (#0D0D0D).
2. **The Frame:** 2px solid borders (#1A1A1A) that define the boundaries of the UI sections.
3. **The Glass Layer:** Cards use `backdrop-filter: blur(12px)` and a semi-transparent fill of #1A1A1A at 70% opacity. 
4. **The Glow:** Active or rare elements feature a subtle outer glow (drop-shadow) using the primary or secondary color with 20% opacity and a 15px spread.

Avoid soft, directional shadows. Use "inner-glow" strokes (1px, 10% white) on the top-left edge of glass cards to simulate a light source hitting the glass edge.

## Shapes

The design system embraces a **Sharp** aesthetic. 

- All primary containers, buttons, and input fields must have 0px corner radius.
- **Exceptions:** Inner status indicators (like Type Badges) may use a subtle 2px radius to differentiate "soft" data from "hard" structural elements.
- **Lines:** Use heavy 2px horizontal and vertical rules to separate content blocks, mimicking technical schematics.

## Components

### Buttons
- **Primary:** Solid #FF1C1C fill, black text, 0px radius. On hover, add a 4px offset "ghost" border in #00D1FF.
- **Secondary:** Transparent with a 2px #FFFFFF border.

### Glass Cards
Used for Pokemon entries and Route details. Must feature a 1px solid white border at 10% opacity and a `backdrop-filter: blur(20px)`.

### Type Badges
Small rectangular blocks. Use the specific Pokemon Type color as a left-side 4px vertical accent bar rather than a full background fill to keep the UI clean.

### Inputs
Black background, 2px bottom-border only (#B0B0B0). When focused, the border turns #00D1FF and a subtle blue glow appears behind the text field.

### Routing Nodes
Hexagonal or Diamond shapes rather than circles. Use #00D1FF for "Visited" and #FF1C1C for "Current Destination."

### Lists
High-density rows separated by 1px #1A1A1A borders. Use JetBrains Mono for all numeric data within list items.