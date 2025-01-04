const axios = require("axios");

async function handleHentaiVid(zk, msg, dest) {
  const command = msg.body.toLowerCase();
  const prefix = "!hentaivid";

  // Liste des vidéos disponibles
  const videoLinks = [
    { title: "Anime Relaxation Video 1", url: "https://example.com/video1.mp4" },
    { title: "Anime Relaxation Video 2", url: "https://example.com/video2.mp4" },
    { title: "Anime Chill Clips", url: "https://example.com/video3.mp4" },
    { title: "Kawaii Anime Loops", url: "https://example.com/video4.mp4" },
  ];

  if (command.startsWith(prefix)) {
    // Commande pour lister les vidéos
    let menuText = `
🎥 *Anime Video Selector* 🎥

Voici les vidéos disponibles :
`;
    videoLinks.forEach((vid, index) => {
      menuText += `\n${index + 1}. ${vid.title}`;
    });
    menuText += `\n\n💡 Tapez *!hentaivid [numéro]* pour télécharger une vidéo.`;

    await zk.sendMessage(dest, { text: menuText }, { quoted: msg });
  } else if (command.startsWith("!hentaivid")) {
    // Commande pour envoyer une vidéo spécifique
    const num = parseInt(command.split(" ")[1]);
    if (isNaN(num) || num < 1 || num > videoLinks.length) {
      return zk.sendMessage(dest, { text: "❌ Numéro invalide. Essayez à nouveau." }, { quoted: msg });
    }

    const selectedVideo = videoLinks[num - 1];
    await zk.sendMessage(
      dest,
      {
        video: { url: selectedVideo.url },
        caption: `🎥 *${selectedVideo.title}* 🎥\nVoici votre vidéo sélectionnée.`,
      },
      { quoted: msg }
    );
  }
}

module.exports = {
  handleHentaiVid,
};
