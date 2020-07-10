import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import put from "../service/notification";

import { Dropdown } from "react-native-material-dropdown";
import TimePicker from "react-native-24h-timepicker";
import CalendarPicker from "react-native-calendar-picker";
import Dialog, { DialogContent } from "react-native-popup-dialog";

let periods = [
  {
    value: "everyday",
    label: "Каждый день",
  },
  {
    value: "twodays",
    label: "Каждые два дня",
  },
  {
    value: "threedays",
    label: "Каждые три дня",
  },
  {
    value: "nomatter",
    label: "Не имеет значения",
  },
];

let types = [
  {
    value: "tablet",
    label: "Таблетка(-и/-ок)",
  },
  {
    value: "ampule",
    label: "Ампул(-а/-ы)",
  },
  {
    value: "cups",
    label: "Чашка(-и/-ек)",
  },
  {
    value: "drops",
    label: "Капля(-и/-ель)",
  },
  {
    value: "syringe",
    label: "Шприц(-а/-ов)",
  },
  {
    value: "capsule",
    label: "Капсул(-а, -ы)",
  },
  {
    value: "tablespoon",
    label: "Стол. ложка(-и/-ек)",
  },
  {
    value: "teaspoon",
    label: "Чай. ложка(-и/-ек)",
  },
  {
    value: "gr",
    label: "Грамм",
  },
  {
    value: "ml",
    label: "мл",
  },
];

function Add( {screen, navigation} ) {
  const [item,setItem] = useState({})
  return (
    // <View style={styles.container}>
    //   <Text>Страница добавления записи</Text>
    //   <Button title={'Вызвать уведомление'} onPress={() => put()} containerStyle={styles.btn}/>
    //   <Button title={'Назад'} onPress={() => navigation.goBack()} containerStyle={styles.btn}/>
    // </View>
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Название препарата */}
        <View style={styles.input}>
          <Image
            style={{width: 30, height: 30, marginRight: 10}}
            source={{
              uri: "https://img.icons8.com/material/4ac144/256/user-male.png",
            }}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={( text ) => {
              this.setState({medicineName: text});
            }}
          >
            {this.state.medicineName}
          </TextInput>
        </View>

        {/* Периодичность приема */}
        <Dropdown
          label="Периодичность приема"
          data={periods}
          value="everyday"
          containerStyle={styles.dropdown}
          onChangeText={( value ) => {
            this.setState({usagePeriod: value});
          }}
        />

        {/* Время приема */}
        <View style={styles.usageTimeMainContainer}>
          {/* Добавить время */}
          <View style={styles.usageTimeInputContainer}>
            <Text style={styles.inputText}>Время приема</Text>
            <TouchableOpacity
              onPress={() => this.TimePicker.open()}
              style={{marginRight: 0}}
            >
              <Text style={styles.buttonText}>Добавить</Text>
            </TouchableOpacity>
            <TimePicker
              minuteInterval={5}
              textCancel={"Назад"}
              textConfirm={"Принять"}
              ref={( ref ) => {
                this.TimePicker = ref;
              }}
              onCancel={() => this.TimePicker.close()}
              onConfirm={( hour, minute ) =>
                this.addUsageTimeToObject(hour, minute)
              }
            />
          </View>

          {/* Список таймкодов */}
          <SafeAreaView style={{flex: 1}}>
            <FlatList
              data={this.state.usageTime}
              renderItem={( {item} ) => (
                <this.createUsageTime
                  hours={item.hours}
                  minutes={item.minutes}
                  id={item.id}
                />
              )}
              keyExtractor={( item ) => item.id}
              horizontal={true}
              style={{paddingHorizontal: 20}}
            />
          </SafeAreaView>
        </View>

        {/* Дозировка */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <Dropdown
            data={types}
            value="tablet"
            label={() => {
              for (let i = 0; i < data.length; i++) {
                if (data[i].value == value) {
                  return data[i].label;
                }
              }
            }}
            containerStyle={{
              width: "50%",
              height: 50,
              flex: 1,
              justifyContent: "center",
            }}
            onChangeText={( value, label ) => {
              this.setState({
                medicineType: value,
                medicineTypeLabel: types[label].label,
              });
            }}
          />
          <TextInput
            style={styles.doseTextInput}
            onChangeText={( value ) => {
              this.setState({dosage: value});
            }}
          >
            Дозировка
          </TextInput>
        </View>

        {/* Выбор даты НАЧАЛО */}
        <Text
          onPress={() => {
            this.setState({startDateVisible: true});
          }}
        >
          {(() => {
            let {startDateDay, startDateMonth, startDateYear} = this.state;
            if (startDateDay && startDateMonth && startDateYear) {
              return `Начало: ${startDateDay}.${startDateMonth}.${startDateYear}`;
            } else {
              return `Начало курса приема`;
            }
          })()}
        </Text>
        <Dialog
          visible={this.state.startDateVisible}
          onTouchOutside={() => {
            this.setState({startDateVisible: false});
          }}
        >
          <DialogContent>
            <CalendarPicker
              onDateChange={( date ) => {
                let monthList = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];
                this.setState({
                  startDateDay: date.toString().split(" ")[2],
                  startDateMonth: (() => {
                    let monthOrder =
                      monthList.indexOf(date.toString().split(" ")[1]) +
                      1 +
                      "";
                    if (monthOrder.length == 1) {
                      return "0" + monthOrder;
                    }
                    return monthOrder;
                  })(),
                  startDateYear: date.toString().split(" ")[3],
                });
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Выбор даты КОНЕЦ */}
        <Text
          onPress={() => {
            this.setState({endDateVisible: true});
          }}
        >
          {(() => {
            let {endDateDay, endDateMonth, endDateYear} = this.state;
            if (endDateDay && endDateMonth && endDateYear) {
              return `Начало: ${endDateDay}.${endDateMonth}.${endDateYear}`;
            } else {
              return `Конец курса приема`;
            }
          })()}
        </Text>
        <Dialog
          visible={this.state.endDateVisible}
          onTouchOutside={() => {
            this.setState({endDateVisible: false});
          }}
        >
          <DialogContent>
            <CalendarPicker
              onDateChange={( date ) => {
                let monthList = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];
                this.setState({
                  endDateDay: date.toString().split(" ")[2],
                  endDateMonth: (() => {
                    let monthOrder =
                      monthList.indexOf(date.toString().split(" ")[1]) +
                      1 +
                      "";
                    if (monthOrder.length == 1) {
                      return "0" + monthOrder;
                    }
                    return monthOrder;
                  })(),
                  endDateYear: date.toString().split(" ")[3],
                });
              }}
            />
          </DialogContent>
        </Dialog>
      </View>

      {/* Кнопка сохранения данной заметки */}
      <Button
        title="Добавить"
        onPress={() => {
          let {
            id,
            medicineName,
            usagePeriod,
            usageTime,
            medicineType,
            medicineTypeLabel,
            dosage,
            startDateDay,
            startDateMonth,
            startDateYear,
            endDateDay,
            endDateMonth,
            endDateYear,
            checked,
          } = this.state;
          if (
            !medicineName ||
            !usagePeriod ||
            !usageTime ||
            !medicineType ||
            !medicineTypeLabel ||
            !dosage
          ) {
           return Alert.alert("Ошибка", "Заполните все поля");
          } else {
            this.saveData(
              id,
              medicineName,
              usagePeriod,
              usageTime,
              medicineType,
              medicineTypeLabel,
              dosage,
              startDateDay,
              startDateMonth,
              startDateYear,
              endDateDay,
              endDateMonth,
              endDateYear,
              checked
            );
            navigate.push("Home");
          }
        }}
      />
    </ScrollView>
  );
}

const mapStateToProps = ( state ) => ({
  screen: state.screen
})

export default connect(mapStateToProps)(Add)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '90%',
    margin: 10
  },
  btnBox: {width: 300}
});
