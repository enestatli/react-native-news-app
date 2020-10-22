import React, { useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../context';
import { Loading } from '../components';

import AuthStack from './AuthStack';

import { TabNavigator } from './TabStack';

export const Routes = () => {
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useContext(AuthContext);

  const onAuthStatechanged = async (user) => {
    console.log(user);
    // const userRef = firestore().collection('users');
    // if (user) {
    //   // const snap = await userRef.doc(user.uid).get();
    //   // setUser(snap.data());
    //   setUser(user);
    //   setLoading(false);
    // }
    setUser(user);
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('listening???');
    const subscriber = auth().onAuthStateChanged(onAuthStatechanged);
    // return () => {
    //   subscriber;
    // };
    return subscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return user ? <TabNavigator /> : <AuthStack />;
};
