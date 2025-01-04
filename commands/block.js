const { MessageType } = require("@adiwajshing/baileys");

async function handleBlock(zk, msg, dest) {
  const command = msg.body.toLowerCase();
  const prefix = "!block";

  if (command.startsWith(prefix)) {
    const userToBlock = msg.mentions[0] || command.replace(prefix, "").trim();

    if (!userToBlock) {
      return zk.sendMessage(dest, { text: "❌ Veuillez spécifier un utilisateur à bloquer." }, { quoted: msg });
    }

    try {
      // Récupérer les informations sur l'utilisateur mentionné ou celui spécifié par le nom
      const user = userToBlock.includes("@") ? userToBlock : `@${userToBlock}`;

      // Bloquer l'utilisateur
      await zk.updateBlockStatus(user, true);

      // Envoi de confirmation
      const confirmationMessage = `✅ L'utilisateur ${user} a été bloqué avec succès.`;

      await zk.sendMessage(dest, { text: confirmationMessage }, { quoted: msg });
    } catch (error) {
      console.error("Erreur lors du blocage de l'utilisateur :", error);
      zk.sendMessage(dest, { text: "❌ Une erreur est survenue lors du blocage de l'utilisateur." }, { quoted: msg });
    }
  }
}

module.exports = {
  handleBlock,
};
