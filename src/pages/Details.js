import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { Button } from "react-native-elements";

function Details( {screen, navigation} ) {
  return (
    <View style={styles.container}>
      <Text>Просмотра всех записей</Text>
      <Button title={'Назад'} onPress={() => navigation.goBack()}/>
    </View>
  );
}

const mapStateToProps = ( state ) => ({
  screen: state.screen
})

export default connect(mapStateToProps)(Details)

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
