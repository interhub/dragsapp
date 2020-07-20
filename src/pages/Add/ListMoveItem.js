import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, LayoutAnimation, PanResponder, View } from "react-native";
import { List } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";

const W = Dimensions.get('window').width;

const ListMoveItem = ( {setEditionNumber, updatePicker, theme, time, num} ) => {

  return (

    <List.Item
      style={{backgroundColor: '#E3F2FD', borderRadius: 8, margin: 5}}
      right={( props ) =>
        <Entypo onPress={() => {
          setEditionNumber(num)
          updatePicker.current.open()
        }}
                style={{marginTop: 15}}
                name="chevron-right"
                size={24}
                color={'#999'}/>
      }
      title={moment(`${time.H}-${time.M}`, 'HH mm').format('HH:mm')}
      left={() => <List.Icon icon="clock" color={theme.navBg}/>}
    />
  )
}
export default ListMoveItem;
