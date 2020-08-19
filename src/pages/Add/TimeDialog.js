import * as React from 'react';
import {useState} from 'react';
import {Button, Dialog, Divider, Portal, TextInput} from 'react-native-paper';
import {View} from "react-native";
import moment from "moment";
import Message from "../../comps/Message";

const TimeDialog = ({
                        initialTimeObject = {
                            H: '10',
                            M: '00'
                        },
                        themePaper,
                        onSave,
                        visible = true,
                        setVisible,
                        editedNumber = 0
                    }) => {
    const hide = () => {
        setVisible(false)
    }
    const save = () => {
        if (!moment(`${ramTime.H}:${ramTime.M}`, 'HH:mm').isValid()) {
            return Message('Некорректное время')
        }
        onSave(ramTime.H, ramTime.M, editedNumber)
        hide()
    }

    const [ramTime, setRamTime] = useState(initialTimeObject)

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hide}>
                <Dialog.Title>Время</Dialog.Title>
                <Dialog.Content>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1, paddingRight: 10}}>
                            <TextInput
                                maxLength={2}
                                defaultValue={String(initialTimeObject.H)}
                                keyboardType={'number-pad'}
                                onChangeText={(e) => {
                                    setRamTime({...ramTime, H: e})
                                }}
                                theme={{colors: themePaper.colors}}
                                label={'Часы'}
                                // defaultValue={ramTime.H}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <TextInput
                                maxLength={2}
                                defaultValue={String(initialTimeObject.M)}
                                keyboardType={'number-pad'}
                                onChangeText={(e) => {
                                    setRamTime({...ramTime, M: e})
                                }}
                                theme={{colors: themePaper.colors}}
                                label={'Минуты'}
                            />
                        </View>
                    </View>
                </Dialog.Content>
                <Divider/>
                <Dialog.Actions>
                    <Button
                        color={'#1f69a5'}
                        onPress={hide}>Отклонить</Button>
                    <Button
                        color={'#1f69a5'}
                        onPress={save}>Принять</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default TimeDialog;
