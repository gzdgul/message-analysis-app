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
import {AboutUs, AnalysisMethods, COLORS, UsageInstructions, UsageSecurity} from "../config/constants";
import AnalysisBox from "../components/AnalysisBox";
import {AnimatePresence, MotiView} from "moti";
import ScrollableInfoModal from "../components/ScrollableInfoModal";
import {LinearGradient} from "expo-linear-gradient";
import {ButtonGradient} from "../libraries/UI_Component_Library";
import OpenLink from "../components/openLink";
import {findAnalysis, parseData, pickDocument, readFileContent} from "../libraries/Helper_Function_Library";

const {width, height} = Dimensions.get('window');
const innerWidth = width - 30


const Home = ({navigation}) => {
    const [selectedAnalysis, setSelectedAnalysis] = React.useState(null)
    const [dateFormat, setDateFormat] = React.useState('DD/MM/YY');
    const [language, setLanguage] = React.useState('Türkçe');
    const [page, setPage] = React.useState(0);
    const totalPage = 2
    const totalItem = 4
    const [isInfoModalVisible, setInfoModalVisible] = React.useState(false);
    const [infoModalData, setInfoModalData] = React.useState(UsageInstructions);
    const [isSettingsVisible, setSettingsVisible] = React.useState(false);
    const [fileUri, setFileUri] = React.useState('')
    const handlePickDocument = async () => {
        const fileUri = await pickDocument()
        if (fileUri !== undefined) {
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', fileUri)
            setFileUri(fileUri)
        }
    }
    const handleStartPress = async (id,color) => {
        if (fileUri) {
            if (selectedAnalysis) {
                Alert.alert('☁️', 'You have analysis in progress, please wait a moment')
                return;
            }
            // setCircleText('Analyzing...')
            setSelectedAnalysis({id: id, color: color});
            console.log('STARTEDDDDDDDDDDDDDDDDDDDDDDDD')

            const fileContent = await readFileContent(fileUri, dateFormat)
            if (fileContent === null) {
                setSelectedAnalysis(null);
                // setCircleText('START')
                Alert.alert('Oops..', 'The date format seems to be incorrect. please check👆')
                return;
            }
            const {
                longestMessage,
                activeDays,
                mostRepeatedWordsAndSenders,
                mostUsedEmojisAndSenders,
                dataObjsByDate,
                allSendings,

            } = await findAnalysis(fileContent);
            setTimeout(() => {
                navigation.navigate('Analysis', {
                    analyzedData: {
                        longestMessage,
                        activeDays,
                        mostRepeatedWordsAndSenders,
                        mostUsedEmojisAndSenders,
                        allSendings,
                        dataObjsByDate,
                        id
                    }
                });

                // setCircleText('START')
            }, 5000)
            setTimeout(() => {
                setSelectedAnalysis(null);
            }, 6000)
        } else Alert.alert('Geçerli bir dosya giriniz')
    }
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
            <View style={{width: width, height: height * 40 / 100, paddingTop: 60, justifyContent: 'space-between'}}>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                }}>
                    <View style={{opacity: 0.5}}>
                        <Text style={{
                            color: COLORS.white,
                            fontSize: 11
                        }}>Language: {language === 'Türkçe' ? 'TR' : 'EN'} Date Format :{dateFormat}</Text>
                    </View>
                    <TouchableOpacity
                        style={{padding: 15, borderRadius: 15, backgroundColor: COLORS.stone, zIndex: 100,}}
                        onPress={toggleSettings}>
                        <Image
                            source={require('../assets/settings_icon.png')}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{width: width, alignItems: 'center', gap: 15, justifyContent: 'flex-end'}}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={{
                            width: 170,
                            height: 'auto',
                            aspectRatio: 147 / 50,
                            tintColor: COLORS.white
                        }}
                    />
                    <View style={{gap: 10, alignItems: 'center', marginTop: 5}}>
                        <TouchableOpacity style={{
                            backgroundColor: COLORS.stone,
                            width: 170,
                            height: 35,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: COLORS.white, fontSize: 15}} onPress={handlePickDocument}>Select Doc</Text>
                        </TouchableOpacity>
                        <Text style={{color: COLORS.white, fontSize: 12, opacity: 0.5}}>Selected Document: _chat </Text>
                    </View>
                </View>

                {/*<TouchableOpacity style={[styles.button, {backgroundColor: COLORS.darkPurple}]} onPress={() => handleStartPress("simple")}>*/}
                {/*    <Text style={styles.buttonText}>Start</Text>*/}
                {/*</TouchableOpacity>*/}


            </View>
            <View style={{marginVertical: 20, width: width, paddingHorizontal: 15}}>
                <View style={{flexDirection: 'row'}}>
                    {
                        ['Message Analysis', 'Explore'].map((x, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => scrollToPage(index)}>
                                    <MotiView

                                        transition={{delay: 0, damping: 15, mass: 1}}

                                        animate={{
                                            scale: page === index ? 1 : 0.8,
                                            opacity: page === index ? 1 : 0.5,

                                        }}
                                        style={{
                                            width: innerWidth / totalPage,
                                        }}>

                                        <Text style={{
                                            color: COLORS.white,
                                            fontSize: 15,
                                            textAlign: totalPage === 2 ? (index === 0 ? 'left' : 'right') : 'center'
                                        }}>{x}</Text>


                                    </MotiView>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={{
                    width: innerWidth,
                    height: 4,
                    borderRadius: 50,
                    marginVertical: 10,
                    backgroundColor: COLORS.stone
                }}>
                    <MotiView
                        transition={{delay: 0, damping: 15, mass: 1}}
                        from={{
                            left: 0,

                        }}
                        animate={{
                            left: innerWidth / totalPage * page,

                        }}
                        exit={{
                            left: innerWidth / totalPage * page,


                        }}
                        style={{
                            width: innerWidth / totalPage,
                            height: '100%',
                            borderRadius: 50,
                            backgroundColor: COLORS.white
                        }}>

                    </MotiView>
                </View>
            </View>
            <ScrollView
                ref={scrollViewRef}
                pagingEnabled={true}
                horizontal={true}
                scrollEventThrottle={16}
                onMomentumScrollEnd={(x) => handlePageScroll(x)}>
                <View style={{width: width}}>
                    <ScrollView>
                        {/*{*/}
                        {/*    AnalysisMethods.map((x, index) => {*/}
                        {/*        return (*/}
                        {/*            <AnalysisBox key={index}*/}
                        {/*                         id={x.id}*/}
                        {/*                         position={index % 2 === 0 ? 'left' : 'right'}*/}
                        {/*                         colors={x.colors}*/}
                        {/*                         title={x.title}*/}
                        {/*                         description={x.description}*/}
                        {/*                         navigation={navigation}*/}
                        {/*                         dateFormat={dateFormat}*/}
                        {/*                         selectedAnalysis={selectedAnalysis}*/}
                        {/*                         setSelectedAnalysis={setSelectedAnalysis}/>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}
                        {/*<TouchableOpacity style={{flex: 1, height: 40, backgroundColor: COLORS.stone,borderRadius: 15, marginVertical: 15, marginHorizontal: 15, justifyContent: 'center', alignItems: 'center'}} onPress={handlePickDocument}>*/}
                        {/*    <Text style={styles.buttonText}>Select Document</Text>*/}
                        {/*</TouchableOpacity>*/}
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 15, paddingHorizontal: 15}}>

                            {
                                AnalysisMethods.map((x, index) => {
                                    return (
                                        <TouchableOpacity  key={index} onPress={() => handleStartPress(x.id, x.color)}>
                                        <MotiView
                                            animate={{
                                                borderRadius: selectedAnalysis?.id === x.id ? 100 : 35,
                                                transform: [{ rotate: selectedAnalysis?.id === x.id ? '360deg' : '0deg' }]
                                            }}
                                            style={{
                                                width: (innerWidth / 2) - 8,
                                                height: (innerWidth / 2) - 8,
                                                backgroundColor: x.color,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <MotiView
                                                animate={{
                                                    borderRadius: selectedAnalysis?.id === x.id ? 100 : 30,
                                                }}
                                                style={{
                                                width: '90%',
                                                height: '90%',
                                                borderRadius: 30,
                                                backgroundColor: COLORS.darkBG,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Text style={{color: COLORS.white, fontSize: 12}}>Message
                                                    Analysis</Text>
                                                <Text style={{
                                                    color: x.color,
                                                    fontSize: 22,
                                                    fontWeight: '600'
                                                }}>{selectedAnalysis?.id === x.id ? 'Started' : x.title}</Text>
                                            </MotiView>
                                        </MotiView>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            <View style={{
                                width: (innerWidth / 2) - 8,
                                height: 0,
                                aspectRatio: 1,
                                borderRadius: 35,
                                gap: 20,
                            }}>
                                {
                                    [1,2,3,4,5].map((x, index) => {
                                        return (
                                            <MotiView
                                                key={index}
                                                transition={{
                                                    delay: index*1000
                                                }}

                                                animate={{
                                                    backgroundColor: selectedAnalysis?.color ? selectedAnalysis.color :  COLORS.stone
                                                }}
                                                style={{
                                                width: '100%',
                                                flex: 1,
                                                borderRadius: 15
                                            }}></MotiView>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{width: width}}>
                    <ScrollView>
                        <View style={{gap: 15, alignItems: 'center',}}>
                            <ButtonGradient title={'Step-By-Step How To Use?'} color={[COLORS.white, COLORS.white]}
                                            buttonStyle={{width: innerWidth}}
                                            textStyle={{fontSize: 16, fontWeight: '600', color: COLORS.stone}}
                                            onPress={() => toggleInfoModal(UsageInstructions)}/>
                            <ButtonGradient title={'Learn About Security'}
                                            color={[COLORS.stone, COLORS.stone]}
                                            buttonStyle={{width: innerWidth}}
                                            textStyle={{fontSize: 16, fontWeight: '600', color: COLORS.white}}
                                            onPress={() => toggleInfoModal(UsageSecurity)}/>
                            {
                                AnalysisMethods.map((x, index) => {
                                    return (
                                        <View key={index} style={{
                                            flexDirection: 'row',
                                            width: innerWidth,
                                            gap: 15,
                                            alignItems: 'center'
                                        }}>
                                            <View

                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: 15,
                                                    backgroundColor: x.color,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <View style={{
                                                    width: '85%',
                                                    height: '85%',
                                                    borderRadius: 10,
                                                    backgroundColor: COLORS.darkBG,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{
                                                        color: x.color,
                                                        fontSize: 8,
                                                        fontWeight: '600'
                                                    }}>{x.title}</Text>
                                                </View>
                                            </View>
                                            <View style={{flex: 1}}>
                                                <Text style={{color: COLORS.white, fontSize: 13}}>{x.description}</Text>
                                            </View>
                                        </View>

                                    )
                                })
                            }

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
                    backgroundColor: COLORS.stone,
                    height: 270,
                    width: '100%',
                    position: 'absolute',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30
                }}>
                <View style={{gap: 20, paddingVertical: 20, paddingHorizontal: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{color: COLORS.white, fontSize: 13, fontWeight: 'bold'}}>SETTINGS</Text>
                        <TouchableOpacity onPress={toggleSettings}>
                            <Text style={{
                                color: COLORS.white,
                                fontSize: 11,
                                opacity: 0.6,
                                fontWeight: 'bold'
                            }}>CLOSE</Text>
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
                                        <Text style={{
                                            color: COLORS.white,
                                            fontSize: 13
                                        }}>{'Select Your ' + x.title}</Text>
                                        <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                                            {
                                                x.data.map((y, index) => {
                                                    return (
                                                        <TouchableOpacity key={index} style={{
                                                            flex: 1,
                                                            paddingVertical: 10,
                                                            backgroundColor: (dateFormat === y || language === y) ? COLORS.white : COLORS.darkBG,
                                                            borderRadius: 10,
                                                            alignItems: 'center'
                                                        }}
                                                                          onPress={() => handleOptionPress(y, x.title)}
                                                        >
                                                            <Text style={{color: (dateFormat === y || language === y) ? COLORS.darkBG : COLORS.white, fontSize: 13}}>{y}</Text>
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
        color: COLORS.white,
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
