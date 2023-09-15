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
import {
    AboutUs,
    AnalysisMethods, AnalysisMethodsByLanguage,
    COLORS, translations,
    UsageInstructionsData,
    UsageSecurityData
} from "../config/constants";
import {AnimatePresence, MotiView} from "moti";
import ScrollableInfoModal from "../components/ScrollableInfoModal";
import {LinearGradient} from "expo-linear-gradient";
import {ButtonGradient} from "../libraries/UI_Component_Library";
import OpenLink from "../components/openLink";
import {findAnalysis, parseData, pickDocument, readFileContent} from "../libraries/Helper_Function_Library";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
const innerWidth = width - 30


const Home = ({navigation, route}) => {
    // const language = route.params.language;
    // const dateFormat = route.params.language;
    const [selectedAnalysis, setSelectedAnalysis] = React.useState(null)
    const [dateFormat, setDateFormat] = React.useState('MM/DD/YY');
    const [language, setLanguage] = React.useState('EN');
    const [page, setPage] = React.useState(0);
    const totalPage = 2
    const totalItem = 4
    const [isInfoModalVisible, setInfoModalVisible] = React.useState(false);
    const [infoModalData, setInfoModalData] = React.useState(UsageInstructionsData[language]);
    const [isSettingsVisible, setSettingsVisible] = React.useState(false);
    const [fileUri, setFileUri] = React.useState('')
    const [fileName, setFileName] = React.useState('')


    React.useEffect(() => {
        if (route.params) {
            setLanguage(route.params?.language)
            setDateFormat(route.params?.dateFormat)
        }
    }, [route])

    const handlePickDocument = async () => {
        await Haptics.selectionAsync()
        const {fileUri, name} = await pickDocument()
        if (fileUri !== null) {
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', name)
            setFileUri(fileUri)
            setFileName(name)
        }
    }
    const handleStartPress = async (id, color) => {

        if (fileUri) {
            if (selectedAnalysis) {
                await Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Warning
                )
                Alert.alert('☁️', translations[language]["alerts"]["analysis_in_progress"])
                return;
            }
            // setCircleText('Analyzing...')
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            setSelectedAnalysis({id: id, color: color});
            console.log('STARTEDDDDDDDDDDDDDDDDDDDDDDDD')

            const fileContent = await readFileContent(fileUri, dateFormat)
            if (fileContent === null) {
                setSelectedAnalysis(null);
                // setCircleText('START')
                Alert.alert('Oops..', translations[language]["alerts"]["incorrect_format"])
                return;
            }
            const {
                messages,
                longestMessage,
                activeDays,
                mostRepeatedWordsAndSenders,
                mostUsedEmojisAndSenders,
                dataObjsByDate,
                allSendings,

            } = await findAnalysis(fileContent);
            if (allSendings.nameCount.length !== 2) {
                setSelectedAnalysis(null);
                // setCircleText('START')
                Alert.alert('Oops..', translations[language]["alerts"]["supports_two"])
                return;
            }
            setTimeout(() => {
                navigation.navigate('Analysis', {
                    analyzedData: {
                        messages,
                        longestMessage,
                        activeDays,
                        mostRepeatedWordsAndSenders,
                        mostUsedEmojisAndSenders,
                        allSendings,
                        dataObjsByDate,
                        id,
                        language
                    }
                });
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                )

                // setCircleText('START')
            }, 5000)
            setTimeout(() => {
                setSelectedAnalysis(null);
            }, 6000)
        } else Alert.alert(translations[language]["alerts"]["valid_file"] )
    }
    const toggleInfoModal = async (data) => {
        setInfoModalData(data)
        setInfoModalVisible(!isInfoModalVisible);
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    };
    const toggleSettings = async () => {
        if (selectedAnalysis) {
            return;
        }
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        setSettingsVisible(!isSettingsVisible);
    };

    const handlePageScroll = (x) => {
        console.log(x.nativeEvent.contentOffset)
        const pageNum = Math.round(x.nativeEvent.contentOffset.x / width)
        console.log(pageNum)
        setPage(pageNum)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
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
    const handleOptionPress = async (option, type) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        if (type === 'Language') {
            AsyncStorage.setItem('language', option).then(() => {
                setLanguage(option)
            })
        }
        if (type === 'Date Format') {
            AsyncStorage.setItem('dateFormat', option).then(() => {
                setDateFormat(option)
            })
        }
    }
    //belirtilen sayfa numarasına kaydır
    const scrollToPage = (pageNumber) => {
        scrollViewRef.current.scrollTo({
            x: pageNumber * width,
            animated: true,
        });
    };
    const fileClearPress = () => {
        setFileUri('')
        setFileName('')
        setSettingsVisible(false)
    }
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
                        }}>{translations[language]["language"] + ": " + language + " " + translations[language]["date_format"] + ": " + dateFormat}</Text>
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
                    <Pressable disabled={selectedAnalysis !== null}>
                        <MotiView
                            transition={{
                                type: 'timing',
                                delay: page === 1 ? 0 : 0,
                                duration: 500
                            }}
                            animate={{
                                top: page === 1 ? 20 : 0,
                                scale: page === 1 ? 1.1 : 1
                            }}
                        >
                            <MaskedView style={{}}
                                        maskElement={
                                            <Image
                                                source={require('../assets/logo.png')}
                                                style={{
                                                    width: 170,
                                                    height: 'auto',
                                                    aspectRatio: 801 / 276,
                                                    // tintColor: COLORS.white
                                                }}
                                            />
                                        }>

                                <Image
                                    source={require('../assets/logo.png')}
                                    style={{
                                        width: 170,
                                        height: 'auto',
                                        aspectRatio: 801 / 276,
                                        tintColor: COLORS.white
                                    }}
                                />

                                <MotiView
                                    transition={{
                                        type: 'timing',
                                        duration: selectedAnalysis?.id ? 5000 : 800
                                    }}
                                    animate={{
                                        top: selectedAnalysis?.id ? -180 : 0,
                                        backgroundColor: (isSettingsVisible) ? COLORS.stone : 'transparent'
                                    }}
                                    style={{position: 'absolute'}}>
                                    <LinearGradient
                                        colors={['transparent', COLORS.stone, selectedAnalysis?.color ? selectedAnalysis.color : COLORS.stone]}
                                        start={{x: 0, y: 0}}
                                        end={{x: 0, y: 1}}
                                        style={{
                                            // position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: 170,
                                            height: 240,
                                            aspectRatio: 801 / 276,
                                        }}
                                    />
                                </MotiView>
                            </MaskedView>
                        </MotiView>
                    </Pressable>
                    <MotiView
                        transition={{
                            type: 'timing',
                            duration: isSettingsVisible ? 300 : 800
                        }}
                        animate={{
                            scale: page === 1 ? 0 : isSettingsVisible ? 0.9 : 1,
                            opacity: isSettingsVisible ? 0.4 : 1
                        }}
                        style={{gap: 10, alignItems: 'center', marginTop: 5}}>
                        <TouchableOpacity disabled={page === 1 || selectedAnalysis !== null}
                                          onPress={handlePickDocument} style={{
                            backgroundColor: COLORS.stone,
                            width: 170,
                            height: 35,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: COLORS.white,
                                fontSize: 15
                            }}>{translations[language]['select_doc']}</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{
                                color: COLORS.white,
                                fontSize: 12,
                                opacity: 0.5
                            }}>{fileName.length > 0 ? translations[language]['selected_doc'] + ' : ' + fileName : translations[language]['no_file_selected']} </Text>
                            <Text style={{
                                color: fileName.length > 0 ? COLORS.green : COLORS.red,
                                fontSize: 12,
                                fontWeight: 'bold',
                                opacity: 0.5
                            }}>{fileName.length > 0 ? '✓' : 'x'}</Text>
                        </View>

                    </MotiView>
                </View>

                {/*<TouchableOpacity style={[styles.button, {backgroundColor: COLORS.darkPurple}]} onPress={() => handleStartPress("simple")}>*/}
                {/*    <Text style={styles.buttonText}>Start</Text>*/}
                {/*</TouchableOpacity>*/}


            </View>
            <View style={{marginTop: 20, width: width, paddingHorizontal: 15}}>
                <View style={{flexDirection: 'row'}}>
                    {
                        [translations[language]['message_analysis'], translations[language]['explore']].map((x, index) => {
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
                    marginTop: 10,
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
                    <ScrollView contentContainerStyle={{paddingVertical: 25}}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 15, paddingHorizontal: 15}}>

                            {
                                AnalysisMethodsByLanguage(language).map((x, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => handleStartPress(x.id, x.color)}>
                                            <MotiView
                                                transition={{
                                                    delay: selectedAnalysis?.id ? 0 : index * 100
                                                }}
                                                animate={{
                                                    scale: isSettingsVisible ? 0.9 : 1,
                                                    opacity: isSettingsVisible ? 0.4 : 1,
                                                    borderRadius: selectedAnalysis?.id === x.id ? 100 : 35,
                                                    transform: [{rotate: selectedAnalysis?.id === x.id ? '360deg' : '0deg'}]
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
                                                    transition={{
                                                        delay: selectedAnalysis?.id ? 0 : index * 100
                                                    }}
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
                                                    {
                                                        x.title === 'Chat'
                                                            ? <Image
                                                                source={require('../assets/logo_chat.png')}
                                                                style={{
                                                                    width: 90,
                                                                    height: 'auto',
                                                                    aspectRatio: 1200 / 492,
                                                                }}
                                                            />
                                                            : (
                                                                <>
                                                                    <Text style={{
                                                                        color: COLORS.white,
                                                                        fontSize: 12
                                                                    }}>{translations[language]['message_analysis']}</Text>
                                                                    <Text style={{
                                                                        color: x.color,
                                                                        fontSize: 22,
                                                                        fontWeight: '600'
                                                                    }}>{selectedAnalysis?.id === x.id ? translations[language]['started'] : translations[language][x.id]}</Text>
                                                                </>
                                                            )
                                                    }

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
                                    [1, 2, 3, 4, 5].map((x, index) => {
                                        return (
                                            <MotiView
                                                key={index}
                                                transition={{
                                                    delay: selectedAnalysis?.id ? index * 1000 : index * 100
                                                }}

                                                animate={{
                                                    backgroundColor: selectedAnalysis?.color ? selectedAnalysis.color : COLORS.stone,
                                                    scale: isSettingsVisible ? 0.9 : 1,
                                                    opacity: isSettingsVisible ? 0.4 : (1 / 5 * (index + 1)),
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
                    <ScrollView contentContainerStyle={{paddingVertical: 25}}>
                        <View style={{gap: 15, alignItems: 'center'}}>
                            {
                                [
                                    {
                                        title: translations[language]['step_by_step_how_to_use'],
                                        color: COLORS.white,
                                        textColor: COLORS.stone,
                                        data: UsageInstructionsData[language]
                                    },
                                    {
                                        title: translations[language]['learn_about_security'],
                                        color: COLORS.stone,
                                        textColor: COLORS.white,
                                        data: UsageSecurityData[language]
                                    },
                                ].map((x, index) => {
                                    return (
                                        <MotiView
                                            key={index}
                                            transition={{
                                                delay: index * 100
                                            }}
                                            animate={{
                                                scale: (isSettingsVisible || isInfoModalVisible) ? 0.9 : 1
                                            }}>
                                            <ButtonGradient title={x.title} color={[x.color, x.color]}
                                                            buttonStyle={{width: innerWidth}}
                                                            titleStyle={{
                                                                color: x.textColor
                                                            }}
                                                            onPress={() => toggleInfoModal(x.data)}/>
                                        </MotiView>
                                    )
                                })
                            }


                            {
                                AnalysisMethodsByLanguage(language).map((x, index) => {
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
            <ScrollableInfoModal data={infoModalData} isVisible={isInfoModalVisible} setVisible={setInfoModalVisible}
                                 language={language}/>


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
                    bottom: -280,

                }}
                animate={{
                    bottom: isSettingsVisible ? -20 : -280,

                }}
                exit={{
                    bottom: -280,


                }}
                style={{
                    backgroundColor: COLORS.darkBG,
                    height: 280,
                    width: '100%',
                    position: 'absolute',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30
                }}>
                <View style={{gap: 20, paddingVertical: 20, paddingHorizontal: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{
                            color: COLORS.white,
                            fontSize: 13,
                            fontWeight: 'bold'
                        }}>{translations[language]['settings'].toUpperCase()}</Text>
                        <TouchableOpacity onPress={toggleSettings}>
                            <Text style={{
                                color: COLORS.white,
                                fontSize: 11,
                                opacity: 0.6,
                                fontWeight: 'bold'
                            }}>{translations[language]['close'].toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        [
                            {data: ["DD/MM/YY", "MM/DD/YY", "YY/MM/DD"], title: 'Date Format'},
                            {data: ["TR", "EN"], title: 'Language'}
                        ].map((x, index) => {
                            return (
                                <View key={index}>
                                    <View style={{}}>
                                        <Text style={{
                                            color: COLORS.white,
                                            fontSize: 13
                                        }}>
                                            {x.title === 'Date Format'
                                                ? translations[language]['select_your_date_format']
                                                : translations[language]['select_your_language']}
                                        </Text>
                                        <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                                            {
                                                x.data.map((y, index) => {
                                                    return (
                                                        <TouchableOpacity key={index} style={{
                                                            flex: 1,
                                                            paddingVertical: 10,
                                                            backgroundColor: (dateFormat === y || language === y) ? COLORS.white : COLORS.stone,
                                                            borderRadius: 10,
                                                            alignItems: 'center'
                                                        }}
                                                                          onPress={() => handleOptionPress(y, x.title)}
                                                        >
                                                            <Text style={{
                                                                color: (dateFormat === y || language === y) ? COLORS.stone : COLORS.white,
                                                                fontSize: 13
                                                            }}>{y}</Text>
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
                    <TouchableOpacity>
                        <Text style={{color: COLORS.red, textAlign: 'center'}}
                              onPress={fileClearPress}>{translations[language]['clear_selected_document']}</Text>
                    </TouchableOpacity>

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
