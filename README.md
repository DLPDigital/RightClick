# Right Clicker

Start clicking, who knows how far down the rabbit hole this goes

## Technical Info

A React-based incremental game built with Next.js and TypeScript, demonstrating modern web development practices and state management patterns.

### Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **State Management**: Custom React hooks with useReducer
- **Styling**: CSS Modules
- **Build Tool**: Next.js build system
- **Deployment**: Netlify-ready configuration

### Project Structure

```
/app
├── components/         # Reusable UI components
├── data/              # Game constants and initial state
├── hooks/             # Custom React hooks for game logic
├── screens/           # Main game screen components
├── types/             # TypeScript type definitions
├── utils/            # Helper functions
├── page.tsx          # Main game component
└── layout.tsx        # Root layout component
```

### Key Technical Features

#### Custom Hook Architecture

- `useGameEngine`: Central game state management
- `useGamePersistence`: Save/load game state handling
- `useUpgrades`: Upgrade system logic
- `useMonetization`: In-game economy management

#### Type Safety

- Comprehensive TypeScript interfaces for game state
- Exhaustive type checking for screen navigation
- Strict null checks enabled

#### State Management

- Uses React's useReducer for predictable state updates
- Memoized calculations with useMemo
- Optimized re-renders with useCallback

#### Performance Optimizations

- Debounced save operations
- Controlled update intervals for game ticks
- Memoized component rendering

### Code Quality Tools

- ESLint with TypeScript support
- Prettier for code formatting
- Custom ESLint rules for maintaining code quality

### Deployment

The project includes Netlify configuration for easy deployment:

- `netlify.toml` with build settings
- Static export configuration in `next.config.js`
- Environment-aware build process

### Game Architecture

#### Core Systems

1. **Game Loop**: Managed through useEffect with configurable tick rates
2. **Save System**: Persistent storage with import/export functionality
3. **Achievement System**: Event-based unlocks with conditions
4. **Progression System**: Insanity levels and upgrade paths

#### State Management Pattern

```typescript
interface GameState {
  money: number
  followers: number
  postsMade: number
  // ... additional state properties
}

type GameAction = { type: "TICK" } | { type: "POST" }
// ... other action types
```
