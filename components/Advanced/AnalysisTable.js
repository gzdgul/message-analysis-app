import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, Vibration, View} from "react-native";
import {AdvancedTableRow, COLORS, translations} from "../../config/constants";
import {View as MotiView} from "moti/build/components/view";
import {AnalysisBoxRow} from "../../libraries/UI_Component_Library";
import {countArray} from "../../libraries/Helper_Function_Library";
import {AnimatePresence} from "moti";
import * as Haptics from "expo-haptics";

const AnalysisTable = ({dataset, names, setPressAllowed, pressAllowed, language}) => {
    const emojiObj = countArray('emoji',null, dataset,names)
    const user1Emojis = [].concat([],...emojiObj[names[0]]).slice(0,50)
    const user2Emojis = [].concat([],...emojiObj[names[1]]).slice(0,50)
    // console.log(user1Emojis)
    const [emojiData,setEmojiData] = useState(user1Emojis)
    const [showEmoji,setShowEmoji] = useState(false)

    const { width, height } = Dimensions.get('window');
    const areaWidth = width - 50
    const areaHeight = height - 400
    useEffect(() => {

    },[])
    const handlePress = async (emojiData) => {

        if (!pressAllowed || emojiData?.length < 1) {
            return; // Fonksiyon hemen sonlanır ve tekrar çalışmaz
        }

        setPressAllowed(false); // Basılmasını engelle
        setEmojiData(emojiData)
        setShowEmoji(true);
        await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )

        setTimeout(() => {
            setShowEmoji(false);

        }, 3000);
        setTimeout(() => {
            setPressAllowed(true); // Belirli bir süre sonra basılmaya izin ver
        }, 5500);
    }
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
            <View style={{paddingHorizontal: 5}}>
                <View style={{flexDirection: 'row', height: 43, gap: 5, marginBottom: 3}}>
                    <View style={[styles.advancedBox,{borderWidth: 1, borderColor: COLORS.darkBG,backgroundColor: 'transparent'}]}>
                        <Text style={[styles.advancedBoxTitleText, {fontSize: 13}]}>{dataset.date}</Text>
                    </View>
                    <TouchableOpacity style={[styles.advancedBox,{borderWidth: 1, borderColor: COLORS.lightPurple, backgroundColor: 'transparent'}]} onPress={() => handlePress(user1Emojis)}>
                        <Text style={[styles.advancedBoxTitleText]}>{names[0]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.advancedBox,{borderWidth: 1, borderColor: COLORS.lightPurple, backgroundColor: 'transparent'}]} onPress={() => handlePress(user2Emojis)}>
                        <Text style={[styles.advancedBoxTitleText]}>{names[1]}</Text>
                    </TouchableOpacity>
                    <View style={[styles.advancedBox,{borderWidth: 1, borderColor: COLORS.lightPurple, backgroundColor: 'transparent'}]}>
                        <Text style={[styles.advancedBoxTitleText]}>{translations[language]["total"]}</Text>
                    </View>
                </View>
                {/*<AnalysisBoxRow id={0} title={'Emoji*'} names={names} type={'emoji'} data={countArray('emoji',null, dataset,names)}/>*/}


                {/*<Text>dgdsgfdgdfgsdfgsdf</Text>*/}
                {/*<Text>{emojiObj[names[1]]}</Text>*/}
                {
                    AdvancedTableRow(language).map((x,index) => {
                        return  <AnalysisBoxRow key={index + dataset.date} id={index} title={x.title} names={names} data={countArray(x.key,x.patch, dataset,names)}/>
                    })
                }
                <AnimatePresence>
                    {
                    showEmoji &&
                        emojiData.map((x, index) => {
                        const randomNum1 = Math.floor(Math.random() * areaWidth) + 1;
                        const randomNum2 = Math.floor(Math.random() * areaHeight) + 1;
                        const randomNum3 = Math.floor(Math.random() * 25) + 15;
                        const randomValue = Math.random() * 0.9 + 0.2;
                        const randomNum4 = parseFloat(randomValue.toFixed(1));
                        // console.log(randomNum1, randomNum2, randomNum3, randomNum4)
                        return (
                            <MotiView
                                key={index}
                                transition={{
                                    delay: index*(2000/emojiData.length),
                                    damping: 15,
                                    mass: 1,
                                    duration: 300,
                                }}
                                from={{
                                    opacity: 0,
                                    left: randomNum1,
                                    bottom: 0
                                }}
                                animate={{
                                    opacity: randomNum4,
                                    left: randomNum1,
                                    bottom:randomNum2,
                                }}
                                exit={{
                                    opacity: 0,
                                    bottom:randomNum2 - 10,
                                }}
                                exitTransition={{
                                    type: 'timing',
                                    duration: 300,
                                }}
                                style={{position: 'absolute'}}
                            >
                                <Text style={{fontSize: randomNum3}}>{x}</Text>
                            </MotiView>
                        )
                    })
                }
                </AnimatePresence>
            </View>
        </MotiView>
    );
};

export default AnalysisTable;

const styles = StyleSheet.create({

    advancedBoxTitleText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '500',
    },

    advancedBox: {
        flex: 1,
        height: '100%',
        backgroundColor: COLORS.stone,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
