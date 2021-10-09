<template>
  <Page actionBarHidden="true">
    <ActionBar flat="true">
      <Label text="alCambio" fontSize="24" />
    </ActionBar>
    <GridLayout
      rows="auto, auto, *"
      columns="*"
      width="320"
      margin="25"
      padding="20"
    >
      <StackLayout row="0" marginBottom="20">
        <Label
          text="alCambio"
          textWrap="true"
          fontSize="24"
          marginTop="20"
          marginBottom="25"
          fontWeight="bold"
          textAlignment="center"
        />
        <GridLayout rows="auto" columns="*,*,*" marginBottom="35">
          <StackLayout col="0" horizontalAlignment="center">
            <Label
              text="De"
              fontSize="15"
              textWrap="true"
              horizontalAlignment="center"
            />
            <StackLayout class="currency-tag">
              <Label :text="from" class="currency" textWrap="true" />
            </StackLayout>
          </StackLayout>
          <StackLayout
            col="1"
            horizontalAlignment="center"
            verticalAlignment="bottom"
            @tap="changeConversionOrder()"
          >
            <Label>
              <FormattedString>
                <Span class="fas switch-curency-icon" text.decode="&#xf362; " />
              </FormattedString>
            </Label>
          </StackLayout>
          <StackLayout col="2" horizontalAlignment="center">
            <Label
              text="A"
              fontSize="15"
              textWrap="true"
              horizontalAlignment="center"
            />
            <StackLayout class="currency-tag">
              <Label :text="to" class="currency" textWrap="true" />
            </StackLayout>
          </StackLayout>
        </GridLayout>
        <Label
          :text="`Monto en ${from}`"
          textWrap="true"
          fontSize="16"
          marginTop="5"
          marginBottom="20"
          textAlignment="center"
        />
        <TextField
          v-model="multiplier"
          fontSize="22"
          fontWeight="bold"
          keyboardType="number"
          returnKeyType="done"
          textAlignment="center"
        />
      </StackLayout>
      <StackLayout row="1">
        <Label
          v-if="!loading"
          :text="timestamp.date"
          fontSize="16"
          textWrap="true"
          marginTop="20"
          marginBottom="30"
          horizontalAlignment="center"
        />
        <ActivityIndicator
          v-else
          :busy="loading"
          marginTop="20"
          marginBottom="25"
        />
        <label class="line"></label>
      </StackLayout>
      <ListView row="2" for="item in calculatedRates" marginTop="10">
        <v-template>
          <StackLayout>
            <Label :text="item.ref" fontSize="14" textWrap="true" />
            <Label>
              <FormattedString>
                <Span :text="item.value" fontSize="22" fontWeight="bold" />
                <Span :text="` ${to}`" />
              </FormattedString>
            </Label>
          </StackLayout>
        </v-template>
      </ListView>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Http } from "@nativescript/core";
import currency from "currency.js";

interface IData {
  loading: boolean;
  multiplier: number;
  from: string;
  to: string;
  timestamp: {
    epoch: string;
    date: string;
  };
  baseRates: {
    bcv: number;
    dt: number;
  } | null;
}

type rateType = {
  ref: string;
  value: number | string;
};

const currencyFormat = {
  separator: ".",
  decimal: ",",
  precision: 2,
  symbol: "",
  pattern: `# !`,
};

export default Vue.extend({
  data(): IData {
    return {
      loading: false,
      from: "USD",
      to: "VEF",
      multiplier: 1,
      baseRates: null,
      timestamp: {
        epoch: "",
        date: "",
      },
    };
  },

  created() {
    this.asyncData();
  },

  computed: {
    bcvRate(): string {
      if (this.from === "USD") {
        return currency(
          currency(this.baseRates?.bcv as number).multiply(this.multiplier),
          currencyFormat
        ).format();
      }

      return currency(
        currency(1)
          .divide(this.baseRates?.bcv as number)
          .multiply(this.multiplier),
        currencyFormat
      ).format();
    },

    dtRate(): string {
      if (this.from === "USD") {
        return currency(
          currency(this.baseRates?.dt as number).multiply(this.multiplier),
          currencyFormat
        ).format();
      }

      return currency(
        currency(1)
          .divide(this.baseRates?.dt as number)
          .multiply(this.multiplier),
        currencyFormat
      ).format();
    },

    calculatedRates(): rateType[] {
      return [
        {
          ref: "BCV",
          value: this.bcvRate,
        },
        {
          ref: "DolarToday",
          value: this.dtRate,
        },
      ];
    },
  },

  methods: {
    async asyncData() {
      this.loading = true;
      const URL = "https://s3.amazonaws.com/dolartoday/data.json";
      const data: any = await Http.getJSON(URL);

      this.baseRates = {
        bcv: data.USD.promedio_real as number,
        dt: data.USD.dolartoday as number,
      };

      this.timestamp = {
        epoch: data._timestamp.epoch as string,
        date: data._timestamp.fecha as string,
      };

      this.loading = false;
    },

    changeConversionOrder() {
      const aux = this.from;
      this.from = this.to;
      this.to = aux;
    },
  },
});
</script>

<style scoped lang="scss">
Page {
  background-image: linear-gradient(
    to bottom,
    #d8e0ec,
    #dfe3ed,
    #e5e6ed,
    #eaeaed,
    #eeeeee
  );
}

.line {
  background: linear-gradient(to left, #28bfba, green, lightblue);
  height: 2px;
}

.currency-tag {
  width: 70;
  padding: 6;
  margin-top: 10;
  border-radius: 10;
  text-align: center;
  background-color: rgba(187, 187, 187, 0.2);
}

.currency {
  font-size: 16;
  font-weight: bold;
}

.switch-curency-icon {
  font-size: 30;
}
</style>
