import {Platform} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import emojiRegex from "emoji-regex";

const medya =
    [
        'görüntü dahil edilmedi','image not included',
        'video dahil edilmedi','video not included',
        'ses dahil edilmedi','audio not included',
        'belge dahil edilmedi','document not included',
        'gif dahil edilmedi',' gif not included',
        'çıkartma dahil edilmedi', 'sticker not included',
        'kişi kartı dahil edilmedi','contact card not included',
        'http',
        'bu mesajı sildiniz', 'deleted this message'

    ];
const mediaTypes = [
    { type: 'picture', keywords: [medya[0], medya[1]] },
    { type: 'video', keywords: [medya[2], medya[3]] },
    { type: 'audio', keywords: [medya[4], medya[5]] },
    { type: 'document', keywords: [medya[6], medya[7]] },
    { type: 'gif', keywords: [medya[8], medya[9]] },
    { type: 'sticker', keywords: [medya[10], medya[11]] },
    { type: 'link', keywords: [medya[14]] },
    { type: 'deleted', keywords: [medya[15], medya[16]] },
];

const missedCalls = [
    'cevapsız sesli arama', 'missed voice call',
    'cevapsız görüntülü arama', 'missed video call',
    'cevapsız sesli grup araması', 'missed group voice call',
    'cevapsız görüntülü grup araması', 'missed group video call',
]

//findAnalysis
export async function findAnalysis(messages) {
    const pictureCounts = {};
    const videoCounts = {};
    const audioCounts = {};
    const documentCounts = {};
    const gifCounts = {};
    const stickerCounts = {};
    const linkCounts = {};
    const missedCallCounts = {};
    const mostRepeatedWordsAndSendersObj = {};
    const emojiSenderCounts = {};
    let mostRepeatedWordsAndSenders = [];
    let mostUsedEmojisAndSenders = [];
    let longestMessage = {message: '', name: ''};
    let isFirstMessage = true;
    messages.forEach((messageObj) => {
        if (isFirstMessage) {
            isFirstMessage = false;
        } else {
            const message = messageObj.message.toLowerCase();
            const name = messageObj.name;
            if (!medya.some(item => message.includes(item)) && !missedCalls.some(item => message.includes(item)))
            {
                if (message.length > longestMessage.message.length) {
                    longestMessage = {message: message, name: name};
                }
            } else {
                for (const mediaType of mediaTypes) {
                    if (mediaType.keywords.some(keyword => message.includes(keyword))) {
                        switch (mediaType.type) {
                            case "picture":
                                pictureCounts[name] = (pictureCounts[name] || 0) + 1;
                                break;
                            case "video":
                                videoCounts[name] = (videoCounts[name] || 0) + 1;
                                break;
                            case "audio":
                                audioCounts[name] = (audioCounts[name] || 0) + 1;
                                break;
                            case "document":
                                documentCounts[name] = (documentCounts[name] || 0) + 1;
                                break;
                            case "gif":
                                gifCounts[name] = (gifCounts[name] || 0) + 1;
                                break;
                            case "sticker":
                                stickerCounts[name] = (stickerCounts[name] || 0) + 1;
                                break;
                            case "link":
                                linkCounts[name] = (linkCounts[name] || 0) + 1;
                                break;
                        }
                    }
                }
                if (missedCalls.some(item => message.includes(item))) {
                    missedCallCounts[messageObj.name] = (missedCallCounts[messageObj.name] || 0) + 1;
                }
            }
        }
    });

    const words = messages.reduce((allWords, messageObj) => {
        const message = messageObj.message.toLowerCase();
        if (!medya.some(item => message.includes(item)) && !missedCalls.some(item => message.includes(item))) {
            const messageWords = message.split(/\s+/); // Split message into words
            return allWords.concat(messageWords);
        } else {
            return allWords;
        }
    }, []);

    const wordCount = {};
    words.forEach((word) => {
        if (word.length > 1) {
            wordCount[word] = (wordCount[word] || 0) + 1;
        }
    });


    let mostRepeatedWords = [];
    for (const word in wordCount) {
        if (wordCount[word] > 1 && word.length > 1) {
            mostRepeatedWords.push({ word: word, count: wordCount[word] });
        }
    }

    mostRepeatedWords.sort((a, b) => b.count - a.count);
    mostRepeatedWords = mostRepeatedWords.slice(0, 10);

    const messageCounts = {};
    messages.forEach((messageObj) => {
        const name = messageObj.name;
        messageCounts[name] = (messageCounts[name] || 0) + 1;
    });

    let nameCount = [];
    for (const name in messageCounts) {
       nameCount.push(name);
    }

    const timeCount = { morning: 0, night: 0 };

    messages.forEach((messageObj) => {
        const time = Number(messageObj.time.split(':')[0]);

        if (time >= 6 && time < 18) {
            timeCount.morning++;
        } else {
            timeCount.night++;
        }
    });

    let messagingByTime = {morning: timeCount.morning, night: timeCount.night }

    const dateCount = {};
    messages.forEach((messageObj) => {
        const date = messageObj.date;
        dateCount[date] = (dateCount[date] || 0) + 1;
    });

    let mostRepeatedDate = "";
    let mostRepeatedDateCount = 0;
    for (const date in dateCount) {
        if (dateCount[date] > mostRepeatedDateCount) {
            mostRepeatedDateCount = dateCount[date];
            mostRepeatedDate = date;
        }
    }
    const allEmojisInMessageCount = {};
    const emojiCounts = {};

    messages.forEach((messageObj) => {
        const emojisInMessage = messageObj.message.match(emojiRegex());
        const name = messageObj.name;
        if (emojisInMessage) {
            emojisInMessage.forEach((emoji) => {
                allEmojisInMessageCount[emoji] = (allEmojisInMessageCount[emoji] || 0) + 1;
            });

            emojiCounts[name] = (emojiCounts[name] || 0) + emojisInMessage.length;
        }
    });

    let mostUsedEmojis = Object.keys(allEmojisInMessageCount)
        .sort((a, b) => allEmojisInMessageCount[b] - allEmojisInMessageCount[a])
        .slice(0, 5)
        .map((emoji) => ({
            emoji: emoji,
            count: allEmojisInMessageCount[emoji]
        }));

    messages.forEach((messageObj) => {
        const name = messageObj.name;
        const message = messageObj.message.toLowerCase();
        const emojisInMessage = messageObj.message.match(emojiRegex()) || [];


        mostRepeatedWords.forEach((wordObj) => {
            const word = wordObj.word.toLowerCase();
            const includeNumber = message.split(' ').map((y) => y === word).filter((x) => x === true).length
            mostRepeatedWordsAndSendersObj[word] = mostRepeatedWordsAndSendersObj[word] || {};
            mostRepeatedWordsAndSendersObj[word][name] = (mostRepeatedWordsAndSendersObj[word][name] || 0) + includeNumber;
        });
        mostUsedEmojis.forEach((emojiObj) => {
            const emoji = emojiObj.emoji
            const includeNumber = emojisInMessage.map((y) => y === emoji).filter((x) => x === true).length
            emojiSenderCounts[emoji] = emojiSenderCounts[emoji] || {};
            emojiSenderCounts[emoji][name] = (emojiSenderCounts[emoji][name] || 0) + includeNumber;
        });
    });
    for (const word in mostRepeatedWordsAndSendersObj) {
        mostRepeatedWordsAndSenders.push({ word: word, count: mostRepeatedWordsAndSendersObj[word] });
    }
    mostRepeatedWordsAndSenders.sort(compareCounts);
    for (const emoji in emojiSenderCounts) {
        mostUsedEmojisAndSenders.push({ emoji: emoji, count: emojiSenderCounts[emoji] });
    }
    mostUsedEmojisAndSenders.sort(compareCounts);

    return {
        longestMessage: longestMessage,
        mostRepeatedDate: mostRepeatedDate,
        messagingByTime: messagingByTime,
        mostRepeatedWordsAndSenders: mostRepeatedWordsAndSenders,
        mostUsedEmojisAndSenders: mostUsedEmojisAndSenders,
        allSendings: {messageCounts,pictureCounts,videoCounts,audioCounts,documentCounts,gifCounts,linkCounts,missedCallCounts,emojiCounts, stickerCounts, nameCount}
    };
}

//////////////////////////////////////////////////////////////////////////////////
export const pickDocument = async () => {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: Platform.OS === 'android' ? 'text/plain' : 'text/*', // Sadece metin dosyalarını filtrelemek için
        });

        if (result) {
            // Dosya seçildiyse
            return result.assets[0].uri;
        } else {
            console.log('Dosya seçilmedi');
            return null;
        }
    } catch (error) {
        console.log('Hata:', error);
    }
};

export const readFileContent = async (uri) => {
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
export const findMaxCountKey = (obj) => {
    let maxKey = null;
    let maxValue = -Infinity;

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'number' && obj[key] > maxValue) {
            maxKey = key;
            maxValue = obj[key];
        }
    }

    return maxKey;
}
export const sumCounts = (obj) => {
    let sum = 0;

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'number') {
            sum += obj[key];
        }
    }

    return sum;
}
function compareCounts(a, b) {
    const aToplam = Object.values(a.count).reduce((acc, curr) => acc + curr, 0);
    const bToplam = Object.values(b.count).reduce((acc, curr) => acc + curr, 0);

    return bToplam - aToplam;
}
