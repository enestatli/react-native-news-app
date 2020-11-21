import React, { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { FormButton, FormInput } from '../../components';
import { NewsIcon } from '../../components/icons';
import { AuthContext, LanguageContext } from '../../context';
import { theme } from '../../utils/theme';

const SignupView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, error } = useContext(AuthContext);
  const { strings } = useContext(LanguageContext);

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
          placeholderText={strings.name}
          lines={1}
        />
        <FormInput
          value={email}
          placeholderText={strings.email}
          lines={1}
          onChangeText={(userEmail) => setEmail(userEmail)}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />
        <FormInput
          value={password}
          placeholderText={strings.password}
          lines={1}
          onChangeText={(userPassword) => setPassword(userPassword)}
          secureTextEntry={true}
        />
        <FormButton
          buttonTitle={strings.signup}
          onPress={async () => await register(email, password)}
          extraStyle={{ backgroundColor: theme.colors.primary }}
        />
      </View>
      <View style={styles.footer}>
        <Text>{strings.haveAccount}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: theme.colors.primary }}>
            {strings.loginNow}
          </Text>
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
