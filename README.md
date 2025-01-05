##         ARIMA BOT 
   `WhatsApp bot multi device`

![converted_image](https://github.com/user-attachments/assets/009c639c-3fea-4372-b728-c740d8aec591)


## WhatsApp Bot

<h1 align="center">ARIMA BOT</h1>
<h2 align="center">WhatsApp Multi Device</h2>

<p align="center">
  <img src="https://via.placeholder.com/800x400?text=Arima+Bot" alt="Arima Bot Banner" style="width:70%; border-radius:10px;">
</p>

<p align="center">
  <strong>Arima Bot</strong> est un bot multi-fonction conçu pour WhatsApp Multi Device.
</p>

<p align="center">
  <a href="https://github.com/votre-repo/arima-bot" target="_blank" style="text-decoration:none;">
    <img src="https://img.shields.io/badge/version-1.0-blue" alt="Version">
  </a>
  <a href="https://github.com/votre-repo/arima-bot/issues" target="_blank" style="text-decoration:none;">
    <img src="https://img.shields.io/badge/issues-open-red" alt="Issues">
  </a>
  <a href="https://github.com/votre-repo/arima-bot" target="_blank" style="text-decoration:none;">
    <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  </a>
</p>


---


Ce bot utilise `node.js` pour interagir avec WhatsApp Web.



Pour automatiser les textes et déploiements en utilisant github action 


<h1 align="center">ARIMA BOT</h1>
<h2 align="center">WhatsApp Multi Device</h2>

<p align="center">
  <img src="https://via.placeholder.com/800x400?text=Arima+Bot" alt="Arima Bot Banner" style="width:70%; border-radius:10px;">
</p>

<p align="center">
  <strong>Arima Bot</strong> est un bot multi-fonction conçu pour WhatsApp Multi Device.
</p>

<p align="center">
  <a href="https://github.com/votre-repo/arima-bot" target="_blank" style="text-decoration:none;">
    <img src="https://img.shields.io/badge/version-1.0-blue" alt="Version">
  </a>
  <a href="https://github.com/votre-repo/arima-bot/issues" target="_blank" style="text-decoration:none;">
    <img src="https://img.shields.io/badge/issues-open-red" alt="Issues">
  </a>
  <a href="https://github.com/votre-repo/arima-bot" target="_blank" style="text-decoration:none;">
    <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  </a>
</p>




.`github/workflows/deploy.yml`

```
name: Deploy Bot

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Start bot
        run: node index.js
        ```

------

## Installation
1. Clonez ce dépôt

    ```bash
   git clone https://github.com/Lordhades-qp/ARIMA-BOT
   cd https://github.com/Lordhades-qp/ARIMA-BOT/tree/main
   ```
3. Installez les dépendances :  
 
    ```bash
   npm install
   ```
4. Lancez le bot :  

    ```bash
   npm start
   ```
```
npm install node-cache
```

---------

```
   const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function startBot() {
    const sock = makeWASocket({
        auth: state,
    });
    ```

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
