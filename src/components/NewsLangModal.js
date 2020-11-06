import * as React from 'react';
import {
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { theme } from '../utils/theme';

const data = [
  {
    icon: 'TR',
    name: 'Turkish',
  },
  {
    icon: 'EN',
    name: 'English',
  },
  {
    icon: 'ZH',
    name: 'Chinese',
  },
  {
    icon: 'KU',
    name: 'Kurdish',
  },
];

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

const ConnectWithText = React.memo(() => {
  return (
    <View
      style={{
        position: 'absolute',
        top: height / 2 - ITEM_HEIGHT * 2,
        // width: width * 0.7,
        width: width * 1,
        paddingHorizontal: 14,
      }}
    >
      <Text
        style={{
          color: colors.yellow,
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

const ConnectButton = React.memo(({ onPress }) => {
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
          backgroundColor: colors.yellow,
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 6,
          borderTopLeftRadius: 0,
          backgroundColor: colors.yellow,
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

export default function NewsLang({ toggleModal }) {
  const [index, setIndex] = React.useState(0);
  const onConnectPress = React.useCallback(() => {
    console.log(index);
    toggleModal(false);
    // Alert.alert('Connect with:', data[index].name.toUpperCase());
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
    <View style={styles.container}>
      <StatusBar hidden />
      <ConnectWithText />
      <List
        ref={yellowRef}
        color={colors.yellow}
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
          backgroundColor: colors.yellow,
          width,
          height: ITEM_HEIGHT,
          top: height / 2 - ITEM_HEIGHT / 2,
        }}
      />
      <ConnectButton onPress={onConnectPress} />
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 26,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
});