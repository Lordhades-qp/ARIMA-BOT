const axios = require("axios");
const ytsr = require("ytsr"); // Bibliothèque pour rechercher des chansons sur YouTube
const ytdl = require("ytdl-core"); // Bibliothèque pour télécharger des chansons depuis YouTube

async function handleSong(zk, msg, dest) {
  const command = msg.body.toLowerCase();
  const prefix = "!song";

  if (command.startsWith(prefix)) {
    const songName = command.replace(prefix, "").trim();
    if (!songName) {
      return zk.sendMessage(dest, { text: "❌ Veuillez spécifier le nom d'une chanson ou un lien." }, { quoted: msg });
    }

    try {
      // Rechercher une chanson sur YouTube
      const searchResults = await ytsr(songName, { limit: 1 });
      if (!searchResults.items || searchResults.items.length === 0) {
        return zk.sendMessage(dest, { text: "❌ Aucune chanson trouvée." }, { quoted: msg });
      }

      const song = searchResults.items[0];
      const videoUrl = song.url;

      // Télécharger l'audio de la chanson
      const stream = ytdl(videoUrl, { filter: "audioonly", quality: "highestaudio" });
      const songCaption = `🎵 *${song.title}*\n🔗 ${videoUrl}\n\nTéléchargement en cours...`;

      await zk.sendMessage(dest, { text: songCaption }, { quoted: msg });
      await zk.sendMessage(
        dest,
        {
          audio: { stream },
          mimetype: "audio/mpeg",
          fileName: `${song.title}.mp3`,
          caption: `🎶 Voici votre chanson : *${song.title}*`,
        },
        { quoted: msg }
      );
    } catch (error) {
      console.error("Erreur lors de la recherche ou du téléchargement :", error);
      zk.sendMessage(dest, { text: "❌ Une erreur est survenue lors de la recherche ou du téléchargement." }, { quoted: msg });
    }
  }
}

module.exports = {
  handleSong,
};
