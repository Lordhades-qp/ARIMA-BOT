const fs = require("fs");
const path = require("path");

// Chargement des commandes depuis le dossier commands/
const commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

// Charger chaque commande
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

module.exports = async (client, message) => {
    try {
        // Extraction des infos du message
        const chat = message.from;
        const body = message.body.trim();
        const args = body.split(" ");
        const commandName = args.shift().toLowerCase();

        // Vérifier si c'est une commande valide
        if (commands.has(commandName)) {
            const command = commands.get(commandName);
            await command.execute(client, message, args);
        } else {
            console.log(`Commande inconnue: ${commandName}`);
        }
    } catch (error) {
        console.error("Erreur dans le handler:", error);
    }
};
