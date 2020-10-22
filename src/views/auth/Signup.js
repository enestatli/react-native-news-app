import React, { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { color } from 'react-native-reanimated';

import { FormButton, FormInput } from '../../components';
import { Close, Eye, EyeOff, NewsIcon } from '../../components/icons';
import { AuthContext } from '../../context';
import { theme } from '../../utils/theme';

const SignupView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, error } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: 'white',
        // paddingTop: StatusBar.currentHeight - 30,
        // paddingTop: 12,
        paddingHorizontal: 16,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        style={{
          alignItems: 'center',
          // justifyContent: 'center',
          marginTop: 75,
        }}
      >
        <NewsIcon width={100} color="black" />
      </View>

      <View style={styles.card}>
        <FormInput
          // value={name}
          placeholderText="Name"
          lines={1}
        />
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
          extraStyle={{ backgroundColor: theme.colors.primary }}
        />
      </View>
      <View style={styles.footer}>
        <Text>Already have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: theme.colors.primary }}>Login now</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupView;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 24,
  },
});
