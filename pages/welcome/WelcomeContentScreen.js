import React, {useRef} from 'react';
import {Dimensions, ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {COLORS, translations, welcomeTranslation} from "../../config/constants";
import {ButtonGradient} from "../../libraries/UI_Component_Library";
import * as Haptics from "expo-haptics";
import {MotiView} from "moti";
import AsyncStorage from "@react-native-async-storage/async-storage";
const {width, height} = Dimensions.get("window")

function WelcomeContentScreen({navigation, route}) {
    const scrollViewRef = useRef(null)
    const [page, setPage] = React.useState(0);
    const language = route.params.language;
    const dateFormat = route.params.dateFormat;
    const pageColor =  [COLORS.white,COLORS.lightGreen,COLORS.purple,COLORS.pink,COLORS.lightBlue,COLORS.yellow,COLORS.white]
    const icerik = [
        {title: welcomeTranslation[language]["3"].title, desc: welcomeTranslation[language]["3"].desc, icon:"💬", color: pageColor[0]},
        {title: welcomeTranslation[language]["4"].title, desc: welcomeTranslation[language]["4"].desc, icon:"📊", color: pageColor[1]} ,
        {title: welcomeTranslation[language]["5"].title, desc: welcomeTranslation[language]["5"].desc, icon:"📅", color: pageColor[2]},
        {title: welcomeTranslation[language]["6"].title, desc: welcomeTranslation[language]["6"].desc, icon:"💬", color: pageColor[3]},
        {title: welcomeTranslation[language]["7"].title, desc: welcomeTranslation[language]["7"].desc, icon:"🛡️", color: pageColor[4]},
        {title: welcomeTranslation[language]["8"].title, desc: welcomeTranslation[language]["8"].desc, icon:"📱", color: pageColor[5]},
        {title: welcomeTranslation[language]["9"].title, desc: welcomeTranslation[language]["9"].desc, icon:"📱", color: pageColor[6]},
    ]

    const scrollToPage = (pageNumber) => {
        if (pageNumber === 7) {
            AsyncStorage.setItem("welcomeStatus","OK").then(() => {
                navigation.replace("Home", {language: language, dateFormat: dateFormat})
            })
        }
        scrollViewRef.current.scrollTo({
            x: pageNumber * width,
            animated: true,
        });
    };
    const handlePageScroll = (x) => {
        console.log(x.nativeEvent.contentOffset)
        const pageNum = Math.round(x.nativeEvent.contentOffset.x / width)
        console.log(pageNum)
        setPage(pageNum)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    }

    return (
      <View style={{flex:1, backgroundColor: COLORS.darkBG}}>
          <ScrollView
              ref={scrollViewRef}
              pagingEnabled={true}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onMomentumScrollEnd={(x) => handlePageScroll(x)}>
              {
                  icerik.map((x,index) => {
                      return <View key={index} style={{width: width, alignItems: 'center', ...styles.container}}>
                          {/*<Text style={{...styles.text, fontSize: 26, fontWeight: '500'}}>{x.icon}</Text>*/}
                          <Text style={{...styles.text, fontSize: 26, fontWeight: '500', color: x.color}}>{x.title} {x.icon}</Text>
                          <Text style={{...styles.text, textAlign: 'center'}}>{x.desc}</Text>
                      </View>
                  })
              }
          </ScrollView>
          <View style={{position: 'absolute', bottom: 200, gap: 20, height:30, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20,}}>
              {
                  [COLORS.white,COLORS.lightGreen,COLORS.purple,COLORS.pink,COLORS.lightBlue,COLORS.yellow,COLORS.white]
                      .map((x,index) => {
                      return (
                          <TouchableOpacity key={index}
                                            disabled={page < index}
                                            onPressIn={() =>  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
                                            onPress={() => scrollToPage(page === index ? index + 1 : index)}
                          >
                              <MotiView
                                  transition={{
                                      damping: 30,
                                      // mass: 20,
                                      delay: page === index ? 300 : 0
                                  }}
                                  animate={{
                                      backgroundColor:  page === index ? x : COLORS.white,
                                      height: page === index ? 35 : 10,
                                      opacity: page >= index ? 1 : 0.2,
                                      width: page === index ? 100 : 10,
                                      // bottom: index * 50,
                                      // borderRadius: page === 6 ? 20 : 0
                                  }}
                                  style={{height: 15, borderRadius: 30, justifyContent: 'center', alignItems: 'center',}}>
                                  { page === index &&
                                      <MotiView
                                      transition={{
                                          // damping: 30,
                                          // mass: 20,
                                          delay: 500
                                      }}
                                      from={{
                                          opacity: 0
                                      }}
                                      animate={{
                                          opacity: 1
                                      }}
                                      exit={{
                                          opacity: 0
                                      }}
                                      style={{}}>
                                      <Text style={{...styles.text, color: 'black',}}>{page === 6 ? translations[language]["start"] : translations[language]["next"]}</Text>
                                  </MotiView>
                                  }
                              </MotiView>
                          </TouchableOpacity>
                      )
                  })
              }
          </View>




      </View>
    );
}

export default WelcomeContentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: COLORS.darkBG,
        gap: 15,
        paddingHorizontal: 15,
    },
    text: {
        fontSize: 18,
        fontWeight: '300',
        color: COLORS.white,
        // textAlign: 'center'
    }
});
