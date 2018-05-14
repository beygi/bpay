import Languages from "./services/trans/languages";
const config = {
    apiUrl: "http://127.0.0.1:80/",
    language: Languages.en,
    keycloakConfig : {
        url: "https://51.38.197.75/auth",
        realm: "master",
        clientId: "webapp",
        checkLoginIframe: false,
    },
};

export default config;
