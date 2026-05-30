import type { State, LGA } from "./types.js";

function normalize(str: string): string {
  return str.toLowerCase().trim().replace(/[^a-z0-9\s]/g, "");
}

export function searchInStates(states: State[], query: string): State[] {
  const q = normalize(query);
  if (!q) return [];
  
  return states.filter(state => 
    normalize(state.name).includes(q) || 
    (state.code && normalize(state.code).includes(q))
  );
}

export function searchInLGAs(states: State[], query: string): LGA[] {
  const q = normalize(query);
  if (!q) return [];

  const results: LGA[] = [];
  for (const state of states) {
    for (const lga of state.lgas) {
      if (normalize(lga.name).includes(q)) {
        results.push(lga);
      }
    }
  }
  return results;
}
