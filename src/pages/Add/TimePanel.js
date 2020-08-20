import React, {useRef, useState} from 'react'
import {View} from "react-native";
import {Divider, HelperText, List} from "react-native-paper";
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/index.native";
import {SwipeListView} from 'react-native-swipe-list-view';
import {FontAwesome} from "@expo/vector-icons";
import ListMoveItem from "./ListMoveItem";
import TimeDialog from "./TimeDialog";

const TimePanel = ({input, removeTime, theme, addTime, updateTime, themePaper}) => {

    const updatePicker = useRef(null)
    const picker = useRef(null)

    const [editedNumber, setEditionNumber] = useState(0)
    const [visibleSelect, setVisibleSelect] = useState(false)
    const [visibleSelectUpdate, setVisibleSelectUpdate] = useState(false)
    const [updateKey, setUpdateKey] = useState(-1)
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
                {/*<List.Subheader>Сколько раз в день</List.Subheader>*/}
                <HelperText type={'info'} visible={true}>
                    Сколько раз в день
                </HelperText>
                <List.Item
                    titleStyle={{textAlign: 'center'}}
                    title={input.time.length}
                    right={(props) =>
                        <TouchableRipple onPress={() => {
                            setVisibleSelect(true)
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
                {/*<Divider/>*/}
                {/*СНОВНОЙ СПИСОК*/}
                {/*<List.Subheader>Ваше расписание</List.Subheader>*/}
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
