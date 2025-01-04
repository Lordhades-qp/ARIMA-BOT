module.exports = {
  name: "alive",
  description: "Vérifie si le bot est en ligne",
  execute(client, message, args) {
    message.reply("✅ Le bot est actif et fonctionne correctement !");
  },
};
