import * as React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Divider, Paragraph, Portal} from 'react-native-paper';

const UploadDialog = ({visible, setVisible, callback = () => alert('test'), back}) => {

    const hideDialog = () => {
        setVisible(false)
        back()
    };

    const ok = () => {
        hideDialog()
        callback()
    }
    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Завершить напомниание</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Напомнить через 30 минут?</Paragraph>
                    </Dialog.Content>
                    <Divider/>
                    <Dialog.Actions>
                        <Button color={'blue'} onPress={hideDialog}>Отмена</Button>
                        <Button color={'blue'} onPress={ok}>Подтвердить</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default UploadDialog;