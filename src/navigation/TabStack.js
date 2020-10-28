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

    (async () => {
      try {
        const userDoc = (await timeRef.doc(user.uid).get()).data();
        if (userDoc.timeSpent === undefined) {
          // userDoc.timeSpent = [{ timeId, dateObj, dayId, day, totalTime: [0] }];
          // userDoc.timeSpent = [{ timeId, dateObj, dayId, day, totalTime: 0 }];
          userDoc.timeSpent = [
            { dateObj, dayId, day, totalTime: [{ t: 0, sessionId: timeId }] },
          ];
        } else {
          const ind = userDoc.timeSpent.findIndex((d) => d.dayId === dayId);
          if (ind === -1) {
            userDoc.timeSpent.push({
              timeId,
              dateObj,
              dayId,
              day,
              totalTime: 0,
            });
          } else {
            // userDoc.timeSpent = [{}]
            console.log('ELSE');
            //TODO check if timeSpent list length equals 7 then reubild
            // userDoc.timeSpent = [{ timeId, dateObj, dayId, day, totalTime: 0 }];
            // await timeRef.doc(user.uid).add(userDoc);
          }
        }
        await timeRef.doc(user.uid).set(userDoc);
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
        break;
      // inactive or background
      default:
        timer.pause();
        (async () => {
          try {
            const userDoc = (await timeRef.doc(user.uid).get()).data();
            const ind = userDoc.timeSpent.findIndex((d) => d.dayId === dayId);
            const tIndex = userDoc.timeSpent[ind].totalTime.findIndex(
              (f) => f.sessionId === timeId,
            );
            console.log(tIndex);
            if (tIndex > -1) {
              console.log(
                userDoc.timeSpent[ind].totalTime[tIndex].t,
                timer.totalTime,
              );
              userDoc.timeSpent[ind].totalTime[tIndex].t = timer.totalTime;
            } else {
              userDoc.timeSpent[ind].totalTime.push({
                t: timer.totalTime,
                sessionId: timeId,
              });
            }

            // if (userDoc.timeSpent[ind].timeId !== new Date().getTime()) {
            //   userDoc.timeSpent[ind].totalTime = timer.totalTime;
            //   // userDoc.timeSpent[ind].totalTime.push(timer.totalTime);
            //   await timeRef.doc(user.uid).set(userDoc);
            // }
            await timeRef.doc(user.uid).set(userDoc);
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
