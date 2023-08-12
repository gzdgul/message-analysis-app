import React, {useEffect} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import {COLORS, monthsArr} from "../config/constants";
import {View as MotiView} from "moti/build/components/view";
import AnalysisBar from "./AnalysisBar";
import {AnimatePresence} from "moti";
import {colorCorrector2, findMaxCount, sumCounts} from "../libraries/Helper_Function_Library";
import {AverageLine} from "../libraries/UI_Component_Library";
import AnalysisTable from "./Advanced/AnalysisTable";
import AnalysisMonthly from "./Advanced/AnalysisMonthly";

const AdvancedMessageAnalysis = ({analyzedData}) => {
    const [page, setPage] = React.useState(0)
    const [dataset, setDataset] = React.useState(null)
    const [monthly, setMonthly] = React.useState(null)
    const [pressed, setPressed] = React.useState({})
    const mostRepeatedDates = analyzedData.mostRepeatedDates
    const names = analyzedData.allSendings.nameCount
    const maxMessageCount = findMaxCount(mostRepeatedDates)
    const test = analyzedData.allSendings.test
    console.log('pressed.DAY',pressed.DAY)

    // Verileri tarihlerine göre gruplamak için boş bir nesne oluşturuyoruz
    let gruplanmisVeriler = {};

// Veriler dizisini tarihlerine göre gruplayan bir döngü
    test.forEach(function (veri) {
        const tarihParcalari = veri.date.split('.');
        const ay = '**.' + tarihParcalari[1] + '.' + tarihParcalari[2];

        if (!gruplanmisVeriler[ay]) {
            gruplanmisVeriler[ay] = [];
        }

        gruplanmisVeriler[ay].push(veri);
    });

    const deneme = []
    for (const ay in gruplanmisVeriler) {
        deneme.push(gruplanmisVeriler[ay])
    }

    const [monthlyData, setMonthlyData] = React.useState([...deneme[deneme.length - 1]])

    const handlePressBack = () => {
        if (deneme[deneme.length - 1 - (page + 1)]) {
            setPage(prevState => prevState + 1)
        }
    }
    const handlePressNext = () => {
        if (deneme[deneme.length - 1 - (page - 1)]) {
            setPage(prevState => prevState - 1)
        }
    }

    useEffect(() => {
        const newDataset = monthlyData.find((a) => a.date === pressed.DAY)
        console.log('newDataset',newDataset)
        setDataset(newDataset)
    }, [pressed])

    useEffect(() => {
        const newMonthlyData = deneme[deneme.length - 1 - page]
        console.log('newMonthlyData', newMonthlyData)
        setMonthlyData(newMonthlyData)
    }, [page])

    useEffect(() => {
        const splittedDate = [...monthlyData].shift().date.split(".");
        const month = parseInt(splittedDate[1]) - 1; // aylar 0-11
        const year = parseInt(splittedDate[2]);
        const date = new Date(year, month);
        const dateString = monthsArr[date.getMonth()] + " " + date.getFullYear();
        let messageCount = 0;
        let N1messageCount = 0;
        let N2messageCount = 0;
        let N1emojiCount = 0;
        let N2emojiCount = 0;
        let N1mediaCount = 0;
        let N2mediaCount = 0;
        let N1othersCount = 0;
        let N2othersCount = 0;
        for (const item of monthlyData) {
            messageCount += item.count;
            N1messageCount += item[names[0]].message;
            N2messageCount += item[names[1]].message;
            N1emojiCount += [].concat(...item[names[0]].emoji).length;
            N2emojiCount += [].concat(...item[names[1]].emoji).length;
            N1mediaCount += [].concat(...item[names[0]].media).length;
            N2mediaCount += [].concat(...item[names[1]].media).length;
            N1othersCount += [].concat(...item[names[0]].others).length;
            N2othersCount += [].concat(...item[names[1]].others).length;
        }
        setMonthly({
            messageCount: {[names[0]]: N1messageCount, [names[1]]: N2messageCount},
            emojiCount: {[names[0]]: N1emojiCount, [names[1]]: N2emojiCount},
            mediaCount: {[names[0]]: N1mediaCount, [names[1]]: N2mediaCount},
            othersCount: {[names[0]]: N1othersCount, [names[1]]: N2othersCount},
            dateString: dateString,

        })
    }, [monthlyData])


    return (
        <View style={{flex: 1}}>
            <Text style={styles.mainTitle}>Message Analysis Advanced</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
            }}>
                <TouchableOpacity style={styles.arrow} onPress={handlePressBack}>
                    <Image
                        source={require('../assets/arrow_left.png')}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: 'white',
                        }}
                    />
                </TouchableOpacity>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{
                        color: COLORS.white,
                        fontWeight: '700',
                        fontSize: 15
                    }}>{monthlyData[0].date} - {monthlyData[monthlyData.length - 1].date}</Text>
                </View>
                <TouchableOpacity style={styles.arrow} onPress={handlePressNext}>
                    <Image
                        source={require('../assets/arrow_right.png')}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: 'white',
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <View style={{paddingHorizontal: 0}}>
                    <View style={{flexDirection: 'row', gap: 5, alignItems: 'flex-end', height: 183}}>
                        <AnimatePresence>
                            {
                                monthlyData.map((x, index) => {
                                    const block = monthlyData[0].date + '-' + monthlyData[monthlyData.length - 1].date
                                    const percentageOfChange = ((maxMessageCount - x.count) / maxMessageCount) * 150
                                    const day = x.date.split('.')[0]
                                    const elementCount = monthlyData.length
                                    return (
                                        <AnalysisBar key={index} id={x.date} block={block}
                                                     percentageOfChange={percentageOfChange} pressed={pressed}
                                                     setPressed={setPressed} day={day} elementCount={elementCount}/>
                                    )
                                })
                            }
                        </AnimatePresence>
                    </View>
                </View>
                <AverageLine/>
            </View>
            <ScrollView contentContainerStyle={{}}>
                {
                    dataset
                        ? <AnalysisTable dataset={dataset} names={names}/>
                        : monthly && <AnalysisMonthly monthly={monthly} names={names}/>

                }
            </ScrollView>
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
        fontSize: 25,
        fontWeight: '600',
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
    },
    labelTitleText: {
        color: COLORS.lightGreen,
        fontSize: 15,
        fontWeight: '500',
        marginTop: 10,
    },
    valueBoxContainer: {
        width: '100%',
        height: 115,
        flexDirection: 'row',
        gap: 5,
        marginVertical: 15,
    },
    boxTitleText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '500',
    },
    boxValueText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: '600'
    },
    box: {
        flex: 1,
        height: '100%',
        backgroundColor: COLORS.darkPurple,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrow: {
        width: 35,
        height: 35,
        backgroundColor: COLORS.darkPurple,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
