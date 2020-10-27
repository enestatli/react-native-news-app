import React, { useEffect, useState } from 'react';
import Timer from '../utils/Timer';

export const TimerContext = React.createContext({
  newTimer: {},
  timer: null,
});

export const useTimer = () => React.useContext(TimerContext);

export const TimerContextProvider = ({ children }) => {
  const [timer, setTimer] = useState(new Timer());

  useEffect(() => {
    console.log(timer.totalTime, 'TOTAL TIME');
  }, []);

  //TODO move to the index context

  const newTimer = () => {
    setTimer(new Timer());
  };

  return (
    <TimerContext.Provider
      value={{
        newTimer,
        timer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContextProvider;
