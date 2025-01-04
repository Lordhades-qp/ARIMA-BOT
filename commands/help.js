client.ev.on("messages.upsert", async (message) => {
  const msg = message.messages[0];
  if (!msg.message) return;

  const type = Object.keys(msg.message)[0];
  const text = msg.message.conversation || msg.message[type]?.text || "";

  if (text.startsWith("!help")) {
    const helpMessage = `
*Liste des commandes disponibles :*
- !help : Affiche cette liste.
- !info : Affiche les informations sur le bot.
- !ping : Vérifie la latence du bot.
- !joke : Envoie une blague.
- !sticker : Convertit une image en sticker.
... (ajoutez d'autres commandes ici) ...
    `;

    await client.sendMessage(msg.key.remoteJid, { text: helpMessage });
  }
});
