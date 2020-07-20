import React, { useEffect, useState } from 'react';
import {
  AsyncStorage,
  Dimensions,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from "react-redux";
import Types from "../../vars/types";
import * as Notifications from 'expo-notifications';
import { ADD, HOME } from "../../store/screenNames";
import { Divider, List, TouchableRipple } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import ListMoveItem from "../Add/ListMoveItem";
import { FontAwesome } from "@expo/vector-icons";
import ListItem from "./ListItem";

const H = Dimensions.get('screen').height;
const W = Dimensions.get('screen').width;

function Details( {navigation, theme} ) {
  const [list, setList] = useState([])

  useEffect(() => {
    return navigation.addListener('focus', () => {
      AsyncStorage.getItem('input')
                  .then(( data ) => {
                    if (data !== null) {
                      let result = (JSON.parse(data)).map(( el, key ) => {
                        el['key'] = key
                        return el
                      });
                      setList(result)
                      // console.log(result, 'PRINT')
                    }
                  })
    });
  }, []);

  const editInput = ( el ) => {
    el.id = []
    navigation.jumpTo(HOME, {callback: () => alert('hi')});
    setTimeout(() => {
      navigation.push(ADD, {edit: el})
    }, 300)
  }

  const removeInput = ( el, key ) => {
    LayoutAnimation.configureNext({
      duration: 700,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'spring', springDamping: 0.5},
      delete: {type: 'linear', property: 'scaleXY'}
    })
    let items = [...list];
    let item = items.find(el => el.key === key)
    setList(items.filter(el => el.key !== key));
    item.id.forEach(str => Notifications.dismissAllNotificationsAsync(str));
    AsyncStorage.setItem('input', JSON.stringify(items));
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <List.Section>
          <List.Subheader>Просмотр всех записей</List.Subheader>
          <Divider/>
          {list.length > 0 && <SwipeListView
            useNativeDriver={false}
            data={list}
            disableRightSwipe
            renderItem={( {item} ) => (
              <ListItem theme={theme}
                        key={item.key}
                        item={item}
                        editInput={() => editInput(item)}
              />
            )}
            renderHiddenItem={( data, rowMap ) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '100%',
                  // backgroundColor: 'red'
                  // position: 'absolute',
                  // right: -100,
                  // top: 5
                }}>
                <TouchableRipple
                  style={{padding: 30}}
                  onPress={() => removeInput(data.item, data.item.key)}>
                  <FontAwesome name="trash-o" size={24} color="red"/>
                </TouchableRipple>
              </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
          />}
        </List.Section>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = ( state ) => ({
  screen: state.screen,
  theme: state.theme
})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Details)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: H,
    backgroundColor: '#fff',
  },
  btn: {
    width: '100%'
  },
  btnBox: {width: 300}
});
