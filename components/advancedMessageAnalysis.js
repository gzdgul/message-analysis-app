import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {COLORS} from "../config/constants";
import {addMissingDates, calculateCountAverage, findMaxCount, sumCounts} from "./utils";
import {LinearGradient} from "expo-linear-gradient";

const AdvancedMessageAnalysis = ({analyzedData}) => {

    const mostRepeatedDates = analyzedData.mostRepeatedDates
    const names = analyzedData.allSendings.nameCount
    const firstDate = mostRepeatedDates[0].date
    const mostRepeatedDatesSorted = [...mostRepeatedDates].sort((a, b) => b.count - a.count);
    const mostRepeatedDateeee = mostRepeatedDatesSorted[0].date
    const maxMessageCount = findMaxCount(mostRepeatedDates)
    const messageSendingAvr = sumCounts(analyzedData.allSendings.messageCounts)/2
    const test = analyzedData.allSendings.test
    console.log('test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',test)
    // console.log('maxMessageCount!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',maxMessageCount)
    // console.log('mostRepeatedDates!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',mostRepeatedDates)
    // console.log('mostRepeatedDatesSorted!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',mostRepeatedDatesSorted)
    // console.log('mostRepeatedDateeee!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',mostRepeatedDateeee)
    const aaa =  test.slice(0,50)
    const deneme = aaa.slice(0,7)
    const deneme2 = aaa.slice(7,14)
    const baslangicTarih = aaa[0].date
    const bitisTarih = aaa[aaa.length -1].date
    console.log('aaa!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',aaa)

    return (
        <View>
            <Text style={styles.mainTitle}>Message Analysis Advanced</Text>
            <Text style={styles.dateTitle}>{baslangicTarih} - {bitisTarih}</Text>
            <ScrollView horizontal={true}>
                <View style={{}}>
                <View style={{flexDirection: 'row', gap: 5, alignItems: 'flex-end'}}>
                    {
                        aaa.map((x, index) => {
                            const percentageOfChange = ((maxMessageCount - x.count)/maxMessageCount)*150
                            const day = x.date.split('.')[0]
                            return (
                            <View key={x.date} style={{flexDirection: 'column'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color: 'white', fontSize: 12}}>{day}</Text>
                                </View>
                                <View  style={[styles.bar, {height: 150 - percentageOfChange}]}>

                                    {
                                        percentageOfChange < 50 &&
                                        <LinearGradient
                                            style={{ width: '100%', height: '100%', borderRadius: 15, position: 'absolute'}}
                                            colors={[COLORS.red, COLORS.orange, COLORS.orange]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            pointerEvents="none"
                                        />
                                    }
                                </View>
                            </View>
                            )
                        })
                    }
                </View>
                <View style={{flexDirection: 'row', gap: 5, alignItems: 'flex-start', opacity: 0.5, marginTop: 5}}>
                    {
                        aaa.map((x) => {
                            const totalEmoji = [].concat(... x[names[0]].emoji).length + [].concat(... x[names[1]].emoji).length
                            const totalMedya = [].concat(... x[names[0]].media).length + [].concat(... x[names[1]].media).length
                            const totalOthers = [].concat(... x[names[0]].others).length + [].concat(... x[names[1]].others).length
                            const percentageOfChange = ((maxMessageCount - x.count)/maxMessageCount)*150
                            const percentageOfTotalEmoji = Math.ceil((totalEmoji / (totalEmoji + totalMedya + totalOthers))*100)
                            const percentageOfTotalMedya =  Math.ceil((totalMedya / (totalEmoji + totalMedya + totalOthers))*100)
                            const percentageOfTotalOthers =  Math.ceil((totalOthers / (totalEmoji + totalMedya + totalOthers))*100)

                            const day = x.date.split('.')[0]
                            return (
                                <View key={x.date} style={{flexDirection: 'column', gap: 5, height: 80}}>
                                    {
                                        percentageOfTotalMedya > 0 &&
                                        <View style={[styles.bar, {backgroundColor: COLORS.green}, {flex: percentageOfTotalMedya}]}>
                                        </View>
                                    }
                                    {
                                        percentageOfTotalEmoji > 0 &&
                                        <View style={[styles.bar,{backgroundColor: COLORS.pink}, {flex: percentageOfTotalEmoji}]}>
                                        </View>
                                    }
                                    {
                                        percentageOfTotalOthers > 0 &&
                                        <View style={[styles.bar, {backgroundColor: COLORS.blue},{flex: percentageOfTotalOthers}]}>
                                        </View>
                                    }

                                    {/*<Text style={{color: 'white'}}>{percentageOfTotalEmoji}</Text>*/}
                                </View>
                            )
                        })
                    }
                </View>
                </View>
                {/*<View style={{width: '100%', height: 75, position: 'absolute', justifyContent: 'flex-end',}}>*/}
                {/*    <Text style={{color: 'white', opacity: 0.5, alignSelf: 'flex-end'}}>average</Text>*/}
                {/*    <Text numberOfLines={1} ellipsizeMode="clip" style={{color: 'white', opacity: 0.5}}*/}
                {/*    >_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </Text>*/}

                {/*</View>*/}
            </ScrollView>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 15, marginVertical: 15,}}>
                <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                    <View style={[styles.square,{backgroundColor: COLORS.orange}]}></View>
                    <Text style={{color: 'white'}}>Message</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                    <View style={[styles.square,{backgroundColor: COLORS.green}]}></View>
                    <Text style={{color: 'white'}}>Media</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                    <View style={[styles.square,{backgroundColor: COLORS.pink}]}></View>
                    <Text style={{color: 'white'}}>Emoji</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                    <View style={[styles.square,{backgroundColor: COLORS.blue}]}></View>
                    <Text style={{color: 'white'}}>Others</Text>
                </View>
            </View>

        </View>
    );
};

export default AdvancedMessageAnalysis;

const styles = StyleSheet.create({

    textStyle: {
        color: COLORS.white,
        fontSize: 17
    },
    bar: {
        width: 45,
        height: 150,
        backgroundColor: COLORS.orange,
        borderRadius: 15,

    },
    mainTitle: {
        color: COLORS.orange,
        fontSize: 35,
        fontWeight: '600',
        marginVertical: 10,
        // marginBottom: 25,
    },
    dateTitle: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 25,
    },
    square: {
        width: 20,
        height: 20,
        borderRadius: 5,

    }
});
