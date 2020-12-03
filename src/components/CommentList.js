import React, { useContext, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemeContext } from '../context';

import { Avatar, Bubble, Close } from './icons';

const CommentList = ({
  closeModal,
  data,
  comms,
  addComment,
  commentText,
  setCommentText,
  str,
  authenticated,
}) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const { mode } = useContext(ThemeContext);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

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
            placeholder={str.writeComment}
            style={[styles.input, { backgroundColor: mode.colors.card }]}
            backgroundColor="white"
            maxLength={140}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={commentText}
            onChangeText={(text) => setCommentText(text)}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 10,
              top: 12,
            }}
            onPress={toggleBottomSheet}
          >
            <Avatar
              size={32}
              color={mode.colors.primary}
              fill={authenticated ? mode.colors.primary : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={
            commentText.length > 0
              ? () =>
                  addComment(
                    data.url,
                    data.publishedAt,
                    data.source?.name,
                    data.title,
                    data.urlToImage,
                  )
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
          data={comms}
          keyExtractor={(item) => item.id + item.submitTime}
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
                <Avatar
                  size={30}
                  color={mode.colors.primary}
                  fill={mode.colors.primary}
                />
                <Text
                  style={{
                    paddingLeft: 10,
                    color: mode.colors.icon,
                  }}
                >
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
                  {/* <TouchableOpacity style={{ paddingLeft: 10 }}>
                    <Text style={{ color: mode.colors.primary }}>Reply</Text>
                  </TouchableOpacity> */}
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
