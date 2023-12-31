import React from 'react';
import {Dimensions, Image, Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {COLORS, translations} from "../config/constants";
import {MotiView} from "moti";
import OpenLink from "./openLink";

function ScrollableInfoModal({data,isVisible,setVisible, language}) {
    const [itemNum, setItemNum] = React.useState(0);
    const [itemContentOffset, setItemContentOffset] = React.useState(0);
    const { width, height } = Dimensions.get('window');
    const customWidth = data[0].type === 'UsageInstructions' ? width/1.5 : 150;
    const customHeight = data[0].type === 'UsageInstructions' ? height/1.7 : height/2;

    React.useEffect(() => {
        setItemNum(0)
        setItemContentOffset(0)
    },[isVisible])
    const handleItemScroll = (x) => {
        console.log(x.nativeEvent.contentOffset)
        const itemContentOffset = parseFloat((x.nativeEvent.contentOffset.x/width).toFixed(2))
        // const itemContentOffset = x.nativeEvent.contentOffset.x/width
        const itemNum = Math.round(itemContentOffset)

        // console.log(itemNum)
        // console.log(itemContentOffset)

        setItemNum(itemNum)
        setItemContentOffset(itemContentOffset)

    }
    return (
        <Modal
            animationType="slide"
            // transparent={false}
            presentationStyle={"pageSheet"}
            visible={isVisible}
            onRequestClose={() => {
                setVisible(!isVisible);
            }}
        >
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.darkBG }}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 15}}>
                    <View style={{width: width/3, height: 4, backgroundColor: COLORS.white, borderRadius: 100}}></View>
                    {/*<TouchableOpacity onPress={toggleBottomSheet}>*/}
                    {/*    <Text style={{color: 'white'}}>Close</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <View style={{alignItems: 'center', justifyContent:  'space-between'}}>
                    <View style={{width: '100%', alignItems: 'center', height: customHeight}}>
                        <ScrollView
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={100}
                            onScroll={(x) => handleItemScroll(x)}
                        >
                            {
                                data.map((x, index) => {
                                    const image = x.img;
                                    return (
                                        <MotiView
                                            key={index}
                                            animate={{
                                                scale: 1- Math.abs( itemContentOffset - index)/10,
                                                opacity:  1- Math.abs( itemContentOffset - index),
                                                marginTop: Math.abs( itemContentOffset - index)*50,
                                            }}
                                            style={{width: width, gap: 25, alignItems: 'center'}}>
                                            <View>
                                                <Image
                                                    source={image}
                                                    style={{
                                                        width: customWidth,
                                                        height: customWidth,
                                                    }}
                                                />
                                            </View>
                                            <View style={{width:  width/1.2, gap: 25, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{color: COLORS.white, fontSize: 17, fontWeight: 'bold', textAlign: 'center'}}>{x.title}</Text>
                                            <Text style={{color: COLORS.white, fontSize: 14, textAlign: 'center'}}>{x.desc}</Text>
                                                { x.url &&
                                                    x.url.map((y, index) => {
                                                        return (
                                                            <OpenLink key={index} title={y.title} url={y.url}/>
                                                        )
                                                    })

                                                }
                                            </View>
                                        </MotiView>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={{flexDirection: 'row', gap: 10}}>
                        {
                            data.map((x, index) => {
                                return (
                                    <MotiView
                                        key={index}
                                        animate={{
                                            backgroundColor: itemNum === index ? COLORS.white : COLORS.gray
                                        }}
                                        style={{width: 10, height: 10, backgroundColor: COLORS.white, borderRadius: 100}}>
                                    </MotiView>
                                )
                            })
                        }
                    </View>

                </View>

                <View style={{ backgroundColor: COLORS.darkBG,  width: '100%', height: 50 }}>
                    <View style={{paddingHorizontal: 15, opacity: 0.5, alignItems: 'center'}}>
                        <Text style={{color: COLORS.white, fontSize: 12}}>{translations[language]["swipe_left_for_next_item"]}</Text>
                        <Text style={{color: COLORS.white, fontSize: 12}}>{translations[language]["swipe_down_to_exit_the_information_screen"]}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default ScrollableInfoModal;