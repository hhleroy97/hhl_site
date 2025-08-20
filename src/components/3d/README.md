# 3D Background System

This directory contains optimized 3D background components for the portfolio website, featuring PCB trace-inspired designs with performance monitoring and adaptive quality settings.

## Components

### DataflowRibbons
The main PCB trace visualization component that creates circuit board-like traces with filleted paths.

**Features:**
- PCB trace-inspired design with realistic circuit board aesthetics
- Adaptive performance levels (low, medium, high)
- Interactive controls with auto-rotation
- Real-time performance monitoring
- Optimized geometry and material usage

**Props:**
```typescript
interface DataflowRibbonsProps {
  performance?: 'low' | 'medium' | 'high'  // Default: 'medium'
  interactive?: boolean                     // Default: true
  autoRotate?: boolean                      // Default: false
}
```

**Performance Levels:**
- **Low**: 8 lanes, 32 tube segments, 6 radial segments, no shadows
- **Medium**: 16 lanes, 64 tube segments, 8 radial segments, no shadows  
- **High**: 30 lanes, 128 tube segments, 16 radial segments, shadows enabled

### SimpleGrid
A lightweight grid-based 3D visualization for performance-critical scenarios.

### Other Components
- `NeuralNetworkViz`: Neural network visualization
- `DataTransferArt`: Data transfer visualization
- `StackedPrisms`: Prism-based visualization
- `DataFlowBackground`: Subtle particle-based background

## Performance Optimizations

### 1. Adaptive Quality Settings
The system automatically adjusts quality based on the selected performance level:
- **Geometry Complexity**: Reduces tube segments and radial segments for lower performance
- **Shadow Mapping**: Disabled for low/medium performance
- **Pixel Ratio**: Capped based on performance level
- **Anti-aliasing**: Disabled for low performance

### 2. Memory Management
- **Texture Caching**: Gradient textures are cached and reused
- **Geometry Disposal**: Proper cleanup of geometries and materials
- **Resource Monitoring**: Memory usage tracking and warnings

### 3. Rendering Optimizations
- **Visibility API**: Pauses rendering when tab is not visible
- **Debounced Resize**: Optimized window resize handling
- **FPS Monitoring**: Real-time performance tracking with adaptive suggestions

### 4. Interactive Controls
- **Orbit Controls**: Smooth camera movement with damping
- **Auto-rotation**: Optional automatic camera rotation
- **Performance Display**: Real-time FPS and frame time monitoring

## Usage

### Basic Usage
```tsx
import DataflowRibbons from '@components/3d/DataflowRibbons'

// Default settings
<DataflowRibbons />

// Custom performance settings
<DataflowRibbons 
  performance="high"
  interactive={true}
  autoRotate={true}
/>
```

### With Performance Controls
```tsx
import { useState } from 'react'
import DataflowRibbons from '@components/3d/DataflowRibbons'

function MyComponent() {
  const [performance, setPerformance] = useState<'low' | 'medium' | 'high'>('medium')
  const [autoRotate, setAutoRotate] = useState(false)

  return (
    <div>
      <select value={performance} onChange={(e) => setPerformance(e.target.value)}>
        <option value="low">Low Performance</option>
        <option value="medium">Medium Performance</option>
        <option value="high">High Performance</option>
      </select>
      
      <DataflowRibbons 
        performance={performance}
        autoRotate={autoRotate}
      />
    </div>
  )
}
```

### Performance Monitoring
```tsx
import PerformanceDisplay from '@components/ui/PerformanceDisplay'

// Show basic FPS
<PerformanceDisplay />

// Show detailed metrics
<PerformanceDisplay showDetails={true} />
```

## Performance Guidelines

### For Low-End Devices
- Use `performance="low"` setting
- Disable auto-rotation
- Monitor FPS and switch to SimpleGrid if needed

### For Mid-Range Devices
- Use `performance="medium"` setting
- Enable auto-rotation for enhanced visual appeal
- Monitor memory usage

### For High-End Devices
- Use `performance="high"` setting
- Enable all interactive features
- Shadows and high-quality rendering available

## Technical Details

### PCB Trace Generation
The traces are generated using:
1. **Base Pattern Creation**: First trace creates a complex pattern with sine waves, zigzags, or random walks
2. **Pattern Adaptation**: Subsequent traces copy and adapt the previous pattern to their lane
3. **Filleted Paths**: Curves are smoothed using quadratic Bézier curves for realistic PCB traces
4. **Tube Geometry**: Paths are extruded into 3D tubes with configurable segments

### Color System
- **Gradient Palettes**: Multiple color themes (neon, cyber, sunset, mono)
- **Dynamic Coloring**: Colors vary based on path complexity and position
- **Emissive Glow**: Complex paths get additional emissive lighting

### Performance Monitoring
- **FPS Tracking**: Real-time frame rate monitoring
- **Frame Time Analysis**: Per-frame timing analysis
- **Memory Usage**: JavaScript heap memory tracking
- **Adaptive Suggestions**: Automatic performance recommendations

## Development

### Adding New Visualizations
1. Create a new component in the `3d/` directory
2. Follow the performance optimization patterns
3. Add proper cleanup and disposal
4. Include performance monitoring hooks

### Performance Testing
```bash
# Development mode with performance monitoring
npm run dev

# Check browser console for performance metrics
# Use PerformanceDisplay component for real-time monitoring
```

### Optimization Checklist
- [ ] Use appropriate geometry complexity for performance level
- [ ] Implement proper material disposal
- [ ] Add visibility API support
- [ ] Include performance monitoring
- [ ] Test on various devices
- [ ] Document performance characteristics

## Browser Compatibility

- **Modern Browsers**: Full support with WebGL 2.0
- **Older Browsers**: Graceful degradation to SimpleGrid
- **Mobile Devices**: Automatic performance level adjustment recommended

## Troubleshooting

### Low FPS Issues
1. Switch to lower performance setting
2. Disable auto-rotation
3. Check for other heavy processes
4. Consider using SimpleGrid instead

### Memory Issues
1. Monitor memory usage in PerformanceDisplay
2. Check for memory leaks in browser dev tools
3. Ensure proper cleanup on component unmount

### Rendering Issues
1. Check WebGL support
2. Verify Three.js version compatibility
3. Test with different browsers
4. Check console for error messages
