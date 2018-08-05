import axios from "axios";
import * as _ from "lodash";
import config from "../../../src/config";
import { updateUser } from "../../redux/app/actions";
import { updateMarketCryptos, updateMarketForex, updateUserBalance } from "../../redux/app/actions";
import { store } from "../../redux/store";

export default class Seeder {

    public constructor() {
        // empty;
    }

    public initialSeed() {
        this.setBalance();
        this.setMarket();
        this.setForex();
        setInterval(() => { this.setMarket(); }, 10000);
        setInterval(() => { this.setForex(); }, 60000);
    }

    public setMarket() {
        axios.get("https://api.coinmarketcap.com/v2/ticker/?convert=BTC&limit=7").then((response) => {
            const cryptos: any = {};
            for (const currency of Object.keys(response.data.data)) {
                cryptos[response.data.data[currency].symbol] = response.data.data[currency];

                // add random value to prices
                const usdPrice = cryptos[response.data.data[currency].symbol].quotes.USD.price;
                const btcPrice = cryptos[response.data.data[currency].symbol].quotes.BTC.price;
                const multipler = _.random(0.9995, 1.0005);

                cryptos[response.data.data[currency].symbol].quotes.USD.price = multipler * usdPrice;
                if (response.data.data[currency].symbol !== "BTC") {
                    cryptos[response.data.data[currency].symbol].quotes.BTC.price = multipler * btcPrice;
                }
            }
            // update redux store directly
            store.dispatch(updateMarketCryptos(cryptos));
        });
    }

    public setForex() {
        axios.get("https://exchangeratesapi.io/api/latest?base=USD").then((response) => {
            const rates = response.data.rates;
            // call for irr to usd
            axios.get("http://staging1.b2mark.com/api/").then((irrResponse) => {
                rates.IRR = parseFloat(irrResponse.data.price);
                // update redux store directly
                store.dispatch(updateMarketForex(rates));
            });
        });
    }

    public setBalance() {
        // TODO: random value
        const balanceData = {
            BTC: {
                name: "Bitcoin",
                balance:
                    {
                        available: 123,
                        inOrder: 10,
                        total: 133,
                    },
            },
            USD: {
                name: "US dollar",
                balance: {
                    available: 12,
                    inOrder: 1,
                    total: 13,
                },
            },
            ETH: {
                name: "Ethereum",
                balance: {
                    available: 16,
                    inOrder: 14,
                    total: 30,
                },
            },
            LTC: {
                name: "Litecoin",
                balance: {
                    available: 160,
                    inOrder: 140,
                    total: 300,
                },
            },
        };
        store.dispatch(updateUserBalance(balanceData));
    }

}
