import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { dateFormat } from '../utils/dateFormat';
import { windowWidth } from '../utils/dimensions';
import { onShare } from '../utils/share';
import { ShareIcon } from './icons';

import NewsLang from './NewsLangModal';
import Placeholder from './Placeholder';

const RecentNews = ({
  articles,
  navigation,
  str,
  setCountryCode,
  countryCode,
  theme,
  query,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.recentNewsButton, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate('Detail', { data: item })}
    >
      <Image
        source={{
          uri:
            item.urlToImage !== '' && item.urlToImage !== null
              ? item.urlToImage
              : 'https://images.unsplash.com/photo-1592312040171-267aa90d4783?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1376&q=80',
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text
        style={{
          position: 'absolute',
          bottom: 4,
          left: (windowWidth - (151 + 20)) / 2,
          fontSize: 9,
          fontWeight: 'bold',
          color: theme.colors.foreground,
        }}
      >
        {item.source.name} - {dateFormat(item.publishedAt, str)}
      </Text>
      <View
        style={{
          padding: 12,
        }}
      >
        <View style={styles.recentNewsBody}>
          <Text style={[styles.title, { color: theme.colors.foreground }]}>
            {item.title}
          </Text>

          <Text style={[styles.description, { color: theme.colors.icon }]}>
            {!item.description
              ? ''
              : item.description?.slice(0, 95) +
                (item.description?.length > 95 ? '...' : '')}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 5,
          right: 45,
        }}
        onPress={() => onShare(item)}
      >
        <ShareIcon size={24} color={theme.colors.icon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.recentNewsContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 6,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            paddingVertical: 10,
            color: theme.colors.icon,
          }}
        >
          {str.recentNews}{' '}
          {query && `- ${query[0].toUpperCase() + query.slice(1)}`}
        </Text>
        <TouchableOpacity
          style={[styles.langButton, { borderColor: theme.colors.icon }]}
          onPress={toggleModal}
        >
          <Text style={{ color: theme.colors.icon }}>
            {countryCode.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <NewsLang
          toggleModal={toggleModal}
          mode={theme}
          setCountryCode={setCountryCode}
        />
      </Modal>

      {[1, 2].map((item) => (
        <View style={{ flexDirection: 'row' }} key={item}>
          <Placeholder
            autoRun
            visible={articles ? true : false}
            shimmerStyle={{
              marginBottom: 12,
              borderRadius: 6,
              width: 106,
              height: 151,
            }}
          />
          <View style={{ paddingVertical: articles ? 0 : 10 }}>
            <Placeholder
              autoRun
              visible={articles ? true : false}
              shimmerStyle={{
                marginBottom: 12,
                marginLeft: 12,
                width: 100,
                height: 16,
              }}
            />
            <Placeholder
              autoRun
              visible={articles ? true : false}
              shimmerStyle={{
                marginBottom: 12,
                marginLeft: 12,
                width: windowWidth / 2,
                height: 80,
              }}
            />
          </View>
        </View>
      ))}

      <FlatList
        style={{ width: '100%', height: '100%' }}
        initialNumToRender={7}
        data={articles}
        keyExtractor={(item) => item.url}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 12 }} />}
      />
    </View>
  );
};

export default RecentNews;

const styles = StyleSheet.create({
  recentNewsContainer: {
    flex: 1,
    marginBottom: 12,
  },
  recentNewsButton: {
    width: windowWidth,
    height: windowWidth / 2.7,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  recentNewsBody: {
    width: windowWidth - (151 + 20),
    height: '100%',
  },
  langButton: {
    marginLeft: 'auto',
    borderWidth: 0.5,
    width: 50,
    height: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: windowWidth / 2 - 100, height: '99%', borderRadius: 6 },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    width: '100%',
  },
  description: {
    fontSize: 14,
    fontWeight: 'normal',
    width: '100%',
    height: windowWidth / 5.4,
  },
});
