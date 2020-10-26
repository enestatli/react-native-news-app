import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  AppState,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import md5 from 'md5';

import { Bookmark, Bubble } from '../../components/icons';

import { WebView } from 'react-native-webview';

import Loading from '../../components/Loading';
import {
  AuthContext,
  BookmarkContext,
  SettingsContext,
  ThemeContext,
} from '../../context';
import { AddComment, BottomSheet, CommentList } from '../../components';
import { useTimer } from '../../context/TimerContext';

const DetailView = ({ route, navigation }) => {
  const data = route.params.data;

  //---Context--/
  const { isJSEnabled } = useContext(SettingsContext);
  const { mode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const {
    setUrl,
    isBookmarked,
    setIsBookmarked,
    setBookmarks,
    bookmarks,
  } = useContext(BookmarkContext);

  //---Button,Modal---//
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  //----Comments----//
  const [comms, setComms] = useState([]);
  const [commentText, setCommentText] = useState('');

  //----Bookmarks----//
  // const [isBookmarked, setIsBookmarked] = useState(false);

  //Appstate
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const commentsRef = firestore().collection('testComments');

  //TODO add timestamp recentNews in homeView, add bookmark too!
  //TODO add bookmark, make webview look likes your app with colors, borders etc.
  //TODO cleanup for each useEffects!!

  //TODO virtualizedList error, probably you should give 100% to trendNews
  //TODO saveList and commentList lengths 0 then remove article

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log('Listening even!!!');
  //     const unsubscribe = navigation.addListener('focus', () => {
  //       console.log('hello');
  //     });
  //     return unsubscribe;
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []),
  // );

  // useEffect(() => {
  //   AppState.addEventListener('change', _handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener('change', _handleAppStateChange);
  //   };
  // }, []);

  // const _handleAppStateChange = (nextAppState) => {
  //   if (
  //     appState.current.match(/inactive|background/) &&
  //     nextAppState === 'active'
  //   ) {
  //     console.log('App has come to the foreground!');
  //   }
  //   appState.current = nextAppState;
  //   setAppStateVisible(appState.current);
  //   console.log('Appstate', appState.current);
  // };

  const { timer } = useTimer();

  useEffect(() => {
    timer.resume();

    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (state) => {
    switch (state) {
      case 'active':
        timer.resume();
        console.log(timer.totalTime);
        break;
      //inactive or background
      default:
        timer.pause();
        console.log('app is closed!');
        break;
    }
  };

  const handleNavigationStateChange = () => {
    console.log('BLURRR');
    timer.pause();
  };

  useEffect(() => {
    navigation.addListener('blur', handleNavigationStateChange);
    return () => {
      navigation.addListener('blur', handleNavigationStateChange);
    };
  }, []);

  //TODO resume when focus, stop when blur add to the state totalTime
  //TODO upload to db when blur
  //TODO if totalTime exists upload db with today date
  //TODO when also page refresh upload
  //TODO add share button each news!!
  //TODO javascript ads blocker how to!!!

  useEffect(() => {
    setUrl(data.url);
  }, []);

  useEffect(() => {
    (async () => {
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
    })();
    //TODO depend on data.url so when refresh the page it can fetch comments
  }, []);

  const addComment = async (url) => {
    const d = new Date().toString().split(' ');
    const submitTime =
      d[2] +
      ' ' +
      d[1] +
      ' ' +
      d[3] +
      ' ' +
      d[4].split(':').splice(0, 2).join(':');
    const timestamp = new Date().getTime();

    const commentData = {
      id: timestamp,
      userId: user.id,
      name: user.email,
      imgUrl: 'avatarUrl',
      commentText,
      submitTime,
    };

    setComms([commentData, ...comms]);

    try {
      if (url) {
        const newUrl = md5(url);
        const checkedRef = commentsRef.doc(newUrl);
        const article = (await checkedRef.get()).data();
        if (article !== undefined) {
          article.commentsBy.push(commentData);
          await checkedRef.set(article);
        } else {
          data.commentsBy = [commentData];
          data.savedBy = [];
          await checkedRef.set(data);
        }
      }
    } catch (err) {
      console.log('error while adding comment to article', err);
    }

    setCommentText('');
    Keyboard.dismiss();
  };

  const saveArt = async (url) => {
    try {
      const submitedDate = firestore.FieldValue.serverTimestamp();
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
          data.savedBy = [user.email];
          data.commentsBy = [];
          await ref.set(data);
          setBookmarks([data, ...bookmarks]);
          setIsBookmarked(true);
        }
      }
    } catch (err) {
      console.log('error when clicked bookmark button', err);
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
    setBottomSheetVisible(!bottomSheetVisible);
  };

  //TODO change all fontfamily size!!!

  const defaultFilters = [
    '*://*.doubleclick.net/*',
    '*://partner.googleadservices.com/*',
    '*://*.googlesyndication.com/*',
    '*://*.google-analytics.com/*',
    '*://creative.ak.fbcdn.net/*',
    '*://*.adbrite.com/*',
    '*://*.exponential.com/*',
    '*://*.quantserve.com/*',
    '*://*.scorecardresearch.com/*',
    '*://*.zedo.com/*',
  ];

  const run = `
      document.body.style.backgroundColor = "blue";
      true;
    `;

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
        />
      </BottomSheet>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: mode.colors.background,
          paddingBottom: 12,
        }}
      >
        <TouchableOpacity
          style={{
            height: 48,
            width: '70%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            borderColor: mode.colors.icon,
            borderWidth: 0.1,
            marginLeft: 6,
          }}
          onPress={toggleAddToModal}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'normal',
              color: mode.colors.icon,
            }}
          >
            See all comments
            {comms.length > 0 ? ` (${comms.length})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // paddingHorizontal: 6,
          }}
          onPress={toggleBottomSheet}
        >
          <Bubble width={24} color={mode.colors.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // paddingHorizontal: 6,
          }}
          onPress={
            isBookmarked ? () => removeArt(data.url) : () => saveArt(data.url)
          }
        >
          <Bookmark
            size={24}
            fill={isBookmarked ? mode.colors.icon : 'transparent'}
            color={mode.colors.icon}
          />
        </TouchableOpacity>
      </View>
      <WebView
        source={{ uri: data?.url }}
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
        mediaPlaybackRequiresUserAction={true}
        // javaScriptEnabled={isJSEnabled}

        // onShouldStartLoadWithRequest={(request) => {
        //   if (
        //     request.url.startsWith('http://') ||
        //     request.url.startsWith('https://')
        //   ) {
        //     return true;
        //   }
        // }}

        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        incognito={true}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
        // onError={(syntheticEvent) => {
        //   const { nativeEvent } = syntheticEvent;
        //   nativeEvent.canGoBack = true;
        //   console.warn('WebView error: ', nativeEvent);
        // }}
        // style={{ marginTop: 50 }}
        // style={{ ...StyleSheet.absoluteFillObject }}
        // userAgent={
        //   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'
        // }
        userAgent={
          'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36'
        }
        // injectedJavaScript={run}
        injectJavaScript={run}
        // injectJavaScript={run}
        //TODO try to block ads, for turkish just set to false javascript
      />
    </View>
  );
};

export default DetailView;

const styles = StyleSheet.create({});
