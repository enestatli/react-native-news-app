import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import codePush from 'react-native-code-push';

import {
  LanguageProvider,
  NotificationProvider,
  ThemeProvider,
  TimerContextProvider,
} from './context';

import Providers from './navigation';

//TODO responsive design!

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

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

export default codePush(codePushOptions)(App);
