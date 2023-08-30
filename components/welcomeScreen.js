import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {COLORS} from "../config/constants";

function WelcomeScreen({navigation}) {
    return (
       <View style={styles.container}>
           <Text>dfsgdfgdfgdfg</Text>
           <TouchableOpacity onPress={() => navigation.navigate('Home')}>
               <Text>BAŞLA</Text>
           </TouchableOpacity>
       </View>
    );
}

export default WelcomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
