import React from 'react';
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {COLORS} from "../config/constants";
import SimpleMessageAnalysis from "../components/simpleMessageAnalysis";
import TimelineMessageAnalysis from "../components/timelineMessageAnalysis";
import AdvancedMessageAnalysis from "../components/advancedMessageAnalysis";

const Analysis = ({navigation, route}) => {
    const analyzedData = route.params.analyzedData
    const pageID = analyzedData.id

    return (
       <View style={styles.container}>
           {
               pageID === 'simple' &&
               <SimpleMessageAnalysis analyzedData={analyzedData}/>
           }
           {
               pageID === 'visualized' &&
               <TimelineMessageAnalysis analyzedData={analyzedData}/>
           }
           {
               pageID === 'advanced' &&
               <AdvancedMessageAnalysis analyzedData={analyzedData}/>
           }

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
        paddingTop: 50,

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
