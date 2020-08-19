import React, {useEffect, useRef, useState} from 'react';
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
import {Button, List, TouchableRipple} from "react-native-paper";
import {ADD, HOME} from "../../store/screenNames";
import moment from 'moment'
import {Entypo, FontAwesome} from "@expo/vector-icons";
import {setOpenSetting} from "../../store/actions";
import CalendarBanner from "./CalendarBanner";
import {SwipeListView} from "react-native-swipe-list-view";
import ListItem from "../Details/ListItem";
import * as Notifications from "expo-notifications";
import RightOk from "../../comps/RightOk";
import LeftTime from "../../comps/LeftTime";
import uploadInput from "../../vars/uploadInput";
import UploadDialog from "../../comps/UploadDialog";

const H = Dimensions.get('screen').height
const W = Dimensions.get('screen').width
let close = true
let currentItem = {}

function Home({theme, navigation, setOpenSetting}) {
    const [list, setList] = useState([]);

    const getListOnDay = async (date) => {
        return await AsyncStorage.getItem('input')
            .then((data) => {
                if (data !== null) {
                    let result = (JSON.parse(data)).map((el, key) => {
                        el['key'] = key
                        return el
                    })
                    // console.log(result, 'RESULT')
                    return result.filter(d => (d?.days?.some(dat => (moment(dat).isSame(date, 'days')))))
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
    }, [])

    const editInput = (el) => {
        el.id = []
        navigation.jumpTo(HOME, {callback: () => alert('hi')});
        setTimeout(() => {
            navigation.push(ADD, {edit: el})
        }, 300)
    }
    const removeInput = (el, key) => {
        // console.warn(el,key)
        // LayoutAnimation.configureNext({
        //     duration: 700,
        //     create: {type: 'linear', property: 'opacity'},
        //     update: {type: 'spring', springDamping: 0.5},
        //     delete: {type: 'linear', property: 'scaleXY'}
        // })
        let items = [...list];
        let item = items.find(el => el.key === key)
        setList(items.filter(el => el.key !== key));
        item.id.forEach(str => Notifications.dismissAllNotificationsAsync(str));
        AsyncStorage.setItem('input', JSON.stringify(items));
    }

    const [visibleDialog, setVisibleDialog] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false);

    const rowRef = useRef()

    // const now = moment().format('DD - MMMM, hh:mm');
    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <UploadDialog
                title={'Завершить напомниание'}
                text={'Напомнить через 30 минут?'}
                back={() => {
                    rowRef.current.safeCloseOpenRow();
                }}
                setVisible={setVisibleDialog}
                visible={visibleDialog}
                callback={() => {
                    uploadInput(currentItem)
                    removeInput(currentItem, currentItem.key)
                }}/>
            <UploadDialog
                title={'Удалить'}
                text={'Напомнание будет удалено'}
                back={() => {
                    rowRef.current.safeCloseOpenRow();
                }}
                setVisible={setVisibleDelete}
                visible={visibleDelete}
                callback={() => {
                    removeInput(currentItem, currentItem.key)
                }}/>
            <ImageBackground source={require('../../img/empty-bg.png')}
                             style={[styles.imageBox, {backgroundColor: theme.bg}]}
                             imageStyle={styles.image}>
                <CalendarBanner activeDay={activeDay} setActiveDay={setActiveDay} theme={theme}/>
                <View>
                    {list && list.length > 0 &&
                    <Text style={{textAlign: 'center', backgroundColor: theme.navBg, color: '#fff', padding: 32}}>
                        Для управления уведомлениями используйте свайп влево или вправо
                    </Text>}
                </View>
                <View style={{flex: 1, width: '100%', marginVertical: -10}}>
                    <List.Section>
                        {list && list.length > 0 &&
                        <SwipeListView
                            ref={rowRef}
                            onRowClose={() => {
                                close = true
                            }}
                            data={list}
                            swipeRowStyle={{marginTop: 20}}
                            renderItem={({item}) => (
                                <View
                                    onTouchStart={() => {
                                        currentItem = item;
                                    }}>
                                    <ListItem theme={theme}
                                              key={item.key}
                                              item={item}
                                              editInput={() => editInput(item)}
                                    />
                                </View>
                            )}
                            renderHiddenItem={(data, rowMap) => (
                                <View
                                    style={{padding: 5, borderRadius: 25, overflow: 'hidden'}}>
                                    <View
                                        style={{
                                            backgroundColor: '#1A77D2',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            height: '100%',
                                        }}>
                                        <View>
                                            <LeftTime/>
                                        </View>
                                        <TouchableRipple
                                            onPress={() => removeInput(data.item, data.item.key)}>
                                            <RightOk/>
                                        </TouchableRipple>
                                    </View>
                                </View>
                            )}
                            onLeftActionStatusChange={({isActivated}) => {
                                if (close && isActivated) {
                                    close = false
                                    setVisibleDelete(true)
                                    console.warn('open', isActivated)
                                }
                            }}
                            onRightActionStatusChange={({isActivated}) => {
                                if (close && isActivated) {
                                    close = false
                                    setVisibleDelete(true)
                                    console.warn('open')
                                }
                            }}
                            keyExtractor={(item, index) => index.toString()}

                            leftActivationValue={W - 100}
                            leftActionValue={W - 100}
                            leftOpenValue={W - 100}

                            rightActivationValue={-W + 100}
                            rightActionValue={-W + 100}
                            rightOpenValue={-W + 100}
                        />}
                        {list && list.length === 0 &&
                        <Text style={{textAlign: 'center'}}>Сегодня ничего принимать не нужно</Text>}
                    </List.Section>
                </View>
                <Button color={theme.darkblue}
                        contentStyle={{height: '100%'}}
                        icon={() => <Entypo name="plus" size={24} color="#fff"/>}
                        mode="contained"
                        style={styles.btnAdd}
                        onPress={() =>
                            navigation.push(ADD)
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
