import * as i18next from "i18next";
import config from "../../config";

i18next.init({
    interpolation: {
        // React already does escaping
        escapeValue: false,
    },
    keySeparator: false,
    lng: config.language.codeName, // 'en' | 'fa'
    nsSeparator: false,
    react:
        {
            wait: false,
        },
    resources: {
        en: { translation: require("./en.po") },
        fa: { translation: require("./fa.po") },
    },
}, (err, t) => {
    // initialized and ready to go!

});
export default i18next;
