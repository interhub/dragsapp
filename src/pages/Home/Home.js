import React, { useEffect } from 'react';
import { Dimensions, ImageBackground, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from "react-redux";
import { Button } from "react-native-paper";
import { ADD, DETAILS } from "../../store/screenNames";
import moment from 'moment'
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { setOpenSetting } from "../../store/actions";
import { NavigationContainer } from "@react-navigation/native";
import CalendarBanner from "./CalendarBanner";

const H = Dimensions.get('screen').height

function Home( {theme, navigation, setOpenSetting} ) {

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

  const now = moment().format('DD - MMMM, hh:mm');
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <ImageBackground source={require('../../img/empty-bg.png')} style={[styles.imageBox, {backgroundColor: theme.bg}]}
                       imageStyle={styles.image}>


        {/*<View style={styles.container}>*/}
        {/*<Text>{now}</Text>*/}
        {/*<Button*/}
        {/*  containerStyle={styles.btn}*/}
        {/*  title="Добавить новую заметку"*/}
        {/*  onPress={() => {*/}
        {/*    // navigation.navigate(ADD)*/}
        {/*    navigation.push(ADD)*/}
        {/*  }}*/}
        {/*/>*/}
        <Button color={theme.navBg}
                contentStyle={{height: '100%'}}
                icon={() => <Entypo name="plus" size={24} color="#fff"/>}
                mode="contained"
                style={styles.btnAdd}
                onPress={() => navigation.push(ADD)}>
          Новое напоминание
        </Button>
        {/*TODO perebros*/}
        {/*<View*/}
        {/*  style={{marginTop: 5, ...styles.btnBox}}*/}
        {/*>*/}
        {/*  <Button*/}
        {/*    containerStyle={styles.btn}*/}
        {/*    title="Открыть все записи"*/}
        {/*    onPress={() => {*/}
        {/*      // navigation.push(DETAILS)*/}
        {/*      navigation.jumpTo(DETAILS);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</View>*/}
        {/*</View>*/}
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
    justifyContent: "center",
    alignItems: 'center',
  },
  image: {
    resizeMode: "cover",
    width: '100%'
  },
  btnAdd: {
    height: 60,
    justifyContent: 'center',
    marginBottom: -H * 0.5
  }
});
