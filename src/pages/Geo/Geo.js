import {Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from 'react';
import {FontAwesome} from "@expo/vector-icons";
import {connect} from 'react-redux'

const Geo = ({navigation, theme}) => {
    useEffect(() => {
        navigation.setOptions({

            headerLeft: () => (
                <TouchableOpacity onPress={() => setOpenSetting(true)} style={{marginLeft: 10}}>
                    <View>
                        <FontAwesome name="user-circle" size={24} color={theme.titleItem}/>
                    </View>
                </TouchableOpacity>
            ),
        });
    }, [])
    return <View>
        <Text style={{textAlign: 'center', margin: 30, fontSize: 20}}>В разработке</Text>
    </View>
}

const mapStateToProps = (state) => ({
    theme: state.theme
})
export default connect(mapStateToProps)(Geo)
