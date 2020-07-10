// need documentation: https://docs.expo.io/versions/latest/sdk/notifications/#notification
import * as Notifications from 'expo-notifications';
import PeriodsName from '../vars/periodsName.js'
import TypesName from '../vars/typesName.js'
import Types from '../vars/types.js'
import moment from 'moment'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
console.log('start')

const setNotification = async ( {
                                  name = 'Drugs',
                                  period = PeriodsName.EVERYDAY,
                                  time = [{
                                    H: new Date().getHours(),
                                    M: new Date().getMinutes(),
                                  }],
                                  type = TypesName.TABLET,
                                  dose = 1,
                                  start = 0,
                                  end = 0,
                                  test = false
                                } ) => {
  console.log(name, period, time, type, dose, start, end, 'all')
  const now = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    new Date().getHours(),
    new Date().getMinutes(),
    new Date().getSeconds() + 1
  );
  const mass = []
  let count = 10;
  //раздница в днях (нужна только при end!==0
  let diff = Math.abs(moment(end).diff(start, 'days')) + 1
  // return console.log(diff, 'diff')
  //учет начала и конца
  ///
  //ONLY END
  if (start === 0 && end !== 0) {
    for (let j = 0; j < time.length; j++) {
      //повтор по количеству дней count
      for (let i = 0; i < diff; i++) {
        const item = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Напоминание о приеме',
            body: `${name} в количестве ${dose} ${Types.filter(el => el.value = type)}`,
            vibrate: true,
          },
          trigger: new Date(
            new Date().getFullYear() + 0,
            new Date().getMonth() + 0,
            new Date().getDate() + i,
            time[j].H,
            time[j].M,
            1
          )
        });
        mass.push(item)
      }
    }

  }
  //ONLY START
  if (start !== 0 && end === 0) {
    for (let j = 0; j < time.length; j++) {
      //повтор по количеству дней count
      for (let i = 0; i < count; i++) {
        const item = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Напоминание о приеме',
            body: `${name} в количестве ${dose} ${Types.filter(el => el.value = type)}`,
            vibrate: true,
          },
          trigger: new Date(
            new Date(start).getFullYear() + 0,
            new Date(start).getMonth() + 0,
            new Date(start).getDate() + i,
            time[j].H,
            time[j].M,
            1
          )
        });
        mass.push(item)
      }
    }
  }
  //ALL HAVE
  if (start !== 0 && end !== 0) {
    for (let j = 0; j < time.length; j++) {
      //повтор по количеству дней count
      for (let i = 0; i < diff; i++) {
        const item = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Напоминание о приеме',
            body: `${name} в количестве ${dose} ${Types.filter(el => el.value = type)}`,
            vibrate: true,
          },
          trigger: new Date(
            new Date(start).getFullYear() + 0,
            new Date(start).getMonth() + 0,
            new Date(start).getDate() + i,
            time[j].H,
            time[j].M,
            1
          )
        });
        mass.push(item)
      }
    }
  }
  //NONE
  if (start === 0 && end === 0) {
    //повтор по количеству времени
    for (let j = 0; j < time.length; j++) {
      //повтор по количеству дней count
      for (let i = 0; i < count; i++) {
        const item = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Напоминание о приеме',
            body: `${name} в количестве ${dose} ${Types.filter(el => el.value = type)}`,
            vibrate: true,
          },
          trigger: new Date(
            new Date().getFullYear() + 0,
            new Date().getMonth() + 0,
            new Date().getDate() + i,
            time[j].H,
            time[j].M,
            1
          )
        });
        mass.push(item)
      }
    }
  }
  //TEST
  if (test === true) {
    //повтор по количеству времени
    //повтор по количеству дней count
    const item = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Remember to drink water!',
        body: 'This text test message!',
        vibrate: true,
      },
      trigger: now
    });
    mass.push(item)
  }

  return mass

}

export default setNotification

// trigger: {
//   seconds: 2,
//   repeats: false
// },

// Notifications.cancelAllScheduledNotificationsAsync()
// Notifications.cancelScheduledNotificationAsync('71c5b43c-76cd-4565-84b2-a8a01c1c9333')
