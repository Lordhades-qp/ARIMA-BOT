const { downloadMediaMessage } = require("@adiwajshing/baileys");

client.ev.on("messages.upsert", async (message) => {
  const msg = message.messages[0];
  if (!msg.message) return;

  const type = Object.keys(msg.message)[0];
  
  // Vérifier si le message est "vue unique"
  if (type === "viewOnceMessage") {
    const mediaMessage = msg.message.viewOnceMessage.message;
    const mediaType = Object.keys(mediaMessage)[0]; // imageMessage, videoMessage, etc.

    try {
      // Télécharger le média avant qu'il ne disparaisse
      const buffer = await downloadMediaMessage(
        msg,
        "buffer",
        {},
        {
          logger: console,
          // Remplacez par le chemin pour sauvegarder
          downloadPath: "./downloads",
        }
      );

      console.log(`Média téléchargé : ${mediaType}`);
      // Vous pouvez sauvegarder le média ou le traiter ici.
    } catch (err) {
      console.error("Erreur lors du téléchargement du média :", err);
    }
  }
});
