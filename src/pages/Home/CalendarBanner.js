import React, { useEffect, useState } from 'react'
import { Banner } from "react-native-paper";
import { Image, StyleSheet, Text, View } from "react-native";
import weekDays from "../../vars/weekDays";
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/index";

const CalendarBanner = ( {theme, activeDay, setActiveDay} ) => {

  const [arrayDate, setArrayDate] = useState([])

  useEffect(() => {
    let now = Date.now()
    let backDay = new Date(now).setDate(new Date(now).getDate() - 1)
    let next = Array(5).fill(1).map(( _, i ) => new Date(now).setDate(new Date(now).getDate() + 1 + i))
    setArrayDate([backDay, now, ...next])
  }, [])


  return <View style={{
    ...styles.calendarBox,
    backgroundColor: theme.navBg
  }}>
    {arrayDate.map(( el, id ) => {
      const getThisDate = () => new Date(activeDay).getDate() === new Date(el).getDate();
      return <View style={styles.col}>
        <View>
          <Text style={styles.text}>
            {new Date(el).getDate()}
          </Text>
        </View>
        <TouchableRipple
          onPress={() => setActiveDay(el)}
          style={styles.week}>
          <Text style={[styles.text, (getThisDate() ? styles.activeText : {})]}>
            {weekDays.find(d => d.value === new Date(el).getDay()).label}
          </Text>
        </TouchableRipple>
      </View>
    })}
  </View>
}

const styles = StyleSheet.create({
  calendarBox: {
    width: '100%',
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
    width: 35,
    height: 35,
    paddingTop: 5
  },
  activeText: {
    color: '#0D48A1',
    backgroundColor: '#fff',
    borderRadius: 50
  },
  col: {},
  week: {}
})

export default CalendarBanner
