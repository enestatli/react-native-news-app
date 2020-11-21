import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  changeLanguage,
  firstLanguage,
  strings,
} from '../utils/translation/translate';

const LanguageDefaultContext = {
  langModalVisible: false,
  toggleLangModal: () => {},
};

export const LanguageContext = createContext(LanguageDefaultContext);

export const LanguageProvider = ({ children }) => {
  const [langModalVisible, setLangModalVisible] = useState(false);

  React.useEffect(() => {
    firstLanguage();
  }, []);

  const values = {
    langModalVisible,
    toggleLangModal: () => {
      setLangModalVisible(!langModalVisible);
    },
    strings,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={values}>
      {children}
    </LanguageContext.Provider>
  );
};
