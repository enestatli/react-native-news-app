import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { LeftIcon, RightIcon } from '../../components/icons';
import { AuthContext, ThemeContext } from '../../context';

const Columnist = ({ navigation }) => {
  const { mode } = React.useContext(ThemeContext);
  const [commentedNews, setCommentedNews] = React.useState([]);
  const { user } = React.useContext(AuthContext);
  const commentsRef = firestore().collection('testComments');

  //TODO add removeBookmarks button to check if commentsBy and
  //SavedBy empty delete article completely

  React.useEffect(() => {
    (async () => {
      try {
        //TODO fetch only commented news
        //TODO order articles by date
        const snap = await commentsRef.get();
        // console.log(snap.docs[4].data().commentsBy);
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
          const commentsByUser = [];
          articlesWithComments.map((article) => {
            article.commentsBy.map((comment) => {
              if (comment.name === user.email) {
                commentsByUser.push(comment);
              }
            });
          });
        }
      } catch (err) {
        console.log('error while fetching commented news', err.message);
      }
    })();
  }, []);

  //TODO change tab columnist icon to chat/message icon

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.preferences}
      onPress={() => navigation.navigate('Detail', { data: item })}
    >
      <Text
        style={{
          fontSize: 16,
          color: mode.colors.icon,
        }}
      >
        {item.title?.slice(0, 32) + (item.title?.length > 32 ? '...' : '')}
      </Text>

      <RightIcon
        width={24}
        color={mode.colors.icon}
        style={{ marginLeft: 'auto' }}
      />
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
      <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
        <FlatList
          data={commentedNews}
          keyExtractor={(item) => item.url.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
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
});
