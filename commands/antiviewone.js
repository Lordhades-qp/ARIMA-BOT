let antiViewOnce = true;

client.ev.on("messages.upsert", async (message) => {
  const msg = message.messages[0];
  if (!msg.message) return;

  const type = Object.keys(msg.message)[0];

  // Commande pour activer/désactiver
  if (type === "conversation" && msg.message.conversation.startsWith("!antiViewOnce")) {
    antiViewOnce = !antiViewOnce;
    client.sendMessage(msg.key.remoteJid, { text: `Anti vue unique est maintenant ${antiViewOnce ? "activé" : "désactivé"}.` });
    return;
  }

  // Si antiViewOnce est activé, traiter les messages "vue unique"
  if (antiViewOnce && type === "viewOnceMessage") {
    const mediaMessage = msg.message.viewOnceMessage.message;
    const mediaType = Object.keys(mediaMessage)[0];

    try {
      const buffer = await downloadMediaMessage(msg, "buffer");
      console.log(`Média téléchargé : ${mediaType}`);
      // Sauvegarder ou traiter le média ici
    } catch (err) {
      console.error("Erreur lors du téléchargement :", err);
    }
  }
});
