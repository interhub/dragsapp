import {Button, Dialog, Portal} from "react-native-paper";
import {Image, TouchableOpacity, View} from "react-native";
import React, {useState} from 'react';

export default ({openImg, onClose, onDelete}) => {
    if (!openImg) {
        return <View/>
    }
    const [zoom, setZoom] = useState(false)
    return <Portal>
        <Portal>
            <Dialog
                visible={true} onDismiss={() => {
                onClose()
                setZoom(false)
            }}>
                <Dialog.Content style={{width: '100%'}}>
                    <TouchableOpacity
                        onPress={() => {
                            setZoom(!zoom)
                        }}
                        style={{overflow: 'hidden', height: '90%', transform: zoom ? [{scale: 2}] : [{scale: 1}]}}>
                        <Image
                            style={{width: '100%', height: '100%'}} resizeMode={'contain'}
                            source={openImg}/>
                    </TouchableOpacity>
                </Dialog.Content>
                <Dialog.Actions style={{justifyContent: 'space-between'}}>
                    <Button
                        color={'red'}
                        onPress={onDelete}>Удалить</Button>
                    <Button
                        color={'blue'}
                        onPress={() => {
                            onClose()
                            setZoom(false)
                        }}>Закрыть</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    </Portal>
}