import React from 'react';

import {
  LanguageProvider,
  NotificationProvider,
  ThemeProvider,
  TimerContextProvider,
} from './context';

import Providers from './navigation';

const App = () => {
  return (
    <ThemeProvider>
      <TimerContextProvider>
        <NotificationProvider>
          <LanguageProvider>
            <Providers />
          </LanguageProvider>
        </NotificationProvider>
      </TimerContextProvider>
    </ThemeProvider>
  );
};

export default App;
