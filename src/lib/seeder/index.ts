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
        this.setMarket();
    }

    public setMarket() {
        return axios.get("https://api.coinmarketcap.com/v2/ticker/?limit=10").then((response) => {
            // update redux store directly
            store.dispatch(updateMarketCryptos(response.data.data));
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
