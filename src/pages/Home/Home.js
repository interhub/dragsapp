import React, {useEffect, useState} from 'react';
import {
    AsyncStorage,
    Dimensions,
    ImageBackground,
    LayoutAnimation,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {connect} from "react-redux";
import {List} from "react-native-paper";
import moment from 'moment'
import {Entypo, FontAwesome} from "@expo/vector-icons";
import {setLoadingAction, setOpenSetting, setUpdateCount} from "../../store/actions";
import CalendarBanner from "./CalendarBanner";
import ListAllInputs from "../../comps/ListAllInputs";
import * as Notifications from "expo-notifications";
import AddBtn from "../../comps/AddBtn";
import Loader from "../../comps/Loader";

const H = Dimensions.get('screen').height
const W = Dimensions.get('screen').width


function Home({theme, navigation, setOpenSetting, counter, setLoadingAction}) {
    const [list, setList] = useState([]);

    const getListOnDay = async (date) => {
        //TODO 1. найти из планирования все позиции с сегодняшней датой, найти из памяти все позиции с данным идентификатором 3. добавить в список (при удалении из планирования по id оно перестанет появляться)
        //возвращать новую сущность (объект input с массивом из одного времени)
        let actualItemsIdentifers = (await Notifications.getAllScheduledNotificationsAsync())?.filter((el, id) => {
            return moment(el.trigger.value).isSame(activeDay, 'days')
        })
        return await AsyncStorage.getItem('input')
            .then((data) => {
                if (data !== null) {
                    let result = (JSON.parse(data))
                    return actualItemsIdentifers.map(({identifier, trigger: {value}}, key) => {
                        let actualStore = result.find((el) => el.id.includes(identifier)) || {}
                        return {
                            ...actualStore,
                            identifier,
                            value,
                            time: [{H: new Date(value).getHours(), M: new Date(value).getMinutes()}],
                            key
                        }
                    })
                        .filter(el => el.id)
                        .sort((a, b) => a.value - b.value)
                }
            })
    }

    const [activeDay, setActiveDay] = useState(Date.now())

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setOpenSetting(true)} style={{marginRight: 10}}>
                    <View>
                        <Entypo name="cog" size={24} color={theme.titleItem}/>
                    </View>
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => setOpenSetting(true)} style={{marginLeft: 10}}>
                    <View>
                        <FontAwesome name="user-circle" size={24} color={theme.titleItem}/>
                    </View>
                </TouchableOpacity>
            ),
        });

        //UPDATE NEW LIST !!!
        navigation.addListener('focus', () => {
            updateList()
        })
    }, [])

    const updateList = () => (async () => {
        console.warn('update list home',)
        setLoadingAction(true)
        setList(await getListOnDay(activeDay))
        setLoadingAction(false)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    })()

    useEffect(() => {
        updateList()
    }, [activeDay, counter])

    const removeInputTodayOnly = async (el, key) => {
        try {
            await Notifications.cancelScheduledNotificationAsync(el.identifier || '')
            updateList()
        } catch (e) {
            console.warn(e)
        }
    }


    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <ImageBackground source={require('../../img/empty-bg.png')}
                             style={[styles.imageBox, {backgroundColor: theme.bg}]}
                             imageStyle={styles.image}>
                <CalendarBanner activeDay={activeDay} setActiveDay={setActiveDay} theme={theme}/>
                <View>
                    {list && list.length > 0 &&
                    <Text style={{
                        textAlign: 'center',
                        backgroundColor: theme.navBg,
                        width: W,
                        color: '#fff',
                        padding: 20,
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>
                        Для управления уведомлениями используйте свайп влево или вправо
                    </Text>}
                </View>

                <View style={{flex: 1, width: '100%', marginVertical: -10}}>

                    {/*LIST ALL LIST*/}
                    <List.Section>
                        <View style={styles.loaderContainer} >
                            <Loader/>
                        </View>
                        {list && list.length > 0 &&
                        <ListAllInputs list={list} setList={setList} removeInput={removeInputTodayOnly}
                                       navigation={navigation} theme={theme}/>}
                        {list && list.length === 0 && <View>
                            <Text style={{textAlign: 'center', marginTop: 0.2 * H, fontSize: 16}}>
                                Сегодня ничего
                                принимать
                                не нужно</Text>
                            <View style={{paddingHorizontal: 20, marginTop: 100}}>
                                <AddBtn/>
                            </View>
                        </View>}
                    </List.Section>
                </View>

            </ImageBackground>
        </View>
    );
}

const mapStateToProps = (state) => ({
    theme: state.theme,
    counter: state.counter
})
const mapDispatchToProps = {
    setOpenSetting,
    setUpdateCount,
    setLoadingAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnBox: {width: 300},
    imageBox: {
        flex: 1,
        resizeMode: "contain",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    image: {
        resizeMode: "cover",
        width: '100%'
    },
    btnAdd: {
        height: 60,
        // justifyContent: 'center',
        // marginBottom: H * 0.1,
        // position: 'absolute',
        // bottom: 0.1 * H
    },
    loaderContainer:{
        width:'100%',
        position:'absolute',

    }
});
