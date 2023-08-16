
export const COLORS = {
    darkPurple: '#1f2438',
    // purple: '#4e4e80',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#131313',
    stone: '#2f2f2f',
    ash: '#BDBDBD',
    darkBG: '#0d0e16',
    blue: '#8edaf2',
    pink: '#ff4a74',
    lightPink: '#fdcdcc',
    green: '#19de96',
    lightGreen: '#8efd7c',
    purple: '#847bec',
    darkBlue: '#0f4a80',
    lightPurple: '#aba1fa',
    // color1: '#3c388a',
    // color3: '#ddd9ff',

}
export const monthsArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export const medya =
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

export const mediaTypes = [
    { type: 'picture', keywords: [medya[0], medya[1]] },
    { type: 'video', keywords: [medya[2], medya[3]] },
    { type: 'audio', keywords: [medya[4], medya[5]] },
    { type: 'document', keywords: [medya[6], medya[7]] },
    { type: 'gif', keywords: [medya[8], medya[9]] },
    { type: 'sticker', keywords: [medya[10], medya[11]] },
    { type: 'link', keywords: [medya[14]] },
    { type: 'deleted', keywords: [medya[15], medya[16]] },
];

export const missedCalls = [
    'cevapsız sesli arama', 'missed voice call',
    'cevapsız görüntülü arama', 'missed video call',
    'cevapsız sesli grup araması', 'missed group voice call',
    'cevapsız görüntülü grup araması', 'missed group video call',
]

export const htmlMaker = (names, mostMessagingDate, data) => {
    const sendingsCountData = data.allSendings;
    const mostRepeatedWordsAndSenders = data.mostRepeatedWordsAndSenders;
    const mostUsedEmojisAndSenders = data.mostUsedEmojisAndSenders;
    const colors = {
        primary: COLORS.darkPurple,
        secondary: COLORS.lightGreen,
    };

    const generateDataRow = (label, values, type) => {
        return `
            <div style="display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between; border-top:  ${type === 'names' ? 0 : '1px solid gray'} ; background-color: ${values.backgroundColor}; max-height: 40px">
                <div style="display: flex; justify-content: center; align-items: center;">
                <p style="font-size: ${type === 'emoji' ? 20 : values.fontSize}">${label}</p>
                </div>
                <div style="width: 240px; display: flex; flex-direction: row; justify-content: space-between">
                    <div style="width: 80px; height: 40px; display: flex; justify-content: center; align-items: center; border-left: 1px solid gray"><p style="text-align: center; font-size: ${values.fontSize}">${ type === 'names' ? [names[0]] : values.count[names[0]]}</p></div>
                    <div style="width: 80px; height: 40px; display: flex; justify-content: center; align-items: center; border-left: 1px solid gray"><p style="text-align: center; font-size: ${values.fontSize}">${ type === 'names' ? [names[1]] : values.count[names[1]]}</p></div>
                    <div style="width: 80px; height: 40px; display: flex; justify-content: center; align-items: center; border-left: 1px solid gray"><p style="text-align: center; font-size: ${values.fontSize}; font-weight: bold">${type === 'names' ? 'TOTAL' : values.total}</p></div>
                </div>
            </div>
        `;
    };
    let sendingsCount = 0;
    let emojisCount = 0;
    let wordsCount = 0;
    const generateSendingsDataRow = (label, count) => {
        sendingsCount++;
        return generateDataRow(
            label,
            {
                count: count,
                fontSize: '12px',
                backgroundColor: sendingsCount%2 === 0 ? 'white' : 'lightgray',
                total: count[names[0]] + count[names[1]],
            }
        );
    };
    const generateEmojisDataRow = (emoji, count) => {
        emojisCount++;
        return generateDataRow(
            emoji,
            {
                count: count,
                fontSize: '12px',
                backgroundColor: emojisCount%2 === 0 ? 'white' : 'lightgray',
                total: count[names[0]] + count[names[1]],
            },
            'emoji'
        );
    };

    const generateWordsDataRow = (wordData) => {
        wordsCount++;
        return generateDataRow(
            `"${wordData.word}"`,
            {
                count: wordData.count,
                fontSize: '12px',
                backgroundColor: wordsCount%2 === 0 ? 'white' : 'lightgray',
                total: wordData.count[names[0]] + wordData.count[names[1]],
            }
        );
    };

    return `
        <html>
        <head>
            <style>
                * {
                    font-family: Arial, Helvetica, sans-serif;
                }
            </style>
        </head>
        <body>
            <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: flex-end">
                <div>
                    <h1>Simple Message Analysis</h1>
                    <p style="font-size: 25px; margin-top: -15px;">${names[0]} - ${names[1]}</p>
                </div>
                <div>
                    <p style="color: green;">En Çok Mesajlaşılan Tarih</p>
                    <p style="font-size: 30px; font-weight: 900; margin-top: -15px; text-align: end">${mostMessagingDate}</p>
                </div>
            </div>
            ${generateDataRow('', { fontSize: '10px', backgroundColor: 'white'} ,'names')}
            ${generateSendingsDataRow('Mesaj Gönderimi', sendingsCountData.messageCounts)}
            ${generateSendingsDataRow('Emoji Gönderimi', sendingsCountData.emojiCounts)}
            ${generateSendingsDataRow('Fotoğraf Gönderimi', sendingsCountData.mediaCounts.picture)}
            ${generateSendingsDataRow('Video Gönderimi', sendingsCountData.mediaCounts.video)}
            ${generateSendingsDataRow('Ses Kaydı Gönderimi', sendingsCountData.mediaCounts.audio)}
            ${generateSendingsDataRow('Belge Gönderimi', sendingsCountData.mediaCounts.document)}
            ${generateSendingsDataRow('GIF Gönderimi', sendingsCountData.mediaCounts.gif)}
            <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 10px">
                <div style="width: 350px;">
                    <p style="color: green;">En Çok Gönderilen Kelimeler</p>
                    ${generateDataRow('', { fontSize: '10px', backgroundColor: 'white'} ,'names')}
                    ${generateWordsDataRow(mostRepeatedWordsAndSenders[0])}
                    ${generateWordsDataRow(mostRepeatedWordsAndSenders[1])}
                    ${generateWordsDataRow(mostRepeatedWordsAndSenders[2])}
                    ${generateWordsDataRow(mostRepeatedWordsAndSenders[3])}
                    ${generateWordsDataRow(mostRepeatedWordsAndSenders[4])}
                    ${generateWordsDataRow(mostRepeatedWordsAndSenders[5])}
                    ${generateWordsDataRow(mostRepeatedWordsAndSenders[6])}
                    ${generateWordsDataRow(mostRepeatedWordsAndSenders[7])}
                    ${generateWordsDataRow(mostRepeatedWordsAndSenders[8])}
                    ${generateWordsDataRow(mostRepeatedWordsAndSenders[9])}
                </div>
                <div style="width: 350px;">
                    <p style="color: green;">En Çok Kullanılan Emojiler</p>
                    ${generateDataRow('', { fontSize: '10px', backgroundColor: 'white'} ,'names')}
                    ${generateEmojisDataRow(mostUsedEmojisAndSenders[0].emoji, mostUsedEmojisAndSenders[0].count)}
                    ${generateEmojisDataRow(mostUsedEmojisAndSenders[1].emoji, mostUsedEmojisAndSenders[1].count)}
                    ${generateEmojisDataRow(mostUsedEmojisAndSenders[2].emoji, mostUsedEmojisAndSenders[2].count)}
                    ${generateEmojisDataRow(mostUsedEmojisAndSenders[3].emoji, mostUsedEmojisAndSenders[3].count)}
                    ${generateEmojisDataRow(mostUsedEmojisAndSenders[4].emoji, mostUsedEmojisAndSenders[4].count)}
                    ${generateEmojisDataRow(mostUsedEmojisAndSenders[5].emoji, mostUsedEmojisAndSenders[5].count)}
                    ${generateEmojisDataRow(mostUsedEmojisAndSenders[6].emoji, mostUsedEmojisAndSenders[6].count)}
                    ${generateEmojisDataRow(mostUsedEmojisAndSenders[7].emoji, mostUsedEmojisAndSenders[7].count)}
                    ${generateEmojisDataRow(mostUsedEmojisAndSenders[8].emoji, mostUsedEmojisAndSenders[8].count)}
                    ${generateEmojisDataRow(mostUsedEmojisAndSenders[9].emoji, mostUsedEmojisAndSenders[9].count)}
                </div>
            </div>
        </body>
        </html>
    `;
};

// export const html = `
//     <html>
//     <body>
//     <h1>${name} hello everyone!</h1>
//     </body>
//     </html>
// `