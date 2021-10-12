<template>
  <ListView
    v-if="!loading && red"
    for="item in calculatedRates"
    @itemTap="copyRate"
  >
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
import { setTextSync } from "nativescript-clipboard";

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
      red: "red",
      loading: "loading",
      from: "from",
      to: "to",
      multiplier: "multiplier",
      baseRates: "baseRates",
    }),

    bcvRate(): string {
      if (this.from === "USD") {
        return currency(
          currency(this.baseRates?.bcv as number, { precision: 8 }).multiply(
            this.multiplier
          ).value,
          currencyFormat
        ).format();
      }

      const VEF = currency(1.0, { precision: 8 }).divide(
        this.baseRates?.bcv as number
      ).value;
      const total = currency(VEF, { precision: 8 }).multiply(
        this.multiplier
      ).value;
      return currency(total, currencyFormat).format();
    },

    dtRate(): string {
      if (this.from === "USD") {
        return currency(
          currency(this.baseRates?.dt as number, { precision: 8 }).multiply(
            this.multiplier
          ).value,
          currencyFormat
        ).format();
      }

      const VEF = currency(1.0, { precision: 8 }).divide(
        this.baseRates?.dt as number
      ).value;
      const total = currency(VEF, { precision: 8 }).multiply(
        this.multiplier
      ).value;
      return currency(total, currencyFormat).format();
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

  methods: {
    copyRate(event: any) {
      setTextSync(event.item.value.trim());
    },
  },
});
</script>

<style scoped lang="scss">
</style>