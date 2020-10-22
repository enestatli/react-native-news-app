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
  const [hide, setHide] = useState(true);

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
      <TouchableOpacity style={styles.close}>
        <Close width={24} color="black" />
      </TouchableOpacity>
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
          secureTextEntry={hide}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 208,
            right: 70,
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
  close: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
});
