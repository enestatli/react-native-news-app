import React, { useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

import { AuthContext } from '../context';

import { Loading } from '../components';

import { TabNavigator } from './TabStack';

export const Routes = () => {
  const [loading, setLoading] = useState(true);

  const { user, setUser, isAuth, setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    //TODO needed cleanup to be fixed!
    const subscriber = auth().onAuthStateChanged(onAuthStatechanged);
    return () => {
      subscriber;
    };
  }, []);

  // useEffect(() => {
  //   if(!user.displayName){
  //     auth().currentUser.updateProfile({
  //       displayName:name
  //     })
  //   }
  // },[])

  const onAuthStatechanged = async (user) => {
    // if(!user.displayName){
    //   auth().currentUser.updateProfile({
    //     displayName:name
    //   })
    // }

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
