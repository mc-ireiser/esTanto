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
              <Label text="USD" class="currency" textWrap="true" />
            </StackLayout>
          </StackLayout>
          <StackLayout
            col="1"
            horizontalAlignment="center"
            verticalAlignment="bottom"
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
              <Label text="VEF" class="currency" textWrap="true" />
            </StackLayout>
          </StackLayout>
        </GridLayout>
        <Label
          text="Monto en USD"
          textWrap="true"
          fontSize="16"
          marginTop="5"
          marginBottom="20"
          textAlignment="center"
        />
        <TextField
          fontSize="22"
          fontWeight="bold"
          keyboardType="number"
          returnKeyType="done"
          textAlignment="right"
        />
      </StackLayout>
      <StackLayout row="1">
        <Label
          text="Octubre 8, 2021 03:21 PM"
          fontSize="16"
          textWrap="true"
          marginBottom="5"
          horizontalAlignment="center"
        />
        <label class="line"></label>
      </StackLayout>
      <ListView row="2" for="item in listOfValues" marginTop="10">
        <v-template>
          <StackLayout>
            <Label :text="item.ref" fontSize="14" textWrap="true" />
            <Label>
              <FormattedString>
                <Span :text="item.value" fontSize="22" fontWeight="bold" />
                <Span text=" VEF" />
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

export default Vue.extend({
  data() {
    return {
      listOfValues: [
        {
          value: 154.7,
          ref: "x",
        },
        {
          value: 156.15,
          ref: "y",
        },
        {
          value: 156.15,
          ref: "z",
        },
      ],
    };
  },
});
</script>

<style scoped lang="scss">
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
  font-family: "Nunito", "Nunito-Bold";
}

.switch-curency-icon {
  font-size: 30;
}
</style>
