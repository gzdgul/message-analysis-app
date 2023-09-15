import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, translations, welcomeTranslation} from "../../config/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ButtonGradient} from "../../libraries/UI_Component_Library";
import * as Haptics from "expo-haptics";

function WelcomeSetDateFormat({navigation, route}) {
    const language = route.params.language
    const [dateFormat, setDateFormat] = React.useState("MM/DD/YY");
    const handlePress = () => {
        console.log("storage// dateFormat --> ", dateFormat)
        AsyncStorage.setItem("dateFormat", dateFormat).then(() => {
            navigation.replace("welcomeContent", {language: language, dateFormat: dateFormat})
        })
    }
    const handleFormatPress = (x) => {
        setDateFormat(x)
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 33, fontWeight: 'bold', color: COLORS.white}}>{welcomeTranslation[language]["2"].title}</Text>
            <Text style={{...styles.text }}>{welcomeTranslation[language]["2"].desc}</Text>
            {
                [
                    {id: 'DD/MM/YY', title: 'DD/MM/YY'},
                    {id: 'MM/DD/YY', title: 'MM/DD/YY'},
                    {id: 'YY/MM/DD', title: 'YY/MM/DD'},
                ].map((x,index) => {
                    return <TouchableOpacity
                        key={index}
                        style={{height: 50, borderWidth: 1, borderRadius: 15, borderColor: 'white', opacity:  dateFormat === x.id ? 1 : 0.3, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => handleFormatPress(x.id)}
                        onPressIn={() =>   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                    >
                        <Text style={{...styles.text}}>{x.title}</Text>
                    </TouchableOpacity>
                })
            }
            <ButtonGradient title={translations[language]['next']} color={[COLORS.white, COLORS.white]} onPress={handlePress} onPressIn={() =>  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}/>
            <Text style={{...styles.text, textAlign: 'center', opacity: 0.4, fontSize: 14}}>{translations[language]["change_it_later"]}</Text>
        </View>
    );
}
export default WelcomeSetDateFormat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.darkBG,
        gap: 15,
        paddingHorizontal: 15,
    },
    text: {
        fontSize: 18,
        fontWeight: '400',
        color: COLORS.white,
        // textAlign: 'center'
    }
});
