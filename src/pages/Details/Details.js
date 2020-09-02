import React, {useEffect, useState} from 'react';
import {AsyncStorage, Dimensions, StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import {Divider, List} from "react-native-paper";
import ListAllInputs from "../../comps/ListAllInputs";
import * as Notifications from "expo-notifications";
import removeFullInput from "../../vars/removeFullInput";

const H = Dimensions.get('screen').height;
const W = Dimensions.get('screen').width;
let close = true
let currentItem = {}


function Details({navigation, theme}) {
    const [list, setList] = useState([])

    useEffect(() => {
        return navigation.addListener('focus', () => {
            setTimeout(() => {
                AsyncStorage.getItem('input')
                    .then((data) => {
                        if (data !== null) {
                            let result = (JSON.parse(data)).map((el, key) => ({...el, key}))    ;
                            setList(result)
                            // console.log(result, 'PRINT')
                        }
                    })
            }, 200)
        });
    }, []);

    return (
        <View>
            <View style={styles.container}>
                <List.Section>
                    <List.Subheader>Просмотр всех записей</List.Subheader>
                    <Divider/>
                    {list && list.length > 0 &&
                    <ListAllInputs list={list} removeInput={(a,b)=>removeFullInput(a,b,setList)} navigation={navigation} theme={theme}/>
                    }
                    <View style={{height:1000, }} />
                </List.Section>
            </View>
        </View>
    );
}

const mapStateToProps = (state) => ({
    screen: state.screen,
    theme: state.theme
})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Details)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: H,
        backgroundColor: '#fff',
    },
    btn: {
        width: '100%'
    },
    btnBox: {width: 300}
});
