/**
 * @module Tools
 */
import * as _ from "lodash";
import config from "../../../src/config";
import { store } from "../../redux/store";

/**
 * a tool class which is provie useful functions
 */
export default class Tools {

    /** returns price of any symbol (fiat or crypto)
     *   based on another symbol(fiat or crypto)
     *    this function uses redux store to access informations
     */
    public static getPrice(fromSymbol: string, toSymbol: string) {
        return this.getUsdRate(fromSymbol) * (1 / this.getUsdRate(toSymbol));
    }

    /** returns usd rate of any symbol (fiat or crypto)
     *    this function uses redux store to access informations
     */
    public static getUsdRate(symbol: string) {
        let symbolRatetoUsd = 0;
        if (config.currencies[symbol].type === "fiat") {
            if (!_.get(store.getState(), `app.market.forex.${symbol}`, false)) {
                return 0;
            }
            symbolRatetoUsd = (1 / _.get(store.getState(), `app.market.forex.${symbol}`, 0));
        }
        if (config.currencies[symbol].type === "crypto") {
            symbolRatetoUsd = _.get(store.getState(), `app.market.cryptos.${symbol}.quotes.USD.price`, 0);
        }
        return symbolRatetoUsd;
    }

    /** returns usd price of any symbol value (fiat or crypto)
     *    this function uses redux store to access informations
     */
    public static getUsdPrice(symbol: string, value: number) {
        const rate = this.getUsdRate(symbol);
        return rate * value;
    }
    public constructor() {
        // empty;
    }
}
