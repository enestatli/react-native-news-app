import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Placeholder from './Placeholder';

//TODO optimize trendNews flatlist maybe width height 100%

const TrendNews = ({ navigation, trendNews, str }) => {
  const dateFormat = (date) => {
    const monthIndex = date.substring(5, 7).replace(/^0+/, '');
    const monthName = str.months[monthIndex - 1];
    const day = date.substring(8, 10).replace(/^0+/, '');
    const year = date.substring(0, 4);
    const hour = date.substring(11, 16);
    const formated =
      monthName + ' ' + day + ',' + ' ' + year + ' ' + '-' + ' ' + hour;

    return formated;
  };

  return (
    <View style={styles.trendNewsContainer}>
      <FlatList
        style={{ width: '100%', height: '100%' }}
        data={trendNews}
        keyExtractor={(item) => item.url.toString()}
        initialNumToRender={7}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ marginRight: 12 }} />}
        // ListEmptyComponent={() => <Placeholder />}
        // getItemLayout={(trendNews, index) => {
        //   return {
        //     length: 183,
        //     offset: 183 * index,
        //     index,
        //   };
        // }}
        renderItem={({ item }) => (
          <View style={styles.trendNews}>
            <TouchableOpacity
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
                      : 'https://images.unsplash.com/photo-1592312040171-267aa90d4783?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1376&q=80',
                }}
                style={{ width: 283, height: 183, borderRadius: 6 }}
                resizeMode="cover"
              />

              <Text style={styles.trendNewsTitle}>
                {item.title.slice(0, 60) +
                  (item.title.length > 60 ? '...' : '')}
              </Text>
              <Text style={styles.trendNewsTime}>
                {dateFormat(item.publishedAt)}
              </Text>
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
    height: 183,
    marginTop: 24,
    width: '100%',
  },
  trendNews: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendNewsTitle: {
    position: 'absolute',
    color: 'white',
    paddingHorizontal: 12,
    fontWeight: 'bold',
    fontSize: 16,
    top: 85,
  },
  trendNewsTime: {
    position: 'absolute',
    color: 'white',
    paddingHorizontal: 12,
    fontSize: 12,
    fontWeight: 'bold',
    bottom: 15,
  },
});
