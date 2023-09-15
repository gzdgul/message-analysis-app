import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {COLORS, welcomeTranslation} from "../../config/constants";
import {ButtonGradient} from "../../libraries/UI_Component_Library";
import * as Haptics from "expo-haptics";

function WelcomeFirstScreen({navigation}) {

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        navigation.replace("welcomeLanguage")
    }

    return (
      <View style={styles.container}>
          <Text style={{fontSize: 33, fontWeight: 'bold', color: COLORS.white}}>{welcomeTranslation["EN"]["0"].title}</Text>
          <Text style={{...styles.text }}>{welcomeTranslation["EN"]["0"].desc}</Text>
          <ButtonGradient title={"Next"} color={[COLORS.white, COLORS.white]} onPress={handlePress}/>
      </View>
    );
}

export default WelcomeFirstScreen;
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
