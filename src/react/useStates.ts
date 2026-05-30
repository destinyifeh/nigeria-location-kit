import { useMemo } from "react";
import type { State } from "../core/types.js";
import { getStates } from "../core/location-service.js";

export function useStates(): State[] {
  return useMemo(() => getStates(), []);
}
