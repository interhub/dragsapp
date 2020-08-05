import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Periods from '../../vars/periods.js'

const H = Dimensions.get('window').height;

export default ({input, onSelectPeriod}) => {
    return <View style={{marginHorizontal: 4}}>
        <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            value={input.period}
            style={{...styles.select,}}
            placeholder={{
                label: 'Расписание',
                value: null,
                color: '#9EA0A4',
            }}
            onValueChange={onSelectPeriod}
            items={Periods}
        />
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
