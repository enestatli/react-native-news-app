import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Bookmark, HomeIcon, SettingsIcon } from './icons';

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

        return label === 'Home' ? (
          <View
            style={[styles.homeButtonContainer, { backgroundColor: 'red' }]}
            key={label}
          >
            <TouchableOpacity style={styles.homeButton} onPress={onPress}>
              <HomeIcon width={24} height={24} color="#777777" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.otherButtons}
            key={label}
            onPress={onPress}
          >
            {label === 'Bookmark' && <Bookmark size={24} color="#777" />}
            {label === 'Settings' && (
              <SettingsIcon width={24} height={24} color="#777777" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    // height: 48,
  },
  homeButtonContainer: {
    padding: 24,
    marginTop: -12,
    backgroundColor: '#f9f9f9',
    borderRadius: 9999,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 9999,
  },
  otherButtons: {
    flex: 1,
    flexDirection: 'column',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  focused: {
    width: 4,
    height: 4,
    marginTop: 6,
    backgroundColor: 'white',
  },
  icons: {
    width: 24,
    color: 'blue',
  },
});

export default TabBar;
