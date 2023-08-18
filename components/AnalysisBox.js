import React from 'react';
import {Alert, Button, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {View as MotiView} from "moti/build/components/view";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../config/constants";
import {findAnalysis, readFileContent, pickDocument} from "../libraries/Helper_Function_Library";
import MaskedView from "@react-native-masked-view/masked-view";

const AnalysisBox = ({navigation,position,title, description, colors, id, dateFormat}) => {
    const [fileUri, setFileUri] = React.useState('')
    const [isAnalysisStarted, setIsAnalysisStarted] = React.useState(false)
    const [circleText, setCircleText] = React.useState('START')


    const handlePickDocument = async () => {
        const fileUri =  await pickDocument()
        if (fileUri !== undefined) {
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',fileUri)
            setFileUri(fileUri)
        }
    }

    React.useEffect(() => {
        if (isAnalysisStarted) {
            setTimeout(() => {
                setCircleText('Analyzing...')
            },500)
        } else {
            setTimeout(() => {
                setCircleText('START')
            },500)
        }
    },[isAnalysisStarted])
    const handleCirclePress = async () => {
        if (fileUri) {
            setIsAnalysisStarted(true)

                const fileContent = await readFileContent(fileUri,dateFormat)
                if (fileContent === null) {
                    setIsAnalysisStarted(false)
                    Alert.alert('Oops..','The date format seems to be incorrect. please check👆')
                    return;
                }
                const {
                    longestMessage,
                    activeDays,
                    mostRepeatedWordsAndSenders,
                    mostUsedEmojisAndSenders,
                    dataObjsByDate,
                    allSendings,

                } = await findAnalysis(fileContent);
            setTimeout(() => {
                setIsAnalysisStarted(false)
                navigation.navigate('Analysis', {analyzedData: {
                        longestMessage,
                        activeDays,
                        mostRepeatedWordsAndSenders,
                        mostUsedEmojisAndSenders,
                        allSendings,
                        dataObjsByDate,
                        id
                    }});
            },5000)
        }else Alert.alert('Geçerli bir dosya giriniz')
    }
    const GradientText = props => {
        return (
            <MaskedView maskElement={<Text {...props} />}>
                <LinearGradient
                    colors={props.colors}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text {...props} style={[props.style, {opacity: 0}]} />
                </LinearGradient>
            </MaskedView>
        );
    };
    return (
        <View style={[styles.box,
            {overflow: 'hidden'},
            position === 'left'
                ? {borderTopRightRadius: 100, borderBottomRightRadius: 100}
                : {borderTopLeftRadius: 100, borderBottomLeftRadius: 100}
        ]}>
            {
                position === 'left' &&
                <View style={styles.desArea}>
                    <GradientText style={[styles.titleText]} colors={colors}>{title}</GradientText>
                    <Text style={styles.desText}>{description}</Text>
                    <TouchableOpacity disabled={id === 'visualized'} style={[styles.button, {backgroundColor: colors[0]}]} onPress={handlePickDocument}>
                        <LinearGradient
                            style={{ width: '100%', height: '100%', borderRadius: 10, position: 'absolute'}}
                            colors={[colors[0], colors[1]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            pointerEvents="none"
                        />
                        <Text style={styles.buttonText}>{id === 'visualized' ? 'Select Document🔒' : "Select Document"}</Text>
                    </TouchableOpacity>
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
                    style={[styles.circle, {width: '100%'}, {position: 'absolute'}]}>
                    <LinearGradient
                        style={{ width: '100%', height: '100%', borderRadius: 100}}
                        colors={[colors[1], colors[0]]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        pointerEvents="none"
                    />
                </MotiView>

                <Pressable disabled={id === 'visualized'} onPress={handleCirclePress}>
                    <MotiView
                        transition={{ delay: 0, damping: 15, mass: 1,type: 'timing', duration: 800 ,loop: isAnalysisStarted}}
                        animate={{
                            scale: isAnalysisStarted ? 0.9 : 1,
                        }}
                        style={[styles.innerCircle]}>
                        <GradientText style={[styles.circleText]} colors={colors}>{id === 'visualized' ? 'LOCKED🔒' : circleText}</GradientText>
                    </MotiView>
                </Pressable>
            </MotiView>
            {
                position === 'right' &&
                <View style={styles.desArea}>
                    <GradientText style={[styles.titleText, {textAlign: 'right'}]} colors={colors}>{title}</GradientText>
                    <Text style={[styles.desText, {textAlign: 'right'}]}>{description}</Text>
                    <TouchableOpacity style={[styles.button, {backgroundColor: colors[0]}]} onPress={handlePickDocument}>
                        <LinearGradient
                            style={{ width: '100%', height: '100%', borderRadius: 10, position: 'absolute'}}
                            colors={[colors[0], colors[1]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            pointerEvents="none"
                        />
                        <Text style={styles.buttonText}>Select Document</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default AnalysisBox;

const styles = StyleSheet.create({
    box: {
        width: '100%',
        height: 180,
        // backgroundColor: COLORS.darkPurple,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 30,

    },
    circle: {
        width: '45%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 100,
        // overflow: 'hidden',
        // backgroundColor: 'red'
    },
    innerCircle: {
        width: '85%',
        aspectRatio: 1,
        backgroundColor:  COLORS.darkBG,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText: {
        color: 'black',
        fontSize: 16,
    },

    desArea: {
        width: '55%',
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 18,

    },
    titleText: {
        fontSize: 16,
        fontWeight: '600',

    },
    desText: {
        fontSize: 13,
        color: COLORS.white

    },
    button: {
        height: 35,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        // color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },

});
