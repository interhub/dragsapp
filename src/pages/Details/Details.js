import React, {useEffect, useRef, useState} from 'react';
import {AsyncStorage, Dimensions, LayoutAnimation, StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import * as Notifications from 'expo-notifications';
import {ADD, HOME} from "../../store/screenNames";
import {Divider, List, TouchableRipple} from "react-native-paper";
import {SwipeListView} from "react-native-swipe-list-view";
import ListItem from "./ListItem";
import RightOk from "../../comps/RightOk";
import LeftTime from "../../comps/LeftTime";
import uploadInput from "../../vars/uploadInput";
import UploadDialog from "../../comps/UploadDialog";

const H = Dimensions.get('screen').height;
const W = Dimensions.get('screen').width;
let close = true
let currentItem = {}


function Details({navigation, theme}) {
    const [list, setList] = useState([])

    useEffect(() => {
        return navigation.addListener('focus', () => {
            AsyncStorage.getItem('input')
                .then((data) => {
                    if (data !== null) {
                        let result = (JSON.parse(data)).map((el, key) => {
                            el['key'] = key
                            return el
                        });
                        setList(result)
                        // console.log(result, 'PRINT')
                    }
                })
        });
    }, []);

    const editInput = (el) => {
        el.id = []
        navigation.jumpTo(HOME, {callback: () => alert('hi')});
        setTimeout(() => {
            navigation.push(ADD, {edit: el})
        }, 300)
    }

    const removeInput = (el, key) => {
        LayoutAnimation.configureNext({
            duration: 700,
            create: {type: 'linear', property: 'opacity'},
            update: {type: 'spring', springDamping: 0.5},
            delete: {type: 'linear', property: 'scaleXY'}
        })
        let items = [...list];
        let item = items.find(el => el.key === key)
        let newList = items.filter(el => el.key !== key);
        setList(newList);
        item.id.forEach(str => Notifications.cancelScheduledNotificationAsync(str));
        AsyncStorage.setItem('input', JSON.stringify(newList));
    }

    const rowRef = useRef()

    const [visibleDialog, setVisibleDialog] = useState(false)
    return (
        <View>
            <UploadDialog
                back={() => {
                    rowRef.current.safeCloseOpenRow();
                }}
                setVisible={setVisibleDialog}
                visible={visibleDialog}
                callback={() => {
                    uploadInput(currentItem)
                    removeInput(currentItem, currentItem.key)
                }}/>
            <View style={styles.container}>
                <List.Section>
                    <List.Subheader>Просмотр всех записей</List.Subheader>
                    <Divider/>
                    {list.length > 0 &&
                    <SwipeListView
                        ListFooterComponent={
                            <View style={{height: 300}}/>
                        }
                        ref={rowRef}
                        onRowClose={() => {
                            close = true
                        }}
                        data={list}
                        renderItem={({item, index}) => (
                            <View onTouchStart={() => {
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
                        onLeftActionStatusChange={() => {
                            if (close) {
                                close = false
                                setVisibleDialog(true)
                                console.warn('open')
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        leftActivationValue={W - 100}
                        leftActionValue={W - 100}
                        leftOpenValue={W - 100}
                        rightOpenValue={-75}
                    />}
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
