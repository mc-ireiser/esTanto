import Vue from "nativescript-vue";
import Vuex from "vuex";
import * as getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loading: false,
    from: "USD",
    to: "VEF",
    multiplier: 1,
    baseRates: {},
    timestamp: {}
  },
  getters,
  mutations
});

Vue.prototype.$store = store;

export default store;
