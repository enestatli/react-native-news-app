import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FormButton, FormInput } from '../../components';
import { Close, Eye, EyeOff, NewsIcon } from '../../components/icons';

import { AuthContext, LanguageContext } from '../../context';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import { theme } from '../../utils/theme';

const LoginView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(true);

  const { login, error, setError, setIsAuth } = useContext(AuthContext);
  const { strings } = useContext(LanguageContext);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('white');
    }, []),
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.close} onPress={() => setIsAuth(false)}>
        <Close color="black" />
      </TouchableOpacity>
      <View style={styles.logoFrame}>
        <NewsIcon width={72} color={theme.colors.icon} />
        <Text style={[styles.logo, { color: theme.colors.foreground }]}>
          CKMCM
        </Text>
      </View>
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
        buttonTitle={strings.login}
        onPress={() => login(email, password)}
        extraStyle={{ backgroundColor: theme.colors.primary }}
      />

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={{ color: theme.colors.icon }}>
            {strings.forgotPassword}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
            if (error) {
              setError('');
            }
          }}
        >
          <Text style={{ color: theme.colors.icon }}>{strings.signUpNow}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginView;

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
