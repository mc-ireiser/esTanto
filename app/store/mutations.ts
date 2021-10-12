import { IStore } from "./types";

const mutations = {
  red(state: IStore, payload: boolean) {
    state.red = payload;
  },

  loading(state: IStore, payload: boolean) {
    state.loading = payload;
  },

  from(state: IStore, payload: string) {
    state.from = payload;
  },

  to(state: IStore, payload: string) {
    state.to = payload;
  },

  multiplier(state: IStore, payload: number) {
    state.multiplier = payload;
  },

  baseRates(state: IStore, payload: { ref: string; value: string }[]) {
    state.baseRates = payload;
  },

  timestamp(state: IStore, payload: { epoch: string; date: string }) {
    state.timestamp = payload;
  }
};

export default mutations;
