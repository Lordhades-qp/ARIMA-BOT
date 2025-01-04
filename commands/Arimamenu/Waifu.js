const axios = require("axios");

async function handleWaifu(zk, msg, dest) {
  const command = msg.body.toLowerCase();
  const prefix = "!waifu";

  if (command.startsWith(prefix)) {
    const waifuOptions = [
      "Zero Two (Darling in the Franxx)",
      "Hinata Hyuga (Naruto)",
      "Rem (Re:Zero)",
      "Asuna Yuuki (Sword Art Online)",
      "Mikasa Ackerman (Attack on Titan)",
      "Saber (Fate Series)",
    ];

    let menuText = `
💖 *Waifu Generator* 💖

Choisissez une waifu pour obtenir une image ou des informations :
`;
    waifuOptions.forEach((waifu, index) => {
      menuText += `\n${index + 1}. ${waifu}`;
    });
    menuText += `\n\n💡 Tapez *!waifu [numéro]* pour sélectionner.`;

    await zk.sendMessage(dest, { text: menuText }, { quoted: msg });
  } else if (command.startsWith("!waifu")) {
    const num = parseInt(command.split(" ")[1]);
    if (isNaN(num) || num < 1 || num > 6) {
      return zk.sendMessage(dest, { text: "❌ Numéro invalide. Essayez à nouveau." }, { quoted: msg });
    }

    const waifuData = [
      {
        name: "Zero Two",
        anime: "Darling in the Franxx",
        image: "https://example.com/zero-two.jpg",
        quote: "Darling, let's ride to the end of the world together.",
      },
      {
        name: "Hinata Hyuga",
        anime: "Naruto",
        image: "https://example.com/hinata-hyuga.jpg",
        quote: "My nindo, my ninja way, is to never give up!",
      },
      {
        name: "Rem",
        anime: "Re:Zero",
        image: "https://example.com/rem.jpg",
        quote: "I love you more than anything in the world.",
      },
      {
        name: "Asuna Yuuki",
        anime: "Sword Art Online",
        image: "https://example.com/asuna.jpg",
        quote: "There's no meaning to just living. It's the same as being dead.",
      },
      {
        name: "Mikasa Ackerman",
        anime: "Attack on Titan",
        image: "https://example.com/mikasa.jpg",
        quote: "The world is cruel, but it's also beautiful.",
      },
      {
        name: "Saber",
        anime: "Fate Series",
        image: "https://example.com/saber.jpg",
        quote: "I ask of you, are you my master?",
      },
    ];

    const selected = waifuData[num - 1];
    const caption = `💖 *${selected.name}* 💖\nAnime: ${selected.anime}\nQuote: "${selected.quote}"`;

    await zk.sendMessage(
      dest,
      { image: { url: selected.image }, caption },
      { quoted: msg }
    );
  }
}

module.exports = {
  handleWaifu,
};
