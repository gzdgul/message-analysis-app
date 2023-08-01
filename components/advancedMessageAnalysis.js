import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {COLORS} from "../config/constants";
import {addMissingDates, calculateCountAverage, findMaxCount} from "./utils";
import {LinearGradient} from "expo-linear-gradient";

const AdvancedMessageAnalysis = ({analyzedData}) => {

    const mostRepeatedDates = analyzedData.mostRepeatedDates
    const firstDate = mostRepeatedDates[0].date
    const mostRepeatedDatesSorted = [...mostRepeatedDates].sort((a, b) => b.count - a.count);
    const mostRepeatedDateeee = mostRepeatedDatesSorted[0].date
    const maxMessageCount = findMaxCount(mostRepeatedDates)
    const test = analyzedData.allSendings.test
    console.log('test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',test)
    // console.log('maxMessageCount!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',maxMessageCount)
    // console.log('mostRepeatedDates!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',mostRepeatedDates)
    // console.log('mostRepeatedDatesSorted!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',mostRepeatedDatesSorted)
    // console.log('mostRepeatedDateeee!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',mostRepeatedDateeee)
    const aaa =  test.slice(0,7)
    const deneme = aaa.slice(0,7)
    const deneme2 = aaa.slice(7,14)
    const baslangicTarih = aaa[0].date
    const bitisTarih = aaa[aaa.length -1].date
    console.log('aaa!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',aaa)

    return (
        <View>
            <Text style={styles.mainTitle}>Message Analysis Advanced</Text>
            <Text style={styles.dateTitle}>{baslangicTarih} - {bitisTarih}</Text>
            <View>
                <View style={{flexDirection: 'row', gap: 5, alignItems: 'flex-end', justifyContent: 'center'}}>
                    {
                        aaa.map((x, index) => {
                            const percentageOfChange = ((maxMessageCount - x.count)/maxMessageCount)*150
                            const day = x.date.split('.')[0]
                            return (
                            <View key={x.date} style={{flexDirection: 'column'}}>
                                <Text style={{color: 'white'}}>{day}</Text>
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
                {/*<View style={{flexDirection: 'row', gap: 5, alignItems: 'flex-start', justifyContent: 'center', opacity: 1, marginTop: 5}}>*/}
                {/*    {*/}
                {/*        deneme2.map((x) => {*/}
                {/*            const percentageOfChange = ((maxMessageCount - x.count)/maxMessageCount)*150*/}
                {/*            const day = x.date.split('.')[0]*/}
                {/*            return (*/}
                {/*                <View key={x.date} style={{flexDirection: 'column'}}>*/}
                {/*                    <View  style={[styles.bar, {height: 150 - percentageOfChange}]}>*/}
                {/*                        {*/}
                {/*                            percentageOfChange < 50 &&*/}
                {/*                            <LinearGradient*/}
                {/*                                style={{ width: '100%', height: '100%', borderRadius: 15, position: 'absolute'}}*/}
                {/*                                colors={[COLORS.red, COLORS.orange, COLORS.orange]}*/}
                {/*                                start={{ x: 0, y: 1 }}*/}
                {/*                                end={{ x: 0, y: 0 }}*/}
                {/*                                pointerEvents="none"*/}
                {/*                            />*/}
                {/*                        }*/}
                {/*                    </View>*/}
                {/*                    <Text style={{color: 'white'}}>{day}</Text>*/}
                {/*                </View>*/}
                {/*            )*/}
                {/*        })*/}
                {/*    }*/}
                {/*</View>*/}
                {/*<View style={{width: '100%', height: 75, position: 'absolute', justifyContent: 'flex-end'}}>*/}
                {/*    <Text style={{color: 'white'}}>average</Text>*/}
                {/*    <Text numberOfLines={1} ellipsizeMode="clip" style={{color: 'white', opacity: 0.5}}*/}
                {/*    >_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </Text>*/}

                {/*</View>*/}
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
    }
});
