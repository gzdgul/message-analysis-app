
export const COLORS = {
    darkPurple: '#1f2438',
    // purple: '#4e4e80',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#131313',
    lightGray: '#ececec',
    stone: '#2f2f2f',
    ash: '#dcdcdc',
    darkBG: '#0d0e16',
    blue: '#8edaf2',
    pink: '#ff4a74',
    lightPink: '#fdcdcc',
    green: '#19de96',
    lightGreen: '#8efd7c',
    darkGreen: '#183b12',
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

    const generateDataRow = (label, values, type) => {
        return `
            <div style="display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between; background-color: ${values.backgroundColor.main}; max-height: 40px">
                <div style="display: flex; justify-content: center; align-items: center;">
                <p style="font-size: ${type === 'emoji' ? 20 : values.fontSize}">${label}</p>
                </div>
                <div style="width: 240px; display: flex; flex-direction: row; justify-content: space-between; color: ${COLORS.darkGreen}">
                    <div style="width: 80px; height: 40px; display: flex; justify-content: center; align-items: center; background-color: ${values.backgroundColor.i0}; border-left: 1px solid ${values.borderColor}"><p style="text-align: center; font-size: ${values.fontSize}">${ type === 'names' ? [names[0]] : values.count[names[0]]}</p></div>
                    <div style="width: 80px; height: 40px; display: flex; justify-content: center; align-items: center; background-color: ${values.backgroundColor.i1}; border-left: 1px solid ${values.borderColor}"><p style="text-align: center; font-size: ${values.fontSize}">${ type === 'names' ? [names[1]] : values.count[names[1]]}</p></div>
                    <div style="width: 80px; height: 40px; display: flex; justify-content: center; align-items: center; border-left: 1px solid ${values.borderColor}"><p style="text-align: center; font-size: ${values.fontSize}; font-weight: bold">${type === 'names' ? 'TOTAL' : values.total}</p></div>
                </div>
            </div>
        `;
    };
    let sendingsCount = 0;
    let emojisCount = 0;
    let wordsCount = 0;
    const generateSendingsDataRow = (label, count) => {
        sendingsCount++;
        const user1count =  count[names[0]] ? count[names[0]] : 0;
        const user2count =  count[names[1]] ? count[names[1]] : 0;
        return generateDataRow(
            label,
            {
                count: {
                    [names[0]]: user1count,
                    [names[1]]: user2count,
                },
                fontSize: '12px',
                backgroundColor: {
                        main: sendingsCount%2 === 0 ? 'white' : COLORS.lightGray,
                    i0: user1count > user2count ? COLORS.lightGreen : '',
                    i1: user2count > user1count ? COLORS.lightGreen : '',
                },
                borderColor: sendingsCount%2 === 0 ? COLORS.lightGray : 'white',
                total: user1count + user2count,
            }
        );
    };
    const generateEmojisDataRow = (emojiData) => {
        emojisCount++;
        return generateDataRow(
            `${emojiData.emoji}`,
            {
                count: emojiData.count,
                fontSize: '12px',
                backgroundColor: {
                    main: emojisCount%2 === 0 ? 'white' :  COLORS.lightGray,
                    i0: emojiData.count[names[0]] > emojiData.count[names[1]] ? COLORS.lightGreen : '',
                    i1: emojiData.count[names[1]] > emojiData.count[names[0]] ? COLORS.lightGreen : '',
            },

                total: emojiData.count[names[0]] + emojiData.count[names[1]],
                borderColor: emojisCount%2 === 0 ? COLORS.lightGray : 'white',
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
                backgroundColor: {
                    main: wordsCount%2 === 0 ? 'white' :  COLORS.lightGray,
                    i0: wordData.count[names[0]] > wordData.count[names[1]] ? COLORS.lightGreen : '',
                    i1: wordData.count[names[1]] > wordData.count[names[0]] ? COLORS.lightGreen : '',
                },
                total: wordData.count[names[0]] + wordData.count[names[1]],
                borderColor: wordsCount%2 === 0 ? COLORS.lightGray : 'white',
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
                    <h1 style="color: ${COLORS.darkGreen}">Simple Message Analysis</h1>
                    <p style="color: ${COLORS.darkGreen}; font-size: 25px; margin-top: -15px;">${names[0]} - ${names[1]}</p>
                </div>
                <div>
                    <p style="color: ${COLORS.darkGreen};">En Çok Mesajlaşılan Tarih</p>
                    <p style="color: ${COLORS.darkGreen}; font-size: 30px; font-weight: 900; margin-top: -15px; text-align: end">${mostMessagingDate}</p>
                </div>
            </div>
            ${generateDataRow('', { fontSize: '10px', backgroundColor: 'white', borderColor: COLORS.lightGray} ,'names')}
            ${generateSendingsDataRow('Mesaj Gönderimi', sendingsCountData.messageCounts)}
            ${generateSendingsDataRow('Emoji Gönderimi', sendingsCountData.emojiCounts)}
            ${generateSendingsDataRow('Fotoğraf Gönderimi', sendingsCountData.mediaCounts.picture)}
            ${generateSendingsDataRow('Video Gönderimi', sendingsCountData.mediaCounts.video)}
            ${generateSendingsDataRow('Ses Kaydı Gönderimi', sendingsCountData.mediaCounts.audio)}
            ${generateSendingsDataRow('Belge Gönderimi', sendingsCountData.mediaCounts.document)}
            ${generateSendingsDataRow('GIF Gönderimi', sendingsCountData.mediaCounts.gif)}
            <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 10px">
                <div style="width: 350px;">
                    <p style="color: ${COLORS.darkGreen};">En Çok Gönderilen Kelimeler</p>
                    ${generateDataRow('', { fontSize: '10px', backgroundColor: 'white', borderColor: COLORS.lightGray} ,'names')}
                    ${mostRepeatedWordsAndSenders.slice(0, 10).map(wordData => generateWordsDataRow(wordData)).join('')}
                    
                </div>
                <div style="width: 350px;">
                    <p style="color: ${COLORS.darkGreen};">En Çok Kullanılan Emojiler</p>
                    ${generateDataRow('', { fontSize: '10px', backgroundColor: 'white', borderColor: COLORS.lightGray} ,'names')}
                    ${mostUsedEmojisAndSenders.slice(0, 10).map(emojiData => generateEmojisDataRow(emojiData)).join('')}
                </div>
            </div>
        </body>
        </html>
    `;
};
