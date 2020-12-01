/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel({
  channelId: 'channel-id',
  channelName: 'My channel',
  channelDescription: 'A channel to categorise your notifications',
  soundName: 'default',
  importance: 4,
  vibrate: true,
});

AppRegistry.registerComponent(appName, () => App);
