import {Text, View} from "react-native";
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

export default () => {
    return <View style={{width: 80, alignItems:'center'}}>
        <AntDesign name="clockcircleo" size={24} color="#C7DBFA" />
        <Text style={{color:'#C7DBFA'}} >30 минут</Text>
    </View>
}