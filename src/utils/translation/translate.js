import LocalizedStrings from 'react-native-localization';

import { english, chinese, turkish } from './languages';

let strings = new LocalizedStrings({
  en: english,
  tr: turkish,
  zh: chinese,
});

export { strings };

export const changeLanguage = (languageKey) => {
  strings.setLanguage(languageKey);
};
