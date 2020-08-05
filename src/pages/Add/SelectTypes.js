import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Types from '../../vars/types.js'
import {HelperText} from "react-native-paper";


const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

const numbers = new Array(100).fill(1).map((el, id) => ({
    label: `${id}`,
    value: id
}))

export default ({input, onSelectType, onSelectDose}) => {
    return <View style={styles.container}>
        <View style={styles.select}>
            {input.type !== '' && <HelperText type={'info'} visible={'hello'}>
                Ед. измерения
            </HelperText>}
            <RNPickerSelect
                // value={input.type}
                style={styles.select}
                placeholder={{
                    label: 'Ед. измерения',
                    value: null,
                    color: '#7a7a7a',
                }}
                onValueChange={onSelectType}
                items={Types}
            />
        </View>
        {/*<Input*/}
        {/*  containerStyle={{marginRight: 30}}*/}
        {/*  placeholder={'Дозировка'}/>*/}
        <View style={styles.select}>
            {input.dose !== 0 && <HelperText type={'info'} visible={'hello'}>
                Количество
            </HelperText>}
            <RNPickerSelect
                // value={input.dose}
                style={styles.select}
                placeholder={{
                    label: 'Количество',
                    value: null,
                    color: '#7a7a7a',
                }}
                onValueChange={onSelectDose}
                items={numbers}
            />
        </View>
    </View>
}

const styles = StyleSheet.create({
    select: {
        width: W * 0.5
    },
    container: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
