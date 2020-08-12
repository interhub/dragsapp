import * as React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Divider, Portal, RadioButton} from 'react-native-paper';

const test = (x) => alert('test' + x)
const colorBlue = '#27569d'
const DialogPicker = ({visible, resultValue = '', setVisible = test, title = 'Выберете', list = [], setValue = test}) => {
    // const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    console.log(list)

    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>{title}</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group onValueChange={value => {
                            setValue(value)
                            // hideDialog()
                        }}
                                           value={list.value ? list.value : null}>
                            {list.map((el, id) => {
                                return <View key={id}>
                                    <RadioButton.Item style={{flexDirection: 'row-reverse', justifyContent: 'flex-end'}}
                                                      color={colorBlue}
                                                      status={resultValue === el.value ? 'checked' : 'unchecked'}
                                                      value={el.value}
                                                      label={el.label}/>
                                </View>
                            })}
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Divider/>
                    <Dialog.Actions>
                        <Button color={colorBlue} onPress={hideDialog}>Отмена</Button>
                        <Button color={colorBlue} onPress={hideDialog}>Готово</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default DialogPicker