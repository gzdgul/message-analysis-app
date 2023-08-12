import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {COLORS} from "../../config/constants";
import {View as MotiView} from "moti/build/components/view";
import {AnalysisBoxRow} from "../../libraries/UI_Component_Library";
import {countArray} from "../../libraries/Helper_Function_Library";

const AnalysisTable = ({dataset, names}) => {
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
                <View style={[styles.advancedBox,{backgroundColor: 'transparent'}]}>
                    <Text style={[styles.advancedBoxTitleText, {fontSize: 14}]}>{dataset.date}</Text>
                </View>
                <View style={[styles.advancedBox,{borderWidth: 1, borderColor: COLORS.color2, backgroundColor: 'transparent'}]}>
                    <Text style={[styles.advancedBoxTitleText]}>{names[0]}</Text>
                </View>
                <View style={[styles.advancedBox,{borderWidth: 1, borderColor: COLORS.color2, backgroundColor: 'transparent'}]}>
                    <Text style={[styles.advancedBoxTitleText]}>{names[1]}</Text>
                </View>
                <View style={[styles.advancedBox,{borderWidth: 1, borderColor: COLORS.color2, backgroundColor: 'transparent'}]}>
                    <Text style={[styles.advancedBoxTitleText]}>Total</Text>
                </View>
            </View>
            {
                [
                    {title: 'Message', key: 'message', patch: null},
                    {title: 'Emoji', key: 'emoji', patch: null},
                    {title: 'Photo', key: 'media', patch: 'picture'},
                    {title: 'Video', key: 'media', patch: 'video'},
                    {title: 'Audio', key: 'media', patch: 'audio'},
                    {title: 'Document', key: 'others', patch: 'document'},
                    {title: 'GIF', key: 'others', patch: 'gif'},
                    {title: 'Sticker', key: 'others', patch: 'sticker'},
                    {title: 'Link', key: 'others', patch: 'link'},
                ].map((x,index) => {
                    return  <AnalysisBoxRow key={index} id={index} title={x.title} names={names} data={countArray(x.key,x.patch, dataset,names)}/>
                })
            }
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
        backgroundColor: COLORS.darkPurple,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
