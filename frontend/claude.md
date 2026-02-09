# Merge Frontend Design System

## Overview

This document defines the UI/UX standards for the Merge application. All components must follow these guidelines to ensure consistency and maintainability.

**Design Philosophy**: Modern, sleek, blue-themed interface with clean lines, subtle gradients, and smooth interactions.

---

## Color Palette

### Primary Blue Theme

- **Primary Blue**: `bg-blue-600` (#3b82f6) - Main brand color, buttons, links
- **Primary Hover**: `bg-blue-700` (#2563eb) - Hover states for buttons
- **Primary Light**: `bg-blue-50` (#eff6ff) - Backgrounds, subtle highlights
- **Primary Text**: `text-blue-600` - Links and emphasized text

### Background Colors

- **White**: `bg-white` (#ffffff) - Cards, navbar, footer
- **Light Gray**: `bg-gray-50` - Page backgrounds
- **Gradient**: `bg-gradient-to-br from-blue-50 via-white to-indigo-50` - Auth pages

### Text Colors

- **Primary Text**: `text-gray-900` (#111827) - Headings
- **Secondary Text**: `text-gray-600` (#4b5563) - Body text
- **Muted Text**: `text-gray-500` (#6b7280) - Helper text

### Border Colors

- **Default Border**: `border-gray-300` - Input fields, cards
- **Light Border**: `border-gray-200` - Dividers, separators
- **Focus Border**: `border-blue-500` - Focused inputs

### Semantic Colors

- **Success**: `bg-green-500` (#10b981)
- **Warning**: `bg-yellow-500` (#f59e0b)
- **Error**: `bg-red-500` (#ef4444)
- **Info**: `bg-blue-500` (#3b82f6)

---

## Typography

### Font Family

- **Primary**: System font stack (Tailwind default)
- **Fallback**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### Font Sizes

- **Headings**:
  - H1: `text-4xl` (36px) - Page titles
  - H2: `text-3xl` (30px) - Section titles
  - H3: `text-2xl` (24px) - Subsection titles
  - H4: `text-xl` (20px) - Card titles

- **Body**:
  - Large: `text-lg` (18px) - Important text
  - Base: `text-base` (16px) - Default text
  - Small: `text-sm` (14px) - Helper text, captions
  - Extra Small: `text-xs` (12px) - Labels, metadata

### Font Weights

- **Bold**: `font-bold` (700) - Headings, emphasis
- **Semibold**: `font-semibold` (600) - Subheadings
- **Medium**: `font-medium` (500) - Button text
- **Normal**: `font-normal` (400) - Body text

---

## Spacing System

### Padding/Margin Scale (Tailwind scale)

- **xs**: `2` (8px)
- **sm**: `4` (16px)
- **md**: `6` (24px)
- **lg**: `8` (32px)
- **xl**: `12` (48px)
- **2xl**: `16` (64px)

### Common Patterns

- **Page padding**: `px-4 md:px-8 lg:px-16`
- **Section spacing**: `py-12 md:py-16`
- **Card padding**: `p-6 md:p-8`
- **Component gaps**: `gap-4` or `gap-6`

---

## Components

### Buttons

**Primary Button (Blue)**

```jsx
<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
	Click Me
</button>
```

**Primary Button with Loading**

```jsx
<button
	disabled={isLoading}
	className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
	{isLoading ? (
		<>
			<span className="loading loading-spinner loading-sm"></span>
			Loading...
		</>
	) : (
		"Click Me"
	)}
</button>
```

**Secondary Button (Outline)**

```jsx
<button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition duration-200">
	Click Me
</button>
```

**Danger Button**

```jsx
<button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
	Delete
</button>
```

**Button Sizes**

- Small: `py-2 px-4 text-sm`
- Medium: `py-3 px-6` (default)
- Large: `py-4 px-8 text-lg`

**Button States**

- Disabled: `disabled:opacity-50 disabled:cursor-not-allowed`
- Loading: Use DaisyUI spinner `<span className="loading loading-spinner loading-sm"></span>`

---

### Form Elements

**Input Fields**

```jsx
<div className="w-full">
	<label
		className="block text-sm font-medium text-gray-700 mb-2"
		htmlFor="email">
		Email
	</label>
	<input
		type="email"
		id="email"
		placeholder="Enter your email"
		className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
	/>
</div>
```

**Input with Error**

```jsx
<div className="w-full">
	<label
		className="block text-sm font-medium text-gray-700 mb-2"
		htmlFor="email">
		Email
	</label>
	<input
		type="email"
		className="w-full px-4 py-3 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
	/>
	<p className="mt-1 text-sm text-red-600">Please enter a valid email</p>
</div>
```

**Textarea**

```jsx
<textarea
	className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
	rows="4"
	placeholder="Enter your bio..."></textarea>
```

**Select/Dropdown**

```jsx
<select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
	<option value="">Select an option</option>
	<option value="1">Option 1</option>
	<option value="2">Option 2</option>
</select>
```

---

### Cards

**Basic Card**

```jsx
<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
	<h2 className="text-xl font-bold text-gray-900 mb-2">Card Title</h2>
	<p className="text-gray-600 mb-4">Card content goes here</p>
	<div className="flex justify-end">
		<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
			Action
		</button>
	</div>
</div>
```

**Card with Image**

```jsx
<div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
	<img
		src="/image.jpg"
		alt="Description"
		className="w-full h-48 object-cover"
	/>
	<div className="p-6">
		<h2 className="text-xl font-bold text-gray-900 mb-2">Card Title</h2>
		<p className="text-gray-600">Card content</p>
	</div>
</div>
```

---

### Layout Containers

**Full Page with Gradient Background (Auth Pages)**

```jsx
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
	{/* Page content */}
</div>
```

**Main Content Container**

```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	{/* Content */}
</div>
```

**Centered Auth Card**

```jsx
<div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
	{/* Form content */}
</div>
```

**Grid Layouts**

```jsx
{
	/* 2 columns */
}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">{/* Items */}</div>;

{
	/* 3 columns */
}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
	{/* Items */}
</div>;

{
	/* 4 columns */
}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
	{/* Items */}
</div>;
```

---

### Modals

```jsx
{
	/* Modal trigger */
}
<button
	className="btn"
	onClick={() => document.getElementById("my_modal").showModal()}>
	Open Modal
</button>;

{
	/* Modal */
}
<dialog id="my_modal" className="modal">
	<div className="modal-box">
		<h3 className="font-bold text-lg">Modal Title</h3>
		<p className="py-4">Modal content</p>
		<div className="modal-action">
			<form method="dialog">
				<button className="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>;
```

---

### Alerts/Notifications

```jsx
{
	/* Info Alert */
}
<div className="alert alert-info">
	<span>Info message</span>
</div>;

{
	/* Success Alert */
}
<div className="alert alert-success">
	<span>Success message</span>
</div>;

{
	/* Warning Alert */
}
<div className="alert alert-warning">
	<span>Warning message</span>
</div>;

{
	/* Error Alert */
}
<div className="alert alert-error">
	<span>Error message</span>
</div>;
```

---

### Loading States

**Spinner**

```jsx
<span className="loading loading-spinner loading-lg"></span>
```

**Skeleton**

```jsx
<div className="skeleton h-32 w-full"></div>
```

---

## Design Principles

### 1. Consistency

- Use DaisyUI components consistently across all pages
- Follow the established color palette
- Maintain consistent spacing and sizing

### 2. Responsiveness

- Mobile-first approach
- Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Test on multiple screen sizes

### 3. Accessibility

- Use semantic HTML elements
- Include proper ARIA labels
- Ensure sufficient color contrast
- Keyboard navigation support

### 4. Visual Hierarchy

- Clear heading structure (H1 → H2 → H3)
- Use whitespace effectively
- Emphasize primary actions with primary button color

### 5. User Feedback

- Show loading states during async operations
- Display success/error messages
- Use hover states on interactive elements
- Provide clear validation messages

---

## Common Patterns

### Authentication Pages (Login/Signup)

```jsx
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
	<div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
		<div className="text-center mb-8">
			<h1 className="text-4xl font-bold text-blue-600 mb-2">Merge</h1>
			<p className="text-gray-600">Tagline here</p>
		</div>
		{/* Form here */}
	</div>
</div>
```

### Navbar

```jsx
<nav className="bg-white border-b border-gray-200 shadow-sm">
	<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div className="flex justify-between items-center h-16">
			<a href="/" className="text-2xl font-bold text-blue-600">
				Merge
			</a>
			{/* Nav items */}
		</div>
	</div>
</nav>
```

### Footer

```jsx
<footer className="bg-white border-t border-gray-200 mt-auto">
	<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
		{/* Footer content */}
	</div>
</footer>
```

### Dashboard/Feed Pages

- White background with subtle shadows
- Grid layout with responsive columns
- Card-based content with rounded corners
- Blue accent colors for CTAs

### Forms

- Label above input: `text-sm font-medium text-gray-700 mb-2`
- Input styles: `px-4 py-3 border border-gray-300 rounded-lg`
- Focus ring: `focus:ring-2 focus:ring-blue-500`
- Show validation inline with red text
- Disable submit button during loading
- Use loading spinner from DaisyUI

---

## CSS Framework Usage

**Primary: Tailwind CSS Utility Classes**

- Use Tailwind utility classes for all styling
- Blue theme: `bg-blue-600`, `text-blue-600`, `hover:bg-blue-700`
- Spacing: Tailwind scale (`px-4`, `py-3`, `gap-6`, etc.)
- Responsive: Mobile-first with `sm:`, `md:`, `lg:`, `xl:` prefixes

**DaisyUI Components (Limited Use)**

- Only use for: dropdown menus, loading spinner
- Dropdown: `dropdown dropdown-end` with `menu dropdown-content`
- Loading: `<span className="loading loading-spinner loading-sm"></span>`
- Badge: `badge badge-sm` with custom colors

**Avoid**

- Don't use `btn`, `input`, `card`, `form-control` classes from DaisyUI
- Use Tailwind utilities instead for consistency

---

## File Organization

```
src/
├── components/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ...
├── styles/
│   └── index.css      # Tailwind imports only
└── assets/            # Images, icons, fonts
```

---

## Best Practices

1. **Component Structure**
   - Keep components small and focused
   - Use props for customization
   - Extract repeated patterns into reusable components

2. **CSS Classes**
   - Use DaisyUI classes first
   - Add Tailwind utilities for custom styling
   - Avoid inline styles unless absolutely necessary

3. **State Management**
   - Use React hooks (useState, useEffect)
   - Keep state as local as possible
   - Consider Context API for global state

4. **Performance**
   - Lazy load images
   - Code split large components
   - Memoize expensive computations

5. **Testing**
   - Test component rendering
   - Test user interactions
   - Test responsive behavior

---

## Quick Reference

### Most Used Classes

**Colors**

- Blue button: `bg-blue-600 hover:bg-blue-700 text-white`
- Blue text: `text-blue-600`
- Gray text: `text-gray-600`, `text-gray-700`, `text-gray-900`
- Borders: `border-gray-300`, `border-gray-200`

**Layout**

- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Flexbox: `flex justify-between items-center gap-4`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

**Spacing**

- Padding: `p-4`, `p-6`, `p-8`, `px-4 py-3`
- Margin: `mb-2`, `mb-4`, `mb-8`, `mt-6`
- Gap: `gap-4`, `gap-6`, `space-y-4`, `space-y-5`

**Typography**

- Heading: `text-4xl font-bold text-blue-600`
- Body: `text-gray-600`, `text-sm`, `text-base`
- Label: `text-sm font-medium text-gray-700`

**Components**

- Button: `bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200`
- Input: `w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`
- Card: `bg-white rounded-2xl shadow-xl border border-gray-100 p-6`

**Backgrounds**

- White: `bg-white`
- Gradient: `bg-gradient-to-br from-blue-50 via-white to-indigo-50`
- Light: `bg-gray-50`

**Borders & Shadows**

- Border: `border border-gray-100`, `border-t border-gray-200`
- Shadow: `shadow-sm`, `shadow-xl`
- Rounded: `rounded-lg`, `rounded-2xl`, `rounded-full`

**Interactive States**

- Hover: `hover:bg-blue-700`, `hover:text-blue-700`
- Focus: `focus:outline-none focus:ring-2 focus:ring-blue-500`
- Disabled: `disabled:opacity-50 disabled:cursor-not-allowed`
- Transition: `transition duration-200`

---

**Last Updated**: February 2026
**Maintained by**: Claude Code

## Design Summary

**Color Scheme**: Modern blue theme with clean gradients
**Primary Color**: Blue 600 (#3b82f6)
**Framework**: Tailwind CSS with minimal DaisyUI
**Style**: Clean, sleek, modern with smooth transitions
**Buttons**: Always blue (`bg-blue-600 hover:bg-blue-700`)
**Forms**: Consistent input styling with blue focus rings
**Layout**: White cards on gradient backgrounds for auth, white backgrounds for main app
