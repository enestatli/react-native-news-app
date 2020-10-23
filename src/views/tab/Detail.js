import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// import BottomSheet from '../../components/BottomSheet';
// import CommentList from '../../components/CommentList';
import { Bookmark, Bubble, EyeIcon, TimeIcon } from '../../components/icons';

import WebView from 'react-native-webview';
import Loading from '../../components/Loading';
import { BookmarkContext, ThemeContext } from '../../context';

const DetailView = ({ route, navigation }) => {
  const data = route.params.data;
  const { mode, darkMode } = useContext(ThemeContext);
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const { addToBookmarks, removeFromBookmarks, setUrl } = useContext(
    BookmarkContext,
  );

  //TODO add timestamp recentNews in homeView, add bookmark too!
  //TODO add bookmark, make webview look likes your app with colors, borders etc.

  useEffect(() => {
    setUrl(data.url);
  }, []);

  const toggleAddToModal = () => {
    setAddTodoVisible(!addTodoVisible);
  };

  const run = `
      document.body.style.backgroundColor = 'blue';
      true;
    `;

  return (
    <View style={{ flex: 1 }}>
      {/* <Modal
        animationType="slide"
        visible={addTodoVisible}
        onRequestClose={toggleAddToModal}
        statusBarTranslucent={addTodoVisible && true}
      >
        <CommentList closeModal={toggleAddToModal} data={data} />
      </Modal> */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{
            height: 48,
            width: '80%',
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
            {/* {testComments.length > 0 ? ` (${testComments.length})` : ''} */}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '20%',
          }}
        >
          <Bubble width={24} color={mode.colors.icon} />
        </TouchableOpacity>
      </View>
      <WebView
        source={{ uri: data.url }}
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
        mediaPlaybackRequiresUserAction={true}
        // javaScriptEnabled={false}
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
