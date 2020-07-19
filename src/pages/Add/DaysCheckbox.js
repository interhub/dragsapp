import React from 'react'
import { Text, View, StyleSheet } from "react-native";
import days from '../../vars/weekDays'
import { Checkbox } from "react-native-paper";
import { setName } from "../../store/actions";
import { connect } from "react-redux";

const DaysCheckbox = ( {theme, changeCheckbox, daysWeek} ) => {
  return <View style={styles.box}>
    {days.map(( el, id ) => {
      return (
        <View
          key={id}
          style={styles.itemBox}>
          <Text>{el.label}</Text>
          <Checkbox
            color={theme.navBg}
            status={daysWeek.includes(el.value) ? 'checked' : 'unchecked'}
            onPress={() => {
              changeCheckbox(el.value)
            }}
          />
        </View>
      )
    })}
  </View>
}

const styles = StyleSheet.create({
    box: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10
    },
    itemBox: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
)

const mapStateToProps = ( state ) => ({
  theme: state.theme
})

export default connect(mapStateToProps)(DaysCheckbox);
