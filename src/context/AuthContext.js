import React, { createContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const usersRef = firestore().collection('users');

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('auth');
        if (value) {
          setIsAuth(JSON.parse(value));
        }
      } catch (err) {
        Alert.alert(
          'Error',
          'Error while getting authentication value from storage, please restart the app.',
        );
      }
    })();
  }, []);

  const login = async (email, password) => {
    try {
      if (isAuth) {
        if (email && password) {
          await auth().signInWithEmailAndPassword(email, password);
          setError('');
        } else {
          setError('Email or passowrd cannot be empty.');
        }
      }
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError('The email address is badly formatted.');
      }
      if (err.code === 'auth/wrong-password') {
        setError(
          'The password is invalid or the user does not have a password.',
        );
      }
    }
  };

  const register = async (email, password, name) => {
    try {
      if (isAuth) {
        if (email && password) {
          const registeredUser = await auth().createUserWithEmailAndPassword(
            email,
            password,
          );

          setTimeout(async () => {
            const id = registeredUser.user.uid;
            const data = { id, email, name, timeSpent: [] };
            await usersRef.doc(id).set(data);
          }, 500);

          setError('');
        } else {
          setError('Name, email or passowrd cannot be empty.');
        }
      }
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      }

      if (err.code === 'auth/invalid-email') {
        setError('The email address is badly formatted.');
      }

      if (err.code === 'auth/weak-password') {
        setError('The password is not strong enough.');
      }
    }
  };

  const logout = async () => {
    try {
      if (!isAuth) {
        await auth().signOut();
        setError('');
      }
    } catch (err) {
      Alert.alert(
        'Error occured',
        'There is an error while logout, please refresh the app',
      );
    }
  };
  //TODO console.log should be removed for performance issues!!!
  const values = {
    user,
    setUser,
    error,
    setError,
    login,
    register,
    logout,
    isAuth,
    // setIsAuth: (f) => {
    //   setTimeout(() => {
    //     setIsAuth(!f);
    //   }, 1000);
    // },
    setIsAuth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
