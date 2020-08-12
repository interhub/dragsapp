import {Image, TouchableOpacity, View,} from "react-native";
import React from 'react'

export default ({img, onOpen}) => {
    return <View style={{height: 250, width: '50%', padding: 15}}>
        <TouchableOpacity
            onPress={()=>onOpen(img)}
            style={{flex: 1, overflow: 'hidden'}}>
            <Image style={{flex: 1, width: '100%'}} source={img || require('../../img/bg-drug.png')}/>
        </TouchableOpacity>
    </View>
}