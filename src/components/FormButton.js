import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { windowHeight, windowWidth } from '../utils/dimensions';

const FormButton = ({ buttonTitle, ...props }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, props.extraStyle]}
      {...props}
    >
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 6,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 24,
    color: '#ffffff',
  },
});
