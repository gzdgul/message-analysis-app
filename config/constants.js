
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

export const htmlMaker = (names,mostMessagingDate,data) => {
    const sendingsCountData = data.allSendings;
    const mostRepeatedWordsAndSenders = data.mostRepeatedWordsAndSenders;
    const mostUsedEmojisAndSenders = data.mostUsedEmojisAndSenders;
    const colors = {
        primary: COLORS.darkPurple,
        secondary: COLORS.lightGreen,
    }
    return (
        `
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
          <div style=" display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between; height: fit-content;margin-top: -10px;">
        	<p style="font-size: 12px;font-weight: bold; "></p>
            <div style="width: 300px; display: flex; flex-direction: row; justify-content: space-between; height: fit-content;">
             <div style="width: 100px; background-color: red; height: 40px; border-left: 1px solid gray; display: flex; justify-content: center; align-items: center"><p style="font-size: 12px;text-align: center">${names[0]}</p></div>
        	 <div style="width: 100px; background-color: red; height: 40px; border-left: 1px solid gray; display: flex; justify-content: center; align-items: center"><p style="font-size: 12px;text-align: center">${names[1]}</p></div>
             <div style="width: 100px; height: 40px; border-left: 1px solid gray; display: flex; justify-content: center; align-items: center"><p style="text-align: center;font-size: 12px; font-weight: bold">TOTAL</p></div>
         </div>
         </div>
        
        
        
       	 <div style=" display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 12px">Mesaj Gönderimi</p>
            <div style="width: 300px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${sendingsCountData.messageCounts[names[0]]}</p></div>
        	 <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${sendingsCountData.messageCounts[names[1]]}</p></div>
              <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${sendingsCountData.messageCounts[names[0]]+sendingsCountData.messageCounts[names[1]]}</p></div>
         </div>
         </div>
         
           	 <div style=" display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: white">
        	<p style="font-size: 12px">Emoji Gönderimi</p>
            <div style="width: 300px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${sendingsCountData.emojiCounts[names[0]]}</p></div>
        	 <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${sendingsCountData.emojiCounts[names[1]]}</p></div>
              <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${sendingsCountData.emojiCounts[names[0]]+sendingsCountData.emojiCounts[names[1]]}</p></div>
         </div>
         </div>
         
           	 <div style=" display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 12px">Fotoğraf Gönderimi</p>
            <div style="width: 300px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${sendingsCountData.mediaCounts.picture[names[0]]}</p></div>
        	 <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${sendingsCountData.mediaCounts.picture[names[1]]}</p></div>
              <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${sendingsCountData.mediaCounts.picture[names[0]]+sendingsCountData.mediaCounts.picture[names[1]]}</p></div>
         </div>
         </div>
         
           	 <div style="display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: white">
        	<p style="font-size: 12px">Video Gönderimi</p>
            <div style="width: 300px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${sendingsCountData.mediaCounts.video[names[0]]}</p></div>
        	 <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${sendingsCountData.mediaCounts.video[names[1]]}</p></div>
              <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${sendingsCountData.mediaCounts.video[names[0]]+sendingsCountData.mediaCounts.video[names[1]]}</p></div>
         </div>
         </div>
         
           	 <div style=" display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 12px">Ses Kaydı Gönderimi</p>
            <div style="width: 300px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${sendingsCountData.mediaCounts.audio[names[0]]}</p></div>
        	 <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${sendingsCountData.mediaCounts.audio[names[1]]}</p></div>
              <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${sendingsCountData.mediaCounts.audio[names[0]]+sendingsCountData.mediaCounts.audio[names[1]]}</p></div>
         </div>
         </div>
         
                    	 <div style="display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: white">
        	<p style="font-size: 12px">Belge Gönderimi</p>
            <div style="width: 300px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${sendingsCountData.mediaCounts.document[names[0]]}</p></div>
        	 <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${sendingsCountData.mediaCounts.document[names[1]]}</p></div>
              <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${sendingsCountData.mediaCounts.document[names[0]]+sendingsCountData.mediaCounts.document[names[1]]}</p></div>
         </div>
         </div>
         
           	 <div style=" display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 12px">GIF Gönderimi</p>
            <div style="width: 300px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${sendingsCountData.mediaCounts.gif[names[0]]}</p></div>
        	 <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${sendingsCountData.mediaCounts.gif[names[0]]}</p></div>
              <div style="width: 100px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${sendingsCountData.mediaCounts.gif[names[0]]+sendingsCountData.mediaCounts.gif[names[1]]}</p></div>
         </div>
         </div>
         
         
          <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 20px">
         <div style="width: 350px; ">
         <p style="color: green;">En Çok Gönderilen Kelimeler</p>
                  
           	 <div style="height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;">
        	<p style="font-size: 12px"></p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px;background-color: red; height: 40px; border-left: 1px solid gray; display: flex; justify-content: center; align-items: center"><p style="text-align: center; font-size: 12px">${names[0]}</p></div>
        	 <div style="width: 70px; background-color: red; height: 40px; border-left: 1px solid gray; display: flex; justify-content: center; align-items: center"><p style="text-align: center;font-size: 12px">${names[1]}</p></div>
              <div style="width: 70px; height: 40px; border-left: 1px solid gray; display: flex; justify-content: center; align-items: center"><p style="text-align: center;font-size: 12px; font-weight: bold">TOTAL</p></div>
         </div>
         </div>
                       
           	 <div style=" height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 12px">"${mostRepeatedWordsAndSenders[0].word}"</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostRepeatedWordsAndSenders[0].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostRepeatedWordsAndSenders[0].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${mostRepeatedWordsAndSenders[0].count[names[0]]+mostRepeatedWordsAndSenders[0].count[names[1]]}</p></div>
         </div>
         </div>
         
         
           	 <div style="height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: white">
        	<p style="font-size: 12px">"${mostRepeatedWordsAndSenders[1].word}"</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostRepeatedWordsAndSenders[1].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostRepeatedWordsAndSenders[1].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${mostRepeatedWordsAndSenders[1].count[names[0]]+mostRepeatedWordsAndSenders[0].count[names[1]]}</p></div>
         </div>
         </div>
         
                       
           	 <div style=" height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 12px">"${mostRepeatedWordsAndSenders[2].word}"</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostRepeatedWordsAndSenders[2].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostRepeatedWordsAndSenders[2].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${mostRepeatedWordsAndSenders[2].count[names[0]]+mostRepeatedWordsAndSenders[0].count[names[1]]}</p></div>
         </div>
         </div>
         
         
           	 <div style="height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: white">
        	<p style="font-size: 12px">"${mostRepeatedWordsAndSenders[3].word}"</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostRepeatedWordsAndSenders[3].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostRepeatedWordsAndSenders[3].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${mostRepeatedWordsAndSenders[3].count[names[0]]+mostRepeatedWordsAndSenders[0].count[names[1]]}</p></div>
         </div>
         </div>
         
         
                
           	 <div style=" height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 12px">"${mostRepeatedWordsAndSenders[4].word}"</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostRepeatedWordsAndSenders[4].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostRepeatedWordsAndSenders[4].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${mostRepeatedWordsAndSenders[4].count[names[0]]+mostRepeatedWordsAndSenders[0].count[names[1]]}</p></div>
         </div>
         </div>
         
         
           	 <div style="height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: white">
        	<p style="font-size: 12px">"${mostRepeatedWordsAndSenders[5].word}"</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostRepeatedWordsAndSenders[5].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostRepeatedWordsAndSenders[5].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${mostRepeatedWordsAndSenders[5].count[names[0]]+mostRepeatedWordsAndSenders[0].count[names[1]]}</p></div>
         </div>
         </div>
         
                
           	 <div style=" height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 12px">"${mostRepeatedWordsAndSenders[6].word}"</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostRepeatedWordsAndSenders[6].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostRepeatedWordsAndSenders[6].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${mostRepeatedWordsAndSenders[6].count[names[0]]+mostRepeatedWordsAndSenders[0].count[names[1]]}</p></div>
         </div>
         </div>
         
         
           	 <div style="height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: white">
        	<p style="font-size: 12px">"${mostRepeatedWordsAndSenders[7].word}"</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostRepeatedWordsAndSenders[7].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostRepeatedWordsAndSenders[7].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${mostRepeatedWordsAndSenders[7].count[names[0]]+mostRepeatedWordsAndSenders[0].count[names[1]]}</p></div>
         </div>
         </div>
         
                
           	 <div style=" height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 12px">"${mostRepeatedWordsAndSenders[8].word}"</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostRepeatedWordsAndSenders[8].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostRepeatedWordsAndSenders[8].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${mostRepeatedWordsAndSenders[8].count[names[0]]+mostRepeatedWordsAndSenders[0].count[names[1]]}</p></div>
         </div>
         </div>
         
         
           	 <div style="height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: white">
        	<p style="font-size: 12px">"${mostRepeatedWordsAndSenders[9].word}"</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostRepeatedWordsAndSenders[9].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostRepeatedWordsAndSenders[9].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">${mostRepeatedWordsAndSenders[9].count[names[0]]+mostRepeatedWordsAndSenders[0].count[names[1]]}</p></div>
         </div>
         </div>
         
       
         
         </div>
         
          <div style="width: 350px; ">
         <p style="color: green;">En Çok Kullanılan Emojiler</p>
                  
           	 <div style="height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;">
        	<p style="font-size: 12px"></p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; background-color: red; height: 40px; border-left: 1px solid gray; display: flex; justify-content: center; align-items: center"><p style="text-align: center; font-size: 12px">${names[0]}</p></div>
        	 <div style="width: 70px; background-color: red; height: 40px; border-left: 1px solid gray; display: flex; justify-content: center; align-items: center"><p style="text-align: center;font-size: 12px">${names[1]}</p></div>
              <div style="width: 70px; height: 40px; border-left: 1px solid gray; display: flex; justify-content: center; align-items: center"><p style="text-align: center;font-size: 12px; font-weight: bold">TOTAL</p></div>
         </div>
         </div>
         
           	 <div style=" height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 10px">${mostUsedEmojisAndSenders[0].emoji}</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostUsedEmojisAndSenders[0].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostUsedEmojisAndSenders[0].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">7432</p></div>
         </div>
         </div>
         
         
           	 <div style="height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: white">
        	<p style="font-size: 10px">${mostUsedEmojisAndSenders[1].emoji}</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostUsedEmojisAndSenders[1].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostUsedEmojisAndSenders[1].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">7432</p></div>
         </div>
         </div>
         
                
           	 <div style=" height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 10px">${mostUsedEmojisAndSenders[2].emoji}</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostUsedEmojisAndSenders[2].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostUsedEmojisAndSenders[2].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">7432</p></div>
         </div>
         </div>
         
         
           	 <div style="height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: white">
        	<p style="font-size: 10px">${mostUsedEmojisAndSenders[3].emoji}</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostUsedEmojisAndSenders[3].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostUsedEmojisAndSenders[3].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">7432</p></div>
         </div>
         </div>
         
                
           	 <div style=" height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 10px">${mostUsedEmojisAndSenders[4].emoji}</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostUsedEmojisAndSenders[4].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostUsedEmojisAndSenders[4].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">7432</p></div>
         </div>
         </div>
         
         
           	 <div style="height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: white">
        	<p style="font-size: 10px">${mostUsedEmojisAndSenders[5].emoji}</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostUsedEmojisAndSenders[5].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostUsedEmojisAndSenders[5].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">7432</p></div>
         </div>
         </div>
         
                
           	 <div style=" height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 10px">${mostUsedEmojisAndSenders[6].emoji}</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostUsedEmojisAndSenders[6].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostUsedEmojisAndSenders[6].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">7432</p></div>
         </div>
         </div>
         
         
           	 <div style="height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: white">
        	<p style="font-size: 10px">${mostUsedEmojisAndSenders[7].emoji}</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostUsedEmojisAndSenders[7].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostUsedEmojisAndSenders[7].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">7432</p></div>
         </div>
         </div>
         
                
           	 <div style=" height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: lightgray">
        	<p style="font-size: 10px">${mostUsedEmojisAndSenders[8].emoji}</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostUsedEmojisAndSenders[8].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostUsedEmojisAndSenders[8].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">7432</p></div>
         </div>
         </div>
         
         
           	 <div style="height: fit-content; display: flex; flex-direction: row; padding: 0 0 0 10px; justify-content: space-between;border-top: 1px solid gray; background-color: white">
        	<p style="font-size: 10px">${mostUsedEmojisAndSenders[9].emoji}</p>
            <div style="width: 210px; display: flex; flex-direction: row; justify-content: space-between">
             <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center; font-size: 12px">${mostUsedEmojisAndSenders[9].count[names[0]]}</p></div>
        	 <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px">${mostUsedEmojisAndSenders[9].count[names[1]]}</p></div>
              <div style="width: 70px; border-left: 1px solid gray"><p style="text-align: center;font-size: 12px; font-weight: bold">7432</p></div>
         </div>
         </div>
         
       
         
         </div>
        </div>
         

</body>
</html>
`
    )
}
// export const html = `
//     <html>
//     <body>
//     <h1>${name} hello everyone!</h1>
//     </body>
//     </html>
// `