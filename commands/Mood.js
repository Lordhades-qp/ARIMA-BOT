const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const sentiment = require('sentiment'); // Bibliothèque pour l'analyse d'humeur

// Initialisation du client
const client = new Client({
    authStrategy: new LocalAuth(),
});

const sentimentAnalyzer = new sentiment();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scannez le QR code pour connecter le bot.');
});

client.on('ready', () => {
    console.log('Bot prêt ! Analyse des humeurs activée.');
});

// Humeurs et réponses associées
const moodResponses = {
    positive: ["Super ! 😄", "Content de te voir heureux ! 🎉", "Garde cet esprit positif ! ✨"],
    negative: ["Oh, ça va aller. 😔", "Je suis là si tu veux parler. 🫂", "Courage, demain sera meilleur. 🌟"],
    neutral: ["D'accord ! 😊", "Je prends note. 👍", "Continue comme ça ! 😌"]
};

// Écoute des messages
client.on('message', async (message) => {
    const text = message.body;

    // Analyse de l'humeur
    const result = sentimentAnalyzer.analyze(text);
    const mood = result.score > 0 ? "positive" : result.score < 0 ? "negative" : "neutral";

    // Réponse basée sur l'humeur
    const responses = moodResponses[mood];
    const response = responses[Math.floor(Math.random() * responses.length)];

    try {
        await message.reply(response);
        console.log(`Humeur détectée : ${mood}. Réponse envoyée : "${response}"`);
    } catch (err) {
        console.error(`Erreur lors de l'envoi de la réponse : ${err.message}`);
    }
});

client.initialize();
