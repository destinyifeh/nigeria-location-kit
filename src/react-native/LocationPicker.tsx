import React from "react";
import { View } from "react-native";
import { useStates } from "./useStates.js";
import { useLGAs } from "./useLGAs.js";
import type { State, LGA } from "../core/types.js";

export interface RNLocationValue {
  state?: string;
  lga?: string;
}

export interface RNLocationPickerProps {
  value?: RNLocationValue;
  onChange?: (value: RNLocationValue) => void;
  children?: (props: {
    states: State[];
    lgas: LGA[];
    selectedState?: string;
    selectedLga?: string;
    selectState: (stateId: string) => void;
    selectLga: (lgaId: string) => void;
  }) => React.ReactNode;
}

export function LocationPicker({ value, onChange, children }: RNLocationPickerProps) {
  const states = useStates();
  const lgas = useLGAs(value?.state);

  const selectState = (stateId: string) => {
    onChange?.({ state: stateId, lga: undefined });
  };

  const selectLga = (lgaId: string) => {
    onChange?.({ state: value?.state, lga: lgaId });
  };

  return (
    <View>
      {children?.({
        states,
        lgas,
        selectedState: value?.state,
        selectedLga: value?.lga,
        selectState,
        selectLga,
      })}
    </View>
  );
}
