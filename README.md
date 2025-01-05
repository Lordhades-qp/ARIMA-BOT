##         ARIMA BOT 
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


  <p align="center">
    <a href="https://git.io/typing-svg">
      <img src="https://readme-typing-svg.demolab.com?font=EB+Garamond&weight=800&size=28&duration=4000&pause=1000&random=false&width=435&lines=+•★⃝+ARIMA+BOT+★⃝•;WHATSAPP+BOT;DÉVELOPPÉ+PAR+ARIMA;DATE+DATE+03%2F01%2F2025." alt="Typing SVG" />
    </a>
  </p>
</body>
</html>


---


Ce bot utilise `node.js` pour interagir avec WhatsApp Web.



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Arima Bot</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: linear-gradient(45deg, #1e90ff, #00fa9a, #ff6347);
      font-family: Arial, sans-serif;
      color: white;
    }
    h1 {
      font-size: 3rem;
      text-align: center;
      background: linear-gradient(to right, #ffafbd, #ffc3a0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: glow 1.5s infinite alternate;
    }
    @keyframes glow {
      from {
        text-shadow: 0 0 10px #ffffff, 0 0 20px #ffafbd, 0 0 30px #ffc3a0;
      }
      to {
        text-shadow: 0 0 20px #ffffff, 0 0 30px #ffafbd, 0 0 40px #ffc3a0;
      }
    }
  </style>
</head>
<body>
  <h1>ARIMA BOT<br>WHATSAPP MULTI DEVICE</h1>
</body>
</html>




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
