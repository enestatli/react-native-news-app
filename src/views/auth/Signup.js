import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { FormButton, FormInput } from '../../components';
import { Eye, EyeOff, NewsIcon } from '../../components/icons';
import { AuthContext, LanguageContext } from '../../context';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import { theme } from '../../utils/theme';

const SignupView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [hide, setHide] = useState(true);

  const { register, error, setError } = useContext(AuthContext);
  const { strings } = useContext(LanguageContext);

  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.logoFrame}>
        <NewsIcon width={72} color={theme.colors.icon} />
        <Text style={[styles.logo, { color: theme.colors.foreground }]}>
          CKMCM
        </Text>
      </View>
      <FormInput
        value={name}
        placeholderText={strings.name}
        lines={1}
        onChangeText={(name) => setName(name)}
        autoCorrect={false}
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

      <View>
        <FormInput
          value={password}
          placeholderText={strings.password}
          lines={1}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={hide}
          onPress={() => setHide(!hide)}
          show={hide}
        />
        <TouchableOpacity style={styles.eye} onPress={() => setHide(!hide)}>
          {hide ? (
            <EyeOff size={24} color={theme.colors.icon} />
          ) : (
            <Eye size={24} color={theme.colors.icon} />
          )}
        </TouchableOpacity>
      </View>
      {error.length > 0 && (
        <Text style={{ fontSize: 12, color: theme.colors.danger }}>
          {error}
        </Text>
      )}
      <FormButton
        buttonTitle={strings.signup}
        onPress={() => register(email, password, name)}
        extraStyle={{ backgroundColor: theme.colors.primary }}
      />
      <View style={styles.footer}>
        <Text style={{ color: theme.colors.icon }}>{strings.haveAccount}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
            if (error) {
              setError('');
            }
          }}
        >
          <Text style={{ color: theme.colors.icon }}>{strings.loginNow}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFrame: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginBottom: 24,
    letterSpacing: 10.5,
  },
  close: {
    position: 'absolute',
    top: 32,
    left: 16,
    zIndex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth / 1.5,
  },
  eye: {
    position: 'absolute',
    bottom: windowHeight / 30,
    right: 12,
  },
});
