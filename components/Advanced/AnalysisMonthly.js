import React from 'react';
import {View as MotiView} from "moti/build/components/view";
import {StyleSheet, Text, View} from "react-native";
import {COLORS} from "../../config/constants";
import {colorCorrector2} from "../../libraries/Helper_Function_Library";

const AnalysisMonthly = ({monthly, names}) => {
    const LineGraphic = ({title, data, description}) => {
        return (
            <View style={{ gap: 5}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
                    <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                        <Text style={styles.advancedBoxTitleText}>{title}</Text>
                        <Text style={[styles.advancedBoxTitleText, {fontSize: 12, opacity: 0.5}]}>{description}</Text>
                    </View>
                    <Text style={styles.advancedBoxValueText}>{data[names[0]] + data[names[1]]}</Text>
                </View>

                <View style={{width: '100%', height: 10, backgroundColor: COLORS.color2, borderRadius: 100}}></View>
                <View style={{flexDirection: 'row', gap: 5}}>
                    <View style={[{flex: data[names[0]], height: 10, backgroundColor: COLORS.darkPurple,  borderRadius: 100}, colorCorrector2(data,0, names)]}></View>
                    <View style={[{flex: data[names[1]], height: 10, backgroundColor: COLORS.darkPurple, borderRadius: 100}, colorCorrector2(data,1, names)]}></View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.advancedBoxTitleText}>{names[0]}</Text>
                    <Text style={styles.advancedBoxTitleText}>{names[1]}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.advancedBoxTitleText, {color: COLORS.color2}]}>{data[names[0]]}</Text>
                    <Text style={[styles.advancedBoxTitleText, {color: COLORS.color2}]}>{data[names[1]]}</Text>
                </View>
            </View>
        )
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
            <View style={{paddingHorizontal: 20, gap: 10}}>
                <Text style={{color: 'white', fontSize: 12, textAlign: 'center', opacity: 0.5}}>For more detailed data, please select a day from the chart.</Text>
                <Text style={{color: 'white', fontSize: 25}}>{monthly.dateString}</Text>
                <LineGraphic title={'Total Messages'} data={monthly.messageCount}/>
                <LineGraphic title={'Total Emoji'} data={monthly.emojiCount}/>
                <LineGraphic title={'Total Media'}  data={monthly.mediaCount} description={'photo, video, audio'}/>
                <LineGraphic title={'Total Others'} data={monthly.othersCount} description={'document, GIF, link, sticker etc.'}/>
            </View>

        </MotiView>
    );
};

export default AnalysisMonthly;

const styles = StyleSheet.create({

    advancedBoxTitleText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '500',
    },
    advancedBoxValueText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: '600'
    },

});
