const moment = require("moment-timezone");

async function handleGeneriqueManga(zk, msg, dest) {
  const command = msg.body.toLowerCase();
  const prefix = "!generique";

  if (command.startsWith(prefix)) {
    const options = [
      { title: "Naruto - Blue Bird", url: "https://example.com/naruto-blue-bird.mp3" },
      { title: "One Piece - We Are!", url: "https://example.com/one-piece-we-are.mp3" },
      { title: "Attack on Titan - Guren no Yumiya", url: "https://example.com/attack-on-titan.mp3" },
      { title: "Demon Slayer - Gurenge", url: "https://example.com/demon-slayer.mp3" },
    ];

    // Créez un menu de sélection
    let menuText = `
🎵 *Génériques Manga* 🎵

Choisissez un générique à écouter :
`;
    options.forEach((opt, index) => {
      menuText += `\n${index + 1}. ${opt.title}`;
    });
    menuText += `\n\n💡 Tapez *!play [numéro]* pour écouter.`;

    await zk.sendMessage(dest, { text: menuText }, { quoted: msg });
  } else if (command.startsWith("!play")) {
    const num = parseInt(command.split(" ")[1]);
    if (isNaN(num) || num < 1 || num > 4) {
      return zk.sendMessage(dest, { text: "❌ Numéro invalide. Essayez à nouveau." }, { quoted: msg });
    }

    const selected = [
      { title: "Naruto - Blue Bird", url: "https://example.com/naruto-blue-bird.mp3" },
      { title: "One Piece - We Are!", url: "https://example.com/one-piece-we-are.mp3" },
      { title: "Attack on Titan - Guren no Yumiya", url: "https://example.com/attack-on-titan.mp3" },
      { title: "Demon Slayer - Gurenge", url: "https://example.com/demon-slayer.mp3" },
    ][num - 1];

    await zk.sendMessage(
      dest,
      { audio: { url: selected.url }, mimetype: "audio/mp4", ptt: false },
      { quoted: msg }
    );
  }
}

module.exports = {
  handleGeneriqueManga,
};
