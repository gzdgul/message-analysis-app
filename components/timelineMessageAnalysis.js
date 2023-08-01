import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {COLORS} from "../config/constants";

const TimelineMessageAnalysis = ({analyzedData}) => {
    const mostRepeatedDates = analyzedData.mostRepeatedDates
    const mostRepeatedDatesSorted = [...mostRepeatedDates].sort((a, b) => b.count - a.count);
    const mostRepeatedDateeee = mostRepeatedDatesSorted[0].date
    console.log('mostRepeatedDates!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',mostRepeatedDates)
    console.log('mostRepeatedDatesSorted!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',mostRepeatedDatesSorted)
    console.log('mostRepeatedDateeee!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',mostRepeatedDateeee)

    return (
      <View>
          <Text style={styles.textStyle}>DENEME TIMELINE</Text>
          <Text style={styles.textStyle}>{mostRepeatedDateeee}</Text>
      </View>
    );
};

export default TimelineMessageAnalysis;

const styles = StyleSheet.create({

    textStyle: {
        color: COLORS.white,
        fontSize: 17
    },
});
