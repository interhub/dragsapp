import * as React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Divider, Portal} from 'react-native-paper';

const PhotoModalPicker = ({
                              visible,
                              setVisible,
                              addPhoto,
                              addCamera
                          }) => {

    const hide = () => {
        setVisible(false)
    }
    const color = '#2a539b'
    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={hide}>
                    <Dialog.Title>Выберете действие</Dialog.Title>
                    <Dialog.Content style={{alignItems: 'flex-start'}}>
                        <Dialog.Actions>
                            <Button color={color} onPress={() => {
                                addPhoto()
                            }}>Выбрать фото</Button>
                        </Dialog.Actions>
                        <Dialog.Actions>
                            <Button color={color} onPress={() => {
                                addCamera()
                            }}>Новое фото</Button>
                        </Dialog.Actions>
                    </Dialog.Content>
                    <Divider/>
                    <Dialog.Actions>
                        <Button color={color} onPress={hide}>Назад</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default PhotoModalPicker;