import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {TextInput, TouchableRipple} from "react-native-paper";
import DialogPicker from "./DialogPicker";
import types from "../../vars/types";
import {AntDesign} from "@expo/vector-icons";

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
                <View pointerEvents={'none'}>
                    <TextInput
                        theme={{colors: themePaper.colors}}
                        editable={false}
                        defaultValue={types.find(el => el.value === input.type)?.label || ''}
                        style={{height: 70}}
                        label={'Ед. измерения'}
                        placeholder={'Ед. измерения'}
                    />
                    <View style={{position:'absolute', right:10, bottom: '28%'}} >
                        <AntDesign name="caretdown" size={8} color="black" />
                    </View>
                </View>
            </TouchableRipple>
            <DialogPicker
                list={types}
                resultValue={input.type}
                setValue={onSelectType}
                visible={visibleSelect}
                setVisible={setVisibleSelect}/>
        </View>
        <View
            style={styles.select}>
            <TextInput
                defaultValue={String(input.dose)}
                keyboardType={'number-pad'}
                theme={{colors: themePaper.colors}}
                mode={'flat'}
                style={{height: 70}}
                label={'Количество'}
                onChangeText={onSelectDose}
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
