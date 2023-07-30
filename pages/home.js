import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import {findAnalysis, findMaxCountKey, pickDocument, sumCounts} from "../components/utils";
import {COLORS} from "../config/constants";

const Home = () => {

    const [data, setData] = React.useState([])
    const [deneme, setDeneme] = React.useState('')

    const handlePress = async () => {
        const fileContent =  await pickDocument()
        setData(fileContent)
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',fileContent)
        const {
            longestMessage,
            messagingByTime,
            mostRepeatedDate,
            mostRepeatedWordsAndSenders,
            mostUsedEmojisAndSenders,
            allSendings,

        } = findAnalysis(fileContent);
        setDeneme(mostUsedEmojisAndSenders[0]?.emoji)
        console.log('Toplam Mesaj:', sumCounts(allSendings.messageCounts));
        console.log('Mesaj Gönderimi:', allSendings.messageCounts);
        console.log('En Çok Mesaj Yazan:',  findMaxCountKey(allSendings.messageCounts));
        console.log('En Uzun Mesaj:', longestMessage.message);
        console.log('En Uzun Mesaj Yazan:', longestMessage.name);
        console.log('mostRepeatedWordsAndSenders:', mostRepeatedWordsAndSenders);
        console.log('***********************************************************************:');
        console.log('En Çok Mesajlaşılan Tarih:', mostRepeatedDate);
        console.log('Mesajlaşılan Zamanlar:', messagingByTime);
        console.log('En Çok Mesajlaşılan Zaman:', findMaxCountKey(messagingByTime),' - ', messagingByTime[findMaxCountKey(messagingByTime)] );
        console.log('***********************************************************************:');
        console.log('Toplam Emoji:', sumCounts(allSendings.emojiCounts));
        console.log('Emoji Gönderimi:', allSendings.emojiCounts);
        console.log('mostUsedEmojisAndSenders:', mostUsedEmojisAndSenders);
        console.log('En Çok kullanılan Emoji:', mostUsedEmojisAndSenders[0].emoji);
        console.log('En Çok kullanılan Emojiyi Atan:', findMaxCountKey(mostUsedEmojisAndSenders[0].count));
        console.log('***********************************************************************:');
        console.log('Fotograf Gönderimi:', allSendings.pictureCounts);
        console.log('Video Gönderimi:', allSendings.videoCounts);
        console.log('Ses Gönderimi:', allSendings.audioCounts);
        console.log('Belge Gönderimi:', allSendings.documentCounts);
        console.log('GIF Gönderimi:', allSendings.gifCounts);
        console.log('Sticker Gönderimi:', allSendings.stickerCounts);
        console.log('Link Gönderimi:', allSendings.linkCounts);
        console.log('Cevapsız Aramalar:', allSendings.missedCallCounts);
        console.log('En çok fotoğraf gönderen:', findMaxCountKey(allSendings.pictureCounts));




    }

    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <View style={styles.innerCircle}></View>
            </View>
            {/*<Text>{deneme}</Text>*/}
            {/*<Text>Dosya Seç: </Text>*/}
            {/*<Button title="Dosya Seç" onPress={handlePress}/>*/}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.darkPurple,
        paddingTop: 60,
    },
    circle: {
        width: 200,
        height: 200,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    innerCircle: {
        width: 165,
        height: 165,
        backgroundColor:  COLORS.darkPurple,
        borderRadius: 100,
    }
});
