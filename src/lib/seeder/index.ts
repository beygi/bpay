import axios from "axios";
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
        /// this.setMarket();
        setInterval(() => { this.setMarket(); }, 30000);
    }

    public setMarket() {
        return axios.get("https://api.coinmarketcap.com/v2/ticker/?convert=BTC&limit=10").then((response) => {
            const cryptos: any = {};
            for (const currency of Object.keys(response.data.data)) {
                cryptos[response.data.data[currency].symbol] = response.data.data[currency];
            }
            // update redux store directly
            console.log(cryptos.BTC.quotes.USD.price);
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
