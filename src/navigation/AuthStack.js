import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { LoginView, SignupView } from '../views';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginView}
          options={() => {
            return {
              headerShown: false,
            };
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupView}
          options={() => {
            return {
              headerShown: false,
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
