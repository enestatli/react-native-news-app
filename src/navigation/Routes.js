import React, { useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../context';
import { Loading } from '../components';

import AuthStack from './AuthStack';

import { HomeView } from '../views';
import HomeStack, { TabNavigator } from './TabStack';

export const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStatechanged);
    return () => {
      subscriber;
    };
  }, []);

  const onAuthStatechanged = async (user) => {
    const userRef = firestore().collection('users');
    if (user) {
      const snap = await userRef.doc(user.uid).get();
      setUser(snap.data());
      setLoading(false);
    }
    if (initializing) {
      setInitializing(false);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return user ? <TabNavigator /> : <AuthStack />;
};
