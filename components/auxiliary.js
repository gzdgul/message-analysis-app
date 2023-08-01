import {StyleSheet, Text, View} from "react-native";
import {findMaxCountKey} from "./utils";
import {COLORS} from "../config/constants";

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
        <Text style={[styles.boxTitleText, colorCorrector(data,i, titleArr)]}>{titleArr[i]}</Text>
        <Text style={[styles.boxValueText, colorCorrector(data,i, titleArr)]}>{data[titleArr[i]] ? data[titleArr[i]] : 0}</Text>
    </View>
)
export const AnalysisValueBoxSmall = ({data, i, titleArr, customValue, type}) => (
    <View style={[styles.box,colorCorrector(data,i,titleArr), customValue && {justifyContent: 'center', backgroundColor: 'transparent'}]}>
        {
            customValue
                ? <Text style={[styles.boxValueText, type === 'emoji' ? {fontSize: 40} : {fontSize: 20} ,{alignSelf: 'center'}]}>{customValue}</Text>
                : <>
                    <Text style={[styles.boxTitleText,  {fontSize: 13 }, colorCorrector(data,i, titleArr)]}>{titleArr[i]}</Text>
                    <Text style={[styles.boxValueText, {fontSize: 25 }, colorCorrector(data,i, titleArr)]}>{data[titleArr[i]]}</Text>
                </>
        }
    </View>
)



export const colorCorrector = (data, i, titleArr) => {
    if (findMaxCountKey(data) === titleArr[i]) {
        return {
            backgroundColor: COLORS.lightGreen,
            color: COLORS.darkPurple,
        }
    } else return null;
}

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
