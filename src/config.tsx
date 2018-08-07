import * as React from "react";
import Languages from "./services/trans/languages";

const config = {
    // apiUrl: "http://192.168.1.42:9092/",
    apiUrl: "http://87.98.188.77:9092/",
    NewApiUrl: "http://87.98.188.77:9092",
    language: Languages.en,
    keycloakConfig: {
        url: "https://aas.avazcoin.com/auth",
        realm: "master",
        clientId: "application",
        checkLoginIframe: false,
    },
    currencies: {
        BTC: {
            name: "Bitcoin",
            balance: 0,
            depositeWallet: "asdxzasdfrwgsdfgsdfgsdfgdfsgsfdgdfg",
            confirmationNumber : 5,
        },
        ETH: {
                name : "Ethereum",
                balance: 0,
                depositeWallet: "asdxzasdfrwgsdfgsdfgsdfgdfsgsfdgdfg",
                confirmationNumber : 20,
        },
        LTC: {
                name : "Litecoin",
                balance: 0,
                depositeWallet: "litecoin1weasrtasdf4rtsadfsdfsd4s54sddfdf",
                confirmationNumber : 16,
        },
        IRR: {
            name: "IR Rial",
            balance: 0,
            depositeWallet: "asdxzasdfrwgsdfgsdfgsdfgdfsgsfdgdfg",
            confirmationNumber : 10,
        },
        USD: {
            name: "US dollar",
            balance: 0,
            depositeWallet: "asdxzasdfrwgsdfgsdfgsdfgdfsgsfdgdfg",
            confirmationNumber : 10,
        },
    },
    icons :
    {
        BTC :  <i className="cc BTC-alt"></i>,
        USD : <span>$</span>,
        IRR : <span>﷼</span>,
        ETH : <i className="cc ETH-alt"></i>,
        LTC : <i className="cc LTC-alt"></i>,
    },
};

export default config;
