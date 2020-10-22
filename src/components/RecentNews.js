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

const RecentNews = ({ recentNews, navigation }) => {
  const { mode } = useContext(ThemeContext);

  const renderItem = ({ item }) => (
    <View style={[styles.recentNews, { backgroundColor: mode.colors.card }]}>
      <TouchableOpacity
        style={styles.recentNewsButton}
        onPress={() => navigation.navigate('DetailView', { data: item })}
      >
        <Image
          source={{ uri: item.urlToImage }}
          style={{ width: 106, height: 151, borderRadius: 6 }}
        />
        <View
          style={{
            padding: 12,
          }}
        >
          <View style={styles.recentNewsBody}>
            <Text
              style={{
                fontSize: 13,
                color: mode.colors.icon,
                fontWeight: 'bold',
              }}
            >
              {item.title}
            </Text>
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
        Recent News
      </Text>
      <FlatList
        style={{ width: '100%', height: '100%' }}
        // maxToRenderPerBatch={10}
        initialNumToRender={1}
        data={recentNews}
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
    marginTop: 20,
    marginBottom: 40,
  },
  recentNews: {
    marginTop: 10,
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
