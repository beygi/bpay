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
        btc: {
            name: "Bitcoin",
            balance: 0,
            depositeWallet: "asdxzasdfrwgsdfgsdfgsdfgdfsgsfdgdfg",
            confirmationNumber : 5,
        },
        usd: {
            name: "US dollar",
            balance: 0,
            depositeWallet: "asdxzasdfrwgsdfgsdfgsdfgdfsgsfdgdfg",
            confirmationNumber : 10,
        },
        eth: {
                name : "Ethereum",
                balance: 0,
                depositeWallet: "asdxzasdfrwgsdfgsdfgsdfgdfsgsfdgdfg",
                confirmationNumber : 20,
        },

    },
    icons :
    {
        btc :  ["fab", "btc"],
        usd : ["fas", "dollar-sign"],
        eth : ["fab", "ethereum"],
    },
};

export default config;
