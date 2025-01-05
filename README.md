###         ARIMA BOT 
   `WhatsApp bot multi device`

![converted_image](https://github.com/user-attachments/assets/009c639c-3fea-4372-b728-c740d8aec591)

<p align="center">
  <img src="https://profile-counter.glitch.me/{ArimaBot}/count.svg" alt="ArimaBot :: Visitor's Count" />
</p>

<p align="center" style="font-size: 1.2em; font-weight: bold;">
  <span style="color: #ff9a9e;">✨</span> Meet <strong>Arima Bot</strong>, Your Multi-Device WhatsApp Assistant! 
  <span style="color: #fad0c4;">🌟</span> Let <strong>Arima Bot</strong> enhance every moment with creativity and automation. <span style="color: #a18cd1;">💬</span>
</p>

<p align="center">
  <a href="https://github.com/lordhades-qp/arima-bot/fork">
    <img title="ARIMA BOT" src="https://img.shields.io/badge/FORK-ARIMA BOT-h?color=blue&style=for-the-badge&logo=stackshare">
  </a>
</p>

<p align="center">
  <div style="background: linear-gradient(90deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1, #ff9a9e); height: 10px; animation: shimmer 5s linear infinite;">
  </div>
</p>


## 

<h2 align="center">Déployer ARIMA BOT</h2>

<p align="center">
  <strong>Choisissez une plateforme d'hébergement :</strong>
</p>

<p align="center">

----
   
 <!-- Render -->
  <a href="https://render.com/deploy?repo=https://github.com/lordhades-qp/arima-bot" target="_blank">
    <img src="https://img.shields.io/badge/Render-Deploy-blueviolet?logo=render&logoColor=white" alt="Render">
  </a>

----

  
##  [Déployer sur Replit](https://replit.com)
<a href="https://replit.com/github/lordhades-qp/arima-bot" target="_blank">
  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Replit_Logo.png" alt="Run on Replit" width="200">
</a>

   ----- 
   
  <!-- Koyeb -->
  <a href="https://app.koyeb.com/deploy?repository=https://github.com/lordhades-qp/arima-bot" target="_blank">
    <img src="https://img.shields.io/badge/Koyeb-Deploy-brightgreen?logo=koyeb&logoColor=white" alt="Koyeb">
  </a>


  ----
  
  <!-- Heroku -->
  <a href="https://heroku.com/deploy?template=https://github.com/lordhades-qp/arima-bot" target="_blank">
    <img src="https://img.shields.io/badge/Heroku-Deploy-purple?logo=heroku&logoColor=white" alt="Heroku">
  </a>
</p>

-----


##  [Déployer sur Vercel](https://vercel.com)
<a href="https://vercel.com/new" target="_blank">
  <img src="https://vercel.com/button" alt="Deploy to Vercel" width="200">
</a

-----

##

Pour automatiser les textes et déploiements en utilisant github action 

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
