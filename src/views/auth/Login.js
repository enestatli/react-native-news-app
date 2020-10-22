import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FormButton, FormInput } from '../../components';
import { Close, Eye, EyeOff, NewsIcon } from '../../components/icons';

import { AuthContext } from '../../context';
import { theme } from '../../utils/theme';

const LoginView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(true);

  const { login, error } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      // StatusBar.setTranslucent(false);
      Platform.OS === 'android' && StatusBar.setBackgroundColor('white');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

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
      {/* <TouchableOpacity style={styles.close}>
        <Close width={24} color="black" />
      </TouchableOpacity> */}
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
            secureTextEntry={hide}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 82,
              right: 12,
            }}
            onPress={() => setHide(!hide)}
          >
            {hide ? (
              <Eye size={24} color={'black'} />
            ) : (
              // TODO EyeOff does not shown
              <Close size={24} color={'black'} />
            )}
          </TouchableOpacity>
          <FormButton
            buttonTitle="Login"
            onPress={() => login(email, password)}
            extraStyle={{ backgroundColor: theme.colors.primary }}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <Text>Forgot your password ? </Text>
          <TouchableOpacity>
            <Text style={{ color: theme.colors.primary }}>
              Reset your password.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerRow}>
          <Text>Don't have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{ color: theme.colors.primary }}>Sign up now!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginView;

const styles = StyleSheet.create({
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
