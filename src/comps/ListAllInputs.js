import {AsyncStorage, Dimensions, View} from "react-native";
import ListItem from "../pages/Details/ListItem";
import LeftTime from "./LeftTime";
import {TouchableRipple} from "react-native-paper";
import RightOk from "./RightOk";
import uploadInput from "../vars/uploadInput";
import {SwipeListView} from "react-native-swipe-list-view";
import React, {useRef} from "react";
import {ADD, HOME} from "../store/screenNames";


const H = Dimensions.get('screen').height
const W = Dimensions.get('screen').width
let close = true
let currentItem = {}

export default ({list, navigation, theme, removeInput}) => {

    const rowRef = useRef()

    const getIndexByName = async (name = '') => {
        return AsyncStorage.getItem('input')
            .then((data) => {
                if (data) {
                    let arr = JSON.parse(data) || []
                    return arr.findIndex((el) => el.name === name) || 0
                }
            })
    }


    const editInput = async (el) => {
        el.id = []
        const key = await getIndexByName(el.name);
        navigation.jumpTo(HOME);
        navigation.push(ADD, {edit: {...el, key}})
    }

    return <SwipeListView
        ref={rowRef}
        onRowClose={() => {
            close = true
        }}
        data={list}
        swipeRowStyle={{marginTop: 20}}
        renderItem={({item, index}) => (
            <View
                onTouchStart={() => {
                    currentItem = item;
                }}>
                <ListItem theme={theme}
                          item={item}
                          editInput={() => editInput({...item})}
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