import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions, StyleSheet, Text,
  View
} from 'react-native';
import { Button, Input } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/index";

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export default ( {startEnd, input} ) => {
  const [openStart, setOpenStart] = useState(false)
  const [openEnd, setOpenEnd] = useState(false)
  const [infoStart, setInfoStart] = useState('')
  const [infoEnd, setInfoEnd] = useState('')

  useEffect(() => {
    //разница во времени до старта
    let difToStart = input.start === 0 ? 0 : Math.abs(moment(input.start).diff(Date.now(), 'days')) + 1
    let difStartEnd = Math.abs(moment(input.end).diff(input.start || Date.now(), 'days')) + 1
    switch (difToStart) {
      case 1:
        setInfoStart('Сегодня');
        break;
      default:
        setInfoStart('(Через ' + difToStart + ' Дней)');
        break;
    }
    switch (difStartEnd) {
      case 0:
        setInfoEnd('Только сегодня');
        break;
      default:
        setInfoEnd('(Всего ' + difStartEnd + ' дней)');
        // setInfoEnd('Установить');
        break;
    }

  }, [input])

  return <View style={styles.container}>
    <View style={styles.btnBox}>
      <View style={styles.itemBox}>
        <View style={styles.pd}>
          <Text style={styles.text}>Начало</Text>
        </View>
        <TouchableRipple onPress={() => setOpenStart(true)}>
          <Text style={styles.dateText}>{
            input.start === 0 ?
              'Сегодня' :
              (moment(input.start).format('DD-MM-YYYY ')) + infoStart
          }</Text>
        </TouchableRipple>
      </View>
      <View style={styles.itemBox}>
        <View style={styles.pd}>
          <Text style={styles.text}>Конец</Text>
        </View>
        <TouchableRipple style={styles.dateText} onPress={() => setOpenEnd(true)}>
          <Text style={styles.dateText}>{
            input.end === 0 ?
              'Не ограничено' :
              (moment(input.end).format('DD-MM-YYYY ')) + infoEnd
          }</Text>
        </TouchableRipple>
      </View>
    </View>

    {openStart && <DateTimePicker
      display={'calendar'}
      value={new Date()}
      mode={'date'}
      is24Hour={true}
      minimumDate={new Date()}
      onChange={( e ) => {
        setOpenStart(false)
        startEnd('start', e.nativeEvent.timestamp)
      }}
    />}
    {openEnd && <DateTimePicker
      display={'calendar'}
      value={new Date()}
      minimumDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
      mode={'date'}
      is24Hour={true}
      onChange={( e ) => {
        setOpenEnd(false)
        startEnd('end', e.nativeEvent.timestamp)
      }}
    />}
  </View>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10
  },
  btnBox: {
    width: '100%',
  },
  itemBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'flex-start'
  },
  text: {
    color: '#535353'
  },
  pd: {
    padding: 5
  },
  dateText: {
    color: '#1666C0'
  }
});
