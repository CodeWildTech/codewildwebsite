# Project Structure Documentation

This document explains the organization and structure of the CodeWild Tech Next.js project.

## Overview

This is a Next.js 16 application using the App Router architecture, styled with Tailwind CSS 4, and enhanced with Framer Motion animations.

## Directory Structure

```
codewildtech-next/
├── public/                 # Static assets served directly
├── src/                    # Source code
│   ├── app/               # Next.js App Router (pages & routing)
│   ├── components/        # React components
│   ├── data/              # Static data and content
│   └── assets/            # Additional assets
├── .next/                 # Next.js build output (gitignored)
├── node_modules/          # Dependencies (gitignored)
└── [config files]         # Various configuration files
```

## Detailed Structure

### `/public` - Static Assets

Contains static files that are served directly by Next.js:

- `founder.jpg` - Team/founder images
- `*.svg` - SVG icons and graphics
- Any other static assets (images, fonts, etc.)

**Usage**: Reference these files from the root, e.g., `/founder.jpg`

### `/src/app` - Next.js App Router

The App Router directory structure where each folder represents a route:

```
app/
├── layout.js              # Root layout (wraps all pages)
├── page.js                # Home page (/)
├── globals.css            # Global styles
├── favicon.ico            # Site favicon
├── about/
│   └── page.js           # About page (/about)
├── services/
│   └── page.js           # Services page (/services)
├── products/
│   ├── page.js           # Products listing (/products)
│   └── [id]/
│       └── page.js       # Individual product (/products/[id])
├── careers/
│   └── page.js           # Careers page (/careers)
├── contact/
│   └── page.js           # Contact page (/contact)
└── api/
    └── [routes]/         # API endpoints (/api/*)
```

**Key Concepts**:

- `page.js` - Defines a route's UI
- `layout.js` - Shared UI for a segment and its children
- `[folder]` - Dynamic route segment
- `api/` - API routes (serverless functions)

### `/src/components` - React Components

Reusable React components organized by type:

```
components/
├── sections/              # Page section components
│   ├── AboutSection.jsx   # About section (reusable)
│   ├── ContactSection.jsx # Contact section
│   ├── ProductsSection.jsx # Products showcase
│   └── ServicesSection.jsx # Services overview
├── forms/                 # Form components
│   └── JobApplicationForm.jsx
├── CustomCursor.jsx       # Custom cursor component
├── Footer.jsx             # Site footer
└── Navbar.jsx             # Navigation bar
```

**Organization Strategy**:

- `sections/` - Large, reusable page sections
- `forms/` - Form-related components
- Root level - Global components (Navbar, Footer, etc.)

**Naming Convention**: PascalCase with `.jsx` extension

### `/src/data` - Static Data

Contains static data and content:

```
data/
└── products.js            # Product catalog data
```

**Purpose**: Centralize static content for easy management and updates

### `/src/assets` - Additional Assets

For assets that need to be imported in components (optional):

- Images that need optimization
- Custom fonts
- Other importable resources

## Component Architecture

### Section Components

Section components are designed to be:

- **Reusable**: Can be used on multiple pages
- **Self-contained**: Include their own styling and logic
- **Responsive**: Work on all screen sizes
- **Animated**: Use Framer Motion for smooth transitions

**Example Usage**:

```jsx
import AboutSection from '@/components/sections/AboutSection';

export default function Page() {
  return <AboutSection />;
}
```

### Layout Components

Global components like Navbar and Footer:

- Appear on multiple pages
- Defined once, used everywhere via `layout.js`
- Handle navigation and site-wide functionality

## Styling Strategy

### Tailwind CSS

- **Utility-first**: Use Tailwind utility classes
- **Custom styles**: Defined in `globals.css`
- **Responsive**: Mobile-first approach
- **Dark mode**: Configured via Tailwind

### CSS Variables

Global CSS variables in `globals.css`:

```css
:root {
  --foreground-rgb: ...;
  --background-start-rgb: ...;
}
```

## Data Flow

1. **Static Data**: Imported from `/src/data`
2. **API Data**: Fetched via `/app/api` routes
3. **Props**: Passed down from pages to components
4. **State**: Managed with React hooks

## Adding New Features

### Adding a New Page

1. Create folder in `/src/app/[page-name]`
2. Add `page.js` file
3. Export default component
4. Update navigation in `Navbar.jsx`

### Adding a New Component

1. Create file in appropriate `/src/components` subfolder
2. Use PascalCase naming: `ComponentName.jsx`
3. Export as default or named export
4. Import where needed

### Adding New Data

1. Create/update file in `/src/data`
2. Export data as object/array
3. Import in components that need it

## Best Practices

### File Organization

- Keep related files together
- Use descriptive folder names
- Separate concerns (components, data, assets)

### Component Design

- One component per file
- Keep components focused and small
- Use composition over inheritance
- Extract reusable logic into custom hooks

### Naming Conventions

- **Components**: PascalCase (`AboutSection.jsx`)
- **Files**: camelCase for utilities, PascalCase for components
- **Folders**: lowercase with hyphens (`job-application`)
- **CSS classes**: Tailwind utilities (no custom class names unless necessary)

### Import Paths

Use absolute imports with `@/` alias:

```jsx
// Good
import Navbar from '@/components/Navbar';

// Avoid
import Navbar from '../../components/Navbar';
```

## Configuration Files

- `next.config.mjs` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration
- `eslint.config.mjs` - ESLint rules
- `jsconfig.json` - JavaScript/path configuration
- `.prettierrc` - Code formatting rules

## Build Output

- `.next/` - Next.js build artifacts (gitignored)
- `out/` - Static export output (if using `next export`)

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Make changes**: Edit files in `/src`
3. **Hot reload**: Changes appear automatically
4. **Test**: Check in browser at `localhost:3000`
5. **Build**: Run `npm run build` before deploying

## Deployment

The project is optimized for deployment on:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting platform

---

For more information, see the main [README.md](../README.md).
