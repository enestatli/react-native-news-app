import React, { useContext } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { ThemeContext } from '../context';

//TODO optimize trendNews flatlist maybe width height 100%

const TrendNews = ({ navigation, trendNews }) => {
  const { mode } = useContext(ThemeContext);

  const dateFormat = (date) => {
    var mthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const monthIndex = date.substring(5, 7).replace(/^0+/, '');
    const monthName = mthNames[monthIndex - 1];
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
        horizontal={true}
        showsHorizontalScrollIndicator={false}
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
    //TODO flex:1, and also drop marginTop, recentNews margin too!!
    height: 183,
    marginTop: 32,
    width: '100%',
  },
  trendNews: {
    paddingRight: 12,
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
