import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

import { darkTheme, theme } from '../utils/theme';

export const ThemeContext = React.createContext({});

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = async (value) => {
    try {
      setDarkMode(!value);
      await AsyncStorage.setItem('theme', JSON.stringify(!value));
    } catch (err) {
      console.log('error when storing theme mode', err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const val = await AsyncStorage.getItem('theme');
        const parsedVal = JSON.parse(val);
        if (parsedVal !== null) {
          setDarkMode(parsedVal);
        }
      } catch (err) {
        console.log('error while getting theme mode from storage', err);
      }
    })();
  }, [darkMode]);

  const values = {
    mode: darkMode ? darkTheme : theme,
    darkMode: darkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
