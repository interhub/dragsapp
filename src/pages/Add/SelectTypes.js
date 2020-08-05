import React from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Types from '../../vars/types.js'
import {HelperText} from "react-native-paper";


const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;


// const getNumber = (num) => ({
//     label: `${num}`,
//     value: num
// })

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
            <TextInput
                keyboardType={'number-pad'}
                // value={input.dose}
                style={{height: 50}}
                placeholder={'Количество'}
                onChangeText={onSelectDose}
                // items={numbers}
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
