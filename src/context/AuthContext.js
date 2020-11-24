import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  //TODO fix timetoread!!!

  React.useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('auth');
        if (value) {
          setIsAuth(JSON.parse(value));
        }
      } catch (err) {
        console.log(
          'error while getting isAuth value from storage',
          err.message,
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
          await AsyncStorage.setItem('auth', JSON.stringify(false));
          setIsAuth(false);
        } else {
          setError('Email or passowrd cannot be empty');
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

  const register = async (email, password) => {
    try {
      if (isAuth) {
        if (email && password) {
          await auth().createUserWithEmailAndPassword(email, password);
          setError('');
          setIsAuth(false);
          await AsyncStorage.setItem('auth', JSON.stringify(false));
        } else {
          setError('Email or passowrd or name cannot be empty');
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
        setError('The password is not strong enough');
      }
    }
  };

  const logout = async () => {
    try {
      if (!isAuth) {
        await auth().signOut();
        setError('');
        setIsAuth(false);
        await AsyncStorage.setItem('auth', JSON.stringify(false));
      }
    } catch (err) {
      console.log('error while logging out', err);
    }
  };

  const values = {
    user,
    setUser,
    error,
    setError,
    login,
    register,
    logout,
    isAuth,
    setIsAuth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
