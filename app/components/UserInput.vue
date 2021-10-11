<template>
  <StackLayout>
    <Label
      text="alCambio"
      textWrap="true"
      fontSize="24"
      marginTop="40"
      marginBottom="25"
      fontWeight="bold"
      textAlignment="center"
    />
    <GridLayout rows="auto" columns="*,*,*" marginBottom="35">
      <StackLayout col="0" horizontalAlignment="center">
        <Label
          text="De"
          fontSize="18"
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
          fontSize="18"
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
      fontSize="24"
      marginTop="5"
      marginBottom="20"
      textAlignment="center"
    />
    <TextField
      :text="multiplier"
      fontSize="22"
      fontWeight="bold"
      class="inputField"
      keyboardType="number"
      returnKeyType="done"
      textAlignment="center"
      @focus="vibrate()"
      @textChange="updateMultiplier"
    />
  </StackLayout>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Vibrate } from "nativescript-vibrate";

const vibrator = new Vibrate();

export default Vue.extend({
  data() {
    return {
      key: 0,
    };
  },

  computed: {
    ...mapGetters({
      from: "from",
      to: "to",
      multiplier: "multiplier",
    }),
  },

  methods: {
    changeConversionOrder() {
      this.vibrate();
      const aux = this.from;
      this.$store.commit("from", this.to);
      this.$store.commit("to", aux);
    },

    updateMultiplier(args: any) {
      this.$store.commit("multiplier", args.value);
    },

    vibrate() {
      vibrator.vibrate(30);
    },
  },
});
</script>

<style scoped lang="scss">
.currency-tag {
  width: 70;
  padding: 6;
  margin-top: 10;
  border-radius: 10;
  text-align: center;
  border-width: 5px;
  border-color: #6565651e;
  background-color: rgba(187, 187, 187, 0.2);
}

.currency {
  font-size: 18;
  font-weight: bold;
}

.inputField {
  border-width: 5px;
  border-color: #6565651e;
  background-color: rgba(187, 187, 187, 0.2);
}

.switch-curency-icon {
  font-size: 30;
}
</style>