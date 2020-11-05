import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  InteractionManager,
} from 'react-native';
import { ThemeContext } from '../context';

const AddComment = ({
  cancel,
  commentText,
  setCommentText,
  addComment,
  data,
  str,
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
        <Image
          source={{
            uri:
              'https://images.unsplash.com/photo-1603456219070-1aaca0805ec6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 9999,
            marginRight: 10,
          }}
        />
        <Text style={{ color: mode.colors.icon }}>Enes Tatli</Text>
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
            backgroundColor: '#EA3B1E',
            borderRadius: 6,
          }}
          onPress={() => addComment(data.url)}
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
          onPress={cancel}
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
