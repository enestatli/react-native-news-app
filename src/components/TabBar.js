import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Bookmark, HomeIcon, SettingsIcon, ChatBubble } from './icons';

const TabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            style={styles.otherButtons}
            key={label}
            onPress={onPress}
          >
            {label === 'Mentions' && (
              <ChatBubble size={24} color="#777" focused={isFocused} />
            )}
            {label === 'Home' && <HomeIcon width={24} color="#777" />}
            {label === 'Bookmark' && <Bookmark size={24} color="#777" />}
            {label === 'Settings' && <SettingsIcon width={24} color="#777" />}
            <View
              style={[
                styles.focused,
                isFocused &&
                  label !== 'Mentions' && { backgroundColor: 'black' },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  otherButtons: {
    flex: 1,
    // flexDirection: 'column',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  focused: {
    width: 4,
    height: 4,
    marginTop: 2,
    backgroundColor: 'white',
  },
  icons: {
    width: 24,
    color: 'blue',
  },
});

export default TabBar;
