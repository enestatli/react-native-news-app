import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';

import { windowHeight, windowWidth } from '../utils/dimensions';

const FormInput = ({ labelValue, placeholderText, lines, ...props }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.inputFrame}
    >
      <TextInput
        style={[styles.input, props.extraStyles]}
        value={labelValue}
        numberOfLines={lines}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...props}
      />
    </KeyboardAvoidingView>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputFrame: {
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: '100%',
    fontSize: 16,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#b1b1b1',
  },
});
