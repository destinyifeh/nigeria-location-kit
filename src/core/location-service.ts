import type { State, LGA } from "./types.js";
import { searchInStates, searchInLGAs } from "./search.js";
import statesData from "../data/ng.json" with { type: "json" };

const typedStatesData = statesData as State[];

export function getStates(): State[] {
  return typedStatesData;
}

export function getStateById(id: string): State | undefined {
  return typedStatesData.find(s => s.id === id);
}

export function getStateByName(name: string): State | undefined {
  const normalizedName = name.toLowerCase().trim();
  return typedStatesData.find(s => s.name.toLowerCase() === normalizedName);
}

export function getLGAs(stateIdOrName: string): LGA[] {
  let state = getStateById(stateIdOrName);
  
  if (!state && typeof stateIdOrName === 'string') {
    state = getStateByName(stateIdOrName);
    
    // Also try by code as a fallback
    if (!state) {
      const normalizedCode = stateIdOrName.toLowerCase().trim();
      state = typedStatesData.find(s => s.code?.toLowerCase() === normalizedCode);
    }
  }
  
  return state ? state.lgas : [];
}

export function searchStates(query: string): State[] {
  return searchInStates(typedStatesData, query);
}

export function searchLGAs(query: string): LGA[] {
  return searchInLGAs(typedStatesData, query);
}
