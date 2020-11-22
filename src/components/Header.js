import React, { useContext, useRef } from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemeContext } from '../context';

import { Avatar, NewsIcon, SearchIcon } from './icons';

const Header = ({ tabs, selected, onPress, setQuery, nav }) => {
  // const flexValue = useRef(new Animated.Value(1)).current;
  const { mode } = useContext(ThemeContext);
  const widthValue = useRef(new Animated.Value(100)).current;

  //get mode as prorp from home screen

  const onToggleSearchFocus = (isFocused) => {
    Animated.timing(widthValue, {
      toValue: isFocused ? 180 : 150,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
      }}
    >
      {/* left */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <NewsIcon width={24} color={mode.colors.icon} />
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>C K M C M</Text>
        </TouchableOpacity>
      </View>
      {/* right */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            width: widthValue,
          }}
        >
          <TextInput
            style={{
              borderColor: mode.colors.icon,
              borderWidth: 0.5,
              width: '100%',
              height: 32,
              borderRadius: 6,
              paddingLeft: 12,
              paddingVertical: 0,
              marginRight: 6,
            }}
            onFocus={() => onToggleSearchFocus(true)}
            onBlur={() => onToggleSearchFocus(false)}
            placeholder="Search news"
          />
          <TouchableOpacity style={{ position: 'absolute', right: 12 }}>
            <SearchIcon />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={{ marginLeft: 'auto' }}>
          <Avatar size={30} color={mode.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  input: {
    width: '50%',
    height: 36,
    paddingLeft: 12,
    borderRadius: 6,
  },
  anim: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
});
