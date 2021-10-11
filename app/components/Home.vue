<template>
  <Page actionBarHidden="true">
    <PullToRefresh
      @refresh="refresh"
      indicatorFillColor="#f6f6f6"
      indicatorColor="#656565"
      marginTop="10"
      padding="20"
      minWidth="320"
      width="360"
    >
      <GridLayout rows="auto, auto, *" columns="*" margin="25" padding="20">
        <UserInput row="0" marginBottom="20"></UserInput>
        <StatusIndicator row="1"></StatusIndicator>
        <RateList row="2" v-if="!loading" marginTop="10"></RateList>
      </GridLayout>
    </PullToRefresh>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Http, ApplicationSettings, Dialogs } from "@nativescript/core";
import { mapGetters } from "vuex";
// Components
import UserInput from "./UserInput.vue";
import RateList from "./RateList.vue";
import StatusIndicator from "./StatusIndicator.vue";
// Data
import disclaimerDialog from "~/data/disclaimerDialog";
import API_URL from "~/data/api";

export default Vue.extend({
  components: {
    UserInput,
    RateList,
    StatusIndicator,
  },

  mounted() {
    this.getApiData();
    const { title, message } = disclaimerDialog;

    if (!ApplicationSettings.getBoolean("tos")) {
      Dialogs.alert({ title, message, okButtonText: "Acepto" }).then(() => {
        ApplicationSettings.setBoolean("tos", true);
      });
    }
  },

  computed: {
    ...mapGetters({
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
      this.$store.commit("loading", true);
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
  },
});
</script>

<style scoped lang="scss">
</style>
