import React, { useContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import isEqual from 'lodash.isequal';
import md5 from 'md5';

import { AuthContext } from './AuthContext';

export const BookmarkContext = React.createContext({});

export const BookmarkProvider = ({ children }) => {
  const [url, setUrl] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { user } = useContext(AuthContext);

  const commentsRef = firestore().collection('testComments');

  useEffect(() => {
    (async () => {
      try {
        if (url) {
          const newUrl = md5(url);
          const article = (await commentsRef.doc(newUrl).get()).data();
          if (article !== undefined) {
            if (article.savedBy.includes(user.email)) {
              setIsBookmarked(true);
            } else {
              setIsBookmarked(false);
            }
          } else {
            setIsBookmarked(false);
          }
        }
      } catch (err) {
        console.log('error while fetching bookmarkeds', err);
      }
    })();
  }, [url]);

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          const snap = await commentsRef.orderBy('publishedAt', 'desc').get();
          const saveList = [];
          snap.docs.forEach((doc) => {
            const article = doc.data();
            if (article.savedBy.includes(user.email)) {
              saveList.push(article);
            }
          });
          setBookmarks(saveList);
        }
      } catch (err) {
        console.log('error while fetching bookmark list', err);
      }
    })();
  }, []);

  const values = {
    bookmarks,
    isBookmarked,
    setIsBookmarked: (bool) => {
      setIsBookmarked(bool);
    },
    setBookmarks: (art) => {
      setBookmarks(art);
    },
    setUrl: (u) => {
      setUrl(u);
    },
  };

  return (
    <BookmarkContext.Provider value={values}>
      {children}
    </BookmarkContext.Provider>
  );
};
