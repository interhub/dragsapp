import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Provider, connect } from "react-redux";
import store from './src/store/store.js'
import Home from "./src/pages/Home.js";
import Add from "./src/pages/Add.js";
import { HOME, ADD, DETAILS } from "./src/store/screenNames";
//navigate
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Details from "./src/pages/Details";

const Stack = createStackNavigator();

function App( {screen} ) {

  return (
    // <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={HOME}>
        <Stack.Screen options={{title: 'Главная'}} name={HOME} component={Home}/>
        <Stack.Screen options={{title: 'Добавление'}} name={ADD} component={Add}/>
        <Stack.Screen options={{title: 'Просмотр'}} name={DETAILS} component={Details}/>
      </Stack.Navigator>
      <StatusBar style="auto"/>
    </NavigationContainer>
    // </SafeAreaView>
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
