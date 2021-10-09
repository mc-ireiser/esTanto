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
          fontSize="16"
          fontWeight="bold"
          textAlignment="center"
        />
        <GridLayout rows="auto" columns="*,*,*">
          <StackLayout col="0" horizontalAlignment="center">
            <Label text="De" textWrap="true" />
            <Label text="USD" textWrap="true" />
          </StackLayout>
          <StackLayout col="1" horizontalAlignment="center">
            <Label>
              <FormattedString>
                <Span class="fas" text.decode="&#xf362; " />
              </FormattedString>
            </Label>
          </StackLayout>
          <StackLayout col="2" horizontalAlignment="center">
            <Label text="A" textWrap="true" />
            <Label text="VEF" textWrap="true" />
          </StackLayout>
        </GridLayout>
        <Label
          text="Monto en USD"
          textWrap="true"
          fontSize="14"
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
</style>
