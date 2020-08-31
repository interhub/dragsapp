import {View} from "react-native";
import React from "react";
import {TextInput} from "react-native-paper";

export default ({themePaper, input, setInput}) => {
    return <View style={{padding: 5}}>
        <TextInput
            theme={{colors: themePaper.colors}}
            defaultValue={String(input.selfPeriod)}
            onChangeText={(selfPeriodString) => {
                // return console.warn(selfPeriodString)
                setInput({...input, selfPeriod: parseInt(selfPeriodString.toString())})
            }}
            keyboardType={'number-pad'}
            style={{height: 70}}
            label={'Интервал (каждые N дней)'}
        />
    </View>
}