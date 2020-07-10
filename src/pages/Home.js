import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import moment from 'moment'
import { ADD, DETAILS } from "../store/screenNames";

function Home( {screen, navigation} ) {
  const now = moment().format('DD - MMMM, hh:mm');
  return (
    <View style={styles.container}>
      <Text>{now}</Text>
      <View style={styles.btnBox}>
        <Button
          containerStyle={styles.btn}
          title="Добавить новую заметку"
          onPress={() => {
            // navigation.navigate(ADD)
            navigation.push(ADD)
          }}
        />
      </View>
      <View
        style={{marginTop: 5, ...styles.btnBox}}
      >
        <Button
          containerStyle={styles.btn}
          title="Открыть все записи"
          onPress={() => {
            navigation.push(DETAILS)
          }}
        />
      </View>
    </View>
  );
}

const mapStateToProps = ( state ) => ({
  screen: state.screen
})

export default connect(mapStateToProps)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '100%'
  },
  btnBox: {width: 300}
});
