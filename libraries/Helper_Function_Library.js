import {COLORS, mediaTypes, medya, missedCalls} from "../config/constants";
import emojiRegex from "emoji-regex";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import {Platform} from "react-native";

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

        newData.push({date, time, message, name});
    }

    return newData;
}

export const findMaxCountKey = (obj) => {
    let maxKey = null;
    let maxValue = -Infinity;

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'number') {
            if (obj[key] > maxValue) {
                maxKey = key;
                maxValue = obj[key];
            }
        } else {
            if (obj[key].length > maxValue) {
                maxKey = key;
                maxValue = obj[key].length;
            }
        }
    }
    return maxKey;
}

export const colorCorrector = (data, i, titleArr) => {
    if (findMaxCountKey(data) === titleArr[i]) {
        return {
            backgroundColor: COLORS.lightGreen,
            color: COLORS.darkPurple,
        }
    } else return null;
}
export const colorCorrector2 = (data, i, titleArr) => {
    if ((findMaxCountKey(data) === titleArr[i])) {
        return {
            backgroundColor: COLORS.lightPurple,
            color: COLORS.darkPurple,
        }
    } else return null;
}

export function findMaxCount(data) {
    let maxCount = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].count > maxCount) {
            maxCount = data[i].count;
        }
    }
    return maxCount;
}

function compareCounts(a, b) {
    const aToplam = Object.values(a.count).reduce((acc, curr) => acc + curr, 0);
    const bToplam = Object.values(b.count).reduce((acc, curr) => acc + curr, 0);

    return bToplam - aToplam;
}

export const sumCounts = (obj) => {
    let sum = 0;

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'number') {
            sum += obj[key];
        } else {
            sum += obj[key].length;
        }
    }

    return sum;
}

export const countArray = (key, patch, dataset, names) => {

    if (patch) {
        return {
            [names[0]]: dataset[names[0]][key].filter(item => item === patch).length,
            [names[1]]: dataset[names[1]][key].filter(item => item === patch).length
        }
    } else {
        return {
            [names[0]]: dataset[names[0]][key],
            [names[1]]: dataset[names[1]][key]
        }
    }
}

export const groupDataByMonths = (dataObjsByDate) => {
    // Verileri tarihlerine göre gruplamak için boş bir nesne oluşturuyoruz
    let groupedData = {};
    // Veriler dizisini tarihlerine göre gruplayan bir döngü
    dataObjsByDate.forEach(veri => {
        const [day, month, year] = veri.date.split('.');
        const date = `**.${month}.${year}`;

        groupedData[date] = groupedData[date] || [];
        groupedData[date].push(veri);
    });
    return Object.values(groupedData)
}

//findAnalysis
export async function findAnalysis(messages) {
    const mediaCounts = {};
    const stickerCounts = {};
    const missedCallCounts = {};
    const wordCount = {}
    const messageCounts = {};
    const wordCountsByUsers = {};
    const emojiCountsByUsers = {};
    const emojiCounts = {};
    const dateCount = {};
    const timeCount = {morning: 0, night: 0};
    const isIncludesMedia = (x) => medya.some(item => x.includes(item)) || missedCalls.some(item => x.includes(item))

    let longestMessage = {message: '', name: ''};
    messages.shift();
    messages.forEach((messageObj) => {
        const message = messageObj.message.toLowerCase();
        const name = messageObj.name;
        const includesMedia = isIncludesMedia(message)
        const emojisInMessage = messageObj.message.match(emojiRegex());

        // Finding the distribution of messages by person
        messageCounts[name] = (messageCounts[name] || 0) + 1;

        // Finding the distribution of emojis by person
        if (emojisInMessage) {
            emojiCounts[name] = (emojiCounts[name] || 0) + emojisInMessage.length;
        }

        // Finding how many messages were sent by date
        const date = messageObj.date;
        dateCount[date] = (dateCount[date] || 0) + 1;

        // Finding how many messages were sent by time
        const time = Number(messageObj.time.split(':')[0]);

        if (time >= 6 && time < 18) {
            timeCount.morning++;
        } else {
            timeCount.night++;
        }

        if (!includesMedia) {
            const pattern = /[\s.,!?]+|(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu
            const messageWords = message.split(pattern).filter(Boolean); // Split message into words

            messageWords.forEach((word) => {
                if (!word.match(emojiRegex())) {
                    // Finding words and frequency of use
                    if (word.length > 1) {
                        wordCount[word] = (wordCount[word] || 0) + 1;
                        if (!wordCountsByUsers[word]) {
                            wordCountsByUsers[word] = {word: word, count: {}};
                        }
                        wordCountsByUsers[word].count[name] = (wordCountsByUsers[word].count[name] || 0) + 1;
                    }

                } else {
                    // Finding emojis and frequency of use
                    if (!emojiCountsByUsers[word]) {
                        emojiCountsByUsers[word] = {emoji: word, count: {}};
                    }
                    emojiCountsByUsers[word].count[name] = (emojiCountsByUsers[word].count[name] || 0) + 1;
                }
            });

            // Longest Message
            if (message.length > longestMessage.message.length) {
                longestMessage = {message: message, name: name};
            }

        } else {

            // Media Counts
            for (const mediaType of mediaTypes) {
                if (mediaType.keywords.some(keyword => message.includes(keyword))) {
                    mediaCounts[mediaType.type] = mediaCounts[mediaType.type] || {};
                    mediaCounts[mediaType.type][name] = (mediaCounts[mediaType.type][name] || 0) + 1;
                } else mediaCounts[mediaType.type] = mediaCounts[mediaType.type] || {};
            }
            if (missedCalls.some(item => message.includes(item))) {
                missedCallCounts[messageObj.name] = (missedCallCounts[messageObj.name] || 0) + 1;
            }
        }
    });


    const mostRepeatedDate = findMaxCountKey(dateCount); // Most messaged date
    const maxMessageCount = dateCount[mostRepeatedDate]; // Maximum Message Count
    const totalWord = sumCounts(wordCount); // How many words there are in total
    let nameCount = Object.keys(messageCounts); // Array of users
    const wordStats = Object.values(wordCountsByUsers);
    const updatedWordStats = wordStats.map((entry) => {
        if (!entry.count[nameCount[0]]) {
            entry.count[nameCount[0]] = 0;
        }
        if (!entry.count[nameCount[1]]) {
            entry.count[nameCount[1]] = 0;
        }
        return entry;
    });
    console.log('date',dateCount)

    const emojiStats = Object.values(emojiCountsByUsers);
    const updatedEmojiStats = emojiStats.map((entry) => {
        if (!entry.count[nameCount[0]]) {
            entry.count[nameCount[0]] = 0;
        }
        if (!entry.count[nameCount[1]]) {
            entry.count[nameCount[1]] = 0;
        }
        return entry;
    });
    const mostRepeatedWordsAndSenders = updatedWordStats.sort(compareCounts).slice(0, 10); // Most repeated words and senders
    const mostUsedEmojisAndSenders = updatedEmojiStats.sort(compareCounts).slice(0, 10); // Most used rmojis and senders

    //All analyzes by day
    const dataObjsByDateCount = {}
    messages.forEach((messageObj) => {
        const emojisInMessage = messageObj.message.match(emojiRegex());
        const message = messageObj.message.toLowerCase()
        const name = messageObj.name;
        const date = messageObj.date;
        let media = null;
        let others = null;

        for (const mediaType of mediaTypes) {
            if (mediaType.keywords.some(keyword => message.includes(keyword))) {
                switch (mediaType.type) {
                    case "picture":
                        media = "picture";
                        break;
                    case "video":
                        media = "video";
                        break;
                    case "audio":
                        media = "audio";
                        break;
                    case "document":
                        others = "document";
                        break;
                    case "gif":
                        others = "gif";
                        break;
                    case "sticker":
                        others = "sticker";
                        break;
                    case "link":
                        others = "link";
                        break;
                }
            }
        }

        if (!dataObjsByDateCount[date]) {
            dataObjsByDateCount[date] = {count: 0, date: date};
            dataObjsByDateCount[date][nameCount[0]] = {
                emoji: [],
                media: [],
                others: [],
                message: 0
            };
            dataObjsByDateCount[date][nameCount[1]] = {
                emoji: [],
                media: [],
                others: [],
                message: 0
            };
        }

        if (emojisInMessage) {
            dataObjsByDateCount[date][name].emoji.push(...emojisInMessage);
        }

        if (media) {
            dataObjsByDateCount[date][name].media.push(media);
        }

        if (others) {
            dataObjsByDateCount[date][name].others.push(others);
        }

        dataObjsByDateCount[date][name].message++;
        dataObjsByDateCount[date].count++;
    });

    const dataObjsByDate = Object.values(dataObjsByDateCount)

    return {
        longestMessage: longestMessage,
        mostRepeatedDate: mostRepeatedDate,
        maxMessageCount: maxMessageCount,
        mostRepeatedWordsAndSenders: mostRepeatedWordsAndSenders,
        mostUsedEmojisAndSenders: mostUsedEmojisAndSenders,
        dataObjsByDate: dataObjsByDate,
        allSendings: {
            messageCounts,
            mediaCounts,
            missedCallCounts,
            emojiCounts,
            stickerCounts,
            nameCount,
            totalWord,
            timeCount
        }
    };
}