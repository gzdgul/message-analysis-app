import React from 'react';
import {Dimensions, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {MotiView} from "moti";
import {COLORS, translations} from "../config/constants";
const {width, height} = Dimensions.get('window');

function BottomSheet({isSettingsVisible, setSettingsVisible, title, modalHeight, bottomSheetContent, language}) {

    const toggleSettings = () => {
        setSettingsVisible(!isSettingsVisible);
    };
    return (
        <>
            <TouchableWithoutFeedback onPress={() => setSettingsVisible(false)}>
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
                        zIndex: 99,
                        pointerEvents: isSettingsVisible ? 'auto' : 'none'
                    }}>
                </MotiView>
            </TouchableWithoutFeedback>
            <MotiView
                transition={{delay: 0, damping: 15, mass: 1}}
                animate={{
                    bottom: isSettingsVisible ? -20 : -(modalHeight + 10),

                }}
                style={{
                    backgroundColor: COLORS.darkBG,
                    height: modalHeight,
                    width: '100%',
                    position: 'absolute',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    zIndex: 100,
                }}>
                <View style={{gap: 20, paddingVertical: 20, paddingHorizontal: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{color: COLORS.white, fontSize: 13, fontWeight: 'bold'}}>{title}</Text>
                        <TouchableOpacity onPress={toggleSettings}>
                            <Text style={{
                                color: COLORS.white,
                                fontSize: 11,
                                opacity: 0.6,
                                fontWeight: 'bold'
                            }}>{translations[language]["close"].toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                    {bottomSheetContent}
                </View>
            </MotiView>
        </>
    );
}

export default BottomSheet;