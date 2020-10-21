import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FormButton, FormInput } from '../../components';

import { AuthContext } from '../../context';

const LoginView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
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
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />
      <Text>{error}</Text>
      <FormButton
        buttonTitle="Login"
        onPress={() => login(email, password)}
        extraStyle={{ backgroundColor: 'red' }}
      />
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={[styles.navButtonText, { color: 'red' }]}>
          New user? Join here!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginView;

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
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 20,
  },
});
