const { MessageType } = require('@adiwajshing/baileys');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const s = require('./set'); // Vous pouvez adapter selon la configuration de votre bot

// Fonction pour envoyer une citation aléatoire d'Anime
async function sendRandomAnimeQuote(zk, dest, msg) {
  try {
    const response = await axios.get('https://animechan.vercel.app/api/random');
    const quoteData = response.data;

    const quoteMessage = `
    *Citation d'Anime* 🎥🎬

    Personnage : ${quoteData.character}
    Anime : ${quoteData.anime}
    Citation : "${quoteData.quote}"
    `;

    await zk.sendMessage(dest, { text: quoteMessage }, { quoted: msg });
  } catch (error) {
    console.error("Erreur lors de l'obtention de la citation d'anime:", error);
    zk.sendMessage(dest, "Désolé, je n'ai pas pu obtenir de citation d'anime.", { quoted: msg });
  }
}

// Fonction pour envoyer une image d'anime aléatoire
async function sendRandomAnimeImage(zk, dest, msg) {
  try {
    const response = await axios.get('https://api.catboys.com/img');
    const imageUrl = response.data.url;

    await zk.sendMessage(dest, { image: { url: imageUrl }, caption: 'Voici une image d\'anime pour toi !' }, { quoted: msg });
  } catch (error) {
    console.error("Erreur lors de l'obtention de l'image d'anime:", error);
    zk.sendMessage(dest, "Désolé, je n'ai pas pu obtenir d'image d'anime.", { quoted: msg });
  }
}

// Fonction pour obtenir des informations sur un personnage d'anime (en utilisant un API fictif)
async function sendAnimeCharacterInfo(zk, dest, msg, characterName) {
  try {
    const response = await axios.get(`https://anime-api.com/characters/${characterName}`);
    const characterData = response.data;

    const characterInfoMessage = `
    *Informations sur le personnage* 👤

    Nom : ${characterData.name}
    Anime : ${characterData.anime}
    Rôle : ${characterData.role}
    Description : ${characterData.description}
    `;

    await zk.sendMessage(dest, { text: characterInfoMessage }, { quoted: msg });
  } catch (error) {
    console.error("Erreur lors de l'obtention des informations sur le personnage d'anime:", error);
    zk.sendMessage(dest, "Désolé, je n'ai pas pu trouver d'informations sur ce personnage.", { quoted: msg });
  }
}

// Fonction pour envoyer des commandes d'anime disponibles
async function sendOtakuCommands(zk, dest, msg) {
  const commandsMessage = `
  *Commandes Otaku* 🖥️📱

  1. !animequote - Obtenir une citation aléatoire d'anime
  2. !animeimage - Obtenir une image aléatoire d'anime
  3. !animeinfo [Nom du personnage] - Obtenir des informations sur un personnage d'anime
  4. !otakumenu - Afficher ce menu des commandes Otaku

  Amuse-toi bien ! 🎉
  `;

  await zk.sendMessage(dest, { text: commandsMessage }, { quoted: msg });
}

// Commande principale du bot
async function otakuCommand(zk, msg, dest) {
  const command = msg.body.toLowerCase();

  if (command === '!animequote') {
    await sendRandomAnimeQuote(zk, dest, msg);
  } else if (command === '!animeimage') {
    await sendRandomAnimeImage(zk, dest, msg);
  } else if (command.startsWith('!animeinfo')) {
    const characterName = command.split(' ')[1];
    if (characterName) {
      await sendAnimeCharacterInfo(zk, dest, msg, characterName);
    } else {
      await zk.sendMessage(dest, "Veuillez spécifier un personnage d'anime après la commande !animeinfo [Nom du personnage].", { quoted: msg });
    }
  } else if (command === '!otakumenu') {
    await sendOtakuCommands(zk, dest, msg);
  } else {
    await zk.sendMessage(dest, "Commande inconnue, tapez !otakumenu pour voir les commandes disponibles.", { quoted: msg });
  }
}

// Exports
module.exports = {
  otakuCommand,
  sendRandomAnimeQuote,
  sendRandomAnimeImage,
  sendAnimeCharacterInfo,
  sendOtakuCommands
};
