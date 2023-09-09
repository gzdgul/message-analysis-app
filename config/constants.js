
export const COLORS = {
    darkPurple: '#1f2438',
    darkPurple0: 'rgba(0,0,0,0.5)',
    // purple: '#4e4e80',
    black: '#000000',
    white: '#ffffff',
    // white: '#e1e1ce',
    gray: '#131313',
    lightGray: '#ececec',
    stone: '#2f2f2f',
    ash: '#545454',
    darkBG: '#171718',
    blue: '#8edaf2',
    pink: '#ff4a74',
    red: '#fd5e5d',
    yellow: '#fdd65d',
    deneme: '#ff56b0',
    lightPink: '#fdcdcc',
    green: '#19de96',
    lightGreen: '#8efd7c',
    darkGreen: '#183b12',
    purple: '#847bec',
    darkBlue: '#0f4a80',
    lightBlue: '#1c7eff',
    lightPurple: '#aba1fa',
    babyCyan: '#50ffcc',
    shadow: 'rgba(0,0,0,0.6)',
    // color3: '#ddd9ff',

}
export const monthsArr = {
    "TR": ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],
    "EN": ["January","February","March","April","May","June","July","August","September","October","November","December"]
}
export const medya =
    [
        'görüntü dahil edilmedi','image omitted',
        'video dahil edilmedi','video omitted',
        'ses dahil edilmedi','audio omitted',
        'belge dahil edilmedi','document omitted',
        'gif dahil edilmedi','gif omitted',
        'çıkartma dahil edilmedi', 'sticker omitted',
        'kişi kartı dahil edilmedi','contact card omitted',
        'http',
        'bu mesajı sildiniz', 'this message was deleted'

    ];
//bu mesaj silindi, anket,
export const mediaTypes = [
    { type: 'image', keywords: [medya[0], medya[1]] },
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
import uiDesign from "../assets/ui-design.png"
import codding from "../assets/codding.png"
import messageLock from "../assets/message-lock.png"
import messageCross from "../assets/message-cross.png"
import messageThief from "../assets/message-thief.png"
import messageMoreInfo from "../assets/message-moreInfo.png"
import messageSecure from "../assets/message-sec.png"
import U1 from "../assets/U1.png"
import U2 from "../assets/U2.png"
import U3 from "../assets/U3.png"
import U4 from "../assets/U4.png"
import U5 from "../assets/U5.png"
import U6 from "../assets/U6.png"
import U7 from "../assets/U7.png"
import U8 from "../assets/U8.png"

const UsageInstructions = {
    "TR" : {
        titles: ['Adım 1: Kişiye Dokun','Adım 2: Kişi Bilgisi Sekmesine Git','Adım 3: Sohbeti Dışa Aktar','Adım 4: Medya Ekleme',
            'Adım 5:  Dosyalara Kaydet','Adım 6: Zip Dosyasını Ayıkla','Adım 7: Analiz Yöntemi Seçin','Adım 8:  Analize Başlayın'],
        descriptions: [
            'Whatsapp üzerinden bir kişiye dokunarak başlayın.',
            'Kişi bilgilerini görmek için kişiye dokunun.',
            'Sohbeti dışa aktarmak için aşağıya inin ve "Sohbeti Dışa Aktar" seçeneğine dokunun.',
            '"Medya ekleme" seçeneğine tıklayın.',
            '"Dosyalara kaydet" seçeneğine tıklayın.',
            'Dosyalarınıza gidin. mesaj dosyanızı çıkarmak için zip dosyasına bir kez dokunun.',
            'Uygulama üzerinden istediğiniz analiz yöntemini seçin. "Dosya Seç" seçeneğine dokunun ve mesaj dosyanızı seçin.',
            'Analize başlamak için "Başla" düğmesine tıklayın.'
        ]
    },
    "EN": {
        titles: ['Step 1: Touch the Person','Step 2: Go to Person Info Tab','Step 3: Export the Chat','Step 4: Without Media',
            'Step 5: Save to Files','Step 6: Extract the Zip File','Step 7: Select Analysis Method','Step 8: Start the Analysis'],
        descriptions: [
            'Begin by touching a person on WhatsApp.',
            'Touch the person to view their information.',
            'Scroll down and select "Export Chat" to export the chat.',
            'Click on "Without Media" option.',
            'Click on "Save to Files" option.',
            'Go to your files. Tap the zip file to extract your message file.',
            'Choose the desired analysis method within the application. Tap "Select File" and choose your message file.',
            'Click "Start" to initiate the analysis.'
        ]
    },
    images: [U1,U2,U3,U4,U5,U6,U7,U8]
}
const UsageSecurity = {
    "TR" : {
        titles: ['Özel Mesajlarınız Koruma Altında','Bağımsız ve Güvende','Verileriniz Hızla ve Tamamen Silinir','Üçüncü Kişilerle Paylaşılmaz', 'Bizimle İletişime Geçin'],
        descriptions: [
            'Verilerinizin güvenliği bizim en öncelikli görevimizdir. Özel konuşmalarınız ve size özel tasarlanmış mesaj analizleriniz tamamen güvende tutulur. Size verilerinizin nasıl korunduğunu daha yakından anlatalım.',
            'Uygulamamız bağımsızdır ve internet bağlantısına ihtiyaç duymaz. Mesajlarınız sadece kendi cihazınızda analiz edilir. Bu sayede verileriniz hiçbir zaman internet üzerinden iletilmez, böylece gizliliğiniz her zaman korunur.',
            'Mesajlarınızın analiz sürecinde hiçbir şekilde okunmaz veya kopyalanmaz. Analiz süreci tamamlandığında, verileriniz anında ve tamamen silinir. Bu, verilerinizin gizliliğini her zaman korumamıza olanak tanır.',
            'Size özel mesaj analizinize sadece siz ve paylaştığınız kişi veya kişiler erişebilir. Verileriniz asla üçüncü taraflarla paylaşılmaz veya satılmaz.',
            'Uygulamamızı kullanırken herhangi bir sorunuz, öneriniz veya geri bildiriminiz varsa, lütfen bizimle iletişime geçmekten çekinmeyin. Kullanıcılarımızın deneyimini daha iyi hale getirmek için buradayız ve sizden gelecek geri bildirimleri değerli buluyoruz.',
        ]
    },
    "EN" : {
        titles: ['Your Private Messages are Protected','Independent and Secure','Your Data is Quickly and Completely Deleted','Not Shared with Third Parties', 'Contact Us'],
        descriptions: [
            'The security of your data is our top priority. Your private conversations and custom message analyses are kept completely safe. Let us explain in more detail how your data is protected.',
            'Our application is independent and does not require an internet connection. Your messages are only analyzed on your own device. This means your data is never transmitted over the internet, ensuring your privacy is always safeguarded.',
            'Your messages are never read or copied during the analysis process. Once the analysis is complete, your data is immediately and completely deleted. This allows us to always protect the privacy of your data.',
            'Only you and the individuals you share your message analysis with can access your personalized message analysis. Your data is never shared or sold to third parties.',
            'If you have any questions, suggestions, or feedback while using our application, please do not hesitate to contact us. We are here to improve our users experience, and we value any feedback you provide.',
        ]
    },
    images: [messageLock,messageSecure,messageCross,messageThief,messageMoreInfo]
}

export const UsageInstructionsData = {
    "TR": UsageInstructions["TR"].titles.map((title, index) => ({
        title,
        desc: UsageInstructions["TR"].descriptions[index],
        img: UsageInstructions.images[index],
        type: 'UsageInstructions'
    })),
    "EN": UsageInstructions["EN"].titles.map((title, index) => ({
        title,
        desc: UsageInstructions["EN"].descriptions[index],
        img: UsageInstructions.images[index],
        type: 'UsageInstructions'
    }))
};
export const UsageSecurityData = {
    "TR": UsageSecurity["TR"].titles.map((title, index) => ({
        title,
        desc: UsageSecurity["TR"].descriptions[index],
        img: UsageSecurity.images[index],
        type: 'UsageSecurity'
    })),
    "EN": UsageSecurity["EN"].titles.map((title, index) => ({
        title,
        desc: UsageSecurity["EN"].descriptions[index],
        img: UsageSecurity.images[index],
        type: 'UsageSecurity'
    }))
};
export const AnalysisMethodsByLanguage = (language) => {
    const description = {
        "TR": [
            'Her gönderen için toplam mesaj istatistikleri. En çok kullanılan kelimeler, emojiler ve daha fazlası...',
            'Her gönderen için aylara ve günlere göre mesaj istatistikleri. İstediğiniz günün mesaj istatistiklerini görün.',
            'Kendi verilerinizden mesajlar kullanarak eğlenceli ve sürpriz sohbetler yapabilirsiniz 😍💬.'
        ],
        "EN": [
            'Total messaging statistics for each sender. Most used words, emojis and more...',
            'Messaging statistics by months and days for each sender. See the message statistics for the day you want.',
            'You can have funny and surprise chats using messages from your own data 😍💬.'
        ]
    }
    return (
        [
            {id:'simple', color: COLORS.lightGreen, title:'Simple', description:description[language][0]},
            {id:'advanced', color: COLORS.purple, title:'Advanced', description:description[language][1]},
            {id:'chat', color:  COLORS.deneme, title:'Chat', description:description[language][2]}
        ]
    )
}
export const AdvancedTableRow = (language) => {
    const titles = {
        "TR": {
            "message": "Mesaj",
            "emoji": "Emoji",
            "photo": "Fotoğraf",
            "video": "Video",
            "audio": "Ses",
            "document": "Dosya",
            "GIF": "GIF",
            "Sticker": "Sticker",
            "Link": "Link",

        },
        "EN": {
            "message": "Message",
            "emoji": "Emoji",
            "photo": "Photo",
            "video": "Video",
            "audio": "Audio",
            "document": "Document",
            "GIF": "GIF",
            "Sticker": "Sticker",
            "Link": "Link",

        }
    }
    return (

            [
                {title: titles[language]["message"], key: 'message', patch: null},
                {title: titles[language]["emoji"], key: 'emoji', patch: null},
                {title: titles[language]["photo"], key: 'media', patch: 'image'},
                {title: titles[language]["video"], key: 'media', patch: 'video'},
                {title: titles[language]["audio"], key: 'media', patch: 'audio'},
                {title: titles[language]["document"], key: 'others', patch: 'document'},
                {title: titles[language]["GIF"], key: 'others', patch: 'gif'},
                {title: titles[language]["Sticker"], key: 'others', patch: 'sticker'},
                {title: titles[language]["Link"], key: 'others', patch: 'link'},
            ]

    )
}
export const welcomeTranslation = {
        "TR": {
            "0": {title:"Synto ya Hoş Geldiniz!", desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias error fugiat optio perferendis, quisquam reprehenderit sed sequi soluta vitae voluptatibus."},
            "1": {title:"Dil", desc:"Kullanmak istediğiniz dili seçin"},
            "2": {title:"Tarih Formatı", desc:"Kullanmak istediğiniz tarih formatını seçin"},
            "3": {title:"Synto ya Hoş Geldiniz!", desc:"Synto ile mesajlarınızı derinlemesine analiz edebilir, genel veya günlük etkileşimlerinizi gözden geçirebilir ve arkadaşlarınızla bu veriler içinde sohbet edebilirsiniz. \n\n Synto, sizin için mesajlaşma deneyimini daha anlamlı ve eğlenceli hale getirmeyi amaçlıyor. "},
            "4": {title:"Mesaj Analizi", desc:"Synto, mesajlarınızı derinlemesine analiz ederek konuşma eğilimleriniz, sık kullanılan ifadeleriniz sık kullanılan kelimeleriniz ve medya gönderimleriniz gibi birçok durumu belirleyerek duygu durumlarınızı anlamanızı sağlar. Bu sayede iletişiminizi daha iyi anlayabilir ve geliştirebilirsiniz."},
            "5": {title:"Gün Gün İzleme", desc:"Her gününüzü etkileşimlerinize göre görsel olarak izleyin. Hangi günler daha fazla iletişimde bulunduğunuzu ve hangi günler daha az iletişimde olduğunuzu görün."},
            "6": {title:"Arkadaşlarınızla Sohbet", desc:"Mesajlarınızı analiz ettirdiğiniz arkadaşlarınızla bu veriler üzerinde sohbet edin."},
            "7": {title:"Güvenlik ve Gizlilik", desc:"Synto, tüm analiz işlemlerini doğrudan cihazınızda gerçekleştirir. Bu, kişisel mesajlarınızın veya verilerinizin internet ortamından geçmediği anlamına gelir. Bu sayede, gizliliğiniz maksimum düzeyde korunur."},
            "8": {title:"Kullanıcı Dostu Arayüz", desc:"Synto'nun kullanıcı dostu arayüzü, herkesin kolayca kullanabilmesi için tasarlanmıştır. Kullanımı basit ve sezgiseldir, böylece hemen analiz yapmaya başlayabilirsiniz."},
            "9": {title:"Hazırsın!", desc:"Uygulamayı Kullanmaya Başla"},
        },
        "EN": {
            "0": {title: "Welcome to Synto!", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias error fugiat optio perferendis, quisquam reprehenderit sed sequi soluta vitae voluptatibus."},
            "1": {title: "Language", desc: "Select the language you want to use"},
            "2": {title: "Date Format", desc: "Select the date format you want to use"},
            "3": {title: "Welcome to Synto!", desc: "With Synto, you can analyze your messages in depth, review your general or daily interactions, and chat with your friends within this data.\n\nSynto aims to make your messaging experience more meaningful and enjoyable for you."},
            "4": {title: "Message Analysis", desc: "Synto analyzes your messages in depth, allowing you to understand your conversation trends, frequently used expressions, commonly used words, and media submissions, among other aspects. This enables you to better understand and improve your communication."},
            "5": {title: "Day-to-Day Tracking", desc: "Visually track each of your days based on your interactions. See which days you had more communication and which days you had less."},
            "6": {title: "Chat with Friends", desc: "Chat with your friends who have also analyzed their messages based on this data."},
            "7": {title: "Security and Privacy", desc: "Synto performs all analysis processes directly on your device. This means that your personal messages or data do not pass through the internet. As a result, your privacy is maximally protected."},
            "8": {title: "User-Friendly Interface", desc: "Synto's user-friendly interface is designed for everyone to use easily. It is simple and intuitive to use, so you can start analyzing right away."},
            "9": {title: "You're Ready!", desc: "Start Using the Application"}
        }
}
export const translations = {
    "TR": {
        "settings": "Ayarlar",
        "chat_settings": "Chat Ayarları",
        "select_doc": "Dosya Seç",
        "selected_doc": "Seçili Dosya",
        "select_your_date_format": "Tarih Formatını Seç",
        "select_your_language": "Dilini Seç",
        "choose_who_you_are": "Kim olduğunu seç",
        "close": "Kapat",
        "clear_selected_document": "Seçili Dosyayı Temizle",
        "no_file_selected": "Seçili Dosya Yok",
        "message_analysis": "Mesaj Analiz",
        "explore": "Keşfet",
        "language": "Dil",
        "date_format": "Tarih Formatı",
        "simple": "Basit",
        "advanced": "Gelişmiş",
        "started": "Başladı",
        "start": "Başla",
        "next": "İleri",
        "step_by_step_how_to_use": "Adım Adım Nasıl Kullanılır?",
        "learn_about_security": "Güvenlik Hakkında Bilgi Alın",
        "swipe_left_for_next_item": "Bir sonraki madde için sola kaydırın",
        "swipe_down_to_exit_the_information_screen": "Bilgilendirme ekranından çıkmak için aşağı kaydırın",
        "chat_desc": "Burada yer alan veriler gerçek hayatla ilişkilendirilemez.",
        "type_something": "Bir şeyler yaz...",
        "send_message_as": "olarak bir mesaj gönder",
        "change_person": "Kişi Değiştir",
        "reset_conversation": "Konuşmayı Sıfırla",
        "generate_pdf": "PDF oluştur",
        "emoji_conf_desc": "En çok kullanılan emojilerin EMOJİ KONFETİ'sini tekrar görmek için dokunun",
        "message": "mesaj","photo": "fotoğraf", "audio": "ses", "document": "dosya", "etc": "vb", "total": "Toplam",
        "average": "ortalama",
        "advanced_monthly_title": "Daha detaylı veriler için lütfen grafikten bir gün seçin.",
        "analysisTitles" : ["Toplam Mesaj", "En Çok Mesajlaşılan Tarih", "Mesajlaşılan Zamanlar", "Mesaj Gönderimi", "Toplam Kelime", "En Çok Gönderilen Kelimeler", "Toplam Emoji", "Emoji Gönderimi", "En Çok Gönderilen Emojiler", "Toplam Fotoğraf", "Fotoğraf Gönderimi", "Toplam Video", "Video Gönderimi", "Toplam Ses Kaydı", "Ses Kaydı Gönderimi", "Toplam Belge", "Belge Gönderimi", "Toplam GIF", "GIF Gönderimi", "Toplam Medya", "Toplam Diğerler"],
    },
    "EN": {
        "settings": "Settings",
        "chat_settings": "Chat Settings",
        "select_doc": "Select Doc",
        "selected_doc": "Selected Document",
        "select_your_date_format": "Select Your Date Format",
        "select_your_language": "Select Your Language",
        "choose_who_you_are": "Choose who you are",
        "close": "Close",
        "clear_selected_document": "Clear Selected Document",
        "no_file_selected": "No file selected",
        "message_analysis": "Message Analysis",
        "explore": "Explore",
        "language": "Language",
        "date_format": "Date Format",
        "simple": "Simple",
        "advanced": "Advanced",
        "started": "Started",
        "start": "Start",
        "next": "Next",
        "step_by_step_how_to_use": "Step-By-Step How To Use?",
        "learn_about_security": "Learn About Security",
        "swipe_left_for_next_item": "Swipe left for next item",
        "swipe_down_to_exit_the_information_screen": "Swipe down to exit the information screen",
        "chat_desc": "The data contained here cannot be associated with real life.",
        "type_something": "Type something...",
        "send_message_as": "Send a message as",
        "change_person": "Change Person",
        "reset_conversation": "Reset Conversation",
        "generate_pdf": "Generate PDF",
        "emoji_conf_desc": "Tap to see the EMOJI CONFETTI of the most used emojis again",
        "message": "message","photo": "photo", "audio": "audio", "document": "document", "etc": "etc",  "total": "Total",
        "average": "average",
        "advanced_monthly_title": "For more detailed data, please select a day from the chart.",
       "analysisTitles": ["Total Messages", "Most Messaged Date", "Messaging Times", "Message Sending", "Total Words", "Most Sent Words", "Total Emojis", "Emoji Sending", "Most Sent Emojis", "Total Photos", "Photo Sending", "Total Videos", "Video Sending", "Total Voice Messages", "Voice Message Sending", "Total Documents", "Document Sending", "Total GIFs", "GIF Sending", "Total Media", "Total Others"],
    }
};
export const texts = {
    buttons : {
        select_doc: {"TR": 'Dosya Seç', "EN": 'Select Doc'},
        how_to_use: {"TR": 'Adım Adım Nasıl Kullanılır?', "EN": 'Step-By-Step How To Use?'},
        learn_security: {"TR": 'Gizlilik Hakkında', "EN": 'Learn About Security'},
    },
    settings: {"TR": 'Ayarlar', "EN": 'Settings'},
    select_your_date_format: {"TR": 'Tarih Formatını Seç', "EN": 'Select Your Date Format'},
    select_your_language: {"TR": 'Dilini Seç', "EN": 'Select Your Language'},
    close: {"TR": 'Kapat', "EN": 'Close'},
    clear_selected_document: {"TR": 'Seçili Dosyayı Temizle', "EN": 'Clear Selected Document'},
    no_file_selected: {"TR": 'Seçili Dosya Yok', "EN": 'No file selected'},
}

export const icons = {
    image: '🖼️',
    video: '📹',
    audio: '🎵',
    document: '📄',
    gif: '🎥',
    sticker: '🌟',
    location: '📍',
    deleted: '❌',
}
export const htmlMaker = (names, dateDataforPDF, data, language) => {
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
                    <h1 style="color: ${COLORS.darkGreen}">${translations[language]["simple"] + " " + translations[language]["message_analysis"]}</h1>
                    <p style="color: ${COLORS.darkGreen}; font-size: 25px; margin-top: -15px;">${names[0]} - ${names[1]}</p>
                    <p style="color: ${COLORS.darkGreen}; font-size: 15px; margin-top: -15px;">${dateDataforPDF.timeInterval}</p>
                </div>
                <div>
                    <p style="color: ${COLORS.darkGreen};">${translations[language]["analysisTitles"][1]}</p>
                    <p style="color: ${COLORS.darkGreen}; font-size: 30px; font-weight: 900; margin-top: -15px; text-align: end">${dateDataforPDF.mostRepeatedDate}</p>
                </div>
            </div>
            ${generateDataRow('', { fontSize: '10px', backgroundColor: 'white', borderColor: COLORS.lightGray} ,'names')}
            ${generateSendingsDataRow(translations[language]["analysisTitles"][3], sendingsCountData.messageCounts)}
            ${generateSendingsDataRow(translations[language]["analysisTitles"][7], sendingsCountData.emojiCounts)}
            ${generateSendingsDataRow(translations[language]["analysisTitles"][10], sendingsCountData.mediaCounts.image)}
            ${generateSendingsDataRow(translations[language]["analysisTitles"][12], sendingsCountData.mediaCounts.video)}
            ${generateSendingsDataRow(translations[language]["analysisTitles"][14], sendingsCountData.mediaCounts.audio)}
            ${generateSendingsDataRow(translations[language]["analysisTitles"][16], sendingsCountData.mediaCounts.document)}
            ${generateSendingsDataRow(translations[language]["analysisTitles"][18], sendingsCountData.mediaCounts.gif)}
            <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 10px">
                <div style="width: 350px;">
                    <p style="color: ${COLORS.darkGreen};">${translations[language]["analysisTitles"][5]}✏️</p>
                    ${generateDataRow('', { fontSize: '10px', backgroundColor: 'white', borderColor: COLORS.lightGray} ,'names')}
                    ${mostRepeatedWordsAndSenders.slice(0, 10).map(wordData => generateWordsDataRow(wordData)).join('')}
                    
                </div>
                <div style="width: 350px;">
                    <p style="color: ${COLORS.darkGreen};">${translations[language]["analysisTitles"][8]} 🎉</p>
                    ${generateDataRow('', { fontSize: '10px', backgroundColor: 'white', borderColor: COLORS.lightGray} ,'names')}
                    ${mostUsedEmojisAndSenders.slice(0, 10).map(emojiData => generateEmojisDataRow(emojiData)).join('')}
                </div>
            </div>
        </body>
        </html>
    `;
};
