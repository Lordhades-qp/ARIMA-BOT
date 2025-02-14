module.exports = {
    name: "ping",
    description: "Renvoie 'Pong!'",
    execute: async (client, message, args) => {
        await message.reply("Pong! 🏓");
    }
};
