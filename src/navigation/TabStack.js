import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import analytics from '@react-native-firebase/analytics';

import { BookmarkView, DetailView, HomeView, SettingsView } from '../views';
import TabBar from '../components/TabBar';
import ColumnistView from '../views/tab/Columnist';
import { BookmarkProvider, SettingsProvider } from '../context';

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
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <SettingsProvider>
      <BookmarkProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() =>
            (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
          }
          onStateChange={async (state) => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute()
              .name;

            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }
            routeNameRef.current = currentRouteName;
          }}
        >
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
      </BookmarkProvider>
    </SettingsProvider>
  );
};
