import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BookmarkView, DetailView, HomeView, SettingsView } from '../views';
import TabBar from '../components/TabBar';
import ColumnistView from '../views/tab/Columnist';
import { BookmarkProvider, SettingsProvider } from '../context';
import TimerContextProvider from '../context/TimerContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeView}
        options={() => {
          return { headerShown: false };
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailView}
        options={() => {
          return { headerShown: false };
        }}
      />
    </Stack.Navigator>
  );
}

export const TabNavigator = () => {
  return (
    <SettingsProvider>
      <BookmarkProvider>
        <TimerContextProvider>
          <NavigationContainer>
            <Tab.Navigator
              tabBarOptions={{ keyboardHidesTabBar: true }}
              initialRouteName="Home"
              tabBar={(props) => <TabBar {...props} />}
            >
              <Tab.Screen name="Bookmark" component={BookmarkView} />
              <Tab.Screen name="Columnist" component={ColumnistView} />
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="Settings" component={SettingsView} />
            </Tab.Navigator>
          </NavigationContainer>
        </TimerContextProvider>
      </BookmarkProvider>
    </SettingsProvider>
  );
};
