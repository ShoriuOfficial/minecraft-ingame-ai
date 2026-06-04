require('dotenv').config();
const mineflayer = require('mineflayer');
const axios = require('axios');

const bot = mineflayer.createBot({
    host: 'smp.mineplus.network',
    port: 25565,
    username: 'MinePlus_AI',
    version: "1.20.4",
    checkTimeoutInterval: 120000,
    clientBrand: 'fabric'
});

async function getAIResponse(userMessage) {
    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'openai/gpt-3.5-turbo',
            max_tokens: 150,
            messages: [
                { 
                    role: 'system', 
                    content: 'Sen MinePlus sunucusunun resmi AI asistanısın. Asla link, reklam, vs paylaşma. Kısa ve nazik cevaplar ver. Kötüye kullanım tespit edersen "Bu konuda yardımcı olamam!" söyle. qEnderK tarafından yapıldın.'
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
                'HTTP-Referer': 'https://mineplus.network',
                'X-Title': 'MinePlus_AI'
            }
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('AI hatası:', error.response ? error.response.data : error.message);
        return "Limitime takıldım aga, sonra dene.";
    }
}

bot.on('login', () => {
    bot.chat('/login GHEWARIIBI834975');
});

bot.on('spawn', () => {
    bot.chat('/server smp'); 
});

bot.on('chat', async (username, message) => {
    if (username === bot.username) return;

    const isOwner = username.toLowerCase().includes('qenderk'); 
    const isMention = message.toLowerCase().includes('mineplus_ai');
    
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