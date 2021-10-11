<template>
  <StackLayout>
    <Label
      v-if="!loading"
      :text="timestamp.date"
      fontSize="18"
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
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  computed: {
    ...mapGetters({
      loading: "loading",
      timestamp: "timestamp",
    }),
  },
});
</script>

<style scoped lang="scss">
.line {
  height: 2px;
  background: linear-gradient(to left, #65656513, #656565, #65656513);
}
</style>