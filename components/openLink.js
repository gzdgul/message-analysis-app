import React from 'react';
import { TouchableOpacity, Text, Linking } from 'react-native';
import {COLORS} from "../config/constants";

const OpenLink = ({url, title}) => {
    const openURL = (url) => {
        Linking.openURL(url);
    };

    return (
        <TouchableOpacity onPress={() => openURL(url)}>
            <Text style={{color: COLORS.lightBlue}}>{title}</Text>
        </TouchableOpacity>
    );
};

export default OpenLink;