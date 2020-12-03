import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { ChatBubble, LeftIcon } from '../../components/icons';
import { AuthContext, LanguageContext, ThemeContext } from '../../context';

const Mentions = ({ navigation }) => {
  const { mode } = useContext(ThemeContext);
  const [commentedNews, setCommentedNews] = useState([]);
  const { user } = useContext(AuthContext);
  const { strings } = useContext(LanguageContext);
  const commentsRef = firestore().collection('articles');
  const [commentedByUser, setCommentedByUser] = useState([]);
  const [mentioned, setMentioned] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getCommentedNews();
    });

    return unsubscribe;
  }, []);

  const getCommentedNews = async () => {
    try {
      const snap = await commentsRef.orderBy('publishedAt', 'desc').get();
      if (snap.docs) {
        const articlesWithComments = [];
        snap.docs.map((doc) => {
          const article = doc.data();
          if (article.commentsBy.length > 0) {
            articlesWithComments.push(article);
          }
        });
        setCommentedNews(articlesWithComments);
        if (user) {
          const commentsByUser = [];
          articlesWithComments.map((article) => {
            article.commentsBy.map((comment) => {
              if (comment.id === user.uid) {
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

  //TODO add quick filter by countries to comments

  const onRefresh = async () => {
    try {
      setIsRefreshing(true);
      await getCommentedNews();
    } catch (err) {
      Alert.alert(
        'Error occured',
        'Error happened while refreshing the mention list please try again',
      );
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.preferences}
      onPress={() => navigation.navigate('Detail', { data: item })}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: mode.colors.icon,
        }}
      >
        {item.title + ` (${item.commentsBy.length})`}
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
          {strings.mentions}
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
            {strings.yourMentions}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mentionTabButtons}
          onPress={() => setMentioned(true)}
        >
          <Text style={{ color: mode.colors.icon, fontSize: 20 }}>
            {strings.mentioned}
          </Text>
        </TouchableOpacity>
        {!mentioned ? (
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 72,
              height: 2,
              backgroundColor: mode.colors.primary,
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
              backgroundColor: mode.colors.primary,
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
              onRefresh={onRefresh}
              refreshing={isRefreshing}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ChatBubble
                color={mode.colors.primary}
                size={72}
                style={{ marginBottom: 12 }}
              />
              <Text style={{ fontSize: 16, color: mode.colors.icon }}>
                {strings.noComment}
              </Text>
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

export default Mentions;

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
  preferences: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    height: 72,
    width: '100%',
    borderRadius: 6,
  },
  mentionTabButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width / 3,
    height: 32,
    borderRadius: 6,
  },
});
