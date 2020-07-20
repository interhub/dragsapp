import React from 'react'
import { View } from "react-native";
import { Divider, List } from "react-native-paper";
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/index.native";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import TimePicker from "react-native-24h-timepicker";

export const PickerAdd = ( {picker, addTime} ) => {
  return (
    <View>
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
    </View>
  )
}
export const PickerUpdate = ( {updatePicker, updateTime, editedNumber} ) => {
  return (
    <View>
      <TimePicker
        minuteInterval={5}
        textCancel={"Назад"}
        textConfirm={"Принять"}
        ref={updatePicker}
        onCancel={() => updatePicker.current.close()}
        onConfirm={( H, M ) => {
          updateTime(H, M, editedNumber)
          console.log(editedNumber, 'updateTime')
          updatePicker.current.close()
        }
        }
      />
    </View>
  )
}


