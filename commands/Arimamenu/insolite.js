const axios = require('axios');
const { MessageType } = require('@adiwajshing/baileys');

// Fonction pour obtenir un fait insolite
async function getInsoliteFact() {
  try {
    // URL de l'API pour récupérer un fait insolite
    const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
    return response.data.text;
  } catch (error) {
    console.error("Erreur lors de la récupération d'un fait insolite : ", error);
    return 'Désolé, je n\'ai pas pu récupérer un fait insolite pour l\'instant.';
  }
}

// Fonction principale qui gère la commande
async function handleInsoliteFact(zk, msg, dest) {
  const command = msg.body.toLowerCase();
  const prefix = "!insolite";

  if (command.startsWith(prefix)) {
    // Obtenez un fait insolite
    const fact = await getInsoliteFact();

    // Envoie du fait insolite à l'utilisateur
    await zk.sendMessage(dest, { text: `💡 *Fait insolite du jour* 💡\n\n${fact}` }, { quoted: msg });
  }
}

module.exports = {
  handleInsoliteFact,
};
