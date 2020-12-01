import PushNotification from 'react-native-push-notification';

const scheduleNotification = (title, message, channelId, color, img) => {
  PushNotification.localNotificationSchedule({
    title,
    message,
    channelId,
    color,
    largeIconUrl: img,
    date: new Date(Date.now() + 3600 * 1000),
  });
};

export { scheduleNotification };
