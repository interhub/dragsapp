// need documentation: https://docs.expo.io/versions/latest/sdk/notifications/#notification
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
console.log('start')

const put = async () => {
  const item = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Remember to drink water!',
      body: 'And here is the body!',
      vibrate: true,
    },
    trigger: {
      seconds: 2,
      repeats: false
    },
    // trigger: new Date(
    //   new Date().getFullYear(),
    //   new Date().getMonth(),
    //   new Date().getDate(),
    //   new Date().getHours(),
    //   new Date().getMinutes(),
    //   new Date().getSeconds() + 1
    // ),
    // trigger:{
    //   hour: 11,
    //   minute: 35,
    //   repeats: true
    // }
    // trigger:{
    //   repeats: true,
    //   // type: 'timeInterval',
    //   seconds: 2000,
    //   // hour: 11,
    //   // minute: 51  ,
    // }

  });
  console.log(item)
  // Notifications.cancelAllScheduledNotificationsAsync()
  // Notifications.cancelScheduledNotificationAsync('71c5b43c-76cd-4565-84b2-a8a01c1c9333')
}

export default put
