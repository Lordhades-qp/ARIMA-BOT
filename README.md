# ARIMA BOT 
`WhatsApp bot multi device`

![converted_image](https://github.com/user-attachments/assets/009c639c-3fea-4372-b728-c740d8aec591)


## WhatsApp Bot

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

</body>
  <!-- Image centrée -->
  <p align="center">
    <img src="https://api.shannmoderz.xyz/server/file/JhnZNPg59LpUxYf.jpg"/>
  </p>

  <!-- Texte animé personnalisé -->
  <p align="center">
    <a href="https://git.io/typing-svg">
      <img src="https://readme-typing-svg.demolab.com?font=EB+Garamond&weight=800&size=28&duration=4000&pause=1000&random=false&width=435&lines=+•★⃝+ARIMA+BOT+★⃝•;WHATSAPP+BOT;DEVELOPED+BY+ARIMA;RELEASED+DATE+03%2F01%2F2025." alt="Typing SVG" />
    </a>
  </p>
</body>
</html>


---


Ce bot utilise `node.js` pour interagir avec WhatsApp Web.

## Installation
1. Clonez ce dépôt 🔢

    ```bash
   git clone https://github.com/Lordhades-qp/ARIMA-BOT
   cd my-whatsapp-bot
   ```
3. Installez les dépendances :  
 
    ```bash
   npm install
   ```
4. Lancez le bot :  

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

startBot.
