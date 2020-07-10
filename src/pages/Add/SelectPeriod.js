import React, { useRef, useState } from 'react';
import {
  Dimensions, StyleSheet,
  View
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Periods from '../../vars/periods.js'
import PeriodsName from '../../vars/periodsName.js'

const H = Dimensions.get('window').height;

export default ( {input, onSelectPeriod} ) => {
  return <View>
    <RNPickerSelect
      value={input.period}
      style={styles.select}
      placeholder={{
        label: 'Периодичность приема',
        value: null,
        color: '#9EA0A4',
      }}
      onValueChange={onSelectPeriod}
      items={Periods}
    />
  </View>
}

const styles = StyleSheet.create({
  select: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    color: 'black',
    borderBottomWidth: 1,
    paddingRight: 30,
  }
});
