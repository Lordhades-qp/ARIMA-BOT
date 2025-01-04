const { MessageType } = require("@adiwajshing/baileys");

async function handleUnblock(zk, msg, dest) {
  const command = msg.body.toLowerCase();
  const prefix = "!unblock";

  if (command.startsWith(prefix)) {
    const userToUnblock = msg.mentions[0] || command.replace(prefix, "").trim();

    if (!userToUnblock) {
      return zk.sendMessage(dest, { text: "❌ Veuillez spécifier un utilisateur à débloquer." }, { quoted: msg });
    }

    try {
      // Récupérer les informations sur l'utilisateur mentionné ou celui spécifié par le nom
      const user = userToUnblock.includes("@") ? userToUnblock : `@${userToUnblock}`;

      // Débloquer l'utilisateur
      await zk.updateBlockStatus(user, false);

      // Envoi de confirmation
      const confirmationMessage = `✅ L'utilisateur ${user} a été débloqué avec succès.`;

      await zk.sendMessage(dest, { text: confirmationMessage }, { quoted: msg });
    } catch (error) {
      console.error("Erreur lors du déblocage de l'utilisateur :", error);
      zk.sendMessage(dest, { text: "❌ Une erreur est survenue lors du déblocage de l'utilisateur." }, { quoted: msg });
    }
  }
}

module.exports = {
  handleUnblock,
};
