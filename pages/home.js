import React, {useEffect} from 'react';
import {Button, Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, UsageInstructions, UsageSecurity} from "../config/constants";
import AnalysisBox from "../components/AnalysisBox";
import {AnimatePresence, MotiView} from "moti";
import ScrollableInfoModal from "../components/ScrollableInfoModal";
import {LinearGradient} from "expo-linear-gradient";
import {ButtonGradient} from "../libraries/UI_Component_Library";
const { width, height } = Dimensions.get('window');



const Home = ({navigation}) => {
    const [dateFormat, setDateFormat] = React.useState('DD/MM/YY');
    const [language, setLanguage] = React.useState('Türkçe');
    const [page, setPage] = React.useState(0);
    const totalPage= 2
    const totalItem= 4
    const [dropDownMenu, setDropDownMenu] = React.useState({data: [], desc: "", opened: false});
    const [isInfoModalVisible, setInfoModalVisible] = React.useState(false);
    const [infoModalData, setInfoModalData] = React.useState(UsageInstructions);
    const [isSettingsVisible, setSettingsVisible] = React.useState(false);

    const toggleInfoModal = (data) => {
        setInfoModalData(data)
        setInfoModalVisible(!isInfoModalVisible);
    };
    const toggleSettings = () => {
        setSettingsVisible(!isSettingsVisible);
    };

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
    const DropDownMenu = ({dropDownMenu, setFunc}) => {
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
                            style={{borderRadius: 25}}
                        >

                            <TouchableOpacity style={{
                                width: 90,
                                paddingVertical: 5,
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: COLORS.white,
                                borderRadius: 10
                            }} onPress={() => handlePress(x)}>
                                <Text style={{color: COLORS.white, fontSize: 14}}>{x}</Text>
                            </TouchableOpacity>
                        </MotiView>

                    )
                })
                }

            </View>
        )
    }
    const handlePageScroll = (x) => {
        console.log(x.nativeEvent.contentOffset)
        const pageNum = Math.round(x.nativeEvent.contentOffset.x/width)
        console.log(pageNum)
        setPage(pageNum)
    }

    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: COLORS.darkPurple,
                zIndex: 100,
                width: '90%',
                height: 80,
                padding: 10,
                borderRadius: 25,
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <View>
                    <View style={{zIndex: 90}}>
                        <TouchableOpacity
                            style={{flexDirection: 'row', alignItems: 'center', gap: 10, height: 30, paddingHorizontal: 5}}
                            onPress={handleLanguagePress}>
                            <Text style={{color: COLORS.white}}>{language} ▼</Text>
                            <Text style={{color: COLORS.white, opacity: 0.7, fontSize: 10}}>LANGUAGE</Text>
                        </TouchableOpacity>
                        <AnimatePresence>
                            {
                                (dropDownMenu.desc === "Language" && dropDownMenu.opened) &&
                                <DropDownMenu dropDownMenu={dropDownMenu} setFunc={setLanguage}/>
                            }
                        </AnimatePresence>
                    </View>

                    <View style={{zIndex: 80}}>
                        <TouchableOpacity
                            style={{flexDirection: 'row', alignItems: 'center', gap: 10, height: 30, paddingHorizontal: 5}}
                            onPress={handleDateFormatPress}>
                            <Text style={{color: COLORS.white}}>{dateFormat} ▼</Text>
                            <Text style={{color: COLORS.white, opacity: 0.7, fontSize: 10}}>DATE FORMAT</Text>
                        </TouchableOpacity>
                        <AnimatePresence>
                            {
                                (dropDownMenu.desc === "DateFormat" && dropDownMenu.opened) &&
                                <DropDownMenu dropDownMenu={dropDownMenu} setFunc={setDateFormat}/>
                            }
                        </AnimatePresence>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={toggleSettings}><Text style={{color: 'white'}}>Settings</Text></TouchableOpacity>
                </View>

            </View>
            <View style={{ flexDirection: 'row'}}>
                {
                    ['Message Analysis','Explore'].map((x, index) => {
                        return (
                            <MotiView
                                key={index}
                                transition={{delay:0, damping: 15, mass: 1}}

                                animate={{
                                    scale: page === index ? 1 : 0.8,
                                    opacity:  page === index ? 1 : 0.5,

                                }}
                                style={{width: width/totalPage, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5}}>
                                <Text style={{color: 'white', textAlign: 'center'}}>{x}</Text>
                            </MotiView>
                        )
                    })
                }
            </View>
            <View style={{width: '100%', height: 3, marginVertical: 10, backgroundColor: COLORS.darkPurple}}>
                <MotiView
                    transition={{delay:0, damping: 15, mass: 1}}
                    from={{
                        left: 0,

                    }}
                    animate={{
                        left: width/totalPage*page,

                    }}
                    exit={{
                        left: width/totalPage*page,


                    }}
                style={{width: width/totalPage, height: '100%', backgroundColor: COLORS.white}}>

                </MotiView>
            </View>
            <ScrollView pagingEnabled={true} horizontal={true}
                        scrollEventThrottle={16}
                        onMomentumScrollEnd={(x) => handlePageScroll(x)}>
                <View style={{width: width}}>
                    <AnalysisBox position={'left'} colors={[COLORS.green, COLORS.lightGreen]}
                                 title={'Message Analysis Simple'}
                                 description={'Total messaging statistics for each sender.Most used words, emojis and more...'}
                                 navigation={navigation} id={'simple'} dateFormat={dateFormat}/>
                    <AnalysisBox position={'right'} colors={[COLORS.purple, COLORS.white]}
                                 title={'Message Analysis Advanced '}
                                 description={'Messaging statistics by months and days for each sender. See the message statistics for the day you want'}
                                 navigation={navigation} id={'advanced'} dateFormat={dateFormat}/>
                    <AnalysisBox position={'left'} colors={[COLORS.babyCyan, COLORS.deneme]}
                                 title={'Message Analysis Visualized'}
                                 description={'Visualize messaging activities over time for better recall.'}
                                 navigation={navigation} id={'visualized'} dateFormat={dateFormat}/>
                </View>
                <View style={{width: width}}>
                    <ScrollView>
                    <Text style={{color: 'white'}}>1</Text>
                    <View style={{gap: 15, alignItems: 'center'}}>
                        <ButtonGradient title={'Step-By-Step How To Use?'} color={[COLORS.red, COLORS.red]} buttonStyle={{width: '90%'}} textStyle={{fontSize: 16,  fontWeight: '600', color: 'white'}} onPress={() => toggleInfoModal(UsageInstructions)}/>
                        <ButtonGradient title={'Learn About Security'} color={[COLORS.darkPurple, COLORS.darkPurple]} buttonStyle={{width: '90%'}} textStyle={{fontSize: 16,  fontWeight: '600', color: 'white'}} onPress={() => toggleInfoModal(UsageSecurity)}/>
                    </View>
                    </ScrollView>
                </View>


            </ScrollView>
           <ScrollableInfoModal data={infoModalData} isVisible={isInfoModalVisible} setVisible={setInfoModalVisible}/>



{/*/////////////////////TOGGLE SETTINGS*/}

            <MotiView
                transition={{delay:0, damping: 15, mass: 1}}
                from={{
                    bottom: 0,

                }}
                animate={{
                    bottom: isSettingsVisible ? -20 : -200,

                }}
                exit={{
                    bottom: 0,


                }}
                style={{ backgroundColor: COLORS.darkPurple, height: 270, width: '100%', position: 'absolute' }}>
                <Text>Bottom Sheet Content</Text>
                <TouchableOpacity onPress={toggleSettings}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </MotiView>
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
