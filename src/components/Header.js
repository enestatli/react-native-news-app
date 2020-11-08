import React, { useContext, useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemeContext } from '../context';

import { Avatar, NewsIcon, SearchIcon } from './icons';

const Header = ({ tabs, selected, onPress, setQuery, nav }) => {
  const flexValue = useRef(new Animated.Value(0.6)).current;
  const { mode } = useContext(ThemeContext);
  //get mode as prorp from home screen

  const onToggleSearchFocus = (isFocused) => {
    Animated.timing(flexValue, {
      toValue: isFocused ? 1 : 0.9,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
      {/* LOGO AND LOGO NAME */}

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
        <NewsIcon width={24} color={mode.colors.icon} />
        <Text
          style={{
            marginLeft: 10,
            fontWeight: 'bold',
            fontSize: 24,
            color: mode.colors.icon,
          }}
        >
          News
        </Text>
      </TouchableOpacity>
      {/* SEACH AND AVATAR */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 'auto',
          // marginHorizontal: 10,
        }}
      >
        <Animated.View style={[styles.anim, { flex: flexValue }]}>
          <TextInput
            style={[styles.input, { backgroundColor: mode.colors.icon }]}
            placeholder="Search news"
            onFocus={() => onToggleSearchFocus(true)}
            onBlur={() => onToggleSearchFocus(false)}
            // value={query}
            onChangeText={(query) => setQuery(query)}
          />

          <TouchableOpacity
            style={{ marginLeft: 'auto', position: 'absolute', right: 0 }}
          >
            <SearchIcon style={{ marginRight: 15 }} />
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={{ marginLeft: 'auto' }}
          onPress={() => nav.navigate('ProfileView')}
        >
          {/* <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1593642702909-dec73df255d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            }}
            // resizeMode="contain"
            style={{
              width: 24,
              height: 24,
              borderRadius: 99999,
            }}
          /> */}
          <Avatar size={24} color={mode.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  input: {
    width: '40%',
    height: 36,
    paddingLeft: 12,
    borderRadius: 6,
    position: 'absolute',
    right: 6,
  },
  anim: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
});
