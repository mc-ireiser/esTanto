<template>
  <Page actionBarHidden="true">
    <PullToRefresh
      @refresh="refresh"
      indicatorFillColor="#f6f6f6"
      indicatorColor="#656565"
      marginTop="20"
      padding="20"
      minWidth="320"
      width="360"
    >
      <GridLayout
        rows="auto, auto, auto, *"
        columns="*"
        margin="20"
        padding="20"
      >
        <StackLayout
          row="0"
          orientation="horizontal"
          horizontalAlignment="right"
          marginTop="10"
        >
          <StackLayout
            class="icon-options"
            marginRight="20"
            @tap="showDisclaimerDialog()"
          >
            <Label
              text.decode="&#xf12a; "
              horizontalAlignment="center"
              class="fas"
            ></Label>
          </StackLayout>
        </StackLayout>
        <UserInput row="1" marginTop="10" marginBottom="20"></UserInput>
        <StatusIndicator row="2" v-if="multiplier"></StatusIndicator>
        <RateList
          row="3"
          v-if="!loading && multiplier"
          marginTop="10"
        ></RateList>
      </GridLayout>
    </PullToRefresh>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Http, Connectivity, ApplicationSettings } from "@nativescript/core";
import { mapGetters } from "vuex";
import vibration from "~/utils/vibrate";
import disclaimer from "~/utils/disclaimer";
import UserInput from "./UserInput.vue";
import RateList from "./RateList.vue";
import StatusIndicator from "./StatusIndicator.vue";
import API_URL from "~/data/api";

export default Vue.extend({
  components: {
    UserInput,
    RateList,
    StatusIndicator,
  },

  created() {
    this.getApiData();
  },

  mounted() {
    if (
      !ApplicationSettings.hasKey("tos") ||
      !ApplicationSettings.getBoolean("tos")
    ) {
      this.showDisclaimerDialog();
    }
  },

  computed: {
    ...mapGetters({
      multiplier: "multiplier",
      loading: "loading",
    }),
  },

  methods: {
    refresh(args: any) {
      this.getApiData();
      var pullRefresh = args.object;
      pullRefresh.refreshing = false;
    },

    async getApiData() {
      const connectivityType = Connectivity.getConnectionType();
      if (!connectivityType) {
        this.$store.commit("red", false);
        return;
      }

      this.$store.commit("loading", true);
      this.$store.commit("red", true);
      const data: any = await Http.getJSON(API_URL);
      this.processApidata(data);
      this.$store.commit("loading", false);
    },

    processApidata(data: any) {
      this.$store.commit("baseRates", {
        bcv: data.USD.promedio_real as number,
        dt: data.USD.dolartoday as number,
      });

      this.$store.commit("timestamp", {
        epoch: data._timestamp.epoch as string,
        date: data._timestamp.fecha as string,
      });
    },

    showDisclaimerDialog() {
      vibration();
      disclaimer();
    },
  },
});
</script>

<style scoped lang="scss">
.icon-options {
  height: 30;
  width: 30;
  border-radius: 20;
  vertical-align: center;
  background-color: rgba(187, 187, 187, 0.2);
}
</style>
