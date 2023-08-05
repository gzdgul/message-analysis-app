import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../config/constants";
import {addMissingDates, calculateCountAverage, findMaxCount, sumCounts} from "./utils";
import {LinearGradient} from "expo-linear-gradient";
import {View as MotiView} from "moti/build/components/view";
import AnalysisBar from "./AnalysisBar";
import {AnimatePresence} from "moti";

const AdvancedMessageAnalysis = ({analyzedData}) => {
    const [page, setPage] = React.useState(0)
    const [pressedDay, setPressedDay] = React.useState('')
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
    const aaa =  test.slice(0,100)

    // console.log('aaa!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',aaa)
    // Verileri tarihlerine göre gruplamak için boş bir nesne oluşturuyoruz
    let gruplanmisVeriler = {};

// Veriler dizisini tarihlerine göre gruplayan bir döngü
    aaa.forEach(function(veri) {
        const tarihParcalari = veri.date.split('.');
        const ay = '**.' + tarihParcalari[1] + '.' + tarihParcalari[2];

        if (!gruplanmisVeriler[ay]) {
            gruplanmisVeriler[ay] = [];
        }

        gruplanmisVeriler[ay].push(veri);
    });
    console.log('gruplanmisVeriler!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',gruplanmisVeriler)
    const deneme = []
    for (const ay in gruplanmisVeriler) {
        deneme.push(gruplanmisVeriler[ay])
    }
    console.log('deneme//////////////',deneme)
    const baslangicTarih = aaa[0].date
    const bitisTarih = aaa[aaa.length -1].date

    const handlePressBack = () => {
        if (deneme[deneme.length -1 - (page + 1)]) {
            setPage(prevState => prevState + 1)
        }
    }
    const handlePressNext = () => {
        if (deneme[deneme.length -1 - (page - 1)]) {
            setPage(prevState => prevState - 1)
        }
    }


    return (
        <View>
            <Text style={styles.mainTitle}>Message Analysis Advanced</Text>
            <Text style={styles.mainTitle}>{page}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{padding: 10, backgroundColor: 'red'}} onPress={ handlePressBack }>
                    <Text>GERİ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 10, backgroundColor: 'yellow'}} onPress={ handlePressNext }>
                    <Text>İLERİ</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.dateTitle}>{deneme[deneme.length -1 - page][0].date} - {deneme[deneme.length -1 - page][deneme[deneme.length -1 - page].length - 1].date}</Text>
                        <View>
                            <View style={{paddingHorizontal: 10}}>
                                <View style={{flexDirection: 'row', gap: 5,alignItems: 'flex-end',height: 183}}>
                                    <AnimatePresence>
                                    {
                                        deneme[deneme.length -1 - page].map((x, index) => {
                                            const percentageOfChange = ((maxMessageCount - x.count)/maxMessageCount)*150
                                            const day = x.date.split('.')[0]
                                            const elementCount =  deneme[deneme.length -1 - page].length
                                            return (
                                                   <AnalysisBar key={index} id={x.date} percentageOfChange={percentageOfChange} pressedDay={pressedDay} setPressedDay={setPressedDay} day={day} elementCount={elementCount} />
                                            )
                                        })
                                    }
                                    </AnimatePresence>
                                </View>
                                {/*<View style={{flexDirection: 'row', gap: 5, alignItems: 'flex-start', opacity: 0.5, marginTop: 5}}>*/}
                                {/*    {*/}
                                {/*        deneme[deneme.length -1 - page].map((x) => {*/}
                                {/*            const totalEmoji = [].concat(... x[names[0]].emoji).length + [].concat(... x[names[1]].emoji).length*/}
                                {/*            const totalMedya = [].concat(... x[names[0]].media).length + [].concat(... x[names[1]].media).length*/}
                                {/*            const totalOthers = [].concat(... x[names[0]].others).length + [].concat(... x[names[1]].others).length*/}
                                {/*            const percentageOfChange = ((maxMessageCount - x.count)/maxMessageCount)*150*/}
                                {/*            const percentageOfTotalEmoji = Math.ceil((totalEmoji / (totalEmoji + totalMedya + totalOthers))*100)*/}
                                {/*            const percentageOfTotalMedya =  Math.ceil((totalMedya / (totalEmoji + totalMedya + totalOthers))*100)*/}
                                {/*            const percentageOfTotalOthers =  Math.ceil((totalOthers / (totalEmoji + totalMedya + totalOthers))*100)*/}

                                {/*            const day = x.date.split('.')[0]*/}
                                {/*            return (*/}
                                {/*                <View key={x.date} style={{flexDirection: 'column', gap: 5, height: 50,flex: 1,}}>*/}
                                {/*                    {*/}
                                {/*                        percentageOfTotalMedya > 0 &&*/}
                                {/*                        <View style={[styles.bar, {backgroundColor: COLORS.green}, {flex: percentageOfTotalMedya}]}>*/}
                                {/*                        </View>*/}
                                {/*                    }*/}
                                {/*                    {*/}
                                {/*                        percentageOfTotalEmoji > 0 &&*/}
                                {/*                        <View style={[styles.bar,{backgroundColor: COLORS.pink}, {flex: percentageOfTotalEmoji}]}>*/}
                                {/*                        </View>*/}
                                {/*                    }*/}
                                {/*                    {*/}
                                {/*                        percentageOfTotalOthers > 0 &&*/}
                                {/*                        <View style={[styles.bar, {backgroundColor: COLORS.blue},{flex: percentageOfTotalOthers}]}>*/}
                                {/*                        </View>*/}
                                {/*                    }*/}

                                {/*                    /!*<Text style={{color: 'white'}}>{percentageOfTotalEmoji}</Text>*!/*/}
                                {/*                </View>*/}
                                {/*            )*/}
                                {/*        })*/}
                                {/*    }*/}
                                {/*</View>*/}
                            </View>
                            <View style={{width: '100%', height: 80, position: 'absolute', justifyContent: 'flex-end', pointerEvents: 'none'}}>
                                <Text style={{color: 'white', opacity: 0.5, alignSelf: 'flex-end'}}>average</Text>
                                <Text numberOfLines={1} ellipsizeMode="clip" style={{color: 'white', opacity: 0.5}}
                                >_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </Text>

                            </View>
                        </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 15, marginVertical: 15,}}>
                <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                    <View style={[styles.square,{backgroundColor: COLORS.orange}]}></View>
                    <Text style={styles.squareText}>Message</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                    <View style={[styles.square,{backgroundColor: COLORS.green}]}></View>
                    <Text style={styles.squareText}>Media</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                    <View style={[styles.square,{backgroundColor: COLORS.pink}]}></View>
                    <Text style={styles.squareText}>Emoji</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                    <View style={[styles.square,{backgroundColor: COLORS.blue}]}></View>
                    <Text style={styles.squareText}>Others</Text>
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
        width: '100%',
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
        width: 15,
        height: 15,
        borderRadius: 5,

    },
    squareText: {
        color: 'white',
        fontSize: 12,
    }
});
