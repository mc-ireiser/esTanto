<template>
  <ListView
    v-if="!loading && red && screenHeight > minScreenHeight"
    for="item in calculatedRates"
    class="list"
    @itemTap="copyRateFromListW"
  >
    <v-template>
      <StackLayout>
        <Label :text="item.ref" textWrap="true" class="item-label" />
        <Label>
          <FormattedString>
            <Span :text="item.value" class="item-value" />
            <Span :text="` ${to}`" class="item-symbol" />
          </FormattedString>
        </Label>
      </StackLayout>
    </v-template>
  </ListView>
  <StackLayout v-else marginBottom="30">
    <StackLayout
      v-for="(item, index) in calculatedRates"
      :key="index"
      @tap="copyRate(item.value)"
    >
      <Label
        :text="item.ref"
        textWrap="true"
        marginTop="20"
        class="item-label"
      />
      <Label>
        <FormattedString>
          <Span :text="item.value" class="item-value" />
          <Span :text="` ${to}`" class="item-symbol" />
        </FormattedString>
      </Label>
    </StackLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from "vue";
import currency from "currency.js";
import { mapGetters } from "vuex";
import { setTextSync } from "nativescript-clipboard";
import { Toasty } from "@triniwiz/nativescript-toasty";
import { Screen } from "@nativescript/core";
import { minScreenHeight } from "~/data/globals";

type rateType = {
  ref: string;
  value: string;
};

const currencyFormat = {
  separator: ".",
  decimal: ",",
  precision: 2,
  symbol: "",
  pattern: `# !`,
};

export default Vue.extend({
  data() {
    return {
      minScreenHeight: minScreenHeight,
    };
  },

  computed: {
    ...mapGetters({
      red: "red",
      loading: "loading",
      from: "from",
      to: "to",
      multiplier: "multiplier",
      baseRates: "baseRates",
    }),

    screenWidth(): number {
      return Screen.mainScreen.widthDIPs;
    },

    screenHeight(): number {
      return Screen.mainScreen.heightDIPs;
    },

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
    copyRateFromListW(event: any): void {
      const value = event.item.value.trim() as string;
      setTextSync(value);
      this.showToast("Valor copiado!");
    },

    copyRate(value: string): void {
      setTextSync(value.trim());
      this.showToast("Valor copiado!");
    },

    showToast(text: string): void {
      const toast = new Toasty({
        text,
        yAxisOffset: 20,
      }).setBackgroundColor("#656565");
      toast.show();
    },
  },
});
</script>

<style scoped lang="scss">
.list {
  min-width: 400;
}

.item-label {
  font-size: 16;
}

.item-value {
  font-size: 22;
  font-weight: bold;
}

.item-symbol {
  font-size: 14;
}
</style>