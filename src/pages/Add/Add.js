import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { List, TextInput, Divider } from 'react-native-paper';
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Button, Icon, Input } from "react-native-elements";
import setNotification from "../../service/notification";
import PeriodsName from '../../vars/periodsName.js'
import TimePicker from "react-native-24h-timepicker";
import { DETAILS, HOME } from "../../store/screenNames";
import SelectPeriod from "./SelectPeriod";
import TypesName from '../../vars/typesName.js'
import SelectTypes from "./SelectTypes";
import InputDate from "./InputDate";
import moment from 'moment'
import { AsyncStorage } from 'react-native';
import { StackActions } from '@react-navigation/native';
import * as Promise from "bluebird";
import getDaysArray from "../../vars/getDaysArray";
import DaysCheckbox from "./DaysCheckbox";
import { getBackgroundColor } from "react-native/Libraries/LogBox/UI/LogBoxStyle";
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/index.native";
import * as Colors from "react-native-paper";

const H = Dimensions.get('window').height;

function Add( {route, screen, navigation, theme} ) {
  const edit = route?.params?.edit;
  const picker = useRef()
  //состояние данных ввода
  const [input, setInput] = useState({
    id: [],
    name: '',
    period: '',//PeriodsName.EVERYDAY,
    time: [{
      H: 8,
      M: 30,
    }],
    type: '',//TypesName.TABLET,
    dose: 0,
    start: 0,
    end: 0,
    daysWeek: [1, 3, 5],
    days: []
  })

  useEffect(() => {
    if (edit) {
      setInput(edit)
      navigation.setOptions({title: 'Редактирование'})
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    }
  }, [])

  //изменение имени препарата
  const nameInput = ( txt ) => {
    setInput({...input, name: txt})
  }
  //добавить время приема в массив
  const addTime = ( H, M ) => {
    let items = [...input.time];
    items.push({H, M})
    setInput({...input, time: items})
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }
  //удалить время из массива
  const removeTime = ( id ) => {
    if (input.time.length === 1) {
      return
    }
    let items = [...input.time]
    items.splice(id, 1);
    setInput({...input, time: items})
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }
  //изменение периода
  const onSelectPeriod = ( period ) => {
    if (period) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setInput({...input, period})
    }
  }
  //изменение единицы изменения (капли , ложки и тд...)
  const onSelectType = ( type ) => {
    if (type) {
      setInput({...input, type})
    }
  }
  //изменение числа дозировки
  const onSelectDose = ( dose ) => {
    if (dose) {
      setInput({...input, dose})
    }
  }
  //изменнение начала или конца курса с фильтром
  const startEnd = ( param, date ) => {
    if (param in input && typeof date == 'number' && date) {
      setInput({...input, [param]: date})
    } else {
      setInput({...input, [param]: 0})
    }
  }
  //добавление или удаления дня недели
  const changeCheckbox = ( num ) => {
    let daysWeek = [...input.daysWeek];
    daysWeek.includes(num) ?
      daysWeek.splice(daysWeek.findIndex(( find ) => find === num), 1) :
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
      alert('Заполните все поля')
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
                  // navigation.goBack()
                  navigation.dispatch(StackActions.popToTop());
                  setTimeout(() => {
                    navigation.jumpTo(DETAILS)
                  }, 100)
                })
  }

  useEffect(() => {
    console.log(input)
  }, [input.name])


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
               .then(( els ) => {
                 setInput({...input, id: [...els]})
                 saveOnDevice()
               })
      }
    })
    .catch(e => {
      console.log(e)
    })
  }


  return (
    <ScrollView>
      <View style={styles.container}>
        {/*<View style={{alignItems: 'center'}}>*/}
        {/*  <Button title={'Тестировать уведомление'} onPress={() => testNotification()}*/}
        {/*          containerStyle={styles.btn}/>*/}
        {/*  <Button title={'Назад'} onPress={() => {*/}
        {/*    navigation.goBack()*/}
        {/*  }} containerStyle={styles.btn}/>*/}
        {/*</View>*/}
        <Input
          inputStyle={styles.inName}
          value={input.name}
          onChangeText={nameInput}
          placeholder={'Название лекарства'}
        />
        {/*<TextInput*/}
        {/*  style={{backgroundColor: '#fff', color: 'red'}}*/}
        {/*  // mode={'outlined'}*/}
        {/*  color='#fcf'*/}
        {/*  selectionColor={'#fcf'}*/}
        {/*  label="Название лекарства"*/}
        {/*  value={input.name}*/}
        {/*  onChangeText={nameInput}*/}
        {/*/>*/}
        {/*SELECT PERIOD-----------------------------------------------*/}
        <View style={styles.boxSelect}>
          <SelectPeriod input={input} onSelectPeriod={onSelectPeriod}/>
        </View>
        {/*PERIOD CHECKBOXES WEEK-----------------------------------------------*/}
        {input.period === PeriodsName.CHECKBOX &&
        <View>
          <DaysCheckbox changeCheckbox={changeCheckbox} daysWeek={input.daysWeek}/>
        </View>}
        <Divider/>
        {/*LIST TIMES-----------------------------------------------*/}
        <View style={{margin: -3}}>
          <List.Section>
            <List.Subheader>Сколько раз в день</List.Subheader>
            <List.Item
              titleStyle={{textAlign: 'center'}}
              title={input.time.length}
              right={( props ) =>
                <TouchableRipple onPress={() => {
                  picker.current.open()
                }}>

                  <List.Icon {...props}
                             icon="plus" color={theme.navBg}/>
                </TouchableRipple>}
              left={( props ) =>
                <TouchableRipple onPress={() => {
                  removeTime(input.time.length - 1)
                }}>
                  <List.Icon {...props}
                             icon="minus"
                             color={theme.navBg}/>
                </TouchableRipple>}/>
            <Divider/>
            <List.Subheader>Ваше расписание</List.Subheader>
            {input.time.sort(( a, b ) => (a !== b) ? (a.H - b.H) : (a.M - b.M)).map(( t, id ) => {
              return <List.Item
                style={{backgroundColor: '#E3F2FD', borderRadius: 8, margin:5}}
                right={( props ) =>
                  <Entypo onPress={()=>alert('hi')} style={{marginTop: 15}} name="chevron-right" size={24} color={'#999'} />
                  }
                          key={id}
                          title={moment(`${t.H}-${t.M}`, 'HH mm').format('HH:mm')}
                          left={() => <List.Icon icon="clock" color={theme.navBg}/>}
                  />
                })}
            </List.Section>
            </View>
            {/*<View style={{alignItems: 'center'}}>*/}
            {/*  {input.time.sort(( a, b ) => (a !== b) ? (a.H - b.H) : (a.M - b.M)).map(( el, id ) => {*/}
            {/*    return <TouchableOpacity key={id}*/}
            {/*                             onPress={() => removeTime(id)}*/}
            {/*                             style={{flexDirection: 'row', justifyContent: 'space-between'}}>*/}
            {/*      <Text style={{margin: 10}}>*/}
            {/*        {el.H}:{el.M}*/}
            {/*      </Text>*/}
            {/*      <Text style={{borderWidth: 1, margin: 3, borderRadius: 10, padding: 5}}>*/}
            {/*        Удалить*/}
            {/*      </Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*  })}*/}
            {/*</View>*/}
            {/*BUTTON TIMES-----------------------------------------------*/}
            <TouchableOpacity
            // activeOpacity={.9}
            style={{alignItems: 'center',}}
            onPress={() => {
            picker.current.open()
            }}>
            <View style={styles.btnContainer}>
            <Text style={{fontSize: 20}}>Время приема</Text>
            <Text style={{fontSize: 15}}>Добавить</Text>
            </View>
            </TouchableOpacity>
            {/*TIME SELECTOR DOWN SLIDER-----------------------------------------------*/}
            <TimePicker
            minuteInterval={5}
            textCancel={"Назад"}
            textConfirm={"Принять"}
            ref={picker}
            onCancel={() => picker.current.close()}
            onConfirm={( H, M ) => {
            addTime(H, M)
            picker.current.close()
            }
            }
            />
            {/*TIME TYPE AND DOSE SELECTORS-----------------------------------------------*/}
            <SelectTypes onSelectType={onSelectType} onSelectDose={onSelectDose} input={input}/>
            {/*DATE PICKERS-----------------------------------------------*/}
            <InputDate input={input} startEnd={startEnd}/>
            {/*ADD BTN-----------------------------------------------*/}
            <View>
            <Button
            onPress={addInput}
            buttonStyle={{height: 60}}
            containerStyle={{padding: 15}}
            title={'Добавить'}/>
            </View>
            </View>
            </ScrollView>

            );
            }

            const mapStateToProps = ( state ) => ({
            screen: state.screen,
            theme: state.theme
            })

            const mapDispatchToProps = {}


            export default connect(mapStateToProps, mapDispatchToProps)(Add)

            const styles = StyleSheet.create({
            container: {
            padding: 10,
            flex: 1,
            minHeight: H,
            backgroundColor: '#fff',
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
