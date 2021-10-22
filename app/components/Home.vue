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
        v-if="screenHeight > 580"
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
      <ScrollView v-else>
        <GridLayout
          rows="auto, auto, auto, *"
          columns="*"
          margin="10"
          padding="10"
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
      </ScrollView>
    </PullToRefresh>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import {
  Http,
  Connectivity,
  ApplicationSettings,
  Screen,
} from "@nativescript/core";
import { mapGetters } from "vuex";
import vibration from "~/utils/vibrate";
import disclaimer from "~/utils/disclaimer";
import UserInput from "./UserInput.vue";
import RateList from "./RateList.vue";
import StatusIndicator from "./StatusIndicator.vue";
import API_URL from "~/data/api";
import {
  mutation_red,
  mutation_loading,
  mutation_baseRates,
  mutation_timestamp,
} from "~/store/mutationNames";

interface IApiData {
  _timestamp: {
    epoch: string;
    fecha: string;
  };
  USD: {
    promedio_real: number;
    dolartoday: number;
  };
}

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

    screenWidth(): number {
      return Screen.mainScreen.widthDIPs;
    },

    screenHeight(): number {
      return Screen.mainScreen.heightDIPs;
    },
  },

  methods: {
    refresh(args: any): void {
      this.getApiData();
      var pullRefresh = args.object;
      pullRefresh.refreshing = false;
    },

    async getApiData(): Promise<void> {
      const connectivityType = Connectivity.getConnectionType();
      if (!connectivityType) {
        this.$store.commit(mutation_red, false);
        return;
      }

      this.$store.commit(mutation_loading, true);
      this.$store.commit(mutation_red, true);
      const data: IApiData = await Http.getJSON(API_URL);
      this.processApidata(data);
      this.$store.commit(mutation_loading, false);
    },

    processApidata(data: IApiData): void {
      this.$store.commit(mutation_baseRates, {
        bcv: data.USD.promedio_real as number,
        dt: data.USD.dolartoday as number,
      });

      this.$store.commit(mutation_timestamp, {
        epoch: data._timestamp.epoch as string,
        date: data._timestamp.fecha as string,
      });
    },

    showDisclaimerDialog(): void {
      vibration();
      disclaimer();
    },
  },
});
</script>

<style scoped lang="scss">
Page {
  background-color: #6464641e;
}

.icon-options {
  height: 30;
  width: 30;
  border-radius: 20;
  vertical-align: center;
  background-color: rgba(187, 187, 187, 0.2);
}
</style>
