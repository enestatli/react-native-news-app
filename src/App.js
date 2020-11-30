import React from 'react';
import RNBootSplash from 'react-native-bootsplash';

import {
  LanguageProvider,
  NotificationProvider,
  ThemeProvider,
  TimerContextProvider,
} from './context';

import Providers from './navigation';

const App = () => {
  React.useEffect(() => {
    (async () => {
      await RNBootSplash.hide({ fade: true });
    })();
  }, []);

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
