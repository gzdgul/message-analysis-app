import React, {useEffect} from 'react';
import {Button, Pressable, StyleSheet, Text, View} from "react-native";
import {findAnalysis, findMaxCountKey, pickDocument, sumCounts} from "../components/utils";
import {COLORS} from "../config/constants";
import {LinearGradient} from "expo-linear-gradient";
import { View as MotiView } from "moti/build/components/view";
import AnalysisBox from "../components/AnalysisBox";



const Home = () => {

    const [data, setData] = React.useState([])

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
        // setDeneme(mostUsedEmojisAndSenders[0]?.emoji)
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
            <View style={{ gap: 15}}>
                <AnalysisBox position={'left'}/>
                <AnalysisBox position={'right'}/>
                <AnalysisBox position={'left'}/>
            </View>
            <View style={{marginTop: 20, width: '100%'}}>
                <View style={styles.steps}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.buttonText}>Step 1:</Text>
                        <Text style={styles.buttonText}>Dosya Seç</Text>
                    </View>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Dosya Seç</Text>
                    </View>
                </View>

            </View>

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
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        // overflow: 'hidden',
    },
    innerCircle: {
        width: 135,
        height: 135,
        backgroundColor:  COLORS.white,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText: {
        color: 'black',
        fontSize: 14,
    },
    button: {
        backgroundColor: COLORS.pink,
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
    steps: {
        width: '100%',
        // backgroundColor: 'red',
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    box: {
        width: '90%',
        height: 180,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 30,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
    }
});
