import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { windowHeight, windowWidth } from '../utils/dimensions';

const FormInput = ({ labelValue, placeholderText, lines, ...props }) => {
  return (
    <TextInput
      style={[styles.input, props.extraStyles]}
      value={labelValue}
      numberOfLines={lines}
      placeholder={placeholderText}
      placeholderTextColor="#666"
      {...props}
    />
  );
};

export default FormInput;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
