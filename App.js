import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Provider, connect } from "react-redux";
import store from './src/store/store.js'
import Home from "./src/pages/Home.js";
import { HOME } from "./src/store/screenNames";
import moment from 'moment'

function App( {screen} ) {

  const now = moment().format('DD monch, hh:mm')

  return (
    <SafeAreaView style={styles.container}>
      <Text>{now}</Text>
      {screen === HOME && <Home/>}
      {/*{screen === HOME && <Home/>}*/}
      <StatusBar style="auto"/>
    </SafeAreaView>
  );
}

const mapStateToProps = ( state ) => ({
  screen: state.screen
})

const ConnectApp = connect(mapStateToProps)(App)

const ProviderApp = () => {
  return <Provider store={store}>
    <ConnectApp/>
  </Provider>
}

export default ProviderApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
