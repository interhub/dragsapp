import {AsyncStorage, Dimensions, View} from "react-native";
import ListItem from "../pages/Details/ListItem";
import LeftTime from "./LeftTime";
import {TouchableRipple} from "react-native-paper";
import RightOk from "./RightOk";
import uploadInput from "../vars/uploadInput";
import {SwipeListView} from "react-native-swipe-list-view";
import React, {useRef} from "react";
import * as Notifications from "expo-notifications";
import {ADD, HOME} from "../store/screenNames";


const H = Dimensions.get('screen').height
const W = Dimensions.get('screen').width
let close = true
let currentItem = {}

export default ({list, setList, navigation, theme}) => {

    const rowRef = useRef()
    const removeInput = (el, key) => {
        try {
            let items = [...list];
            let item = items.find(el => el.key === key) || items[0]
            let newList = items.filter(el => el.key !== key)
            setList(newList);
            item.id.forEach(str => Notifications.dismissAllNotificationsAsync(str));
            AsyncStorage.setItem('input', JSON.stringify(newList));
        } catch (e) {
            console.warn(e)
        }
    }

    const editInput = (el) => {
        el.id = []
        navigation.jumpTo(HOME, {callback: () => alert('hi')});
        setTimeout(() => {
            navigation.push(ADD, {edit: el})
        }, 300)
    }

    return <SwipeListView
        ref={rowRef}
        onRowClose={() => {
            close = true
        }}
        data={list.map((el, key) => ({...el, key}))}
        swipeRowStyle={{marginTop: 20}}
        renderItem={({item}) => (
            <View
                onTouchStart={() => {
                    currentItem = item;
                }}>
                <ListItem theme={theme}
                          item={item}
                          editInput={() => editInput(item)}
                />
            </View>
        )}
        renderHiddenItem={(data, rowMap) => (
            <View
                style={{padding: 5, borderRadius: 25, overflow: 'hidden'}}>
                <View
                    style={{
                        backgroundColor: '#1A77D2',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '100%',
                    }}>
                    <View>
                        <LeftTime/>
                    </View>
                    <TouchableRipple
                        onPress={() => removeInput(data.item, data.item.key)}>
                        <RightOk/>
                    </TouchableRipple>
                </View>
            </View>
        )}
        onLeftActionStatusChange={({isActivated}) => {
            if (close && isActivated) {
                close = false
                if (rowRef.current)
                    rowRef.current.safeCloseOpenRow();
                uploadInput(currentItem)
                removeInput(currentItem, currentItem.key)
            }
        }}
        onRightActionStatusChange={({isActivated}) => {
            if (close && isActivated) {
                close = false
                if (rowRef.current)
                    rowRef.current.safeCloseOpenRow();
                removeInput(currentItem, currentItem.key)
            }
        }}
        keyExtractor={(item, index) => index.toString()}

        leftActivationValue={W}
        leftActionValue={W}
        leftOpenValue={W}

        rightActivationValue={-W}
        rightActionValue={-W}
        rightOpenValue={-W}
    />
}