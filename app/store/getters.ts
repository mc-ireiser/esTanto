import { IStore, baseRatesType, timeStampType } from "./types";

export const red = (state: IStore): boolean => {
  return state.red;
};

export const loading = (state: IStore): boolean => {
  return state.loading;
};

export const from = (state: IStore): string => {
  return state.from;
};

export const to = (state: IStore): string => {
  return state.to;
};

export const multiplier = (state: IStore): number => {
  return state.multiplier;
};

export const baseRates = (state: IStore): baseRatesType => {
  return state.baseRates;
};

export const timestamp = (state: IStore): timeStampType => {
  return state.timestamp;
};
