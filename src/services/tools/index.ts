import * as _ from "lodash";
import config from "../../../src/config";
import { store } from "../../redux/store";

export default class Tools {
    public static getUsdRate(symbol) {
        let symbolRatetoUsd = 0;
        if (config.currencies[symbol].type === "fiat") {
            symbolRatetoUsd = (1 / _.get(store.getState(), `app.market.forex.${symbol}`, 0));
        }
        if (config.currencies[symbol].type === "crypto") {
            symbolRatetoUsd = _.get(store.getState(), `app.market.cryptos.${symbol}.quotes.USD.price`, 0);
        }
        return symbolRatetoUsd;
    }
    public static getUsdPrice(symbol, value) {
        const rate = this.getUsdRate(symbol);
        return rate * value;
    }
    public constructor() {
        // empty;
    }
}
