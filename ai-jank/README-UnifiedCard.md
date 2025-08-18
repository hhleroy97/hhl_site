# Unified Trainer Card Component

## Overview

A single, cohesive React component that combines your avatar, basic info, and dynamic content panel into one unified cyberpunk-styled card.

## Key Features

### 🎯 **Unified Layout**

- **Avatar** positioned as visual anchor (top-left)
- **Name/tagline** to the right of avatar
- **Service/skill grid** in the middle
- **Dynamic info panel** at the bottom

### 🔄 **Interactive Info Panel**

- **Default state**: Shows "About Me" content
- **Hover behavior**: Updates with service/skill details
- **Smooth animations**: 300ms fade/slide transitions using Framer Motion

### 🎨 **Cyberpunk Styling**

- Neon borders and glow effects
- Animated scanlines overlay
- Pulsing status indicators
- Gradient backgrounds with transparency

## Component Structure

```tsx
<UnifiedTrainerCard>
  <!-- Header Section -->
  <Avatar + BasicInfo + SocialLinks />

  <!-- Interactive Grid -->
  <CoreServices Grid />
  <Skills Grid />

  <!-- Dynamic Info Panel -->
  <AnimatedContent />
</UnifiedTrainerCard>
```

## Usage

### Basic Implementation

```tsx
import UnifiedTrainerCard from './components/UnifiedTrainerCard'

function App() {
  return (
    <div className='min-h-screen bg-cyberpunk-dark'>
      <UnifiedTrainerCard onEnterPortfolio={() => setView('portfolio')} />
    </div>
  )
}
```

### Replace Your Current Two-Card Layout

```tsx
// BEFORE: Separate components
<CyberpunkTrainerWithInfoPanel />

// AFTER: Single unified component
<UnifiedTrainerCard />
```

## Content Structure

Each service/skill item follows this format:

```tsx
interface ContentItem {
  id: string
  title: string
  description: string
  details: string[] // Tech stack + highlights
}
```

## Animation Details

### Info Panel Transitions

- **Enter**: `opacity: 0 → 1`, `y: 20 → 0` (300ms)
- **Exit**: `opacity: 1 → 0`, `y: 0 → -20` (300ms)
- **Easing**: `easeInOut` for smooth feel

### Hover Effects

- **Cards**: `scale: 1 → 1.02` with border color changes
- **Social links**: `scale: 1 → 1.05` with background changes

## Responsive Design

### Mobile (<1024px)

- Single column layout for services/skills
- Smaller avatar (24x24 → 32x32)
- Adjusted padding and spacing

### Desktop (≥1024px)

- Two-column grid for services/skills
- Larger avatar and spacing
- Full hover animations

## Integration Guide

1. **Replace existing components**:

   ```tsx
   // Replace this
   <CyberpunkTrainerCardDemo />

   // With this
   <UnifiedTrainerCardDemo />
   ```

2. **Update your App.tsx**:

   ```tsx
   import UnifiedTrainerCardDemo from '@components/UnifiedTrainerCardDemo'

   // In your render
   ;<UnifiedTrainerCardDemo onEnterPortfolio={handleEnterPortfolio} />
   ```

3. **Maintain existing functionality**:
   - Portfolio navigation still works
   - Social links preserved
   - Cyberpunk aesthetic maintained

## Benefits

✅ **Single cohesive card** instead of two competing elements
✅ **Smooth hover interactions** with 300ms transitions  
✅ **Better information hierarchy** with clear content structure
✅ **Responsive design** that works on all devices
✅ **Preserved cyberpunk aesthetic** with enhanced animations
✅ **Simplified codebase** - one component instead of multiple

The unified approach creates a much more cohesive user experience while maintaining all the visual appeal and functionality of your cyberpunk theme.
