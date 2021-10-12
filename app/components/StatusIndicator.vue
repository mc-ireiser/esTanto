<template>
  <StackLayout>
    <StackLayout
      v-if="!loading"
      orientation="horizontal"
      horizontalAlignment="center"
    >
      <Label
        :text="timestamp.date"
        fontSize="16"
        textWrap="true"
        marginTop="20"
        marginBottom="30"
        verticalAlignment="center"
      />
      <StackLayout
        class="icon-options"
        marginLeft="15"
        verticalAlignment="center"
        horizontalAlignment="center"
        @tap="showDisclaimerDialog()"
      >
        <Label
          text.decode="&#xf12a; "
          horizontalAlignment="center"
          class="fas"
        ></Label>
      </StackLayout>
    </StackLayout>
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
import vibration from "~/utils/vibrate";
import disclaimer from "~/utils/disclaimer";

export default Vue.extend({
  computed: {
    ...mapGetters({
      loading: "loading",
      timestamp: "timestamp",
    }),
  },

  methods: {
    showDisclaimerDialog() {
      vibration();
      disclaimer();
    },
  },
});
</script>

<style scoped lang="scss">
.line {
  height: 2px;
  background: linear-gradient(to left, #65656513, #656565, #65656513);
}

.icon-options {
  height: 30;
  width: 30;
  border-radius: 20;
  vertical-align: center;
  background-color: rgba(187, 187, 187, 0.2);
}
</style>