module.exports = {
    name: "botinfo",
    description: "Affiche les informations du bot",
    execute: async (client, message, args) => {
        const botName = "ARIMA BOT";
        const creator = "MASTERMIND";
        const version = "1.0.0";
        
        const response = `🤖 *${botName}*\n👤 Créé par: ${creator}\n🔄 Version: ${version}`;
        await message.reply(response);
    }
};
