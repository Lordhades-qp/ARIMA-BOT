const { Client, LocalAuth } = require("whatsapp-web.js");
const express = require("express");
const qrcode = require("qrcode-terminal");

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
    authStrategy: new LocalAuth(), // Sauvegarde la session pour éviter de rescanner le QR code
    puppeteer: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
});

// Génération du QR Code
client.on("qr", (qr) => {
    console.log("Scan ce QR Code avec WhatsApp:");
    qrcode.generate(qr, { small: true });
});

// Confirmation de connexion
client.on("ready", () => {
    console.log("✅ Arima Bot est connecté !");
});

// Écoute des messages
client.on("message", async (msg) => {
    console.log(`Message reçu de ${msg.from}: ${msg.body}`);

    if (msg.body.toLowerCase() === "hello") {
        msg.reply("Salut ! Comment puis-je t'aider ?");
    }
});

// Démarrage du bot
client.initialize();

// Serveur Express pour Render
app.get("/", (req, res) => {
    res.send("Arima Bot est actif !");
});

app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur le port ${port}`);
});
