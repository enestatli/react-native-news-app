import React, { useContext, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Avatar, Close, NewsIcon, SearchIcon } from './icons';
import { windowWidth } from '../utils/dimensions';
import { AuthContext } from '../context';

const Header = ({ setQuery, theme, query, setIsSubmit }) => {
  const widthValue = useRef(new Animated.Value(windowWidth / 3)).current;
  const { user } = useContext(AuthContext);

  const onToggleSearchFocus = (isFocused) => {
    Animated.timing(widthValue, {
      toValue: isFocused ? windowWidth / 2 : windowWidth / 3,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* left */}
      <TouchableOpacity style={styles.left}>
        <NewsIcon width={24} color={theme.colors.icon} />
        <Text style={[styles.leftText, { color: theme.colors.icon }]}>
          CKMCM
        </Text>
      </TouchableOpacity>
      {/* right */}
      <View style={styles.right}>
        <Animated.View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginRight: 12,
            width: widthValue,
          }}
        >
          <TextInput
            style={[
              styles.input,
              {
                borderColor: theme.colors.foreground,
                color: theme.colors.foreground,
              },
            ]}
            onFocus={() => onToggleSearchFocus(true)}
            onBlur={() => onToggleSearchFocus(false)}
            placeholder="Search news"
            placeholderTextColor={theme.colors.icon}
            onChangeText={(query) => setQuery(query)}
            value={query}
            onSubmitEditing={() => query.length > 3 && setIsSubmit(true)}
          />
          {query ? (
            <TouchableOpacity
              style={{ position: 'absolute', right: 12 }}
              onPress={() => {
                setIsSubmit(false);
                setQuery('');
              }}
            >
              <Close color={theme.colors.icon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ position: 'absolute', right: 12 }}
              onPress={() => onToggleSearchFocus(true)}
            >
              <SearchIcon color={theme.colors.icon} />
            </TouchableOpacity>
          )}
        </Animated.View>

        <Avatar
          size={30}
          color={theme.colors.primary}
          authColor={user ? theme.colors.primary : 'transparent'}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 12,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftText: {
    marginLeft: 6,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  input: {
    borderWidth: 0.2,
    width: '100%',
    height: 32,
    borderRadius: 2,
    paddingLeft: 12,
    paddingVertical: 0,
    marginRight: 6,
  },
});
