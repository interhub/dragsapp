import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {TextInput, TouchableRipple} from "react-native-paper";
import DialogPicker from "./DialogPicker";
import types from "../../vars/types";

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;


// const getNumber = (num) => ({
//     label: `${num}`,
//     value: num
// })

export default ({input, onSelectType, onSelectDose, themePaper}) => {

    const [visibleSelect, setVisibleSelect] = useState(false)

    return <View style={styles.container}>
        <View style={styles.select}>
            <TouchableRipple
                style={{paddingRight: 10}}
                onPress={() => {
                    setVisibleSelect(true)
                }}>
                <TextInput
                    theme={{colors: themePaper.colors}}
                    editable={false}
                    value={types.find(el => el.value === input.type)?.label || ''}
                    style={{height: 50}}
                    label={input.type ? 'Ед. измерения' : undefined}
                    placeholder={input.type ? undefined : 'Ед. измерения'}
                />
            </TouchableRipple>
            <DialogPicker
                list={types}
                resultValue={input.type}
                setValue={onSelectType}
                visible={visibleSelect}
                setVisible={setVisibleSelect}/>
        </View>
        <View style={styles.select}>
            <TextInput
                keyboardType={'number-pad'}
                theme={{colors: themePaper.colors}}
                style={{height: 50}}
                label={input.dose ? 'Количество' : null}
                onChangeText={onSelectDose}
                placeholder={'Количество'}
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
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
