import React, { useContext, useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FormButton, FormInput } from '../../components';
import { Close, NewsIcon } from '../../components/icons';

import { AuthContext } from '../../context';

const LoginView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useContext(AuthContext);

  // return (
  //   <View style={styles.container}>
  //     <Text>Login Page</Text>
  //     <FormInput
  //       value={email}
  //       placeholderText="Email"
  //       lines={1}
  //       onChangeText={(userEmail) => setEmail(userEmail)}
  //       autoCapitalize="none"
  //       keyboardType="email-address"
  //       autoCorrect={false}
  //     />
  //     <FormInput
  //       value={password}
  //       placeholderText="Password"
  //       lines={1}
  //       onChangeText={(password) => setPassword(password)}
  //       secureTextEntry={true}
  //     />
  //     <Text>{error}</Text>
  //     <FormButton
  //       buttonTitle="Login"
  //       onPress={() => login(email, password)}
  //       extraStyle={{ backgroundColor: 'red' }}
  //     />
  //     <TouchableOpacity
  //       style={styles.navButton}
  //       onPress={() => navigation.navigate('Signup')}
  //     >
  //       <Text style={[styles.navButtonText, { color: 'red' }]}>
  //         New user? Join here!
  //       </Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: 'white',
        // paddingTop: StatusBar.currentHeight - 30,
        paddingTop: 12,
        paddingHorizontal: 16,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity style={styles.close}>
        <Close width={24} color="black" />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 75,
        }}
      >
        <NewsIcon width={100} color="black" />
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
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
          <FormButton
            buttonTitle="Login"
            onPress={() => login(email, password)}
            extraStyle={{ backgroundColor: 'red' }}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <Text>Forgot your password ?</Text>
          <TouchableOpacity style={{ paddingLeft: 6 }}>
            <Text style={{ color: 'blue' }}>Reset your password.</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerRow}>
          <Text>Don't have an account ?</Text>
          <TouchableOpacity
            style={{ paddingLeft: 6 }}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={{ color: 'blue' }}>Sign up now!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginView;

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: '#f5f5f5',
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // text: {
  //   fontSize: 24,
  //   marginBottom: 10,
  // },
  // navButton: {
  //   marginTop: 15,
  // },
  // navButtonText: {
  //   fontSize: 20,
  // },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  OR: {
    marginVertical: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  footer: {
    // justifyContent: 'flex-end',
    paddingVertical: 24,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
});
