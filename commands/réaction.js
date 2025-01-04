const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialisation du client
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scannez le QR code pour vous connecter.');
});

client.on('ready', () => {
    console.log('Bot prêt ! Réactions actives.');
});

// Configuration des mots-clés et des réactions
const reactions = {
    "bonjour": "👋",
    "merci": "🙏",
    "félicitations": "🎉",
    "cool": "😎",
    "haha": "😂",
    "triste": "😢",
    "love": "❤️"
};

// Écoute des messages
client.on('message', async (message) => {
    const text = message.body.toLowerCase();

    for (const keyword in reactions) {
        if (text.includes(keyword)) {
            try {
                await message.react(reactions[keyword]); // Réagit au message avec l'émoji
                console.log(`Réaction "${reactions[keyword]}" ajoutée au message contenant "${keyword}".`);
            } catch (err) {
                console.error(`Erreur lors de la réaction : ${err.message}`);
            }
            break;
        }
    }
});

client.initialize();
