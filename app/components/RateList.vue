<template>
  <ListView for="item in calculatedRates">
    <v-template>
      <StackLayout>
        <Label :text="item.ref" fontSize="16" textWrap="true" />
        <Label>
          <FormattedString>
            <Span :text="item.value" fontSize="22" fontWeight="bold" />
            <Span :text="` ${to}`" fontSize="14" />
          </FormattedString>
        </Label>
      </StackLayout>
    </v-template>
  </ListView>
</template>

<script lang="ts">
import Vue from "vue";
import currency from "currency.js";
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters({
      loading: "loading",
      from: "from",
      to: "to",
      multiplier: "multiplier",
      baseRates: "baseRates",
    }),

    bcvRate(): string {
      if (this.from === "USD") {
        return currency(
          currency(this.baseRates?.bcv as number).multiply(this.multiplier),
          currencyFormat
        ).format();
      }

      const VEF = currency(1).divide(this.baseRates?.bcv as number);
      return currency(VEF.multiply(this.multiplier), currencyFormat).format();
    },

    dtRate(): string {
      if (this.from === "USD") {
        return currency(
          currency(this.baseRates?.dt as number).multiply(this.multiplier),
          currencyFormat
        ).format();
      }

      const VEF = currency(1).divide(this.baseRates?.dt as number);
      return currency(VEF.multiply(this.multiplier), currencyFormat).format();
    },

    calculatedRates(): rateType[] {
      return [
        {
          ref: "BCV (tasa oficial)",
          value: this.bcvRate,
        },
        {
          ref: "DolarToday",
          value: this.dtRate,
        },
      ];
    },
  },
});
</script>

<style scoped lang="scss">
</style>