import React, {useEffect} from 'react';
import {
    Alert,
    Button,
    Dimensions, Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity, TouchableWithoutFeedback,
    View
} from "react-native";
import {AboutUs, COLORS, UsageInstructions, UsageSecurity} from "../config/constants";
import AnalysisBox from "../components/AnalysisBox";
import {AnimatePresence, MotiView} from "moti";
import ScrollableInfoModal from "../components/ScrollableInfoModal";
import {LinearGradient} from "expo-linear-gradient";
import {ButtonGradient} from "../libraries/UI_Component_Library";
import OpenLink from "../components/openLink";
import {parseData} from "../libraries/Helper_Function_Library";

const {width, height} = Dimensions.get('window');


const Home = ({navigation}) => {
    const [dateFormat, setDateFormat] = React.useState('DD/MM/YY');
    const [language, setLanguage] = React.useState('Türkçe');
    const [page, setPage] = React.useState(0);
    const totalPage = 2
    const totalItem = 4
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

    const handlePageScroll = (x) => {
        console.log(x.nativeEvent.contentOffset)
        const pageNum = Math.round(x.nativeEvent.contentOffset.x / width)
        console.log(pageNum)
        setPage(pageNum)
    }
    // CONTROL DATE FORMAT
    // const handleDeneme = () => {
    //     const UNIVERSAL_DATE = "YY/MM/DD";
    //     const AMERICAN_DATE = "MM/DD/YY";
    //     const EUROPE_DATE = "DD/MM/YY";
    //
    //     const EUROPE =
    //         "[16.3.2023 PM 02:03:31] emily: selammmmm" +
    //         "\n[16/3/2023 PM 02:03:31] emily: selammmmm " +
    //         "\n[16-3-2023 PM 02:03:31] emily: selammmmm "
    //
    //     const AMERICAN =
    //         "[3.16.2023 PM 02:03:31] emily: selammmmm" +
    //         "\n[3/16/23 PM 02:03:31] emily: selammmmm " +
    //         "\n[3-16-2023 PM 02:03:31] emily: selammmmm "
    //     const UNIVERSAL =
    //         "[2023.3.16 PM 02:03:31] emily: selammmmm" +
    //         "\n[2023-3-16 PM 02:03:31] emily: selammmmm " +
    //         "\n[23/3/16 PM 02:03:31] emily: selammmmm "
    //
    //
    //     const fileContent = parseData(EUROPE,EUROPE_DATE);
    //     if (fileContent === null) {
    //         Alert.alert('Oops..','The date format seems to be incorrect. please check👆')
    //     }
    //     else console.log(fileContent)
    // }

    const scrollViewRef = React.useRef(null);
    const handleOptionPress = (option, type) => {
        if (type === 'Language') {
            setLanguage(option)
        }
        if (type === 'Date Format') {
            setDateFormat(option)
        }
    }
    //belirtilen sayfa numarasına kaydır
    const scrollToPage = (pageNumber) => {
        scrollViewRef.current.scrollTo({
            x: pageNumber * width,
            animated: true,
        });
    };
    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: COLORS.darkPurple,
                zIndex: 100,
                width: '100%',
                height: 100,
                // padding: 10,
                // borderRadius: 15,
                marginBottom: 20,
                // flexDirection: 'row',
                justifyContent: 'flex-end'


            }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',paddingHorizontal: 15, marginBottom: 15}}>


                <View style={{flexDirection: 'row', gap: 20,alignItems: 'center', opacity: 0.5}}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                            }}>
                            <Text style={{color: COLORS.white, fontSize: 13}}>Language :</Text>
                            <Text style={{color: COLORS.white,fontWeight: 'bold', fontSize: 13}}>{language === 'Türkçe' ? 'TR' : 'EN'}</Text>

                        </View>
                    </View>

                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,

                            }}>
                            <Text style={{color: COLORS.white, fontSize: 13}}>Date Format :</Text>
                            <Text style={{color: COLORS.white,fontWeight: 'bold', fontSize: 13}}>{dateFormat}</Text>

                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={toggleSettings}>
                        <Image
                            source={require('../assets/settings_icon.png')}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.red
                            }}
                        />
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                {
                    ['Message Analysis', 'Explore'].map((x, index) => {
                        return (
                            <MotiView
                                key={index}
                                transition={{delay: 0, damping: 15, mass: 1}}

                                animate={{
                                    scale: page === index ? 1 : 0.8,
                                    opacity: page === index ? 1 : 0.5,

                                }}
                                style={{
                                    width: width / totalPage,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 5
                                }}>
                                <TouchableOpacity onPress={() => scrollToPage(index)}>
                                    <Text style={{color: 'white', textAlign: 'center'}}>{x}</Text>
                                </TouchableOpacity>

                            </MotiView>
                        )
                    })
                }
            </View>
            <View style={{width: '100%', height: 3, marginVertical: 10, backgroundColor: COLORS.darkPurple}}>
                <MotiView
                    transition={{delay: 0, damping: 15, mass: 1}}
                    from={{
                        left: 0,

                    }}
                    animate={{
                        left: width / totalPage * page,

                    }}
                    exit={{
                        left: width / totalPage * page,


                    }}
                    style={{width: width / totalPage, height: '100%', backgroundColor: COLORS.white}}>

                </MotiView>
            </View>
            <ScrollView
                ref={scrollViewRef}
                pagingEnabled={true}
                horizontal={true}
                scrollEventThrottle={16}
                onMomentumScrollEnd={(x) => handlePageScroll(x)}>
                <View style={{width: width}}>
                    <ScrollView>
                        <AnalysisBox position={'left'} colors={[COLORS.green, COLORS.lightGreen]}
                                     title={'Message Analysis Simple'}
                                     description={'Total messaging statistics for each sender. Most used words, emojis and more...'}
                                     navigation={navigation} id={'simple'} dateFormat={dateFormat}/>
                        <AnalysisBox position={'right'} colors={[COLORS.purple, COLORS.white]}
                                     title={'Message Analysis Advanced '}
                                     description={'Messaging statistics by months and days for each sender. See the message statistics for the day you want.'}
                                     navigation={navigation} id={'advanced'} dateFormat={dateFormat}/>
                        <AnalysisBox position={'left'} colors={[COLORS.babyCyan, COLORS.deneme]}
                                     title={'Message Analysis Visualized'}
                                     description={'Visualize messaging activities over time for better recall.'}
                                     navigation={navigation} id={'visualized'} dateFormat={dateFormat}/>

                    </ScrollView>
                </View>
                <View style={{width: width}}>
                    <ScrollView>
                        <View style={{gap: 15, alignItems: 'center', marginVertical: 10}}>
                            <ButtonGradient title={'Step-By-Step How To Use?'} color={[COLORS.red, COLORS.red]}
                                            buttonStyle={{width: '90%'}}
                                            textStyle={{fontSize: 16, fontWeight: '600', color: 'white'}}
                                            onPress={() => toggleInfoModal(UsageInstructions)}/>
                            <ButtonGradient title={'Learn About Security'}
                                            color={[COLORS.darkPurple, COLORS.darkPurple]} buttonStyle={{width: '90%'}}
                                            textStyle={{fontSize: 16, fontWeight: '600', color: 'white'}}
                                            onPress={() => toggleInfoModal(UsageSecurity)}/>
                            <ButtonGradient title={'About Us'} color={[COLORS.darkPurple, COLORS.darkPurple]}
                                            buttonStyle={{width: '90%'}}
                                            textStyle={{fontSize: 16, fontWeight: '600', color: 'white'}}
                                            onPress={() => toggleInfoModal(AboutUs)}/>
                        </View>

                    </ScrollView>
                </View>


            </ScrollView>
            <ScrollableInfoModal data={infoModalData} isVisible={isInfoModalVisible} setVisible={setInfoModalVisible}/>


            {/*/////////////////////TOGGLE SETTINGS*/}
            <TouchableWithoutFeedback onPress={() => toggleSettings()}>
                <MotiView
                    transition={{delay: 0, damping: 15, mass: 1}}
                    animate={{
                        opacity: isSettingsVisible ? 1 : 0,

                    }}
                    style={{
                        width: width,
                        height: height,
                        position: 'absolute',
                        backgroundColor: COLORS.shadow,
                        pointerEvents: isSettingsVisible ? 'auto' : 'none'
                    }}>
                </MotiView>
            </TouchableWithoutFeedback>
            <MotiView
                transition={{delay: 0, damping: 15, mass: 1}}
                from={{
                    bottom: 0,

                }}
                animate={{
                    bottom: isSettingsVisible ? -20 : -270,

                }}
                exit={{
                    bottom: 0,


                }}
                style={{
                    backgroundColor: COLORS.darkPurple,
                    height: 270,
                    width: '100%',
                    position: 'absolute',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30
                }}>
                <View style={{gap: 20, paddingVertical: 20, paddingHorizontal: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{color: COLORS.red, fontSize: 13, fontWeight: 'bold'}}>SETTINGS</Text>
                        <TouchableOpacity onPress={toggleSettings}>
                            <Text style={{color: 'white', fontSize: 11, opacity: 0.6, fontWeight: 'bold'}}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        [{
                            data: ["DD/MM/YY", "MM/DD/YY", "YY/MM/DD"],
                            title: 'Date Format'
                        }, {data: ["Türkçe", "English"], title: 'Language'}].map((x, index) => {
                            return (
                                <View key={index}>
                                    <View style={{}}>
                                        <Text style={{color: 'white', fontSize: 13}}>{'Select Your ' + x.title}</Text>
                                        <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                                            {
                                                x.data.map((y, index) => {
                                                    return (
                                                        <TouchableOpacity key={index} style={{
                                                            flex: 1,
                                                            paddingVertical: 10,
                                                            backgroundColor: (dateFormat === y || language === y) ? COLORS.red : COLORS.darkBG,
                                                            borderRadius: 10,
                                                            alignItems: 'center'
                                                        }}
                                                                          onPress={() => handleOptionPress(y, x.title)}
                                                        >
                                                            <Text style={{color: 'white', fontSize: 13}}>{y}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                </View>

                            )
                        })
                    }
                </View>
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
        // paddingTop: 60,
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
