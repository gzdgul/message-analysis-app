import React, {useEffect} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import {COLORS} from "../config/constants";
import {addMissingDates, calculateCountAverage, findMaxCount, sumCounts} from "./utils";
import {LinearGradient} from "expo-linear-gradient";
import {View as MotiView} from "moti/build/components/view";
import AnalysisBar from "./AnalysisBar";
import {AnimatePresence} from "moti";
import {
    AnalysisLabel,
    AnalysisValueBoxContainer,
    AnalysisValueBoxSmall,
    colorCorrector,
    colorCorrector2
} from "./auxiliary";

const AdvancedMessageAnalysis = ({analyzedData}) => {
    const [page, setPage] = React.useState(0)
    const [dataset, setDataset] = React.useState(null)
    const [analysisData, setAnalysisData] = React.useState(null)
    const [pressed, setPressed] = React.useState({})
    const mostRepeatedDates = analyzedData.mostRepeatedDates
    const names = analyzedData.allSendings.nameCount
    const firstDate = mostRepeatedDates[0].date
    const mostRepeatedDatesSorted = [...mostRepeatedDates].sort((a, b) => b.count - a.count);
    const mostRepeatedDateeee = mostRepeatedDatesSorted[0].date
    const maxMessageCount = findMaxCount(mostRepeatedDates)
    const messageSendingAvr = sumCounts(analyzedData.allSendings.messageCounts)/2
    const test = analyzedData.allSendings.test
    console.log(pressed.DAY)
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
    // console.log('gruplanmisVeriler!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',gruplanmisVeriler)
    const deneme = []
    for (const ay in gruplanmisVeriler) {
        deneme.push(gruplanmisVeriler[ay])
    }
    // console.log('deneme//////////////',deneme)
    // const baslangicTarih = aaa[0].date
    // const bitisTarih = aaa[aaa.length -1].date

    const handlePressBack = () => {
        if (deneme[deneme.length -1 - (page + 1)]) {
            setPage(prevState => prevState + 1)
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!GOZDEEEEEEE',deneme[deneme.length -1 - (page +1)][deneme[deneme.length -1 - (page +1)].length - 1].date)
            // setPressedDay(deneme[deneme.length -1 - (page +1)][deneme[deneme.length -1 - (page +1)].length - 1].date)
        }
    }
    const handlePressNext = () => {
        if (deneme[deneme.length -1 - (page - 1)]) {
            setPage(prevState => prevState - 1)
        }
    }

    useEffect(() => {
        const newDataset = deneme[deneme.length -1 - page].find((a) => a.date === pressed.DAY)
        console.log(newDataset)
        setDataset(newDataset)
    },[pressed])

    useEffect(() => {
        if (dataset) {
            const totalEmoji = [].concat(...dataset[names[0]].emoji).length + [].concat(...dataset[names[1]].emoji).length
            const totalMedya = [].concat(... dataset[names[0]].media).length + [].concat(... dataset[names[1]].media).length
            const totalOthers = [].concat(... dataset[names[0]].others).length + [].concat(... dataset[names[1]].others).length
            const percentageOfTotalEmoji = Math.ceil((totalEmoji / (totalEmoji + totalMedya + totalOthers))*100)
            const percentageOfTotalMedya =  Math.ceil((totalMedya / (totalEmoji + totalMedya + totalOthers))*100)
            const percentageOfTotalOthers =  Math.ceil((totalOthers / (totalEmoji + totalMedya + totalOthers))*100)
            setAnalysisData({
                totalEmoji: totalEmoji,
                totalMedya:totalMedya,
                totalOthers:totalOthers,
                percentageOfTotalEmoji:percentageOfTotalEmoji,
                percentageOfTotalMedya:percentageOfTotalMedya,
                percentageOfTotalOthers:percentageOfTotalOthers,
            })
        }
    },[dataset])

    const countArray = (key, patch) => {
        if (patch) {
            return  {
                [names[0]]: dataset[names[0]][key].filter(item => item === patch).length,
                [names[1]]: dataset[names[1]][key].filter(item => item === patch).length
            }
        } else {
            return  {
                [names[0]]: dataset[names[0]][key],
                [names[1]]: dataset[names[1]][key]
            }
        }
    }

    const AnalysisBoxRow = ({title, data, id}) => {
        let dataObj;
        console.log('KEY',id)
        if (typeof data[names[0]] === 'number') {
            // console.log('number')
            dataObj = {
                data1: data[names[0]],
                data2: data[names[1]],
                sum: data,
            };
        } else  {
            // console.log('otherrrrrrrrrrrrr')
            dataObj = {
                data1: [].concat(...data[names[0]]).length,
                data2: [].concat(...data[names[1]]).length,
                sum: {},
            }
            dataObj.sum[names[0]] = dataObj.data1;
            dataObj.sum[names[1]] = dataObj.data2;
        }
        return (
            <MotiView
                transition={{ delay: id*100, damping: 15, mass: 1 }}
                from={{
                    opacity: 0,
                    top: -15,
                }}
                animate={{
                    opacity: 1,
                    top: 0,
                }}
                exit={{
                    opacity: 0,
                    top: -15,
                }}
                exitTransition={{
                    type: 'timing',
                    duration: 300,
                }}
                style={[styles.valueBoxContainer,{ marginVertical: 3}, {height: 45}]}>
                <View style={[styles.box,{borderWidth: 1, borderColor: COLORS.color2, backgroundColor: 'transparent'}]}>
                    <Text style={[styles.boxTitleText]}>{title}</Text>
                </View>

                <View style={[styles.box, colorCorrector2(data,0, names)]}>
                    <Text style={[styles.boxValueText, {color: COLORS.color2}, colorCorrector2(data,0, names)]}>{dataObj.data1}</Text>
                </View>
                <View style={[styles.box, colorCorrector2(data,1, names)]}>
                    <Text style={[styles.boxValueText,{color: COLORS.color2}, colorCorrector2(data,1, names)]}>{dataObj.data2}</Text>
                </View>
                <View style={[styles.box,{borderWidth: 1, borderColor: COLORS.color2, backgroundColor: 'transparent'}]}>
                    <Text style={[styles.boxValueText, {color: COLORS.color2}]}>{sumCounts(dataObj.sum)}</Text>
                </View>
            </MotiView>
        )
    }
    const AnalysisTable = ({ dataset }) => {
        return (
            <MotiView
                transition={{ delay: 0, damping: 15, mass: 1 }}
                from={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
                exitTransition={{
                    type: 'timing',
                    duration: 300,
                }}
            >
                <View style={{flexDirection: 'row', height: 45}}>
                    <View style={[styles.box,{backgroundColor: 'transparent'}]}>
                        <Text style={[styles.boxTitleText, {fontSize: 14}]}>{dataset.date}</Text>
                    </View>
                    <View style={[styles.box,{borderWidth: 1, borderColor: COLORS.color2, backgroundColor: 'transparent'}]}>
                        <Text style={[styles.boxTitleText]}>{names[0]}</Text>
                    </View>
                    <View style={[styles.box,{borderWidth: 1, borderColor: COLORS.color2, backgroundColor: 'transparent'}]}>
                        <Text style={[styles.boxTitleText]}>{names[1]}</Text>
                    </View>
                    <View style={[styles.box,{borderWidth: 1, borderColor: COLORS.color2, backgroundColor: 'transparent'}]}>
                        <Text style={[styles.boxTitleText]}>Total</Text>
                    </View>
                </View>
                {
                   [
                       {title: 'Mesaj', key: 'message', patch: null},
                       {title: 'Emoji', key: 'emoji', patch: null},
                       {title: 'Picture', key: 'media', patch: 'picture'},
                       {title: 'Video', key: 'media', patch: 'video'},
                       {title: 'Audio', key: 'media', patch: 'audio'},
                       {title: 'Document', key: 'others', patch: 'document'},
                       {title: 'GIF', key: 'others', patch: 'gif'},
                       {title: 'Sticker', key: 'others', patch: 'sticker'},
                       {title: 'Link', key: 'others', patch: 'link'},
                   ].map((x,index) => {
                       return  <AnalysisBoxRow key={index} id={index} title={x.title} data={countArray(x.key,x.patch)}/>
                   })
                }

                {/*<AnalysisBoxRow title={'Mesaj'} data={countArray('message')}/>*/}
                {/*<AnalysisBoxRow title={'Emoji'} data={countArray('emoji')}/>*/}
                {/*<AnalysisBoxRow title={'Media'} data={countArray('media')}/>*/}
                {/*<AnalysisBoxRow title={'Picture'} data={countArray('media','picture')}/>*/}
                {/*<AnalysisBoxRow title={'Video'} data={countArray('media','video')}/>*/}
                {/*<AnalysisBoxRow title={'Audio'} data={countArray('media','audio')}/>*/}
                {/*<AnalysisBoxRow title={'Others'} data={countArray('others')}/>*/}
                {/*<AnalysisBoxRow title={'Document'} data={countArray('others','document')}/>*/}
                {/*<AnalysisBoxRow title={'GIF'} data={countArray('others','gif')}/>*/}
                {/*<AnalysisBoxRow title={'Sticker'} data={countArray('others','sticker')}/>*/}
                {/*<AnalysisBoxRow title={'Link'} data={countArray('others','link')}/>*/}
            </MotiView>
        );
    }
    return (
        <View style={{flex: 1}}>
            <Text style={styles.mainTitle}>Message Analysis Advanced</Text>
            {/*<Text style={styles.mainTitle}>{page}</Text>*/}



            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity style={styles.arrow} onPress={ handlePressBack }>
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
                    <Text style={{color: COLORS.white, fontWeight: '700', fontSize: 15}}>{deneme[deneme.length -1 - page][0].date} - {deneme[deneme.length -1 - page][deneme[deneme.length -1 - page].length - 1].date}</Text>
                </View>
                <TouchableOpacity style={styles.arrow} onPress={ handlePressNext }>
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
                                <View style={{flexDirection: 'row', gap: 5,alignItems: 'flex-end',height: 183}}>
                                    <AnimatePresence>
                                    {
                                        deneme[deneme.length -1 - page].map((x, index) => {
                                            const block = deneme[deneme.length -1 - page][0].date +'-'+ deneme[deneme.length -1 - page][deneme[deneme.length -1 - page].length - 1].date
                                            // console.log('blockblockblockblockblockblockblock',block)
                                            const percentageOfChange = ((maxMessageCount - x.count)/maxMessageCount)*150
                                            const day = x.date.split('.')[0]
                                            const elementCount =  deneme[deneme.length -1 - page].length
                                            return (
                                                   <AnalysisBar key={index} id={x.date} block={block} percentageOfChange={percentageOfChange} pressed={pressed} setPressed={setPressed} day={day} elementCount={elementCount} />
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

                {/*{*/}
                {/*    (dataset && analysisData) &&*/}
                {/*    <View>*/}
                {/*        <Text style={styles.dateTitle}>{dataset?.date}</Text>*/}
                {/*        <View style={{ width: '100%', height: 20, flexDirection: 'row', borderRadius: 100, gap:5 }}>*/}

                {/*            {*/}
                {/*                <MotiView*/}
                {/*                    transition={{ delay: 0, damping: 15, mass: 1 }}*/}
                {/*                    animate={{*/}
                {/*                        flex: analysisData.percentageOfTotalMedya,*/}
                {/*                        width: analysisData.percentageOfTotalMedya < 1 && 0*/}
                {/*                    }}*/}
                {/*                    exit={{*/}
                {/*                        opacity: 0,*/}
                {/*                        width: 0,*/}
                {/*                    }}*/}
                {/*                    exitTransition={{*/}
                {/*                        type: 'timing',*/}
                {/*                        duration: 300,*/}
                {/*                    }}*/}
                {/*                    style={{ height: '100%', backgroundColor: COLORS.color1, borderRadius: 100}}></MotiView>*/}
                {/*            }*/}
                {/*            {*/}
                {/*                <MotiView*/}
                {/*                    transition={{ delay: 0, damping: 15, mass: 1 }}*/}
                {/*                    animate={{*/}
                {/*                        flex: analysisData.percentageOfTotalEmoji,*/}
                {/*                        width: analysisData.percentageOfTotalEmoji < 1 && 0*/}
                {/*                    }}*/}
                {/*                    exit={{*/}
                {/*                        opacity: 0,*/}
                {/*                        width: 0,*/}
                {/*                    }}*/}
                {/*                    exitTransition={{*/}
                {/*                        type: 'timing',*/}
                {/*                        duration: 300,*/}
                {/*                    }}*/}
                {/*                    style={{ height: '100%',backgroundColor: COLORS.color2, borderRadius: 100}}></MotiView>*/}
                {/*            }*/}
                {/*            {*/}
                {/*                <MotiView*/}
                {/*                    transition={{ delay: 0, damping: 15, mass: 1 }}*/}
                {/*                    animate={{*/}
                {/*                        flex: analysisData.percentageOfTotalOthers,*/}
                {/*                        width: analysisData.percentageOfTotalOthers < 1 && 0*/}
                {/*                    }}*/}
                {/*                    exit={{*/}
                {/*                        opacity: 0,*/}
                {/*                        width: 0,*/}
                {/*                    }}*/}
                {/*                    exitTransition={{*/}
                {/*                        type: 'timing',*/}
                {/*                        duration: 300,*/}
                {/*                    }}*/}
                {/*                    style={{ height: '100%',backgroundColor: COLORS.color3, borderRadius: 100}}></MotiView>*/}
                {/*            }*/}
                {/*        </View>*/}
                {/*        <View style={{flexDirection: 'row', gap: 5}}>*/}
                {/*            /!*<View style={{flex: 1,  gap: 5}}>*!/*/}
                {/*            /!*    <Text style={[styles.boxTitleText]}>Media</Text>*!/*/}
                {/*            /!*    <View style={{width: '100%', height:55, backgroundColor: COLORS.darkPurple, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>*!/*/}
                {/*            /!*        <Text style={[styles.boxValueText]}>75</Text>*!/*/}
                {/*            /!*    </View>*!/*/}
                {/*            /!*    <View style={{width: '100%', height:55 ,flexDirection: 'row',  gap: 5}}>*!/*/}
                {/*            /!*        <View style={{flex: 1, height: '100%', backgroundColor: COLORS.darkPurple, borderRadius: 25,  justifyContent: 'center', alignItems: 'center'}}>*!/*/}
                {/*            /!*            <Text style={styles.boxValueText}>20</Text>*!/*/}
                {/*            /!*        </View>*!/*/}
                {/*            /!*        <View style={{flex: 1, height: '100%', backgroundColor: COLORS.color2, borderRadius: 25,  justifyContent: 'center', alignItems: 'center'}}>*!/*/}
                {/*            /!*            <Text style={styles.boxValueText}>55</Text>*!/*/}
                {/*            /!*        </View>*!/*/}
                {/*            /!*    </View>*!/*/}
                {/*            /!*</View>*!/*/}
                {/*            /!*<View style={{flex: 1,  gap: 5}}>*!/*/}
                {/*            /!*    <Text style={[styles.boxTitleText]}>Media</Text>*!/*/}
                {/*            /!*    <View style={{width: '100%', height:55, backgroundColor: COLORS.darkPurple, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>*!/*/}
                {/*            /!*        <Text style={[styles.boxValueText]}>75</Text>*!/*/}
                {/*            /!*    </View>*!/*/}
                {/*            /!*    <View style={{width: '100%', height:55 ,flexDirection: 'row',  gap: 5}}>*!/*/}
                {/*            /!*        <View style={{flex: 1, height: '100%', backgroundColor: COLORS.darkPurple, borderRadius: 25,  justifyContent: 'center', alignItems: 'center'}}>*!/*/}
                {/*            /!*            <Text style={styles.boxValueText}>20</Text>*!/*/}
                {/*            /!*        </View>*!/*/}
                {/*            /!*        <View style={{flex: 1, height: '100%', backgroundColor: COLORS.color2, borderRadius: 25,  justifyContent: 'center', alignItems: 'center'}}>*!/*/}
                {/*            /!*            <Text style={styles.boxValueText}>55</Text>*!/*/}
                {/*            /!*        </View>*!/*/}
                {/*            /!*    </View>*!/*/}
                {/*            /!*</View>*!/*/}
                {/*            /!*<View style={{flex: 1,  gap: 5}}>*!/*/}
                {/*            /!*    <Text style={[styles.boxTitleText]}>Media</Text>*!/*/}
                {/*            /!*    <View style={{width: '100%', height:55, backgroundColor: COLORS.darkPurple, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>*!/*/}
                {/*            /!*        <Text style={[styles.boxValueText]}>75</Text>*!/*/}
                {/*            /!*    </View>*!/*/}
                {/*            /!*    <View style={{width: '100%', height:55 ,flexDirection: 'row',  gap: 5}}>*!/*/}
                {/*            /!*        <View style={{flex: 1, height: '100%', backgroundColor: COLORS.darkPurple, borderRadius: 25,  justifyContent: 'center', alignItems: 'center'}}>*!/*/}
                {/*            /!*            <Text style={styles.boxValueText}>20</Text>*!/*/}
                {/*            /!*        </View>*!/*/}
                {/*            /!*        <View style={{flex: 1, height: '100%', backgroundColor: COLORS.color2, borderRadius: 25,  justifyContent: 'center', alignItems: 'center'}}>*!/*/}
                {/*            /!*            <Text style={styles.boxValueText}>55</Text>*!/*/}
                {/*            /!*        </View>*!/*/}
                {/*            /!*    </View>*!/*/}
                {/*            /!*</View>*!/*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*}*/}


            <ScrollView contentContainerStyle={{}}>
                {
                    dataset &&
                   <AnalysisTable dataset={dataset}/>

                }
            </ScrollView>

            {/*<View style={{flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 15, marginVertical: 5,}}>*/}
            {/*    <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>*/}
            {/*        <View style={[styles.square,{backgroundColor: COLORS.color1}]}></View>*/}
            {/*        <Text style={styles.squareText}>Media</Text>*/}
            {/*    </View>*/}
            {/*    <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>*/}
            {/*        <View style={[styles.square,{backgroundColor: COLORS.color2}]}></View>*/}
            {/*        <Text style={styles.squareText}>Emoji</Text>*/}
            {/*    </View>*/}
            {/*    <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>*/}
            {/*        <View style={[styles.square,{backgroundColor: COLORS.color3}]}></View>*/}
            {/*        <Text style={styles.squareText}>Others</Text>*/}
            {/*    </View>*/}
            {/*</View>*/}

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
        // marginVertical: 10,
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
        justifyContent:'center',
        alignItems: 'center'
    }
});
