import axios from "axios";
import * as _ from "lodash";
import config from "../../../src/config";
import { updateUser } from "../../redux/app/actions";
import { updateMarketCryptos, updateMarketForex, updateOfficeCashDesks, updateUserBalance } from "../../redux/app/actions";
import { store } from "../../redux/store";
import USER from "../user";

const user = USER.getInstance();

interface IcashDesk {
    symbol: string;
    value: number;
    type: string;
}
export default class Seeder {

    public constructor() {
        // empty;
    }

    public initialSeed() {
        this.setBalance();
        this.setMarket();
        this.setForex();
        this.setOffice();
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
            IRR: {
                name: "IR Rial",
                balance: {
                    available: 1200,
                    inOrder: 100,
                    total: 1300,
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

    public generateCashDesks(symbol) {
        const owes = {};
        let total: number = 0;
        // generate owe cashDesks
        Object.keys(config.currencies).map((currency) => {
            if (currency !== symbol) {
                const cashDesk = {} as IcashDesk;
                cashDesk.symbol = symbol;
                cashDesk.type = `CSD_${currency}`;
                cashDesk.value = _.random(50, 100);
                total += cashDesk.value;
                owes[cashDesk.type] = cashDesk;
            }
        });

        // generate hot, cold and master CashDesks
        const Hot = {} as IcashDesk;
        const Cold = {} as IcashDesk;
        const Master = {} as IcashDesk;

        Hot.symbol = symbol;
        Hot.type = "CSD_HOT";
        Hot.value = 0.2 * total;
        owes[Hot.type] = Hot;

        Cold.symbol = symbol;
        Cold.type = "CSD_COLD";
        Cold.value = 1.8 * total;
        owes[Cold.type] = Cold;

        Master.symbol = symbol;
        Master.type = "CSD_MASTER";
        Master.value = 2.1 * total;
        owes[Master.type] = Master;

        return owes;
    }

    public setOffice() {
        // fill state with back-office sample data

        // check for user permission
        if (user.permission("admin").adminView) {
            // lets seed
            // we need a cashDesk for every currency that we have
            //
            const cashDesks = {};
            Object.keys(config.currencies).map((symbol) => {
                cashDesks[symbol] = this.generateCashDesks(symbol);
            });
            store.dispatch(updateOfficeCashDesks(cashDesks));
        }

        if (store.getState().app.office) {
            // test
        }
    }

}
