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


<!DOCTYPE html>
<html>
<head>
  <style>
    /* Dégradé animé en arrière-plan */
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1);
      background-size: 400% 400%;
      animation: gradientBG 15s ease infinite;
      color: white;
      text-align: center;
    }

    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    h1 {
      font-size: 3em;
      margin-top: 20px;
      animation: textGlow 2s ease-in-out infinite alternate;
    }

    @keyframes textGlow {
      from { text-shadow: 0 0 5px #ff9a9e, 0 0 10px #fad0c4; }
      to { text-shadow: 0 0 20px #fbc2eb, 0 0 30px #a18cd1; }
    }

    .buttons {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .buttons a {
      text-decoration: none;
      color: white;
      padding: 10px 20px;
      margin: 10px;
      border-radius: 5px;
      font-size: 1.2em;
      transition: all 0.3s ease-in-out;
    }

    .buttons a:hover {
      transform: scale(1.1);
      box-shadow: 0 0 10px white, 0 0 20px #fad0c4;
    }

    .render { background: #6c63ff; }
    .koyeb { background: #34c759; }
    .heroku { background: #7952b3; }
    .fork { background: #f77f00; }
  </style>
</head>
<body>

  <h1>Bienvenue sur ARIMA BOT</h1>
  <p>Déployez ou forkez votre propre bot WhatsApp multi-device :</p>

  <div class="buttons">
    <!-- Render -->
    <a class="render" href="https://render.com/deploy?repo=https://github.com/lordhades-qp/arima-bot" target="_blank">
      🌟 Déployer sur Render 🌟
    </a>

    <!-- Koyeb -->
    <a class="koyeb" href="https://app.koyeb.com/deploy?repository=https://github.com/lordhades-qp/arima-bot" target="_blank">
      🚀 Déployer sur Koyeb 🚀
    </a>

    <!-- Heroku -->
    <a class="heroku" href="https://heroku.com/deploy?template=https://github.com/lordhades-qp/arima-bot" target="_blank">
      🛠️ Déployer sur Heroku 🛠️
    </a>

    <!-- Fork -->
    <a class="fork" href="https://github.com/lordhades-qp/arima-bot/fork" target="_blank">
      🍴 Forker le dépôt GitHub 🍴
    </a>
  </div>
</body>
</html>


-----


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
