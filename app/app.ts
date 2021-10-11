import Vue from "nativescript-vue";
import Home from "./components/Home.vue";

import store from "./store/index";

Vue.registerElement(
  "PullToRefresh",
  () => require("@nativescript-community/ui-pulltorefresh").PullToRefresh
);

declare let __DEV__: boolean;

// Prints Vue logs when --env.production is *NOT* set while building
// Vue.config.silent = !__DEV__

new Vue({
  store,
  render: h => h("frame", [h(Home)])
}).$start();
