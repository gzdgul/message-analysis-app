import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {COLORS} from "../config/constants";

const TimelineMessageAnalysis = ({analyzedData}) => {

    return (
      <View>
          <Text style={styles.textStyle}>Under Maintenance</Text>
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
