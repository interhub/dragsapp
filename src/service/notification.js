// need documentation: https://docs.expo.io/versions/latest/sdk/notifications/#notification
import * as Notifications from 'expo-notifications';
import Types from '../vars/types.js'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
console.log('start')

const setNotification = async ({
                                   name = 'Напоминание',
                                   dose = 'Дозировка',
                                   type = 'расписание',
                                   time = [{
                                       H: new Date().getHours(),
                                       M: new Date().getMinutes() + 30,
                                   }],
                                   days = [new Date()]
                               }) => {
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

    return time.map((t, id) => {
        return days.map((day, num) => {
            console.log(new Date(new Date(new Date(day.setHours(t.H)).setMinutes(t.M)).setSeconds(0)).toString(), "TIME")
            return Notifications.scheduleNotificationAsync({
                content: {
                    title,
                    body,
                    vibrate: true,
                    ...Platform.OS !== 'ios' ? {
                        priority: 'max'
                    } : {}
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
