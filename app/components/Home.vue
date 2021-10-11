<template>
  <Page actionBarHidden="true">
    <PullToRefresh
      @refresh="refresh"
      indicatorFillColor="#f6f6f6"
      indicatorColor="#656565"
      marginTop="10"
      padding="20"
      minWidth="320"
      width="360"
    >
      <GridLayout rows="auto, auto, *" columns="*" margin="25" padding="20">
        <StackLayout row="0" marginBottom="20">
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
                  <Span
                    class="fas switch-curency-icon"
                    text.decode="&#xf362; "
                  />
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
            v-model="multiplier"
            fontSize="22"
            fontWeight="bold"
            class="inputField"
            keyboardType="number"
            returnKeyType="done"
            textAlignment="center"
            @focus="vibrate()"
          />
        </StackLayout>
        <StackLayout row="1">
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
        <ListView
          v-if="!loading"
          row="2"
          for="item in calculatedRates"
          marginTop="10"
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
      </GridLayout>
    </PullToRefresh>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Http, ApplicationSettings, Dialogs } from "@nativescript/core";
import currency from "currency.js";
import { Vibrate } from "nativescript-vibrate";

const vibrator = new Vibrate();

interface IData {
  loading: boolean;
  multiplier: number;
  from: string;
  to: string;
  timestamp: {
    epoch: string;
    date: string;
  };
  baseRates: {
    bcv: number;
    dt: number;
  } | null;
}

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
  data(): IData {
    return {
      loading: false,
      from: "USD",
      to: "VEF",
      multiplier: 1,
      baseRates: null,
      timestamp: {
        epoch: "",
        date: "",
      },
    };
  },

  created() {
    this.getApiData();

    let options = {
      title: "Descargo de responsabilidad",
      message:
        "Toda la información en la aplicación se proporciona 'tal cual', sin garantía de integridad, exactitud, puntualidad o de los resultados obtenidos del uso de esta información, y sin garantía de ningún tipo, expresa o implícita. Las tasas referenciales mostradas son públicas y externas a la aplicación, no se guarda relación de ningún tipo con las mismas. Las referencias hechas a nombres de terceros, logotipos y marcas registradas se incluyen estrictamente para uso referencial y son propiedad de sus respectivos propietarios.",
      okButtonText: "Acepto",
    };

    if (!ApplicationSettings.getBoolean("tos")) {
      Dialogs.alert(options).then(() => {
        ApplicationSettings.setBoolean("tos", true);
      });
    }
  },

  computed: {
    bcvRate(): string {
      if (this.from === "USD") {
        return currency(
          currency(this.baseRates?.bcv as number).multiply(this.multiplier),
          currencyFormat
        ).format();
      }

      return currency(
        currency(1)
          .divide(this.baseRates?.bcv as number)
          .multiply(this.multiplier),
        currencyFormat
      ).format();
    },

    dtRate(): string {
      if (this.from === "USD") {
        return currency(
          currency(this.baseRates?.dt as number).multiply(this.multiplier),
          currencyFormat
        ).format();
      }

      return currency(
        currency(1)
          .divide(this.baseRates?.dt as number)
          .multiply(this.multiplier),
        currencyFormat
      ).format();
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
    refresh(args: any) {
      this.getApiData();
      var pullRefresh = args.object;
      pullRefresh.refreshing = false;
    },

    async getApiData() {
      this.loading = true;
      const URL = "https://s3.amazonaws.com/dolartoday/data.json";
      const data: any = await Http.getJSON(URL);
      this.processApidata(data);
      this.loading = false;
    },

    processApidata(data: any) {
      this.baseRates = {
        bcv: data.USD.promedio_real as number,
        dt: data.USD.dolartoday as number,
      };

      this.timestamp = {
        epoch: data._timestamp.epoch as string,
        date: data._timestamp.fecha as string,
      };
    },

    changeConversionOrder() {
      this.vibrate();
      const aux = this.from;
      this.from = this.to;
      this.to = aux;
    },

    vibrate() {
      vibrator.vibrate(30);
    },
  },
});
</script>

<style scoped lang="scss">
Page {
  background-image: linear-gradient(
    to bottom,
    #d8e0ec,
    #dfe3ed,
    #e5e6ed,
    #eaeaed,
    #eeeeee
  );
}

ActivityIndicator {
  color: #656565;
}

.line {
  height: 2px;
  background: linear-gradient(to left, #65656513, #656565, #65656513);
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

.inputField {
  border-width: 5px;
  border-color: #6565651e;
  background-color: rgba(187, 187, 187, 0.2);
}

.switch-curency-icon {
  font-size: 30;
}
</style>
