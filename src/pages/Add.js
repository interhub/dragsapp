import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { Button } from "react-native-elements";

function Add( {screen,  navigation } ) {
  return (
    <View style={styles.container}>
      <Text>Страница добавления записи</Text>
      <Button title={'Вызвать уведомление'} onPress={()=> navigation.goBack()} containerStyle={styles.btn} />
      <Button title={'Назад'} onPress={()=> navigation.goBack()} containerStyle={styles.btn} />
    </View>
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
    margin:10
  },
  btnBox: {width: 300}
});
