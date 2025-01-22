import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationES from "./language/es/translation.json";
import translationEN from "./language/en/translation.json";
import translationPT from "./language/pt/translation.json";
import translationESP from "./language/esp/translation.json";

export default i18next.use(initReactI18next).init({
  resources: {
    es: { translation: translationES },
    en: { translation: translationEN },
    pt: { translation: translationPT },
    esp: { translation: translationESP },
  },
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});
