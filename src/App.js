import React from 'react';

import {
  LanguageProvider,
  NotificationProvider,
  ThemeProvider,
} from './context';
import TimerContextProvider from './context/TimerContext';
import Providers from './navigation';

const App = () => {
  //TODO appstate is background upload to the fb
  //{totalTime:string|number, day:day/month/ and week of the day as number 0,1,2,3,4,5,6}
  //check if today still equals the day then update if not in the obj add new day
  //listen appstate in all APP

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
