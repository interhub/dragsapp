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
  //итоговый массив токенов для удаление и отмены сообщений в дальнейшем
  const mass = [];
  //по дефолту максимальная длительность (ограничение по умолчанию)
  let count = 100;
  //раздница в днях (нужна только при end!==0 (ограничение по усмотрению юзера)
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

  const title = 'Напоминание о приеме';
  const body = `${name} в количестве ${dose} ${Types.find(el => el.value === type).label}`
  const getDate = (() => {
    const date = new Date
    let day = new Date().getDate();
    let [year, month] =
      (start === 0) ?
        [
          new Date().getFullYear(),
          new Date().getMonth()
        ] :
        [
          new Date(start).getFullYear(),
          new Date(start).getMonth()
        ]

    return ( i, j ) => {
      return new Date(
        year,
        month,
        day + i,
        time[j].H,
        time[j].M,
      )
    }
  })()
  console.log('START adding currentPeriod=', currentPeriod, 'end=', end)

  //TEST
  if (test === true) {
    // for (let j = 0; j < time.length; j++) {
    // for (let i = 0; i < count; i++) {
    const item = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Remember to drink water!',
        body: 'This text test message!',
        vibrate: true,
      },
      trigger: null
    })
    // let info=await Notifications.getAllScheduledNotificationsAsync()
    // console.log(info,'INFO')
    mass.push(item)
    // console.log('i', i, 'j', j)
    // }
    // }
    // console.log(mass, 'MASS INNER')
    return mass
  }

  //IMPORT

  for (let j = 0; j < time.length; j++) {
    //повтор по количеству дней count
    for (let i = 0; i < ((end !== 0) ? diff : count); i += currentPeriod) {
      const item =  Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          vibrate: true,
        },
        trigger: null//getDate(i, j)
      });
      mass.push(item)
      // console.log('i', i, 'j', j)
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
