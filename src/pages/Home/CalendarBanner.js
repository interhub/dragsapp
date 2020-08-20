import React, {useEffect, useRef, useState} from 'react'
import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import weekDays from "../../vars/weekDays";
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/index";

const W = Dimensions.get('screen').width;
//текущая дата плюс минус 7
const currentDays = [
    new Date(new Date().setDate(new Date().getDate() - 7)),
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 7)),
]

const CalendarBanner = ({theme, activeDay, setActiveDay}) => {

    const [weeks, setWeeks] = useState([])

    useEffect(() => {
        setWeeks(currentDays.map((el) => getArrayDateByDate(el)))
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (scroll.current)
                scroll.current.scrollTo({x: W, animated: true})
        }, 100)
    }, [weeks])

    const getArrayDateByDate = (date) => {
        let now = date.valueOf()
        let backDay = new Date(now).setDate(new Date(now).getDate() - 1)
        let next = Array(5).fill(1).map((_, i) => new Date(now).setDate(new Date(now).getDate() + 1 + i))
        return ([backDay, now, ...next])
    }

    const scroll = useRef(null)

    return <View style={{
        ...styles.calendarBox,
        backgroundColor: theme.navBg
    }}>
        <ScrollView
            horizontal
            pagingEnabled
            ref={scroll}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            {
                weeks.map((week, id) => {
                    return <View key={id} style={{width: W, height: 'auto', flexDirection: 'row'}}>
                        {week.map((el, id) => {
                            const getThisDate = () => new Date(activeDay).getDate() === new Date(el).getDate();
                            return <View key={id} style={styles.col}>
                                <View>
                                    <Text style={styles.text}>
                                        {new Date(el).getDate()}
                                    </Text>
                                </View>
                                <TouchableRipple
                                    onPress={() => setActiveDay(el)}
                                    style={styles.week}>
                                    <Text
                                        style={[styles.text, (getThisDate() ? styles.activeText : {}), {marginTop: -2}]}>
                                        {weekDays.find(d => d.value === new Date(el).getDay()).label}
                                    </Text>
                                </TouchableRipple>
                            </View>
                        })}
                    </View>
                })
            }
        </ScrollView>

    </View>
}

const styles = StyleSheet.create({
    calendarBox: {
        width: '100%',
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 10,
    },
    text: {
        color: '#fff',
        fontSize: 15,
        // marginTop: 10,
        textAlign: 'center',
        width: 35,
        height: 35,
        paddingTop: 7,
    },
    activeText: {
        color: '#0D48A1',
        backgroundColor: '#fff',
        borderRadius: 150
    },
    col: {flex: 1, height: '100%', alignItems: 'center'},
    week: {}
})

export default CalendarBanner
