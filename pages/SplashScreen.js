import React, {useEffect} from 'react';
import {View, Image} from "react-native";
import splash from "../assets/splash.gif"
import {COLORS} from "../config/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SplashScreen({navigation}) {
    React.useEffect(() => {
        // AsyncStorage.clear();
        AsyncStorage.getAllKeys().then(value => {
            console.log(value)
        })
        const fetchData = async () => {
            try {
                const welcomeStatus = await AsyncStorage.getItem('welcomeStatus');
                if (welcomeStatus !== "OK") {
                    await AsyncStorage.setItem("language", "EN");
                    await AsyncStorage.setItem("dateFormat", "MM/DD/YY");
                    setTimeout(() => {
                        navigation.replace('welcome');
                    }, 2000);
                } else {
                    const language = await AsyncStorage.getItem('language');
                    const dateFormat = await AsyncStorage.getItem('dateFormat');
                    setTimeout(() => {
                        navigation.replace("Home", { language, dateFormat });
                    }, 2000);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <View style={{flex: 1, backgroundColor: "#000000"}}>
            <Image source={splash} style={{width: '100%', height: '100%'}} resizeMode={"cover"}/>
        </View>
    );
}

export default SplashScreen;