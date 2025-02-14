const fs = require("fs");
const path = require("path");

module.exports = {
    name: "help",
    description: "Affiche la liste des commandes",
    execute: async (client, message, args) => {
        const commandFiles = fs.readdirSync(path.join(__dirname)).filter(file => file.endsWith(".js"));
        let response = "📜 *Liste des commandes disponibles :*\n";
        
        commandFiles.forEach(file => {
            const command = require(`./${file}`);
            response += `➤ *${command.name}* : ${command.description}\n`;
        });

        await message.reply(response);
    }
};
