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
        USD: {
            name: "US dollar",
            balance: 0,
            depositeWallet: "asdxzasdfrwgsdfgsdfgsdfgdfsgsfdgdfg",
            confirmationNumber : 10,
        },
        ETH: {
                name : "Ethereum",
                balance: 0,
                depositeWallet: "asdxzasdfrwgsdfgsdfgsdfgdfsgsfdgdfg",
                confirmationNumber : 20,
        },

    },
    icons :
    {
        BTC :  ["fab", "btc"],
        USD : ["fas", "dollar-sign"],
        ETH : ["fab", "ethereum"],
    },
};

export default config;
