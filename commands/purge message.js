const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialiser le client WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code généré, scannez pour vous connecter.');
});

client.on('ready', () => {
    console.log('Le client est prêt !');
});

// Commande de purge
client.on('message', async (message) => {
    if (message.body.toLowerCase() === '!purge') { // Commande pour purger
        const chat = await message.getChat();

        if (!chat.isGroup) {
            message.reply('❌ Cette commande ne fonctionne que dans les groupes.');
            return;
        }

        if (!chat.participants) {
            message.reply('❌ Impossible de récupérer les participants. Vérifiez vos permissions.');
            return;
        }

        const adminIds = (await chat.getAdmins()).map(admin => admin.id._serialized);
        const botId = client.info.wid._serialized;

        if (!adminIds.includes(botId)) {
            message.reply('❌ Je dois être administrateur pour purger ce groupe.');
            return;
        }

        // Supprimer tous les messages
        const messages = await chat.fetchMessages({ limit: 100 });
        for (const msg of messages) {
            if (!msg.fromMe) continue; // Supprime uniquement les messages envoyés par le bot
            try {
                await msg.delete(true); // Supprime le message
            } catch (err) {
                console.error(`Erreur lors de la suppression du message : ${err.message}`);
            }
        }

        message.reply('✅ Tous les messages récents envoyés par moi ont été purgés.');
    }
});

client.initialize();
