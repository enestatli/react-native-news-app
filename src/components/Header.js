import React, { useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Avatar, NewsIcon, SearchIcon } from './icons';
import { windowWidth } from '../utils/dimensions';

const Header = ({ setQuery, theme }) => {
  const widthValue = useRef(new Animated.Value(windowWidth / 3)).current;

  const onToggleSearchFocus = (isFocused) => {
    Animated.timing(widthValue, {
      toValue: isFocused ? windowWidth / 2 : windowWidth / 3,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
      }}
    >
      {/* left */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <NewsIcon width={24} color={theme.colors.icon} />
        <Text
          style={{
            marginLeft: 6,
            fontWeight: 'bold',
            letterSpacing: 1.2,
            color: theme.colors.icon,
          }}
        >
          CKMCM
        </Text>
      </TouchableOpacity>
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
            marginRight: 12,
            width: widthValue,
          }}
        >
          <TextInput
            style={{
              borderColor: theme.colors.icon,
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
            onChangeText={(query) => setQuery(query)}
          />
          <TouchableOpacity
            style={{ position: 'absolute', right: 12 }}
            onPress={() => onToggleSearchFocus(true)}
          >
            <SearchIcon />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity>
          {/* TODO if user auth fill avatar */}
          <Avatar
            size={30}
            color={theme.colors.primary}
            authColor={true ? theme.colors.primary : ''}
          />
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
