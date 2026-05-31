export type LGA = {
  id: string;
  name: string;
  code?: string;
};

export type State = {
  id: string;
  name: string;
  code?: string;
  lgas: LGA[];
};
