import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { LeftIcon } from '../../components/icons';
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
        const snap = await commentsRef.get();
        // console.log(snap.docs[4].data().commentsBy);
        if (snap.docs) {
          const cm = [];
          snap.docs.map((doc) => {
            const article = doc.data();
            if (article.commentsBy.length > 0) {
              cm.push(article);
            }
          });
          console.log(cm[0].commentsBy[0].name);
          // const commentsByUser = cm.find((f) => f.commentsBy === user.email);
          const commentsByUser = [];
          cm.map((article) => {
            article.commentsBy.map((comment) => {
              if (comment.name === user.email) {
                commentsByUser.push(comment);
              }
            });
          });
          console.log(commentsByUser);
        }
      } catch (err) {
        console.log('error while fetching commented news', err.message);
      }
    })();
  }, []);

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
          HELLO
          {/* {strings.bookmarks} */}
        </Text>
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
