const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialiser le client WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(), // Garde l'authentification locale
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code généré, scannez pour vous connecter.');
});

client.on('ready', () => {
    console.log('Le client est prêt !');
});

// Réactions automatiques
client.on('message', async (message) => {
    const triggers = {
        'salut': '👋',
        'merci': '🙏',
        'bonjour': '🌞',
        'wow': '😲',
        'lol': '😂',
        'cool': '😎',
        'triste': '😢',
    };

    // Vérifier les mots-clés et réagir
    for (const trigger in triggers) {
        if (message.body.toLowerCase().includes(trigger)) {
            const reaction = triggers[trigger];
            await client.sendMessage(message.from, reaction);
            console.log(`Réaction envoyée : ${reaction} pour le message : "${message.body}"`);
            break;
        }
    }
});

client.initialize();
