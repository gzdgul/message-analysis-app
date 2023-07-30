import React from 'react';
import {Button, Pressable, StyleSheet, Text, View} from "react-native";
import {View as MotiView} from "moti/build/components/view";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../config/constants";

const AnalysisBox = ({position}) => {
    const [isAnalysisStarted, setIsAnalysisStarted] = React.useState(false)
    const [circleText, setCircleText] = React.useState('Start')

    React.useEffect(() => {
        if (isAnalysisStarted) {
            setTimeout(() => {
                setCircleText('Analiz ediliyor...')
            },500)
        } else {
            setTimeout(() => {
                setCircleText('Start')
            },500)
        }
    },[isAnalysisStarted])
    const handleCirclePress = () => {
        setIsAnalysisStarted(true)

    }

    return (
        <View style={[styles.box,
            position === 'left'
                ? {borderTopRightRadius: 100, borderBottomRightRadius: 100}
                : {borderTopLeftRadius: 100, borderBottomLeftRadius: 100}
        ]}>
            {
                position === 'left' &&
                <View style={{width: '50%', height: '100%', justifyContent: 'center', paddingHorizontal: 10}}>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid animi,</Text>
                    <Button title="STOP" onPress={() =>  setIsAnalysisStarted(false)}/>
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
                    style={[styles.circle, {position: 'absolute'}]}>
                    <LinearGradient
                        style={{ width: '100%', height: '100%', borderRadius: 100}}
                        colors={[COLORS.pink, COLORS.white]}
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

                        <Text style={styles.circleText}>{circleText}</Text>
                    </MotiView>
                </Pressable>
            </MotiView>
            {
                position === 'right' &&
                <View style={{width: '50%', height: '100%', justifyContent: 'center', paddingHorizontal: 10}}>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid animi,</Text>
                    <Button title="STOP" onPress={() =>  setIsAnalysisStarted(false)}/>
                </View>
            }
        </View>
    );
};

export default AnalysisBox;

const styles = StyleSheet.create({

    circle: {
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        // overflow: 'hidden',
    },
    innerCircle: {
        width: 135,
        height: 135,
        backgroundColor:  COLORS.white,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText: {
        color: 'black',
        fontSize: 14,
    },
    box: {
        width: '90%',
        height: 180,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 30,

    }
});
