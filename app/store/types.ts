export interface IStore {
  loading: boolean;
  from: string;
  to: string;
  multiplier: number;
  baseRates:
    | {
        ref: string;
        value: string;
      }
    | {};
  timestamp:
    | {
        epoch: string;
        date: string;
      }
    | {};
}
