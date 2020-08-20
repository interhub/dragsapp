import React, {useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {TextInput} from "react-native-paper";
import DialogPicker from "./DialogPicker";
import periods from "../../vars/periods";
import { AntDesign } from '@expo/vector-icons';

const H = Dimensions.get('window').height;

export default ({input, onSelectPeriod, themePaper}) => {
    const [visibleSelect, setVisibleSelect] = useState(false)

    return <View style={{marginHorizontal: 4}}>
        <TouchableOpacity
            style={{zIndex: 10000}}
            onPress={() => {
                setVisibleSelect(true)
            }}>
            <View pointerEvents={'none'}>
                <TextInput
                    keyboardType={'number-pad'}
                    theme={{colors: themePaper.colors}}
                    editable={false}
                    value={periods.find(el => el.value === input.period)?.label || ''}
                    style={{height: 50, zIndex: -1}}
                    label={input.period ? 'Расписание' : undefined}
                    placeholder={input.period ? undefined : 'Расписание'}
                />
                <View style={{position:'absolute', right:10, bottom: '25%'}} >
                    <AntDesign name="caretdown" size={8} color="black" />
                </View>
            </View>
        </TouchableOpacity>
        <DialogPicker
            list={periods}
            resultValue={input.period}
            setValue={onSelectPeriod}
            visible={visibleSelect}
            setVisible={setVisibleSelect}/>
    </View>
}

