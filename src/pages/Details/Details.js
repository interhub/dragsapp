import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { ListItem } from 'react-native-elements'
import Types from "../../vars/types";
import TypesName from '../../vars/typesName.js'
import * as Notifications from 'expo-notifications';
import { ADD } from "../../store/screenNames";
import { setScreen } from "../../store/actions";

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

function Details( {screen, navigation, setScreen} ) {
  const [list, setList] = useState([])
  useEffect(() => {
    console.log('DOM')
    AsyncStorage.getItem('input')
                .then(( data ) => {
                  if (data !== null) {
                    setList(JSON.parse(data))
                  }
                })
  }, [])

  const editInput = ( el, id ) => {
    navigation.push(ADD, {edit: el})
  }

  const removeInput = ( el, id ) => {
    LayoutAnimation.configureNext({
      duration: 700,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'spring', springDamping: 0.5},
      delete: {type: 'linear', property: 'scaleXY'}
    })
    let items = [...list];
    items.splice(id, 1);
    setList(items);
    el.id.forEach(str => Notifications.dismissAllNotificationsAsync(str));
    AsyncStorage.setItem('input', JSON.stringify(items));
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Просмотр всех записей</Text>
        <View style={{width: W, margin: 5}}>
          {list && list.map(( el, id ) => {
            return <ListItem
              key={id}
              rightAvatar={
                <View
                  style={{padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => editInput(el, id)}
                    style={{padding: 5}}>
                    <Text>Редактировать</Text>
                  </TouchableOpacity>
                  <View style={{width: 1, height: 20, backgroundColor: 'gray'}}/>
                  <TouchableOpacity
                    onPress={() => removeInput(el, id)}
                    style={{padding: 5}}>
                    <Text>Удалить</Text>
                  </TouchableOpacity>
                </View>}
              title={el.name}
              subtitle={
                `${el.name} в количестве ${el.dose} ${Types.find(obj => obj.value === el.type).label}
Время приема: ${el.time.map(( t ) => `${t.H}:${t.M}`).join(', ')}`}
              bottomDivider
              topDivider
            />
          })}
        </View>
        <Button title={'Назад'} onPress={() => navigation.goBack()}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Details)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: H,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '100%'
  },
  btnBox: {width: 300}
});
