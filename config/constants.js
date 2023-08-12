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
    red: '#847bec',
    orange: '#ffffff',
    purple: '#847bec',
    darkBlue: '#0f4a80',
    color1: '#3c388a',
    color2: '#aba1fa',
    color3: '#ddd9ff',
    test: 'rgba(56,56,56,0.5)',
    shadowColor: 'rgba(56,56,56,0.4)'

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