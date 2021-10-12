import { IStore } from "./types";
import * as mutationNames from "./mutationNames";

const mutations = {
  [mutationNames.mutation_red](state: IStore, payload: boolean) {
    state.red = payload;
  },

  [mutationNames.mutation_loading](state: IStore, payload: boolean) {
    state.loading = payload;
  },

  [mutationNames.mutation_from](state: IStore, payload: string) {
    state.from = payload;
  },

  [mutationNames.mutation_to](state: IStore, payload: string) {
    state.to = payload;
  },

  [mutationNames.mutation_multiplier](state: IStore, payload: number) {
    state.multiplier = payload;
  },

  [mutationNames.mutation_baseRates](
    state: IStore,
    payload: { ref: string; value: string }[]
  ) {
    state.baseRates = payload;
  },

  [mutationNames.mutation_timestamp](
    state: IStore,
    payload: { epoch: string; date: string }
  ) {
    state.timestamp = payload;
  }
};

export default mutations;
