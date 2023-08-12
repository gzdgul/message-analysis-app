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

        newData.push({ date, time, message, name });
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
        }
        else {
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
            backgroundColor: COLORS.color2,
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
        }
        else {
            sum += obj[key].length;
        }
    }

    return sum;
}

export const countArray = (key, patch,dataset, names) => {
    if (patch) {
        return  {
            [names[0]]: dataset[names[0]][key].filter(item => item === patch).length,
            [names[1]]: dataset[names[1]][key].filter(item => item === patch).length
        }
    } else {
        return  {
            [names[0]]: dataset[names[0]][key],
            [names[1]]: dataset[names[1]][key]
        }
    }
}
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
    messages.shift();
    messages.forEach((messageObj) => {
        const message = messageObj.message.toLowerCase();
        const name = messageObj.name;
        const notIncludesMedia = !medya.some(item => message.includes(item)) && !missedCalls.some(item => message.includes(item))
        if (notIncludesMedia)
        {
            /////////Longest Message
            if (message.length > longestMessage.message.length) {
                longestMessage = {message: message, name: name};
            }
        } else {
            /////////Media Counts
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
    });
    /////////Finding Words
    const words = messages.reduce((allWords, messageObj) => {
        const message = messageObj.message.toLowerCase();
        const emojisInMessage = messageObj.message.match(emojiRegex());
        const notIncludesMedia = !medya.some(item => message.includes(item)) && !missedCalls.some(item => message.includes(item))
        if (notIncludesMedia && !emojisInMessage) {
            const messageWords = message.split(/\s+/); // Split message into words
            return allWords.concat(messageWords);
        } else {
            return allWords;
        }
    }, []);
    /////////Finding words and frequency of use
    const wordCount = {};
    words.forEach((word) => {
        if (word.length > 1) {
            wordCount[word] = (wordCount[word] || 0) + 1;
        }
    });
    /////////Finding how many words there are in total
    const totalWord = sumCounts(wordCount)

    /////////Finding most repeated words
    let mostRepeatedWords = [];
    for (const word in wordCount) {
        if (wordCount[word] > 1 && word.length > 1) {
            mostRepeatedWords.push({ word: word, count: wordCount[word] });
        }
    }
    /////////Sort repeated words and slice
    mostRepeatedWords.sort((a, b) => b.count - a.count);
    mostRepeatedWords = mostRepeatedWords.slice(0, 10);

    /////////Finding the distribution of messages by person
    const messageCounts = {};
    messages.forEach((messageObj) => {
        const name = messageObj.name;
        messageCounts[name] = (messageCounts[name] || 0) + 1;
    });

    /////////Array of users
    let nameCount = [];
    for (const name in messageCounts) {
        nameCount.push(name);
    }

    /////////Finding how many messages were sent by time
    const timeCount = { morning: 0, night: 0 };
    messages.forEach((messageObj) => {
        const time = Number(messageObj.time.split(':')[0]);

        if (time >= 6 && time < 18) {
            timeCount.morning++;
        } else {
            timeCount.night++;
        }
    });

    /////////Finding how many messages were sent by time
    const dateCount = {};
    messages.forEach((messageObj) => {
        const date = messageObj.date;
        dateCount[date] = (dateCount[date] || 0) + 1;
    });

    const mostRepeatedDates = [];
    for (const date in dateCount) {
        mostRepeatedDates.push({ date: date, count: dateCount[date]});
    }
    // mostRepeatedDates.sort((a, b) => b.count - a.count);

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
    const deneme = []

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
        deneme.push({ date: date, name: name, emoji: emojisInMessage, media: media, others:others })
    });
    const test = [];
    for (const date in dateCount) {
        const arr = [...deneme]
        const name1Filtered = arr.filter((x) => x.date === date).filter((y) => y.name === nameCount[0])
        const message1 = name1Filtered.length
        const emojiFiltered = name1Filtered.filter((z) => z.emoji !== null)
        const emoji1 = emojiFiltered.map((a) => {
            if (a.emoji) {
                return a.emoji
            }
            return null;
        })
        console.log('****************************************',emoji1)

        const mediaFiltered = name1Filtered.filter((z) => z.media !== null)
        const media1 = mediaFiltered.map((a) => {
            if (a.media) {
                return a.media
            }
            return null;
        })
        console.log('****************************************',media1)
        const othersFiltered = name1Filtered.filter((z) => z.others !== null)
        const others1 = othersFiltered.map((a) => {
            if (a.others) {
                return a.others
            }
            return null;
        })
        console.log('****************************************',others1)


        const name1Data = { emoji: emoji1, media: media1, others: others1,message: message1}
        const name2Filtered = arr.filter((x) => x.date === date).filter((y) => y.name === nameCount[1])
        const message2 = name2Filtered.length
        const emojiFiltered2 = name2Filtered.filter((z) => z.emoji !== null)
        const emoji2 = emojiFiltered2.map((a) => {
            if (a.emoji) {
                return a.emoji
            }
            return null;
        })
        console.log('****************************************emoji2',emoji2)

        const mediaFiltered2 = name2Filtered.filter((z) => z.media !== null)

        const media2 = mediaFiltered2.map((a) => {
            if (a.media) {
                return a.media
            }
            return null;
        })
        console.log('****************************************media2',media2)
        const othersFiltered2 = name2Filtered.filter((z) => z.others !== null)
        const others2 = othersFiltered2.map((a) => {
            if (a.others) {
                return a.others
            }
            return null;
        })
        console.log('****************************************',others2)


        const name2Data = {emoji: emoji2, media: media2, others: others2, message: message2}
        test.push({ date: date, [nameCount[0]]: name1Data , [nameCount[1]]: name2Data, count: message1 + message2 })
    }

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
    // console.log('allEmojisInMessageCount',allEmojisInMessageCount)
    // console.log('emojiCounts',emojiCounts)
    // console.log('deneme',deneme)
    // console.log('test',test)


    return {
        longestMessage: longestMessage,
        mostRepeatedDate: mostRepeatedDate,
        mostRepeatedDates: mostRepeatedDates,
        mostRepeatedWordsAndSenders: mostRepeatedWordsAndSenders,
        mostUsedEmojisAndSenders: mostUsedEmojisAndSenders,
        allSendings: {messageCounts,pictureCounts,videoCounts,audioCounts,documentCounts,gifCounts,linkCounts,missedCallCounts,emojiCounts, stickerCounts, nameCount, totalWord, timeCount, test}
    };
}