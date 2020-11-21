import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  //TODO hold auth asyncstorage

  const login = async (email, password) => {
    try {
      if (isAuth) {
        await auth().signInWithEmailAndPassword(email, password);
        setError('');
        setIsAuth(false);
      }
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError('That email address is invalid!');
      }
      if (err.code === 'auth/wrong-password') {
        setError(
          'The password is invalid or the user does not have a password',
        );
      }
    }
  };

  const register = async (email, password) => {
    try {
      if (isAuth) {
        const registeredUser = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        setError('');
        setIsAuth(false);

        //TODO move this method to another file, you need auth user to logout correctly
        //also add if-else to check wheter user is already created or not

        const id = registeredUser.user.uid;
        //TODO remove test.url from user collection
        const data = { id, email };
        const usersRef = firestore().collection('users');
        await usersRef.doc(id).set(data);
      }
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        setError('That email address is already in use!');
      }

      if (err.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        setError('That email address is invalid!');
      }

      console.log('something else error in register', err);
    }
  };

  const logout = async () => {
    try {
      if (!isAuth) {
        await auth().signOut();
        setError('');
        setIsAuth(true);
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
