import React, {useRef} from 'react';
import {
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {COLORS, icons, mediaTypes, translations} from "../config/constants";
import {findMinCountKey} from "../libraries/Helper_Function_Library";
import {MotiView} from "moti";
import BottomSheet from "./bottomSheet";
import {FadeIn} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import ChatArea from "./chatArea";

const {width, height} = Dimensions.get('window');
const TimelineMessageAnalysis = ({analyzedData, language}) => {
    const AllMessages = analyzedData.messages
    const names = analyzedData.allSendings.nameCount
    const [selectedPerson, setSelectedPerson] = React.useState(null)
    const USER_ME = selectedPerson;
    const USER_YOU = [...names].filter((x) => x !== selectedPerson)[0];
    const scrollViewRef = useRef();
    const [isKeyboardOpen, setKeyboardOpen] = React.useState(false)
    const [newMessage, setNewMessage] = React.useState('')
    // const [isMessageTyping, setMessageTyping] = React.useState(false)
    const [data, setData] = React.useState([])
    const [isSettingsVisible, setSettingsVisible] = React.useState(false);
    const isMessageTyping = React.useMemo(() => newMessage.length > 0, [newMessage]);
    const filterByNameAndWord = (AllMessages, NAME, WORD) => {
        return AllMessages
            .filter((y) => y.name === NAME)
            .filter((z) => z.message
                ?.toLowerCase()
                .includes(WORD))
    }
    const handleDeneme = (message) => {
        let response = []
        const text = message.toLowerCase();
        if (!text.length > 0) {
            return;
        }
        // İçerisinde text geçen benim mesajı bul
        const textSplitted = text.split(' ').filter((a) => a !== "");
        textSplitted.push(text)
        let messageCounts = {}
        textSplitted.forEach((x) => {
            const aaa = filterByNameAndWord(AllMessages, USER_ME, x).length
            messageCounts[x] = (messageCounts[x] || 0) + aaa;
        })
        const minCount = findMinCountKey(messageCounts)
        console.log('min', minCount)
        console.log(messageCounts)
        console.log('************************************************************')
        const deneme = filterByNameAndWord(AllMessages, USER_ME, minCount)
        const randomNum = Math.floor(Math.random() * (deneme.length));
        const denemeIndex = AllMessages.findIndex((x) => x === deneme[randomNum])
        console.log(USER_ME, ' /// ', AllMessages[denemeIndex]?.message)

        // Benim mesajıma karşılık gelen mesajı bul
        let startIndex = denemeIndex; // Başlangıç indeksi
        let foundIndex = []; // Bulunan indeksleri sakla
        if (denemeIndex !== -1) {
            for (let i = startIndex; i < AllMessages.length; i++) {
                if (AllMessages[i].name === USER_YOU) {
                    foundIndex.push(i); // mesajın indekslerini pushla
                } else if (foundIndex.length > 0) {
                    break;
                }
            }
            console.log(foundIndex)
            response = foundIndex.map((x) => {
                return AllMessages[x]?.message
            })
        } else response = ["bu konu hakkında bilgim yok 😞"]
        return response;
    }

    const handleSendButtonPress = () => {
        if (!(newMessage.length > 0)) {
            return;
        }
        setData(prevState => [...prevState, {name: USER_ME, message: newMessage, type: 'input', media: null}])
        const response = handleDeneme(newMessage)
        console.log('!!!!!!!!!!!!!!!!!!!!!!!', response)
        setNewMessage('')
        response.forEach((x, index) => {
            let data = {name: USER_YOU, message: x, type: 'response', media: null}
            for (const mediaType of mediaTypes) {
                if (mediaType.keywords.some(keyword => x.includes(keyword))) {
                    if (mediaType.type === 'link') {
                        if (x.toLowerCase().includes("konum")) {
                            data.media = 'location';
                        } else data.media = null;
                    } else data.media = mediaType.type;
                }
            }
            setTimeout(async () => {
                setData(prevState => [...prevState, data])
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            }, 1000 * (index + 1))
        })

    }
    const onPersonChangeInSettings = async (x) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        if (selectedPerson === x) {
            return;
        }
        if (data.length < 1) {
            setSelectedPerson(x)
            return;
        }
        setSelectedPerson(x)
        const informationTitle = language === 'TR' ? `Kişi ${x} olarak değiştirildi`: `Person changed to ${x}`
        const newInformation = {type: "information", title: informationTitle}
        setData(prevState => [...prevState, newInformation])
    }

    const handleTextChange = (text) => {
        // Her karakter girişinde bu işlev tetiklenecek
        setNewMessage(text);
    };
    const bottomSheetContent = () => {
        return (
            <View style={{
                gap: 15
            }}>
                <Text style={{color: COLORS.white}}>{translations[language]["change_person"]}</Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                    {
                        [...names].map((x, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        flex: 1,
                                        backgroundColor: selectedPerson === x ? COLORS.deneme : COLORS.stone,
                                        height: 40,
                                        borderRadius: 15,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={() => onPersonChangeInSettings(x)}
                                >
                                    <Text style={{fontWeight: 'bold', color: COLORS.white}}>{x}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <TouchableOpacity onPress={ async()  => {
                    setData([])
                    await Haptics.notificationAsync(
                        Haptics.NotificationFeedbackType.Success
                    )
                }}>
                    <Text style={{color: COLORS.red, alignSelf: 'center'}}>{translations[language]["reset_conversation"]}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>


            <View style={styles.header}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Image
                            source={require('../assets/logo_chat.png')}
                            style={{
                                width: 100,
                                height: 'auto',
                                aspectRatio: 1200 / 492,
                            }}
                        />
                    </View>
                    <TouchableOpacity style={{padding: 10, backgroundColor: COLORS.stone, borderRadius: 15}} onPress={ async () => {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                        Keyboard.dismiss()
                        setSettingsVisible(!isSettingsVisible)
                    }}>
                        <Image
                            source={require('../assets/settings_icon.png')}
                            style={{
                                width: 25,
                                height: 'auto',
                                aspectRatio: 1,
                                tintColor: COLORS.white,

                            }}/>
                    </TouchableOpacity>
                </View>
                <View style={{
                    width: '100%',
                    height: 5,
                    backgroundColor: COLORS.stone,
                    borderRadius: 50,
                    marginTop: 10,
                }}></View>
                <View style={{position: 'absolute', width: width, bottom: -20}}>
                    <Text style={{color: COLORS.stone, fontSize: 11, fontWeight: 'bold', textAlign: 'center'}}>
                        {translations[language]["chat_desc"]}
                    </Text>
                </View>

            </View>


            <View style={styles.main}>
                <ScrollView ref={scrollViewRef}
                            keyboardShouldPersistTaps="handled"
                            onContentSizeChange={(x, y) => {
                                scrollViewRef.current.scrollTo({
                                    x: 0,
                                    y: y,
                                    animated: true
                                })
                            }}
                            contentContainerStyle={{paddingHorizontal: 15, gap: 15, paddingTop: 30, paddingBottom: 20}}
                >
                    {
                        !(data.length > 0) &&
                        <MotiView
                        from={{
                            opacity: 0,
                            scale: 0.8
                        }}
                        animate={{
                            opacity: isSettingsVisible ? 0 : 1,
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8
                        }}
                        >
                            <View style={{
                                width: '100%',
                                paddingVertical: 15,
                                backgroundColor: COLORS.stone,
                                borderRadius: 15,
                                alignItems: 'center',
                                gap: 15
                            }}>
                                <Text style={{color: COLORS.white}}>{translations[language]["choose_who_you_are"]}</Text>
                                <View style={{flexDirection: 'row', gap: 10, paddingHorizontal: 10}}>
                                    {
                                        [...names].map((x, index) => {
                                            return (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={{
                                                        flex: 1,
                                                        backgroundColor: selectedPerson === x ? COLORS.deneme : COLORS.darkBG,
                                                        height: 40,
                                                        borderRadius: 15,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                    onPress={ async () => {
                                                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                                                        setSelectedPerson(x)
                                                    }}
                                                >
                                                    <Text style={{fontWeight: 'bold', color: COLORS.white}}>{x}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            <MotiView
                                key={selectedPerson}
                                from={{
                                    opacity: 0,
                                    top: 0
                                }}
                                animate={{
                                    // scale: selectedPerson ? 1 : 0.8,
                                    opacity: selectedPerson ? 1 : 0,
                                    top: selectedPerson ? 10 : 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    top: 0
                                }}
                            >
                                <View>
                                    {
                                        language === "TR"
                                            ? <Text style={{color: COLORS.white, alignSelf: 'center'}}><Text style={{color: COLORS.deneme}}>{selectedPerson}</Text> olarak bir mesaj gönder 👇 😊 🩷 </Text>
                                            : <Text style={{color: COLORS.white, alignSelf: 'center'}}> Send a message as <Text style={{color: COLORS.deneme}}>{selectedPerson}</Text> 👇 😊 🩷 </Text>
                                    }

                                </View>
                            </MotiView>
                        </MotiView>
                    }


                   <ChatArea data={data}/>
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <View style={{flexDirection: 'row', flex: 1, gap: 10, marginTop: 10}}>

                    <MotiView
                        animate={{
                            width: isMessageTyping ? (width - 45 - 30 - 10) : width - 30
                        }}
                        style={{}}>
                        <TextInput
                            style={{
                                width: '100%',
                                height: 45,
                                borderRadius: 15,
                                backgroundColor: COLORS.darkBG,
                                color: COLORS.white,
                                paddingHorizontal: 15,
                            }}
                            onChangeText={handleTextChange}
                            value={newMessage}
                            // onContentSizeChange={(x) => console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',x)}
                            // onEndEditing={(x) => console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',x)}
                            placeholder={translations[language]["type_something"]}
                            placeholderTextColor={COLORS.ash}
                            keyboardAppearance="dark"
                            editable={selectedPerson !== null}
                        />
                    </MotiView>
                    <TouchableOpacity onPress={() => handleSendButtonPress()}>
                        <MotiView
                            animate={{
                                scale: isMessageTyping ? 1 : 0,
                                opacity: isMessageTyping ? 1 : 0,
                            }}
                            style={{
                                padding: 10,
                                backgroundColor: COLORS.deneme,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >

                            <Image
                                source={require('../assets/arrow_right.png')}
                                style={{
                                    width: 25,
                                    height: 'auto',
                                    aspectRatio: 1,
                                    tintColor: COLORS.white,

                                }}/>

                        </MotiView>
                    </TouchableOpacity>
                </View>


            </View>


            <MotiView
                transition={{delay: 0, damping: 15, mass: 1}}
                animate={{
                    opacity: isKeyboardOpen ? 1 : 0,

                }}
                style={{
                    width: width,
                    height: height,
                    position: 'absolute',
                    backgroundColor: COLORS.shadow,
                    pointerEvents: isKeyboardOpen ? 'auto' : 'none'
                }}>
            </MotiView>
            <BottomSheet title={translations[language]["chat_settings"].toUpperCase()}
                         bottomSheetContent={bottomSheetContent()}
                         modalHeight={210}
                         isSettingsVisible={isSettingsVisible} setSettingsVisible={setSettingsVisible} language={language}/>
        </KeyboardAvoidingView>
    );
};

export default TimelineMessageAnalysis;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red'
    },
    header: {
        // backgroundColor: 'green',
        // flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 15,
        height: 80,
        zIndex: 2
    },
    main: {
        flex: 6,
        width: width,
        // backgroundColor: 'pink',
        zIndex: 1

    },
    footer: {
        flex: 1,
        // flexDirection: 'row',
        // alignItems: 'center',
        // paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 10,
        backgroundColor: COLORS.stone

    },
    textStyle: {
        color: COLORS.white,
        fontSize: 17
    },
});
