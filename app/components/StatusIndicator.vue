<template>
  <StackLayout marginTop="5">
    <StackLayout v-if="!loading">
      <Label
        v-if="red"
        :text="timestamp.date"
        fontSize="16"
        textWrap="true"
        marginBottom="6"
        orientation="horizontal"
        horizontalAlignment="center"
      />
      <Label
        v-if="!red"
        text="Sin conexión a red"
        fontSize="16"
        textWrap="true"
        marginBottom="6"
        orientation="horizontal"
        horizontalAlignment="center"
      />
      <label class="line" marginTop="18"></label>
    </StackLayout>
    <ActivityIndicator v-else :busy="loading" marginTop="1" />
  </StackLayout>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  computed: {
    ...mapGetters({
      red: "red",
      loading: "loading",
      timestamp: "timestamp",
    }),
  },
});
</script>

<style scoped lang="scss">
ActivityIndicator {
  color: #656565;
}

.line {
  height: 2px;
  background: linear-gradient(to left, #65656513, #656565, #65656513);
}
</style>