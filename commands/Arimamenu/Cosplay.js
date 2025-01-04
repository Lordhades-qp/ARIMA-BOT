const fetch = require('node-fetch');
const { MessageType } = require('@adiwajshing/baileys');
const fs = require('fs');
const path = require('path');

// Fonction pour rechercher des images de cosplay
async function searchCosplay(query) {
  const url = `https://api.unsplash.com/search/photos?query=cosplay+${encodeURIComponent(query)}&client_id=YOUR_UNSPLASH_ACCESS_KEY`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      // Récupérer l'URL de la première image
      const imageUrl = data.results[0].urls.regular;
      return imageUrl;
    } else {
      return 'Aucune image de cosplay trouvée.';
    }
  } catch (error) {
    console.error('Erreur lors de la recherche d\'images de cosplay:', error);
    return 'Désolé, une erreur est survenue lors de la recherche d\'images de cosplay.';
  }
}

// Fonction pour envoyer une image de cosplay dans une conversation
async function sendCosplayImage(zk, dest, msg, query) {
  const imageUrl = await searchCosplay(query);

  if (imageUrl.startsWith('http')) {
    try {
      // Envoyer l'image de cosplay
      await zk.sendMessage(dest, { image: { url: imageUrl }, caption: `Voici un cosplay pour : ${query}!` }, { quoted: msg });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'image de cosplay:', error);
      await zk.sendMessage(dest, 'Désolé, je n\'ai pas pu envoyer l\'image de cosplay.', { quoted: msg });
    }
  } else {
    await zk.sendMessage(dest, imageUrl, { quoted: msg });
  }
}

// Fonction pour gérer les commandes de cosplay
async function handleCosplayCommand(zk, msg, dest) {
  const command = msg.body.toLowerCase().split(' ');

  if (command[0] === '!cosplay') {
    if (command.length === 1) {
      await zk.sendMessage(dest, 'Veuillez spécifier un personnage ou un thème pour rechercher un cosplay. Exemple : !cosplay Naruto.', { quoted: msg });
      return;
    }

    const query = command.slice(1).join(' '); // Récupérer la partie de la commande après '!cosplay'
    await sendCosplayImage(zk, dest, msg, query);
  }
}

// Exporter la fonction de gestion de commande
module.exports = {
  handleCosplayCommand
};
