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

### 1. Using Hooks directly

```tsx
import { useState } from "react";
import { useStates, useLGAs } from "nigeria-location-kit/react";

function MyForm() {
  const [selectedState, setSelectedState] = useState("");
  
  // Get all states
  const states = useStates();
  
  // Automatically gets LGAs for the selected state (accepts ID or Name)
  const lgas = useLGAs(selectedState); 

  return (
    <div>
      <select onChange={(e) => setSelectedState(e.target.value)}>
        <option value="">Select State</option>
        {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>

      <select disabled={!selectedState}>
        <option value="">Select LGA</option>
        {lgas.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
      </select>
    </div>
  );
}
```

### 2. Using the Headless Component

Use the built-in React component to manage state automatically:

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

The package provides the exact same API surface, optimized for React Native primitives!

### 1. Hooks in React Native
You can import `useStates` and `useLGAs` from `"nigeria-location-kit/react-native"` and use them exactly the same way as shown in the web example above.

### 2. Headless Component in React Native
The React Native `LocationPicker` doesn't force any UI on you. Here is an example of how you can build a custom UI (e.g., using `@react-native-picker/picker` or custom modals):

```tsx
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LocationPicker } from "nigeria-location-kit/react-native";

export default function App() {
  return (
    <LocationPicker>
      {({ states, lgas, selectedState, selectedLga, selectState, selectLga }) => (
        <View style={{ padding: 20 }}>
          <Text>Select State:</Text>
          <Picker
            selectedValue={selectedState}
            onValueChange={(itemValue) => selectState(itemValue)}
          >
            <Picker.Item label="Select State" value="" />
            {states.map((s) => (
              <Picker.Item key={s.id} label={s.name} value={s.id} />
            ))}
          </Picker>

          <Text>Select LGA:</Text>
          <Picker
            selectedValue={selectedLga}
            onValueChange={(itemValue) => selectLga(itemValue)}
            enabled={!!selectedState}
          >
            <Picker.Item label="Select LGA" value="" />
            {lgas.map((l) => (
              <Picker.Item key={l.id} label={l.name} value={l.id} />
            ))}
          </Picker>
        </View>
      )}
    </LocationPicker>
  );
}
```
