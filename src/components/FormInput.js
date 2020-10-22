import React, { useContext } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { AuthContext } from '../context';

import { windowHeight, windowWidth } from '../utils/dimensions';

const FormInput = ({ labelValue, placeholderText, lines, ...props }) => {
  const { setError } = useContext(AuthContext);
  return (
    <TextInput
      style={[styles.input, props.extraStyles]}
      value={labelValue}
      numberOfLines={lines}
      placeholder={placeholderText}
      placeholderTextColor="#666"
      // onFocus={() => setError('')}
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
    borderRadius: 6,
    borderWidth: 0.5,
    fontWeight: 'bold',
    borderColor: '#b1b1b1',
  },
});
