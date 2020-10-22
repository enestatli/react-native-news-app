import React, { useState } from 'react';

import { darkTheme, theme } from '../utils/theme';

export const ThemeContext = React.createContext({});

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const values = {
    mode: darkMode ? darkTheme : theme,
    darkMode: darkMode,
    setDarkMode: () => {
      setDarkMode((p) => !p);
    },
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
