import {Platform} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export const pickDocument = async () => {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: Platform.OS === 'android' ? 'text/plain' : 'text/*', // Sadece metin dosyalarını filtrelemek için
        });

        if (result) {
            // Dosya seçildiyse
            console.log('Dosya URI:', result.assets[0].uri);
            return readFileContent(result.assets[0].uri);
        } else {
            // console.log(result);
            console.log('Dosya seçilmedi');
            return null;
        }
    } catch (error) {
        console.log('Hata:', error);
    }
};

const readFileContent = async (uri) => {
    try {
        const fileContent = await FileSystem.readAsStringAsync(uri);
        return parseData(fileContent)
    } catch (error) {
        console.log('Dosya okuma hatası:', error);
    }
};

const parseData = (data) => {
    const regex = /\[(.*?)\] (.*?): (.*)/g;
    const newData = [];
    let match;

    while ((match = regex.exec(data)) !== null) {
        const dateTime = match[1].split(' ');
        const date = dateTime[0];
        const time = dateTime[1];
        const name = match[2];
        const message = match[3];

        newData.push({ date, time, message, name });
    }

    return newData;
}