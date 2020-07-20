import React, { useState } from 'react'
import { Banner } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";

const CalendarBanner = ( {theme} ) => {
  return <View style={{
    ...styles.calendarBox,
    backgroundColor: theme.navBg
  }}>
    <View style={styles.col}>

    </View>

  </View>
}

const styles = StyleSheet.create({
  calendarBox: {
    width: '100%',
    height: 150,
  },
  col: {}
})

export default CalendarBanner
