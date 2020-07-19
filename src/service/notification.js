// need documentation: https://docs.expo.io/versions/latest/sdk/notifications/#notification
import * as Notifications from 'expo-notifications';
import PeriodsName from '../vars/periodsName.js'
import TypesName from '../vars/typesName.js'
import Types from '../vars/types.js'
import moment from 'moment'
import { AsyncStorage } from 'react-native'
import MaxDays from "../vars/MaxDays";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
console.log('start')

const setNotification = async ( {
                                  name = 'Напоминание',
                                  dose = 'Дозировка',
                                  type = 'расписание',
                                  time = [{
                                    H: new Date().getHours(),
                                    M: new Date().getMinutes(),
                                  }],
                                  days = []
                                } ) => {
  // return console.log(days.map(( el, id ) => new Date(el).toLocaleString()), "TEST DATES ALL")
  // return AsyncStorage.clear()
  // return  Notifications.cancelAllScheduledNotificationsAsync() //all cancel notes
  // return Notifications.dismissAllNotificationsAsync() //all clear
  // return  Notifications.removeAllNotificationListeners() //listener
  // dismissAllNotificationsAsync (delete one)
  // time[0].M=48;
  // console.log(name, period, time, type, dose, start, end, 'all')

  //итоговый массив токенов для удаление и отмены сообщений в дальнейшем
  const title = 'Напоминание о приеме💊⏰';
  const body = `${name} в количестве ${dose} ${Types.find(el => el.value === type).label}`

  return time.map(( t, id ) => {
    return days.map(( day, num ) => {
      return Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          vibrate: true,
        },
        trigger: new Date(new Date(new Date(day.setHours(t.H)).setMinutes(t.M)).setSeconds(0))
      });
    })
  }).flat(1)

}

export default setNotification

// trigger: {
//   seconds: 2,
//   repeats: false
// },

// Notifications.cancelAllScheduledNotificationsAsync()
// Notifications.cancelScheduledNotificationAsync('71c5b43c-76cd-4565-84b2-a8a01c1c9333')
