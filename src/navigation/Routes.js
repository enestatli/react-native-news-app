import React, { useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

import { AuthContext } from '../context';

import { Loading } from '../components';

import { TabNavigator } from './TabStack';

export const Routes = () => {
  const [loading, setLoading] = useState(true);

  const { user, setUser, isAuth, setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStatechanged);
    return () => {
      subscriber;
    };
  }, []);

  const onAuthStatechanged = async (user) => {
    setUser(user);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 555);
    }
  };
  //TODO isAuth ? loading!!
  if (loading) {
    return <Loading />;
  }

  // return user ? <TabNavigator /> : <AuthStack />;
  // return !isAuth ? <TabNavigator /> : <AuthStack />;

  return <TabNavigator />;
};
