import Vue from "nativescript-vue";
import Vuex from "vuex";
import * as getters from "./getters";
import mutations from "./mutations";
import { IStore } from "./types";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    red: true,
    loading: false,
    from: "USD",
    to: "VES",
    multiplier: 1,
    baseRates: {},
    timestamp: {}
  },
  getters,
  mutations
});

Vue.prototype.$store = store;

export default store;
