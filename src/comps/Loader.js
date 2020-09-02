import {Image, View} from "react-native";
import React from "react";
import {connect} from 'react-redux'
import {ActivityIndicator} from "react-native-paper";

const HEIGHT_LOADER = 30;
const Loader = ({load, theme}) => {
    return <View style={{
        height: HEIGHT_LOADER,
        padding:10,
        alignItems: 'center',
        width: '100%'
    }}>
        {load && <ActivityIndicator  size="small" color={theme.navBg} />}
    </View>
}
const mapStateToProps = (state) => ({load: state.load, theme:state.theme})
export default connect(mapStateToProps)(Loader)