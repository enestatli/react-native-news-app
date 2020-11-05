import React, { useContext } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemeContext } from '../context';
import Placeholder from './Placeholder';

const RecentNews = ({ articles, navigation, str }) => {
  //TODO move mode, pass from home
  const { mode } = useContext(ThemeContext);

  const renderItem = ({ item }) => (
    <View style={[styles.recentNews, { backgroundColor: mode.colors.card }]}>
      <TouchableOpacity
        style={styles.recentNewsButton}
        onPress={() => navigation.navigate('Detail', { data: item })}
      >
        <Placeholder
          autoRun
          visible={item ? true : false}
          width={106}
          height={151}
        >
          <Image
            source={{
              uri:
                item.urlToImage !== '' && item.urlToImage !== null
                  ? item.urlToImage
                  : 'https://images.unsplash.com/photo-1592312040171-267aa90d4783?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1376&q=80',
            }}
            style={{ width: 106, height: 151, borderRadius: 6 }}
          />
        </Placeholder>

        <View
          style={{
            padding: 12,
          }}
        >
          <View style={styles.recentNewsBody}>
            <Placeholder
              autoRun
              visible={item ? true : false}
              width={150}
              height={12}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: mode.colors.icon,
                  fontWeight: 'bold',
                }}
              >
                {item.title}
              </Text>
            </Placeholder>
            <Placeholder
              shimmerStyle={{ marginTop: 10 }}
              autoRun
              visible={item ? true : false}
              width={225}
              height={80}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: mode.colors.icon,
                  fontWeight: '100',
                }}
              >
                {!item.description
                  ? 'No description title'
                  : item.description?.slice(0, 75) +
                    (item.description?.length > 75 ? '...' : '')}
              </Text>
            </Placeholder>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.recentNewsContainer}>
      <Text
        style={{ fontSize: 22, paddingVertical: 10, color: mode.colors.icon }}
      >
        {str.recentNews}
      </Text>
      <FlatList
        style={{ width: '100%', height: '100%' }}
        // maxToRenderPerBatch={10}
        initialNumToRender={1}
        data={articles}
        keyExtractor={(item) => item.url}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

export default RecentNews;

const styles = StyleSheet.create({
  recentNewsContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 12,
  },
  recentNews: {
    marginTop: 12,
    borderRadius: 6,
    width: '100%',
    backgroundColor: '#F3F3F3',
  },
  recentNewsButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  recentNewsBody: {
    width: Dimensions.get('window').width - (151 + 20),
  },
});
