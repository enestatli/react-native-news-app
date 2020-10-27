import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';

import { BookmarkView, DetailView, HomeView, SettingsView } from '../views';
import TabBar from '../components/TabBar';
import ColumnistView from '../views/tab/Columnist';
import { AuthContext, BookmarkProvider, SettingsProvider } from '../context';
import { useTimer } from '../context/TimerContext';
import { AppState } from 'react-native';

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
  const { timer } = useTimer();
  const timeRef = firestore().collection('users');
  const dateObj = new Date();
  const day = dateObj.getDate();
  const dayId = dateObj.getDay();
  const timeId = dateObj.getTime();
  //TODO add getTime to the timeSpent, and check if it is same with current getTime

  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    timer.resume();
    console.log(user.uid);
    (async () => {
      try {
        const userDoc = (await timeRef.doc(user.uid).get()).data();
        if (userDoc.timeSpent === undefined) {
          userDoc.timeSpent = [{ timeId, dateObj, dayId, day, totalTime: [0] }];
          await timeRef.doc(user.uid).set(userDoc);
        }
      } catch (err) {
        console.log('error while creating timeSpent', err);
      }
    })();

    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  //TODO add collection (new Date()) obj as doc id and try to store each week of the month

  const handleAppStateChange = (state) => {
    switch (state) {
      case 'active':
        timer.resume();
        console.log(timer.totalTime, 'tabstack');
        break;
      // inactive or background
      default:
        timer.pause();
        (async () => {
          try {
            const userDoc = (await timeRef.doc(user.uid).get()).data();
            const ind = userDoc.timeSpent.findIndex((d) => d.dayId === dayId);
            // let total = userDoc.timeSpent[ind].totalTime;
            if (userDoc.timeSpent[ind].timeId !== new Date().getTime()) {
              userDoc.timeSpent[ind].totalTime.push(timer.totalTime);
              // userDoc.timeSpent[ind].totalTime + timer.totalTime;
              // timer.totalTime - userDoc.timeSpent[ind].totalTime;
              await timeRef.doc(user.uid).set(userDoc);
            }
            // userDoc.timeSpent[ind].totalTime = timer.totalTime;
          } catch (err) {
            console.log('error while updating user timeSpent', err);
          }
        })();
        console.log('app is closed!');
        break;
    }
  };

  return (
    <SettingsProvider>
      <BookmarkProvider>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{ keyboardHidesTabBar: true }}
            initialRouteName="Home"
            tabBar={(props) => <TabBar {...props} />}
          >
            <Tab.Screen name="Bookmark" component={BookmarkView} />
            <Tab.Screen name="Columnist" component={ColumnistView} />
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen
              name="Settings"
              component={SettingsView}
              // children={() => <SettingsView propName={timer.totalTime} />}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </BookmarkProvider>
    </SettingsProvider>
  );
};
