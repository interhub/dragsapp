import {Alert, AsyncStorage, ScrollView, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from 'react';
import {FontAwesome} from "@expo/vector-icons";
import PhotoItem from "./PhotoItem";
import {connect} from "react-redux";
import ModalPhoto from "./ModalPhoto";
import addPhoto from "../../vars/addPhoto";
import PhotoModalPicker from "./PhotoModalPicker";
import addCamera from "../../vars/addCamera";


const Geo = ({navigation, theme}) => {

    const showAlert = () => Alert.alert(
        "Удалить?",
        "Фото будет удалено из библиотеки",
        [
            {
                text: "Отмена",
                onPress: () => setOpenImg(null),
                style: "cancel"
            },
            {
                text: "Подтвердить", onPress: () => {
                    let index = list.findIndex(el => el === openImg)
                    if (index) {
                        removeImg(index)
                    }
                }
            }
        ],
        {cancelable: false}
    );


    const [list, setList] = useState([])
    useEffect(() => {
        navigation.setOptions({

            headerLeft: () => (
                <TouchableOpacity onPress={() => setOpenSetting(true)} style={{marginLeft: 10}}>
                    <View>
                        <FontAwesome name="user-circle" size={24} color={theme.titleItem}/>
                    </View>
                </TouchableOpacity>
            ),
        });
        AsyncStorage.getItem('img', (err, data) => {
            if (data !== null) {
                setList(JSON.parse(data))
            }
        })
    }, [])

    const [loading, selLoading] = useState(false)

    const [openImg, setOpenImg] = useState(null);
    const openItem = (img) => {
        setOpenImg(img)
    }
    const setImgToTrace = async (list) => {
        selLoading(true)
        setList(list)
        await AsyncStorage.setItem('img', JSON.stringify(list))
        selLoading(false)
    }
    const saveImg = (img) => {
        const newList = [...list, img]
        setImgToTrace(newList)
    }
    const removeImg = (id) => {
        let newList = [...list]
        newList.splice(id, 1)
        setImgToTrace(newList)
        setOpenImg('')
    }

    const [openPicker, setOpenPicker] = useState(false)
    return <ScrollView>
        <PhotoModalPicker
            addPhoto={() => {
                selLoading(true)
                addPhoto().then(img => {
                    selLoading(false)
                    saveImg(img)
                    setOpenPicker(false)
                })
            }}
            addCamera={() => {
                addCamera()
                    .then(img => {
                        selLoading(false)
                        saveImg(img)
                        setOpenPicker(false)
                    })
            }}
            visible={openPicker}
            setVisible={setOpenPicker}/>
        <ModalPhoto onDelete={() => {
            showAlert()
        }} onClose={() => setOpenImg(null)}
                    openImg={openImg}/>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            <PhotoItem
                img={require('../../img/plus.png')}
                onOpen={() => {
                    setOpenPicker(true)
                }}/>
            {list.map((el, id) => {
                return <PhotoItem
                    onOpen={openItem}
                    img={{uri: el}}
                    key={id}/>
            }).reverse()}
        </View>
    </ScrollView>
}

const mapStateToProps = (state) => ({
    theme: state.theme
})
export default connect(mapStateToProps)(Geo)
