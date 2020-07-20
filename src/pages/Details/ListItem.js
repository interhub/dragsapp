import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import { List } from "react-native-paper";
import Types from "../../vars/types";

const W = Dimensions.get('window').width

const ListItem = ( {
                     theme,
                     key,
                     num,
                     item,
                     editInput
                   } ) => {
  return (
    // <View style={styles.itemContainer}>
    //   <View style={styles.item}>
    //     <Text>Hello</Text>
    //   </View>
    // </View>
    <List.Item
      style={{backgroundColor: '#E3F2FD', borderRadius: 8, margin: 5}}
      right={( props ) =>
        <Entypo onPress={() => {
          editInput(item)
        }}
                style={{marginTop: 20}}
                name="chevron-right"
                size={24}
                color={'#999'}/>
      }
      title={item.name}
      description={`в количестве ${item.dose} ${Types.find(obj => obj.value === item.type).label} Время приема: ${item.time.map(( t ) => `${t.H}:${t.M}`).join(', ')}`}
      left={() => <List.Icon icon="clock" color={theme.navBg}/>}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 10,
  },
  item: {
    width: '100%',
    minHeight: 90,
    backgroundColor: '#E3F2FD',
    marginTop: 10,
    borderRadius: 10,
  }
})

export default ListItem;
