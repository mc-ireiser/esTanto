<template>
  <StackLayout>
    <Label text="esTanto" textWrap="true" class="title" />
    <GridLayout rows="auto" columns="*,*,*" marginBottom="35">
      <StackLayout col="0" horizontalAlignment="center">
        <Label
          text="De"
          textWrap="true"
          class="label-currency-tag"
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
          textWrap="true"
          class="label-currency-tag"
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
      class="label-input-field"
      textAlignment="center"
    />
    <TextField
      :text="multiplier"
      class="input-field"
      keyboardType="number"
      returnKeyType="done"
      textAlignment="center"
      @doubleTap="clearInput()"
      @focus="vibrate()"
      @textChange="updateMultiplier"
    />
  </StackLayout>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import vibration from "~/utils/vibrate";
import {
  mutation_from,
  mutation_to,
  mutation_multiplier,
} from "~/store/mutationNames";

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
      this.$store.commit(mutation_from, this.to);
      this.$store.commit(mutation_to, aux);
    },

    updateMultiplier(args: any) {
      this.$store.commit(mutation_multiplier, args.value);
    },

    vibrate() {
      vibration();
    },

    clearInput() {
      this.$store.commit(mutation_multiplier, "");
    },
  },
});
</script>

<style scoped lang="scss">
.title {
  font-size: 25;
  font-weight: bold;
  margin-bottom: 25;
  text-align: center;
}

.label-currency-tag {
  font-size: 18;
}

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

.label-input-field {
  font-size: 24;
  margin-top: 5;
  margin-bottom: 20;
}

.input-field {
  font-size: 22;
  font-weight: bold;
  border-width: 5px;
  border-color: #6565651e;
  background-color: rgba(187, 187, 187, 0.2);
}

.switch-curency-icon {
  font-size: 30;
}
</style>