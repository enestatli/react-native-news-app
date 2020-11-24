import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import NewsLang from './NewsLangModal';
import Placeholder from './Placeholder';

const RecentNews = ({
  articles,
  navigation,
  str,
  setCountryCode,
  countryCode,
  theme,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  //TODO flatlist placeholder doesn't work!

  const renderItem = ({ item }) => (
    <View style={[styles.recentNews, { backgroundColor: theme.colors.card }]}>
      <TouchableOpacity
        style={styles.recentNewsButton}
        onPress={() => navigation.navigate('Detail', { data: item })}
      >
        <Placeholder
          autoRun
          visible={item.url.length > 0 ? true : false}
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
              visible={item.url.length > 0 ? true : false}
              width={150}
              height={12}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: theme.colors.icon,
                  fontWeight: 'bold',
                }}
              >
                {item.title}
              </Text>
            </Placeholder>
            <Placeholder
              shimmerStyle={{ marginTop: 10 }}
              autoRun
              visible={item.url.length > 0 ? true : false}
              width={225}
              height={80}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: theme.colors.icon,
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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 22,
            paddingVertical: 10,
            color: theme.colors.icon,
          }}
        >
          {str.recentNews}
        </Text>
        <TouchableOpacity
          style={[styles.langButton, { borderColor: theme.colors.icon }]}
          onPress={toggleModal}
        >
          <Text style={{ color: theme.colors.icon }}>
            {countryCode.toUpperCase()}
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          statusBarTranslucent={true}
          onRequestClose={toggleModal}
        >
          <NewsLang
            toggleModal={toggleModal}
            mode={theme}
            setCountryCode={setCountryCode}
          />
        </Modal>
      </View>
      <FlatList
        style={{ width: '100%', height: '100%' }}
        initialNumToRender={7}
        data={articles}
        keyExtractor={(item) => item.url}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        // getItemLayout={(data, index) => {
        //   console.log('get item layout ' + index);
        //   return { length: 140, offset: 140 * index, index };
        // }}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 12 }} />}
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
    // marginTop: 12,
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
  langButton: {
    marginLeft: 'auto',
    borderWidth: 1,
    width: 50,
    height: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
