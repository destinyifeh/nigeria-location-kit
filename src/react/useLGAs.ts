import { useMemo } from "react";
import type { LGA } from "../core/types.js";
import { getLGAs } from "../core/location-service.js";

export function useLGAs(stateId?: string | number): LGA[] {
  return useMemo(() => {
    if (stateId === undefined || stateId === null) return [];
    return getLGAs(stateId);
  }, [stateId]);
}
