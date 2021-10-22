export interface IStore {
  red: boolean;
  loading: boolean;
  from: string;
  to: string;
  multiplier: number;
  baseRates: baseRatesType;
  timestamp: timeStampType;
}

export type baseRatesType =
  | {
      ref: string;
      value: string;
    }
  | {};

export type timeStampType =
  | {
      epoch: string;
      date: string;
    }
  | {};
