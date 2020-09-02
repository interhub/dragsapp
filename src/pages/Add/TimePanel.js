import React, {useEffect, useRef, useState} from 'react'
import {View} from "react-native";
import {HelperText, List, TextInput} from "react-native-paper";
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/index.native";
import {SwipeListView} from 'react-native-swipe-list-view';
import {FontAwesome} from "@expo/vector-icons";
import ListMoveItem from "./ListMoveItem";
import TimeDialog from "./TimeDialog";

const TimePanel = ({input, removeTime, theme, addTime, updateTime, themePaper, setInput}) => {

    const updatePicker = useRef(null)
    const picker = useRef(null)

    const [editedNumber, setEditionNumber] = useState(0)
    const [visibleSelect, setVisibleSelect] = useState(false)
    const [visibleSelectUpdate, setVisibleSelectUpdate] = useState(false)
    const [updateKey, setUpdateKey] = useState(-1)
    const [numberDay, setNumberDay] = useState(1);

    const getTimesByNumber = () => {
        let hourStart = 8
        let hourEnd = 23
        let diff = hourEnd - hourStart
        let step = diff / numberDay;

        return Array(numberDay).fill(1).map((el, key) => {
            let obj = {
                H: String(Math.ceil(hourStart)),
                M: key % 2 === 0 ? '30' : '00',
                key
            }
            hourStart += step
            return obj
        })

    }

    useEffect(() => {
        const time = getTimesByNumber()
        console.warn(time)
        setInput({...input, time})
    }, [numberDay])

    return (
        <View>
            <TimeDialog visible={visibleSelect}
                        times={input.time}
                        onSave={addTime}
                        setVisible={setVisibleSelect}
                        editedNumber={editedNumber}
                        themePaper={themePaper}/>
            <TimeDialog visible={visibleSelectUpdate}
                        times={input.time}
                        editedNumber={editedNumber}
                        onSave={(H, M) => {
                            updateTime(H, M, updateKey)
                        }}
                        setVisible={setVisibleSelectUpdate}
                        themePaper={themePaper}/>
            <List.Section>
                <TextInput
                    value={numberDay ? String(numberDay) : ''}
                    keyboardType={'number-pad'}
                    theme={{colors: themePaper.colors}}
                    mode={'flat'}
                    style={{height: 70}}
                    label={'Сколько раз в день'}
                    onChangeText={(text) => {
                        let num = parseInt(text) || 0
                        if (num > 30) {
                            return setNumberDay(30)
                        }
                        setNumberDay(num)
                    }}/>
                {/*СНОВНОЙ СПИСОК*/}
                <HelperText type={'info'} visible={true}>
                    Ваше расписание
                </HelperText>
                <SwipeListView
                    useNativeDriver={false}
                    data={input.time}
                    disableRightSwipe
                    renderItem={({item, index}) => (
                        <View>
                            <ListMoveItem theme={theme}
                                          key={index}
                                          num={index}
                                          editedNumber={editedNumber}
                                          time={item}
                                          updatePicker={() => {
                                              setVisibleSelectUpdate(true)
                                              setUpdateKey(index)
                                          }}
                                          setEditionNumber={setEditionNumber}
                            />
                        </View>

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

            {/*<PickerUpdate updatePicker={updatePicker} updateTime={updateTime} editedNumber={editedNumber}/>*/}
            {/*<PickerAdd picker={picker} addTime={addTime}/>*/}
        </View>
    )
}

export default TimePanel;
