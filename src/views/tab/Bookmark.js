import React, { useContext, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Bookmark, LeftIcon, RightIcon } from '../../components/icons';

import { BookmarkContext, LanguageContext, ThemeContext } from '../../context';

const SaveView = ({ navigation }) => {
  const { mode, darkMode } = useContext(ThemeContext);
  const { bookmarks } = useContext(BookmarkContext);
  const { strings } = useContext(LanguageContext);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content');
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(mode.colors.background);
    }, [darkMode]),
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.preferences}
      onPress={() => navigation.navigate('Detail', { data: item })}
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
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => navigation.goBack()}
        >
          <LeftIcon width={24} color={mode.colors.icon} />
        </TouchableOpacity>
        <Text style={{ color: mode.colors.foreground, fontSize: 24 }}>
          {strings.bookmarks}
        </Text>
      </View>
      <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
        {bookmarks.length > 0 ? (
          <FlatList
            data={bookmarks}
            keyExtractor={(item) => item.url.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Bookmark
              color={mode.colors.primary}
              size={72}
              style={{ marginBottom: 12 }}
            />
            <Text style={{ fontSize: 16, color: mode.colors.icon }}>
              {strings.noBookmark}
            </Text>
          </View>
        )}
      </View>
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
