import React, { useContext, useEffect, useState } from 'react';

import {
  Alert,
  Keyboard,
  Modal,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import md5 from 'md5';

import { Bookmark, Bubble, ShareIcon } from '../../components/icons';

import { WebView } from 'react-native-webview';

import Loading from '../../components/Loading';
import {
  AuthContext,
  BookmarkContext,
  LanguageContext,
  SettingsContext,
  ThemeContext,
} from '../../context';
import { AddComment, BottomSheet, CommentList } from '../../components';

const DetailView = ({ route, navigation }) => {
  const data = route.params.data;

  //---Context--/
  const { isJSEnabled } = useContext(SettingsContext);
  const { mode } = useContext(ThemeContext);
  const { user, setIsAuth } = useContext(AuthContext);
  const {
    setUrl,
    isBookmarked,
    setIsBookmarked,
    setBookmarks,
    bookmarks,
  } = useContext(BookmarkContext);
  const { strings } = useContext(LanguageContext);

  //---Button,Modal---//
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  //----Comments----//
  const [comms, setComms] = useState([]);
  const [commentText, setCommentText] = useState('');

  const [dbUser, setDbUser] = useState(null);

  //----Bookmarks----//

  const commentsRef = firestore().collection('articles');

  const usersRef = firestore().collection('users');

  useEffect(() => {
    const unsub = navigation.addListener('focus', async () => {
      try {
        if (user) {
          const snap = (await usersRef.doc(user.uid).get()).data();
          if (snap) {
            setDbUser(snap);
          }
        } else {
          setDbUser(null);
        }
      } catch (error) {
        Alert.alert(
          'Error happened',
          'Please refresh the app some error occured in database',
        );
      }
    });
    return unsub;
  }, [navigation, user]);

  useEffect(() => {
    setUrl(data.url);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        if (data.url) {
          const newUrl = md5(data.url);
          const article = (await commentsRef.doc(newUrl).get()).data();
          if (article !== undefined) {
            const commentsList = article.commentsBy;
            setComms(commentsList);
          }
        }
      } catch (err) {
        console.log('error while getting comments', err);
      }
    });

    return unsubscribe;
  }, [navigation, data.url]);

  const authButton = () =>
    Alert.alert(
      'No Authentication Detected',
      'You have to login to save the news',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Login', onPress: () => setIsAuth(true) },
      ],
      { cancelable: true },
    );

  const addComment = async (url, publishedAt, sourcName, title, urlToImage) => {
    try {
      if (user) {
        const d = new Date().toString().split(' ');
        const submitTime =
          d[2] +
          ' ' +
          d[1] +
          ' ' +
          d[3] +
          ' ' +
          d[4].split(':').splice(0, 2).join(':');

        const commentData = {
          id: user.uid,
          name: dbUser?.name,
          commentText,
          submitTime,
        };

        setComms([commentData, ...comms]);
        if (url) {
          const newUrl = md5(url);
          const checkedRef = commentsRef.doc(newUrl);
          const article = (await checkedRef.get()).data();
          if (article !== undefined) {
            article.commentsBy.push(commentData);
            await checkedRef.set(article);
          } else {
            await checkedRef.set({
              commentsBy: [commentData],
              savedBy: [],
              url,
              publishedAt,
              sourcName,
              title,
              urlToImage,
            });
          }
        }
      } else {
        authButton();
      }
    } catch (err) {
      console.log('error while adding comment to article', err.message);
    }

    setCommentText('');
    Keyboard.dismiss();
  };

  const saveArt = async (url, publishedAt, sourcName, title, urlToImage) => {
    try {
      if (user) {
        const newUrl = md5(url);
        if (newUrl) {
          const ref = commentsRef.doc(newUrl);
          const article = (await ref.get()).data();
          if (article !== undefined) {
            if (!article.savedBy.includes(user.email)) {
              article.savedBy.push(user.email);
              setIsBookmarked(true);
              setBookmarks([article, ...bookmarks]);
            }
            await ref.set({ ...article });
          } else {
            const data_ = {
              savedBy: [user.email],
              commentsBy: [],
              url,
              publishedAt,
              sourcName,
              title,
              urlToImage,
            };
            await ref.set(data_);
            setBookmarks([data_, ...bookmarks]);
            setIsBookmarked(true);
          }
        }
      } else {
        authButton();
      }
    } catch (err) {
      console.log('error when clicked bookmark button', err.message);
    }
  };

  const removeArt = async (url) => {
    try {
      const ind = bookmarks.findIndex((bookmark) => bookmark.url === url);
      if (ind > 0) {
        bookmarks.splice(ind, 1);
      } else {
        bookmarks.shift();
      }
      const newUrl = md5(url);
      if (newUrl) {
        const ref = commentsRef.doc(newUrl);
        const article = (await ref.get()).data();

        const savedUsers = article.savedBy;
        const savedIndex = savedUsers.indexOf(user.email);

        if (savedIndex > 0) {
          savedUsers.splice(savedIndex, 1);
        } else {
          savedUsers.shift();
        }

        setIsBookmarked(false);
        await ref.set({ ...article });
      }
    } catch (err) {
      console.log('error when clicked UNbookmark button', err);
    }
  };

  const toggleAddToModal = () => {
    setAddTodoVisible(!addTodoVisible);
  };

  const toggleBottomSheet = () => {
    if (user) {
      setBottomSheetVisible(!bottomSheetVisible);
    } else {
      authButton();
    }
  };

  const onShare = async () => {
    try {
      let text = `${data.title} \n\nSee more about the news...\nDownload World News App\n`;
      if (Platform.OS === 'android') {
        text = text.concat(
          'https://play.google.com/store/apps/details?id=com.tdksozlukreactnative',
        );
      } else {
        text = text.concat('https://itunes.apple.com');
      }
      await Share.share({
        title: 'Cekmecem News',
        // message: data.title,
        message: text,
        url: 'app://cekmecemnews',
      });
    } catch (err) {
      console.log('error while trying to share a news', err.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 12,
        backgroundColor: mode.colors.background,
      }}
    >
      <Modal
        animationType="slide"
        visible={addTodoVisible}
        onRequestClose={toggleAddToModal}
        statusBarTranslucent={addTodoVisible && true}
      >
        <CommentList
          closeModal={toggleAddToModal}
          data={data}
          addComment={addComment}
          comms={comms}
          commentText={commentText}
          setCommentText={setCommentText}
          str={strings}
          authenticated={user ? true : false}
        />
      </Modal>
      <BottomSheet
        closeBottomSheet={toggleBottomSheet}
        visible={bottomSheetVisible}
      >
        <AddComment
          data={data}
          commentText={commentText}
          setCommentText={setCommentText}
          addComment={addComment}
          str={strings}
          closeModal={toggleBottomSheet}
          authenticatedUser={dbUser?.name}
        />
      </BottomSheet>
      <View
        style={[
          styles.buttonsContainer,
          { backgroundColor: mode.colors.background },
        ]}
      >
        <TouchableOpacity
          style={[styles.allComments, { borderColor: mode.colors.icon }]}
          onPress={toggleAddToModal}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'normal',
              color: mode.colors.icon,
            }}
          >
            {strings.comments}
            {comms?.length > 0 ? ` (${comms?.length})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherButtons}
          onPress={toggleBottomSheet}
        >
          <Bubble width={24} color={mode.colors.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherButtons}
          onPress={
            isBookmarked
              ? () => removeArt(data.url)
              : () =>
                  saveArt(
                    data.url,
                    data.publishedAt,
                    data.source.name,
                    data.title,
                    data.urlToImage,
                  )
          }
        >
          <Bookmark
            size={24}
            fill={isBookmarked ? mode.colors.icon : 'transparent'}
            color={mode.colors.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.otherButtons} onPress={onShare}>
          <ShareIcon size={24} color={mode.colors.icon} />
        </TouchableOpacity>
      </View>
      <WebView
        style={{ backgroundColor: mode.colors.background }}
        source={{ uri: data?.url }}
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
        mediaPlaybackRequiresUserAction={true}
        javaScriptEnabled={isJSEnabled}
        renderError={() =>
          Alert.alert(
            'Error occured',
            'Website is not reacheable now, maybe try to block ads and flashes on settings',
          )
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        incognito={true}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
        userAgent={
          'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36'
        }
      />
    </View>
  );
};

export default DetailView;

const styles = StyleSheet.create({
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 12,
  },
  allComments: {
    height: 48,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 0.1,
    marginLeft: 6,
  },
  otherButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
