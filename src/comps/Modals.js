import { Modal, Text, TouchableHighlight, View, StyleSheet } from "react-native";
import React from 'react';

const Modals = ( {children, open} ) => {
  return <Modal
    animationType="slide"
    transparent={true}
    visible={open}
    onRequestClose={() => {

    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {children}
      </View>
    </View>
  </Modal>
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});


export default Modals
