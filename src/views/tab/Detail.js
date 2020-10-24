import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  Dimensions,
  Image,
  Keyboard,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import md5 from 'md5';

// import BottomSheet from '../../components/BottomSheet';
// import CommentList from '../../components/CommentList';
import { Bookmark, Bubble, EyeIcon, TimeIcon } from '../../components/icons';

import WebView from 'react-native-webview';
import Loading from '../../components/Loading';
import { AuthContext, BookmarkContext, ThemeContext } from '../../context';
import { AddComment, BottomSheet, CommentList } from '../../components';

const DetailView = ({ route, navigation }) => {
  const data = route.params.data;

  //---Context--/
  const { mode, darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { addToBookmarks, removeFromBookmarks, setUrl } = useContext(
    BookmarkContext,
  );

  //---Button,Modal---//
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  //----Comments----//
  const [comms, setComms] = useState([]);
  const [commentText, setCommentText] = useState('');

  //----Bookmarks----//
  const [isBookmarked, setIsBookmarked] = useState(false);

  const commentsRef = firestore().collection('testComments');

  //TODO add timestamp recentNews in homeView, add bookmark too!
  //TODO add bookmark, make webview look likes your app with colors, borders etc.
  //TODO cleanup for each useEffects!!

  useEffect(() => {
    setUrl(data.url);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (data.url) {
          const newUrl = md5(data.url);
          const snap = await commentsRef
            .doc(newUrl)
            .collection('comments')
            .orderBy('submitTime', 'desc')
            .get();
          const commentList = [];
          snap.docs.forEach((doc) => {
            const comm = doc.data();
            commentList.push(comm);
          });
          //TODO !isEqual commentList, comms
          setComms(commentList);
        }
      } catch (err) {
        console.log('error while getting comments from db', err);
      }
    })();
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

    // try {
    //   if (url) {
    //     console.log('URL???');
    //     const newUrl = md5(url);
    //     const checkedRef = commentsRef.doc(newUrl);
    //     if (!(await checkedRef.get()._exists)) {
    //       await checkedRef.collection('comments').add(commentData);
    //TODO check if data is already there then do not add new data
    //       await checkedRef.set(data);
    //     }
    //   }
    // } catch (err) {
    //   console.log('error while adding comment to firebase', err);
    // }

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

  //TODO comment yapilmamis url'leri de ekle doc'a, cunku her haber yorum yapilmamis olabilir
  const saveArt = async (url) => {
    try {
      const newUrl = md5(url);
      if (newUrl) {
        const ref = commentsRef.doc(newUrl);
        const article = (await ref.get()).data();
        if (article !== undefined) {
          if (!article.savedBy.includes(user.email)) {
            article.savedBy.push(user.email);
            setIsBookmarked(true);
          }
          await ref.set({ ...article });
        } else {
          data.savedBy = [user.email];
          data.commentsBy = [];
          await ref.set(data);
          setIsBookmarked(true);
        }
      }
    } catch (err) {
      console.log('error when clicked bookmark button', err);
    }
  };

  const removeArt = async (url) => {
    try {
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
      console.log('error when clicked bookmark button', err);
    }
  };

  const toggleAddToModal = () => {
    setAddTodoVisible(!addTodoVisible);
  };

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  //TODO change all fontfamily size!!!
  const run = `
      document.body.style.backgroundColor = "blue";
      true;
    `;

  return (
    <View style={{ flex: 1 }}>
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
        }}
      >
        <TouchableOpacity
          style={{
            height: 48,
            width: '70%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: mode.colors.card,
            borderRadius: 6,
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
            // width: '100%',
            paddingHorizontal: 10,
            backgroundColor: 'blue',
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
            // width: '100%',
            backgroundColor: 'red',
            paddingHorizontal: 10,
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
        javaScriptEnabled={false}
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
        injectedJavaScript={run}
        // injectJavaScript={run}
        //TODO try to block ads, for turkish just set to false javascript
      />
    </View>
  );
};

export default DetailView;

const styles = StyleSheet.create({});
