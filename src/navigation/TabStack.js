import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeView } from '../views';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={() => {
            return { headerShown: false };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
