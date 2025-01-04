const { Client, LocalAuth } = require("whatsapp-web.js");
const fs = require("fs");
const path = require("path");

// Initialise le client WhatsApp avec une authentification locale
const client = new Client({
  authStrategy: new LocalAuth(),
});

// Collection pour stocker les commandes
const commands = new Map();

// Chargement des commandes depuis le dossier "commands"
fs.readdirSync("./commands").forEach((file) => {
  if (file.endsWith(".js")) {
    const command = require(path.join(__dirname, "commands", file));
    if (command.name) {
      commands.set(command.name, command);
    }
  }
});

// Événement déclenché lorsque le bot est prêt
client.on("ready", () => {
  console.log("✅ Bot WhatsApp est prêt !");
});

// Événement pour gérer les messages
client.on("message", async (message) => {
  const prefix = "!"; // Préfixe des commandes (modifiable selon vos besoins)
  
  // Vérifie si le message commence par le préfixe
  if (message.body.startsWith(prefix)) {
    const args = message.body.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Exécute la commande si elle existe
    if (commands.has(commandName)) {
      const command = commands.get(commandName);
      try {
        await command.execute(client, message, args);
      } catch (error) {
        console.error("❌ Erreur lors de l'exécution de la commande :", error);
        message.reply("❌ Une erreur est survenue lors de l'exécution de la commande.");
      }
    } else {
      message.reply("❌ Commande non reconnue.");
    }
  }
});

// Événement pour gérer les erreurs
client.on("error", (error) => {
  console.error("❌ Erreur détectée :", error);
});

// Lance le bot
client.initialize();
