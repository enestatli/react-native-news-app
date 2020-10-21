import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FormButton, FormInput } from '../../components';
import { AuthContext } from '../../context';

const SignupView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, error } = useContext(AuthContext);

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Text style={[styles.text, { color: 'red' }]}>Create an account</Text>
      <FormInput
        value={email}
        placeholderText="Email"
        lines={1}
        onChangeText={(userEmail) => setEmail(userEmail)}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />
      <FormInput
        value={password}
        placeholderText="Password"
        lines={1}
        onChangeText={(userPassword) => setPassword(userPassword)}
        secureTextEntry={true}
      />
      <FormButton
        buttonTitle="Signup"
        onPress={async () => await register(email, password)}
        extraStyle={{ backgroundColor: 'red' }}
      />
      <Text>{error}</Text>
    </View>
  );
};

export default SignupView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
});
