import Languages from "./services/trans/languages";
const config = {
    apiUrl: "http://127.0.0.1:80/",
    language: Languages.en,
    keycloakConfig: {
        "realm": "master",
        "auth-server-url": "https://51.38.197.75/auth",
        "ssl-required": "external",
        "resource": "webapp",
        "public-client": true,
        "confidential-port": 0,
    },
};

export default config;
