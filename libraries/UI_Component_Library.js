import {StyleSheet, Text, View} from "react-native";
import {colorCorrector, colorCorrector2, sumCounts} from "./Helper_Function_Library";
import {COLORS} from "../config/constants";
import React from "react";
import {View as MotiView} from "moti/build/components/view";
export const AnalysisLabel = ({title, value}) => (
    <View style={{marginVertical: 5}}>
        <Text style={styles.labelTitleText}>{title}</Text>
        <Text style={styles.labelValueText}>{value}</Text>
    </View>
)
export const AnalysisValueBoxContainer = ({data, titleArr}) => (
    <View style={styles.valueBoxContainer}>
        <AnalysisValueBox data={data} i={0} titleArr={titleArr}/>
        <AnalysisValueBox data={data} i={1} titleArr={titleArr}/>
    </View>
)

export const AnalysisValueBox = ({data, i, titleArr}) => (
    <View style={[styles.box,colorCorrector(data,i,titleArr)]}>
        <Text  numberOfLines={1} style={[styles.boxTitleText, colorCorrector(data,i, titleArr)]}>{titleArr[i]}</Text>
        <Text style={[styles.boxValueText, colorCorrector(data,i, titleArr)]}>{data[titleArr[i]] ? data[titleArr[i]] : 0}</Text>
    </View>
)

export const AnalysisValueBoxSmall = ({data, i, titleArr, customValue, type}) => (
    <View style={[styles.box,colorCorrector(data,i,titleArr), customValue && {justifyContent: 'center', backgroundColor: 'transparent'}]}>
        {
            customValue
                ? <Text style={[styles.boxValueText, type === 'emoji' ? {fontSize: 40} : {fontSize: 20} ,{alignSelf: 'center'}]}>{customValue}</Text>
                : <>
                    <Text  numberOfLines={1} style={[styles.boxTitleText,  {fontSize: 13 }, colorCorrector(data,i, titleArr)]}>{titleArr[i]}</Text>
                    <Text style={[styles.boxValueText, {fontSize: 25 }, colorCorrector(data,i, titleArr)]}>{data[titleArr[i]]}</Text>
                </>
        }
    </View>
)
export const AnalysisBoxRow = ({title, data, id, names}) => {
    let dataObj;
    if (typeof data[names[0]] === 'number') {
        // console.log('number')
        dataObj = {
            data1: data[names[0]],
            data2: data[names[1]],
            sum: data,
        };
    } else  {
        // console.log('otherrrrrrrrrrrrr')
        dataObj = {
            data1: [].concat(...data[names[0]]).length,
            data2: [].concat(...data[names[1]]).length,
            sum: {},
        }
        dataObj.sum[names[0]] = dataObj.data1;
        dataObj.sum[names[1]] = dataObj.data2;

    }
    const equalData = dataObj.data1 === dataObj.data2
    return (
        <MotiView
            transition={{ delay: id*100, damping: 15, mass: 1 }}
            from={{
                opacity: 0,
                top: -15,
            }}
            animate={{
                opacity: 1,
                top: 0,
            }}
            exit={{
                opacity: 0,
                top: -15,
            }}
            exitTransition={{
                type: 'timing',
                duration: 300,
            }}
            style={[styles.advancedValueBoxContainer,{ marginVertical: 3}, {height: 45}]}>
            <View style={[styles.advancedBox,{borderWidth: 1, borderColor: COLORS.color2, backgroundColor: 'transparent'}]}>
                <Text style={[styles.advancedBoxTitleText]}>{title}</Text>
            </View>

            <View style={[styles.advancedBox, !equalData && colorCorrector2(data,0, names),]}>
                <Text style={[styles.advancedBoxValueText, {color: COLORS.color2}, !equalData && colorCorrector2(data,0, names)]}>{dataObj.data1}</Text>
            </View>
            <View style={[styles.advancedBox, !equalData && colorCorrector2(data,1, names)]}>
                <Text style={[styles.advancedBoxValueText,{color: COLORS.color2}, !equalData && colorCorrector2(data,1, names)]}>{dataObj.data2}</Text>
            </View>
            <View style={[styles.advancedBox,{borderWidth: 1, borderColor: COLORS.color2, backgroundColor: 'transparent'}]}>
                <Text style={[styles.advancedBoxValueText, {color: COLORS.color2}]}>{sumCounts(dataObj.sum)}</Text>
            </View>
        </MotiView>
    )

}
export const AverageLine = () => (
    <View style={{width: '100%', height: 80, position: 'absolute', justifyContent: 'flex-end', pointerEvents: 'none'}}>
        <Text style={{color: 'white', opacity: 0.5, alignSelf: 'flex-end'}}>average</Text>
        <Text numberOfLines={1} ellipsizeMode="clip" style={{color: 'white', opacity: 0.5}}
        >_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </Text>
    </View>
)

const styles = StyleSheet.create({

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
    advancedValueBoxContainer: {
        width: '100%',
        height: 115,
        flexDirection: 'row',
        gap: 5,
        marginVertical: 15,
    },
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

