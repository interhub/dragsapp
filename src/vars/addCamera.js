import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default async () => {
    await ImagePicker.getCameraPermissionsAsync()
    if (Constants.platform.ios) {
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    }
    try {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 5],
            quality: 0.5,
            base64: true
        });
        if (!result.cancelled) {
            return (`data:image/png;base64,${result.base64}`);
        }
        return false
        // console.log(result);
    } catch (E) {
        console.log(E);
    }
}
