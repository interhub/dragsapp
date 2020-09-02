import {AsyncStorage} from "react-native";
import * as Notifications from "expo-notifications";

export default async (el, key, callback = () => console.warn('null remove')) => {
    try {
        let items = await AsyncStorage.getItem('input')
        items = items ? JSON.parse(items) : []
        let item = items[key]
        console.warn('ITEM KEY=', key, item,)
        items.splice(key, 1)
        callback()
        // setList(items)
        item?.id?.map((str = '') => {
            Notifications.dismissNotificationAsync(str)
            Notifications.cancelScheduledNotificationAsync(str)
        });
        AsyncStorage.setItem('input', JSON.stringify(items));
    } catch (e) {
        console.warn(e)
    }
}