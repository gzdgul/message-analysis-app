import React, {useEffect} from 'react';
import {Button, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../config/constants";
import AnalysisBox from "../components/AnalysisBox";



const Home = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={{ gap: 10}}>
                <AnalysisBox position={'left'} colors={[COLORS.green, COLORS.lightGreen]} title={'Message Analysis Simple'} description={'Total message count and messaging statistics for each sender.'} navigation={navigation} id={'simple'}/>
                <AnalysisBox position={'right'} colors={[COLORS.purple, COLORS.white]}  title={'Message Analysis Advanced '} description={'Rank users based on messaging habits and host a fun tournament.'} navigation={navigation} id={'advanced'}/>
                <AnalysisBox position={'left'} colors={[COLORS.darkBlue, COLORS.purple]} title={'Message Analysis Timeline'} description={'Visualize messaging activities over time for better recall.'} navigation={navigation} id={'timeline'}/>
            </View>
            <View style={{marginTop: 20, width: '100%'}}>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.darkBG,
        paddingTop: 60,
    },
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
    button: {
        backgroundColor: COLORS.pink,
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
    steps: {
        width: '100%',
        // backgroundColor: 'red',
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

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
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
    }
});
