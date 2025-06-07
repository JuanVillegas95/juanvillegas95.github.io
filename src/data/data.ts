import { homeDataEnglish, homeDataJapanese, homeDataSpanish } from "./home";
import { asideDataEnglish, asideDataJapanese, asideDataSpanish } from "./aside";
import {
  entriesDataEnglish,
  entriesDataJapanese,
  entriesDataSpanish,
} from "./entries";

export const data = {
  en: {
    home: homeDataEnglish,
    aside: asideDataEnglish,
    entries: entriesDataEnglish,
  },
  es: {
    home: homeDataSpanish,
    aside: asideDataSpanish,
    entries: entriesDataSpanish,
  },
  ja: {
    home: homeDataJapanese,
    aside: asideDataJapanese,
    entries: entriesDataJapanese,
  },
};
