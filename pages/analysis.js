import React from 'react';
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {COLORS} from "../config/constants";
import {findMaxCountKey, sumCounts} from "../components/utils";

const Analysis = ({navigation, route}) => {
    const analyzedData = route.params.analyzedData
    const totalMessage = sumCounts(analyzedData.allSendings.messageCounts)
    const totalword = analyzedData.allSendings.totalWord
    const totalPicture = sumCounts(analyzedData.allSendings.pictureCounts)
    const mostRepeatedDate = analyzedData.mostRepeatedDate
    // const mostPostedTime = findMaxCountKey(analyzedData.messagingByTime)
    // const mostPostingMessagePerson = findMaxCountKey(analyzedData.allSendings.messageCounts)
    // const mostPostingPicturePerson = findMaxCountKey(analyzedData.allSendings.pictureCounts)
    // const mostPostingVideoPerson = findMaxCountKey(analyzedData.allSendings.videoCounts)
    // const mostPostingAudioPerson = findMaxCountKey(analyzedData.allSendings.audioCounts)
    // const mostPostingDocumentPerson = findMaxCountKey(analyzedData.allSendings.documentCounts)
    // const mostPostingGIFPerson = findMaxCountKey(analyzedData.allSendings.gifCounts)
    // const mostPostingStickerPerson = findMaxCountKey(analyzedData.allSendings.stickerCounts)
    // const mostPostingLinkPerson = findMaxCountKey(analyzedData.allSendings.linkCounts)
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
    const messagingByTime = analyzedData.messagingByTime
    const names = analyzedData.allSendings.nameCount
    const ListObjects = ({obj}) => {
       const arr = Object.entries(obj)
        return (
            <View>
                {arr.map(([key, value]) => (
                    <Text style={styles.textStyle} key={key}>
                        {key}: {value}
                    </Text>
                ))}
            </View>
        )
    }

    const AnalysisLabel = ({title, value}) => (
        <View style={{marginVertical: 5}}>
            <Text style={styles.labelTitleText}>{title}</Text>
            <Text style={styles.labelValueText}>{value}</Text>
        </View>
    )

    const AnalysisValueBox = ({data, i, titleArr}) => (
        <View style={[styles.box,colorCorrector(data,i,titleArr)]}>
            <Text style={[styles.boxTitleText, colorCorrector(data,i, titleArr)]}>{ titleArr ? titleArr[i] : names[i]}</Text>
            <Text style={[styles.boxValueText, colorCorrector(data,i, titleArr)]}>{titleArr ? data[titleArr[i]]: data[names[i]] ? data[names[i]] : 0}</Text>
        </View>
    )
    const AnalysisValueBoxSmall = ({data, i, titleArr, customValue, type}) => (
        <View style={[styles.box,colorCorrector(data,i,titleArr), customValue && {justifyContent: 'center', backgroundColor: 'transparent'}]}>
            {
                customValue
                    ? <Text style={[styles.boxValueText, type === 'emoji' ? {fontSize: 40} : {fontSize: 20} ,{alignSelf: 'center'}]}>{customValue && customValue}</Text>
                    : <>
                        <Text style={[styles.boxTitleText,  {fontSize: 13 }, colorCorrector(data,i, titleArr)]}>{ titleArr ? titleArr[i] : names[i]}</Text>
                        <Text style={[styles.boxValueText, {fontSize: 25 }, colorCorrector(data,i, titleArr)]}>{titleArr ? data[titleArr[i]]: data[names[i]]}</Text>
                    </>
            }


        </View>
    )
    const AnalysisValueBoxContainer = ({data, titleArr}) => (
        <View style={styles.valueBoxContainer}>
            <AnalysisValueBox data={data} i={0} titleArr={titleArr}/>
            <AnalysisValueBox data={data} i={1} titleArr={titleArr}/>
        </View>
    )

    const colorCorrector = (data, i, titleArr) => {
        const title = titleArr ? titleArr : names
        if (findMaxCountKey(data) === title[i]) {
            return {
                backgroundColor: COLORS.lightGreen,
                color: COLORS.darkPurple,
            }
        } else return null;
    }

    return (
       <View style={styles.container}>
           <ScrollView contentContainerStyle={{ paddingHorizontal: 30,}}>
               <Text style={styles.mainTitle}>Simple Message Analysis</Text>
            <AnalysisLabel title={'Toplam Mesaj'} value={sumCounts(messageSending)}/>
            <AnalysisLabel title={'En Çok Mesajlaşılan Tarih'} value={mostRepeatedDate}/>

               <Text style={styles.labelTitleText}>Mesajlaşılan Zamanlar</Text>
               <AnalysisValueBoxContainer data={messagingByTime} titleArr={['morning','night']}/>
               <Text style={styles.labelTitleText}>Mesaj Gönderimi</Text>
                <AnalysisValueBoxContainer data={messageSending}/>
               <AnalysisLabel title={'Toplam Kelime'} value={totalword}/>
               <Text style={styles.labelTitleText}>En Çok Gönderilen Kelimeler</Text>
               <View style={{marginTop: 15}}>
                   {mostRepeatedWordsAndSenders.map((x, index) => (
                       <View key={index} style={[styles.valueBoxContainer,{ marginVertical: 5}, {height: 80}]}>
                           <AnalysisValueBoxSmall customValue={`"${x.word}"`}/>
                           <AnalysisValueBoxSmall data={x.count} i={0}/>
                           <AnalysisValueBoxSmall data={x.count} i={1}/>

                       </View>
                   ))}

               </View>
               <AnalysisLabel title={'Toplam Emoji'} value={sumCounts(emojiSending)}/>
               <Text style={styles.labelTitleText}>Emoji Gönderimi</Text>
               <AnalysisValueBoxContainer data={emojiSending}/>
               <Text style={styles.labelTitleText}>En Çok Gönderilen Emojiler</Text>
               <View style={{marginTop: 15}}>
                   {mostUsedEmojisAndSenders.map((x, index) => (
                       <View key={index} style={[styles.valueBoxContainer,{ marginVertical: 5}, {height: 80}]}>
                           <AnalysisValueBoxSmall customValue={x.emoji} type={'emoji'}/>
                           <AnalysisValueBoxSmall data={x.count} i={0}/>
                           <AnalysisValueBoxSmall data={x.count} i={1}/>

                       </View>
                   ))}

               </View>

               <AnalysisLabel title={'Toplam Fotoğraf'} value={sumCounts(pictureSending)}/>
                <AnalysisValueBoxContainer data={pictureSending}/>
               <AnalysisLabel title={'Toplam Video'} value={sumCounts(videoSending)}/>
                <AnalysisValueBoxContainer data={videoSending}/>
               <AnalysisLabel title={'Toplam Ses Kaydı'} value={sumCounts(audioSending)}/>
                <AnalysisValueBoxContainer data={audioSending}/>
               <AnalysisLabel title={'Toplam Belge'} value={sumCounts(documentSending)}/>
                <AnalysisValueBoxContainer data={documentSending}/>
               <AnalysisLabel title={'Toplam GIF'} value={sumCounts(gifSending)}/>
                <AnalysisValueBoxContainer data={gifSending}/>
           {/*<Text style={styles.textStyle}>En Çok mesaj Gönderen:</Text>*/}
           {/*<Text style={styles.textStyle}>Mesaj Gönderimi:</Text>*/}
           {/*<Text style={styles.textStyle}>{names[0]} : {messageSending[names[0]]}</Text>*/}
           {/*<Text style={styles.textStyle}>{names[1]} : {messageSending[names[1]]}</Text>*/}
           {/*<Text style={styles.textStyle}>En Uzun Mesaj Yazan:</Text>*/}
           {/*<Text style={styles.textStyle}>{longestMessageSender}</Text>*/}
           {/*<Text style={styles.textStyle}>En Uzun Mesaj:</Text>*/}
           {/*<Text style={styles.textStyle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate debitis deserunt dolores illum laborum, pariatur quos suscipit tenetur vero?</Text>*/}
           {/*<Text style={styles.textStyle}>En Çok Tekrar Eden Kelimeler:</Text>*/}
           {/*<View>*/}
           {/*    {mostRepeatedWordsAndSenders.map((x, index) => (*/}
           {/*        <View key={index}>*/}
           {/*            <Text style={styles.textStyle} key={x.word}>*/}
           {/*                {index +1}. {x.word}*/}
           {/*            </Text>*/}
           {/*            {*/}
           {/*                <ListObjects obj={x.count}/>*/}
           {/*            }*/}
           {/*            <Text style={styles.textStyle} key={x.word + index}>***************************************</Text>*/}
           {/*        </View>*/}
           {/*    ))}*/}
           {/*</View>*/}
           {/*<Text style={styles.textStyle}>En Çok Mesajlaşılan Tarih:</Text>*/}
           {/*<Text style={styles.textStyle}>{mostRepeatedDate}</Text>*/}
           {/*<Text style={styles.textStyle}>En Çok Mesajlaşılan Zaman:</Text>*/}
           {/*/!*<Text style={styles.textStyle}>{mostPostedTime}</Text>*!/*/}
           {/*<ListObjects obj={messagingByTime}/>*/}
           {/*<Text style={styles.textStyle}>Toplam Gönderilen Emoji:</Text>*/}
           {/*<Text style={styles.textStyle}>{totalEmoji}</Text>*/}
           {/*<Text style={styles.textStyle}>Emoji Gönderimi:</Text>*/}
           {/*<ListObjects obj={emojiSending}/>*/}
           {/*    <Text style={styles.textStyle}>En Çok kullanılan Emojiler:</Text>*/}
           {/*    {mostUsedEmojisAndSenders.map((x, index) => (*/}
           {/*        <View key={index}>*/}
           {/*            <Text style={styles.textStyle} key={x.emoji}>*/}
           {/*                {index +1}. {x.emoji}*/}
           {/*            </Text>*/}
           {/*            {*/}
           {/*                <ListObjects obj={x.count}/>*/}
           {/*            }*/}
           {/*            <Text style={styles.textStyle} key={x.emoji + index}>***************************************</Text>*/}
           {/*        </View>*/}
           {/*    ))}*/}
           {/*<Text style={styles.textStyle}>En Çok Fotoğraf Gönderen:</Text>*/}
           {/*/!*<Text style={styles.textStyle}>{mostPostingPicturePerson}</Text>*!/*/}
           {/*<Text style={styles.textStyle}>Fotograf Gönderimi:</Text>*/}
           {/*<ListObjects obj={pictureSending}/>*/}
           {/*<Text style={styles.textStyle}>******************************</Text>*/}
           {/*<Text style={styles.textStyle}>En Çok Video Gönderen:</Text>*/}
           {/*/!*<Text style={styles.textStyle}>{mostPostingVideoPerson}</Text>*!/*/}
           {/*<Text style={styles.textStyle}>Video Gönderimi:</Text>*/}
           {/*<ListObjects obj={videoSending}/>*/}
           {/*    <Text style={styles.textStyle}>******************************</Text>*/}
           {/*    <Text style={styles.textStyle}>En Çok Ses Gönderen:</Text>*/}
           {/*    /!*<Text style={styles.textStyle}>{mostPostingAudioPerson}</Text>*!/*/}
           {/*<Text style={styles.textStyle}>Ses Gönderimi:</Text>*/}
           {/*<ListObjects obj={audioSending}/>*/}
           {/*    <Text style={styles.textStyle}>******************************</Text>*/}
           {/*    <Text style={styles.textStyle}>En Çok Belge Gönderen:</Text>*/}
           {/*    /!*<Text style={styles.textStyle}>{mostPostingDocumentPerson}</Text>*!/*/}
           {/*<Text style={styles.textStyle}>Belge Gönderimi:</Text>*/}
           {/*<ListObjects obj={documentSending}/>*/}
           {/*    <Text style={styles.textStyle}>******************************</Text>*/}
           {/*    <Text style={styles.textStyle}>En Çok GIF Gönderen:</Text>*/}
           {/*    /!*<Text style={styles.textStyle}>{mostPostingGIFPerson}</Text>*!/*/}
           {/*<Text style={styles.textStyle}>GIF Gönderimi:</Text>*/}
           {/*<ListObjects obj={gifSending}/>*/}
           {/*    <Text style={styles.textStyle}>******************************</Text>*/}
           {/*    <Text style={styles.textStyle}>En Çok Sticker Gönderen:</Text>*/}
           {/*    /!*<Text style={styles.textStyle}>{mostPostingStickerPerson}</Text>*!/*/}
           {/*<Text style={styles.textStyle}>Sticker Gönderimi:</Text>*/}
           {/*<ListObjects obj={stickerSending}/>*/}
           {/*    <Text style={styles.textStyle}>******************************</Text>*/}
           {/*    <Text style={styles.textStyle}>En Çok Link Gönderen:</Text>*/}
           {/*    /!*<Text style={styles.textStyle}>{mostPostingLinkPerson}</Text>*!/*/}
           {/*<Text style={styles.textStyle}>Link Gönderimi:</Text>*/}
           {/*<ListObjects obj={linkSending}/>*/}
           {/*    <Text style={styles.textStyle}>******************************</Text>*/}
           {/*<Text style={styles.textStyle}>Cevapsızlar:</Text>*/}
           {/*<ListObjects obj={missedCallCounts}/>*/}
           </ScrollView>
       </View>

    );
};

export default Analysis;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: COLORS.darkBG,
        paddingTop: 60,

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
