const { default: makeWASocket, useMultiFileAuthState } = require('@adiwajshing/baileys');
const fs = require('fs');
const path = require('path');

// Chemin des fichiers audio
const soundFolder = path.join(__dirname, 'sounds');

// Fonction principale
async function startArimaSound() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    // Connexion réussie
    sock.ev.on('connection.update', (update) => {
        const { connection } = update;
        if (connection === 'open') {
            console.log('ArimaSound est prêt à envoyer des sons 🎵');
        }
    });

    // Sauvegarde des informations d'authentification
    sock.ev.on('creds.update', saveCreds);

    // Gestion des messages
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type === 'notify') {
            const msg = messages[0];
            if (!msg.message) return;

            const from = msg.key.remoteJid;
            const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text;

            console.log(`Message reçu de ${from}:`, messageContent);

            // Commande pour envoyer un son
            if (messageContent?.toLowerCase().startsWith('!sound')) {
                const args = messageContent.split(' ');
                const soundName = args[1]?.toLowerCase();

                if (!soundName) {
                    await sock.sendMessage(from, { text: 'Veuillez spécifier un son. Exemple : `!sound hello`' });
                    return;
                }

                const soundPath = path.join(soundFolder, `${soundName}.mp3`);
                if (fs.existsSync(soundPath)) {
                    await sock.sendMessage(from, {
                        audio: { url: soundPath },
                        mimetype: 'audio/mpeg',
                        ptt: false, // Mettre à true pour envoyer comme un message vocal
                    });
                } else {
                    await sock.sendMessage(from, { text: `Son introuvable : "${soundName}". Ajoutez le fichier "${soundName}.mp3" dans le dossier "sounds".` });
                }
            }
        }
    });
}

// Lancer le bot
startArimaSound().catch((err) => {
    console.error('Erreur lors du démarrage d\'ArimaSound :', err);
});
