import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { LeftIcon, RightIcon } from '../../components/icons';
import { AuthContext, ThemeContext } from '../../context';

const Columnist = ({ navigation }) => {
  const { mode } = React.useContext(ThemeContext);
  const [commentedNews, setCommentedNews] = React.useState([]);
  const { user } = React.useContext(AuthContext);
  const commentsRef = firestore().collection('testComments');
  const [showMore, setShowMore] = useState(false);
  const [commentedByUser, setCommentedByUser] = useState([]);
  const [mentioned, setMentioned] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  //TODO add removeBookmarks button to check if commentsBy and
  //SavedBy empty delete article completely

  React.useEffect(() => {
    getCommentedNews();
    // const test = async () => {
    //   await getCommentedNews();
    // };
    // return () => {
    //   test;
    // };
  }, []);

  const getCommentedNews = async () => {
    try {
      const snap = await commentsRef.get();
      if (snap.docs) {
        const articlesWithComments = [];
        snap.docs.map((doc) => {
          const article = doc.data();
          if (article.commentsBy.length > 0) {
            articlesWithComments.push(article);
          }
        });
        setCommentedNews(articlesWithComments);
        //TODO get comments by userId
        if (user !== null) {
          const commentsByUser = [];
          articlesWithComments.map((article) => {
            article.commentsBy.map((comment) => {
              if (comment.name === user.email) {
                if (commentsByUser.indexOf(article) === -1) {
                  commentsByUser.push(article);
                }
              }
            });
          });
          setCommentedByUser(commentsByUser);
        }
      }
      setIsRefreshing(false);
    } catch (err) {
      console.log('error while fetching commented news', err.message);
    }
  };

  const onRefresh = async () => {
    try {
      setIsRefreshing(true);
      await getCommentedNews();
    } catch (err) {
      console.log('error while refreshing comments', err.message);
    }
  };

  //TODO change tab columnist icon to chat/message icon

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.preferences}
      // onPress={() => setShowMore(!showMore)}
      onPress={() => navigation.navigate('Detail', { data: item })}
    >
      <Text
        style={{
          fontSize: 14,
          color: mode.colors.icon,
        }}
      >
        {/* {item.title?.slice(0, 55) + (item.title?.length > 55 ? '...' : '')} */}
        {item.title.slice(0, 177) +
          (showMore
            ? item.title.slice(177, item.title.length)
            : item.title.length > 177
            ? '...'
            : '') +
          ` (${item.commentsBy.length})`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        backgroundColor: mode.colors.background,
        flex: 1,
        paddingVertical: 20,
      }}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => navigation.goBack()}
        >
          <LeftIcon width={24} color={mode.colors.icon} />
        </TouchableOpacity>
        <Text style={{ color: mode.colors.foreground, fontSize: 24 }}>
          {/* {strings.comments} */}
          Konuşulanlar
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <TouchableOpacity
          style={styles.mentionTabButtons}
          onPress={() => setMentioned(false)}
        >
          <Text style={{ color: mode.colors.icon, fontSize: 20 }}>
            Yorumladiklarin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mentionTabButtons}
          onPress={() => setMentioned(true)}
        >
          <Text style={{ color: mode.colors.icon, fontSize: 20 }}>
            Bahsedilenler
          </Text>
        </TouchableOpacity>
        {!mentioned ? (
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 72,
              height: 2,
              backgroundColor: 'red',
              width: 72,
              marginTop: 'auto',
            }}
          />
        ) : (
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 72,
              height: 2,
              backgroundColor: 'red',
              width: 72,
              marginTop: 'auto',
            }}
          />
        )}
      </View>

      <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
        {!mentioned ? (
          commentedByUser.length > 0 ? (
            <FlatList
              data={commentedByUser}
              keyExtractor={(item) => item.url.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>You did not comment any</Text>
            </View>
          )
        ) : (
          <FlatList
            data={commentedNews}
            keyExtractor={(item) => item.url.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
          />
        )}
      </View>
    </View>
  );
};

export default Columnist;

const styles = StyleSheet.create({
  headerContainer: {
    height: 44,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    top: 10,
    paddingHorizontal: 20,
    height: '100%',
  },
  userInfoContainer: {
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoTextContainer: {
    marginLeft: 12,
  },
  preferences: {
    // height: (Dimensions.get('screen').height - 44 - 84) / 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    // marginTop: 6,
    height: 72,
    width: '100%',
    borderRadius: 6,
    // backgroundColor: 'red',
  },
  border: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#c4c4c4',
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoText: {
    marginTop: 6,
  },
  mentionTabButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width / 3,
    height: 32,
    // borderWidth: 1,
    borderRadius: 6,
    // backgroundColor: mode.colors.primary,
  },
});
