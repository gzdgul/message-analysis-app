import React, {useEffect} from 'react';
import {View as MotiView} from "moti/build/components/view";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../config/constants";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Dimensions } from 'react-native';
import * as Haptics from "expo-haptics";

const AnalysisBar = ({  id, percentageOfChange,block, pressed, setPressed, day, elementCount, pressAllowed}) => {
    const { width, height } = Dimensions.get('window');
    const areaWidth =  Math.floor(width)

    const barWidth =
        pressed.block === block
        ? pressed.DAY === id ? areaWidth/elementCount - 5 + 15 : areaWidth/elementCount - 5 -(15/elementCount)
        : areaWidth/elementCount - 5
    const handleBarPress = async () => {
        if (!pressAllowed) {
            return;
        }
        if (pressed.DAY === id) {
            setPressed({})
        }
        else setPressed({DAY: id, block: block })
        await Haptics.selectionAsync()
    }

    return (
        <TouchableOpacity onPress={handleBarPress} style={{flexDirection: 'column', }}>
            <MotiView
                transition={{ delay: 10, damping: 20, mass: 0.8 }}
                animate={{
                    height: pressed.DAY === id ? 160 - percentageOfChange : 150 - percentageOfChange,
                    width: barWidth
                }}
                exit={{
                    opacity: 0,
                    width: 0,
                    height: 0
                }}
                exitTransition={{
                    type: 'timing',
                    duration: 300,
                }}
                style={[styles.bar]}
            >
                {
                    percentageOfChange < 75 &&
                    <LinearGradient
                        style={{ width: '100%', height: '100%', borderRadius: 15, position: 'absolute'}}
                        colors={[COLORS.purple, COLORS.white, COLORS.white]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        pointerEvents="none"
                    />
                }
            </MotiView>
            <MotiView
                transition={{ delay: 10, damping: 20, mass: 0.8 }}
                animate={{
                    width: barWidth
                }}
                exit={{
                    opacity: 0,
                    width: 0,
                }}
                exitTransition={{
                    type: 'timing',
                    duration: 300,
                }}
                style={{height: 33, alignItems: 'center',}}
            >
                <View style={{flexDirection: 'row', paddingVertical: 10,  justifyContent: 'center' }} >
                    <Text  numberOfLines={1} style={{color: 'white', fontSize: 4 + (barWidth)*0.1,  transform: [{ rotate: '270deg' }] }}>{day}</Text>
                </View>
            </MotiView>
        </TouchableOpacity>
    );
};

export default AnalysisBar;

const styles = StyleSheet.create({

    textStyle: {
        color: COLORS.white,
        fontSize: 17
    },
    bar: {
        backgroundColor: COLORS.white,
        borderRadius: 15,

    },
});
