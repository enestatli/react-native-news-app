import React, { useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

import { AuthContext } from '../context';

import { Loading } from '../components';

import { TabNavigator } from './TabStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Routes = () => {
  const [loading, setLoading] = useState(true);
  const { setUser, setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (user) => {
      console.log(user);
      setUser(user);
      if (loading) {
        setLoading(false);
        setIsAuth(false);
        await AsyncStorage.setItem('auth', JSON.stringify(false));
      }
    });
    return () => {
      subscriber;
    };
  }, []);

  //TODO isAuth ? loading!!
  if (loading) {
    return <Loading />;
  }

  return <TabNavigator />;
};
