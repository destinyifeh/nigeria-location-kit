# nigeria-location-kit 🇳🇬

A lightweight, Nigeria-only location utility library providing States and LGAs with headless core logic and optional React/React Native components.

## Features

- **Nigeria Only:** Focused exclusively on the 36 states and FCT, including all local government areas (LGAs).
- **Extremely Simple:** Flat API, no registry, no complex hierarchies, just direct access to the data you need.
- **Headless First:** Extract the raw data or use our included unstyled React components.
- **Tree-shakeable & Small:** Zero extra bloat.

## Installation

```bash
npm install nigeria-location-kit
```

## Core API (Vanilla JS/TS)

```ts
import {
  getStates,
  getLGAs,
  getStateByName,
  searchStates,
} from "nigeria-location-kit";

// Get all 36 states + FCT
const states = getStates();

// Get LGAs for a state by its ID, Name, or Code
const lgas = getLGAs("Lagos"); // Get LGAs for Lagos
const lgasById = getLGAs("NG-LAG"); // Also works!

// Quick search
const results = searchStates("Lagos"); // Returns Lagos
```

## React Hooks & Components

Use the built-in React component or build your own with the hooks:

```tsx
import { LocationPicker, useStates, useLGAs } from "nigeria-location-kit/react";

function MyApp() {
  return (
    <LocationPicker onChange={(value) => console.log("Selected:", value)} />
  );
}
```

Or build your own UI using the render props:

```tsx
<LocationPicker>
  {({ states, lgas, selectState, selectLga }) => (
    <div>
      <select onChange={(e) => selectState(e.target.value)}>
        {states.map((s) => (
          <option value={s.id}>{s.name}</option>
        ))}
      </select>
      <select onChange={(e) => selectLga(e.target.value)}>
        {lgas.map((l) => (
          <option value={l.id}>{l.name}</option>
        ))}
      </select>
    </div>
  )}
</LocationPicker>
```

## React Native

Same API surface, using React Native primitives!

```tsx
import { LocationPicker } from "nigeria-location-kit/react-native";
// Uses the exact same headless hooks and render props!
```
