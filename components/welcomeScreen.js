import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Pressable} from "react-native";
import {COLORS, translations, UsageInstructionsData, welcomeTranslation} from "../config/constants";
import {ButtonGradient} from "../libraries/UI_Component_Library";
import {AnimatePresence, MotiView} from "moti";
import {Easing} from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');
import welcomeIcon from "../assets/sparkling-stars.png"
import {LinearGradient} from "expo-linear-gradient";
import * as Haptics from 'expo-haptics';
import ScrollableInfoModal from "./ScrollableInfoModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const pozitifEmojiler = [
    "🤩", "😂", "🥰", "😋", "😊", "😍", "😜", "😇",
    "🤑", "💕", "😄", "💖", "😁", "😏", "💓", "😘",
    "🐶", "🦁", "🐸", "😃", "🐱", "🐯", "🐭", "🐻",
    "🐨", "🐽", "😻", "🥳", "💛", "💙", "💜", "🐹",
    "🐼", "🐾", "🐮", "🤗", "🤓", "😺", "😅", "🐰",
    "❤️", "💚", "💗", "😽","😎", "🌄", "🏆", "📸",
    "🌺", "🏝️", "🍹", "🌻", "🍔", "🍭", "🍓", "💑",
    "🚗", "✈️", "🏕️", "🍀", "🎵", "🤑", "🥳",
];


const buttonColor = [COLORS.white,COLORS.white,COLORS.white,COLORS.white,COLORS.lightGreen,COLORS.purple,COLORS.pink,COLORS.lightBlue,COLORS.yellow,COLORS.white]

const Denneme = ({icon,title,desc}) => (
    <MotiView
        transition={{ delay: 0, damping: 15, mass: 1 }}
        from={{
            opacity: 0,
        }}
        animate={{
            opacity: 1,
        }}
        exit={{
            opacity: 0,
        }}

        style={{gap:20}}>
        <Text style={{alignSelf: 'center', fontSize: 40 }}>{icon}</Text>
        <Text style={{fontSize: 28, fontWeight: 'bold', color: COLORS.white, textAlign: 'center'}}>{title}</Text>
        <Text style={{...styles.text }}>{desc}</Text>
    </MotiView>
)
function WelcomeScreen({navigation}) {
    const [deneme, setdeneme] = useState(0);
    const [page, setPage] = useState(0);
    const [data, setData] = useState(pozitifEmojiler);
    const [isInfoModalVisible, setInfoModalVisible] = React.useState(false);
    const [language, setLanguage] = React.useState("EN");
    const [dateFormat, setDateFormat] = React.useState("MM/DD/YY");
    const [showEmojiBOMB, setShowEmojiBOMB] = React.useState(false)
    const [showButton, setShowButton] = React.useState(false)
    const icerik = [
        {title: welcomeTranslation[language]["0"].title, desc: welcomeTranslation[language]["0"].desc, icon:""},
        {title: welcomeTranslation[language]["1"].title, desc: welcomeTranslation[language]["1"].desc, icon:"📊"},
        {title: welcomeTranslation[language]["2"].title, desc: welcomeTranslation[language]["2"].desc, icon:"📊"},
        {title: welcomeTranslation[language]["3"].title, desc: welcomeTranslation[language]["3"].desc, icon:"📊"},
        {title: welcomeTranslation[language]["4"].title, desc: welcomeTranslation[language]["4"].desc, icon:"📊"},
        {title: welcomeTranslation[language]["5"].title, desc: welcomeTranslation[language]["5"].desc, icon:"📅"},
        {title: welcomeTranslation[language]["6"].title, desc: welcomeTranslation[language]["6"].desc, icon:"💬"},
        {title: welcomeTranslation[language]["7"].title, desc: welcomeTranslation[language]["7"].desc, icon:"🛡️"},
        {title: welcomeTranslation[language]["8"].title, desc: welcomeTranslation[language]["8"].desc, icon:"📱"},
        {title: welcomeTranslation[language]["9"].title, desc: welcomeTranslation[language]["9"].desc, icon:"📱"},
    ]

    React.useEffect(() => {
        setShowEmojiBOMB(true)
        const timeout = setTimeout(() => {
            setShowEmojiBOMB(false)
        },5000)
        return () => clearTimeout(timeout);
    },[])
    // React.useEffect(() => {
    //     let second = 0;
    //
    //     const interval = setInterval(() => {
    //         const rastgeleIndex = Math.floor(Math.random()*44);
    //         const rastgeleIndex2 = Math.floor(Math.random()*44);
    //         setdeneme(rastgeleIndex)
    //         setTimeout(() => {
    //             setData(prevState => {
    //                 prevState[rastgeleIndex] = pozitifEmojiler[rastgeleIndex2]
    //                 return [...prevState]
    //             })
    //         },1000)
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    const handleButtonPress = () => {
        if (page < (icerik.length-1)) {
            setPage(prevState => prevState +1)
            if (page === 1) {
                AsyncStorage.setItem('language', language)
            }
            if (page === 2) {
                AsyncStorage.setItem('dateFormat', dateFormat)
            }
        } else navigation.navigate('Home', {language,dateFormat})
    }
const handleUsagePress = async () => {
    setInfoModalVisible(true)
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
}


    return (
        <View style={styles.container}>
            <MotiView
                animate={{
                    top: (page === (icerik.length-1) || page === 0) ? -100 : -20
                }}
                style={{zIndex: 10,paddingHorizontal: 20, height: '60%', justifyContent: 'flex-end', gap: 30}}>
                    {/*<Image source={welcomeIcon} style={{width: '30%', height: 'auto', aspectRatio: 1}}/>*/}

               <Denneme key={page} icon={icerik[page].icon} title={icerik[page].title} desc={icerik[page].desc}/>

                <MotiView
                    translation={{delay: 300}}
                    from={{
                        opacity: 0,
                    }}
                    animate={{
                        top: showEmojiBOMB ? 10 : 0,
                        opacity: showEmojiBOMB ? 0 : 1,
                    }}
                    style={{gap: 20}}>
                    { page === 1 &&
                        [
                            {id: 'TR', title: 'Türkçe'},
                            {id: 'EN', title: 'English'},
                        ].map((x, index) => {
                            return (
                                <MotiView
                                    key={index}
                                    transition={{delay: 0}}
                                    from={{
                                        scale:  0.8,
                                        opacity: 0
                                    }}
                                    animate={{
                                        scale: language === x.id ? 1 : 0.9,
                                        opacity: 1
                                    }}
                                    exit={{
                                        scale:  0.8,
                                        opacity: 0
                                    }}
                                    style={{}}>
                                    <Pressable
                                        onPress={() =>setLanguage(x.id)}
                                               style={{width: '100%', height: 50, borderRadius:15, borderWidth: 1, borderColor: language === x.id ? COLORS.white : COLORS.ash, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{ fontSize: 16, color: COLORS.white, fontWeight: '600'}}>{x.title}</Text>
                                    </Pressable>
                                </MotiView>
                            )
                        })
                    }
                    { page === 2 &&
                        [
                            {id: 'DD/MM/YY', title: 'DD/MM/YY'},
                            {id: 'MM/DD/YY', title: 'MM/DD/YY'},
                            {id: 'YY/MM/DD', title: 'YY/MM/DD'},
                        ].map((x, index) => {
                            return (
                                <MotiView
                                    key={index}
                                    transition={{delay: 0}}
                                    from={{
                                        scale:  0.8,
                                        opacity: 0
                                    }}
                                    animate={{
                                        scale: dateFormat === x.id ? 1 : 0.9,
                                        opacity: 1
                                    }}
                                    exit={{
                                        scale:  0.8,
                                        opacity: 0
                                    }}
                                    style={{}}>
                                    <Pressable
                                        onPress={() =>setDateFormat(x.id)}
                                                style={{width: '100%', height: 50, borderRadius:15, borderWidth: 1, borderColor: dateFormat === x.id ? COLORS.white : COLORS.ash, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{ fontSize: 16, color: COLORS.white, fontWeight: '600'}}>{x.title}</Text>
                                    </Pressable>
                                </MotiView>
                            )
                        })
                    }

                    <Pressable disabled={showEmojiBOMB} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy) } style={{width: '100%', height: 50, borderRadius: 15, overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}
                               onPress={handleButtonPress}>
                        <MotiView
                            animate={{

                                backgroundColor: buttonColor[page],
                            }}
                            style={{width: '100%' ,height: '100%', position: 'absolute'}}>
                            <LinearGradient
                                style={{ width: '100%', height: '100%',}}
                                colors={[COLORS.white, 'transparent']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                pointerEvents="none"
                            />
                        </MotiView>
                        <Text style={{ fontSize: 16, color: COLORS.darkBG, fontWeight: '600'}}>{page === (icerik.length-1) ? translations[language]['start'] : translations[language]['next']}</Text>
                    </Pressable>
                    <MotiView
                        animate={{
                            scale: page === (icerik.length-1) ? 1 : 0.8,
                            opacity: page === (icerik.length-1) ? 1: 0
                        }}
                    style={{}}>
                        <Pressable disabled={page!== icerik.length-1} onPress={handleUsagePress}
                        style={{width: '100%', height: 50, borderRadius:15, backgroundColor: COLORS.green, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontSize: 16, color: COLORS.darkBG, fontWeight: '600'}}>{translations[language]['step_by_step_how_to_use']}</Text>
                        </Pressable>
                    </MotiView>
                </MotiView>


            </MotiView>
            <AnimatePresence>
                {showEmojiBOMB &&
                    pozitifEmojiler.map((x, index) => {
                        const randomNum1 = Math.floor(Math.random() * width-90) + 90;
                        const randomNum2 = Math.floor(Math.random() * 2000) + 300;
                        const randomNum3 = Math.floor(Math.random() * 35) + 25;
                        const randomValue = Math.random() * 0.9 + 0.6;
                        const randomNum4 = parseFloat(randomValue.toFixed(1));
                        // console.log(randomNum1, randomNum2, randomNum3, randomNum4)
                        return (
                            <MotiView
                                key={index}
                                transition={{
                                    delay: index*(50),
                                    damping: 10,
                                    mass: 1,
                                    type: 'timing',
                                    duration: 1000,
                                }}
                                from={{
                                    opacity: 1,
                                    left: randomNum1,
                                    top: -200
                                }}
                                animate={{
                                    opacity: randomNum4,
                                    left: randomNum1,
                                    top:height,
                                }}
                                exit={{
                                    opacity: 0,
                                    top:height,
                                }}
                                exitTransition={{
                                    type: 'timing',
                                    duration: 300,
                                }}
                                style={{position: 'absolute', zIndex: 100}}
                            >
                                <Text style={{fontSize: randomNum3}}>{x}</Text>
                            </MotiView>
                        )
                    })
                }
            </AnimatePresence>
            {/*<View style={{ opacity: 0.15, width: '100%', flexWrap: "wrap", justifyContent: 'center', flexDirection: "row", position: 'absolute', bottom: 0}}>*/}
            {/*    {*/}
            {/*        data.map((x, index) => {*/}

            {/*            return (*/}
            {/*                <MotiView*/}
            {/*                    key={index}*/}
            {/*                    animate={{*/}
            {/*                        opacity: deneme === index ? 0 : 1,*/}
            {/*                    }}*/}
            {/*                    style={{  }}>*/}
            {/*                    <Text style={{fontSize: (width/9) -5}}>{x}</Text>*/}
            {/*                </MotiView>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*</View>*/}
            <ScrollableInfoModal data={UsageInstructionsData[language]} isVisible={isInfoModalVisible} setVisible={setInfoModalVisible} language={language}/>
        </View>
    );
}

export default WelcomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.darkBG
    },
    text: {
        fontSize: 18,
        fontWeight: '400',
        color: COLORS.white,
        textAlign: 'center'
    }
});
