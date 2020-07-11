// need documentation: https://docs.expo.io/versions/latest/sdk/notifications/#notification
import * as Notifications from 'expo-notifications';
import PeriodsName from '../vars/periodsName.js'
import TypesName from '../vars/typesName.js'
import Types from '../vars/types.js'
import moment from 'moment'
import { AsyncStorage } from 'react-native'

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
  // return AsyncStorage.clear()
  // return  Notifications.cancelAllScheduledNotificationsAsync() //all cancel notes
  // return Notifications.dismissAllNotificationsAsync() //all clear
  // return  Notifications.removeAllNotificationListeners() //listener
  // dismissAllNotificationsAsync (delete one)
  // time[0].M=48;
  console.log(name, period, time, type, dose, start, end, 'all')
  const now = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    new Date().getHours(),
    new Date().getMinutes(),
    new Date().getSeconds() + 1
  );
  const mass = [];
  //по дефолту максимальная длительность
  let count = 1;
  //раздница в днях (нужна только при end!==0
  let diff = Math.abs(moment(end).diff(start, 'days')) + 1
  //получить переод повтора
  let currentPeriod = (() => {
    switch (period) {
      case PeriodsName.EVERYDAY:
        return 1;
      case PeriodsName.TWODAY:
        return 2;
      case PeriodsName.THREEDAY:
        return 3;
      case PeriodsName.NONE:
        return 1;
      default:
        return 1
    }
  })()

  //TEST
  if (test === true) {
    const item = await Notifications.presentNotificationAsync({
      // content: {
      title: 'Remember to drink water!',
      body: 'This text test message!',
      vibrate: true,
    })
    // let info=await Notifications.getAllScheduledNotificationsAsync()
    // console.log(info,'INFO')
    mass.push(item)
    return [mass]
  }
  //ONLY END
  if (start === 0 && end !== 0) {
    for (let j = 0; j < time.length; j++) {
      //повтор по количеству дней count
      // for (let i = 0; i < diff; i += currentPeriod) {
      const item = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Напоминание о приеме',
          body: `${name} в количестве ${dose} ${Types.find(el => el.value === type).label}`,
          vibrate: true,
        },
        trigger: new Date(
          new Date().getFullYear() + 0,
          new Date().getMonth() + 0,
          new Date().getDate(),
          time[j].H,
          time[j].M,
          1
        )
      });
      mass.push(item)
      // }
    }

  }
  //ONLY START
  if (start !== 0 && end === 0) {
    for (let j = 0; j < time.length; j++) {
      //повтор по количеству дней count
      // for (let i = 0; i < count; i += currentPeriod) {
      const item = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Напоминание о приеме',
          body: `${name} в количестве ${dose} ${Types.find(el => el.value === type).label}`,
          vibrate: true,
        },
        trigger: new Date(
          new Date(start).getFullYear() + 0,
          new Date(start).getMonth() + 0,
          new Date(start).getDate(),
          time[j].H,
          time[j].M,
          1
        )
      });
      mass.push(item)
      // }
    }
  }
  //ALL HAVE
  if (start !== 0 && end !== 0) {
    for (let j = 0; j < time.length; j++) {
      //повтор по количеству дней count
      // for (let i = 0; i < diff; i += currentPeriod) {
      const item = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Напоминание о приеме',
          body: `${name} в количестве ${dose} ${Types.find(el => el.value === type).label}`,
          vibrate: true,
        },
        trigger: new Date(
          new Date(start).getFullYear() + 0,
          new Date(start).getMonth() + 0,
          new Date(start).getDate(),
          time[j].H,
          time[j].M,
          1
        )
      });
      mass.push(item)
      // }
    }
  }
  //NONE
  if (start === 0 && end === 0) {
    //повтор по количеству времени
    for (let j = 0; j < time.length; j++) {
      //повтор по количеству дней count
      // for (let i = 0; i < count; i += currentPeriod) {
      const item = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Напоминание о приеме',
          body: `${name} в количестве ${dose} ${Types.find(el => el.value === type).label}`,
          vibrate: true,
        },
        trigger: new Date(
          new Date().getFullYear() + 0,
          new Date().getMonth() + 0,
          new Date().getDate(),
          time[j].H,
          time[j].M,
          1
        )
      });
      mass.push(item)
      // }
    }
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
