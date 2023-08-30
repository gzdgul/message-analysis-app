import React, {useEffect} from 'react';
import {Button, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, htmlMaker, translations} from "../config/constants";

import {AnalysisLabel, AnalysisValueBoxContainer, AnalysisValueBoxSmall} from "../libraries/UI_Component_Library";
import {sumCounts} from "../libraries/Helper_Function_Library";
import { printToFileAsync } from "expo-print";
import {shareAsync} from "expo-sharing";
import {View as MotiView} from "moti/build/components/view";
import {AnimatePresence} from "moti";
import * as Haptics from "expo-haptics";

const SimpleMessageAnalysis = ({analyzedData, language}) => {
    const { width, height } = Dimensions.get('window');
    const [showEmojiBOMB, setShowEmojiBOMB] = React.useState(false)
    const [pressAllowed, setPressAllowed] = React.useState(true)
    const totalword = analyzedData.allSendings.totalWord
    // const mostRepeatedDate = analyzedData.mostRepeatedDate
    const activeDays = analyzedData.activeDays
    const mostRepeatedWordsAndSenders = analyzedData.mostRepeatedWordsAndSenders
    const mostUsedEmojisAndSenders = analyzedData.mostUsedEmojisAndSenders
    const messageSending = analyzedData.allSendings.messageCounts
    const emojiSending = analyzedData.allSendings.emojiCounts
    const ImageSending = analyzedData.allSendings.mediaCounts.image
    const videoSending = analyzedData.allSendings.mediaCounts.video
    const audioSending = analyzedData.allSendings.mediaCounts.audio
    const documentSending = analyzedData.allSendings.mediaCounts.document
    const gifSending = analyzedData.allSendings.mediaCounts.gif
    const messagingByTime = analyzedData.allSendings.timeCount
    const names = analyzedData.allSendings.nameCount
    // const stickerSending = analyzedData.allSendings.mediaCounts.sticker
    // const linkSending = analyzedData.allSendings.mediaCounts.link
    // const missedCallCounts = analyzedData.allSendings.missedCallCounts
    // const longestMessageSender = analyzedData.longestMessage.name
    // const longestMessage = analyzedData.longestMessage.message


    const activeDaysMaxToMin = [...activeDays].sort((a,b) => b[1] - a[1])
    const mostRepeatedDate = activeDaysMaxToMin[0][0];
    // const maxMessageCount = activeDaysMaxToMin[0][1];
    const timeInterval = `${[...activeDays].shift()[0]} - ${[...activeDays].pop()[0]}`
    const dateDataforPDF = {mostRepeatedDate: mostRepeatedDate, timeInterval: timeInterval}
    const emojiBOMB = [];
    const [countdown, setCountdown] = React.useState(0);
    mostUsedEmojisAndSenders.forEach((x) => {
      emojiBOMB.push(x.emoji)
    })
    console.log(emojiBOMB)

    const html = htmlMaker(names,dateDataforPDF,analyzedData, language)

    let generatePdf = async () => {

        const file = await  printToFileAsync({
            html: html,
            base64: false,
            useMarkupFormatter: true
        });
        await Haptics.selectionAsync()
        await shareAsync(file.uri);

    };
   const DualBoxView = ({title, totalTitle, data, titleArr, total}) => (
       <View>
           {
               total &&
               <AnalysisLabel title={totalTitle} value={sumCounts(data)}/>
           }
           <Text style={styles.labelTitleText}>{title}</Text>
           <AnalysisValueBoxContainer data={data} titleArr={titleArr}/>
       </View>
   )
    const handleEmojiButtonPress = () => {
       if (pressAllowed === true) {
           setPressAllowed(false)
           setShowEmojiBOMB(true)
           setTimeout(() => {
               setShowEmojiBOMB(false);
               setCountdown(5);
           }, 5000);
           setTimeout(() => {
               setPressAllowed(true)

           }, 13000);
       }
    }


    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [countdown]);

    useEffect(() => {
        handleEmojiButtonPress();
    },[])
    return (
        <View style={styles.container}>
            <AnimatePresence>
                {showEmojiBOMB &&
                    [...emojiBOMB,...emojiBOMB,...emojiBOMB,...emojiBOMB,...emojiBOMB].map((x, index) => {
                        const randomNum1 = Math.floor(Math.random() * width-90) + 90;
                        const randomNum2 = Math.floor(Math.random() * 2000) + 300;
                        const randomNum3 = Math.floor(Math.random() * 35) + 25;
                        const randomValue = Math.random() * 0.9 + 0.6;
                        const randomNum4 = parseFloat(randomValue.toFixed(1));
                        // console.log(randomNum1, randomNum2, randomNum3, randomNum4)
                        return (
                            <MotiView
                                key={index}
                                transition={{
                                    delay: index*(50),
                                    damping: 10,
                                    mass: 1,
                                    type: 'timing',
                                    duration: 1000,
                                }}
                                from={{
                                    opacity: 1,
                                    left: randomNum1,
                                    top: -200
                                }}
                                animate={{
                                    opacity: randomNum4,
                                    left: randomNum1,
                                    top:height,
                                }}
                                exit={{
                                    opacity: 0,
                                    top:height,
                                }}
                                exitTransition={{
                                    type: 'timing',
                                    duration: 300,
                                }}
                                style={{position: 'absolute', zIndex: 100}}
                            >
                                <Text style={{fontSize: randomNum3}}>{x}</Text>
                            </MotiView>
                        )
                    })
                }
            </AnimatePresence>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 30,}}>

            <Text style={styles.mainTitle}>{translations[language]["simple"] + " " + translations[language]["message_analysis"]}</Text>

            <View style={{marginTop: -10, paddingVertical: 10, paddingHorizontal: 10, borderRadius:25, alignItems: 'center', gap: 5 }}>
                <Text style={{color: COLORS.white, fontSize: 17, fontWeight: 'bold'}}>{names[0] + ' - ' + names[1]}</Text>
                <Text style={{color: COLORS.white, fontSize: 17, fontWeight: 'bold'}}>{timeInterval}</Text>

                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={handleEmojiButtonPress}>
                    <MotiView
                        animate={{left: countdown > 0 ? 80 : 0,}}
                    >
                        <View  style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}} >
                            <Text style={{fontSize: 30}}>🎉</Text>
                        </View>
                    </MotiView>

                    <MotiView
                        animate={{left: countdown > 0 ? 80 : 0,}}
                        style={{width: 170}}>
                        {
                            countdown !== 0 ? <Text style={{color: COLORS.white,opacity: 0.5, fontSize: 15, fontWeight: 'bold'}}>{countdown}</Text>
                                :  <Text style={{color: COLORS.white,opacity: 0.5, fontSize: 10, fontWeight: 'bold'}}>{translations[language]["emoji_conf_desc"]}</Text>
                        }
                    </MotiView>
                </TouchableOpacity>

            </View>
            <AnalysisLabel title={translations[language]["analysisTitles"][0]} value={sumCounts(messageSending)}/>
            <AnalysisLabel title={translations[language]["analysisTitles"][1]} value={mostRepeatedDate}/>
            <DualBoxView title={translations[language]["analysisTitles"][2]} data={messagingByTime} titleArr={['morning','night']} total={false}/>
            <DualBoxView title={translations[language]["analysisTitles"][3]} data={messageSending} titleArr={names} total={false}/>
            <AnalysisLabel title={translations[language]["analysisTitles"][4]} value={totalword}/>
            <Text style={styles.labelTitleText}>{translations[language]["analysisTitles"][5]}</Text>
            <View style={{marginTop: 15}}>
                {mostRepeatedWordsAndSenders.map((x, index) => (
                    <View key={index} style={[styles.valueBoxContainer,{ marginVertical: 5}, {height: 80}]}>
                        <AnalysisValueBoxSmall customValue={`"${x.word}"`} titleArr={names}/>
                        <AnalysisValueBoxSmall data={x.count} i={0} titleArr={names}/>
                        <AnalysisValueBoxSmall data={x.count} i={1} titleArr={names}/>
                    </View>
                ))}
            </View>
            <DualBoxView totalTitle={translations[language]["analysisTitles"][6]} title={translations[language]["analysisTitles"][7]} data={emojiSending} titleArr={names} total={true}/>
            <Text style={styles.labelTitleText}>{translations[language]["analysisTitles"][8]}</Text>
            <View style={{marginTop: 15}}>
                {mostUsedEmojisAndSenders.map((x, index) => (
                    <View key={index} style={[styles.valueBoxContainer,{ marginVertical: 5}, {height: 80}]}>
                        <AnalysisValueBoxSmall customValue={x.emoji} type={'emoji'} titleArr={names}/>
                        <AnalysisValueBoxSmall data={x.count} i={0} titleArr={names}/>
                        <AnalysisValueBoxSmall data={x.count} i={1} titleArr={names}/>
                    </View>
                ))}
            </View>
            <DualBoxView totalTitle={translations[language]["analysisTitles"][9]} title={translations[language]["analysisTitles"][10]} data={ImageSending} titleArr={names} total={true}/>
            <DualBoxView totalTitle={translations[language]["analysisTitles"][11]} title={translations[language]["analysisTitles"][12]} data={videoSending} titleArr={names} total={true}/>
            <DualBoxView totalTitle={translations[language]["analysisTitles"][13]} title={translations[language]["analysisTitles"][14]} data={audioSending} titleArr={names} total={true}/>
            <DualBoxView totalTitle={translations[language]["analysisTitles"][15]} title={translations[language]["analysisTitles"][16]} data={documentSending} titleArr={names} total={true}/>
            <DualBoxView totalTitle={translations[language]["analysisTitles"][17]} title={translations[language]["analysisTitles"][18]} data={gifSending} titleArr={names} total={true}/>
            <View style={{paddingVertical: 20}}>
                <Button title={translations[language]["generate_pdf"]} onPress={generatePdf}/>
            </View>

        </ScrollView>
        </View>
    );
};

export default SimpleMessageAnalysis;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textStyle: {
        color: COLORS.white,
        fontSize: 17
    },
    labelTitleText: {
        color: COLORS.lightGreen,
        fontSize: 15,
        fontWeight: '500',
        marginTop: 10,
    },

    labelValueText: {
        color: COLORS.white,
        fontSize: 57,
        fontWeight: '600'
    },
    mainTitle: {
        color: COLORS.lightGreen,
        fontSize: 35,
        fontWeight: '600',
        marginVertical: 20,
        marginBottom: 25,
    },
    boxTitleText: {
        color: COLORS.lightGreen,
        fontSize: 15,
        fontWeight: '500',
        // marginVertical: 15,
    },
    boxValueText: {
        color: COLORS.white,
        fontSize: 35,
        fontWeight: '600'
    },
    box: {
        flex: 1,
        height: '100%',
        backgroundColor: COLORS.stone,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    valueBoxContainer: {
        width: '100%',
        height: 115,
        flexDirection: 'row',
        gap: 5,
        marginVertical: 15,
    }
});
