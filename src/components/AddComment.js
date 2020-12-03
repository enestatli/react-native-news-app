import React, { useContext, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  InteractionManager,
} from 'react-native';

import { ThemeContext } from '../context';
import { Avatar } from '../components/icons';

const AddComment = ({
  commentText,
  setCommentText,
  addComment,
  data,
  str,
  closeModal,
  authenticatedUser,
}) => {
  const inputRef = React.useRef(null);
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (inputRef?.current) {
        inputRef.current.focus();
      }
    });
  }, [inputRef]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Avatar
          size={32}
          color={mode.colors.primary}
          fill={authenticatedUser ? mode.colors.primary : 'transparent'}
        />
        <Text style={{ color: mode.colors.icon, marginHorizontal: 12 }}>
          {authenticatedUser}
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <TextInput
          ref={inputRef}
          placeholder={str.writeComment}
          style={[styles.input, { backgroundColor: mode.colors.card }]}
          backgroundColor="whitesmoke"
          maxLength={140}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          value={commentText}
          onChangeText={(text) => setCommentText(text)}
        />
        <TouchableOpacity
          style={{
            marginTop: 12,
            height: 48,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: mode.colors.primary,
            borderRadius: 6,
          }}
          onPress={() =>
            addComment(
              data.url,
              data.publishedAt,
              data.source?.name,
              data.title,
              data.urlToImage,
            )
          }
        >
          <Text
            style={{
              fontSize: 15,
              color: 'white',
            }}
          >
            {str.send}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 12,
            height: 48,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: mode.colors.card,
            borderRadius: 6,
          }}
          onPress={closeModal}
        >
          <Text
            style={{
              fontSize: 15,
              color: '#Aeaeae',
            }}
          >
            {str.cancel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddComment;

const styles = StyleSheet.create({
  input: {
    // textAlign: 'justify',
    height: 120,
    paddingLeft: 12,
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
});
