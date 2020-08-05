import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Platform, SafeAreaView, StyleSheet, UIManager} from 'react-native';
import {connect, Provider} from "react-redux";
import store from './src/store/store.js'
import Home from "./src/pages/Home/Home.js";
import Add from "./src/pages/Add/Add.js";
import {ADD, DETAILS, GEO, HOME} from "./src/store/screenNames";
//navigate
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Details from "./src/pages/Details/Details";
import 'moment/locale/ru'
import moment from 'moment'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geo from "./src/pages/Geo/Geo";
import {Entypo} from '@expo/vector-icons';
import {setName} from "./src/store/actions";
import StartForm from "./src/comps/StartForm";

const Tab = createMaterialBottomTabNavigator()
moment.locale('ru')
const Stack = createStackNavigator();

if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}


function App({theme, name, openSetting}) {

    const getTitleStyle = (name) => ({
        title: name,
        headerStyle: {
            backgroundColor: theme.topBg,
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: theme.titleItem
        },
        headerTintColor: theme.titleItem,
    })

    function One() {
        return (
            <Stack.Navigator initialRouteName={HOME}>
                <Stack.Screen options={getTitleStyle(name === '' ? 'Напоминиания' : name)} name={HOME}
                              component={Home}/>
                <Stack.Screen options={getTitleStyle('Новое напоминание')} name={ADD} component={Add}/>
            </Stack.Navigator>
        );
    }

    function Two() {
        return <Stack.Navigator initialRouteName={DETAILS}>
            <Stack.Screen options={getTitleStyle('Просмотр')} name={DETAILS}
                          component={Details}/>
        </Stack.Navigator>
    }

    function Three() {
        return <Stack.Navigator initialRouteName={GEO}>
            <Stack.Screen options={getTitleStyle('Просмотр')} name={GEO} component={Geo}/>
        </Stack.Navigator>
    }

    return <NavigationContainer>
        <StartForm/>
        <SafeAreaView style={{flex: 1, opacity: openSetting ? 0.8 : 1}}>
            <StatusBar style="auto"/>
            <Tab.Navigator
                activeColor={theme.navIcon}
                barStyle={{backgroundColor: theme.navBg}}
                backBehavior={'history'}
                initialRouteName={HOME}>
                <Tab.Screen options={{
                    title: 'Главная',
                    tabBarLabel: 'Главная',
                    tabBarIcon: ({color}) => (
                        <Entypo name="home" size={24} color={color}/>
                    ),
                }} name={HOME} component={One}/>
                <Tab.Screen options={{
                    title: 'Все напомининия',
                    tabBarLabel: 'Все напомининия',
                    tabBarIcon: ({color}) => (
                        <Entypo name="back-in-time" size={24} color={color}/>

                    ),
                }} name={DETAILS} component={Two}/>
                <Tab.Screen options={{
                    title: 'Геонапоминания',
                    tabBarLabel: 'Геонапоминания',
                    tabBarIcon: ({color}) => (
                        <Entypo name="location-pin" size={24} color={color}/>
                    ),
                }} name={GEO} component={Three}/>
            </Tab.Navigator>
        </SafeAreaView>
    </NavigationContainer>
}


const mapStateToProps = (state) => ({
    name: state.name,
    theme: state.theme,
    openSetting: state.openSetting
})
const mapDispatchToProps = {
    setName
}

const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(App)

const ProviderApp = () => {
    return <Provider store={store}>
        <ConnectApp/>
    </Provider>
}

export default ProviderApp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
