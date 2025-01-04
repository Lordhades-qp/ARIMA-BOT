const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialiser le client WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(), // Garde l'authentification locale
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code généré, scannez pour vous connecter.');
});

client.on('ready', async () => {
    console.log('Le client est prêt !');
    viewStatuses();
});

// Fonction pour voir automatiquement les statuts
async function viewStatuses() {
    try {
        const chats = await client.getChats();
        const statusChats = chats.filter(chat => chat.isStatus); // Filtrer les statuts

        for (const status of statusChats) {
            await status.fetchMessages(); // Charger les statuts
            console.log(`Statut vu pour : ${status.name}`);
        }

        console.log('Tous les statuts ont été visualisés automatiquement.');
    } catch (error) {
        console.error('Erreur lors de la visualisation des statuts :', error);
    }
}

// Initialisation du client
client.on('message', (message) => {
    console.log(`Message reçu : ${message.body}`);
});

client.initialize();
