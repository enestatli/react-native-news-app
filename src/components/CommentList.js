import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext, ThemeContext } from '../context';

import { Bubble, Close } from './icons';

import firestore from '@react-native-firebase/firestore';
import md5 from 'md5';

const CommentList = ({ closeModal, addList, data }) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState('');
  const { mode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const commentsRef = firestore().collection('testComments');

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  const addComment = async (url) => {
    const d = new Date().toString().split(' ');
    const submitTime =
      d[2] +
      ' ' +
      d[1] +
      ' ' +
      d[3] +
      ' ' +
      d[4].split(':').splice(0, 2).join(':');
    const timestamp = new Date().getTime();

    const commentData = {
      id: timestamp,
      userId: user.id,
      name: user.email,
      imgUrl: 'avatarUrl',
      commentText,
      submitTime,
    };

    setComment([...comment, commentData]);

    try {
      if (url) {
        console.log('URL???');
        const newUrl = md5(url);
        const checkedRef = commentsRef.doc(newUrl);
        if (!(await checkedRef.get()._exists)) {
          await checkedRef.collection('comments').add(commentData);
          // await checkedRef.collection('comments').add({ comment: 'test' });

          await checkedRef.set(data);
        }
      }
    } catch (err) {
      console.log('error while adding comment to firebase', err);
    }
    setCommentText('');
    Keyboard.dismiss();
  };

  // useEffect(() => {
  //   console.log(comment);
  // }, [comment]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: mode.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ padding: 20, marginTop: StatusBar.currentHeight }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: mode.colors.foreground,
          }}
        >
          {data.title.split('- ')[0]}
        </Text>
      </View>
      {/* Comment Input */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
        }}
      >
        <View style={{ position: 'relative', flex: 1 }}>
          <TextInput
            placeholder="Add to comments"
            style={[styles.input, { backgroundColor: mode.colors.card }]}
            backgroundColor="white"
            maxLength={140}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={commentText}
            onChangeText={(text) => setCommentText(text)}
            // onSubmitEditing={() => addComment(data.url, comment)}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 10,
              top: 12,
            }}
            onPress={toggleBottomSheet}
          >
            <Image
              source={{ uri: data.urlToImage }}
              style={{ width: 36, height: 36, borderRadius: 9999 }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={
            commentText.length > 0
              ? () => addComment(data.url)
              : () => closeModal()
          }
        >
          {commentText.length > 0 ? (
            <Bubble width={24} color={mode.colors.icon} />
          ) : (
            <Close color={mode.colors.icon} />
          )}
        </TouchableOpacity>
      </View>
      {/* Comment List */}
      <View style={{ flex: 1, padding: 20, zIndex: 9999 }}>
        <FlatList
          data={comment}
          keyExtractor={(item) => item.id?.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={{
                marginTop: 12,
                padding: 10,
                backgroundColor: mode.colors.card,
                borderRadius: 6,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{ uri: data.urlToImage }}
                  style={{ width: 30, height: 30, borderRadius: 9999 }}
                />
                <Text style={{ paddingLeft: 10, color: mode.colors.icon }}>
                  {item.name}
                </Text>
              </View>
              <View style={{ flexDirection: 'column', marginTop: 12 }}>
                <Text style={{ color: mode.colors.icon }}>
                  {item.commentText}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: mode.colors.icon,
                      fontWeight: '100',
                    }}
                  >
                    {' '}
                    {item.submitTime}
                  </Text>
                  <TouchableOpacity style={{ paddingLeft: 10 }}>
                    <Text style={{ color: mode.colors.primary }}>Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    height: 120,
    paddingTop: 20,
    paddingLeft: 52,
    paddingRight: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    color: 'black',
    backgroundColor: 'whitesmoke',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  closeButton: {
    height: 52,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
});
