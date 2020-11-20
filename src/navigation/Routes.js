import React, { useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

import { AuthContext } from '../context';

import { Loading } from '../components';

import AuthStack from './AuthStack';
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
    // try {
    //   const userRef = firestore().collection('users');
    //   const snap = await userRef.doc(user?.uid).get();
    //   if (user !== undefined) {
    //     setUser(snap.data());
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    setUser(user);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 555);
    }
  };

  if (loading) {
    return <Loading />;
  }

  // return user ? <TabNavigator /> : <AuthStack />;
  return !isAuth ? <TabNavigator /> : <AuthStack />;

  // return <TabNavigator />;
};
