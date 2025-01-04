const { makeWASocket } = require('@whiskeysockets/baileys');

exports.sendMessageToWhatsApp = async (message) => {
    const sock = makeWASocket();
    await sock.sendMessage('2250565647864@s.whatsapp.net', { text: message });
    return { success: true };
};
