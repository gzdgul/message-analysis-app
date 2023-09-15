import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, translations, welcomeTranslation} from "../../config/constants";
import {ButtonGradient} from "../../libraries/UI_Component_Library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

function WelcomeSetLanguage({navigation}) {
    const [language, setLanguage] = React.useState("EN");
    const handlePress = () => {

        console.log("storage// language --> ", language)
        AsyncStorage.setItem("language", language).then(() => {
            navigation.replace("welcomeFormat",{language: language})
        })
    }
  const handleLanguagePress = (x) => {
     setLanguage(x)
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 33, fontWeight: 'bold', color: COLORS.white}}>{welcomeTranslation[language]["1"].title}</Text>
            <Text style={{...styles.text }}>{welcomeTranslation[language]["1"].desc}</Text>
            {
                [
                    {id: 'TR', title: 'Türkçe'},
                    {id: 'EN', title: 'English'},
                ].map((x,index) => {
                    return <TouchableOpacity
                        key={index}
                        style={{height: 50, borderWidth: 1, borderRadius: 15, borderColor: 'white', opacity:  language === x.id ? 1 : 0.3, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => handleLanguagePress(x.id)}
                        onPressIn={() =>   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                    >
                        <Text style={{...styles.text}}>{x.title}</Text>
                    </TouchableOpacity>
                })
            }
            <ButtonGradient title={translations[language]['next']} color={[COLORS.white, COLORS.white]} onPress={handlePress} onPressIn={() =>  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy) }/>
            <Text style={{...styles.text, textAlign: 'center', opacity: 0.4, fontSize: 14}}>{translations[language]["change_it_later"]}</Text>
        </View>
    );
}

export default WelcomeSetLanguage;

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
