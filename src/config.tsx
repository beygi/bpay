import Languages from "./services/trans/languages";
const config = {
    // apiUrl: "http://192.168.1.42:9092/",
    apiUrl: "http://87.98.188.77:9092/",
    language: Languages.en,
    keycloakConfig : {
        url: "https://aas.avazcoin.com/auth",
        realm: "master",
        clientId: "application",
        checkLoginIframe: false,
    },
};

export default config;
