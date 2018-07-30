import axios from "axios";
import * as _ from "lodash";
import config from "../../../src/config";
import { updateUser } from "../../redux/app/actions";
import { updateUserBalance } from "../../redux/app/actions";
import { updateMarketCryptos } from "../../redux/app/actions";
import { store } from "../../redux/store";

export default class Seeder {

    public constructor() {
        // empty;
    }

    public initialSeed() {
        this.setBalance();
        this.setMarket();
        setInterval(() => { this.setMarket(); }, 10000);
    }

    public setMarket() {
        return axios.get("https://api.coinmarketcap.com/v2/ticker/?convert=BTC&limit=10").then((response) => {
            const cryptos: any = {};
            for (const currency of Object.keys(response.data.data)) {
                cryptos[response.data.data[currency].symbol] = response.data.data[currency];

                // add random value to prices
                const usdPrice = cryptos[response.data.data[currency].symbol].quotes.USD.price;
                const btcPrice = cryptos[response.data.data[currency].symbol].quotes.BTC.price;
                const multipler = _.random(0.9995, 1.0005);
                cryptos[response.data.data[currency].symbol].quotes.USD.price = multipler * usdPrice;
                cryptos[response.data.data[currency].symbol].quotes.BTC.price = multipler * btcPrice;

            }
            // update redux store directly
            store.dispatch(updateMarketCryptos(cryptos));
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
        };
        store.dispatch(updateUserBalance(balanceData));
    }

}
