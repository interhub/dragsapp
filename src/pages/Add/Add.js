import React, {useEffect, useState} from 'react';
import {AsyncStorage, Dimensions, LayoutAnimation, ScrollView, StyleSheet, View} from 'react-native';
import {Divider, HelperText, TextInput} from 'react-native-paper';
import {connect} from "react-redux";
import {Button} from "react-native-elements";
import setNotification from "../../service/notification";
import PeriodsName from '../../vars/periodsName.js'
import {DETAILS} from "../../store/screenNames";
import SelectPeriod from "./SelectPeriod";
import SelectTypes from "./SelectTypes";
import InputDate from "./InputDate";
import * as Promise from "bluebird";
import getDaysArray from "../../vars/getDaysArray";
import DaysCheckbox from "./DaysCheckbox";
import TimePanel from "./TimePanel";
import Message from "../../comps/Message";
import typesName from "../../vars/typesName";
import moment from "moment";

const H = Dimensions.get('screen').height;

const initialInput = {
    id: [],
    name: '',
    period: '',//PeriodsName.EVERYDAY,
    time: [{
        H: 8,
        M: 30,
        key: 0
    }],
    type: typesName.TABLET,//TypesName.TABLET,
    dose: 1,
    start: 0,
    end: 0,
    daysWeek: [1, 3, 5],
    days: []
}

const themePaper = {
    colors: {
        primary: '#777',
        background: 'rgba(255,255,255,0)',
    }
};


function Add({route, screen, navigation, theme}) {
    const edit = route?.params?.edit;
    //состояние данных ввода
    const [input, setInput] = useState(initialInput)


    useEffect(() => {
        if (edit) {
            setInput(edit)
            navigation.setOptions({title: 'Редактирование'})
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        }
    }, [])
    const sortByTime = (items) => {
        return items.sort((a, b) => {
            return moment(`${a.H}:${a.M}`, 'HH:mm').valueOf() - moment(`${b.H}:${b.M}`, 'HH:mm').valueOf()
        }).map((el, key) => ({...el, key}))
    }

    //изменение имени препарата
    const nameInput = (txt) => {
        setInput({...input, name: txt})
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
    //добавить время приема в массив
    const addTime = (H, M) => {
        let items = [...input.time];
        items.push({H, M, key: Math.max(...input.time.map(el => el.key)) + 1})
        items = sortByTime(items)
        setInput({...input, time: items})
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    }
    //удалить время из массива
    const removeTime = (key) => {
        if (input.time.length === 1) {
            return false
        }
        let time = [...input.time].filter(el => el.key !== key);
        setInput({...input, time})
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    }

    //обновление времени
    const updateTime = (H, M, key) => {
        let time = [...input.time]
        let index = time.findIndex(el => el.key === key)
        time[index] = {H, M}
        time = sortByTime(time)
        setInput({...input, time})
    }
    //изменение периода
    const onSelectPeriod = (period) => {
        if (period) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            setInput({...input, period})
        }
    }
    //изменение единицы изменения (капли , ложки и тд...)
    const onSelectType = (type) => {
        if (type) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            setInput({...input, type})
        }
    }
    //изменение числа дозировки
    const onSelectDose = (dose) => {
        if (dose) {
            setInput({...input, dose})
        } else {
            setInput({...input, dose: 0})
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
    //изменнение начала или конца курса с фильтром
    const startEnd = (param, date) => {
        if (param in input && typeof date == 'number' && date) {
            setInput({...input, [param]: date})
        } else {
            setInput({...input, [param]: 0})
        }
    }
    //добавление или удаления дня недели
    const changeCheckbox = (num) => {
        let daysWeek = [...input.daysWeek];
        daysWeek.includes(num) ?
            daysWeek.splice(daysWeek.findIndex((find) => find === num), 1) :
            daysWeek.push(num)
        setInput({...input, daysWeek})
    }

    //установка нового значения days на основе нового набора данных ввода
    useEffect(() => {
        input.days = getDaysArray({...input})
    }, [input])

    //проверка полей ввода на пустоту
    const confirmForm = () => {
        if (
            input.name === '' ||
            !input.period ||
            input.time.length === 0 ||
            !input.type ||
            input.dose === 0
        ) {
            Message('Заполните все поля')
            return false
        }
        return true
    }
    //сохранить отчет в памяти устройства
    const saveOnDevice = () => {
        AsyncStorage.getItem('input')
            .then(data => {
                console.log(input, "NEW INPUT")
                if (data === null) {
                    return AsyncStorage.setItem('input', JSON.stringify([{...input}]))
                } else {
                    return AsyncStorage.setItem('input', JSON.stringify([...JSON.parse(data), {...input}]))
                }
            })
            .then(() => {
                navigation.goBack()
                // navigation.dispatch(StackActions.popToTop());
                setTimeout(() => {
                    navigation.jumpTo(DETAILS)
                }, 100)
            })
    }

    useEffect(() => {
        if (input.id.length > 0) {
            return saveOnDevice()
        }
    }, [input])

    //итоговое добавление записи
    const addInput = () => {
        // console.log(moment(input.end).diff(input.start, 'days'), 'diffff')
        if (!confirmForm()) {
            return
        }
        setNotification({...input})
            .then(mass => {
                if (Array.isArray(mass)) {
                    Promise.all(mass)
                        .then((els) => {

                            setInput({...input, id: [...els]})
                        })
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const step1 = input.name !== '';
    const step2 = step1 && input.type !== '' && input.dose !== 0;
    const step3 = step2 && input.period !== ''

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <View>
                    <TextInput
                        theme={{colors: themePaper.colors}}
                        value={input.name}
                        autoFocus={!edit}
                        onChangeText={nameInput}
                        label={'Название лекарства'}
                    />
                </View>

                {/*TIME TYPE AND DOSE SELECTORS-----------------------------------------------*/}
                <View style={{height: step1 ? 'auto' : 0, overflow: 'hidden'}}>
                    <SelectTypes themePaper={themePaper}
                                 onSelectType={onSelectType}
                                 onSelectDose={onSelectDose}
                                 input={input}/>
                </View>
                {/*SELECT PERIOD-----------------------------------------------*/}
                {step2 && <View style={styles.boxSelect}>
                    <HelperText type={'info'}
                                style={{marginLeft: 4, marginBottom: -10}}
                                visible={step3}>
                        Расписание
                    </HelperText>
                    <SelectPeriod themePaper={themePaper} input={input} onSelectPeriod={onSelectPeriod}/>
                </View>}
                {/*PERIOD CHECKBOXES WEEK-----------------------------------------------*/}
                {input.period === PeriodsName.CHECKBOX && step2 &&
                <View>
                    <DaysCheckbox changeCheckbox={changeCheckbox} daysWeek={input.daysWeek}/>
                </View>}
                {/*{step3 && <Divider/>}*/}
                {/*LIST TIMES+PICKER PANELS-----------------------------------------------*/}
                {step3 && <TimePanel input={input}
                                     themePaper={themePaper}
                                     removeTime={removeTime}
                                     theme={theme}
                                     addTime={addTime}
                                     updateTime={updateTime}/>}
                {/*DATE PICKERS-----------------------------------------------*/}
                {step3 && <InputDate input={input} startEnd={startEnd}/>}
                {/*ADD BTN-----------------------------------------------*/}
                {step3 && <View>
                    <Button
                        onPress={addInput}
                        buttonStyle={{height: 60, backgroundColor: theme.navBg}}
                        containerStyle={{padding: 15}}
                        title={'Сохранить напоминание'}/>
                </View>}
            </View>
        </ScrollView>

    );
}

const mapStateToProps = (state) => ({
    screen: state.screen,
    theme: state.theme
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Add)

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 50,
        flex: 1,
        minHeight: H / 2,
        backgroundColor: '#fff',
        // flexDirection: 'column',
        justifyContent: 'center'
    },
    inName: {
        margin: 0,
        padding: 0,
        fontSize: 16
    },
    btnBox: {width: 300},
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 80,
        // borderTopWidth: 0.5,
    },
    boxSelect: {
        marginBottom: 30
    },
});
