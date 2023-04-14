import en from "./en";
import de from "./de";
import es from "./es";
import fr from "./fr";
import id from "./in";
import jp from "./jp";
import kr from "./kr";
import pt from "./pt";
import ru from "./ru";
import th from "./th";
import vi from "./vi";

export const translation = {
  en,
  de,
  es,
  fr,
  in: id,
  jp,
  kr,
  pt,
  ru,
  th,
  vi,
};

export const languageMap = {
  English: "en",
  German: "de",
  Spanish: "es",
  French: "fr",
  Indonesian: "in",
  Japanese: "jp",
  Korean: "kr",
  Portuguese: "pt",
  PortuguesePortugal: "pt",
  Russian: "ru",
  Thai: "th",
  Vietnamese: "vi",
};

export const ourlang = [
  "English",
  "German",
  "Spanish",
  "French",
  "Indonesian",
  "Japanese",
  "Korean",
  "Portuguese",
  "PortuguesePortugal",
  "Russian",
  "Thai",
  "Vietnamese",
];

// const deviceLanguage = getQuery("lang") || "English";
const deviceLanguage = "English";
const language = ourlang.includes(deviceLanguage)
  ? languageMap[deviceLanguage]
  : "en";
export function translateText(key) {
  // return translation[window.deviceLanguage || 'en'][key];
  return translation[language || "en"][key];
}
