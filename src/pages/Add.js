import React, { useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from "react-redux";
import { Button, Icon, Input } from "react-native-elements";
import put from "../service/notification";
import PeriodsName from '../vars/periodsName.js'
// import Drop from "react-native-material-dropdown";
import TimePicker from "react-native-24h-timepicker";
import { setScreen } from "../store/actions";
import { HOME } from "../store/screenNames";

const H = Dimensions.get('window').height;
// import CalendarPicker from "react-native-calendar-picker";
// import Dialog, { DialogContent } from "react-native-popup-dialog";

// id: Date.now(),
// medicineName: "Название препарата",
// usagePeriod: "everyday",
// usageTime: [],
// medicineType: types[0].value,
// medicineTypeLabel: types[0].label,
// dosage: null,
// startDateDay: null,
// startDateMonth: null,
// startDateYear: null,
// startDateVisible: false,
//
// endDateDay: null,
// endDateMonth: null,
// endDateYear: null,
// endDateVisible: false,
//
// checked: false,

function Add( {screen, navigation, setScreen} ) {
  const picker = useRef()
  const [input, setInput] = useState({
    id: [],
    name: '',
    period: PeriodsName.EVERYDAY,
    time: [],
    type: '',
    dose: ''
  })

  const nameInput = ( txt ) => {
    setInput({...input, name: txt})
  }
  const addTime = ( H, M ) => {
    let items = [...input.time];
    items.push({H, M})
    setInput({...input, time: items})
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Input
          value={input.name}
          onChangeText={nameInput}
          placeholder='Название препарата'
          leftIcon={{type: 'font-awesome', name: 'user', color: '#FFC56D'}}
        />
        {input.time.map(( el, id ) => {
          return <Text>
            {el.H}:{el.M}
          </Text>
        })}
        <Button title={'Вызвать уведомление'} onPress={() => put()}
                containerStyle={styles.btn}/>
        <Button title={'Назад'} onPress={() => {
          setScreen(HOME)
          navigation.goBack()
        }} containerStyle={styles.btn}/>
        <TouchableOpacity
          // activeOpacity={.9}
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
          // ref={( ref ) => {
          //   TimePicker = ref;
          // }}
          onCancel={() => picker.current.close()}
          onConfirm={( H, M ) => {
            addTime(H, M)
            picker.current.close()
          }
          }
        />
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
    alignItems: 'center',
    // justifyContent: 'center',
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
  }

});

//
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//   },
//   form: {},
//   input: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E2E2E2",
//     width: Dimensions.get("window").width,
//   },
//
//   usageTimeMainContainer: {
//     flexWrap: "wrap",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E2E2E2",
//   },
//   usageTimeInputContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     alignItems: "center",
//     width: Dimensions.get("window").width,
//     justifyContent: "space-between",
//   },
//   usageTimeItem: {
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 18,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
//
//     elevation: 3,
//     marginRight: 20,
//     marginBottom: 20,
//   },
//   doseTextInput: {
//     width: "50%",
//     height: 40,
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     marginLeft: 20,
//     paddingLeft: 0,
//     fontSize: 15,
//     borderColor: "rgb(225, 225, 225)",
//   },
//
//   dropdown: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     paddingBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E2E2E2",
//   },
//   inputText: {
//     fontSize: 18,
//     color: "#000",
//   },
// });
