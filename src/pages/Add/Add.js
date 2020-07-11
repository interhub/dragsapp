import React, { useRef, useState } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from "react-redux";
import { Button, Divider, Icon, Input } from "react-native-elements";
import setNotification from "../../service/notification";
import PeriodsName from '../../vars/periodsName.js'
import TimePicker from "react-native-24h-timepicker";
import { setScreen } from "../../store/actions";
import { HOME } from "../../store/screenNames";
import SelectPeriod from "./SelectPeriod";
import TypesName from '../../vars/typesName.js'
import SelectTypes from "./SelectTypes";
import InputDate from "./InputDate";
import moment from 'moment'
import { AsyncStorage } from 'react-native';

const H = Dimensions.get('window').height;

function Add( {screen, navigation, setScreen} ) {
  const picker = useRef()
  //состояние данных ввода
  const [input, setInput] = useState({
    id: [],
    name: '',
    period: '',//PeriodsName.EVERYDAY,
    time: [],
    type: '',//TypesName.TABLET,
    dose: 0,
    start: 0,
    end: 0
  })
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
    let items = [...input.time]
    items.splice(id, 1);
    setInput({...input, time: items})
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }
  //изменение периода
  const onSelectPeriod = ( period ) => {
    if (period) {
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
    console.log(date, 'date in')
    if (param in input && typeof date == 'number' && date) {
      setInput({...input, [param]: date})
    } else {
      setInput({...input, [param]: 0})
    }
  }
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
    // AsyncStorage.setItem('input', JSON.stringify(input))
    AsyncStorage.getItem('inputs')
                .then(data => {
                  if (data === null) {
                    return AsyncStorage.setItem('input', JSON.stringify([input]))
                  } else {
                    return AsyncStorage.setItem('input', JSON.stringify([...data, input]))
                  }
                })
                .then(() => {
                  navigation.goBack()
                })
  }

  //notifications call test
  const testNotification = () => {
    setNotification({test: true})
    .then(() => {
    })
  }


  //итоговое добавление записи
  const addInput = () => {
    // console.log(moment(input.end).diff(input.start, 'days'), 'diffff')
    confirmForm() //TODO
    setNotification(input)
    .then(ids => {
      if (Array.isArray(ids)) {
        console.log('IDS GETED')
        setInput({...input, id: [...ids]})
        saveOnDevice()
      }
    })
    .catch(e => {
      console.log(e)
    })
  }


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Button title={'Тестировать уведомление'} onPress={() => testNotification()}
                  containerStyle={styles.btn}/>
          <Button title={'Назад'} onPress={() => {
            setScreen(HOME)
            navigation.goBack()
          }} containerStyle={styles.btn}/>
        </View>
        <Input
          value={input.name}
          onChangeText={nameInput}
          placeholder='Название препарата'
          leftIcon={{type: 'font-awesome', name: 'user', color: '#FFC56D'}}
        />
        <View style={styles.boxSelect}>
          <SelectPeriod input={input} onSelectPeriod={onSelectPeriod}/>
          <Divider style={{margin: 15}}/>
        </View>
        <View style={{alignItems: 'center'}}>
          {input.time.sort(( a, b ) => (a !== b) ? (a.H - b.H) : (a.M - b.M)).map(( el, id ) => {
            return <TouchableOpacity key={id}
                                     onPress={() => removeTime(id)}
                                     style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{margin: 10}}>
                {el.H}:{el.M}
              </Text>
              <Text style={{borderWidth: 1, margin: 3, borderRadius: 10, padding: 5}}>
                Удалить
              </Text>
            </TouchableOpacity>
          })}
        </View>

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
        {/*<Button title={'Открыть ввод'} onPress={() => picker.current.open()} containerStyle={styles.btn}/>*/}
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
        <SelectTypes onSelectType={onSelectType} onSelectDose={onSelectDose} input={input}/>
        <InputDate input={input} startEnd={startEnd}/>
        <View>
          {/*<Dimensions/>*/}
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
  screen: state.screen
})

const mapDispatchToProps = {
  setScreen
}


export default connect(mapStateToProps, mapDispatchToProps)(Add)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: H,
    backgroundColor: '#fff',
  },
  btn: {
    width: '90%',
    margin: 10
  },
  btnBox: {width: 300},
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 355,
    height: 80,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  boxSelect: {},
});
