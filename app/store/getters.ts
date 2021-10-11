import { IStore } from "./types";

export const loading = (state: IStore) => {
  return state.loading;
};

export const from = (state: IStore) => {
  return state.from;
};

export const to = (state: IStore) => {
  return state.to;
};

export const multiplier = (state: IStore) => {
  return state.multiplier;
};

export const baseRates = (state: IStore) => {
  return state.baseRates;
};

export const timestamp = (state: IStore) => {
  return state.timestamp;
};
