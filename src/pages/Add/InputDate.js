import React, { useRef, useState } from 'react';
import {
  Dimensions, StyleSheet, Text,
  View
} from 'react-native';
import { Button, Input } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export default ( {startEnd, input} ) => {
  const [openStart, setOpenStart] = useState(false)
  const [openEnd, setOpenEnd] = useState(false)

  return <View style={styles.container}>
    <View style={styles.btnBox}>
      <Button
        onPress={() => setOpenStart(true)}
        title={'Установить начало курса приема'}/>
      <Text>{input.start ? new Date((input.start)).toLocaleDateString() : ''}</Text>
      <Button
        buttonStyle={{marginTop: 10}}
        onPress={() => setOpenEnd(true)}
        title={'Установить окончание курса приема'}/>
      <Text>{input.end ? new Date((input.end)).toLocaleDateString() : ''}</Text>

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
      minimumDate={new Date(Date.now()+1000*60*60*24)}
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
  },
  btnBox: {
    width: 300,


  },


});
