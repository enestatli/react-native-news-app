import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleNotification } from '../utils/notification.android';

export const NotificationContext = React.createContext({});

export const NotificationProvider = ({ children }) => {
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [isAppBackground, setIsAppBackground] = useState(false);
  const [data, setData] = useState([]);

  const toggleNotifications = async (value) => {
    try {
      setEnableNotifications(!value);
      await AsyncStorage.setItem('notification', JSON.stringify(!value));
    } catch (err) {
      console.log('error when adding notification value to storage', err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const val = await AsyncStorage.getItem('notification');
        const parsedVal = JSON.parse(val);
        if (parsedVal !== null) {
          setEnableNotifications(parsedVal);
        }
        if (parsedVal || parsedVal === null) {
          console.log(typeof parsedVal, parsedVal);
          if (isAppBackground) {
            scheduleNotification(
              'title',
              'message',
              'channel-id',
              'red',
              'https://raw.githubusercontent.com/rebus007/HeaderView/master/img/ic_launcher-web.png',
            );
          }
        }
      } catch (err) {
        console.log('error while getting notification value from storage', err);
      }
    })();
  }, [enableNotifications, isAppBackground]);

  const values = {
    enableNotifications,
    toggleNotifications,
    setIsAppBackground,
  };

  return (
    <NotificationContext.Provider value={values}>
      {children}
    </NotificationContext.Provider>
  );
};
