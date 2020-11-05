import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { changeLanguage, strings } from '../utils/translation/translate';

const LanguageDefaultContext = {
  langModalVisible: false,
  toggleLangModal: () => {},
};

export const LanguageContext = createContext(LanguageDefaultContext);

export const LanguageProvider = ({ children }) => {
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [langCode, setLangCode] = useState('');

  React.useEffect(() => {
    (async () => {
      try {
        if (
          strings
            .getAvailableLanguages()
            .includes(strings.getInterfaceLanguage())
        ) {
          setLangCode('en');
        } else {
          const value = await AsyncStorage.getItem('appLanguage');
          if (langCode === null) {
            //TODO null ise veya set ettigi dile esitse, undefined degilse!!
            setLangCode(strings.getInterfaceLanguage().substring(0, 2));
          } else {
            strings.setLanguage(value);
            // setLangCode(value);
          }
        }
      } catch (err) {
        console.log('error while setting default/fallback language', err);
      }
    })();
  }, []);

  const values = {
    langModalVisible,
    toggleLangModal: () => {
      setLangModalVisible(!langModalVisible);
    },
    strings,
    changeLanguage,
    langCode,
  };

  return (
    <LanguageContext.Provider value={values}>
      {children}
    </LanguageContext.Provider>
  );
};
