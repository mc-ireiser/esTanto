<template>
  <Page>
    <ActionBar>
      <Label text="alCambio" />
    </ActionBar>
    <StackLayout>
      <StackLayout width="320" margin="20" padding="20">
        <Label
          text="Conversor Monetario"
          textWrap="true"
          fontSize="20"
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
              <Label text="USD" textWrap="true" />
            </StackLayout>
          </StackLayout>
          <StackLayout
            col="1"
            horizontalAlignment="center"
            verticalAlignment="center"
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
              <Label text="VEF" textWrap="true" />
            </StackLayout>
          </StackLayout>
        </GridLayout>
        <Label
          text="Monto en USD"
          textWrap="true"
          fontSize="16"
          textAlignment="center"
        />
        <TextField keyboardType="number" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";

export default Vue.extend({});
</script>

<style scoped lang="scss">
.currency-tag {
  width: 50;
  padding: 6;
  margin-top: 10;
  font-size: 16;
  font-weight: bold;
  border-radius: 10;
  text-align: center;
  background-color: rgba(187, 187, 187, 0.2);
}

.switch-curency-icon {
  font-size: 30;
}
</style>
