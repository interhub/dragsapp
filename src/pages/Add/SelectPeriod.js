import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {TextInput, TouchableRipple} from "react-native-paper";
import DialogPicker from "./DialogPicker";
import periods from "../../vars/periods";

const H = Dimensions.get('window').height;

export default ({input, onSelectPeriod, themePaper}) => {
    const [visibleSelect, setVisibleSelect] = useState(false)

    return <View style={{marginHorizontal: 4}}>
        <TouchableRipple
            onPress={() => {
                setVisibleSelect(true)
            }}>
            <TextInput
                keyboardType={'number-pad'}
                theme={{colors: themePaper.colors}}
                editable={false}
                value={periods.find(el => el.value === input.period)?.label || ''}
                style={{height: 50}}
                label={input.period ? 'Расписание' : undefined}
                placeholder={input.period ? undefined : 'Расписание'}
            />
        </TouchableRipple>
        <DialogPicker
            list={periods}
            resultValue={input.period}
            setValue={onSelectPeriod}
            visible={visibleSelect}
            setVisible={setVisibleSelect}/>
    </View>
}

const styles = StyleSheet.create({
    select: {
        margin: -20,
        // paddingVertical: 8,
        // borderRadius: 8,
        color: 'black',
        // borderBottomWidth: 1,
        // paddingRight: 30,
    },

});
