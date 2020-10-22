import React, { useCallback, useContext, useState } from 'react';
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

import AddListModal from '../../components/AddListModal';
import BottomSheet from '../../components/BottomSheet';
import CommentList from '../../components/CommentList';
import { Bookmark, Bubble, EyeIcon, TimeIcon } from '../../components/icons';
import FireContext from '../../context/fire';
import ThemeContext from '../../context/themeContext';
import { AuthContext } from '../../navigation/AuthProvider';
import WebView from 'react-native-webview';
import Loading from '../../components/Loading';

const DetailView = ({ route, navigation }) => {
  const data = route.params.data;
  const { mode, darkMode } = useContext(ThemeContext);
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const {
    setUrl,
    testComments,
    addToBookmarks,
    removeFromBookmarks,
    isBookmarked,
  } = useContext(FireContext);

  const toggleAddToModal = () => {
    setAddTodoVisible(!addTodoVisible);
  };

  const dateFormat = (date) => {
    var mthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const monthIndex = date.substring(5, 7).replace(/^0+/, '');
    const monthName = mthNames[monthIndex - 1];
    const day = date.substring(8, 10).replace(/^0+/, '');
    const year = date.substring(0, 4);
    const hour = date.substring(11, 16);
    const formated =
      monthName + ' ' + day + ',' + ' ' + year + ' ' + '-' + ' ' + hour;

    return formated;
  };
  React.useEffect(() => {
    setUrl(data.url);
  }, [data.url]);

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        visible={addTodoVisible}
        onRequestClose={toggleAddToModal}
        statusBarTranslucent={addTodoVisible && true}
      >
        <CommentList closeModal={toggleAddToModal} data={data} />
      </Modal>
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
            {testComments.length > 0 ? ` (${testComments.length})` : ''}
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
        //TODO change avatar icon with the pencil svg and put columist view there
        //TODO try to block ads, for turkish just set to false javascript
      />
    </View>
  );
};

export default DetailView;

const styles = StyleSheet.create({});
