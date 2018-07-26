import config from "../../../src/config";
import { updateUser } from "../../redux/app/actions";
import { updateUserBalance } from "../../redux/app/actions";
import { store } from "../../redux/store";

export default class Seeder {

    public constructor() {
        // empty;
    }

    public initialSeed() {
        this.setBalance();
    }

    public setBalance() {
        // TODO: random value
        const balanceData = {
            btc: {
                name: "Bitcoin",
                balance:
                    {
                        available: 123,
                        inOrder: 10,
                        total: 113,
                    },
            },
            usd: {
                name: "US dollar",
                balance: {
                    available: 12,
                    inOrder: 1,
                    total: 11,
                },
            },
            eth: {
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
