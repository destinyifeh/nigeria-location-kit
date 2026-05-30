export type LGA = {
  id: number | string;
  name: string;
  code?: string;
};

export type State = {
  id: number | string;
  name: string;
  code?: string;
  lgas: LGA[];
};
