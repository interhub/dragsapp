import React, {useEffect, useState} from 'react';
import {AsyncStorage, Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import {Button, List} from "react-native-paper";
import {ADD} from "../../store/screenNames";
import moment from 'moment'
import {Entypo, FontAwesome} from "@expo/vector-icons";
import {setOpenSetting} from "../../store/actions";
import CalendarBanner from "./CalendarBanner";
import ListAllInputs from "../../comps/ListAllInputs";

const H = Dimensions.get('screen').height
const W = Dimensions.get('screen').width


function Home({theme, navigation, setOpenSetting}) {
    const [list, setList] = useState([]);

    const getListOnDay = async (date) => {
        return await AsyncStorage.getItem('input')
            .then((data) => {
                if (data !== null) {
                    let result = (JSON.parse(data))
                    // console.warn(result, 'RESULT')
                    return result.filter(d => (d?.days?.some(dat => (moment(dat).isSame(date, 'days')))))
                        .map((el, key) => ({
                            ...el,
                            key
                        }))
                }
            })
    }

    const [activeDay, setActiveDay] = useState(Date.now())

    useEffect(() => {
        (async () => {
            setList(await getListOnDay(activeDay))
        })()
    }, [activeDay])

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
            (async () => {
                setList(await getListOnDay(activeDay))
            })()
        })
    }, [])


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
                        {list && list.length > 0 &&
                        <ListAllInputs list={list} setList={setList} navigation={navigation} theme={theme}/>
                        }
                        {list && list.length === 0 &&
                        <Text style={{textAlign: 'center', marginTop: 0.2 * H, fontSize: 16}}>Сегодня ничего принимать
                            не нужно</Text>}
                    </List.Section>
                </View>
                <Button color={theme.topBg}
                        contentStyle={{height: '100%'}}
                        icon={() => <Entypo name="plus" size={24} color="#fff"/>}
                        mode="contained"
                        labelStyle={{color: '#fff'}}
                        style={styles.btnAdd}
                        onPress={() =>
                            navigation.navigate(ADD)
                        }>
                    Новое напоминание
                </Button>
            </ImageBackground>
        </View>
    );
}

const mapStateToProps = (state) => ({
    theme: state.theme
})
const mapDispatchToProps = {
    setOpenSetting
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
        justifyContent: 'center',
        // marginBottom: H * 0.1,
        position: 'absolute',
        bottom: 0.1 * H
    }
});
