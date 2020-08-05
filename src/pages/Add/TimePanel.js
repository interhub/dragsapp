import React, {useRef, useState} from 'react'
import {View} from "react-native";
import {Divider, HelperText, List} from "react-native-paper";
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/index.native";
import {SwipeListView} from 'react-native-swipe-list-view';
import {FontAwesome} from "@expo/vector-icons";
import {PickerAdd, PickerUpdate} from "./Pickers";
import ListMoveItem from "./ListMoveItem";

const TimePanel = ({input, removeTime, theme, addTime, updateTime}) => {

    const updatePicker = useRef(null)
    const picker = useRef(null)

    const [editedNumber, setEditionNumber] = useState(0)

    return (
        <View>
            <List.Section>
                {/*<List.Subheader>Сколько раз в день</List.Subheader>*/}
                <HelperText type={'info'} visible={'hello'}>
                    Сколько раз в день
                </HelperText>
                <List.Item
                    titleStyle={{textAlign: 'center'}}
                    title={input.time.length}
                    right={(props) =>
                        <TouchableRipple onPress={() => {
                            picker.current.open()
                        }}>

                            <List.Icon {...props}
                                       icon="plus" color={theme.navBg}/>
                        </TouchableRipple>}
                    left={(props) =>
                        <TouchableRipple onPress={() => {
                            removeTime(input.time.length - 1)
                        }}>
                            <List.Icon {...props}
                                       icon="minus"
                                       color={theme.navBg}/>
                        </TouchableRipple>}/>
                <Divider/>
                {/*СНОВНОЙ СПИСОК*/}
                {/*<List.Subheader>Ваше расписание</List.Subheader>*/}
                <HelperText type={'info'} visible={'hello'}>
                    Ваше расписание
                </HelperText>
                <SwipeListView
                    useNativeDriver={false}
                    data={input.time}
                    disableRightSwipe
                    renderItem={({item}) => (
                        <ListMoveItem theme={theme}
                                      key={item.key}
                                      num={item.key}
                                      time={item}
                                      updatePicker={updatePicker}
                                      setEditionNumber={setEditionNumber}
                        />
                    )}
                    renderHiddenItem={(data, rowMap) => (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                height: '100%',
                            }}>
                            <TouchableRipple
                                style={{padding: 20}}
                                onPress={() => {
                                    removeTime(data.item.key)
                                }}>
                                <FontAwesome name="trash-o" size={24} color="red"/>
                            </TouchableRipple>
                        </View>
                    )}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                />
            </List.Section>

            <PickerUpdate updatePicker={updatePicker} updateTime={updateTime} editedNumber={editedNumber}/>
            <PickerAdd picker={picker} addTime={addTime}/>
        </View>
    )
}

export default TimePanel;
