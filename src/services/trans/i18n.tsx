/**
 * @module i18n
 */
import * as i18next from "i18next";
import config from "../../config";

/**
 * our translation class.
 * po files converted to the i18next supported objects
 * using webpack's po loader. stings in po files collected
 * from srouce code using poedit
 */
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
        ar: { translation: require("./ar.po") },
    },
}, (err, t) => {
    // initialized and ready to go!

});
export default i18next;
