import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { Button } from "react-native-elements";

function Home( {screen} ) {
  return (
    <View style={styles.container}>
      <View style={styles.btnBox}>
        <Button
          containerStyle={styles.btn}
          title="Добавить новую заметку"
          onPress={() => {

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
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '100%'
  },
  btnBox: {width: 300}
});
