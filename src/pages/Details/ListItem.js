import React from 'react';
import {Dimensions, StyleSheet} from "react-native";
import {List} from "react-native-paper";
import Types from "../../vars/types";

const W = Dimensions.get('window').width

const ListItem = ({
                      theme,
                      num,
                      item,
                      editInput
                  }) => {
    return (
        // <View style={styles.itemContainer}>
        //   <View style={styles.item}>
        //     <Text>Hello</Text>
        //   </View>
        // </View>
        <List.Item
            style={{backgroundColor: '#0D48A1', borderRadius: 8, margin: 5, minHeight: 80}}
            // right={( props ) =>
            //   <Entypo onPress={() => {
            //     editInput(item)
            //   }}
            //           style={{marginTop: 20}}
            //           name="chevron-right"
            //           size={24}
            //           color={'#999'}/>
            // }
            onPress={() => {
                editInput(item)
            }}
            title={item.name}
            titleStyle={{color: '#FFFFFF'}}
            descriptionStyle={{color: '#d9d9d9'}}
            description={`${item.time.map((t) => `${t.H}:${t.M}`).join(', ')}      ${item.dose} ${Types.find(obj => obj.value === item.type).label}`}
            // left={() => <List.Icon icon="clock" color={theme.navBg}/>}
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
