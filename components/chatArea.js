import React from 'react';
import {Dimensions, Text, View} from "react-native";
import {COLORS, icons} from "../config/constants";
const {width, height} = Dimensions.get('window');

function ChatArea({data}) {
    return (
            data.map((x, index) => {
                console.log(x)
                if (x.type === "information") {
                    return <Text key={"info" + index} style={{color: COLORS.deneme, fontSize: 12, fontStyle: "italic", alignSelf: 'center'}}>{x.title}</Text>
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
    );
}

export default ChatArea;