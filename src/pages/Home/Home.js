import React, { useEffect, useState } from 'react';
import {
  AsyncStorage,
  Dimensions,
  ImageBackground,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from "react-redux";
import { Button, Divider, List, TouchableRipple } from "react-native-paper";
import { ADD, DETAILS, HOME } from "../../store/screenNames";
import moment from 'moment'
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { setOpenSetting } from "../../store/actions";
import { NavigationContainer } from "@react-navigation/native";
import CalendarBanner from "./CalendarBanner";
import { SwipeListView } from "react-native-swipe-list-view";
import ListItem from "../Details/ListItem";
import * as Notifications from "expo-notifications";

const H = Dimensions.get('screen').height

function Home( {theme, navigation, setOpenSetting} ) {
  const [list, setList] = useState([]);

  const getListOnDay = async ( date ) => {
    return await AsyncStorage.getItem('input')
                             .then(( data ) => {
                               if (data !== null) {
                                 let result = (JSON.parse(data)).map(( el, key ) => {
                                   el['key'] = key
                                   return el
                                 })
                                 // console.log(result, 'RESULT')
                                 return result.filter(d => (d?.days?.some(dat => (moment(dat).isSame(date, 'days')))))
                               }
                             })
  }

  const [activeDay, setActiveDay] = useState(Date.now())

  useEffect(() => {
    (async () => {
      setList(await getListOnDay(activeDay))
    })()
  }, [activeDay])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setOpenSetting(true)} style={{marginRight: 10}}>
          <View>
            <Entypo name="cog" size={24} color={theme.titleItem}/>
          </View>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => setOpenSetting(true)} style={{marginLeft: 10}}>
          <View>
            <FontAwesome name="user-circle" size={24} color={theme.titleItem}/>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [])

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


  const now = moment().format('DD - MMMM, hh:mm');
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <ImageBackground source={require('../../img/empty-bg.png')}
                       style={[styles.imageBox, {backgroundColor: theme.bg}]}
                       imageStyle={styles.image}>
        <CalendarBanner activeDay={activeDay} setActiveDay={setActiveDay} theme={theme}/>
        <ScrollView showsVerticalScrollIndicator={false} style={{height: H, width: '100%'}}>
          <View>
            <List.Section>
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
              {list.length === 0 &&
              <Text style={{textAlign: 'center'}}>Сегодня ничего принимать не нужно</Text>}
            </List.Section>
          </View>
        </ScrollView>
        <Button color={theme.navBg}
                contentStyle={{height: '100%'}}
                icon={() => <Entypo name="plus" size={24} color="#fff"/>}
                mode="contained"
                style={styles.btnAdd}
                onPress={() =>
                  navigation.push(ADD)
                }>
          Новое напоминание
        </Button>
      </ImageBackground>
    </View>
  );
}

const mapStateToProps = ( state ) => ({
  theme: state.theme
})
const mapDispatchToProps = {
  setOpenSetting
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBox: {width: 300},
  imageBox: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  image: {
    resizeMode: "cover",
    width: '100%'
  },
  btnAdd: {
    height: 60,
    justifyContent: 'center',
    marginBottom: H * 0.1
  }
});
