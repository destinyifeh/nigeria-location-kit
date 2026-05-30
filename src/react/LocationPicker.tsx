import React from "react";
import { useStates } from "./useStates.js";
import { useLGAs } from "./useLGAs.js";
import type { State, LGA } from "../core/types.js";

export interface LocationValue {
  state?: string;
  lga?: string;
}

export interface LocationPickerProps {
  value?: LocationValue;
  onChange?: (value: LocationValue) => void;
  children?: (props: {
    states: State[];
    lgas: LGA[];
    selectedState?: string;
    selectedLga?: string;
    selectState: (stateId: string) => void;
    selectLga: (lgaId: string) => void;
  }) => React.ReactNode;
}

export function LocationPicker({ value, onChange, children }: LocationPickerProps) {
  const states = useStates();
  const lgas = useLGAs(value?.state);

  const selectState = (stateId: string) => {
    onChange?.({ state: stateId, lga: undefined });
  };

  const selectLga = (lgaId: string) => {
    onChange?.({ state: value?.state, lga: lgaId });
  };

  if (children) {
    return children({
      states,
      lgas,
      selectedState: value?.state,
      selectedLga: value?.lga,
      selectState,
      selectLga,
    });
  }

  return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      <select
        value={value?.state || ""}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectState((e.target as HTMLSelectElement).value)}
      >
        <option value="" disabled>Select State</option>
        {states.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>

      <select
        value={value?.lga || ""}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectLga((e.target as HTMLSelectElement).value)}
        disabled={!value?.state}
      >
        <option value="" disabled>Select LGA</option>
        {lgas.map((lga) => (
          <option key={lga.id} value={lga.id}>
            {lga.name}
          </option>
        ))}
      </select>
    </div>
  );
}
