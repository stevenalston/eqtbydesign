# Equity by Design - Feature Documentation

## Landing Page Components

### 1. Navigation
**Location**: `components/ui/Navigation.tsx`

**Features**:
- Sticky header that appears on scroll
- Transparent on hero, solid background after scroll
- Smooth color transitions
- Mobile-responsive hamburger menu
- Animated menu items
- Logo with gradient background

**Interactions**:
- Changes background on scroll (50px threshold)
- Mobile menu slides in/out
- Hover effects on all links
- CTA button with micro-animation

---

### 2. Hero Section
**Location**: `components/sections/Hero.tsx`

**Features**:
- Animated gradient background
- Floating organic shapes
- Noise texture overlay
- Large display typography
- Dual CTAs (Start a Project, See Our Impact)
- Scroll indicator

**Animations**:
- Gradient shifts between colors
- Floating shapes move in infinity loop
- Text fades in on load
- Scroll indicator bounces
- Button hover effects with icon movement

**Colors**:
- Background: Teal to Sage gradient
- Overlay: Warm gradient at 30% opacity
- Text: White with cream accents

---

### 3. Equity Challenge Section
**Location**: `components/sections/EquityChallenge.tsx`

**Features**:
- Animated statistics that count up
- Problem statement
- Human-centered story
- Placeholder for image/illustration
- Decorative background elements

**Animations**:
- Stats count from 0 to target number on scroll into view
- Fade-in effects for all content
- Floating accent circles

**Stats Displayed**:
- 78% - Nonprofits need better digital tools
- 92% - Users value accessible design
- 3x - Design can multiply impact

---

### 4. Our Approach Section
**Location**: `components/sections/OurApproach.tsx`

**Features**:
- Four principle cards
- Icon animations on hover
- Connecting line visualization
- Integrated thinking message

**Principles**:
1. **Human-Centered** - People-first design
2. **Accessibility First** - WCAG standards
3. **Impact Driven** - Measurable outcomes
4. **Collaborative** - Co-creation approach

**Interactions**:
- Icons rotate 360° on hover
- Cards lift on hover
- "Learn more" link appears on hover
- Text color changes

---

### 5. Featured Impact Section
**Location**: `components/sections/FeaturedImpact.tsx`

**Features**:
- Three case study cards
- Gradient headers with impact stats
- Tags for project types
- Client testimonial
- CTA to view all case studies

**Case Studies**:
1. **Community Health Initiative**
   - 250% increase in engagement
   - Tags: Web Design, Accessibility, Community Outreach

2. **Youth Education Platform**
   - 15K+ students reached
   - Tags: UX Design, Platform Development, Inclusive Design

3. **Justice & Advocacy Hub**
   - 3x growth in supporters
   - Tags: Branding, Digital Strategy, Social Impact

**Interactions**:
- Gradient shimmer on hover
- Card lift effect
- Smooth arrow movement
- Testimonial quote styling

---

### 6. Services Overview Section
**Location**: `components/sections/ServicesOverview.tsx`

**Features**:
- Six service offerings in grid
- Icon for each service
- Feature lists with checkmarks
- Hover interactions

**Services**:
1. Web Design & Development
2. Brand & Identity
3. Digital Strategy
4. Product Design
5. Content & Storytelling
6. Accessibility Audits

**Interactions**:
- Icons scale and rotate on hover
- Cards lift on hover
- "Learn more" appears on hover

---

### 7. Footer
**Location**: `components/sections/Footer.tsx`

**Features**:
- Three CTA cards
- Company information
- Quick links
- Social media icons
- Newsletter signup
- Copyright and legal links

**CTA Cards**:
1. **Start a Project** - Primary CTA
2. **Explore Our Work** - Portfolio link
3. **Join the Movement** - Newsletter signup

**Sections**:
- Services links
- Company links
- Social connections (LinkedIn, Twitter, Instagram)
- Legal (Privacy, Terms, Accessibility)

---

## UI Components

### Button
**Location**: `components/ui/Button.tsx`

**Variants**:
- `primary` - Terracotta background
- `secondary` - Sage background
- `outline` - Border only

**Sizes**:
- `sm` - Small (px-4 py-2)
- `md` - Medium (px-6 py-3)
- `lg` - Large (px-8 py-4)

**Features**:
- Icon support (left or right)
- Icon moves on hover
- Scale animation on hover (1.05x)
- Press animation (0.98x)
- Focus visible for accessibility

---

### Card
**Location**: `components/ui/Card.tsx`

**Features**:
- White background with rounded corners
- Soft shadow by default
- Lift effect on hover (optional)
- Fade in on scroll into view
- Customizable padding

**Animations**:
- Fades in from bottom (20px)
- Lifts up 8px on hover
- Shadow increases on hover

---

## Animations & Effects

### Gradient Animation
```css
@keyframes gradient {
  0%, 100%: background-position: left
  50%: background-position: right
}
```
Duration: 8 seconds

### Float Animation
```css
@keyframes float {
  0%, 100%: translateY(0)
  50%: translateY(-20px)
}
```
Duration: 6 seconds

### Scroll-Triggered Animations
- Elements start 30px below final position
- Fade from 0 to 1 opacity
- Trigger when 100px from viewport
- Only animate once (not on scroll back)

### Hover Micro-Animations
- Buttons: Scale 1.05x, icons move 3px
- Cards: Lift 8px, shadow increases
- Links: Color shift to terracotta
- Icons: Rotate or scale on hover

---

## Accessibility Features

### Keyboard Navigation
- All interactive elements focusable
- Focus indicators visible (2px terracotta outline)
- Skip navigation links available
- Logical tab order

### Screen Reader Support
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels on icon buttons
- Alt text on all images
- Descriptive link text

### Color Contrast
- All text meets WCAG AA (4.5:1 minimum)
- Interactive elements have sufficient contrast
- Focus indicators clearly visible

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Font Scaling
- Responsive typography using clamp()
- Supports browser zoom up to 200%
- Line height 1.6-1.8 for readability

---

## Performance Optimizations

### Image Optimization
- Next.js Image component
- Automatic WebP/AVIF conversion
- Responsive srcsets
- Lazy loading below fold
- Blur placeholder while loading

### Font Optimization
- Self-hosted with next/font
- Variable fonts for performance
- Subset to Latin characters only
- Font display: swap
- Zero layout shift

### Code Splitting
- Automatic route-based splitting
- Dynamic imports for heavy components
- Framer Motion optimization enabled

### Bundle Size
- Tailwind purges unused styles
- Tree-shaking enabled
- No large dependencies

---

## Color Palette Reference

### Primary Colors
```
Terracotta: #E07A5F (primary brand)
Teal: #3D5A80 (trust)
Sage: #81B29A (growth)
Cream: #F4F1DE (background)
```

### Accent Colors
```
Coral: #F2CC8F (CTAs)
Plum: #554971 (depth)
Gold: #E6AF2E (success)
```

### Usage Guidelines
- Terracotta: Primary CTAs, highlights
- Teal: Text, headings, trust elements
- Sage: Secondary CTAs, nature/growth
- Cream: Backgrounds, soft sections
- Coral: Accent CTAs, highlights
- Plum: Depth, sophistication
- Gold: Success states, achievements

---

## Typography Scale

### Display Sizes
```
display-xl: clamp(3rem, 8vw, 6rem) - Hero headlines
display-lg: clamp(2.5rem, 6vw, 4.5rem) - Section headers
display-md: clamp(2rem, 5vw, 3.5rem) - Subsections
```

### Body Sizes
```
text-xl: 1.25rem / 20px - Lead paragraphs
text-lg: 1.125rem / 18px - Body emphasis
text-base: 1rem / 16px - Default body
text-sm: 0.875rem / 14px - Small text
```

### Font Families
```
font-sans: Inter (body text)
font-serif: Fraunces (headlines)
```

---

## Browser Support

### Fully Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Graceful Degradation
- Older browsers get simpler animations
- CSS Grid fallbacks to Flexbox
- Modern CSS features use @supports

---

## Future Enhancements

### Recommended Next Steps
1. Add CMS integration (Sanity/Contentful)
2. Create blog/insights section
3. Build portfolio detail pages
4. Add contact form with validation
5. Implement newsletter signup
6. Add dark mode toggle
7. Create service detail pages
8. Add team member profiles
9. Implement case study filter
10. Add search functionality

### Advanced Features
- 3D elements with React Three Fiber
- Video backgrounds
- Interactive data visualizations
- Lottie animations
- Custom cursor effects
- Page transitions
- Loading states/skeleton screens
- Progressive Web App (PWA)

---

## Maintenance

### Regular Updates
- Update dependencies monthly
- Test on latest browsers
- Monitor Core Web Vitals
- Review accessibility compliance
- Optimize images regularly

### Performance Monitoring
- Lighthouse CI in deployment
- Real User Monitoring (RUM)
- Error tracking (Sentry)
- Analytics (Plausible/GA)

---

This documentation covers all major features implemented in the Equity by Design frontend. For technical implementation details, see individual component files.
