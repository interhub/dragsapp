import React, {useEffect, useState} from 'react'
import {AsyncStorage, StyleSheet, View} from "react-native";
import {Button, Switch, TextInput} from "react-native-paper";
import {Entypo} from "@expo/vector-icons";
import Message from "./Message";
import Modals from "./Modals";
import {setName, setOpenSetting, setTheme} from "../store/actions";
import {connect} from "react-redux";
import {DARK, DarkTheme, LIGHT, LightTheme} from "../store/ColorThemes";

const StartForm = ({setName, setOpenSetting, openSetting, name, theme, setTheme}) => {
    const [ramName, setRamName] = useState('')

    const onSuccess = (newName) => {
        setName(newName)
        setOpenSetting(false)
        AsyncStorage.setItem('name', newName)
    }
    const setNewTheme = (e) => {
        let newTheme = (theme.name === DARK) ? LightTheme : DarkTheme;
        setTheme(newTheme)
        AsyncStorage.setItem('color', JSON.stringify(newTheme))
    }

    const getNewName = () => {
        setOpenSetting(true)
    }
    //установки имени пользователя
    useEffect(() => {
        AsyncStorage.getItem('name')
            .then((oldName) => {
                if (oldName === null) {
                    return getNewName()
                }
                setRamName(oldName)
                setName(oldName)
            })
        //установки темы пользователя
        AsyncStorage.getItem('color')
            .then((oldTheme) => {
                if (oldTheme !== null) {
                    setTheme(JSON.parse(oldTheme))
                }
            })
    }, [])


    return <Modals open={openSetting}>
        <View style={{position: 'absolute', left: 5, top: 15}}>
            <Switch color={'#0D48A1'} value={theme.name === LIGHT} onValueChange={setNewTheme}/>
        </View>
        <View>
            {/*<Text style={styles.enterText}>Введите ваше имя</Text>*/}
            <View style={{height: 60, width: 200}}>
                <TextInput
                    label={'Введите ваше имя'}
                    mode={'outlined'}
                    defaultValue={name}
                    onChangeText={(e) => setRamName(e)}
                    placeholder={"Введите ваше имя"}
                    inputContainerStyle={{height: 20, width: 200}}/>
            </View>
            <View style={{marginTop: 20}}>
                <Button
                    color={'#0D48A1'}
                    onPress={() => {
                        if (ramName.length > 0) {
                            return onSuccess(ramName)
                        }
                        Message('Введите имя')
                    }} icon={() => <Entypo name="save" size={24} color="#fff"/>} mode="contained">Добавить</Button>
            </View>
        </View>
    </Modals>

}


const mapStateToProps = (state) => ({
    openSetting: state.openSetting,
    name: state.name,
    theme: state.theme
})
const mapDispatchToProps = {
    setName,
    setOpenSetting,
    setTheme
}

export default connect(mapStateToProps, mapDispatchToProps)(StartForm)


const styles = StyleSheet.create({
    enterText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#472553'
    }
});

