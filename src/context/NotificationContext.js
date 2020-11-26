import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleNotification } from '../utils/notification.android';
import { Alert } from 'react-native';

export const NotificationContext = React.createContext({});

export const NotificationProvider = ({ children }) => {
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [isAppBackground, setIsAppBackground] = useState(false);
  const [data, setData] = useState(null);

  const getNotifyData = (article) => {
    setData(article);
  };

  const toggleNotifications = async (value) => {
    try {
      setEnableNotifications(!value);
      await AsyncStorage.setItem('notification', JSON.stringify(!value));
    } catch (err) {
      Alert.alert(
        'Error occured',
        'error when adding notification value to storage try again please',
      );
    }
  };

  //TODO fix topheadlines data notify data

  useEffect(() => {
    (async () => {
      try {
        const val = await AsyncStorage.getItem('notification');
        const parsedVal = JSON.parse(val);
        if (parsedVal !== null) {
          setEnableNotifications(parsedVal);
        }
        if (parsedVal || parsedVal === null) {
          if (isAppBackground) {
            if (data) {
              scheduleNotification(
                'Son Dakika',
                data.title,
                'channel-id',
                'red',
                'https://raw.githubusercontent.com/rebus007/HeaderView/master/img/ic_launcher-web.png',
              );
            }
          }
        }
      } catch (err) {
        Alert.alert(
          'Error occured',
          'Error while getting notification value from storage try again please',
        );
      }
    })();
  }, [enableNotifications, isAppBackground, data]);

  const values = {
    enableNotifications,
    toggleNotifications,
    setIsAppBackground,
    getNotifyData,
  };

  return (
    <NotificationContext.Provider value={values}>
      {children}
    </NotificationContext.Provider>
  );
};
