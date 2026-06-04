require('dotenv').config();
const mineflayer = require('mineflayer');
const axios = require('axios');

const bot = mineflayer.createBot({
    host: '', //Buraya IP yaz
    port: 25565, //Buraya portu yaz
    username: '', //Buraya bot ismini yaz
    version: false, //Buraya sürüm yaz(false önerilir)
    checkTimeoutInterval: 120000, //Buraya sadece ne yaptığını biliyorsansa dokun!
    clientBrand: 'vanillia' //Buraya sadece ne yaptığını biliyorsansa dokun!
});

async function getAIResponse(userMessage) {
    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'openai/gpt-3.5-turbo', //Buraya istediğin modeli yaz
            max_tokens: 150,
            messages: [
                { 
                    role: 'system', 
                    content: '' //Buraya kendi öğretmek istediklerini yaz
                },
				
                { 
                    role: 'user', 
                    content: userMessage 
                }
            ]
        }, {
            headers: { 
                'Authorization': `Bearer ${process.env.OPENROUTER_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': '', //Buraya web siteni yaz, sonuna / koyma! Örnek: https://google.com
                'X-Title': '' //Buraya bot adını yaz
            }
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('AI hatası:', error.response ? error.response.data : error.message);
        return "Limitime takıldım aga, sonra dene.";
    }
}

bot.on('register', () => {
    bot.chat('/register (buraya şifre yaz) (şifreyi tekrarla)');
});

bot.on('login', () => {
    bot.chat('/login (buraya aynı şifreyi yaz)');
});

//bot.on('spawn', () => {
//    bot.chat('/server smp'); 
//});

bot.on('chat', async (username, message) => {
    if (username === bot.username) return;

    const isOwner = username.toLowerCase().includes(''); //Buraya kendi adını yaz, tam küçük harflerle
    const isMention = message.toLowerCase().includes(''); //Buraya botun adının aynısını yaz, tam küçük harflerle
    
    if (isOwner || isMention) {
        console.log(`${username} tarafından çağrıldım: ${message}`);
        
        const aiAnswer = await getAIResponse(message);
        
        const finalMessage = `${aiAnswer} - [${username}]`;
        
        setTimeout(() => {
            bot.chat(`/msg ${username} ${finalMessage}`);
        }, 1200 + Math.random() * 800);
    }
});

bot.on('error', (err) => {
    if (err.message && err.message.includes('Chunk size')) return;
    console.log('Bot hatası:', err);
});

bot.on('end', () => {
    console.log('Bağlantı koptu, yeniden başlatılıyor...');
    setTimeout(() => {
        process.exit(1);
    }, 5000);
});

bot.on('kicked', (reason) => console.log('Bot sunucudan atıldı:', reason));
