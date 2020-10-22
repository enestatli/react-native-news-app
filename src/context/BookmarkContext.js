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

  const usersRef = firestore().collection('usersCollection');

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          const snap = await usersRef
            .doc(user.id)
            .collection('bookmarks')
            .orderBy('addedAt', 'desc')
            .get();
          const bookmarkList = [];
          snap.docs.forEach((doc) => {
            const article = doc.data();
            bookmarkList.push(article);
          });
          if (!isEqual(bookmarkList, bookmarks)) {
            setBookmarks(bookmarkList);
          }
        }
      } catch (err) {
        console.log('error while fetching bookmarks from fire', err);
      }
    })();
  }, [user]);

  useEffect(() => {
    console.log(url);
    if (url) {
      if (bookmarks.length > 0) {
        const isBooked = bookmarks.find((item) => item.url === url);
        setIsBookmarked(isBooked);
      }
    }
  }, [url, isBookmarked, bookmarks]);

  const addToBookmarks = async (data) => {
    const submitedDate = firestore.FieldValue.serverTimestamp();
    try {
      data.addedAt = submitedDate;
      setBookmarks([data, ...bookmarks]);
      setIsBookmarked(true);
    } catch (err) {
      console.log('error while adding favorite data on UI', err);
    }
    try {
      if (user) {
        const newUrl = md5(data.url);
        await usersRef
          .doc(user.id)
          .collection('bookmarks')
          .doc(newUrl)
          .set({ ...data, addedAt: submitedDate });
      }
    } catch (err) {
      console.log('error while adding to fire', err);
    }
  };

  const removeFromBookmarks = async (data) => {
    try {
      const indexOfData = bookmarks.indexOf(data);
      if (indexOfData > 0) {
        bookmarks.splice(indexOfData, 1);
      } else {
        bookmarks.shift();
      }
      setBookmarks([...bookmarks]);
      setIsBookmarked(false);
    } catch (err) {
      console.log('error while adding favorite data on UI', err);
    }
    try {
      if (user) {
        const newUrl = md5(data.url);
        await usersRef
          .doc(user.id)
          .collection('bookmarks')
          .doc(newUrl)
          .delete();
      }
    } catch (err) {
      console.log('error while removing from fire', err);
    }
  };

  const values = {
    bookmarks,
    isBookmarked,
    setBookmarks,
    removeFromBookmarks,
    addToBookmarks,
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
