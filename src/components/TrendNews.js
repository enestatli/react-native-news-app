import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { dateFormat } from '../utils/dateFormat';
import { windowHeight, windowWidth } from '../utils/dimensions';
import { onShare } from '../utils/share';
import { ShareIcon } from './icons';
import Placeholder from './Placeholder';

const TrendNews = ({ navigation, trendNews, str, theme }) => {
  return (
    <View style={styles.trendNewsContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Placeholder
          autoRun
          visible={trendNews ? true : false}
          shimmerStyle={{
            borderRadius: 6,
            width: windowWidth / 1.5,
            height: windowHeight / 3,
          }}
        />
        <Placeholder
          autoRun
          visible={trendNews ? true : false}
          shimmerStyle={{
            borderRadius: 6,
            marginLeft: 12,
            width: windowWidth / 1.5,
            height: windowHeight / 3,
          }}
        />
      </View>

      <FlatList
        decelerationRate={0}
        snapToInterval={windowWidth / 1.5 + 12}
        snapToAlignment={'center'}
        style={{ width: '100%', height: '100%' }}
        data={trendNews}
        keyExtractor={(item) => item.url.toString()}
        initialNumToRender={7}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ marginRight: 12 }} />}
        renderItem={({ item }) => (
          <View style={styles.trendNews}>
            <TouchableOpacity
              style={{
                height: windowHeight / 3,
                width: windowWidth / 1.5,
              }}
              onPress={() =>
                navigation.navigate('Detail', {
                  data: item,
                })
              }
            >
              <Image
                source={{
                  uri:
                    item.urlToImage !== '' && item.urlToImage !== null
                      ? item.urlToImage
                      : 'https://images.unsplash.com/photo-1436262513933-a0b06755c784?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
                }}
                style={{ width: '100%', height: '100%', borderRadius: 6 }}
                resizeMode="cover"
              />
              <Text
                style={[
                  styles.source,
                  {
                    color: theme.colors.background,
                    backgroundColor: theme.colors.foreground,
                  },
                ]}
              >
                {item.source.name}
              </Text>
              <Text style={styles.trendNewsTitle}>
                {item.title.slice(0, 60) +
                  (item.title.length > 60 ? '...' : '')}
              </Text>
              <Text style={styles.trendNewsTime}>
                {dateFormat(item.publishedAt, str)}
              </Text>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                }}
                onPress={() => onShare(item)}
              >
                <ShareIcon size={24} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default TrendNews;

const styles = StyleSheet.create({
  trendNewsContainer: {
    flex: 1,
    marginBottom: 12,
  },
  trendNews: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendNewsTitle: {
    position: 'absolute',
    color: 'white',
    paddingHorizontal: 12,
    fontWeight: 'bold',
    fontSize: 16,
    bottom: 45,
    height: 70,
  },
  trendNewsTime: {
    position: 'absolute',
    color: 'white',
    paddingHorizontal: 12,
    fontSize: 12,
    fontWeight: 'bold',
    bottom: 15,
  },
  source: {
    fontSize: 12,
    paddingHorizontal: 12,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 15,
    right: 0,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
});
