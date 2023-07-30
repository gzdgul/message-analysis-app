import React from 'react';
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {COLORS} from "../config/constants";
import {findMaxCountKey, sumCounts} from "../components/utils";

const Analysis = ({navigation, route}) => {
    const analyzedData = route.params.analyzedData
    const totalMessage = sumCounts(analyzedData.allSendings.messageCounts)
    const totalEmoji = sumCounts(analyzedData.allSendings.emojiCounts)
    const mostRepeatedDate = analyzedData.mostRepeatedDate
    const mostPostedTime = findMaxCountKey(analyzedData.messagingByTime)
    const mostPostingMessagePerson = findMaxCountKey(analyzedData.allSendings.messageCounts)
    const mostPostingPicturePerson = findMaxCountKey(analyzedData.allSendings.pictureCounts)
    const mostPostingVideoPerson = findMaxCountKey(analyzedData.allSendings.videoCounts)
    const mostPostingAudioPerson = findMaxCountKey(analyzedData.allSendings.audioCounts)
    const mostPostingDocumentPerson = findMaxCountKey(analyzedData.allSendings.documentCounts)
    const mostPostingGIFPerson = findMaxCountKey(analyzedData.allSendings.gifCounts)
    const mostPostingStickerPerson = findMaxCountKey(analyzedData.allSendings.stickerCounts)
    const mostPostingLinkPerson = findMaxCountKey(analyzedData.allSendings.linkCounts)
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
    const ListObjects = ({obj}) => {
       const arr = Object.entries(obj).sort((a,b) => b[1] - a[1])
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

    return (
       <View style={styles.container}>
           <ScrollView contentContainerStyle={{alignItems: 'center'}}>
           <Text style={styles.textStyle}>Toplam Mesaj:</Text>
           <Text style={styles.textStyle}>{totalMessage}</Text>
           <Text style={styles.textStyle}>En Çok mesaj Gönderen:</Text>
           <Text style={styles.textStyle}>{mostPostingMessagePerson}</Text>
           <Text style={styles.textStyle}>Mesaj Gönderimi:</Text>
            <ListObjects obj={messageSending}/>
           <Text style={styles.textStyle}>En Uzun Mesaj Yazan:</Text>
           <Text style={styles.textStyle}>{longestMessageSender}</Text>
           <Text style={styles.textStyle}>En Uzun Mesaj:</Text>
           <Text style={styles.textStyle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate debitis deserunt dolores illum laborum, pariatur quos suscipit tenetur vero?</Text>
           <Text style={styles.textStyle}>En Çok Tekrar Eden Kelimeler:</Text>
           <View>
               {mostRepeatedWordsAndSenders.map((x, index) => (
                   <View key={index}>
                       <Text style={styles.textStyle} key={x.word}>
                           {index +1}. {x.word}
                       </Text>
                       {
                           <ListObjects obj={x.count}/>
                       }
                       <Text style={styles.textStyle} key={x.word + index}>***************************************</Text>
                   </View>
               ))}
           </View>
           <Text style={styles.textStyle}>En Çok Mesajlaşılan Tarih:</Text>
           <Text style={styles.textStyle}>{mostRepeatedDate}</Text>
           <Text style={styles.textStyle}>En Çok Mesajlaşılan Zaman:</Text>
           <Text style={styles.textStyle}>{mostPostedTime}</Text>
           <ListObjects obj={messagingByTime}/>
           <Text style={styles.textStyle}>Toplam Gönderilen Emoji:</Text>
           <Text style={styles.textStyle}>{totalEmoji}</Text>
           <Text style={styles.textStyle}>Emoji Gönderimi:</Text>
           <ListObjects obj={emojiSending}/>
               <Text style={styles.textStyle}>En Çok kullanılan Emojiler:</Text>
               {mostUsedEmojisAndSenders.map((x, index) => (
                   <View key={index}>
                       <Text style={styles.textStyle} key={x.emoji}>
                           {index +1}. {x.emoji}
                       </Text>
                       {
                           <ListObjects obj={x.count}/>
                       }
                       <Text style={styles.textStyle} key={x.emoji + index}>***************************************</Text>
                   </View>
               ))}
           <Text style={styles.textStyle}>En Çok Fotoğraf Gönderen:</Text>
           <Text style={styles.textStyle}>{mostPostingPicturePerson}</Text>
           <Text style={styles.textStyle}>Fotograf Gönderimi:</Text>
           <ListObjects obj={pictureSending}/>
           <Text style={styles.textStyle}>******************************</Text>
           <Text style={styles.textStyle}>En Çok Video Gönderen:</Text>
           <Text style={styles.textStyle}>{mostPostingVideoPerson}</Text>
           <Text style={styles.textStyle}>Video Gönderimi:</Text>
           <ListObjects obj={videoSending}/>
               <Text style={styles.textStyle}>******************************</Text>
               <Text style={styles.textStyle}>En Çok Ses Gönderen:</Text>
               <Text style={styles.textStyle}>{mostPostingAudioPerson}</Text>
           <Text style={styles.textStyle}>Ses Gönderimi:</Text>
           <ListObjects obj={audioSending}/>
               <Text style={styles.textStyle}>******************************</Text>
               <Text style={styles.textStyle}>En Çok Belge Gönderen:</Text>
               <Text style={styles.textStyle}>{mostPostingDocumentPerson}</Text>
           <Text style={styles.textStyle}>Belge Gönderimi:</Text>
           <ListObjects obj={documentSending}/>
               <Text style={styles.textStyle}>******************************</Text>
               <Text style={styles.textStyle}>En Çok GIF Gönderen:</Text>
               <Text style={styles.textStyle}>{mostPostingGIFPerson}</Text>
           <Text style={styles.textStyle}>GIF Gönderimi:</Text>
           <ListObjects obj={gifSending}/>
               <Text style={styles.textStyle}>******************************</Text>
               <Text style={styles.textStyle}>En Çok Sticker Gönderen:</Text>
               <Text style={styles.textStyle}>{mostPostingStickerPerson}</Text>
           <Text style={styles.textStyle}>Sticker Gönderimi:</Text>
           <ListObjects obj={stickerSending}/>
               <Text style={styles.textStyle}>******************************</Text>
               <Text style={styles.textStyle}>En Çok Link Gönderen:</Text>
               <Text style={styles.textStyle}>{mostPostingLinkPerson}</Text>
           <Text style={styles.textStyle}>Link Gönderimi:</Text>
           <ListObjects obj={linkSending}/>
               <Text style={styles.textStyle}>******************************</Text>
           <Text style={styles.textStyle}>Cevapsızlar:</Text>
           <ListObjects obj={missedCallCounts}/>

           </ScrollView>
       </View>

    );
};

export default Analysis;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.darkBG,
        paddingTop: 60,
    },
    textStyle: {
        color: COLORS.white,
        fontSize: 17
    }
});
