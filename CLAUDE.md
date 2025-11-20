# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Three.js WebGL-based interactive landing page for an izakaya (Japanese pub). Users control a sheep character in a 3D environment to explore different informational zones.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (compiles TypeScript first, then builds)
npm run build

# Lint TypeScript/TSX files
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Tech Stack
- **React 18** with TypeScript
- **Vite** for build tooling
- **Three.js** via React Three Fiber (@react-three/fiber)
- **@react-three/rapier** for physics simulation
- **@react-three/drei** for Three.js helpers
- **Zustand** for global state management
- **Tailwind CSS** for styling
- **Framer Motion** for UI animations

### Core Structure

**App.tsx**: Root component that renders the Canvas and UI overlay

**Scene.tsx** (`src/components/Scene.tsx`): Main 3D scene setup
- Configures keyboard controls (WASD/arrows for movement, QE for rotation, Space for jump)
- Sets up lighting (ambient + spotlight)
- Contains Physics and KeyboardControls providers

**Player.tsx** (`src/components/Player.tsx`): Player character controller
- Controls a sheep model with physics-based movement
- Supports keyboard and joystick input
- Third-person camera that follows the player
- Camera rotation via pointer drag and QE keys
- Uses RigidBody with CapsuleCollider for physics

**World.tsx** (`src/components/World.tsx`): Game world environment
- Floor, walls, and collision boundaries
- Interactive zones that trigger UI content when player enters
- Decorative 3D models (lanterns, tables, noren, sake bottles, okami character)
- Zones use sensor RigidBodies to detect player intersection

**store.ts**: Zustand store for global state
- `activeZone`: Currently active section ID when player enters a zone
- `joystickInput`: Mobile joystick input values
- `isJumping`: Jump state for mobile controls

**constants.ts**: Section content definitions
- SECTIONS array contains all izakaya information (menu, philosophy, location, etc.)
- Each section has id, title, subtitle, and description

### 3D Models

Models are in `src/components/models/`:
- `Sheep.tsx`: Player character
- `Lantern.tsx`, `Noren.tsx`, `SakeBottle.tsx`, `TableSet.tsx`: Environmental decorations
- `Okami.tsx`: Proprietress character

### Physics System

The project uses @react-three/rapier for physics:
- Player uses a CapsuleCollider for smooth movement
- World objects use fixed RigidBodies
- Zones use sensor RigidBodies (no collision, only detection)
- Gravity is set to [0, -9.8, 0]

### Input Handling

Two control schemes:
1. **Keyboard**: WASD/arrows for movement, Space for jump, QE for camera rotation
2. **Touch**: Virtual joystick (via Joystick.tsx) and tap for jump

Both read from/write to Zustand store to avoid prop drilling.

### Camera System

Third-person camera in Player.tsx:
- Follows player at configurable distance (10 units) and height (5 units)
- Rotates around player via drag or QE keys
- Movement direction is relative to camera angle
- Camera position calculated using trigonometry based on `cameraAngle.current`

## Important Patterns

1. **Performance optimization**: Player component reads from Zustand store directly in `useFrame` using `useStore.getState()` instead of subscribing, to avoid re-renders on every joystick input

2. **Movement calculation**: Player movement is relative to camera angle using Euler rotation, so forward always moves in the direction the camera is facing

3. **Zone detection**: World zones use sensor RigidBodies with `onIntersectionEnter`/`onIntersectionExit` callbacks to update the active zone in the store

4. **TypeScript**: Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`
