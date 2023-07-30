import React from 'react';
import {Alert, Button, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {View as MotiView} from "moti/build/components/view";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../config/constants";
import {findAnalysis, findMaxCountKey, pickDocument, readFileContent, sumCounts} from "./utils";
import MaskedView from "@react-native-masked-view/masked-view";

const AnalysisBox = ({navigation,position,title, description, color, colors}) => {
    const [fileUri, setFileUri] = React.useState('')
    const [isAnalysisStarted, setIsAnalysisStarted] = React.useState(false)
    const [circleText, setCircleText] = React.useState('START')

    const handlePickDocument = async () => {
        const fileUri =  await pickDocument()
        if (fileUri !== undefined) {
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',fileUri)
            setFileUri(fileUri)
        }
    }

    React.useEffect(() => {
        if (isAnalysisStarted) {
            setTimeout(() => {
                setCircleText('Analyzing...')
            },500)
        } else {
            setTimeout(() => {
                setCircleText('START')
            },500)
        }
    },[isAnalysisStarted])
    const handleCirclePress = async () => {
        if (fileUri) {
            setIsAnalysisStarted(true)

                const fileContent = await readFileContent(fileUri)
                const {
                    longestMessage,
                    messagingByTime,
                    mostRepeatedDate,
                    mostRepeatedWordsAndSenders,
                    mostUsedEmojisAndSenders,
                    allSendings,

                } = await findAnalysis(fileContent);
                setIsAnalysisStarted(false)
                navigation.navigate('Analysis', {analyzedData: {
                        longestMessage,
                        messagingByTime,
                        mostRepeatedDate,
                        mostRepeatedWordsAndSenders,
                        mostUsedEmojisAndSenders,
                        allSendings
                    }});
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
        }else Alert.alert('Geçerli bir dosya giriniz')
    }
    const GradientText = props => {
        return (
            <MaskedView maskElement={<Text {...props} />}>
                <LinearGradient
                    colors={props.colors}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text {...props} style={[props.style, {opacity: 0}]} />
                </LinearGradient>
            </MaskedView>
        );
    };
    return (
        <View style={[styles.box,
            position === 'left'
                ? {borderTopRightRadius: 100, borderBottomRightRadius: 100}
                : {borderTopLeftRadius: 100, borderBottomLeftRadius: 100}
        ]}>
            {
                position === 'left' &&
                <View style={styles.desArea}>
                    <GradientText style={[styles.titleText]} colors={colors}>{title}</GradientText>
                    <Text style={styles.desText}>{description}</Text>
                    <TouchableOpacity style={[styles.button, {backgroundColor: color}]} onPress={handlePickDocument}>
                        <LinearGradient
                            style={{ width: '100%', height: '100%', borderRadius: 10, position: 'absolute'}}
                            colors={[colors[0], colors[1]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            pointerEvents="none"
                        />
                        <Text style={styles.buttonText}>Select Document</Text>
                    </TouchableOpacity>
                    {/*<Button title="STOP" onPress={() =>  setIsAnalysisStarted(false)}/>*/}
                </View>
            }
            <MotiView
                transition={{ delay: 0, damping: 15, mass: 1,type: 'timing', duration: 500 }}
                animate={{
                    scale: isAnalysisStarted ? 1 : 0.9,
                }}
                style={styles.circle}>
                <MotiView
                    transition={{ delay: 0, damping: 15, mass: 1,type: 'timing', duration: 800 ,loop: isAnalysisStarted}}
                    animate={{
                        scale: isAnalysisStarted ? 1 : 0.9,
                        transform: [{ rotate: isAnalysisStarted ? '360deg' : '0deg' }]
                    }}
                    style={[styles.circle, {width: '100%'}, {position: 'absolute'}]}>
                    <LinearGradient
                        style={{ width: '100%', height: '100%', borderRadius: 100}}
                        colors={[colors[1], colors[0]]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        pointerEvents="none"
                    />
                </MotiView>

                <Pressable onPress={handleCirclePress}>
                    <MotiView
                        transition={{ delay: 0, damping: 15, mass: 1,type: 'timing', duration: 800 ,loop: isAnalysisStarted}}
                        animate={{
                            scale: isAnalysisStarted ? 0.9 : 1,
                        }}
                        style={[styles.innerCircle]}>
                        <GradientText style={[styles.circleText]} colors={colors}>{circleText}</GradientText>
                    </MotiView>
                </Pressable>
            </MotiView>
            {
                position === 'right' &&
                <View style={styles.desArea}>
                    <GradientText style={[styles.titleText, {textAlign: 'right'}]} colors={colors}>{title}</GradientText>
                    <Text style={[styles.desText, {textAlign: 'right'}]}>{description}</Text>
                    <TouchableOpacity style={[styles.button, {backgroundColor: color}]} onPress={handlePickDocument}>
                        <LinearGradient
                            style={{ width: '100%', height: '100%', borderRadius: 10, position: 'absolute'}}
                            colors={[colors[0], colors[1]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            pointerEvents="none"
                        />

                        <Text style={styles.buttonText}>Select Document</Text>
                    </TouchableOpacity>
                    {/*<Button title="STOP" onPress={() =>  setIsAnalysisStarted(false)}/>*/}
                </View>
            }
        </View>
    );
};

export default AnalysisBox;

const styles = StyleSheet.create({
    box: {
        width: '95%',
        height: 180,
        backgroundColor: COLORS.darkPurple,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 30,

    },
    circle: {
        width: '45%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 100,
        // overflow: 'hidden',
        // backgroundColor: 'red'
    },
    innerCircle: {
        width: '85%',
        aspectRatio: 1,
        backgroundColor:  COLORS.darkPurple,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText: {
        color: 'black',
        fontSize: 16,
    },

    desArea: {
        width: '55%',
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 18,

    },
    titleText: {
        fontSize: 16,
        fontWeight: '600',

    },
    desText: {
        fontSize: 13,
        color: COLORS.white

    },
    button: {
        height: 35,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        // color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },

});
