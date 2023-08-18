import React, {useEffect} from 'react';
import {Button, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../config/constants";
import AnalysisBox from "../components/AnalysisBox";
import {AnimatePresence, MotiView} from "moti";


const Home = ({navigation}) => {
    const [dateFormat, setDateFormat] = React.useState('DD/MM/YY');
    const [language, setLanguage] = React.useState('Türkçe');
    const [dropDownMenu, setDropDownMenu] = React.useState({data: [], desc: "", opened: false});
    const handleDateFormatPress = () => {
        if (dropDownMenu.desc === "DateFormat") {
            setDropDownMenu({
                data: [],
                desc: '',
                opened: false,
            })
        } else {
            setDropDownMenu({
                data: ["DD/MM/YY", "MM/DD/YY", "YY/DD/MM"],
                desc: 'DateFormat',
                opened: true,
            })
        }
    }
    const handleLanguagePress = () => {
        if (dropDownMenu.desc === "Language") {
            setDropDownMenu({
                data: [],
                desc: '',
                opened: false,
            })
        } else {
            setDropDownMenu({
                data: ["Türkçe", "English"],
                desc: 'Language',
                opened: true,
            })
        }
    }
    const DropDownMenu = ({dropDownMenu,setFunc}) => {
        const handlePress = (x) => {
            setFunc(x)
            setDropDownMenu({
                data: [],
                desc: '',
                opened: false,
            })
        }
        return (
            <View style={{gap: 5, position: 'absolute', top: 30}}>
                {dropDownMenu.data.map((x, index) => {
                    return (
                        <MotiView
                            key={index}
                            transition={{delay: index * 100, damping: 15, mass: 1}}
                            from={{
                                opacity: 0,
                                top: -15,
                            }}
                            animate={{
                                opacity: 1,
                                top: 0,
                                backgroundColor: dropDownMenu.desc === x ? COLORS.white : COLORS.darkPurple,
                            }}
                            exit={{
                                opacity: 0,
                                top: -15,
                            }}
                            exitTransition={{
                                type: 'timing',
                                duration: 300,
                            }}
                            style={{}}
                        >

                            <TouchableOpacity style={{
                                width: 90,
                                paddingVertical: 5,
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: COLORS.white,
                                borderRadius: 10
                            }} onPress={() => handlePress(x)}>
                                <Text style={{color: COLORS.white}}>{x}</Text>
                            </TouchableOpacity>
                        </MotiView>

                    )
                })
                }

            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: COLORS.darkPurple,
                zIndex: 100,
                width: '90%',
                height: 100,
                padding: 10,
                borderRadius: 25,
                marginBottom: 20
            }}>
                <View style={{zIndex: 90}}>
                    <TouchableOpacity
                        style={{flexDirection: 'row', alignItems: 'center', gap: 10, height: 30, paddingHorizontal: 5}}
                        onPress={handleLanguagePress}>
                        <Text style={{color: COLORS.white}}>{language}</Text>
                        <Text style={{color: COLORS.white, opacity: 0.7, fontSize: 10}}>LANGUAGE</Text>
                    </TouchableOpacity>
                    <AnimatePresence>
                        {
                            (dropDownMenu.desc === "Language" && dropDownMenu.opened) && <DropDownMenu dropDownMenu={dropDownMenu} setFunc={setLanguage}/>
                        }
                    </AnimatePresence>
                </View>

                <View style={{zIndex: 80}}>
                    <TouchableOpacity
                        style={{flexDirection: 'row', alignItems: 'center', gap: 10, height: 30, paddingHorizontal: 5}}
                        onPress={handleDateFormatPress}>
                        <Text style={{color: COLORS.white}}>{dateFormat}</Text>
                        <Text style={{color: COLORS.white, opacity: 0.7, fontSize: 10}}>DATE FORMAT</Text>
                    </TouchableOpacity>
                    <AnimatePresence>
                        {
                            (dropDownMenu.desc === "DateFormat" && dropDownMenu.opened) && <DropDownMenu dropDownMenu={dropDownMenu} setFunc={setDateFormat}/>
                        }
                    </AnimatePresence>
                </View>
            </View>
            <View style={{gap: 10, marginTop: 0,}}>
                <AnalysisBox position={'left'} colors={[COLORS.green, COLORS.lightGreen]}
                             title={'Message Analysis Simple'}
                             description={'Total message count and messaging statistics for each sender.'}
                             navigation={navigation} id={'simple'} dateFormat={dateFormat}/>
                <AnalysisBox position={'right'} colors={[COLORS.purple, COLORS.white]}
                             title={'Message Analysis Advanced '}
                             description={'Rank users based on messaging habits and host a fun tournament.'}
                             navigation={navigation} id={'advanced'} dateFormat={dateFormat}/>
                <AnalysisBox position={'left'} colors={[COLORS.darkBlue, COLORS.purple]}
                             title={'Message Analysis Timeline'}
                             description={'Visualize messaging activities over time for better recall.'}
                             navigation={navigation} id={'timeline'} dateFormat={dateFormat}/>
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
        backgroundColor: COLORS.white,
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
