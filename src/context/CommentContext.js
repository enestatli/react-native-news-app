import React, { useContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from './AuthContext';

export const CommentContext = React.createContext({});

export const CommentProvider = ({ children }) => {
  const [url, setUrl] = useState('');
  const [comments, setComments] = useState([]);

  const { user } = useContext(AuthContext);

  const commentsRef = firestore().collection('testComments');

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          const snap = await commentsRef.doc().where();
        }
      } catch (err) {
        console.log('error while fetching bookmarks from fire', err);
      }
    })();
  }, [user]);

  const values = {
    setUrl: (u) => {
      setUrl(u);
    },
  };

  return (
    <CommentContext.Provider value={values}>{children}</CommentContext.Provider>
  );
};
