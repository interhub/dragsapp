import {Entypo} from "@expo/vector-icons";
import {ADD} from "../store/screenNames";
import {Button} from "react-native-paper";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import {connect} from 'react-redux'

const AddBtn= ({theme})=> {

    const navigation = useNavigation()
   return <Button color={theme.topBg}
            contentStyle={{height: '100%'}}
            icon={() => <Entypo name="plus" size={24} color="#fff"/>}
            mode="contained"
            labelStyle={{color: '#fff'}}
            style={{height: 60}}
            onPress={() =>
                navigation.navigate(ADD)
            }>
        Новое напоминание
    </Button>
}

const mapStateToProps=(state)=>{
    return {theme:state.theme}
}
export default connect(mapStateToProps)(AddBtn)