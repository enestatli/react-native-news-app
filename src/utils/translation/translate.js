import LocalizedStrings from 'react-native-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { english, chinese, turkish } from './languages';

let strings = new LocalizedStrings({
  en: english,
  tr: turkish,
  zh: chinese,
});

export const firstLanguage = async () => {
  try {
    const value = await AsyncStorage.getItem('appLanguage');
    if (value) {
      strings.setLanguage(value);
    }
  } catch (err) {
    console.log('error while setting default/fallback language', err.message);
  }
};

export { strings };

export const changeLanguage = (languageKey) => {
  try {
    strings.setLanguage(languageKey);
  } catch (err) {
    console.log('errror while setting language', err.message);
  }
};
