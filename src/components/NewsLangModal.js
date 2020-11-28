import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { theme } from '../utils/theme';

import data from '../utils/newsLangCode';

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;
const colors = {
  yellow: theme.colors.primary,
  dark: theme.colors.background,
};
const { width, height } = Dimensions.get('window');

const Icon = React.memo(({ icon, color }) => {
  return <Text style={{ color }}>{icon}</Text>;
});

const Item = React.memo(({ icon, color, name, showText }) => {
  return (
    <View style={styles.itemWrapper}>
      {showText ? (
        <Text style={[styles.itemText, { color }]}>{name}</Text>
      ) : (
        // for spacing purposes
        <View />
      )}
      <Icon icon={icon} color={color} />
    </View>
  );
});

const ConnectWithText = React.memo(({ mode }) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: height / 2 - ITEM_HEIGHT * 2,
        width: width,
        paddingHorizontal: 14,
      }}
    >
      <Text
        style={{
          color: mode.colors.icon,
          fontSize: 42,
          fontWeight: '700',
          lineHeight: 52,
        }}
      >
        Select the news language...
      </Text>
    </View>
  );
});

const ConnectButton = React.memo(({ onPress, mode }) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: height / 2 + ITEM_HEIGHT / 2,
        paddingHorizontal: 14,
      }}
    >
      <View
        style={{
          height: ITEM_HEIGHT * 2,
          width: 4,
          backgroundColor: mode.colors.primary,
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 6,
          borderTopLeftRadius: 0,
          backgroundColor: mode.colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 32, fontWeight: '800', color: colors.dark }}>
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const List = React.memo(
  React.forwardRef(
    ({ color, showText, style, onScroll, onItemIndexChange }, ref) => {
      return (
        <Animated.FlatList
          ref={ref}
          data={data}
          style={style}
          keyExtractor={(item) => item.name}
          bounces={false}
          scrollEnabled={!showText}
          scrollEventThrottle={16}
          onScroll={onScroll}
          decelerationRate="fast"
          snapToInterval={ITEM_HEIGHT}
          showsVerticalScrollIndicator={false}
          renderToHardwareTextureAndroid
          contentContainerStyle={{
            paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
            paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
            paddingHorizontal: 20,
          }}
          renderItem={({ item }) => {
            return <Item {...item} color={color} showText={showText} />;
          }}
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.round(
              ev.nativeEvent.contentOffset.y / ITEM_HEIGHT,
            );

            if (onItemIndexChange) {
              onItemIndexChange(newIndex);
            }
          }}
        />
      );
    },
  ),
);

export default function NewsLang({ toggleModal, mode, setCountryCode }) {
  const [index, setIndex] = React.useState(0);
  const onConnectPress = React.useCallback(async () => {
    const code = data[index].icon.toLowerCase();
    setCountryCode(code);
    await AsyncStorage.setItem('newsLanguage', code);
    setTimeout(() => {
      toggleModal(false);
    }, 250);
  }, [index]);
  const yellowRef = React.useRef();
  const darkRef = React.useRef();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  );
  const onItemIndexChange = React.useCallback(setIndex, []);
  React.useEffect(() => {
    scrollY.addListener((v) => {
      if (darkRef?.current) {
        darkRef.current.scrollToOffset({
          offset: v.value,
          animated: false,
        });
      }
    });
  });

  return (
    <View
      style={[styles.container, { backgroundColor: mode.colors.background }]}
    >
      <StatusBar hidden />
      <ConnectWithText mode={mode} />
      <List
        ref={yellowRef}
        color={mode.colors.primary}
        style={StyleSheet.absoluteFillObject}
        onScroll={onScroll}
        onItemIndexChange={onItemIndexChange}
      />
      <List
        ref={darkRef}
        color={colors.dark}
        showText
        style={{
          position: 'absolute',
          backgroundColor: mode.colors.primary,
          width,
          height: ITEM_HEIGHT,
          top: height / 2 - ITEM_HEIGHT / 2,
        }}
      />

      <ConnectButton mode={mode} onPress={onConnectPress} />
      <Item />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme.colors.background,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 24,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
