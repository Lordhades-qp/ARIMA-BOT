const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (msg) => {
    if (msg.body.startsWith('!add ')) {
        const chat = await msg.getChat();
        if (chat.isGroup) {
            const mentions = await msg.getMentions();
            mentions.forEach((contact) => {
                chat.addParticipants([contact.id._serialized]);
            });
        }
    }
});

client.initialize();
