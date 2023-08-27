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
import {COLORS, icons, mediaTypes} from "../config/constants";
import {findMinCountKey} from "../libraries/Helper_Function_Library";
import {MotiView} from "moti";
import BottomSheet from "./bottomSheet";
import {FadeIn} from "react-native-reanimated";

const {width, height} = Dimensions.get('window');
const TimelineMessageAnalysis = ({analyzedData}) => {
    const AllMessages = analyzedData.messages
    const names = analyzedData.allSendings.nameCount
    const [selectedPerson, setSelectedPerson] = React.useState(null)
    const USER_ME = selectedPerson;
    const USER_YOU = [...names].filter((x) => x !== selectedPerson)[0];
    const scrollViewRef = useRef();
    const [isKeyboardOpen, setKeyboardOpen] = React.useState(false)
    const [newMessage, setNewMessage] = React.useState('')
    const [isMessageTyping, setMessageTyping] = React.useState(false)
    const [data, setData] = React.useState([])
    const [isSettingsVisible, setSettingsVisible] = React.useState(false);
    console.log('fgfdgdfgfdgdf',)
    React.useEffect(() => {
        if (newMessage.length === 1) {
            setMessageTyping(true)
        }
        if (newMessage.length === 0) {
            setMessageTyping(false)
        }

    }, [newMessage])
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
            setTimeout(() => {
                setData(prevState => [...prevState, data])
            }, 1000 * (index + 1))
        })

    }
    const onPersonChangeInSettings = (x) => {
        if (selectedPerson === x) {
            return;
        }
        if (data.length < 1) {
            setSelectedPerson(x)
            return;
        }
        setSelectedPerson(x)
        const informationTitle = `Kişi ${x} olarak değiştirildi`
        const newInformation = {type: "information", title: informationTitle}
        setData(prevState => [...prevState, newInformation])
    }

    const bottomSheetContent = () => {
        return (
            <View style={{
                gap: 15
            }}>
                <Text style={{color: COLORS.white}}>Kişi Değiştir</Text>
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
                <TouchableOpacity onPress={() => setData([])}>
                    <Text style={{color: COLORS.red, alignSelf: 'center'}}>Konuşmayı Sıfırla</Text>
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
                    <TouchableOpacity style={{padding: 10, backgroundColor: COLORS.stone, borderRadius: 15}} onPress={() => setSettingsVisible(!isSettingsVisible)}>
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
                    <Text style={{color: COLORS.stone, fontSize: 11, fontWeight: 'bold', textAlign: 'center'}}>The data
                        contained here cannot be associated with real life.</Text>
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
                                <Text style={{color: COLORS.white}}>Kim olduğunu seç</Text>
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
                                                    onPress={() => setSelectedPerson(x)}
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
                                <Text style={{color: COLORS.white, alignSelf: 'center'}}><Text
                                    style={{color: COLORS.deneme}}>{selectedPerson}</Text> olarak bir mesaj gönder 👇 😊
                                    🩷 </Text>
                            </MotiView>
                        </MotiView>
                    }


                    {
                        data.map((x, index) => {
                            console.log(x)
                            if (x.type === "information") {
                                return <Text style={{color: COLORS.deneme, fontSize: 12, fontStyle: "italic", alignSelf: 'center'}}>{x.title}</Text>
                            }
                            return (
                                <View key={index} style={{
                                    flexDirection: x.type === 'input' ? 'row-reverse' : 'row'
                                }}>
                                    <View style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 100,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: x.type === 'input' ? COLORS.ash : COLORS.deneme
                                    }}>
                                        <Text style={{
                                            fontSize: 17,
                                            fontWeight: 'bold'
                                        }}>{x.name.split('').shift().toUpperCase()}</Text>
                                    </View>
                                    <View style={{
                                        maxWidth: '60%',
                                        paddingHorizontal: 10,
                                        alignItems: x.type === 'input' ? 'flex-end' : 'flex-start'
                                    }}>
                                        <Text
                                            style={{color: x.type === 'input' ? COLORS.ash : COLORS.deneme}}>{x.name}</Text>
                                        {
                                            x.media !== null
                                                ? (
                                                    <View style={{
                                                        width: width / 3,
                                                        height: width / 3,
                                                        borderWidth: 4,
                                                        borderColor: COLORS.deneme,
                                                        borderRadius: 15,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginTop: 10
                                                    }}>
                                                        <Text style={{
                                                            color: COLORS.deneme,
                                                            fontSize: 13
                                                        }}>{icons[x.media]} {x.media}</Text>
                                                    </View>
                                                )
                                                : <Text style={{color: 'white'}}>{x.message}</Text>
                                        }

                                    </View>
                                </View>
                            )
                        })
                    }
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
                            onChangeText={(x) => setNewMessage(x)}
                            value={newMessage}
                            placeholder="type something..."
                            placeholderTextColor={COLORS.stone}
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
            <BottomSheet title={"CHAT SETTINGS"}
                         bottomSheetContent={bottomSheetContent()}
                         modalHeight={210}
                         isSettingsVisible={isSettingsVisible} setSettingsVisible={setSettingsVisible}/>
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
