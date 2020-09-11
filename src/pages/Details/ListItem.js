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
        <List.Item
            style={{backgroundColor: '#0D48A1', borderRadius: 8, margin: 5, minHeight: 80}}
            onPress={() => {
                editInput(item)
            }}
            title={item?.name}
            titleStyle={{color: '#FFFFFF'}}
            descriptionStyle={{color: '#d9d9d9'}}
            description={`${item?.time.map((t) => `${t.H}:${t.M=='0'?'00':t.M}`).join(', ')}      ${item?.dose} ${Types.find(obj => obj?.value === item?.type)?.label}`}
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
