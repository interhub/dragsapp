import {Text, View} from "react-native";
import React from "react";
import {MaterialIcons} from "@expo/vector-icons";

export default () => {
    return <View style={{alignItems:'center', width: 70}} >
        <MaterialIcons
            name="done"
            size={30}
            color={'#C7DBFA'}
        />
        <Text style={{color:'#C7DBFA'}} >Готово</Text>
    </View>
}