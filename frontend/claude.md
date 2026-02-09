# Merge Frontend Design System

## Overview

This document defines the non-negotiable UI/UX rules for the Merge application.

Merge is a futuristic, dark-first, typography-led product built for serious developers.
The interface must feel calm, precise, modern, and intentional.

If something looks "pretty" before it looks "clear", it is wrong.

---

## Design Philosophy

### Core Direction

Futuristic, dark-first, typography-led product for serious developers.

### Design Principles

- Dark UI by default
- Flat surfaces, no visual gimmicks
- Typography over color and effects
- Minimal but deliberate hierarchy
- UI should disappear, content should stand out

### Explicitly Not Allowed

- Glassmorphism
- DaisyUI components (except dropdowns)
- Bright colors as primary UI
- Rounded, bubbly cards
- Marketing-style visuals

### Allowed with Purpose

- Subtle gradients for depth and premium feel (backgrounds, overlays, glow effects)
- Refined shadows for elevation (shadow-lg, shadow-2xl with low opacity)
- Border radius up to 16px for featured content cards

---

## Color System

### Backgrounds

- App Background: `#0B0F14`
- Surface / Card: `#121826`
- Elevated Surface: `#161C2C`

### Borders & Dividers

- Default Border: `rgba(255,255,255,0.06)`
- Subtle Divider: `rgba(255,255,255,0.04)`

### Text Colors

- Primary Text: `#E5E7EB`
- Secondary Text: `#9CA3AF`
- Muted Text: `#6B7280`
- Disabled Text: `#4B5563`

### Accent Colors

- Primary Accent: `#4F46E5` (Indigo 600)
- Secondary Accent: `#9333EA` (Purple 600)

Rules:

- Primary accent for CTAs and focus states
- Secondary accent for gradients and hover effects
- Purple used sparingly to complement indigo in premium UI elements
- Gradients: `from-indigo-600 to-indigo-500` or `from-indigo-600 via-purple-600 to-indigo-600`

---

## Typography

Typography is the primary design tool.

### Font Family

- Primary: Inter
- Fallback: system-ui, sans-serif

### Base Settings

- Base font size: 15px
- Line height: 1.6
- No ALL CAPS
- No artificial letter spacing

### Headings

- H1: `text-2xl font-semibold`
- H2: `text-xl font-semibold`
- H3: `text-lg font-medium`
- H4: `text-base font-medium`

Rules:

- Do not use bold (700+)
- Use weight, not size, for hierarchy
- Headings should feel calm and confident

### Body Text

- Base: `text-sm text-gray-300`
- Secondary: `text-sm text-gray-400`
- Muted: `text-xs text-gray-500`

---

## Spacing System

Allowed spacing values only:

- 4
- 8
- 12
- 16
- 24
- 32
- 48

Rules:

- No arbitrary spacing values
- Increase whitespace before adding borders or dividers
- Reduce padding before adding visual elements

---

## Components

### Buttons

#### Primary Button

```jsx
<button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition">
	Action
</button>
```

Rules:

- Max border radius: 6px
- No shadows
- No gradients
- Compact padding

#### Secondary Button

```jsx
<button className="border border-white/10 text-gray-300 hover:text-white hover:border-white/20 text-sm px-4 py-2 rounded-md transition">
	Action
</button>
```

#### Destructive Button

```jsx
<button className="text-red-400 hover:text-red-300 text-sm px-4 py-2">Delete</button>
```

### Inputs & Forms

```jsx
<input
	className="w-full bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:border-indigo-500 transition"
	placeholder="Enter value"
/>
```

Rules:

- Transparent backgrounds
- No filled inputs
- Focus is indicated only via border color
- No focus rings

### Cards

#### Standard Card

```jsx
<div className="bg-[#121826] border border-white/10 rounded-lg p-4">
	<h3 className="text-sm font-medium text-gray-200 mb-1">Title</h3>
	<p className="text-sm text-gray-400">Content</p>
</div>
```

Rules:
- Flat surfaces
- Subtle borders
- Small radius (8px max)
- No shadows

#### Featured Card (UserCard, Premium Content)

```jsx
<div className="relative group">
	<div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500"></div>
	<div className="relative bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
		{/* Content */}
	</div>
</div>
```

Rules:
- Glow effect with gradient blur on outer wrapper
- Deeper shadows for elevation (shadow-2xl)
- Larger radius (16px max)
- Gradient overlays on images for legibility
- Hover states with subtle animations

---

## Layout

### App Layout

- Dark background always visible
- Content constrained (max-w-6xl)
- Generous vertical spacing
- No boxed layouts

```jsx
<div className="min-h-screen bg-[#0B0F14] text-gray-200">
	<main className="max-w-6xl mx-auto px-4 py-8">
		{/* content */}
	</main>
</div>
```

### Interaction & Motion

- Transition duration: 200–500ms for premium components, 150–200ms for standard
- Ease-in-out only
- No spring animations
- Hover states should feel responsive and premium
- Use group hover patterns for nested interactive elements
- Subtle glow/shadow transitions on featured content

---

## Accessibility

- Contrast must meet WCAG AA
- Keyboard navigation required
- Focus states must be visible (border-based)
- Semantic HTML only

---

## Design Checklist (Before Shipping)

- Gradients used purposefully (not decorative)
- Accent colors limited to indigo/purple spectrum
- Typography carries primary hierarchy
- Spacing feels intentional
- Premium components feel elevated, not loud
- Standard components remain minimal and functional
- Hover states provide clear feedback

---

## Summary

Merge UI should feel:

- Serious yet engaging
- Calm with moments of visual interest
- Modern and premium
- Developer-native with social polish

### Component Tiers

**Standard Components** (Auth, Forms, Settings):
- Minimal, flat, typography-led
- Subtle borders and spacing
- Functional over decorative

**Featured Components** (Feed, UserCard, Hero sections):
- Elevated with depth and glow
- Gradient accents for premium feel
- Engaging hover states and micro-interactions
- Cinematic presentation

If standard UI feels loud or featured UI feels generic — it is wrong.

---

**Last Updated**: February 2026
**Maintained by**: Claude Code
**Design Direction Set By**: Product Owner
