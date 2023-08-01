import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {findMaxCountKey, sumCounts} from "./utils";
import {COLORS} from "../config/constants";
import {AnalysisLabel, AnalysisValueBoxContainer, AnalysisValueBoxSmall} from "./auxiliary";

const SimpleMessageAnalysis = ({analyzedData}) => {
    const totalword = analyzedData.allSendings.totalWord
    const mostRepeatedDate = analyzedData.mostRepeatedDate
    const mostRepeatedDates = analyzedData.mostRepeatedDates
    const mostRepeatedDatesSorted = [...mostRepeatedDates].sort((a, b) => b.count - a.count);
    const mostRepeatedDateeee = mostRepeatedDatesSorted[0].date
    console.log('mostRepeatedDates!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',mostRepeatedDates)
    console.log('mostRepeatedDatesSorted!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',mostRepeatedDatesSorted)
    console.log('mostRepeatedDateeee!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',mostRepeatedDateeee)
    const longestMessageSender = analyzedData.longestMessage.name
    const longestMessage = analyzedData.longestMessage.message
    const mostRepeatedWordsAndSenders = analyzedData.mostRepeatedWordsAndSenders
    const mostUsedEmojisAndSenders = analyzedData.mostUsedEmojisAndSenders
    const messageSending = analyzedData.allSendings.messageCounts
    const emojiSending = analyzedData.allSendings.emojiCounts
    const pictureSending = analyzedData.allSendings.pictureCounts
    const videoSending = analyzedData.allSendings.videoCounts
    const audioSending = analyzedData.allSendings.audioCounts
    const documentSending = analyzedData.allSendings.documentCounts
    const gifSending = analyzedData.allSendings.gifCounts
    const stickerSending = analyzedData.allSendings.stickerCounts
    const linkSending = analyzedData.allSendings.linkCounts
    const missedCallCounts = analyzedData.allSendings.missedCallCounts
    const messagingByTime = analyzedData.allSendings.timeCount
    const names = analyzedData.allSendings.nameCount

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

    return (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 30,}}>
            <Text style={styles.mainTitle}>Simple Message Analysis</Text>
            <AnalysisLabel title={'Toplam Mesaj'} value={sumCounts(messageSending)}/>
            <AnalysisLabel title={'En Çok Mesajlaşılan Tarih'} value={mostRepeatedDate}/>
            <DualBoxView title={'Mesajlaşılan Zamanlar'} data={messagingByTime} titleArr={['morning','night']} total={false}/>
            <DualBoxView title={'Mesaj Gönderimi'} data={messageSending} titleArr={names} total={false}/>
            <AnalysisLabel title={'Toplam Kelime'} value={totalword}/>
            <Text style={styles.labelTitleText}>En Çok Gönderilen Kelimeler</Text>
            <View style={{marginTop: 15}}>
                {mostRepeatedWordsAndSenders.map((x, index) => (
                    <View key={index} style={[styles.valueBoxContainer,{ marginVertical: 5}, {height: 80}]}>
                        <AnalysisValueBoxSmall customValue={`"${x.word}"`} titleArr={names}/>
                        <AnalysisValueBoxSmall data={x.count} i={0} titleArr={names}/>
                        <AnalysisValueBoxSmall data={x.count} i={1} titleArr={names}/>
                    </View>
                ))}
            </View>
            <DualBoxView totalTitle={'Toplam Emoji'} title={'Emoji Gönderimi'} data={emojiSending} titleArr={names} total={true}/>
            <Text style={styles.labelTitleText}>En Çok Gönderilen Emojiler</Text>
            <View style={{marginTop: 15}}>
                {mostUsedEmojisAndSenders.map((x, index) => (
                    <View key={index} style={[styles.valueBoxContainer,{ marginVertical: 5}, {height: 80}]}>
                        <AnalysisValueBoxSmall customValue={x.emoji} type={'emoji'} titleArr={names}/>
                        <AnalysisValueBoxSmall data={x.count} i={0} titleArr={names}/>
                        <AnalysisValueBoxSmall data={x.count} i={1} titleArr={names}/>
                    </View>
                ))}
            </View>
            <DualBoxView totalTitle={'Toplam Fotoğraf'} title={'Fotoğraf Gönderimi'} data={pictureSending} titleArr={names} total={true}/>
            <DualBoxView totalTitle={'Toplam Video'} title={'Video Gönderimi'} data={videoSending} titleArr={names} total={true}/>
            <DualBoxView totalTitle={'Toplam Ses Kaydı'} title={'Ses Kaydı Gönderimi'} data={audioSending} titleArr={names} total={true}/>
            <DualBoxView totalTitle={'Toplam Belge'} title={'Belge Gönderimi'} data={documentSending} titleArr={names} total={true}/>
            <DualBoxView totalTitle={'Toplam GIF'} title={'GIF Gönderimi'} data={gifSending} titleArr={names} total={true}/>
        </ScrollView>
    );
};

export default SimpleMessageAnalysis;

const styles = StyleSheet.create({

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
        backgroundColor: COLORS.darkPurple,
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
