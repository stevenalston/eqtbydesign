# Equity by Design - Frontend Setup Guide

## Quick Start

### 1. Prerequisites

Ensure you have the following installed:
- **Node.js**: Version 20.9.0 or higher
- **npm**: Version 10.0.0 or higher (comes with Node.js)

Check your versions:
```bash
node --version
npm --version
```

If you need to update Node.js, visit [nodejs.org](https://nodejs.org/) or use [nvm](https://github.com/nvm-sh/nvm).

### 2. Installation

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

### 3. Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

### 4. Production Build

Build the application for production:

```bash
npm run build
npm start
```

## Project Overview

### Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Google Fonts** - Inter & Fraunces fonts

### Key Features

1. **Stunning Animations**
   - Gradient animations on hero section
   - Scroll-triggered reveals
   - Micro-interactions on all buttons and cards
   - Smooth page transitions

2. **Warm Color Palette**
   - Terracotta, Teal, Sage, Cream
   - Accessible contrast ratios
   - Custom gradients

3. **Accessibility First**
   - WCAG 2.2 AA compliant
   - Keyboard navigation
   - Screen reader optimized
   - Reduced motion support

4. **Performance Optimized**
   - Image optimization
   - Font optimization
   - Code splitting
   - Lazy loading

## File Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with fonts
│   └── page.tsx                 # Home page
│
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx           # Animated button component
│   │   ├── Card.tsx             # Card with lift effect
│   │   └── Navigation.tsx       # Sticky navigation
│   │
│   └── sections/                # Landing page sections
│       ├── Hero.tsx             # Hero with gradient animation
│       ├── EquityChallenge.tsx  # Stats and problem statement
│       ├── OurApproach.tsx      # Methodology cards
│       ├── FeaturedImpact.tsx   # Case studies
│       ├── ServicesOverview.tsx # Services grid
│       └── Footer.tsx           # Multi-CTA footer
│
├── styles/
│   └── globals.css              # Global styles, Tailwind config
│
├── lib/
│   └── utils.ts                 # Utility functions
│
├── public/                      # Static assets
│
├── tailwind.config.js           # Tailwind configuration
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## Customization Guide

### Updating Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  terracotta: {
    DEFAULT: '#E07A5F',
    // Add more shades as needed
  },
  // ... other colors
}
```

### Changing Fonts

Update `app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google'

const yourFont = YourFont({
  subsets: ['latin'],
  variable: '--font-your-font',
})
```

### Adding New Sections

1. Create a new component in `components/sections/`
2. Import and add to `app/page.tsx`
3. Use Framer Motion for animations

Example:

```typescript
'use client'

import { motion } from 'framer-motion'

export default function NewSection() {
  return (
    <section className="py-24 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Your content */}
      </motion.div>
    </section>
  )
}
```

### Modifying Animations

All animations use Framer Motion. Common patterns:

**Fade in on scroll:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
```

**Hover effect:**
```typescript
<motion.div
  whileHover={{ scale: 1.05, y: -8 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
```

**Stagger children:**
```typescript
<motion.div
  initial="hidden"
  whileInView="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Other Platforms

The site can be deployed to:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Any Node.js hosting

Build command: `npm run build`
Output directory: `.next`

## Performance Tips

1. **Images**: Always use Next.js `<Image>` component
2. **Fonts**: Use `next/font` for optimization
3. **Code Splitting**: Use dynamic imports for heavy components
4. **Analytics**: Add analytics after initial load

## Accessibility Checklist

- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels on interactive elements
- [ ] Reduced motion respects user preferences
- [ ] Semantic HTML structure

## Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Troubleshooting

### Build Errors

**Node version too old:**
```bash
# Update Node.js to 20.9.0+
# Using nvm:
nvm install 20.9.0
nvm use 20.9.0
```

**Module not found:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Development Issues

**Port already in use:**
```bash
# Use a different port
npm run dev -- -p 3001
```

**Hot reload not working:**
```bash
# Restart the dev server
# Press Ctrl+C, then npm run dev
```

## Next Steps

1. Add real images to `/public/images/`
2. Connect to a CMS (Sanity, Contentful)
3. Add analytics (Plausible, Google Analytics)
4. Set up contact form backend
5. Create additional pages (About, Portfolio, Services)
6. Add blog/insights section
7. Implement newsletter signup
8. Add social sharing

## Support

For questions or issues:
- Check the Next.js documentation: https://nextjs.org/docs
- Framer Motion docs: https://www.framer.com/motion/
- Tailwind CSS docs: https://tailwindcss.com/docs

## License

Copyright © 2025 Equity by Design. All rights reserved.
