import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import english from "./english.json"
import vietnamese from "./vietnamese.json"
import korea from "./korea.json"
import japan from "./japan.json"
import china from "./china.json"
import thailand from "./thailand.json"
import cambodia from "./cambodia.json"
import laos from "./laos.json"
import indonesia from "./indonesia.json"

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
        en: english,
        vn: vietnamese,
        kp: korea,
        jp: japan,
        cn: china,
        th: thailand,
        kh: cambodia,
        la: laos,
        id: indonesia,
    },
    lng: 'en',
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
})

export default i18next