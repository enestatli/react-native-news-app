import React, { useContext, useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LeftIcon, RightIcon } from '../../components/icons';

import { BookmarkContext, ThemeContext } from '../../context';

const SaveView = ({ navigation }) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isSelectable, setIsSelectable] = useState(false);
  const [selectedList, setSelectedList] = useState([]);

  const { mode, darkMode } = useContext(ThemeContext);
  const { bookmarks } = useContext(BookmarkContext);

  React.useEffect(() => {
    console.log(bookmarks.length);
  }, [bookmarks]);

  const select = (item) => {
    if (!selectedList.includes(item)) {
      console.log('do not included I am adding ');
      selectedList.push(item);
      // setSelectedList([...selectedList, item]);
    } else {
      const itemIndex = selectedList.indexOf(item);
      if (itemIndex > 0) {
        console.log(`my index is ${itemIndex} bigger than 0 let me try remove`);
        selectedList.splice(itemIndex, 1);
      } else if (itemIndex === 0) {
        console.log(`son kalan element im ben index: ${itemIndex}`);

        selectedList.shift();
      }
    }
    setSelectedList([...selectedList]);
  };

  const onLongPress = () => {
    setIsSelectable((f) => !f);
    setSelectedList([]);
  };

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content');
      // StatusBar.setTranslucent(false);
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(mode.colors.background);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [darkMode]),
  );

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.preferences}
      onLongPress={onLongPress}
      onPress={
        isSelectable
          ? () => select(item)
          : () => navigation.navigate('Detail', { data: item })
      }
    >
      <View style={styles.border}>
        <Image
          source={{
            uri:
              item.urlToImage !== '' && item.urlToImage !== null
                ? item.urlToImage
                : 'https://images.unsplash.com/photo-1592312040171-267aa90d4783?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1376&q=80',
          }}
          style={{
            width: 72,
            height: 72,
            borderRadius: 6,
          }}
          resizeMode="cover"
          // resizeMode="contain"
        />
      </View>
      <Text
        style={{
          paddingLeft: 24,
          fontSize: 16,
          color: mode.colors.icon,
        }}
      >
        {item.title?.slice(0, 32) + (item.title?.length > 32 ? '...' : '')}
      </Text>

      <RightIcon
        width={24}
        color={mode.colors.icon}
        style={{ marginLeft: 'auto' }}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        backgroundColor: mode.colors.background,
        flex: 1,
        paddingVertical: 20,
      }}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.leftButton}>
          <LeftIcon width={24} color={mode.colors.icon} />
        </TouchableOpacity>
        <Text style={{ color: mode.colors.foreground, fontSize: 24 }}>
          Bookmarks
        </Text>
      </View>
      {/* User Info */}
      {/* Preferences */}
      <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.url.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
      {/* TODO remove overlay to select items! */}
      {/* <BottomSheet
        closeBottomSheet={toggleBottomSheet}
        visible={false}
        cover={2}
      /> */}
      {/* son */}
    </View>
  );
};

export default SaveView;

const styles = StyleSheet.create({
  headerContainer: {
    height: 44,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    top: 10,
    paddingHorizontal: 20,
    height: '100%',
  },
  userInfoContainer: {
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoTextContainer: {
    marginLeft: 12,
  },
  preferences: {
    // height: (Dimensions.get('screen').height - 44 - 84) / 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    // marginTop: 6,
    height: 72,
    width: '100%',
    borderRadius: 6,
    // backgroundColor: 'red',
  },
  border: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#c4c4c4',
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoText: {
    marginTop: 6,
  },
});
