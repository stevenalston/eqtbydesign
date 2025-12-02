# Equity by Design - Frontend

A stunning, modern Next.js 15 website showcasing social impact design with warm, accessible aesthetics.

## Features

### Design & Animations
- Gradient animations and floating shapes
- Scroll-triggered animations using Framer Motion
- Micro-interactions on all interactive elements
- Parallax effects and smooth transitions
- Lift effects on cards
- Custom cursor interactions

### Color Palette
- **Terracotta** (#E07A5F) - Primary brand color
- **Teal** (#3D5A80) - Trust and professionalism
- **Sage** (#81B29A) - Growth and sustainability
- **Cream** (#F4F1DE) - Soft background
- **Coral** (#F2CC8F) - CTAs and highlights
- **Plum** (#554971) - Depth and sophistication
- **Gold** (#E6AF2E) - Success states

### Typography
- **Inter** - Body text (humanist sans-serif)
- **Fraunces** - Headlines (modern serif with warmth)

### Components
- Button with hover/active micro-animations
- Card with lift effect on hover
- Sticky Navigation with scroll detection
- Animated statistics counters
- Interactive service cards
- Testimonial sections
- Multi-CTA footer

### Accessibility
- WCAG 2.2 AA compliant
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible indicators
- Respects prefers-reduced-motion
- High contrast color combinations

### Performance
- Next.js 15 App Router
- Optimized font loading
- Image optimization with next/image
- Code splitting
- Framer Motion optimizations

## Getting Started

### Prerequisites
- Node.js 20.9.0 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Navigation.tsx
│   └── sections/          # Page sections
│       ├── Hero.tsx
│       ├── EquityChallenge.tsx
│       ├── OurApproach.tsx
│       ├── FeaturedImpact.tsx
│       ├── ServicesOverview.tsx
│       └── Footer.tsx
├── styles/
│   └── globals.css        # Global styles and Tailwind
├── public/                # Static assets
└── lib/                   # Utility functions
```

## Key Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Google Fonts** - Inter & Fraunces

## Design Highlights

### Hero Section
- Animated gradient background
- Floating organic shapes
- Noise texture overlay
- Dual CTAs with micro-animations
- Scroll indicator

### Equity Challenge
- Animated statistics that count up on scroll
- Human-centered storytelling
- Data visualization
- Emotional connection

### Our Approach
- Four interactive principle cards
- Hover effects with icon rotation
- Connecting lines showing integration
- Warm color accents

### Featured Impact
- Three case study cards
- Gradient headers with stats
- Client testimonials
- Before/after comparisons

### Services Overview
- Six service offerings
- Hover lift effects
- Feature lists with checkmarks
- Learn more interactions

### Footer
- Three distinct CTAs
- Social links
- Newsletter signup
- Quick navigation

## Customization

### Colors
Edit `tailwind.config.js` to modify the color palette.

### Fonts
Update font imports in `app/layout.tsx`.

### Content
Modify section components in `components/sections/`.

## Accessibility Notes

This site follows WCAG 2.2 guidelines:
- Minimum 4.5:1 color contrast
- All interactive elements keyboard accessible
- Screen reader friendly
- Reduced motion support
- Semantic HTML structure

## Performance Targets

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- Lighthouse Score: 95+

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2025 Equity by Design. All rights reserved.
