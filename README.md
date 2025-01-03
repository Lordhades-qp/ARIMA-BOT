# Chatbot-Test-
WhatsApp chatbot 

![converted_image](https://github.com/user-attachments/assets/009c639c-3fea-4372-b728-c740d8aec591)


## WhatsApp Bot


Ce bot utilise `node.js` pour interagir avec WhatsApp Web.

## Installation
1. Clonez ce dépôt :  
   ```bash
   git clone https://github.com/Lordhades-qp/Chatbot-Test.git
   cd my-whatsapp-bot
   ```
2. Installez les dépendances :  
   ```bash
   npm install
   ```
3. Lancez le bot :  
   ```bash
   npm start
   ```


---------

   const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function startBot() {
    const sock = makeWASocket({
        auth: state,
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('messages.upsert', async (msg) => {
        console.log(JSON.stringify(msg, undefined, 2));

        const message = msg.messages[0];
        if (!message.message) return;

        const content = message.message.conversation || '';
        if (content === 'ping') {
            await sock.sendMessage(message.key.remoteJid, { text: 'pong' });
        }
    });
}

startBot().catch((err) => console.error(err));
