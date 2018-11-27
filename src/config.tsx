/**
 * @module Config
 */
import * as React from "react";
import Languages from "./services/trans/languages";

/**
 * configuration object
 */
const config = {
    // apiUrl: "http://192.168.1.42:9092/",
    apiUrl: "http://87.98.188.77:9092/",
    NewApiUrl: "https://api.becopay.com",
    gateWayUrl: "https://gateway.becopay.com",
    language: Languages.fa,
    languages: Languages,
    keycloakConfig: {
        url: "https://accounts.becopay.com/auth",
        realm: "master",
        clientId: "application",
        checkLoginIframe: false,
    },
    currencies: {
        IRR: {
            name: "IRR",
            type: "fiat",
            markets: ["BTC", "ETH", "LTC"],
        },
        USD: {
            name: "USD",
            type: "fiat",
            markets: ["BTC", "ETH", "LTC"],
        },
        EUR: {
            name: "EUR",
            type: "fiat",
            markets: ["BTC"],
        },
        BTC: {
            name: "Bitcoin",
            depositeWallet: "btcbeygizasdfrwgsdfgsdfgsdfdfsgsfdgdfg",
            confirmationNumber: 5,
            type: "crypto",
            markets: ["ETH", "LTC"],
        },
        ETH: {
            name: "Ethereum",
            depositeWallet: "etherasdfrwgsdfgsdfgsdfgdfsgsfdgdfg",
            confirmationNumber: 20,
            type: "crypto",
            markets: ["LTC"],
        },
        LTC: {
            name: "Litecoin",
            depositeWallet: "litecoin1weasrtasdf4rtsadfsdfsd4s54sddfdf",
            confirmationNumber: 16,
            type: "crypto",
            markets: [],
        },
    },
    icons:
    {
        BTC: <i className="cc BTC-alt"></i>,
        USD: <span>$</span>,
        IRR: <span>﷼</span>,
        ETH: <i className="cc ETH-alt"></i>,
        LTC: <i className="cc LTC-alt"></i>,
    },
    marketsOptions:
    {
        "BTC:IRR": {
            priceStep: 100000,
            amountStep: 0.01,
            priceFloatedNums: 0,
        },
        "ETH:IRR": {
            priceStep: 100000,
            amountStep: 0.1,
            priceFloatedNums: 0,
        },
        "LTC:IRR": {
            priceStep: 50000,
            amountStep: 0.5,
            priceFloatedNums: 0,
        },
        "BTC:USD": {
            priceStep: 50,
            amountStep: 0.1,
            priceFloatedNums: 2,
        },
        "ETH:USD": {
            priceStep: 1,
            amountStep: 0.5,
            priceFloatedNums: 2,
        },
        "LTC:EUR": {
            priceStep: 0.5,
            amountStep: 1,
            priceFloatedNums: 3,
        },
        "BTC:EUR": {
            priceStep: 50,
            amountStep: 0.1,
            priceFloatedNums: 2,
        },
        "ETH:BTC": {
            priceStep: 0.005,
            amountStep: 1,
            priceFloatedNums: 4,
        },
        "LTC:BTC":
        {
            priceStep: 0.00001,
            amountStep: 10,
            priceFloatedNums: 6,
        },
        "LTC:ETH": {
            priceStep: 0.0005,
            amountStep: 1,
            priceFloatedNums: 4,
        },
    },
};

export default config;
