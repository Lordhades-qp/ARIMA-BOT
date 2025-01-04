const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@adiwajshing/baileys');
const fs = require('fs');
const path = require('path');

// Initialisation du bot
async function startArimaBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    // Connexion réussie
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connexion fermée. Reconnexion :', shouldReconnect);
            if (shouldReconnect) startArimaBot();
        } else if (connection === 'open') {
            console.log('ArimaBot connecté avec succès !');
        }
    });

    // Sauvegarde des informations d'authentification
    sock.ev.on('creds.update', saveCreds);

    // Réponse aux messages
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type === 'notify') {
            const msg = messages[0];
            if (!msg.message) return;

            const from = msg.key.remoteJid;
            const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text;

            console.log(`Message reçu de ${from}:`, messageContent);

            // Exemple de réponse automatisée
            if (messageContent?.toLowerCase() === 'bonjour') {
                await sock.sendMessage(from, { text: 'Bonjour ! Comment puis-je vous aider ?' });
            } else if (messageContent?.toLowerCase() === 'menu') {
                const menu = `
🌟 *ArimaBot Menu* 🌟
1. Informations
2. Aide
3. Commandes spéciales
2250565647864@.`;
                await sock.sendMessage(from, { text: menu });
            }
        }
    });
}

// Lancer le bot
startArimaBot().catch((err) => {
    console.error('Erreur lors du démarrage du bot :', err);
});
