import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {Translations_en} from "./translations/en/translations"
import {Translations_tr} from "./translations/tr/translations"

i18n
  .use(initReactI18next)
  .init({
    resources:{
       en:{
        translation: Translations_en
       },
       tr:{
        translation: Translations_tr
       }
    },

    interpolation: {
      escapeValue: false // react already safes from xss ???????????????????
    }
  });

  i18n.changeLanguage("tr")