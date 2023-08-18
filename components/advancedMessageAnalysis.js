import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { View as MotiView, AnimatePresence } from 'moti';
import { COLORS, monthsArr } from '../config/constants';
import {groupDataByMonths, findMaxCount} from '../libraries/Helper_Function_Library';
import { AverageLine } from '../libraries/UI_Component_Library';
import AnalysisBar from './AnalysisBar';
import AnalysisTable from './Advanced/AnalysisTable';
import AnalysisMonthly from './Advanced/AnalysisMonthly';

const AdvancedMessageAnalysis = ({analyzedData}) => {
    const dataObjsByDate = analyzedData.dataObjsByDate
    const dataGroupsByMonth = React.useMemo(() =>  groupDataByMonths(dataObjsByDate), [dataObjsByDate]);
    const [page, setPage] = React.useState(0)
    const [pressAllowed ,setPressAllowed ] = useState(true)
    const [dataset, setDataset] = React.useState(null)
    const [monthly, setMonthly] = React.useState(null)
    const [pressed, setPressed] = React.useState({})
    const names = analyzedData.allSendings.nameCount
    const activeDays = analyzedData.activeDays;
    const activeDaysMaxToMin = [...activeDays].sort((a,b) => b[1] - a[1])
    // const mostRepeatedDate = activeDaysMaxToMin[0][0];
    const maxMessageCount = activeDaysMaxToMin[0][1];
    const [monthlyData, setMonthlyData] = React.useState([...dataGroupsByMonth[dataGroupsByMonth.length - 1]])

    const handlePressBack = () => {
        if (!pressAllowed) {
            return;
        }
        setPressAllowed(false)

        setTimeout(() => {
            setPressAllowed(true)
        },1000)

        if (dataGroupsByMonth[dataGroupsByMonth.length - 1 - (page + 1)]) {
            setPage(prevState => prevState + 1)
            setPressed({})
        }
    }
    const handlePressNext = () => {
        if (!pressAllowed) {
            return;
        }
        setPressAllowed(false)

        setTimeout(() => {
            setPressAllowed(true)
        },1000)

        if (dataGroupsByMonth[dataGroupsByMonth.length - 1 - (page - 1)]) {
            setPage(prevState => prevState - 1)
            setPressed({})
        }
    }
    useEffect(() => {
        const newMonthlyData = dataGroupsByMonth[dataGroupsByMonth.length - 1 - page]

        setMonthlyData(newMonthlyData)
    }, [page])

    useEffect(() => {
        if (pressed.DAY !== undefined) {
            const newDataset = monthlyData.find((a) => a.date === pressed.DAY)

            setDataset(newDataset)
        } else  setDataset(null)
    }, [pressed])



    useEffect(() => {
        const firstItem = monthlyData[0];
        const splittedDate = firstItem.date.split(".");
        const date = new Date(parseInt(splittedDate[2]), parseInt(splittedDate[1]) - 1);
        const dateString = monthsArr[date.getMonth()] + " " + date.getFullYear();


        const getCount = (data, name, property) =>
            data.reduce((total, item) => total + item[name][property], 0);

        const getNestedCount = (data, name, property) =>
            data.reduce((total, item) => total + [].concat(...item[name][property]).length, 0);

        const N1messageCount = getCount(monthlyData, names[0], 'message');
        const N2messageCount = getCount(monthlyData, names[1], 'message');
        const N1emojiCount = getNestedCount(monthlyData, names[0], 'emoji');
        const N2emojiCount = getNestedCount(monthlyData, names[1], 'emoji');
        const N1emojis = getCount(monthlyData, names[0], 'emoji');
        const N2emojis = getCount(monthlyData, names[1], 'emoji');
        const N1mediaCount = getNestedCount(monthlyData, names[0], 'media');
        const N2mediaCount = getNestedCount(monthlyData, names[1], 'media');
        const N1othersCount = getNestedCount(monthlyData, names[0], 'others');
        const N2othersCount = getNestedCount(monthlyData, names[1], 'others');

        setMonthly({
            messageCount: { [names[0]]: N1messageCount, [names[1]]: N2messageCount },
            emojiCount: { [names[0]]: N1emojiCount, [names[1]]: N2emojiCount },
            emojis: { [names[0]]: N1emojis, [names[1]]: N2emojis },
            mediaCount: { [names[0]]: N1mediaCount, [names[1]]: N2mediaCount },
            othersCount: { [names[0]]: N1othersCount, [names[1]]: N2othersCount },
            dateString: dateString,
        });
    }, [monthlyData]);



    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>{names[0] + ' - ' + names[1]}</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
                paddingHorizontal: 10,
            }}>
                <TouchableOpacity disabled={!pressAllowed} style={styles.arrow} onPress={handlePressBack}>
                    <Image
                        source={require('../assets/arrow_left.png')}
                        style={styles.arrowIcon}
                    />
                </TouchableOpacity>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{
                        color: COLORS.lightPurple,
                        fontWeight: '700',
                        fontSize: 15
                    }}>{monthlyData[0].date} - {monthlyData[monthlyData.length - 1].date}</Text>
                </View>
                <TouchableOpacity disabled={!pressAllowed} style={styles.arrow} onPress={handlePressNext}>
                    <Image
                        source={require('../assets/arrow_right.png')}
                        style={styles.arrowIcon}
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
                                                     percentageOfChange={percentageOfChange} pressed={pressed} pressAllowed={pressAllowed}
                                                     setPressed={setPressed} day={day} elementCount={elementCount}/>
                                    )
                                })
                            }
                        </AnimatePresence>
                    </View>
                </View>
                <AverageLine num={Math.round(maxMessageCount/2)}/>
            </View>
            <ScrollView contentContainerStyle={{}}>
                {dataset ? (
                    <AnalysisTable dataset={dataset} names={names} pressAllowed={pressAllowed} setPressAllowed={setPressAllowed} />
                ) : (
                    monthly !== null && <AnalysisMonthly key={monthly.dateString} monthly={monthly} names={names}  />
                )}
            </ScrollView>
        </View>
    );
};

export default AdvancedMessageAnalysis;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textStyle: {
        color: COLORS.white,
        fontSize: 17
    },
    bar: {
        width: '100%',
        height: 150,
        backgroundColor: COLORS.white,
        borderRadius: 15,

    },
    mainTitle: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
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
    },
    arrowIcon: {
        width: 20,
        height: 20,
        tintColor: 'white',
    }
});
