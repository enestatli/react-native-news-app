import React, { useState } from 'react';

export const SettingsContext = React.createContext({});

export const SettingsProvider = ({ children }) => {
  const [isJSEnabled, setIsJSEnabled] = useState(false);

  const values = {
    isJSEnabled,
    setIsJSEnabled: () => setIsJSEnabled((p) => !p),
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};
